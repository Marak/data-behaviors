// presenter logic goes here
$('#navOutput').machine({
 'state':"/",
 
 entered:function(state){

  debug.log('navOutput entered state', state);
  debug.log(this);

  // views.behaviors.charts.view(); 
  $(this).html(state.toString());
  
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

