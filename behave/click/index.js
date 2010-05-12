debug.log('apply click behavior!');

$(options.selector).click(function(e){
  debug.log(this, 'got clicked!')
});