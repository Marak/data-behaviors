// machine turns elements into state machines
// the default state machine configuration will do nested layouts with partials

$(options.selector).machine({
 'state':"/",
 
 // through defining this default entered state we are implying a convention of nested layouts
 entered:function(state){

  debug.log('state entered: ', state, $(this));
  
  // get the context of this machine as an array
  var context = machine.getContext($(this));

  debug.log($(this), 'the context of this machine is ', context); 

  var lultext = 'views';
  
  if(context.length){
    for(var i = 0; i < context.length; i ++){
      lultext += ('.' + $(context[i]).data('state'));
    }
    var v1 = lultext + ('.view();');
    var p1 = lultext + ('.presenter();');
    //debug.log(v1);
    try{
      var view = eval(v1);
    }
    catch(err){
      // TODO: find the closest context and put in a nice error message
      debug.log('view failed to render ', err);
      return false;
    }
    
  }
  else{
    debug.log('no context length');
    var view = views[state].view();
  }
  
  
  // render views based on JUP templates 
        
  if(typeof view == 'object'){
    var html = JUP.html(view);
  }
  else{
    var html = view;
  }

  
  // inject the view into the DOM
  $(this).html(html);

  // parse the dom looking for tags that have a date-behaviors attribute
  behave.attach($("[data-behaviors]"));

  // apply the presenter on the view
  try{
    eval(p1);
  }
  catch(err){
    // TODO: find the closest context and put in a nice error message
    debug.log('presenter failed to present view ', err);
    return false;
  }
  
  //views[state].presenter();
  
 }
});
