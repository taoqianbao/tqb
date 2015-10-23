(function($) {
	'use strict';

	$(function() {

		var _height = $(window).height() - 100;
		$("#mainChart").height(_height);

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
				//'echarts/chart/gauge',
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

		function requireCallback(ec, defaultTheme) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('mainChart'), defaultTheme);

			var option = {
				title: {
					text: '恒昌上海职场分布图',
					subtext: '技术中心',
					sublink: 'http://www.credithc-sh.com',
					x: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					x: 'left',
					data: ['职场员工总数', '电脑台数'],
					selectedMode: 'single',
			        selected:{
			            '电脑台数' : false
			        }
				},
				dataRange: {
					min: 0,
					max: 200,
					calculable: true,
					color: ['maroon', 'purple', 'red', 'orange', 'yellow', 'lightgreen']
				},
				toolbox: {
					show: true,
					orient: 'vertical',
					x: 'right',
					y: 'center',
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				series: [{
					name: '职场员工总数',
					type: 'map',
					mapType: '上海',
					hoverable: false,
					roam: true,
					data: [],
					markPoint: {
						symbolSize: 8, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1, // 标注边线线宽，单位px，默认为1
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 5,
								label: {
									show: false
								}
							}
						},
						data: [{
							name: "静安区第一营业部",
							value: 37
						}, {
							name: "金山区第三营业部",
							value: 36
						}, {
							name: "奉贤区第四营业部",
							value: 32
						}, {
							name: "松江区第五营业部",
							value: 14
						}, {
							name: "徐汇区第一营业部",
							value: 72
						}, {
							name: "黄浦区第二营业部",
							value: 0
						}, {
							name: "宝山区第二营业部",
							value: 17
						}, {
							name: "杨浦区第三营业部",
							value: 36
						}, {
							name: "浦东新区第四营业部",
							value: 20
						}, {
							name: "黄浦区第一营业部",
							value: 37
						}, {
							name: "虹口区第五营业部",
							value: 34
						}, {
							name: "嘉定第一营业部",
							value: 8
						}, {
							name: "静安区第一第二第八营业部",
							value: 83
						}, {
							name: "长宁区第三第四第五第七营业部",
							value: 111
						}, {
							name: "黄浦区第一第三营业部",
							value: 84
						}, {
							name: "普陀区第四营业部",
							value: 19
						}, {
							name: "浦东新区第五营业部",
							value: 32
						}, {
							name: "静安区第一二营业部",
							value: 42
						}, {
							name: "黄浦区第一营业部",
							value: 66
						}, {
							name: "嘉定区第三营业部",
							value: 12
						}, {
							name: "南汇区第三营业部",
							value: 9
						}, {
							name: "长宁区第一营业部",
							value: 32
						}, {
							name: "黄浦区第一三四营业部",
							value: 48
						}, {
							name: "徐汇区第一营业部",
							value: 42
						}, {
							name: "闵行区第二营业部",
							value: 20
						}, {
							name: "浦东新区第一营业部",
							value: 29
						}, {
							name: "虹口区第二营业部",
							value: 19
						}, {
							name: "闸北区第三第四第五营业部",
							value: 65
						}, {
							name: "黄浦区第一营业部",
							value: 52
						}, {
							name: "汽车金融-华东管理中心",
							value: 14
						}, {
							name: "国开行-消费金融",
							value: 100
						}, {
							name: "张江",
							value: 100
						}, {
							name: "上海分中心1管理部",
							value: 8
						}, {
							name: "上海市黄浦区第二营业部",
							value: 15
						}, {
							name: "上海市闵行区第十营业部",
							value: 16
						}, {
							name: "上海市普陀区第八营业部",
							value: 21
						}, {
							name: "上海市徐汇区第四营业部",
							value: 16
						}, {
							name: "闸北区第六营业部",
							value: 16
						}, {
							name: "上海分中心2管理部",
							value: 10
						}, {
							name: "上海市第十一营业部",
							value: 7
						}, {
							name: "上海市虹口区第三营业部",
							value: 16
						}, {
							name: "上海市黄浦区第一营业部",
							value: 16
						}, {
							name: "上海市浦东新区第七营业部",
							value: 16
						}, {
							name: "上海市浦东新区第五营业部",
							value: 14
						}, {
							name: "上海市长宁区第九营业部",
							value: 16
						}]
					},
					geoCoord: {
						"张江": [121.592771, 31.205762],
						"静安区第一营业部": [121.460475, 31.23366],
						"金山区第三营业部": [121.022398, 30.900397],
						"奉贤区第四营业部": [121.467494, 30.92149],
						"松江区第五营业部": [121.242157, 31.012565],
						"徐汇区第一营业部": [121.462592, 31.222165],
						"黄浦区第二营业部": [121.480108, 31.226797],
						"宝山区第二营业部": [121.453924, 31.330394],
						"杨浦区第三营业部": [121.518962, 31.266754],
						"浦东新区第四营业部": [121.544351, 31.2297],
						"黄浦区第一营业部": [121.475099, 31.211835],
						"虹口区第五营业部": [121.490991, 31.25876],
						"嘉定第一营业部": [121.249126, 31.370893],
						"静安区第一第二第八营业部": [121.462761, 31.237519],
						"长宁区第三第四第五第七营业部": [121.406306, 31.203912],
						"黄浦区第一第三营业部": [121.480724, 31.220497],
						"普陀区第四营业部": [121.418006, 31.237944],
						"浦东新区第五营业部": [121.522812, 31.235497],
						"静安区第一二营业部": [121.471194, 31.237241],
						"黄浦区第一营业部": [121.476851, 31.238121],
						"嘉定区第三营业部": [121.264142, 31.373784],
						"南汇区第三营业部": [121.769186, 31.056643],
						"长宁区第一营业部": [121.409843, 31.214529],
						"黄浦区第一三四营业部": [121.480126, 31.229507],
						"徐汇区第一营业部": [121.435736, 31.199511],
						"闵行区第二营业部": [121.384141, 31.113957],
						"浦东新区第一营业部": [121.578995, 31.120248],
						"虹口区第二营业部": [121.488586, 31.296505],
						"闸北区第三第四第五营业部": [121.460043, 31.250594],
						"黄浦区第一营业部": [121.494224, 31.238083],
						"汽车金融-华东管理中心": [121.452172, 31.289053],
						"国开行-消费金融": [121.517222, 31.242706],
						"上海分中心1管理部": [121.489684, 31.241471],
						"上海市黄浦区第二营业部": [121.48513, 31.23515],
						"上海市闵行区第十营业部": [121.383572, 31.114475],
						"上海市普陀区第八营业部": [121.425501, 31.261144],
						"上海市徐汇区第四营业部": [121.427126, 31.191974],
						"闸北区第六营业部": [121.452059, 31.231097],
						"上海分中心2管理部": [121.489684, 31.241471],
						"上海市第十一营业部": [121.489684, 31.241471],
						"上海市虹口区第三营业部": [121.518625, 31.266886],
						"上海市黄浦区第一营业部": [121.489684, 31.241471],
						"上海市浦东新区第七营业部": [121.525671, 31.233505],
						"上海市浦东新区第五营业部": [121.460043, 31.250594],
						"上海市长宁区第九营业部": [121.405099, 31.212205]
					}
				}, {
					name: '电脑台数',
					type: 'map',
					mapType: '上海',
					hoverable: false,
					roam: true,
					data: [],
					markPoint: {
						symbolSize: 8, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1, // 标注边线线宽，单位px，默认为1
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 5,
								label: {
									show: false
								}
							}
						},
						data: [{
								name: "静安区第一营业部",
								value: 25
							}, {
								name: "金山区第三营业部",
								value: 17
							}, {
								name: "奉贤区第四营业部",
								value: 12
							}, {
								name: "松江区第五营业部",
								value: 2
							}, {
								name: "徐汇区第一营业部",
								value: 53
							}, {
								name: "黄浦区第二营业部",
								value: 0
							}, {
								name: "宝山区第二营业部",
								value: 20
							}, {
								name: "杨浦区第三营业部",
								value: 16
							}, {
								name: "浦东新区第四营业部",
								value: 0
							}, {
								name: "黄浦区第一营业部",
								value: 92
							}, {
								name: "虹口区第五营业部",
								value: 45
							}, {
								name: "嘉定第一营业部",
								value: 19
							}, {
								name: "静安区第一第二第八营业部",
								value: 136
							}, {
								name: "长宁区第三第四第五第七营业部",
								value: 67
							}, {
								name: "黄浦区第一第三营业部",
								value: 51
							}, {
								name: "普陀区第四营业部",
								value: 10
							}, {
								name: "浦东新区第五营业部",
								value: 34
							}, {
								name: "静安区第一二营业部",
								value: 36
							}, {
								name: "黄浦区第一营业部",
								value: 46
							}, {
								name: "嘉定区第三营业部",
								value: 8
							}, {
								name: "南汇区第三营业部",
								value: 0
							}, {
								name: "长宁区第一营业部",
								value: 40
							}, {
								name: "黄浦区第一三四营业部",
								value: 30
							}, {
								name: "徐汇区第一营业部",
								value: 20
							}, {
								name: "闵行区第二营业部",
								value: 6
							}, {
								name: "浦东新区第一营业部",
								value: 21
							}, {
								name: "虹口区第二营业部",
								value: 27
							}, {
								name: "闸北区第三第四第五营业部",
								value: 100
							}, {
								name: "黄浦区第一营业部",
								value: 16
							}, {
								name: "汽车金融-华东管理中心",
								value: 15
							}, {
								name: "国开行-消费金融",
								value: 100
							}, {
								name: "张江",
								value: 100
							}, {
								name: "上海分中心1管理部",
								value: 8
							}, {
								name: "上海市黄浦区第二营业部",
								value: 15
							}, {
								name: "上海市闵行区第十营业部",
								value: 16
							}, {
								name: "上海市普陀区第八营业部",
								value: 21
							}, {
								name: "上海市徐汇区第四营业部",
								value: 16
							}, {
								name: "闸北区第六营业部",
								value: 16
							}, {
								name: "上海分中心2管理部",
								value: 10
							}, {
								name: "上海市第十一营业部",
								value: 7
							}, {
								name: "上海市虹口区第三营业部",
								value: 16
							}, {
								name: "上海市黄浦区第一营业部",
								value: 16
							}, {
								name: "上海市浦东新区第七营业部",
								value: 16
							}, {
								name: "上海市浦东新区第五营业部",
								value: 14
							}, {
								name: "上海市长宁区第九营业部",
								value: 16
							}

						]
					}
				}, {
					name: 'Top5',
					type: 'map',
					mapType: '上海',
					data: [],
					markPoint: {
						symbol: 'emptyCircle',
						symbolSize: function(v) {
							return 10 + v / 100
						},
						effect: {
							show: true,
							shadowBlur: 0
						},
						itemStyle: {
							normal: {
								label: {
									show: false
								}
							}
						},
						data: [{
							name: "张江",
							value: 193
						}]
					}
				}]
			};

			window.onresize = function() {
				var _height = $(window).height() - 50;
				$("#mainChart").height(_height);

				myChart.resize();
			};

			// 为echarts对象加载数据 
			myChart.setOption(option, true);
		}

	});

})(jQuery);