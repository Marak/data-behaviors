var chart;
chart = new Highcharts.Chart({
		chart: {
			renderTo: options.selector, 
			defaultSeriesType: 'area'
		},
		title: {
			text: 'US and USSR nuclear stockpiles'
		},
		subtitle: {
			text: 'Source: http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf'
		},
		xAxis: {
		},
		yAxis: {
			title: {
				text: 'Nuclear weapon states'
			},
			labels: {
				formatter: function() {
					return this.value / 1000 +'k';
				}
			}
		},
		tooltip: {
			formatter: function() {
				return this.series.name +' produced <b>'+
					Highcharts.numberFormat(this.y, 0, null, ' ') +'</b><br/>warheads in '+ this.x;
			}
		},
		plotOptions: {
			area: {
				pointStart: 1940,
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: options.data.series
	});
	
