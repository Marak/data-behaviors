// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var MR = {};
MR.version = "0.0.1";
MR.views = {};
MR.com = {};
MR.behave = {}
MR.views.explorer = {};

MR.views.explorer = '<h3>hello i am a simple list</h3><ul data-resource = "users" data-action = "get"><ul>';


MR.com.forms = {};

MR.com.forms.login = {};

MR.com.forms.login = function(options){};

MR.com.forms.resource = {};

MR.com.forms.resource = function(options){};

MR.com.forms.search = {};

MR.com.forms.search = function(options){};

MR.com.forms.signup = {};

MR.com.forms.signup = function(options){};

MR.com.grids = {};

MR.com.grids.complex = {};

MR.com.grids.complex = function(options){};

MR.com.grids.simple = {};

MR.com.grids.simple = function(options){};

MR.com.inputs = {};

MR.com.inputs.checkbox = {};

MR.com.inputs.checkbox = function(options){};

MR.com.inputs.date = {};

MR.com.inputs.date = function(options){};

MR.com.inputs.dropdown = {};

MR.com.inputs.dropdown = function(options){};

MR.com.inputs.range = {};

MR.com.inputs.range = function(options){};

MR.com.inputs.rating = {};

MR.com.inputs.rating = function(options){};

MR.com.inputs.slider = {};

MR.com.inputs.slider = function(options){};

MR.com.inputs.text = {};

MR.com.inputs.text = function(options){};

MR.com.lists = {};

MR.com.lists.combobox = {};

MR.com.lists.simple = {};

MR.com.lists.simple = function(options){
/* 
this.foo = function(yarg){
  return 'bary';
};


{{#list}}
  {{>listItem}}
{{/list}}

return this.render(options.data);

*/};

MR.com.misc = {};

MR.com.misc.zoom = {};

MR.com.misc.zoom = function(options){};

MR.com.modals = {};

MR.com.modals.alert = {};

MR.com.modals.alert = function(options){};

MR.com.modals.confirmation = {};

MR.com.modals.confirmation = function(options){};

MR.com.modals.tooltip = {};

MR.com.modals.window = {};

MR.com.modals.window = function(options){};

MR.com.navigation = {};

MR.com.navigation.accordion = {};

MR.com.navigation.accordion = function(options){};

MR.com.navigation.carousel = {};

MR.com.navigation.carousel = function(options){};

MR.com.navigation.tabs = {};

MR.com.navigation.tabs = function(options){};

MR.com.notification = {};

MR.com.notification.flash = {};

MR.com.notification.flash = function(options){};

MR.com.notification.progress = {};

MR.com.notification.progress = function(options){};


MR.behave.autocomplete = {};

MR.behave.autocomplete = function(options){};

MR.behave.chart = {};

MR.behave.chart.bar = {};

MR.behave.chart.bar = function(options){
 options.series = eval($(options.selector).attr('data-resource')).series;

chart = new Highcharts.Chart({
				chart: {
					renderTo: options.selector,
					defaultSeriesType: 'column'
				},
				title: {
					text: 'Monthly Average Rainfall'
				},
				subtitle: {
					text: 'Source: WorldClimate.com'
				},
				xAxis: {
					categories: [
						'Jan', 
						'Feb', 
						'Mar', 
						'Apr', 
						'May', 
						'Jun', 
						'Jul', 
						'Aug', 
						'Sep', 
						'Oct', 
						'Nov', 
						'Dec'
					]
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Rainfall (mm)'
					}
				},
				legend: {
					layout: 'vertical',
					backgroundColor: '#FFFFFF',
					style: {
						left: '100px',
						top: '70px',
						bottom: 'auto'
					}
				},
				tooltip: {
					formatter: function() {
						return '<b>'+ this.series.name +'</b><br/>'+
							this.x +': '+ this.y +' mm';
					}
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
			        series: options.series
			});
};

MR.behave.chart.gauge = {};

