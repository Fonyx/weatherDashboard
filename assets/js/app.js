// handle environment variables for api keys

// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

let resetButton = $('#reset-button');
resetButton.on('click', resetMemory);

historyList = $('#history_list');

weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
geocodingApiRoot = "http://api.openweathermap.org/geo/1.0/direct"

weatherAPI_key = "cfa986a892adc335000bb8a3ce3c9c06"
geocodingAPI_key = "cfa986a892adc335000bb8a3ce3c9c06"

saveName = 'cityWeather'

currentSelection = 0;
storage = [];


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
        historyCards[i].addEventListener('click', UserClickedUpdateCurrentWeatherSelection);
    }
}

function getWeatherIconStr(data){
    let currentCelsius = data.current.temp - 273;
    // if temp is above 15
    if(currentCelsius >= 15){
        // sunny 
        if(currentCelsius <= 24){
            return "wb_sunny";
        } else if (currentCelsius <= 34){
            return "beach_access";
        } else if(currentCelsius <= 45){
            return "whatshot";
        }
    // subzero
    } else {
        return "ac_unit";
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
        queryString = geocodingApiRoot + "?q="+searchString+'&limit=5&appid='+geocodingAPI_key;
    }
    return queryString;
}

function makeWeatherQueryString(city){
    let part = ['minutely', 'hourly', 'alerts']  // leaving current only
    queryString = weatherApiRoot+"?lat="+city.lat+"&lon="+city.lon+"&exclude="+part+"&appid="+weatherAPI_key
    return queryString;
}

function AssignCurrentWeatherSelection(index){
    resetAllHistoryCardColors();
    // get all the history cards
    let historyCards = $('#history_list').find('div');
    // add the purple lighten-3 materialize class
    $(historyCards[index]).addClass('purple lighten-3');
    // set global to first index
    currentSelection = 0;
    renderCurrentWeather();
}

function UserClickedUpdateCurrentWeatherSelection(event){
    // clear all the history card focus colors
    resetAllHistoryCardColors();
    // update the currentSelection to be the selected history card
    currentSelection = parseInt(event.target.parentElement.dataset['index'])
    // log for sanity
    let currentCityObject = storage[currentSelection];
    // change the class of the history card to purple emphasis
    let historyCard = $(event.target);
    historyCard.addClass('purple lighten-3');
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
        historyCards[i].removeEventListener('click', UserClickedUpdateCurrentWeatherSelection);
    }
}

function renderCityWeatherObjects(cityObjects){
    historyList.text("");
    for(let i =0; i < cityObjects.length; i++){
        let city = cityObjects[i].city;
        let data = cityObjects[i].data;
        // rendering history card first

        // dynamically assign icon class based on data
        let iconName = getWeatherIconStr(data);
        // let listElClass = selected ? "collection-item z-depth-1 selected" : "collection-item z-depth-1";

        // create elements for a city li
        let listEl = makeNewJqueryElement('li', "collection", null, null, {name: 'index', value: i})
        let divEl = makeNewJqueryElement('div', 'collection-item', null, city.name+": "+city.country+": "+data.timezone);
        let linkEl = makeNewJqueryElement('a', 'secondary-content');
        let iconEl = makeNewJqueryElement('i', 'material-icons', null, iconName);

        // specifically give the a link an empty href since helper function can't give an href function
        linkEl.attr('href', '#');

        // add the temperature to the link element
        let currentTemp = Math.round(data.current.temp - 273, 1);
        linkEl.text(currentTemp+"°C ");

        // build structure
        linkEl.append(iconEl);
        divEl.append(linkEl);
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
        AssignCurrentWeatherSelection(0);
    }, 500)
}

function renderCurrentWeather(){
    let currentCityObject = storage[currentSelection];
    console.log('Auto assigned city object is:\n\t');
    console.log(currentCityObject);
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

