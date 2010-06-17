/**************** open-behaviors - chart-pie ****************

    the chart-pie behavior will turn an empty element into a HighCharts pie chart
    
    arguments : 
      options.selector 
        css selector or DOM node that we are going to apply the behavior to
      options.data.series
        data series for chart
      options.data.title
        chart title  
*/

/* we should update the stubs here to use the configuration object we are going to mixin to options with*/

 
   var chart;
			chart = new Highcharts.Chart({
				chart: {
					renderTo: options.selector,
					margin: [50, 200, 60, 170]
				},
				title: {
					text: options.data.title
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
					data: options.data.series
					//data: [3.40, 1.05, 2.90, 1.65, 1.35, 2.59, 1.39, 3.07, 2.82]
				}]
			});

