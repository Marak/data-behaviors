// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var MR = {};
MR.version = "0.0.1";
MR.views = {};
MR.com = {};
MR.behave = {}
MR.views.explorer = {};

MR.views.explorer = '<h3>hello i am a simple list</h3><ul data-resource = "users" data-action = "get"><ul>';


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

MR.com.inputs.text = {};

MR.com.inputs.text = function(options){};

MR.com.lists = {};

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

MR.com.modals = {};

MR.com.modals.alert = {};

MR.com.modals.alert = function(options){};

MR.com.modals.box = {};

MR.com.modals.box = function(options){};

MR.com.modals.confirmation = {};

MR.com.modals.confirmation = function(options){};


MR.behave.autocomplete = {};

MR.behave.autocomplete = function(options){};

MR.behave.click = {};

MR.behave.click = function(options){debug.log('apply click behavior!');

$(options.selector).click(function(e){
  debug.log(this, 'got clicked!')
});};

MR.behave.dirty = {};

MR.behave.dirty = function(options){};

MR.behave.dragAndDrop = {};

MR.behave.dragAndDrop = function(options){};

MR.behave.focusIn = {};

MR.behave.focusIn = function(options){debug.log('apply focusIn behavior!');

$(options.selector).focus(function(e){
  debug.log(this, 'got focus!')
});};

MR.behave.focusOut = {};

MR.behave.focusOut = function(options){debug.log('apply focus out behavior!');


$(options.selector).blur(function(e){
  debug.log(this, 'lost focus!')
});};

MR.behave.hover = {};

MR.behave.hover = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

MR.behave.is_valid = {};

MR.behave.keyboard = {};

MR.behave.killed = {};

MR.behave.killed = function(options){};

MR.behave.ready = {};

MR.behave.ready = function(options){};

MR.behave.sortable = {};

MR.behave.sortable = function(options){};

