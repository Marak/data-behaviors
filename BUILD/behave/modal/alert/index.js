/* 

 an alert modal is a modal window that only has one option, "OK". there shouldn't be any custom logic in an alert modal
 aside from a message and an "OK" button. the modal-alert behavior is suppose to emulate the browser's "alert" method
 if you need a confirmation box you should be using modal-confirm, if you need a custom modal you should be using modal-custom

*/

/* first we are going to hide all the modals, these should already be hidden via CSS before we get here */
$(options.selector).hide();

/* 
 we need to identify any elements that can trigger the modal to open and then bind the open modal event to these elements
 the current strategy is to use the ID of the modal as the CLASS of the object that should open it
 
 example : 
   <input type = "button" value = "open modal-alert" class = "modal-alert-1">
   <div id = "modal-alert-1" data-behaviors = "modal-alert" >This is an alert modal, click OK to continue. </div>

   now that the ID of the modal matches the CLASS of the object that should open it, we have a way of associating elements to modals

*/

var theId = $(options.selector).attr('id');
debug.log(theId);
$('.' + theId).click(function(e){
 debug.log('click event for button');
 $(options.selector).dialog({ 
   "resizable" : false,
   "closeOnEscape": false,
   "modal" : true
  }); 
});

//debug.log('dom id'+ id);

/* */