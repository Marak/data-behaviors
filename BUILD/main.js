// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var behave = {};
var views = {};

behave.version = "0.0.1";

// custom DEBUG setting for turning on / off robust behavior debugging. note: this is not going to disable the debugger completely, its just a way of setting custom debug levels
behave.DEBUG = false; 


$.fn.behavior = function(settings) {
  var config = {'foo': 'bar'};
  if (settings) $.extend(config, settings);
  this.each(function() {
    // element-specific code here
  });
  return this;
};

behave.attach = function( selector ){
  //debug.log('attempting to apply behaviors to the following elements ', selector)
  $(selector).each(function(i,e){
    if(behave.DEBUG){
      debug.log('found element: ', e);
    }
    var behaviors = $(e).attr('data-behaviors').split(' ');
    //debug.log(behaviors);
    for(var behavior in behaviors){
      var b = behaviors[behavior];
      
      // the labeling approach of behaviors on DOM elements is as follows, fooBehavior-sub-sub2 turns into =>  behave.fooBehavior.sub.sub2()
      b = b.replace(/\-/, '.'); // parse behavior name for sub-behaviors
      
      //debug.log('is it already behaving as? ', b);

      var behaving = $(e).data('behaving') || []; // get the existing behaviors or an empty array
      
      var found = false;
      for(var i = 0; i < behaving.length; i++){
        if(behaving[i]==b){
          found = true;
        }
      }
      
      //debug.log(e, ' behaving as ', behaving);
      
      try{
        var d = eval($(e).attr('data-resource')); //evil eval is evil, but somewhat benign here
        
        if(!found){
          behaving.push(b);
          
          // execute the behavior method which will attach the behavior to the element. 
          eval('behave.'+b+'({"selector":e,"data":d})'); // evil eval is evil, but somewhat benign here

          // assign behaving meta-data so we know how the element is behaving
          $(e).data('behaving', behaving);
          if(behave.DEBUG){
            debug.log(b , ' behavior successfully attached!');
          }
        }
        else
        {
          if(behave.DEBUG){
            debug.log('already behaving as, not attached ', b);
          }
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

{{{views}}}