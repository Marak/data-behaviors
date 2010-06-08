// presenter logic goes here
$('#subOutput').machine({
 'state':"/",
 
 entered:function(state){

  //  views.behaviors.charts.view(); 
  $('#subOutput').html(state.toString());
  
    debug.log('subOutput entered state');  
    // switch the view based on incoming state (route)
    var view = views.behaviors[state].view();
    // render views based on JUP templates
    var html = JUP.html(view);
    //debug.log(html);
    $('#behaviors').html(html);

    // parse the dom looking for tags that have a date-behaviors attribute
    behave.attach($("[data-behaviors]"));

    // apply the presenter on the view
    //views.behaviors.presenter();
  
 }
});

