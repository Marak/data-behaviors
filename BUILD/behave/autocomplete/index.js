/**************** open-behaviors - autocomplete ****************

    the autocomplete behavior will turn a text area into an autoauggest box
    
    arguments : 
      options.selector 
        css selector or DOM node that we are going to apply the behavior to
      options.data
        data that we are going to bind to the autosuggest
    
*/

$(options.selector).autocomplete({
  source: options.data
});