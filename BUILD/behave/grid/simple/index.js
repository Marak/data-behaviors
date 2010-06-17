// define grid options
var opts = {
	enableCellNavigation: false,
  enableColumnReorder: false
};



// create new grid instance
new Slick.Grid($(options.selector), options.data.rows, options.data.columns, opts);
