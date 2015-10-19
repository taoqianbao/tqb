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
				'echarts/chart/line'
			],
			function(ec, mytheme) {


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

	});

})(jQuery);