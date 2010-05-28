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

MR.behave.grid.custom = {};

MR.behave.grid.custom = function(options){  // boilerplate code for a custom grid implementation, designed to be easily hackable
  // you probaly should be using grid-simple or grid-complex or slickgrid, not this one
  
  var grid = {};
  var data = options.data;
  
  //init default sorter metadata for each column (this could be embedded via metadata plugin)
  $($('#currentActions th')[0]).data('sorter', {"field":"medium_name","order":"DESC","type":"string"});
  $($('#currentActions th')[1]).data('sorter', {"field":"formatted_electricity","order":"DESC","type":"numeric"});
  $($('#currentActions th')[2]).data('sorter', {"field":"formatted_electricity_savings","order":"DESC","type":"numeric"});
  $($('#currentActions th')[3]).data('sorter', {"field":"estimated_points","order":"DESC","type":"numeric"});


  


    
  if ($("#currentActions").size() == 1) {
    $.ajax({
      "type" : "GET",
      "data" : {},
      "dataType":"json",
      "url" : "/js",
      beforeSend: function(xhrObj){
        $('#currentActions tbody').html("<tr><td class='loading' colspan='5'>\
          <img src='/images/ajax-loader.gif' alt='loading...' />\
          Please wait while we load your actions...\
          </td></tr>");
          xhrObj.setRequestHeader("Content-Type", "application/json")    
      },
      success: function(rsp){
        
        $('.take_action input').attr('disabled', false);
        $('.take_action select').attr('disabled', false);
        
        $('#currentActions tbody').html("")

        debug.log(rsp);

        data = rsp.result.data;
        committed_commitments_data = rsp.result.committed_commitments_data;
        goals.actual_points              = parseInt(rsp.result.actual_points);
        goals.actual_electricity_savings = parseInt(rsp.result.actual_electricity_savings);
        goals.projection_adjustment      = parseFloat(rsp.result.projection_adjustment);
        
        // render grids 
        grid.render('#currentActions', data);
        committedGrid.render('#committedActions', committed_commitments_data);
        
        var c1 =  $($('#currentActions th')[1]);
        var c2 =  $($('#committedActions th')[1]);
        
        $('#currentActions th').removeClass('selected');  
        $('#currentActions td').removeClass('selected');  
        $(c1).addClass('selected');
        $('#currentActions td:nth-child( ' + ($(c1).index() + 1) + ')').addClass('selected');

        $('#committedActions th').removeClass('selected');  
        $('#committedActions td').removeClass('selected');  
        $(c2).addClass('selected');
        $('#committedActions td:nth-child( ' + ($(c2).index() + 1) + ')').addClass('selected');
        

      }
    });
  }

grid.output_options = {};

grid.renderBody = function(){};
grid.renderHeader = function(){};


grid.render = function(selector, data){
 
  debug.log('grid.render()', selector, data);
  //var data = sortColumn(selector, $($('#currentActions th')[1]));  

  // clear table body of old results
  $(selector + ' tbody').html('');
  // rebind data to table
  $(selector).data('records', data);    
  
  // update table header if we are changing up the featureColumn
//  var tableHeader = $('#currentActions' + ' th')[1];
  debug.log(data);
  for(var i = 0 ; i<data.length; i++){
    
    debug.log(data[i]);
    //debug.log(data[i].short_name);
    // while rendering the table rows we need to determine if a row is suppose to be hidden or not
    // rows might be hidden based on the two checkboxes "Purchases" and "No Cost"
    var trClass = "hide";
    
 
    // slight hack for displaying labels on cell items, ideally they should be metadata on the JSON object are already recieving to populate the tables
    var cellContent = '';
    cellContent = '<span class = "action_table_savings_value">'+data[i]+'</span>&nbsp;';
    
    // insert table row into table body
    var newRow = '<tr class = '+trClass+'>\
      <td class = "main">\
      <a href="#" rel="'+data[i].path+'" class = "add show_ajax_dialog" title = "Add this action to your savings plan"></a>\
      <a class = "show_ajax_dialog sortByThisValue" href="#" rel="'+data[i].path+'">'+data[i].medium_name+'</a></td>\
      <td>'+cellContent+'</td>\
      <td><span class = "action_table_savings_value">$'+data[i].formatted_electricity_savings+'</span></td>\
      <td><span class = "action_table_savings_value">'+data[i].estimated_points+'</span></td>\
      <td class = "remove hideItem"><a title="Customize this action" class="edit show_ajax_dialog" href="#" rel="'+data[i].path+'"></a></td>\
    </tr>';
    
    
    // if we are sent a single record, it means we are adding a new committment to our savings plan
    if(data.length==1){
      // if this is the case we should preprend the row so it appears on the top of the grid
      $(selector + ' tbody').prepend(newRow);
  
      // bind the unique path of committment to row so we can extract it out later for doing grid updates
      $(selector + ' tbody tr:first').data('path', data[i].short_name);
  
      //bind the entire record to the table row (it would be possible to remove the databind above this line)
      $(selector + ' tbody tr:first').data('record', data[i]);
      
      
    }
    else{
      // else send results to bottom of grid
      $(selector + ' tbody').append(newRow);
  
      // bind the unique path of committment to row so we can extract it out later for doing grid updates
      $(selector + ' tbody tr:last').data('path', data[i].short_name);
  
      //bind the entire record to the table row (it would be possible to remove the databind above this line)
      $(selector + ' tbody tr:last').data('record', data[i]);
      
      
    }
    
    
    
    // bind the unique path of committment to row so we can extract it out later for doing grid updates
    $(selector + ' tbody tr:last').data('path', data[i].short_name);
    
    //bind the entire record to the table row (it would be possible to remove the databind above this line)
    $(selector + ' tbody tr:last').data('record', data[i]);
    
  }

  // apply row highlighting
  highlightGridRows(selector);

  // after render, apply behaviors
  grid.behave(selector);
};

grid.behave = function(selector){
  sorter(selector);
};



// this lookup table shouldnt be here, we should be getting properly returned objects from the server with the information we want 
unit_lookup_table = {
  "formatted_electricity":"kWh"
  ,"upfront_cost":""
  ,"payback_period":""
  ,"formatted_carbon":"lbs"
  ,"formatted_natural_gas":"therms"
  ,"formatted_fuel_oil":"gal"
  ,"formatted_propane":"gal"
  ,"formatted_water":"gal"
  ,"formatted_paper":"lbs"
};

savings_lookup_table = {
  "carbon":"lbs. CO<sub>2</sub>"
  ,"natural_gas":"therms Natural Gas"
  ,"fuel_oil":"gal. Fuel Oil"
  ,"propane":"gal. Propane"
  ,"water":"gal. Water"
  ,"paper":"lbs. Paper"
};

highlightGridRows = function(selector){
  $('tbody tr', $(selector)).removeClass('even');
  $('tbody tr:even', $(selector)).addClass('even');
};

monthsFormatter = function(months){
  
  // custom formatting for months and years based on Zeke's input
  // two years or less should be diplayed as months
  // over two years should be displayed as years, rounded to the closest year
  // 23 months = 23 months
  // 25 months = 2 years
  // 31 months = 3 years
  // 54 months = 5 years
  
  if(months<=24){
    return '<span class = "action_table_savings_value">' + months + '</span> months';
  }
  return '<span class = "action_table_savings_value">' + Math.round(months / 12) + '</span>' + ' years';
  
};

// end dashboard logic

// meta-tablesorter - inspirired by the original jQuery tableSorter (www.tablesorter.com) but sorts on bound data, not actual column values

sort = function(options){

  debug.log('sorting options: ', options);
  var records = options.data;
  
  switch(options.type)
  {
    case 'numeric':
      if(options.order == 'ASC'){
        records = records.sort(sort_by(options.field, false, parseInt));
      }
      else{
        records = records.sort(sort_by(options.field, true, parseInt));
      }
    break;
    case 'string':
      try{
        if(options.order == 'ASC'){
          records = records.sort(sort_by(options.field, false, function(a){return a.toUpperCase()}));
        }
        else{
          records = records.sort(sort_by(options.field, true, function(a){return a.toUpperCase()}));  
        }
      }
      catch(err){
      }
    break;
    default:
    break;
  }

  /*
  for(var r in records){
    debug.log(records[r]['usage'][options.field]);
  }
  */

  return records;
  
};

thClickHandler = function(selector, column){

  var sortedData = sortColumn(selector, $(column));
  
  // refactor this block
  if($(selector).attr('id') == 'currentActions'){
    grid.render(selector, sortedData);
    $('#currentActions th').removeClass('selected');  
    $('#currentActions td').removeClass('selected');  
    $(column).addClass('selected');
    $('#currentActions td:nth-child( ' + ($(column).index() + 1) + ')').addClass('selected');
  }
  else if($(selector).attr('id') == 'savingsPlan'){
      savingsPlan.render(selector, sortedData);
      $('#savingsPlan th').removeClass('selected');  
      $('#savingsPlan td').removeClass('selected');  
      $(column).addClass('selected');
      $('#savingsPlan td:nth-child( ' + ($(column).index() + 1) + ')').addClass('selected');

      var c =  $(column).index();
      c =  $($('#availablePlan th')[c]);
      sortedData = sortColumn($('#availablePlan'), c); // cheating since the second table has no headers or sorter defined
      savingsPlan.render('#availablePlan', sortedData);
      $('#availablePlan th').removeClass('selected');  
      $('#availablePlan td').removeClass('selected');  
      c.addClass('selected');
      $('#availablePlan td:nth-child( ' + (c.index() + 1) + ')').addClass('selected');
      
  }
  else{
    committedGrid.render(selector, sortedData);
    $('#committedActions th').removeClass('selected');  
    $('#committedActions td').removeClass('selected');  
    $(column).addClass('selected');
    $('#committedActions td:nth-child( ' + ($(column).index() + 1) + ')').addClass('selected');
  }
  // ^^ refactor this block
  
  // put a small timeout on the rebind to prevent click spamming
    setTimeout(function(){
      $('th', $(selector)).click(function(){
        debug.log('table header row got clicked');      
        $('th', $(selector)).unbind('click');
        thClickHandler(selector, $(this));
      });
    }, 400);

};

sorter = function(selector, options){

  // determine if this selector has had the sorter behavior applied to it

    if($(selector).data('behaviors') != 'tablesorter'){
      $(selector).data('behaviors', 'tablesorter');
      debug.log('binding sort to : #', $(selector).attr('id'));    
      // since the behavior doesnt exist, bind the method to the click event
      $('th', $(selector)).click(function(){
        debug.log('table header row got clicked');
        $('th', $(selector)).unbind('click');
        thClickHandler(selector, $(this));
      });
    }
    else{ // sort behavior is already bound, but we are being asked to bind it again, this means we trigger a sort update
    }

  };

  sortColumn = function(selector, column){
    
    debug.log('sortColumn ', selector, ' ' ,column)
    
    //sorting information is stored in the tables header
    var sorter = $(column).data('sorter') || undefined;
    
    debug.log($(column));
    
    if(typeof sorter == 'undefined'){
      debug.log('no sorter was found, returning all records');
      return $(selector).data('records');
    }
  
    debug.log('found a sorter ', sorter)
  
    var sortedData = sort({
      "data":$(selector).data('records'),
      "field":sorter.field,
      "type":sorter.type,
      "order":sorter.order
    });



    // toggle sort order and rebind data
    if(sorter.order=='ASC'){
      sorter.order = 'DESC';
      $(column).removeClass('headerSortUp headerSortDown');    
      $(column).addClass('headerSortDown');    
    }
    else{
      sorter.order = 'ASC';
      $(column).removeClass('headerSortDown headerSortUp');      
      $(column).addClass('headerSortUp');    
    }
    
    $(column).data('sorter', sorter)
    
    return sortedData;
    
  };

  var sort_by = function(field, reverse, primer){

    debug.log('calling sort_by');

     reverse = (reverse) ? -1 : 1;

     return function(a,b){

         a = a[field];
         b = b[field];
         
         // simple normalization of values that should be returned to browser as numeric values
         // remember that the argument 'primer' may have the value of parseInt, so we need normalize to numbers
         
         try{
           a = helpers.formatNumber(a);
           b = helpers.formatNumber(b);
         }
         catch(err){
           // this isn't ideal, but the memory and cpu footprint should be minimal
           debug.log('error in formatting');
         }
         
         if (typeof(primer) != 'undefined'){
             a = primer(a);
             b = primer(b);
         }

         if (a<b) return reverse * -1;
         if (a>b) return reverse * 1;
         return 0;

     }
  };
// end meta-tablesorter

// move this block of code to helpers.js 
var helpers = {};
helpers.formatNumber = function(numbery, options){
  // "numbery" is like a number, but not really
  // we will format numbery into a real number and return it as Number()
  //if(typeof numerby == 'undefined'){return '';}
  //var options = options || {"coherse":true};
  var number = numbery.toString();
  number = number.replace(/\,/g,''); // replace all commas - $1,923 becomes $1923
  number = number.replace(/$/,''); // replace all dollars signs - $1923 becomes 1923
  return number;
  
  if(options.coherse){
    return Number(number); // forces ECMAScript built in Number() type check
  }
  else{
    return number;
  }
};

function mixin(obj1, obj2){
  
  for(var prop in obj2){
    obj1[prop] = obj2[prop];
  }
  return obj1;
  
}

// end helpers.js

function formatPayback(data){
  for(var i = 0 ; i<data.length; i++){

    // custom formatting logic as specified by Zeke, https://efficiency20.lighthouseapp.com/projects/11631/tickets/4969-payback-period-sorting
    if( data[i]['payback_period_in_months'] == 0){
      if( data[i]['upfront_cost'] == 0 ){
        data[i]['payback_period_in_months'] = 0;
      }
      else{
        data[i]['payback_period_in_months'] = 9999999;
      }
    }


  }
  
  
  return data;
}



// start
grid.render(options.selector, data);};

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

MR.behave.inputs = {};

MR.behave.inputs.checkbox = {};

MR.behave.inputs.checkbox = function(options){};

MR.behave.inputs.date = {};

MR.behave.inputs.date = function(options){ $(options.selector).datepicker();};

MR.behave.inputs.dropdown = {};

MR.behave.inputs.dropdown = function(options){};

MR.behave.inputs.range = {};

MR.behave.inputs.range = function(options){};

MR.behave.inputs.rating = {};

MR.behave.inputs.rating = function(options){};

MR.behave.inputs.slider = {};

MR.behave.inputs.slider = function(options){};

MR.behave.inputs.text = {};

MR.behave.inputs.text = function(options){};

MR.behave.ready = {};

MR.behave.ready = function(options){};

MR.behave.sortable = {};

MR.behave.sortable = function(options){};

MR.behave.tokenize = {};

MR.behave.tokenize = function(options){};
