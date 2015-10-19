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
					show: false
				},
				tooltip: {
					show: true,
					trigger: 'item',
					backgroundColor: '#fffbd6',
					textStyle:{ color:'#c7943c', align: 'center' },
					borderColor: '#dacf9d',
					borderWidth: 2,
					padding: 5,
					position:function(){
						console.log(arguments);
						var newx = 	$("#mainChart").width();
						var newy = $("#mainChart").height() / 2 ;
						return [newx, newy];
					},
					formatter: function(o){
						return  o[1] 
						+ "<br>" 
						+ "省份进线量占比：9.13% "
						+"<br>"
						+ "每百万回拨量占比：0.26%"
					}
				},
				legend: {
					show:false,
					orient: 'vertical',
					x: 'left',
					data: ['iphone3', 'iphone4', 'iphone5']
				},
				series: [
				{
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
							borderWidth:1, 
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
				}, 
				{
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
				}, 
				{
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

			window.onresize = function() {
				myChart.resize();
			};
			
			// 为echarts对象加载数据 
			myChart.setOption(option, true);
		}		

	});

})(jQuery);