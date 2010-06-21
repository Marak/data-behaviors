// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var behave = {};

behave.version = "0.0.1";

// custom DEBUG setting for turning on / off robust behavior debugging. 
// note: this is not going to disable the debugger completely, its just a way of setting custom debug levels internally in the application
behave.DEBUG = true; 

behave.behaviors = {};

// behave.attach will take in a selector and check that selector for elements that have the data-behaviors attribute
// we should just migrate this code into the behaviors jQuery plugin


/* behavior jQuery plugin shortcut for developers */
$.fn.behave = function(settings) {
  $('[data-behaviors]',this).each(function(i,e){

    if(behave.DEBUG){ // if we have enabled application level debugging, show extra data
      debug.log('found element: ', e);
    }

    // get all behaviors based on the data-behaviors attribute of element : "e" and split into an array based on " "
    var behaviors = $(e).attr('data-behaviors').split(' ');

    // for each behavior we found on that element
    for(var behavior in behaviors){

      // create an alias for the behavior (syntax sugar)
      var b = behaviors[behavior];

      /*  replace the behavior name with its actual method call in the behave object
          the labeling approach of data-behaviors on DOM elements is as follows:

              dashes become period
              the last word after the last period is the method name we are going to call

              EXAMPLE:
              fooBehavior-sub-sub2 turns into =>  behave.fooBehavior.sub.sub2()
              grid-custom turns into => grid.custom()
      */

      b = b.replace(/\-/, '.'); // parse behavior name for sub-behaviors

      // we store metadata about how an element is already behaving on the "behaving" property on the elements jQuery.data()
      var behaving = $(e).data('behaving') || []; // if there is no state information, assign an empty array

      // we are currently in a loop attempting to apply behaviors in elements.
      // we are going to create a boolean for the current "b" and then loop through 
      // our elements existing behaviors, checking if we have found a match
      // we perform this check as we don't want to rebind a behavior if its already applied
      // we might want to change this logic in the future to allow reapply behaviors to reset 
      // the behavior of the element back to its original state 
      var found = false;
      for(var i = 0; i < behaving.length; i++){
        if(behaving[i]==b){
          found = true;
        }
      }

      if(!found){

        try{
            // push the current behavior "b", to the behaving array (which contains the current behaviors from our element)
            behaving.push(b);

            // pull the data from the data-source tag, this block of code might make more sense being a seperate library
            var d = eval($(e).attr('data-resource')); //evil eval is evil, but somewhat benign here

            // execute the behavior method which will attach the behavior to the element.
            // perhaps this code could be written a bit cleaner and without eval() 
            eval('behave.behaviors.'+b+'({"selector":e,"data":d})'); // evil eval is evil, but somewhat benign here

            // assign behaving meta-data back to elementso we know how the element is behaving
            $(e).data('behaving', behaving);
            if(behave.DEBUG){  // show debug output if application level debugging is enabled
              debug.log(b , ' behavior successfully attached!');
            }
        }
        catch(err){
          debug.log('could NOT apply behavior ' + b + ' to element: ', e);
        }
      }  
      else{ // we aren't going to apply this behavior, as the element is already behaving this way
        if(behave.DEBUG){ // show debug output if application level debugging is enabled
          debug.log('already behaving as, not attached ', b);
        }
      }
    }  
  });
};

{{{behaves}}}
