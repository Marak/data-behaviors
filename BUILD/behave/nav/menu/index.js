/* ugly ass raw JS nested list builder, we should make this Mustache or at least easier to read */
/* force menu to only do one level, TODO : make it work nested, possible share code with nested list behavior */

this.render = function(values){
 var str = '<ul>';

 if(values instanceof Array){
   for(var i = 0; i < values.length; i++){
     str+='<li><a href = "#/'+values[i]+'">'+values[i]+'</a></li>';
   }
 }
 else{
   for(var key in values){
     str+='<li><a href = "#/'+key+'">'+key+'</a></li>';
   }
 }

 str+='</ul>';
 return str;
};


// render the list
$(options.selector).html(this.render(options.data));

// attach states to element
$('a', options.selector).click(function(e){
  
  // lets hardcode a parent context here, this should be part of the default view engine
  var context = $(this).closest("[data-behaviors*='machine']");
  if(!context.length){
    context = document;
  }
  
  debug.log('our context is ', context);
  $(this).addClass('visited');
  
  var state = $(this).attr('href');
  machine.enter( state.replace('#/',''), context );
  
  // just for fun
  location.hash = state.toString();
  
  // cancel event bubbling
  return false;
});