MR.behave.chart.gauge = function(options){};

MR.behave.chart.pie = {};

MR.behave.chart.pie = function(options){ options.data = eval($(options.selector).attr('data-resource')).data;
 options.title = eval($(options.selector).attr('data-resource')).title;
 

 
 
   var chart;
			chart = new Highcharts.Chart({
				chart: {
					renderTo: options.selector,
					margin: [50, 200, 60, 170]
				},
				title: {
					text: options.title
				},
				plotArea: {
					shadow: null,
					borderWidth: null,
					backgroundColor: null
				},
				tooltip: {
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
					}
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						dataLabels: {
							enabled: true,
							formatter: function() {
								if (this.y > 5) return this.point.name;
							},
							color: 'white',
							style: {
								font: '13px Trebuchet MS, Verdana, sans-serif'
							}
						}
					}
				},
				legend: {
					layout: 'vertical',
					style: {
						left: 'auto',
						bottom: 'auto',
						right: '50px',
						top: '100px'
					}
				},
			  series: [{
					type: 'pie',
					name: 'Browser share',
					data: options.data
					//data: [3.40, 1.05, 2.90, 1.65, 1.35, 2.59, 1.39, 3.07, 2.82]
				}]
			});

};

MR.behave.chart.sparkline = {};

MR.behave.chart.sparkline = function(options){};

MR.behave.dirty = {};

MR.behave.dirty = function(options){//debug.log('dirty binded');

//debug.log(options.selector);

$(options.selector).behavior('dirty').bind('got_dirty', function(){
  //debug.log('is dirty!', $(options.selector));
  $(options.selector).data('is_dirty', true);
});

$(options.selector).behavior('dirty').bind('is_clean', function(){
  debug.log('is clean!', $(options.selector));
  $(options.selector).data('is_clean', true);
});


// custom dirty behaviors for diffirents types of data binding
var bindType = options.selector.nodeName;

//debug.log(bindType);
if(bindType == 'INPUT'){
  bindType = options.selector.type;
}

switch(bindType){
  
  case 'text' :
    $(options.selector).data('original_value', $(options.selector).val());
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).keyup(function(e){
      ng = $(this).val();
      if(og != ng){
        is_dirty();
      }
      else{
        is_clean();
      }
    });
  break;

  case 'checkbox' :
    //debug.log('checkbox');
    $(options.selector).data('original_value', $(options.selector).attr('checked'));
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).change(function(e){
      ng = $(this).attr('checked');
      if(og != ng){
        is_dirty();
      }
      else{
        is_clean();
      }
    });
  break;

  case 'SELECT' :
    //debug.log('select box');
    $(options.selector).data('original_value', $(options.selector).val());
    var og = $(options.selector).data('original_value');
    var ng = null;
    $(options.selector).change(function(e){
      ng = $(this).val();
      if(og != ng){
        is_dirty();
      }
      else{
        is_clean();
      }
    });
  break;

  
}

};

MR.behave.dragAndDrop = {};

MR.behave.dragAndDrop = function(options){};

MR.behave.grid = {};

MR.behave.grid.complex = {};

