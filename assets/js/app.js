// handle environment variables for api keys

// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

let resetButton = $('#reset-button');
resetButton.on('click', resetMemory);

historyList = $('#history_list');
weatherHero = $('#weather_hero');
weatherCards = $('#weather_cards');

weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
geocodingApiRoot = "https://api.openweathermap.org/geo/1.0/direct"

weatherAPI_key = "cfa986a892adc335000bb8a3ce3c9c06"
geocodingAPI_key = "cfa986a892adc335000bb8a3ce3c9c06"

saveName = 'cityWeather'

currentSelection = 0;
storage = [];
multipleReturnLimit = 3;


function addCityToLocalStorage(city, data, countryQueryName){
    storage = JSON.parse(localStorage.getItem(saveName));
    // if no stored values in past - make new structure and save
    if(!storage){
        storage = [{
            'search_details': city.name+':'+countryQueryName,
            'city': city,
            'data': data,
        },];
    // case to add a new city to local store
    } else {
        storage.splice(0, 0, {
            'search_details': city.name+':'+countryQueryName,
            'city': city,
            'data': data,
        })
    }
    localStorage.setItem(saveName, JSON.stringify(storage));
    RenderStorage();
}

function addEventListenersToHistoryItems(){
    let historyCards = $('li.collection');

    for(let i=0; i< historyCards.length; i++){
        historyCards[i].addEventListener('click', userClickedUpdateCurrentWeatherSelection);
    }
}

function isSunUp(current){
    let queryTime = current.dt;
    let sunrise = current.sunrise;
    let sunset = current.sunset;

    // let currentInstant = moment();
    // console.log('My Current Instant',currentInstant.format('MMMM Do YYYY h:mm:ss a'));
    // console.log('Server Current Instant',queryTimeInstant.format('MMMM Do YYYY h:mm:ss a'));
    // console.log('Server Sunrise Instant',sunriseInstant.format('MMMM Do YYYY h:mm:ss a'));
    // console.log('Server Sunset Instant',sunsetInstant.format('MMMM Do YYYY h:mm:ss a'));

    // if the sun is up there
    if(queryTime >sunrise && queryTime<sunset){
        console.log('Sun is up');
        return true;
    } else {
        console.log('Sun is down');
        return false;
    }
}

function getWeatherIconStr(current){

    let weatherInfo = getWeatherDetail(current.weather[0].id);

    if(isSunUp(current)){
        return weatherInfo.day_icon;
    } else {
        return weatherInfo.night_icon;
    }

}

function getLightenClassForUv(uvi){
    // uvi ranges from 0 - 1
    // cut range to 0-5 from 0-10 to fit the materialize lighten scheme
    let scaledNumber = parseInt(Math.round(uvi/2));
    // invert the scale
    let inverseResult = 5 - scaledNumber;
    if(inverseResult > 0){
        return "lighten-"+inverseResult;
    } else {
        return ""
    }
    
}

function RenderStorage(){
    storage = JSON.parse(localStorage.getItem(saveName));
    if(storage){
        // render cityWeather objects
        renderCityWeatherObjects(storage);
    }else{
        // render placeholder for current weather
        console.log("No persisting data");
    }
}

function makeGeocodeQueryString(searchString, CountryCode){
    let queryString = ""
    if (CountryCode){
        queryString = geocodingApiRoot + "?q="+searchString+','+CountryCode+'&appid='+geocodingAPI_key;
    } else {
        // limiting to first 5 returned - assuming they are appropriately sorted (population maybe)
        queryString = geocodingApiRoot + "?q="+searchString+',&limit='+multipleReturnLimit+'&appid='+geocodingAPI_key;
    }
    return queryString;
}

function makeWeatherQueryString(city){
    let part = ['minutely', 'hourly', 'alerts']  // leaving current only
    queryString = weatherApiRoot+"?lat="+city.lat+"&lon="+city.lon+'&units=metric'+"&exclude="+part+"&appid="+weatherAPI_key
    return queryString;
}

function assignCurrentWeatherSelection(index){
    resetAllHistoryCardColors();
    // get all the history cards
    let historyCards = $('#history_list').find('div');
    // add the purple lighten-3 materialize class
    $(historyCards[index]).addClass('purple lighten-3');
    // set global to first index
    currentSelection = 0;
    renderCurrentWeather();
}

function userClickedUpdateCurrentWeatherSelection(event){
    // clear all the history card focus colors
    resetAllHistoryCardColors();
    // change the class of the history card to purple emphasis
    let historyCard = $(event.target);
    historyCard.addClass('purple lighten-3');
    // update the currentSelection to be the selected history card
    currentSelection = parseInt(event.target.parentElement.dataset['index'])
    // update render
    renderCurrentWeather();
}

