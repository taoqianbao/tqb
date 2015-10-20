(function($) {
	'use strict';

	$(function() {

		var fullscreen = $.AMUI.fullscreen;

		$("div.mapmodule").on("click", function() {
			if (fullscreen.enabled) {
				fullscreen.request(this);
			}
		}).on(fullscreen.raw.fullscreenchange, function() {

			if (fullscreen.isFullscreen) {
				$(this).addClass("mapfullscreen");
			} else {
				$(this).removeClass("mapfullscreen");
			}
			
			console.log(chartListInstance);
			
		});

		$("a.map-fs-exit").on("click", function() {

			if (fullscreen.enabled) {
				fullscreen.exit();
			}
		});

		// 路径配置
		require.config({
			paths: {
				echarts: './assets/js/echarts/dist'
			}
		});

		require(
			[
				'echarts',
				'echarts/theme/shine',
				'echarts/chart/line',
				'echarts/chart/bar',
				//'echarts/chart/scatter',
				//'echarts/chart/k',
				//'echarts/chart/pie',
				//'echarts/chart/radar',
				//'echarts/chart/force',
				//'echarts/chart/chord',
				'echarts/chart/gauge',
				//'echarts/chart/funnel',
				//'echarts/chart/eventRiver',
				//'echarts/chart/venn',
				//'echarts/chart/treemap',
				//'echarts/chart/tree',
				//'echarts/chart/wordCloud',
				//'echarts/chart/heatmap',
				'echarts/chart/map'
			],
			requireCallback
		);

		var chartListInstance = {};

		function requireCallback(ec, defaultTheme) {

			var chartChinaMap = renderChinaMap(ec, defaultTheme, 'chartChinaMap');
			var chartGauge1 = renderGaugeChart(ec, defaultTheme, "chartGauge1");
			var chartGauge2 = renderGaugeChart(ec, defaultTheme, "chartGauge2");
			var chartGauge = renderLineBar(ec, defaultTheme, "chartGauge");
			var chartAreaSH = renderAreaMap(ec, defaultTheme, "chartAreaSH");
			var chartAreaSZ = renderAreaMap(ec, defaultTheme, "chartAreaSZ");
			var chartAreaNN = renderAreaMap(ec, defaultTheme, "chartAreaNN");
			var chartAreaTJ = renderAreaMap(ec, defaultTheme, "chartAreaTJ");

			chartListInstance = {
				"chartChinaMap": chartChinaMap,
				"chartGauge1": chartGauge1,
				"chartGauge2": chartGauge2,
				"chartGauge": chartGauge,
				"chartAreaSH": chartAreaSH,
				"chartAreaSZ": chartAreaSZ,
				"chartAreaNN": chartAreaNN,
				"chartAreaTJ": chartAreaTJ
			};
		}

		//各地区柱状+折线图
		function renderAreaMap(ec, defaultTheme, mapid) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(mapid), defaultTheme);

			var option = {
				tooltip: {
					show: true
				},
				grid: {
					x: 50,
					y: 10,
					x2: 30,
					y2: 80
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

			return myChart;

			//window.onresize = myChart.resize;
		}

		//中国地图
		function renderChinaMap(ec, defaultTheme, mapid) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(mapid), defaultTheme);

			var option = {
				title: {
					show: false
				},
				tooltip: {
					show: true,
					trigger: 'item',
					backgroundColor: '#fffbd6',
					textStyle: {
						color: '#c7943c',
						align: 'center'
					},
					borderColor: '#dacf9d',
					borderWidth: 2,
					padding: 5,
					position: function() {
						console.log(arguments);
						var newx = $("#mainChart").width();
						var newy = $("#mainChart").height() / 2;
						return [newx, newy];
					},
					formatter: function(o) {
						return o[1] + "<br>" + "省份进线量占比：9.13% " + "<br>" + "每百万回拨量占比：0.26%"
					}
				},
				legend: {
					show: false,
					orient: 'vertical',
					x: 'left',
					data: ['iphone3', 'iphone4', 'iphone5']
				},
				series: [{
					name: 'iphone3',
					type: 'map',
					mapType: 'china',
					selectedMode: 'single',
					hoverable: true,
					itemStyle: {
						normal: {
							label: {
								show: true
							},
							borderWidth: 1,
							borderColor: '#fff',
							color: '#39c2f4'
						},
						emphasis: {
							label: {
								show: true
							}
						}
					},
					data: [{
						name: '北京',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '天津',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '上海',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '重庆',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '河北',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '河南',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '云南',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '辽宁',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '黑龙江',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '湖南',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '安徽',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '山东',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '新疆',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '江苏',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '浙江',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '江西',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '湖北',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '广西',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '甘肃',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '山西',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '内蒙古',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '陕西',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '吉林',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '福建',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '贵州',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '广东',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '青海',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '西藏',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '四川',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '宁夏',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '海南',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '台湾',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '香港',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '澳门',
						value: Math.round(Math.random() * 1000)
					}]
				}, {
					name: 'iphone4',
					type: 'map',
					mapType: 'china',
					itemStyle: {
						normal: {
							label: {
								show: true
							}
						},
						emphasis: {
							label: {
								show: true
							}
						}
					},
					data: [{
						name: '北京',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '天津',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '上海',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '重庆',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '河北',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '安徽',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '新疆',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '浙江',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '江西',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '山西',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '内蒙古',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '吉林',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '福建',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '广东',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '西藏',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '四川',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '宁夏',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '香港',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '澳门',
						value: Math.round(Math.random() * 1000)
					}]
				}, {
					name: 'iphone5',
					type: 'map',
					mapType: 'china',
					itemStyle: {
						normal: {
							label: {
								show: true
							}
						},
						emphasis: {
							label: {
								show: true
							}
						}
					},
					data: [{
						name: '北京',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '天津',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '上海',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '广东',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '台湾',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '香港',
						value: Math.round(Math.random() * 1000)
					}, {
						name: '澳门',
						value: Math.round(Math.random() * 1000)
					}]
				}]
			};

			// 为echarts对象加载数据 
			myChart.setOption(option, true);

		}

		//仪表盘
		function renderGaugeChart(ec, mytheme, chartid) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(chartid), mytheme);

			var option = {
				tooltip: {
					formatter: "{a} <br/>{b} : {c}%"
				},
				series: [{
					name: '业务指标',
					type: 'gauge',
					splitNumber: 10, // 分割段数，默认为5
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: [
								[0.2, '#228b22'],
								[0.8, '#48b'],
								[1, '#ff4500']
							],
							width: 8
						}
					},
					axisTick: { // 坐标轴小标记
						splitNumber: 10, // 每份split细分多少段
						length: 12, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto'
						}
					},
					axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color: 'auto'
						}
					},
					splitLine: { // 分隔线
						show: true, // 默认显示，属性show控制显示与否
						length: 30, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: 'auto'
						}
					},
					pointer: {
						width: 5
					},
					title: {
						show: true,
						offsetCenter: [0, '-40%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder'
						}
					},
					detail: {
						formatter: '{value}%',
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color: 'auto',
							fontWeight: 'bolder'
						}
					},
					data: [{
						value: 50,
						name: '完成率'
					}]
				}]
			};

			myChart.setOption(option, true);

			//clearInterval(timeTicket);
			//timeTicket = setInterval(function (){
			//    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
			//    myChart.setOption(option,true);
			//},2000)

		}

		//
		function renderLineBar(ec, mytheme, chartid) {


			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(chartid), mytheme);

			var option = {
				tooltip: {
					show: true
				},
				grid: {
					x: 50,
					y: 10,
					x2: 30,
					y2: 80
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
		}

	});

})(jQuery);