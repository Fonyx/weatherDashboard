// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

let resetButton = $('#reset-button');
resetButton.on('click', resetMemory);


API_key = "cfa986a892adc335000bb8a3ce3c9c06"
saveName = 'cityWeather'


function addCityResultToLocal(city, data){
    // note the lack of a duplicate check, that is handled upstream to avoid api overuse
    let pastStorage = JSON.parse(localStorage.getItem(saveName));
    if(pastStorage){
        pastStorage.push({
            'city': city,
            'data': data,
        });
    }
}

function makeQueryString(searchString, code){
    // direct geocoding answer - https://openweathermap.org/api/geocoding-api
    // assuming that the first city returned is correct
    if (code){
        queryString = geocodingApiRoot + "?q="+searchString+','+code+'&limit=1&appid='+API_key
    } else {
        queryString = geocodingApiRoot + "?q="+searchString+'&limit=1&appid='+API_key
    return queryString;
    }
}

function addCityToLocalStorage(city, data){
    console.log('collecting stored data');
    let pastStorage = JSON.parse(localStorage.getItem(saveName));
    if(!pastStorage){
        pastStorage = [{
            'city': city,
            'data': data,
        },];
    }
    localStorage.setItem(saveName, JSON.stringify(pastStorage));
}

function loadAndRenderStorage(){
    console.log('collecting stored data');
    let storage = JSON.parse(localStorage.getItem(saveName));
    if(storage){
        // render cityWeather objects
        for(let i=0; i < storage.length; i++){
            if(i===0){
                renderCurrentCityWeather(storage[i].city, storage[i].data, true);
            } else {
                renderCurrentCityWeather(storage[i].city, storage[i].data, false);
            }
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

function queryLocationAPI(queryString, city){
    fetch(queryString,{
        cache: 'reload',
    })
    .then(function(response){
        // returns the response json data to the next promise
        return response.json();
    })
    .then(function(data){
        if(data.length > 0){
            for(let i=0; i<data.length; i++){
                console.log(data[i].name);
                console.log(data[i].lat);
                console.log(data[i].lon);
                console.log(data[i].country);
            }
            queryWeatherAPI(data[0]);
        } else {
            console.log(`No location data returned for city: ${city}`)
            console.log(data);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function queryWeatherAPI(city){
    let part = ['minutely', 'hourly', 'alerts']  // leaving current only
    let weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"

    let queryString = weatherApiRoot+"?lat="+city.lat+"&lon="+city.lon+"&exclude="+part+"&appid="+API_key
    fetch(queryString,{
        cache: 'reload',
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        if(data){
            addCityResultToLocal(city, data);
            // reload the screen to reflect the new state
            // window.location.reload();
            renderCurrentCityWeather(city, data, true);
        } else {
            console.log(`No weather details returned for: ${city}`);
        }})
    .catch(function(error){
        console.log(error);
    })
}

function renderCurrentCityWeather(city, data, selected){
    // rendering history card first
    console.log(`Adding city to history bar:${city}`)
    let historyList = $('#history_list')

    // dynamically assign icon class based on data
    let iconName = getWeatherIconStr(data);
    let listElClass = selected ? "collection-item z-depth-1 selected" : "collection-item z-depth-1";

    // create elements for a city li
    let listEl = makeNewJqueryElement('li', listElClass)
    let divEl = makeNewJqueryElement('div', null, null, city.name+": "+city.country);
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
    // check there is a string in the data-choice parameter
    let cityInputEl = $('#city_search_input');
    let citySearchText = cityInputEl.attr('data-choice');

    // check if city is already in the local storage history list
    let pastStorage = JSON.parse(localStorage.getItem(saveName));
    if(pastStorage){
        // check that this city doesn't already exist in local storage
        for(let i =0; i<pastStorage.length; i++){
            if(pastStorage[i].city.name === citySearchText){
                console.log(`City name: ${citySearchText} is already in local storage - ignore`);
                return
            }
        }
    }

    if(citySearchText){
        geocodingApiRoot = "http://api.openweathermap.org/geo/1.0/direct"
        let queryString = geocodingApiRoot + "?q="+citySearchText+'&limit=1&appid='+API_key
        queryLocationAPI(queryString, citySearchText);

        console.log(`Country index before building query is ${countryChoiceIndex}`)
        let currentCountryAlpha2 = countries.alpha2[countryChoiceIndex];
        let queryString = makeQueryString(citySearchText, currentCountryAlpha2);
        queryAPI(queryString);
    // if user doesn't put in a city
    } else {
        console.log('User did not specify a city')
    }
}
