// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var behave = {};

behave.version = "0.0.1";

// custom DEBUG setting for turning on / off robust behavior debugging. note: this is not going to disable the debugger completely, its just a way of setting custom debug levels
behave.DEBUG = false; 

behave = {};

$.fn.behavior = function(settings) {
  var config = {'foo': 'bar'};
  if (settings) $.extend(config, settings);
  this.each(function() {
    // element-specific code here
  });
  return this;
};

behave.attach = function( selector ){
  debug.log('attempting to apply behaviors to the following elements ', selector)
  $(selector).each(function(i,e){
    if(behave.DEBUG){
      debug.log('found element: ', e);
    }
    var behaviors = $(e).attr('data-behaviors').split(' ');
    for(var behavior in behaviors){
      var b = behaviors[behavior];
      // parse behavior name for sub-behaviors
      // the labeling approach of behaviors on DOM elements is as follows
      // fooBehavior-sub-sub2 turns into =>  behaviors.fooBehavior.sub.sub2()
      b = b.replace(/\-/, '.');
      // evil eval is evil, but benign here
      var d = eval($(e).attr('data-resource'));
      try{
        // evil eval is evil, but benign here
        eval('behave.'+b+'({"selector":e,"data":d})')
        if(behave.DEBUG){
          debug.log(b , ' behavior successfully attached!');
        }
      }
      catch(err){
        debug.log('an error occurred trying to attach behavior: ', b, ' ', err);
        $(selector).html('<span class = "error">error occurred trying to render behavior: ' + b + ' ' + err.message + '</span>');
      }
    }
  });
  
};

{{{behaves}}}