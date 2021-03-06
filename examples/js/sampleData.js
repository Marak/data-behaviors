// lets define some test data



/* list test data */
  // lets be slick and generate a list from the existing behaviors
  var list_simple_data_1 = [];
  for(var b in behave){
    if(typeof behave[b] == 'object'){
      list_simple_data_1.push(b);
    }
  }

  // the behave library itself is a nested object
  var list_nested_data_1 = behave;



/* end list test data */



var grid_data_1 = {};
grid_data_1.columns = [
	{id:"title", name:"Title", field:"title"},
	{id:"duration", name:"Duration", field:"duration"},
	{id:"%", name:"% Complete", field:"percentComplete"},
	{id:"start", name:"Start", field:"start"},
	{id:"finish", name:"Finish", field:"finish"},
	{id:"effort-driven", name:"Effort Driven", field:"effortDriven"}
];

grid_data_1.rows = [];
for (var i = 0; i < 500; i++) {
	grid_data_1.rows[i] = {
              title: "Task " + i,
              duration: "5 days",
              percentComplete: Math.round(Math.random() * 100),
              start: "01/01/2009",
              finish: "01/05/2009",
              effortDriven: (i % 5 == 0)
          };
}




var grid_data_2 = {};
grid_data_2.columns = [
	{id:"title", name:"Title", field:"title"},
	{id:"duration", name:"Duration", field:"duration"},
	{id:"%", name:"% Complete", field:"percentComplete"},
	{id:"start", name:"Start", field:"start"},
	{id:"finish", name:"Finish", field:"finish"},
	{id:"effort-driven", name:"Effort Driven", field:"effortDriven"}
];

grid_data_2.data = [];
for (var i = 0; i < 500; i++) {
	grid_data_2.data[i] = {
              title: "Mask " + i,
              duration: "3 minutes",
              percentComplete: Math.round(Math.random() * 100),
              start: "03/04/2010",
              finish: "02/09/2010",
              effortDriven: (i % 5 == 0)
          };
}

var chart_data_1 = {};

chart_data_1.data = 
[
	['Firefox',   44.2],
	['IE7',       26.6],
	{
		name: 'IE6',
		y: 20,
		sliced: true,
		selected: true
	},
	['Chrome',    3.1],
	['Safari',    2.7],
	['Opera',     2.3],
	['Mozilla',   0.4]
];

chart_data_1.title = "Browser market shares at a specific website, 2008";

var chart_data = {};

chart_data.title = "The Battle";

chart_data.series =
[
	['Knowing',   50],
	{
		name: 'Red Lasers',
		y: 25,
		sliced: true,
		selected: true
	},
	['Blue Lasers',    25]
];

var chart_area = {};
chart_area.series = [{
	name: 'USA',
	data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640, 
		1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 
		27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662, 
		26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 
		24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 
		22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 
		10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
}, {
	name: 'USSR/Russia',
	data: [null, null, null, null, null, null, null , null , null ,null, 
	5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322, 
	4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478, 
	15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049, 
	33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000, 
	35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000, 
	21000, 20000, 19000, 18000, 18000, 17000, 16000]
}];



var chart_bar_data_1 = {};

chart_bar_data_1.series =
[{
name: 'Tokyo',
data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

}, {
name: 'New York',
data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

}, {
name: 'London',
data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

}, {
name: 'Berlin',
data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

}]
	
var grid_custom_data_1 = [
 {"1": [{"1":"a"}, {"2":"b"}, {"3":"c"}, {"4":"d"}] },
 {"2": [{"1":"a"}, {"2":"b"}, {"3":"c"}, {"4":"d"}] },
 {"3": [{"1":"a"}, {"2":"b"}, {"3":"c"}, {"4":"d"}] },
 {"4": [{"1":"a"}, {"2":"b"}, {"3":"c"}, {"4":"d"}] },
 {"5": [{"1":"a"}, {"2":"b"}, {"3":"c"}, {"4":"d"}] },
 {"6": [{"1":"a"}, {"2":"b"}, {"3":"c"}, {"4":"d"}] },
];