function queryGeocodingCityAPI(queryString, countryQueryName){
    fetch(queryString,{
        cache: 'reload',
    })
    .then(function(response){
        // returns the response json data to the next promise
        return response.json();
    })
    .then(function(data){
        let hasNumbers = /\d/;
        // since user can query with just city, we move through all the countries that have that city
        if(data.length > 0){
            for(let i =0; i < data.length; i++){
                let city = data[i];
                // check the city isn't an obscure one like paris 5 for example
                if(!hasNumbers.test(city.name)){
                    queryWeatherAPI(city, countryQueryName, i);
                }
            }
        } else {
            console.log(`No location data returned for city: ${city.name}`)
            console.log(data);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function queryWeatherAPI(city, countryQueryName){   

    let queryString = makeWeatherQueryString(city);
    fetch(queryString,{
        cache: 'reload',
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data){
            addCityToLocalStorage(city, data, countryQueryName);
        } else {
            console.log(`No weather details returned for: ${city}`);
        }})
    .catch(function(error){
        console.log(error);
    })
}

function removeEventListenersFromHistoryItems(){
    let historyCards = $('li.collection');
    for(let i=0; i< historyCards.length; i++){
        historyCards[i].removeEventListener('click', userClickedUpdateCurrentWeatherSelection);
    }
}

function renderCityWeatherObjects(cityObjects){
    historyList.text("");
    for(let i =0; i < cityObjects.length; i++){
        console.log(cityObjects[i]);
        let city = cityObjects[i].city;
        let data = cityObjects[i].data;

        // dynamically assign icon class based on data
        let iconUrl = getWeatherIconStr(data.current);

        let currentTemp = Math.round(data.current.temp, 1);


        // create elements for a city li
        let listEl = makeNewJqueryElement('li', "collection", null, null, {name: 'index', value: i})
        let divEl = makeNewJqueryElement('div', 'collection-item');
        let textEL = makeNewJqueryElement('p', 'history_card_text', null, city.name+": "+city.country+": "+currentTemp+"°C ");
        let iconEl = makeNewJqueryElement('img', 'history_card_icon', null);

        // specifically give the a link an empty href since helper function can't give an href function
        iconEl.attr('src', iconUrl);

        // add the temperature to the link element

        // build structure
        divEl.append(textEL);
        divEl.append(iconEl);
        // divEl.append(tempEl);
        listEl.append(divEl)

        // append to section
        historyList.append(listEl);

        // add the event handler for change of weather selection
        removeEventListenersFromHistoryItems();
        addEventListenersToHistoryItems();
    }
    // set the selection indicator and the currentSelection global to the first element
    // wait for 0.5 second to finish load
    setTimeout(function(){
        assignCurrentWeatherSelection(0);
    }, 200)
}

function renderCurrentWeather(){
    // get data variables
    let city = storage[currentSelection].city;
    let weather = storage[currentSelection].data.current;
    let data = storage[currentSelection].data;
    let weatherDetail = getWeatherDetail(weather.weather[0].id);

    // get states
    let sunUp = isSunUp(weather);
    let weatherIcon = sunUp ? weatherDetail.day_icon : weatherDetail.night_icon;
    let sunIcon = sunUp ? 'wb_sunny' : 'brightness_2'
    let sunIconClass = sunUp ? 'yellow-text' : 'blue-text'

    // get uv index color
    let uvIndexClassColor = getLightenClassForUv(weather.uvi);

    // get time variables
    let currentTime =  moment.unix(weather.dt);
    let currentDateDisplay = currentTime.format('MMMM Do YYYY');
    let currentTimeDisplay = currentTime.format('h:mm:ss a');

    // get weather variables and formats
    let current_temp = Math.round(weather.temp, 1).toString()+"°​C";
    let currentFeelsLike = Math.round(weather.feels_like, 1).toString()+"°​C";
    let windSpeed = weather.wind_speed.toString()+"m/s";
    let currentHumidity = weather.humidity.toString()+"%";
    let currentUVI = weather.uvi;

    // extra details
    

    // making this card
    
    //<div class="card">
    let cardDiv = makeNewJqueryElement('div', 'card');
        //<div class="card-image">
        let cardImageDiv = makeNewJqueryElement('div', 'card-image');
            //<img src=weather.parallax>
            let cardImgEl = makeNewJqueryElement('img');
            cardImgEl.attr('src', weatherDetail.parallax_url);
            //<div class="card-title" id="hero_card_text">
            let cardTitleEl = makeNewJqueryElement('div', 'card-title', 'hero_card_text');
                //<div class="row">
                let row1 = makeNewJqueryElement('div', 'row');
                    //<div class="col">
                        //city.name + city.country 
                    let div1 = makeNewJqueryElement('div', 'col', null, city.name+' '+city.country)
                    //</div>
                    //<div class="col">
                    let div2 = makeNewJqueryElement('div', 'col');
                        //<img class="hero_icon" src=weatherIcon>
                        let img1 = makeNewJqueryElement('img', 'hero_icon');
                        img1.attr('src', weatherIcon);
                    div2.append(img1)
                    //</div>
                    //<div class="col">
                    let div3 = makeNewJqueryElement('div', 'col');
                        //<i class="large material-icons "+sunIconClass id="hero_sun">sunIcon</i>
                        let icon1 = makeNewJqueryElement('i', 'large material-icons '+sunIconClass, 'hero_sun', sunIcon);
                    div3.append(icon1);
                    //</div>
                row1.append(div1, div2, div3)
                //</div>
                //<br>
                let br1 = makeNewJqueryElement('br');
                //<br>
                let br2 = makeNewJqueryElement('br');
            cardTitleEl.append(row1, br1, br2);
            //</div>
            //<div class="card-content valign-wrapper">
            let cardContentDiv = makeNewJqueryElement('div', 'card-content valign-wrapper')
                //<div class="col">
                let div5 = makeNewJqueryElement('div', 'col')
                    //<span class="hide-on-med-and-down">currentDateDisplay</span>
                    let span1 = makeNewJqueryElement('span', 'hide-on-med-and-down', null, currentDateDisplay)
                    //currentTimeDisplay -- this is just text inside the div after the span for reactive reasons
                    div5.text(currentTimeDisplay);
                div5.append(span1);
                //</div>
                //<div class="col">
                let div6 = makeNewJqueryElement('div', 'col');
                    div6.text(current_temp+"("+currentFeelsLike+")");
                    //current_time +"("+currentFeelsLike+")"
                //</div>
                //<div class="col">
                let div7 = makeNewJqueryElement('div', 'col', null, "Wind "+windSpeed);
                    //"Wind"+windSpeed
                //</div>
                //<div class="col">
                let div8 = makeNewJqueryElement('div', 'col', null, "Humidity "+currentHumidity);
                   //"Humidity "+currentHumidity
                //</div>
                //<div class="col">
                let div9 = makeNewJqueryElement('div', 'col');
                    //<p class="hero_uv btn black-text "+uvIndexClassColor>
                    let p1 = makeNewJqueryElement('p', 'hero_uv btn black-text red '+uvIndexClassColor, null)
                        //<span class="hide-on-med-and-down">UVI</span>currentUVI
                        // let span2 = makeNewJqueryElement('span', 'hide-on-med-and-down', null, 'UVI');
                        let p2 = makeNewJqueryElement('p', null, null, 'Uv '+currentUVI);
                        p1.append(p2);
                    //</p>
                div9.append(p1)
                //</div>
            cardContentDiv.append(div5, div6, div7, div8, div9);
            //</div>  
        cardImageDiv.append(cardImgEl);
        cardImageDiv.append(cardTitleEl);
        cardImageDiv.append(cardContentDiv)
        //</div>
    cardDiv.append(cardImageDiv);
    //</div>
    
    // reset hero to empty
    weatherHero.text("");

    // add header
    //<h3 class="center-align blue-text">CURRENTLY</h3>
    let headerEl = makeNewJqueryElement('h3', 'center-align blue-text', null, 'CURRENTLY');

    // append new hero card
    weatherHero.append(headerEl, cardDiv);

    // render forecast cards below
    renderForecast(data);
}

function renderForecast(data){

    // reset cards
    weatherCards.text("");

    // add header
    //<h3 class="center-align blue-text">CURRENTLY</h3>
    let headerEl = makeNewJqueryElement('h3', 'center-align blue-text lighten-4', null, '5 DAY FORECAST');
    weatherCards.append(headerEl);

    // make and attach cards, ignoring index 0 as that is today
    for(let i=1; i < 6; i++){
        let weather = data.daily[i];
        // the first column gets a materialize offset for xl size of 1, the others don't
        let offsetClass = (i===1) ? "col xl2 offset-xl1 l12 m10 offset-m1 s10 offset-s1" : "col xl2 l12 m10 offset-m1 s10 offset-s1";

        let currentTemp = Math.round(weather.temp.day)+"°​C";
        let currentTime =  moment.unix(weather.dt);
        // format sunday 11th June
        // let forecastDay = currentTime.format('dddd MMMM Do');
        //format Sunday
        let forecastDay = currentTime.format('dddd');
        // lookup weather info for this id.
        let weatherDetail = getWeatherDetail(weather.weather[0].id);
        let weatherIcon = weatherDetail.day_icon;
        let backgroundImg = weatherDetail.parallax_url;
        let windSpeed = weather.wind_speed.toString()+" m/s"
        let humidity = weather.humidity+'%';

        // extra details for card reveal
        let morningTemp = Math.round(weather.temp.morn)+"°​C";
        let maxTemp = Math.round(weather.temp.day)+"°​C";
        let nightTemp = Math.round(weather.temp.night)+"°​C";



        //making this card

        //<div class="col xl2 offset-xl1 l12 m10 offset-m1 s10 offset-s1">  
        let containerEl = makeNewJqueryElement('div', offsetClass);              
            //<div class="card">
            let cardEl = makeNewJqueryElement('div', 'card')
                //<div class="card-image waves-effect waves-block waves-light">
                let cardImgDiv = makeNewJqueryElement('div', 'card-image waves-effect waves-block waves-light');
                    //<img class="activator" src=backgroundImg>
                    let cardImgEl = makeNewJqueryElement('img', 'activator');
                    cardImgEl.attr('src', backgroundImg);
                cardImgDiv.append(cardImgEl);
                //</div>
                //<div class="card-content">
                let cardContentDiv = makeNewJqueryElement('div', 'card-content');
                    //<span class="card-title activator grey-text text-darken-4">
                    let span1 = makeNewJqueryElement('span', 'card-title activator grey-text text-darken-4');
                        //<p>forecastDay</p>
                        let p1 = makeNewJqueryElement('p', 'forecast_content_text', null, forecastDay);
                        //<img class="forecast_icon" src=weatherIcon>
                        let img1 = makeNewJqueryElement('img', 'card-title forecast_icon');
                        img1.attr('src', weatherIcon);
                        //<i class="material-icons right">more_vert</i>
                        let icon1 = makeNewJqueryElement('i', 'material-icons right', null, 'more_vert')
                    span1.append(p1, img1, icon1)
                    //</span>
                    //<p>currentTemp (currentFeelsLike)</p>
                    let p2 = makeNewJqueryElement('p', 'forecast_content_text', null, currentTemp);
                cardContentDiv.append(span1, p2);
                //</div>
                //<div class="card-reveal">
                let cardRevealDiv = makeNewJqueryElement('div', 'card-reveal');
                    //<span class="card-title grey-text text-darken-4">
                    let span2 = makeNewJqueryElement('span', 'card-title grey-text text-darken-4');
                        //<i class="material-icons right">close</i>
                        let icon2 = makeNewJqueryElement('i', 'material-icons right', null, 'close');
                        //<img class="forecast_icon" src=weatherIcon>
                        let img2 = makeNewJqueryElement('img', 'card-title forecast_icon');
                        img2.attr('src', weatherIcon);
                    span2.append(icon2, img2);
                    //</span>
                    //<p>Wind windSpeed</p>
                    let p4 = makeNewJqueryElement('p', 'forecast_reveal_text', null, 'Wind '+windSpeed);
                    //<p>Humidity humidity</p>
                    let p5 = makeNewJqueryElement('p', 'forecast_reveal_text', null, 'Humidity '+humidity);
                    //<p>Morning morningTemp</p>
                    let p6 = makeNewJqueryElement('p', 'forecast_reveal_text', null, 'Morning '+morningTemp);
                    //<p>Day MaxTemp</p>
                    let p7 = makeNewJqueryElement('p', 'forecast_reveal_text', null, 'Day Max '+maxTemp);
                    //<p>Evening nightTemp</p>
                    let p8 = makeNewJqueryElement('p', 'forecast_reveal_text', null, 'Evening '+nightTemp);
                cardRevealDiv.append(span2, p4, p5, p6, p7, p8);
                //</div>
            cardEl.append(cardImgDiv, cardContentDiv, cardRevealDiv);
            //</div>
        containerEl.append(cardEl);
        //</div>

        // final append
        weatherCards.append(containerEl);

    }
}

function resetAllHistoryCardColors(){
    let historyCards = $('#history_list').find('div');
    historyCards.attr("class", "collection-item");
}

function resetMemory(event){
    localStorage.clear();
    window.location.reload();
}

function runSearch(event){
    event.preventDefault();

    // get dom values
    let cityInputEl = $('#city_search_input');
    let countryQueryName = countries.names[countryChoiceIndex];
    let currentCountryAlpha2 = countries.alpha2[countryChoiceIndex];

    // check there is a string in the data-choice parameter
    let citySearchText = cityInputEl.attr('data-choice');

    if(citySearchText){
        // check if city is already in the local storage history list
        let pastStorage = JSON.parse(localStorage.getItem(saveName));
        if(pastStorage){
            // check that this city doesn't already exist in local storage
            for(let i =0; i<pastStorage.length; i++){
                // case for encountering the same search twice
                if(pastStorage[i].search_details === citySearchText+':'+countryQueryName){
                    console.log(`City name: ${citySearchText} is already in local storage - ignore`);
                    return
                }
            }
        }

        // make api query strings and start calls
        let queryString = makeGeocodeQueryString(citySearchText, currentCountryAlpha2);
        queryGeocodingCityAPI(queryString, countryQueryName);
    } else {
        console.log('User did not specify a city')
    }
}

