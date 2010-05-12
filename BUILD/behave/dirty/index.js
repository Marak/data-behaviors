debug.log('dirty binded');

debug.log(options.selector);


var is_dirty = function(){
  debug.log('is dirty!', $(options.selector));
  $(options.selector).data('is_dirty', true);
};

var is_clean = function(){
  debug.log('is clean!', $(options.selector));
  $(options.selector).data('is_dirty', false);  
};

// custom dirty behaviors for diffirents types of data binding
var bindType = options.selector.nodeName;

debug.log(bindType);
if(bindType == 'INPUT'){
  bindType = options.selector.type;
}

switch(bindType){
  
  case 'text' :
    $(options.selector).data('original_value', $(options.selector).val());
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).keyup(function(e){
      ng = $(this).val();
      if(og != ng){
        is_dirty();
      }
      else{
        is_clean();
      }
    });
  break;

  case 'checkbox' :
    debug.log('checkbox');
    $(options.selector).data('original_value', $(options.selector).attr('checked'));
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).change(function(e){
      ng = $(this).attr('checked');
      if(og != ng){
        is_dirty();
      }
      else{
        is_clean();
      }
    });
  break;

  case 'SELECT' :
    debug.log('select box');
    $(options.selector).data('original_value', $(options.selector).val());
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).change(function(e){
      ng = $(this).val();
      if(og != ng){
        is_dirty();
      }
      else{
        is_clean();
      }
    });
  break;

  
}

