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

    // if the sun is up there
    if(queryTime >sunrise && queryTime<sunset){
        return true;
    } else {
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

function getColorClassForUV(uvi){
    // uvi ranges from 0 - 1
    // expand range to 0-5 to fit the materialize lighten scheme
    let scaledNumber = Math.round(5*uvi);
    let frontNumber = parseInt(scaledNumber, 10).toString();
    // let frontNumber = integerUvi.toString().charAt(0);

    // invert the scale
    let inverseResult = 5 - parseInt(frontNumber, 10);
    return "red lighten-"+inverseResult;
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
    let city = storage[currentSelection].city;
    let weather = storage[currentSelection].data.current;
    let data = storage[currentSelection].data;
    let weatherDetail = getWeatherDetail(weather.weather[0].id);
    // let dayIconUrl = "http://openweathermap.org/img/wn/01d@2x.png";
    // let nightIconUrl = "http://openweathermap.org/img/wn/01n@2x.png";

    let current_temp = Math.round(weather.temp, 1);
    let current_time =  moment.unix(weather.dt);
    let current_time_display = current_time.format('MMMM Do YYYY, h:mm:ss a');

    let sunUp = isSunUp(weather);

    // get uv index color
    let uv_index_color = getColorClassForUV(weather.uvi);

    // set icon to use
    let weatherIcon = sunUp ? weatherDetail.day_icon : weatherDetail.night_icon;
    let sunIcon = sunUp ? 'wb_sunny' : 'brightness_2'
    let sunIconClass = sunUp ? 'yellow-text' : 'blue-text'

    // making this card
    /*
    <div class="card">
        <div class="card-image">
            <img src=weatherDetail.parallax_url>
            <span class="card-title">City Country</span>
        </div>
        <div class="card-content">
            <span class="card-content">
                <p>Query time</p>
                <p>Weather Icon</p>
                <p>Sunrise/Sunset Icon</p>
                <p>Temp+°C</p>
                <p>Wind Speed</p>
                <p>Humidity</p>
                <p>UV Index</p>
            </span>
        </div>
    </div>
    */
    // card title section
    let cardEl = makeNewJqueryElement('div', 'card', 'hero-card');
    let cardImageDivEL = makeNewJqueryElement('div', 'card-image');
    cardEl.append(cardImageDivEL);

    // make the image
    let cardImgEl = makeNewJqueryElement('img', 'hero-image'); 
    cardImgEl.attr('src', weatherDetail.parallax_url)
    cardImageDivEL.append(cardImgEl)


    cardImageDivEL.append(makeNewJqueryElement('span', 'card-title', 'hero-title', 
    city.name+"  "+city.country+"  "+current_time_display))

    // || card-content section
    // create card-content section
    let cardContentEl = makeNewJqueryElement('div', 'card-content');
    cardEl.append(cardContentEl);

    // create content span
    let contentSpanEl = makeNewJqueryElement('span', 'card-content');
    cardContentEl.append(contentSpanEl);

    // add query time
    // contentSpanEl.append(makeNewJqueryElement('h4', 'hero_query_time', null, current_time_display));

    // add the weather icon
    let weatherIconEl = makeNewJqueryElement('img', 'hero_icon', null); // need to set src separately
    weatherIconEl.attr('src', weatherIcon);
    contentSpanEl.append(weatherIconEl);

    // add the sunrise/sunset icon
    contentSpanEl.append(makeNewJqueryElement('i', 'large material-icons '+sunIconClass, 'hero_sun', sunIcon));
    
    // add temp, wind speed, humidity and uvi
    contentSpanEl.append(makeNewJqueryElement('p', 'hero_text', null, current_temp.toString()+"°​C"));
    contentSpanEl.append(makeNewJqueryElement('p', 'hero_wind', null, weather.wind_speed.toString()+"m/s"));
    contentSpanEl.append(makeNewJqueryElement('p', 'hero_humidity', null, weather.humidity.toString()+"%"))
    contentSpanEl.append(makeNewJqueryElement('p', 'hero_uv btn '+uv_index_color, null, weather.uvi.toString()+"%"));

    // reset hero to empty
    weatherHero.text("");
    // append new hero card
    weatherHero.append(cardEl);

    // render forecast cards below
    renderForecast(data);
}

function renderForecast(data){

    // reset cards
    weatherCards.text("");

    for(let i=0; i < 5; i++){
        let weather = data.daily[i];
        console.log(weather);
        let current_temp = Math.round(weather.temp.day, 1);
        let current_time =  moment.unix(weather.dt);
        let current_time_display = current_time.format('MMMM Do YYYY');
        // lookup weather info for this id.
        let weatherDetail = getWeatherDetail(weather.weather[0].id);
        let weatherIcon = weatherDetail.day_icon;
        let humidity = weather.humidity;


        let colEl = makeNewJqueryElement('div', 'col s12 m4 l3');
        let cardEl = makeNewJqueryElement('div', 'card horizontal', null, null, {name :'index', value: i});
        colEl.append(cardEl);
        let cardImgDivEl = makeNewJqueryElement('div', 'card-image');
        cardEl.append(cardImgDivEl);

        let cardImgEl = makeNewJqueryElement('img', 'forecast_image');
        cardImgEl.attr('src', weatherDetail.parallax_url)
        cardImgDivEl.append(cardImgEl);

        let cardContentEl = makeNewJqueryElement('div', 'card-content');
        cardEl.append(cardContentEl);

        cardContentEl.append(makeNewJqueryElement('p', 'forecast_date',null, current_time_display));
        let imgEl = makeNewJqueryElement('img', 'forecast_icon');
        imgEl.attr('src', weatherIcon);
        cardContentEl.append(imgEl);
        cardContentEl.append(makeNewJqueryElement('p', 'forecast_temp', null , 'Day Max '+current_temp+"°​C"));
        cardContentEl.append(makeNewJqueryElement('p', 'forecast_wind', null , 'Wind '+weather.wind_speed.toString()+" m/s"));
        cardContentEl.append(makeNewJqueryElement('p', 'forecast_humidity', null, 'Humidity '+humidity+'%'));
        weatherCards.append(colEl);
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

