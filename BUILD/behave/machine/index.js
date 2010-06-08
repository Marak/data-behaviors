// machine turns elements into state machines
// the default state machine configuration will do nested layouts with partials


$(options.selector).machine({
 'state':"/",
 
 entered:function(state){

  debug.log($(options.selector), 'entered state: ', state);
  debug.log(this);

  // views.behaviors.charts.view(); 
  $(this).html(state.toString());
  
  // determine the context of the view we are in
  var parentState = $(this).parents().closest("[data-behaviors*='machine']").data('state');
  
  debug.log('the closest machine state is ', parentState); 
  
  // switch the view based on incoming state (route)
  var view = views[state].view();
  
  // render views based on JUP templates
  var html = JUP.html(view);
  
  //debug.log(html);
  $(this).html(html);

  // parse the dom looking for tags that have a date-behaviors attribute
  behave.attach($("[data-behaviors]"));

  // apply the presenter on the view
  views[state].presenter();
  
 }
});
