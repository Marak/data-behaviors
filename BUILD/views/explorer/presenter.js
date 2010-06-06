// presenter logic goes here

debug.log('presenter binded to view');

$('#navOutput').machine({
 'state':"/",
 
 entered:function(state){

  //  views.explorer.charts.view(); 
  $('#navOutput').html(state.toString());
  //alert(state);
  
  // render views based on JUP templates
  var view = views.explorer.charts.view();
  var html = JUP.html(view);
  debug.log(html);
  $('#navOutput').html(html);
  
  // parse the dom looking for tags that have a date-behaviors attribute
  behave.attach($("[data-behaviors]"));

  // apply the presenter on the view
  //views.explorer.presenter();
  
 }
});

