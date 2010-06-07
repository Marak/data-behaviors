// this is just boilerplate code for generating the actual mustache-rides.js file, do not use this outside of node_builder.js
var behave = {};
var views = {};
behave.version = "0.0.1";
// custom DEBUG setting for turning on / off robust behavior debugging. note: this is not going to disable the debugger completely, its just a way of setting custom debug levels
behave.DEBUG = false; 
$.fn.behavior = function(settings) {
  var config = {'foo': 'bar'};
  if (settings) $.extend(config, settings);
  this.each(function() {
    // element-specific code here
  });
  return this;
};
behave.attach = function( selector ){
  //debug.log('attempting to apply behaviors to the following elements ', selector)
  $(selector).each(function(i,e){
    if(behave.DEBUG){
      debug.log('found element: ', e);
    }
    var behaviors = $(e).attr('data-behaviors').split(' ');
    //debug.log(behaviors);
    for(var behavior in behaviors){
      var b = behaviors[behavior];
      
      // the labeling approach of behaviors on DOM elements is as follows, fooBehavior-sub-sub2 turns into =>  behave.fooBehavior.sub.sub2()
      b = b.replace(/\-/, '.'); // parse behavior name for sub-behaviors
      
      //debug.log('is it already behaving as? ', b);
      var behaving = $(e).data('behaving') || []; // get the existing behaviors or an empty array
      
      var found = false;
      for(var i = 0; i < behaving.length; i++){
        if(behaving[i]==b){
          found = true;
        }
      }
      
      //debug.log(e, ' behaving as ', behaving);
      
      try{
        var d = eval($(e).attr('data-resource')); //evil eval is evil, but somewhat benign here
        
        if(!found){
          behaving.push(b);
          // execute the behavior method which will attach the behavior to the element. 
          eval('behave.'+b+'({"selector":e,"data":d})'); // evil eval is evil, but somewhat benign here
          // assign behaving meta-data so we know how the element is behaving
          $(e).data('behaving', behaving);
        }
        
        
        if(behave.DEBUG){
          debug.log(b , ' behavior successfully attached!');
        }
      }
      catch(err){
        debug.log('an error occurred trying to attach behavior: ', b, ' ', err);
        $(selector).html('<span class = "error">error occurred trying to render behavior: ' + b + ' ' + err.message + '</span>');
      }
    }
  });
  
};
behave.autocomplete = {};

behave.autocomplete = function(options){$(options.selector).autocomplete({
  source: ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby"]
});};

behave.chart = {};

behave.chart.bar = {};

