// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var MR = {};
MR.version = "0.0.1";
MR.views = {};
MR.com = {};
MR.behave = {}
MR.views.explorer = {};

MR.views.explorer = '<h3>hello i am a simple list</h3><ul data-resource = "users" data-action = "get"><ul>';


MR.com.charting = {};

MR.com.charting.bar = {};

MR.com.charting.bar = function(options){};

MR.com.charting.gauge = {};

MR.com.charting.gauge = function(options){};

MR.com.charting.pie = {};

MR.com.charting.pie = function(options){};

MR.com.charting.sparkline = {};

MR.com.charting.sparkline = function(options){};

MR.com.forms = {};

MR.com.forms.login = {};

MR.com.forms.login = function(options){};

MR.com.forms.resource = {};

MR.com.forms.resource = function(options){};

MR.com.forms.search = {};

MR.com.forms.search = function(options){};

MR.com.forms.signup = {};

MR.com.forms.signup = function(options){};

MR.com.grids = {};

MR.com.grids.complex = {};

MR.com.grids.complex = function(options){};

MR.com.grids.simple = {};

MR.com.grids.simple = function(options){};

MR.com.inputs = {};

MR.com.inputs.checkbox = {};

MR.com.inputs.checkbox = function(options){};

MR.com.inputs.date = {};

MR.com.inputs.date = function(options){};

MR.com.inputs.dropdown = {};

MR.com.inputs.dropdown = function(options){};

MR.com.inputs.range = {};

MR.com.inputs.range = function(options){};

MR.com.inputs.rating = {};

MR.com.inputs.rating = function(options){};

MR.com.inputs.slider = {};

MR.com.inputs.slider = function(options){};

MR.com.inputs.text = {};

MR.com.inputs.text = function(options){};

MR.com.lists = {};

MR.com.lists.combobox = {};

MR.com.lists.simple = {};

MR.com.lists.simple = function(options){
/* 
this.foo = function(yarg){
  return 'bary';
};


{{#list}}
  {{>listItem}}
{{/list}}

return this.render(options.data);

*/};

MR.com.misc = {};

MR.com.misc.zoom = {};

MR.com.misc.zoom = function(options){};

MR.com.modals = {};

MR.com.modals.alert = {};

MR.com.modals.alert = function(options){};

MR.com.modals.confirmation = {};

MR.com.modals.confirmation = function(options){};

MR.com.modals.tooltip = {};

MR.com.modals.window = {};

MR.com.modals.window = function(options){};

MR.com.navigation = {};

MR.com.navigation.accordion = {};

MR.com.navigation.accordion = function(options){};

MR.com.navigation.carousel = {};

MR.com.navigation.carousel = function(options){};

MR.com.navigation.tabs = {};

MR.com.navigation.tabs = function(options){};

MR.com.notification = {};

MR.com.notification.flash = {};

MR.com.notification.flash = function(options){};

MR.com.notification.progress = {};

MR.com.notification.progress = function(options){};


MR.behave.autocomplete = {};

MR.behave.autocomplete = function(options){};

MR.behave.dirty = {};

MR.behave.dirty = function(options){debug.log('dirty binded');

debug.log(options.selector);

$(options.selector).behavior('dirty').bind('got_dirty', function(){
  debug.log('is dirty!', $(options.selector));
  $(options.selector).data('is_dirty', true);
});

$(options.selector).behavior('dirty').bind('is_clean', function(){
  debug.log('is clean!', $(options.selector));
  $(options.selector).data('is_clean', true);
});


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

};

MR.behave.dragAndDrop = {};

MR.behave.dragAndDrop = function(options){};

MR.behave.highlightable = {};

MR.behave.highlightable = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

MR.behave.hover = {};

MR.behave.hover = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

MR.behave.ready = {};

MR.behave.ready = function(options){};

MR.behave.sortable = {};

MR.behave.sortable = function(options){};

MR.behave.tokenize = {};

MR.behave.tokenize = function(options){};

