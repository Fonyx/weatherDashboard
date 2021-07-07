// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);

weatherApiRoot = "https://api.openweathermap.org/data/2.5/onecall"
weatherParams = "?lat={lat}&lon={lon}&exclude={part}&appid={API_key}"


API_key = "cfa986a892adc335000bb8a3ce3c9c06"
part = ['minutely', 'hourly', 'daily', 'alerts']  // leaving current only

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
    console.log(`Querying weather api with city: ${city.name}`)

}

function runSearch(event){
    event.preventDefault();
    // check there is a string in the data-choice parameter
    let cityInputEl = $('#city_search_input');
    let citySearchText = cityInputEl.attr('data-choice');

    if(citySearchText){
        geocodingApiRoot = "http://api.openweathermap.org/geo/1.0/direct"
        let queryString = geocodingApiRoot + "?q="+citySearchText+'&limit=1&appid='+API_key
        queryLocationAPI(queryString, citySearchText);
    // if user doesn't put in a city
    } else {
        console.log('User did not specify a city')
    }

    // clean up form after process
    let form = $('#search_form')[0];
    form.reset();
    // prevent refreshing the page
    return false;
    
}
