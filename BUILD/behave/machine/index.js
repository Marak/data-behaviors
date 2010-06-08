// machine turns elements into state machines
// the default state machine configuration will do nested layouts with partials


$(options.selector).machine({
 'state':"/",
 
 entered:function(state){

  debug.log($(options.selector), 'entered state: ', state);
  
  // get the context of this machine as an array
  var context = machine.getContext($(this));

  debug.log('the context of this machine is ', context); 

  if(context.length>1){
    var lultext = 'views';
    for(var i = 0; i < context.length; i ++){
      lultext += ('.' + $(context[i]).data('state'));
    }
    var v1 = lultext + ('.view();');
    var p1 = lultext + ('.presenter();');
    debug.log(v1);
    try{
      var view = eval(v1);
    }
    catch(err){
      // TODO: find the closest context and put in a nice error message
      debug.log(err);
      return false;
    }
  }
  else{
    // switch the view based on incoming state (route)
    var view = views[state].view();
  }
  
  
  
  // render views based on JUP templates
  var html = JUP.html(view);
  
  //debug.log(html);
  $(this).html(html);

  // parse the dom looking for tags that have a date-behaviors attribute
  behave.attach($("[data-behaviors]"));

  // apply the presenter on the view
  eval(p1);
  //views[state].presenter();
  
 }
});
