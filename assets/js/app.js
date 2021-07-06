// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

let weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
let weatherParams = "?lat={lat}&lon={lon}&exclude={part}&appid={API_key}"
let API_key = "cfa986a892adc335000bb8a3ce3c9c06"
let part = ['minutely', 'hourly', 'daily', 'alerts']  // leaving current only
// let lat = 33.44
// let long = -94.04


// direct geocoding answer
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function runSearch(event){
    event.preventDefault();
    // check there is a string in the data-choice parameter
    let inputEl = $('#city_search_input')
    let searchText = inputEl.attr('data-choice');
    queryWeatherApi(searchText);
}


function queryWeatherApi(searchString){
    console.log(`Querying weather api with ${searchString}`);

}