/* ugly ass raw JS nested list builder, we should make this Mustache or at least easier to read */
/* force menu to only do one level, TODO : make it work nested, possible share code with nested list behavior */

this.render = function(values){
 var str = '<ul>';
 for(var key in values){
   str+='<li><a href = "#/'+key+'">'+key+'</a></li>';
  }
 str+='</ul>';
 return str;
};

// render the list
$(options.selector).html(this.render(options.data));

// attach states to element
$('a', options.selector).click(function(e){
  
  var state = $(this).attr('href');
  machine.enter( state.replace('#/','') );
  
  // just for fun
  location.hash = state.toString();
  
  // cancel event bubbling
  return false;
});