behave.chart.bar = function(options){
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

behave.chart.gauge = {};

behave.chart.gauge = function(options){};

behave.chart.pie = {};

behave.chart.pie = function(options){ options.data = eval($(options.selector).attr('data-resource')).data;
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

behave.chart.sparkline = {};

behave.chart.sparkline = function(options){};

behave.dirty = {};

behave.dirty = function(options){//debug.log('dirty binded');

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

behave.dragAndDrop = {};

behave.dragAndDrop = function(options){};

behave.grid = {};

behave.grid.complex = {};

behave.grid.complex = function(options){var dataView;
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

behave.grid.custom = {};

behave.grid.custom = function(options){  // boilerplate code for a custom grid implementation, designed to be easily hackable
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

behave.grid.simple = {};

behave.grid.simple = function(options){// define grid options
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

behave.highlightable = {};

behave.highlightable = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

behave.hover = {};

behave.hover = function(options){debug.log('apply hover behavior!');

$(options.selector).mouseover(function(e){
  debug.log(this, 'hover')
});};

behave.input = {};

behave.input.button = {};

behave.input.button = function(options){/* */};

behave.input.checkbox = {};

behave.input.checkbox = function(options){};

behave.input.date = {};

behave.input.date = function(options){ $(options.selector).datepicker();};

behave.input.range = {};

behave.input.range = function(options){};

behave.input.rating = {};

behave.input.rating = function(options){};

behave.input.select = {};

behave.input.select = function(options){};

behave.input.slider = {};

behave.input.slider = function(options){};

behave.input.text = {};

behave.input.text = function(options){};

behave.list = {};

behave.list.nested = {};

behave.list.nested = function(options){debug.log(options);

/* ugly ass raw JS nested list builder, we should make this Mustache or at least easier to read */
this.render = function(values){
 var str = '<ul>';
 
 for(var key in values){
   
   if(typeof values[key]=='object' && values[key] != null){
     str+='<li>'+key+this.render(values[key])+'</li>';
   }
   else{
     if(values instanceof Array){
       str+='<li>'+values[key];
     }
     else{
       str+='<li>'+key;
       if(values[key]!='' && typeof values[key] != 'function'){
           str+= ' : ' + values[key];
       }
     }
    str+='</li>';
   }
  }
 
 str+='</ul>';
 return str;
};

$(options.selector).html(this.render(options.data));
};

behave.list.simple = {};

behave.list.simple = function(options){debug.log(options);

/* ugly ass raw JS nested list builder, we should make this Mustache or at least easier to read */
this.render = function(values){
 var str = '<ul>';
 
 for(var key in values){
   
   if(typeof values[key]=='object' && values[key] != null){
     str+='<li>'+key+this.render(values[key])+'</li>';
   }
   else{
     if(values instanceof Array){
       str+='<li>'+values[key];
     }
     else{
       str+='<li>'+key;
       if(values[key]!=''){
         str+= ' : ' + values[key];
       }
     }
    str+='</li>';
   }
  }
 
 str+='</ul>';
 return str;
};

$(options.selector).html(this.render(options.data));
};

behave.machine = {};

behave.machine = function(options){$(options.selector).machine();};

behave.misc = {};

behave.misc.zoom = {};

behave.misc.zoom = function(options){};

behave.modal = {};

behave.modal.alert = {};

behave.modal.alert = function(options){/* 

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

/* */};

behave.modal.confirm = {};

behave.modal.confirm = function(options){/* 

 a confirm modal is a modal window that has two options, "OK" and "Cancel". 
 if you need a custom modal you should be using modal-custom

*/


$(options.selector).hide();

/* $(options.selector).dialog(); */};

behave.modal.custom = {};

behave.modal.custom = function(options){/* 

 a custom modal is a modal window that can be completely customizable 

*/


$(options.selector).hide();

/* $(options.selector).dialog(); */};

behave.nav = {};

behave.nav.accordion = {};

behave.nav.accordion = function(options){};

behave.nav.carousel = {};

behave.nav.carousel = function(options){};

behave.nav.menu = {};

behave.nav.menu = function(options){/* ugly ass raw JS nested list builder, we should make this Mustache or at least easier to read */
/* force menu to only do one level, TODO : make it work nested, possible share code with nested list behavior */

this.render = function(values){
 var str = '<ul>';
 for(var key in values){
   str+='<li><a href = "#/'+key+'">'+key+'</a></li>';
  }
 str+='</ul>';
 return str;
};

// render the list
$(options.selector).html(this.render(options.data));

// attach states to element
$('a', options.selector).click(function(e){
  
  var state = $(this).attr('href');
  machine.enter( state.replace('#/','') );
  
  // just for fun
  location.hash = state.toString();
  
  // cancel event bubbling
  return false;
});
};

behave.nav.tabs = {};

behave.nav.tabs = function(options){$(options.selector).hide();};

behave.notification = {};

behave.notification.flash = {};

behave.notification.flash = function(options){};

behave.notification.progress = {};

behave.notification.progress = function(options){};

behave.ready = {};

behave.ready = function(options){};

behave.sortable = {};

behave.sortable = function(options){$('ul', options.selector).sortable();
/* $(options.selector).disableSelection(); */};

behave.stateful = {};

behave.stateful = function(options){$(options.selector).data('state', {
  "is_dirty":false,
  "awesome":"hell ya!"
});};

behave.tokenize = {};

behave.tokenize = function(options){};


views.behaviors = function(){return views.behaviors.view();};

views.behaviors.charts = function(){return views.behaviors.view();};

views.behaviors.charts.presenter = function(options){// presenter logic goes here

debug.log('presenter binded to view');

//debug.log(state);


$('#navOutput').machine({
 'state':"#/charts",
 
 entered:function(state){
  alert(state);
 }
});

};

views.behaviors.charts.view = function(options){return ["div",
         {"class": "container" },
         ["div", 
          {"class":"header span-24"},
          ["h1", "charting libraries"],
          ["p", "the charting libraries allow you to easily visualize data using SVG and VML. the current charting behaviors represent a small portion of what the underlying charting libraries are capable of. see HighCharts for more information"]
         ],
       ["div", 
         {"class":"body span-24"},
         ["h2", "pie"],
         ["p", "a basic pie chart"],
         ["div", 
           {"data-behaviors":"chart-pie", "data-resource":"chart_data_2"}
         ],
         ["div", 
           {"data-behaviors":"chart-bar", "data-resource":"chart_bar_data_1"}
         ]
      ]
   ];
};

views.behaviors.forms = function(){return views.behaviors.view();};

views.behaviors.forms.presenter = function(options){// presenter logic goes here

debug.log('presenter binded to view');

//debug.log(state);


$('#navOutput').machine({
 'state':"#/forms",
 
 entered:function(state){
  alert(state);
 }
});

};

views.behaviors.forms.view = function(options){return ["div",
         {"class": "container" },
         ["div", 
          {"class":"header span-24"},
          ["h1", "forms"],
          ["p", "forms will allow you to create pages that can submit data"]
         ],
       ["div", 
         {"class":"body span-24"},
         ["h2", "plain form post"],
         ["p", "a plain form post. all fields are optional."],
         ["div", 
           {"data-behaviors":"input-date"}
         ],
         ["div", 
           {"data-behaviors":"input-date"}
         ]
      ]
   ];
};

views.behaviors.nav = function(){return views.behaviors.view();};

views.behaviors.nav.presenter = function(options){// presenter logic goes here

debug.log('presenter binded to view');

//debug.log(state);


$('#navOutput').machine({
 'state':"#/forms",
 
 entered:function(state){
  alert(state);
 }
});

};

views.behaviors.nav.view = function(options){return ["div",
         {"class": "container" },
         ["div", 
          {"class":"header span-24"},
          ["h1", "navigation"],
          ["p", "navigation behaviors will allow you to create common navigation interfaces."]
         ],
       ["div", 
         {"class":"body span-24"},
         ["h2", "nav-menu"],
         ["p", "a simple list with links"],
         ["div", 
           {"data-behaviors":"nav-menu", "data-resource":"views.behaviors"}
         ],
         ["div", 
           {"data-behaviors":"input-date"}
         ]
      ]
   ];
};

views.behaviors.presenter = function(options){// presenter logic goes here
$('#navOutput').machine({
 'state':"/",
 
 entered:function(state){

  //  views.behaviors.charts.view(); 
  $('#navOutput').html(state.toString());
  
    // switch the view based on incoming state (route)
    var view = views.behaviors[state].view();
    // render views based on JUP templates
    var html = JUP.html(view);
    //debug.log(html);
    $('#navOutput').html(html);

    // parse the dom looking for tags that have a date-behaviors attribute
    behave.attach($("[data-behaviors]"));

    // apply the presenter on the view
    //views.behaviors.presenter();
  
 }
});

};

views.behaviors.view = function(options){return ["div",
       {"class": "container" },
        ["div", 
         {"class":"header span-24"},
         
         ["h1", "data-behaviors explorer"]
       ],
       
       ["div", 
         {"class":"body span-24"},
         ["h2", "navigation"],
         ["h3", "menu"],
         ["div", 
           {"data-behaviors":"nav-menu machine", "data-resource":"views.behaviors"}
         ],
         ["div", {"id":"navOutput", "data-behaviors":"machine"}, "this is the area to load stuff"]
       ]
   ];};

views.getting_started = function(){return views.behaviors.view();};

views.getting_started.view = function(options){return ["div",
       {"class": "container" },
        ["div", 
         {"class":"header span-24"},
         
         ["h1", "data-behaviors explorer"]
       ],
       
       ["div", 
         {"class":"body span-24"},
         ["h2", "navigation"],
         ["h3", "menu"],
         ["div", 
           {"data-behaviors":"nav-menu machine", "data-resource":"views.behaviors"}
         ],
         ["div", {"id":"navOutput", "data-behaviors":"machine"}, "this is the area to load stuff"]
       ]
   ];};

views.presenter = function(options){// presenter logic goes here
$('#navOutput').machine({
 'state':"/",
 
 entered:function(state){

  //  views.behaviors.charts.view(); 
  $('#navOutput').html(state.toString());
  
    // switch the view based on incoming state (route)
    var view = views[state].view();
    // render views based on JUP templates
    var html = JUP.html(view);
    //debug.log(html);
    $('#navOutput').html(html);

    // parse the dom looking for tags that have a date-behaviors attribute
    behave.attach($("[data-behaviors]"));

    // apply the presenter on the view
    //views.behaviors.presenter();
  
 }
});

};

views.view = function(options){return ["div",
       {"class": "container" },
        ["div", 
         {"class":"header span-24"},
         
         ["h1", "data-behaviors"]
       ],
       
       ["div", 
         {"class":"body span-24"},
         ["h2", "navigation"],
         ["h3", "menu"],
         ["div", 
           {"data-behaviors":"nav-menu machine", "data-resource":"views"}
         ],
         ["div", {"id":"navOutput", "data-behaviors":"machine"}, "this is the area to load stuff"]
       ]
   ];};

