// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);


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
    } else {
        pastStorage = [{
            'city': city,
            'data': data,
        },];
    }
    
    localStorage.setItem(saveName, JSON.stringify(pastStorage));
}

function addCityToHistoryBar(city){
    console.log(`Adding city to history bar:${city}`)
}

function loadAndRenderStorage(){
    console.log('collecting stored data');
    let storage = JSON.parse(localStorage.getItem(saveName));
    if(storage){
        // render cityWeather objects
        for(let i=0; i < storage.length; i++){
            addCityToHistoryBar(storage[i].city);
            renderCurrentCityWeather(storage[i].city, storage[i].data);
        }
    }else{
        // render placeholder for current weather
        console.log("No persisting data");
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
        if(data){
            queryWeatherAPI(data[0]);
        } else {
            console.log(`No location data returned for city: ${city}`)
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
        } else {
            console.log(`No weather details returned for: ${city}`);
        }})
    .catch(function(error){
        console.log(error);
    })
}

function renderCurrentCityWeather(city, data){
    console.log('Rendering city to hero weather section');
    console.log(city);
    console.log(data);
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
    // if user doesn't put in a city
    } else {
        console.log('User did not specify a city')
    }

    // // clean up form after process
    let form = $('#search_form')[0];
    form.reset();
    // // prevent refreshing the page
    return false;
}
