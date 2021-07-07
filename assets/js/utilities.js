// Add the parallax for images across the window using jquery 
// - see https://materializecss.com/parallax.html
$(document).ready(function(){
  $('.parallax').parallax();
});

// makes a jquery element with class and Id
function makeNewJqueryElement(elementType, classString, idString, textString){
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
  return newElement;
}