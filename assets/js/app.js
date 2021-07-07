// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
weatherParams = "?lat={lat}&lon={lon}&exclude={part}&appid={API_key}"

geocodingApiRoot = "http://api.openweathermap.org/geo/1.0/direct"
API_key = "cfa986a892adc335000bb8a3ce3c9c06"
part = ['minutely', 'hourly', 'daily', 'alerts']  // leaving current only
// let lat = 33.44
// let long = -94.04


function makeQueryString(searchString, code){
    // direct geocoding answer - https://openweathermap.org/api/geocoding-api
    let openWeatherRoot = "http://api.openweathermap.org/geo/1.0/direct"
    // assuming that the first city returned is correct
    if (code){
        queryString = geocodingApiRoot + "?q="+searchString+','+code+'&limit=1&appid='+API_key
    } else {
        queryString = geocodingApiRoot + "?q="+searchString+'&limit=1&appid='+API_key
    }
    
    return queryString
}

function queryAPI(queryString){
    fetch(queryString,{
        cache: 'reload',
    })
    .then(function(response){
        console.log(response);
        // returns the response json data to the next promise
        return response.json();
    })
    .then(function(data){
        for(let i=0; i<data.length; i++){
            console.log(data[i].name);
            console.log(data[i].lat);
            console.log(data[i].lon);
            console.log(data[i].country);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function runSearch(event){
    event.preventDefault();
    // check there is a string in the data-choice parameter
    let cityInputEl = $('#city_search_input');
    let citySearchText = cityInputEl.attr('data-choice');
    console.log(`city text before query is: ${citySearchText}`)
    // case for city text being present
    if(citySearchText){
        console.log(`Country index before building query is ${countryChoiceIndex}`)
        let currentCountryAlpha2 = countries.alpha2[countryChoiceIndex];
        let currentCountryAlpha3 = countries.alpha3[countryChoiceIndex];
        let currentCountryCioc = countries.cioc[countryChoiceIndex];
        let queryString = makeQueryString(citySearchText, currentCountryAlpha3);
        console.log(queryString);
        queryAPI(queryString);
    // if user doesn't put in a city
    } else {
        console.log(`Country index before building query is ${currentCountryCioc}`)
        console.log('User did not specify a city')
    }
    
}
