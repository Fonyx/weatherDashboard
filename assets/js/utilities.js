// Add the parallax for images across the window using jquery 
// - see https://materializecss.com/parallax.html
$(document).ready(function(){
  $('.parallax').parallax();
});

// makes a jquery element with class and Id
// makeNewJqueryElement :: (String, String, String, String, Object) -> Jquery.newElement
function makeNewJqueryElement(elementType, classString, idString, textString, dataValue){
  let newElement = $('<'+elementType+'>');
  if(classString){
      newElement.addClass(classString);
  }
  if(idString){
      newElement.attr('id', idString);
  }
  if(textString){
    newElement.text(textString);
  }
  if(dataValue){
    newElement.attr('data-'+dataValue.name, dataValue.value);
  }
  return newElement;
}

let countryInputEL = $('#country_search_input');
countryInputEL.on('change', function(){
  countryChoiceIndex = -1;
})

countriesApiRoot = "https://restcountries.eu/rest/v2/all"

countries = {
  names_null: [],
  names: [],
  alpha2: [],
  alpha3: [],
  cioc: [],
}

countryChoiceIndex = -1;

// query the countries api for a list of countries
fetch(countriesApiRoot, {
    cache: 'default',
})
.then(function(response){
    return response.json();
}).then(function(data){
  // build a countries object and add country names
    for(let i=0; i<data.length; i++){
      // append country name with null for the optional image url
      countries.names_null[data[i].name] = null;
      countries.names[i] = data[i].name;
      countries.alpha2[i] = data[i].alpha2Code;
    }
    // make the autocomplete use the country list
    buildCountryAutocompleteOnLoad(countries.names_null);
});

function getCountryIndexFromCountryName(str){
  for(let i=0; i < countries.names.length; i++){
    if(countries.names[i] === str){
      return i;
    }
  }
}

// add autocomplete to the city entry input
function buildCountryAutocompleteOnLoad(countries_json){
  $(document).ready(function(){
    $('#country_search_input').autocomplete({
      data: countries_json,
      onAutocomplete: function(val) {

      // Callback function when value is autocompleted.
      let searchInputEl = $('#country_search_input');

      // set the data-value to the autocomplete value
      searchInputEl.attr('data-choice', val);
      countryChoiceIndex = getCountryIndexFromCountryName(val);
    },
    });
  });
}
// this is some complicated jquery - ref https://stackoverflow.com/questions/51220450/materializecss-is-there-any-event-when-an-item-is-selected-from-the-autocomplet


// || SCREEN SIZE MODE CHANGER
window.addEventListener('resize', logPixelSizeAndMaterializePrefix);

function logPixelSizeAndMaterializePrefix(){
    let currentWidth = window.innerWidth;

    // console.log(`New Width: ${currentWidth}`);

    if(currentWidth <= 600){
        // console.log(`width: ${currentWidth} Materialize prefix: s`);
        console.log(' Materialize prefix: s')
    } else if (currentWidth > 600 && currentWidth <= 992){
        // console.log(`width: ${currentWidth} Materialize prefix: m`)
        console.log(' Materialize prefix: m')
    } else if (currentWidth > 992 && currentWidth <= 1200){
        // console.log(`width: ${currentWidth} Materialize prefix: l`)
        console.log(' Materialize prefix: l')
    } else {
        // console.log(`width: ${currentWidth} Materialize prefix: xl`)
        console.log(' Materialize prefix: xl')
    }

}