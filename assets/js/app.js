// handle environment variables for api keys

// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

let resetButton = $('#reset-button');
resetButton.on('click', resetMemory);

weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
geocodingApiRoot = "http://api.openweathermap.org/geo/1.0/direct"

weatherAPI_key = "cfa986a892adc335000bb8a3ce3c9c06"
geocodingAPI_key = "cfa986a892adc335000bb8a3ce3c9c06"

saveName = 'cityWeather'

currentSelection = 0;


function makeGeocodeQueryString(searchString, CountryCode){
    let queryString = ""
    if (CountryCode){
        queryString = geocodingApiRoot + "?q="+searchString+','+CountryCode+'&appid='+geocodingAPI_key;
    } else {
        // limiting to first 5 returned - assuming they are appropriately sorted (population maybe)
        queryString = geocodingApiRoot + "?q="+searchString+'&limit=5&appid='+geocodingAPI_key;
    }
    console.log(`Geocode query string built: ${queryString}`);
    return queryString;
}

function makeWeatherQueryString(city){
    let part = ['minutely', 'hourly', 'alerts']  // leaving current only
    queryString = weatherApiRoot+"?lat="+city.lat+"&lon="+city.lon+"&exclude="+part+"&appid="+weatherAPI_key
    return queryString;
}

function addCityToLocalStorage(city, data, countryQueryName){
    console.log('collecting stored data');
    let pastStorage = JSON.parse(localStorage.getItem(saveName));
    // if no stored values in past - make new structure and save
    if(!pastStorage){
        pastStorage = [{
            'search_details': city.name+':'+countryQueryName,
            'city': city,
            'data': data,
        },];
    // case to add a new city to local store
    } else {
        pastStorage.push({
            'search_details': city.name+':'+countryQueryName,
            'city': city,
            'data': data,
        })
    }

    localStorage.setItem(saveName, JSON.stringify(pastStorage));
}

function loadAndRenderStorage(){
    console.log('collecting stored data');
    let storage = JSON.parse(localStorage.getItem(saveName));
    if(storage){
        // render cityWeather objects
        for(let i=0; i < storage.length; i++){
            renderCurrentCityWeather(storage[i].city, storage[i].data);
        }
    }else{
        // render placeholder for current weather
        console.log("No persisting data");
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

function queryGeocodingCityAPI(queryString, countryQueryName){
    fetch(queryString,{
        cache: 'reload',
    })
    .then(function(response){
        // returns the response json data to the next promise
        return response.json();
    })
    .then(function(data){
        let numbers = /^[0-9]+$/;
        // since user can query with just city, we move through all the countries that have that city
        if(data.length > 0){
            for(let i =0; i < data.length; i++){
                let city = data[i];
                // check the city isn't an obscure one like paris 5 for example
                if(!city.name.match(numbers)){
                    console.log('Found city with details:')
                console.log('\t'+city.name);
                console.log('\t'+city.lat);
                console.log('\t'+city.lon);
                console.log('\t'+city.country);
                console.log(`Running weather query on city: ${city.name}`)
                queryWeatherAPI(city, countryQueryName);
                }
            }
        } else {
            console.log(`No location data returned for city: ${cityName}`)
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
        console.log(data);
        if(data){
            addCityToLocalStorage(city, data, countryQueryName);
            // reload the screen to reflect the new state
            // window.location.reload();
            renderCurrentCityWeather(city, data);
        } else {
            console.log(`No weather details returned for: ${city}`);
        }})
    .catch(function(error){
        console.log(error);
    })
}

function renderCurrentCityWeather(city, data){
    // rendering history card first
    console.log('Adding city to history bar: ');
    console.log(city);
    let historyList = $('#history_list')

    // dynamically assign icon class based on data
    let iconName = getWeatherIconStr(data);
    // let listElClass = selected ? "collection-item z-depth-1 selected" : "collection-item z-depth-1";

    // create elements for a city li
    let listEl = makeNewJqueryElement('li', "collection")
    let divEl = makeNewJqueryElement('div', 'collection-item', null, city.name+": "+city.country+": "+data.timezone);
    let linkEl = makeNewJqueryElement('a', 'secondary-content');
    let iconEl = makeNewJqueryElement('i', 'material-icons', null, iconName);

    // specifically give the a link an empty href since helper function can't
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
        console.log(`Country index before building query is ${countryChoiceIndex}`);
        console.log(`User string value: ${citySearchText}`);

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

