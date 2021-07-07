// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

let weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
let weatherParams = "?lat={lat}&lon={lon}&exclude={part}&appid={API_key}"
let API_key = "cfa986a892adc335000bb8a3ce3c9c06"
let part = ['minutely', 'hourly', 'daily', 'alerts']  // leaving current only
// let lat = 33.44
// let long = -94.04


function makeQueryString(searchString, country){
    // direct geocoding answer - https://openweathermap.org/api/geocoding-api
    let openWeatherRoot = "http://api.openweathermap.org/geo/1.0/direct"
    // assuming that the first city returned is correct
    queryString = openWeatherRoot + "?q="+searchString+'&limit=1&appid='+API_key
    return queryString
}

function runSearch(event){
    event.preventDefault();
    // check there is a string in the data-choice parameter
    let cityInputEl = $('#city_search_input');
    let citySearchText = cityInputEl.attr('data-choice');
    let countryInputEL = $('#country_search_input');
    let countrySearchText = countryInputEL.attr('data-choice');
    let queryString = makeQueryString(citySearchText, countrySearchText);
    console.log(queryString);
}
