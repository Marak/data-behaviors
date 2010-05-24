var dataView;
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

