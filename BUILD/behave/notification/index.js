debug.log('this is a nofication');

// setup the notification behavior





	// initialize widget on a container, passing in all the defaults.
	// the defaults will apply to any notification created within this
	// container, but can be overwritten on notification-by-notification
	// basis.
	$container = $(options.selector).notify();
	
	// create two when the pg loads
	for(var i = 0; i < 5; i++){
	  create("default", { title:'Default Notification', text:'Example of a default notification.  I will fade out after 5 seconds'});
	}
  create("sticky", { title:'Sticky Notification', text:'Example of a "sticky" notification.  Click on the X above to close me.'},{ expires:false });
