// this is the base behavior for input validators 
// we are going to assume that the valid beahvior will only be applied to elements of type "input"
// the valid behavior will handle all events associated with validation, the actual validation logic is located
// in sub-behaviors (sub-folders) of the "valid" behavior (such as : email, creditcard, zipcode, etc..)

$(options.selector).blur(function(e){


  var behaviors = $(this).attr('data-behaviors').split(' ');
  
  for(var b in behaviors){
    if(behaviors[b].search('valid-') >= 0){
      var str = behaviors[b].replace('valid-', '');
      var result = behave.behaviors.valid[str]({"value":$(this).val()});
      if(result){
        valid();
      }
      else{
        notValid();
      } 
      debug.log(str + ': ' + result);
      // now that we can determined we have a validator type, lets check against that type
    }
  }
  debug.log(behaviors);
  debug.log($(this), ' lost focus, try to validatse')
});

function valid(){
  debug.log('valid');
  return 'valid';
};

function notValid(){
  debug.log('notValid');
  return 'notValid';
};