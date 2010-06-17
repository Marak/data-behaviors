/**************** open-behaviors - chart-bar ****************

    the chart-bar behavior will turn an empty element into a HighCharts bar chart
    
    arguments : 
      options.selector 
        css selector or DOM node that we are going to apply the behavior to
      options.data
        data that we are going to bind to the chart
    
*/


/* we should update the stubs here to use the configuration object we are going to mixin to options */

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
			        series: options.data.series
			});
