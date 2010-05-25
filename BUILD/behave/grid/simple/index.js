// define grid options
var opts = {
	enableCellNavigation: false,
  enableColumnReorder: false
};

// define grid columns
var columns = eval($(options.selector).attr('data-resource')).columns;

// define grid data
var data = eval($(options.selector).attr('data-resource')).data;

// create new grid instance
new Slick.Grid($(options.selector), data, columns, opts);
