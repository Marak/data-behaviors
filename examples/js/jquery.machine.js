// create the machine selector

$.fn.machine = function(settings) {
  var config = {
    state : "default",
    entering : function(){
      debug.log('entering state');
    },
    entered : function(){
      debug.log('entered state');
    },
    exiting : function(){
      debug.log('exiting state');
    },
    exited : function(){
      debug.log('exited state');
    }
  };

  //if (settings) $.extend(config, settings);
  var settings = settings || config;
  
  debug.log('machine behavior being applied to ', $(this) , settings);
  
  $(this).data( 'machine' , settings );        
  return this;
};

// create the machine itself
var machine = {};
machine.enter = function( state ){
  debug.log('entering state : ', state);
  // a new state has been entered, find all elements that are machines and check if they match
  $("[data-behaviors*='machine']").each(function(i,e){
    var stateMachine = $(e).data('machine') || false;
    if(stateMachine){
      debug.log(stateMachine, $(e));
      //debug.log('the state is ', state);
      stateMachine.entered( state );
      //$(e).data('machine');
    }
    
  });
  
  
};