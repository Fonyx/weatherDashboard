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
      onAutocomplete: function(val) {
      // Callback function when value is autocompleted.
      let searchInputEl = $('#city_search_input');
      // set the data-value to the autocomplete value
      searchInputEl.attr('data-choice', val);
      console.log('Added autocomplete choice to the data-value of the input');
      //Here you then can do whatever you want, val tells you what got clicked so you can push to another page etc...
    },
    });
  });
}

