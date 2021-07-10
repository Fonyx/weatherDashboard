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
geocodingApiRoot = "http://api.openweathermap.org/geo/1.0/direct"

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

function isSunUp(data){
    let queryTime = data.current.dt;
    let sunrise = data.current.sunrise;
    let sunset = data.current.sunset;

    // if the sun is up there
    if(queryTime >sunrise && queryTime<sunset){
        return true;
    } else {
        return false;
    }
}

function getWeatherIconStr(data){

    let weatherInfo = getWeatherDetail(data.current.weather[0].id);

    if(isSunUp(data)){
        return weatherInfo.day_icon;
    } else {
        return weatherInfo.night_icon;
    }

}

function getColorClassForUV(){
    return "purple lighten-2"
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
        let iconUrl = getWeatherIconStr(data);

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

    // making this card
    /*
    <div class="card">
        <div class="card-image">
            <img src=>
            <span class="card-title">Card Title</span>
            <span class="card-title">
                <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
            </span>
        </div>
    </div>
    */


    let city = storage[currentSelection].city;
    let weather = storage[currentSelection].data.current;
    let forecast = storage[currentSelection].data.daily;
    let weatherDetail = getWeatherDetail(weather.weather[0].id);

    let current_temp = Math.round(weather.temp, 1);
    let current_time =  moment(weather.dt);
    let current_time_display = current_time.format('MMMM Do YYYY, h:mm:ss a');

    // get uv index color
    let uv_index_color = getColorClassForUV();

    // render hero place
    // add details: City, Date, weather-icon temp, windspeed, humidity, UV index with color repr
    let bannerEl = makeNewJqueryElement('div', 'parallax-container', 'hero-container');
    let innerContEl = makeNewJqueryElement('div', 'container');
    let cityEl = makeNewJqueryElement('h3', 'hero_city', null, city.name+" : "+city.country);
    let dateEl = makeNewJqueryElement('h4', 'hero_cate', null, current_time_display)
    let weatherIconEl = makeNewJqueryElement('i', 'hero_icon', null, weather.weather[0].icon)
    let tempEl = makeNewJqueryElement('p', 'hero_text', null, current_temp.toString()+"°​C");
    let windEl = makeNewJqueryElement('p', 'hero_wind', null, weather.wind_speed.toString()+"Mph");
    let humidityEl = makeNewJqueryElement('p', 'hero_humidity', null, weather.humidity.toString()+"%");
    let UvEl = makeNewJqueryElement('p', 'hero_uv '+uv_index_color, null, weather.uvi.toString()+"%");
    let parallaxEl = makeNewJqueryElement('div', 'parallax');
    let parallaxImg = makeNewJqueryElement('img');
    
    // nest and append to weatherHero
    // reset hero to empty
    weatherHero.text("");

    // add the src to parallaxImg element
    parallaxImg.attr('src', weatherDetail.parallax_url);
    parallaxImg.attr('style', "transform: translate3d(-50%, 397.495px, 0px); opacity: 1;");

    // restack weather hero
    parallaxEl.append(parallaxImg);
    innerContEl.append(cityEl);
    innerContEl.append(dateEl);
    innerContEl.append(weatherIconEl);
    innerContEl.append(tempEl);
    innerContEl.append(windEl);
    innerContEl.append(humidityEl);
    innerContEl.append(UvEl);
    innerContEl.append(parallaxEl);
    bannerEl.append(innerContEl);
    weatherHero.append(bannerEl);

    // render forecast cards below
    // add details: City, Date, weather-icon temp, windspeed, humidity, UV index with color repr
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

