// add event listener to form submit button
let submitButton = $('#search-button');
submitButton.on('click', runSearch);


function runSearch(event){
    // check there is a string in the data-choice parameter
    let inputEl = $('#city_search_input')
    let searchText = inputEl.attr('data-choice');
    console.log(searchText);
}