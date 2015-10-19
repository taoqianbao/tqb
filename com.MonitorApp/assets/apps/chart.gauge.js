(function($) {
	'use strict';

	$(function() {

		//全屏功能
		var $fullText = $('.admin-fullText');
		$('#admin-fullscreen').on('click', function() {
			$.AMUI.fullscreen.toggle();
		});

		$(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
			$fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
		});


		// 路径配置
		require.config({
			paths: {
				echarts: './assets/js/echarts/dist'
			}
		});

		// 使用
		require(
			[
				'echarts',
				'echarts/theme/shine',
				'echarts/chart/bar',
				'echarts/chart/line',
				'echarts/chart/gauge'
			],
			function(ec, mytheme) {

				renderGaugeChart(ec, mytheme,"gaugeChart1");
				
				renderGaugeChart(ec, mytheme,"gaugeChart2");

				// 基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById('mainChart'), mytheme);

				var option = {
					tooltip: {
						show: true
					},
					legend: {
						y: 'bottom',
						data: ['人工呼入', '人工挂起', '服务级别', '接通率']
					},
					xAxis: [{
						type: 'category',
						data: ["00：00", "07：00", "09：00", "11：00", "13：00", "15：00", "17：00", "19：00", "21：00", "24：00"]
					}],
					yAxis: [{						
						type: 'value',
						name: '数量'
					}, {
						type: 'value',
						name: '百分比'
					}],
					series: [{
						"name": "人工呼入",
						"type": "bar",
						"data": [0, 50, 0, 0, 2550, 2340, 0, 1330, 104, 2044]
					}, {
						"name": "人工挂起",
						"type": "bar",
						"data": [0, 50, 0, 0, 2550, 0, 2340, 1330, 104, 2044]
					}, {
						"name": "服务级别",
						"type": "line",
						yAxisIndex: 1,
						"data": [55, 0, 50, 0, 0, 77, 0, 44, 33, 77]
					}, {
						"name": "接通率",
						"type": "line",
						yAxisIndex: 1,
						"data": [33, 0, 58, 0, 45, 87, 12, 0, 0, 23]
					}]
				};

				// 为echarts对象加载数据 
				myChart.setOption(option);

				window.onresize = function() {
					myChart.resize();
				};

			}
		);
		
		
		function renderGaugeChart(ec, mytheme, chartid){
			
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(chartid), mytheme);
				
			var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },			    
			    series : [
			        {
			            name:'业务指标',
			            type:'gauge',
			            splitNumber: 10,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 8
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 10,   // 每份split细分多少段
			                length :12,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :30,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-40%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder'
			                }
			            },
			            detail : {
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto',
			                    fontWeight: 'bolder'
			                }
			            },
			            data:[{value: 50, name: '完成率'}]
			        }
			    ]
			};
			
			myChart.setOption(option,true);
			
			//clearInterval(timeTicket);
			//timeTicket = setInterval(function (){
			//    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
			//    myChart.setOption(option,true);
			//},2000)
                    
		}
		

	});

})(jQuery);