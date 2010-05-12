debug.log('apply focus out behavior!');


$(options.selector).blur(function(e){
  debug.log(this, 'lost focus!')
});