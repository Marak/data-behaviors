// machine turns elements into state machines
// the default state machine configuration will do nested layouts with partials


$(options.selector).machine({
 'state':"/",
 
 entered:function(state){

  debug.log($(options.selector), 'entered state: ', state);
  debug.log(this);

  // views.behaviors.charts.view(); 
  $(this).html(state.toString());
  
  var context = machine.getContext($(this));

  var state = $(context).data('state');

  debug.log('the closest machine state is ', context, 'it has a state of ', state); 

  if(context.length>1){
    var lultext = 'views';
    for(var i = 0; i < context.length; i ++){
      lultext += ('.' + $(context[i]).data('state'));
    }
    lultext += ('.view();');
    debug.log(lultext);
    var view = eval(lultext);
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
  views[state].presenter();
  
 }
});
