(function($) {
	'use strict';

	$(function() {


		// 路径配置
		require.config({
			paths: {
				echarts: './assets/js/echarts/dist'
			},
			packages: [{
				name: 'BMap',
				location: './assets/js/echarts/extension',
				main: 'main'
			}]
		});

		require(
			[
				'echarts',
				'echarts/theme/shine',
				'BMap',
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

		function requireCallback(ec, defaultTheme, BMapExtension) {

			$('#mainChart').css({
            height:$(window).height(),
            width: $(window).width()
        });


			// 初始化地图
			// 初始化地图
			var BMapExt = new BMapExtension($('#mainChart')[0], BMap, ec, {
				enableMapClick: false
			});
			var map = BMapExt.getMap();
			var container = BMapExt.getEchartsContainer();

			var startPoint = {
				x: 121.589755,
				y: 31.205753
			};

			var point = new BMap.Point(startPoint.x, startPoint.y);
			map.centerAndZoom(point, 11);
			map.enableScrollWheelZoom(true);

			// 地图自定义样式
			map.setMapStyle({
				styleJson: [{
					"featureType": "water",
					"elementType": "all",
					"stylers": {
						"color": "#044161"
					}
				}, {
					"featureType": "land",
					"elementType": "all",
					"stylers": {
						"color": "#004981"
					}
				}, {
					"featureType": "boundary",
					"elementType": "geometry",
					"stylers": {
						"color": "#064f85"
					}
				}, {
					"featureType": "railway",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "highway",
					"elementType": "geometry",
					"stylers": {
						"color": "#004981"
					}
				}, {
					"featureType": "highway",
					"elementType": "geometry.fill",
					"stylers": {
						"color": "#005b96",
						"lightness": 1
					}
				}, {
					"featureType": "highway",
					"elementType": "labels",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "arterial",
					"elementType": "geometry",
					"stylers": {
						"color": "#004981"
					}
				}, {
					"featureType": "arterial",
					"elementType": "geometry.fill",
					"stylers": {
						"color": "#00508b"
					}
				}, {
					"featureType": "poi",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "green",
					"elementType": "all",
					"stylers": {
						"color": "#056197",
						"visibility": "off"
					}
				}, {
					"featureType": "subway",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "manmade",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "local",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "arterial",
					"elementType": "labels",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "boundary",
					"elementType": "geometry.fill",
					"stylers": {
						"color": "#029fd4"
					}
				}, {
					"featureType": "building",
					"elementType": "all",
					"stylers": {
						"color": "#1a5787"
					}
				}, {
					"featureType": "label",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}]
			});

			var option = {
				color: ['gold', 'aqua', 'lime'],
				title: {
					text: '恒昌上海职场分布图',
					subtext: '恒昌技术中心',
					x: 'right'
				},
				tooltip: {
					trigger: 'item',
					formatter: function(v) {
						return v[1].replace(':', ' > ');
					}
				},
				legend: {
					orient: 'vertical',
					x: 'left',
					data: ['上海'],
					selectedMode: 'single',
					selected: {
						'上海': true
					}
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
				dataRange: {
					min: 0,
					max: 100,
					y: '60%',
					calculable: true,
					color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua']
				},
				series: [{
						name: '上海',
						type: 'map',
						mapType: 'none',
						data: [],
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
							"上海分中心1管理部":[121.489684,31.241471],
							
							"上海市黄浦区第二营业部":[121.48513,31.23515],
							"上海市闵行区第十营业部":[121.383572,31.114475],
							"上海市普陀区第八营业部":[121.425501,31.261144],
							"上海市徐汇区第四营业部":[121.427126,31.191974],
							"闸北区第六营业部":[121.452059,31.231097],
							"上海分中心2管理部":[121.489684,31.241471],
							"上海市第十一营业部":[121.489684,31.241471],
							"上海市虹口区第三营业部":[121.518625,31.266886],
							"上海市黄浦区第一营业部":[121.489684,31.241471],
							"上海市浦东新区第七营业部":[121.525671,31.233505],
							"上海市浦东新区第五营业部":[121.460043,31.250594],
							"上海市长宁区第九营业部":[121.405099,31.212205],

						},

						markLine: {
							smooth: true,
							effect: {
								show: true,
								scaleSize: 1,
								period: 30,
								color: '#fff',
								shadowBlur: 10
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 10
									}
								}
							},
							data: [
								[{
									name: '张江'
								}, {
									name: '静安区第一营业部',
									value: 37
								}],
								[{
									name: '张江'
								}, {
									name: '金山区第三营业部',
									value: 36
								}],
								[{
									name: '张江'
								}, {
									name: '奉贤区第四营业部',
									value: 32
								}]
							]
						},
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return 10 + v / 10
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
								value: 100
							},{
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
							},{name:"上海分中心1管理部",value:8},
{name:"上海市黄浦区第二营业部",value:15},
{name:"上海市闵行区第十营业部",value:16},
{name:"上海市普陀区第八营业部",value:21},
{name:"上海市徐汇区第四营业部",value:16},
{name:"闸北区第六营业部",value:16},
{name:"上海分中心2管理部",value:10},
{name:"上海市第十一营业部",value:7},
{name:"上海市虹口区第三营业部",value:16},
{name:"上海市黄浦区第一营业部",value:16},
{name:"上海市浦东新区第七营业部",value:16},
{name:"上海市浦东新区第五营业部",value:14},
{name:"上海市长宁区第九营业部",value:16},
]
						}

					}

				]
			};

			var myChart = BMapExt.initECharts(container, defaultTheme);
			window.onresize = myChart.resize;
			BMapExt.setOption(option, true);
		}

	});

})(jQuery);