MR.behave.grid.complex = function(options){var dataView;
var grid;
var data = [];
var selectedRowIds = [];

var columns = [
	{id:"sel", name:"#", field:"num", behavior:"select", cssClass:"cell-selection", width:40, cannotTriggerInsert:true, resizable:false, unselectable:true },
	{id:"title", name:"Title", field:"title", width:120, minWidth:120, cssClass:"cell-title", editor:TextCellEditor, validator:requiredFieldValidator, setValueHandler:updateItem, sortable:true},
	{id:"duration", name:"Duration", field:"duration", editor:TextCellEditor, setValueHandler:updateItem, sortable:true},
	{id:"%", name:"% Complete", field:"percentComplete", width:80, resizable:false, formatter:GraphicalPercentCompleteCellFormatter, editor:PercentCompleteCellEditor, setValueHandler:updateItem, sortable:true},
	{id:"start", name:"Start", field:"start", minWidth:60, editor:DateCellEditor, setValueHandler:updateItem, sortable:true},
	{id:"finish", name:"Finish", field:"finish", minWidth:60, editor:DateCellEditor, setValueHandler:updateItem, sortable:true},
	{id:"effort-driven", name:"Effort Driven", width:80, minWidth:20, maxWidth:80, cssClass:"cell-effort-driven", field:"effortDriven", formatter:BoolCellFormatter, editor:YesNoCheckboxCellEditor, setValueHandler:updateItem, cannotTriggerInsert:true, sortable:true}
];

var options = {
	editable: true,
	enableAddRow: true,
	enableCellNavigation: true,
	asyncEditorLoading: true,
	forceFitColumns: false,
        secondaryHeaderRowHeight: 25
};

var sortcol = "title";
var sortdir = 1;
var percentCompleteThreshold = 0;
var searchString = "";

function requiredFieldValidator(value) {
	if (value == null || value == undefined || !value.length)
		return {valid:false, msg:"This is a required field"};
	else
		return {valid:true, msg:null};
}

function myFilter(item) {
	if (item["percentComplete"] < percentCompleteThreshold)
		return false;

	if (searchString != "" && item["title"].indexOf(searchString) == -1)
		return false;

	return true;
}

function percentCompleteSort(a,b) {
	return a["percentComplete"] - b["percentComplete"];
}

function comparer(a,b) {
	var x = a[sortcol], y = b[sortcol];
	return (x == y ? 0 : (x > y ? 1 : -1));
}

function updateItem(value,columnDef,item) {
	item[columnDef.field] = value;
	dataView.updateItem(item.id,item);
}

function addItem(columnDef,value) {
	var item = {"id": "new_" + (Math.round(Math.random()*10000)), "title":"New task", "duration":"1 day", "percentComplete":0, "start":"01/01/2009", "finish":"01/01/2009", "effortDriven":false};
	item[columnDef.field] = value;
	dataView.addItem(item);
}


    function toggleFilterRow() {
        if ($(grid.getSecondaryHeaderRow()).is(":visible"))
            grid.hideSecondaryHeaderRow();
        else
            grid.showSecondaryHeaderRow();
    }


    $(".grid-header .ui-icon")
        .addClass("ui-state-default ui-corner-all")
        .mouseover(function(e) {
            $(e.target).addClass("ui-state-hover")
        })
        .mouseout(function(e) {
            $(e.target).removeClass("ui-state-hover")
        });

$(function()
{
	// prepare the data
	for (var i=0; i<50000; i++) {
		var d = (data[i] = {});

		d["id"] = "id_" + i;
            d["num"] = i;
		d["title"] = "Task " + i;
		d["duration"] = "5 days";
		d["percentComplete"] = Math.round(Math.random() * 100);
		d["start"] = "01/01/2009";
		d["finish"] = "01/05/2009";
		d["effortDriven"] = (i % 5 == 0);
	}


	dataView = new Slick.Data.DataView();
	grid = new Slick.Grid($("#myGrid2"), dataView.rows, columns, options);
	var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
	var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);


        // move the filter panel defined in a hidden div into an inline secondary grid header row
        $("#inlineFilterPanel")
            .appendTo(grid.getSecondaryHeaderRow())
            .show();


	grid.onAddNewRow = addItem;

	grid.onKeyDown = function(e) {
            // select all rows on ctrl-a
            if (e.which != 65 || !e.ctrlKey)
                return false;

            var rows = [];
            selectedRowIds = [];

            for (var i = 0; i < dataView.rows.length; i++) {
                rows.push(i);
                selectedRowIds.push(dataView.rows[i].id);
            }

            grid.setSelectedRows(rows);

            return true;
        };

	grid.onSelectedRowsChanged = function() {
            selectedRowIds = [];
            var rows = grid.getSelectedRows();
            for (var i = 0, l = rows.length; i < l; i++) {
                selectedRowIds.push(dataView.rows[rows[i]].id);
            }
        };

	grid.onSort = function(sortCol, sortAsc) {
            sortdir = sortAsc ? 1 : -1;
            sortcol = sortCol.field;

            // using native sort with comparer
            // preferred method but can be very slow in IE with huge datasets
            //dataView.sort(comparer,sortAsc);

            // using temporary Object.prototype.toString override
            // more limited and does lexicographic sort only by default, but can be much faster

            var percentCompleteValueFn = function() {
                var val = this["percentComplete"];
                if (val < 10)
                    return "00" + val;
                else if (val < 100)
                    return "0" + val;
                else
                    return val;
            }

            // use numeric sort of % and lexicographic for everything else
            dataView.fastSort((sortcol=="percentComplete")?percentCompleteValueFn:sortcol,sortAsc);
        };

	// wire up model events to drive the grid
	dataView.onRowCountChanged.subscribe(function(args) {
		grid.updateRowCount();
            grid.render();
	});

	dataView.onRowsChanged.subscribe(function(rows) {
		grid.removeRows(rows);
		grid.render();

		if (selectedRowIds.length > 0)
		{
			// since how the original data maps onto rows has changed,
			// the selected rows in the grid need to be updated
			var selRows = [];
			for (var i = 0; i < selectedRowIds.length; i++)
			{
				var idx = dataView.getRowById(selectedRowIds[i]);
				if (idx != undefined)
					selRows.push(idx);
			}

			grid.setSelectedRows(selRows);
		}
	});

	dataView.onPagingInfoChanged.subscribe(function(pagingInfo) {
		var isLastPage = pagingInfo.pageSize*(pagingInfo.pageNum+1)-1 >= pagingInfo.totalRows;
		grid.setOptions({enableAddRow:isLastPage||pagingInfo.pageSize==0});
	});



	var h_runfilters = null;

	// wire up the slider to apply the filter to the model
	$("#pcSlider,#pcSlider2").slider({
		"range":	"min",
		"slide":	function(event,ui) {
                Slick.GlobalEditorLock.cancelCurrentEdit();

			if (percentCompleteThreshold != ui.value)
			{
				window.clearTimeout(h_runfilters);
				h_runfilters = window.setTimeout(dataView.refresh, 10);
				percentCompleteThreshold = ui.value;
			}
		}
	});


	// wire up the search textbox to apply the filter to the model
	$("#txtSearch,#txtSearch2").keyup(function(e) {
            Slick.GlobalEditorLock.cancelCurrentEdit();

		// clear on Esc
		if (e.which == 27)
			this.value = "";

		searchString = this.value;
		dataView.refresh();
	});

	$("#btnSelectRows").click(function() {
		if (!Slick.GlobalEditorLock.commitCurrentEdit()) { return; }

		var rows = [];
		selectedRowIds = [];

		for (var i=0; i<10 && i<dataView.rows.length; i++) {
			rows.push(i);
			selectedRowIds.push(dataView.rows[i].id);
		}

		grid.setSelectedRows(rows);
	});


	// initialize the model after all the events have been hooked up
	dataView.beginUpdate();
	dataView.setItems(data);
	dataView.setFilter(myFilter);
	//dataView.setPagingOptions({pageSize:25});
	dataView.endUpdate();

	$("#gridContainer").resizable();
})

};

MR.behave.grid.simple = {};

MR.behave.grid.simple = function(options){// define grid options
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
};

MR.behave.highlightable = {};

MR.behave.highlightable = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

MR.behave.hover = {};

MR.behave.hover = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

MR.behave.ready = {};

MR.behave.ready = function(options){};

MR.behave.sortable = {};

MR.behave.sortable = function(options){};

MR.behave.tokenize = {};

MR.behave.tokenize = function(options){};

