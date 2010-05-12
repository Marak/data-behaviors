debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});