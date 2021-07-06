// Add the parallax for images across the window using jquery 
// - see https://materializecss.com/parallax.html
$(document).ready(function(){
  $('.parallax').parallax();
});

let countries_api = "https://restcountries.eu/rest/v2/all"

fetch(countries_api, {
    cache: 'default',
})
.then(function(response){
    return response.json();
}).then(function(data){
  // build a countries object and add country names
  let countries = new Object()
    for(let i=0; i<data.length; i++){
      // append country name with null for the optional image url
      countries[data[i].name] = null
    }
    // make the autocomplete use the country list
    buildCountryAutocomplete(countries);
});

// add autocomplete to the city entry input
function buildCountryAutocomplete(countries_json){
  $(document).ready(function(){
    $('#city_search_input').autocomplete({
      data: countries_json,
    });
  });
  console.log('built autocomplete');
}
