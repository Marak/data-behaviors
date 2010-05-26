 options.data = eval($(options.selector).attr('data-resource')).data;
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

