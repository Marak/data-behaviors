/* debug window behavior */
$('.ui-dialog').css({'position':'absolute','left': '12px', 'top':'5px', 'width':'350px', 'height':'550px'});
$(options.selector).html('<div class = "debugOutput"></div>');

// default debug text
$('.debugOutput').append('<strong>data-behaviors started.</strong> <br/> debug.log and error statements will print in this window');
$('.debugOutput').css({'overflow':'auto', 'height':'90%'});

// bind to special debugging named event we have on the document
$(document).bind('/debug', function(e, args){
  $('.debugOutput').prepend(prettyPrint(args));
})