// lets define some test data



/* list test data */
// lets be slick and generate a list from the existing behaviors
var list_data_1 = [];
for(var b in behave){
  if(typeof behave[b] == 'object'){
    list_data_1.push(b);
  }
}

var grid_data_1 = {};
grid_data_1.columns = [
	{id:"title", name:"Title", field:"title"},
	{id:"duration", name:"Duration", field:"duration"},
	{id:"%", name:"% Complete", field:"percentComplete"},
	{id:"start", name:"Start", field:"start"},
	{id:"finish", name:"Finish", field:"finish"},
	{id:"effort-driven", name:"Effort Driven", field:"effortDriven"}
];

grid_data_1.data = [];
for (var i = 0; i < 500; i++) {
	grid_data_1.data[i] = {
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

var chart_data_2 = {};

chart_data_2.title = "The Battle";

chart_data_2.data =
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
