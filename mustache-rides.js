// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var MR = {};
MR.version = "0.0.1";
MR.com = {};
MR.behave = {}
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

MR.com.lists.simple = function(options){// an argument call "options" is sent to every component by default
// any data you want to pass to a component, must be done through the options has

// options are all optional by default (perhaps build a way to verify / require options for each component to verify this)
/*
  options.data => contains the data model which will be used to generated this component.
  options.behaviors => contains behaviors which we will want to add to this component after its created

*/

this.render = function(values){
  var str = '<ul>';
  for(var key in values){
    if(typeof values[key]=='object' && values[key] != null){
      str+='<li>'+key+this.render(values[key])+'</li>';
    }
    else{
      str+='<li>'+key;
      if(values[key]!=''){
        str+= ' : ' + values[key];
      }
     str+='</li>';
   }
  }
  str+='</ul>';
  return str;
};

return this.render(options.data);};

MR.com.modals = {};

MR.com.modals.alert = {};

MR.com.modals.alert = function(options){};

MR.com.modals.box = {};

MR.com.modals.box = function(options){};

MR.com.modals.confirmation = {};

MR.com.modals.confirmation = function(options){};


MR.behave.autocomplete = {};

MR.behave.autocomplete = function(options){};

MR.behave.clickable = {};

MR.behave.clickable = function(options){debug.log('apply the behavior!');};

MR.behave.dirty = {};

MR.behave.dirty = function(options){};

MR.behave.dragAndDrop = {};

MR.behave.dragAndDrop = function(options){};

MR.behave.focusIn = {};

MR.behave.focusIn.keyboard = {};

MR.behave.focusIn.keyboard = function(options){};

MR.behave.focusIn.mouse = {};

MR.behave.focusIn.mouse = function(options){};

MR.behave.focusOut = {};

MR.behave.focusOut.keyboard = {};

MR.behave.focusOut.keyboard = function(options){};

MR.behave.focusOut.mouse = {};

MR.behave.focusOut.mouse = function(options){};

MR.behave.hover = {};

MR.behave.hover = function(options){};

MR.behave.is_valid = {};

MR.behave.keyboard = {};

MR.behave.killed = {};

MR.behave.killed = function(options){};

MR.behave.ready = {};

MR.behave.ready = function(options){};

MR.behave.sortable = {};

MR.behave.sortable = function(options){};

