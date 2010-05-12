debug.log('apply focusIn behavior!');

$(options.selector).focus(function(e){
  debug.log(this, 'got focus!')
});