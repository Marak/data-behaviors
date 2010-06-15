// machine turns elements into state machines
// the default state machine configuration will do nested layouts with partials

$(options.selector).machine({
 'state':"/",
 
 // through defining this default entered state we are implying a convention of nested layouts
 entered:function(state){

  debug.log('state entered: ', state);
  
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
    var m1 = lultext + ('.model();');
        
    //debug.log(v1);
    try{
      var view = eval(v1);
    }
    catch(err){
      // TODO: find the closest context and put in a nice error message
      debug.log('view failed to render ', err);
      return false;
    }
    
    
    try{
      var model = eval(m1);
    }
    catch(err){
      var model = {};
    }
    
    
  }
  else{
    // switch the view based on incoming state (route)
    var view = views[state].view();
    try{
      var model = views[state].model();
    }
    catch(err){
      debug.log('no model for this view');
      model = {};
    }
    
  }
  
  // render views based on JUP templates 
     
  if(typeof view == 'object'){
    var html = JUP.html(view);
  }
  else{
    var html = view;
  }

  debug.log('model is', model);
  // attempt to mustache up the model
  html = Mustache.to_html(view, model);
  
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
