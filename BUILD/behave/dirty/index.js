debug.log('dirty binded');

debug.log(options.selector);


// custom dirty behaviors for diffirents types of data binding
var bindType = $(options.selector).attr('type');


switch(bindType){
  
  case 'text' :
    $(options.selector).data('original_value', $(options.selector).val());
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).keyup(function(e){
      ng = $(this).val();
      if(og != ng){
        debug.log('is dirty!')
      }
      else{
        debug.log('is clean!');
      }
    });
  break;

  case 'checkbox' :
    debug.log('checkbox');
  break;

  
}

