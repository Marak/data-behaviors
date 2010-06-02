// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var behave = {};

behave.version = "0.0.1";

behave = {};

behave.attach = function( selector ){
  
        
        $(selector).each(function(i,e){
          
          var behaviors = $(e).attr('data-behaviors').split(' ');
          for(var behavior in behaviors){
            var b = behaviors[behavior];
            // parse behavior name for sub-behaviors
            // the labeling approach of behaviors on DOM elements is as follows
            // fooBehavior-sub-sub2 turns into =>  behaviors.fooBehavior.sub.sub2()
            b = b.replace(/\-/, '.');
            debug.log(e);
            
             // evil eval is evil, but benign here
            var d = eval($(e).attr('data-resource'));
            
            try{
              // evil eval is evil, but benign here
              eval('behave.'+b+'({"selector":e,"data":d})')
            }
            catch(err){
       
              debug.log('error occurred trying to render behavior: ', b, ' ', err);
              $(selector).html('<span class = "error">error occurred trying to render behavior: ' + b + ' ' + err.message + '</span>');
            }
            
          }
          
        });
  
  
  
};

{{{behaves}}}