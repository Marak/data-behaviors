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
