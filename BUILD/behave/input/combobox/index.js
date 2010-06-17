/**************** open-behaviors - combobox ****************

    the combobox behavior will turn a select input into a multiselect combobox
    
    arguments : 
      options.selector
        css selector or DOM node that we are going to apply the behavior to
      options.data
        data that we are going to bind to the select
    
*/


$(options.selector).append('<option value = "" selected = "selected">'+'Select a value...'+'</option>');

for(var item in options.data[0]){
  $(options.selector).append('<option value = "'+item+'">'+options.data[0][item]+'</option>');
} 
$(options.selector).attr('multiselect', 'multiselect');
$(options.selector).multiSelect();