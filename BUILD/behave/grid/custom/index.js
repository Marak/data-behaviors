  // boilerplate code for a custom grid implementation, designed to be easily hackable
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
grid.render(options.selector, data);