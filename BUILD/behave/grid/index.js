/**************** open-behaviors - grid ****************

    the grid behavior will turn a div into a basic default SlickGrid
    if you want more advanced grid behaviors, try grid-complex or grid-sortable
    
    arguments : 
      options.selector 
        css selector or DOM node that we are going to apply the behavior to
      options.data
        data that we are going to bind to the grid
    
*/



// define grid options
var opts = {
	enableCellNavigation: false,
  enableColumnReorder: false
};

// create new grid instance
new Slick.Grid($(options.selector), options.data.rows, options.data.columns, opts);
