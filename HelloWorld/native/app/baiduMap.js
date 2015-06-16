/**
 * Created by peter on 2015-06-16.
 */

(function ($, undefined) {

    // On document ready
    $(function () {

        var map = new BMap.Map("l-map");

        var point = new BMap.Point(121.49589, 31.237306);
        var pointA = new BMap.Point(121.49589, 31.237306),
            pointB = new BMap.Point(121.499771, 31.219643);

        //地图初始化
        map.centerAndZoom(point, 14);

        //移动地图方法
        map.enableDragging();
        //map.setCenter(new BMap.Point(116.409, 39.918));
        //map.panTo(new BMap.Point(116.409, 39.918));

        //缩放地图方法
        var zoomControl = new BMap.ZoomControl();
        map.addControl(zoomControl);
        //map.removeControl(zoomControl);//删除缩放控件

        var scaleControl = new BMap.ScaleControl();
        map.addControl(scaleControl);
        //map.removeControl(scaleControl);  //删除比例尺控件

        // 创建图标对象
        var myIcon = new BMap.Icon("http://api.map.baidu.com/mapCard/img/location.gif",
            new BMap.Size(14, 23), {
                // 指定定位位置。
                // 当标注显示在地图上时，其所指向的地理位置距离图标左上
                // 角各偏移7像素和25像素。您可以看到在本例中该位置即是
                // 图标中央下端的尖角位置。
                anchor: new BMap.Size(7, 25)
            });

        //添加 -标注
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);

        function addMarker(point, index) {
            // 创建标注对象并添加到地图
            var marker = new BMap.Marker(point, {icon: myIcon});
            map.addOverlay(marker);
        }

        // 随机向地图添加10个标注
        var bounds = map.getBounds();
        var lngSpan = bounds.getNorthEast().lng - bounds.getSouthWest().lng;
        var latSpan = bounds.getNorthEast().lat - bounds.getSouthWest().lat;
        for (var i = 0; i < 10; i++) {
            var point = new BMap.Point(bounds.getSouthWest().lng + lngSpan * (Math.random() * 0.7 + 0.15), bounds.getSouthWest().lat + latSpan * (Math.random() * 0.7 + 0.15));
            addMarker(point, i);
        }

        marker.addEventListener("click", function (e) {
            console.log("您点击了标注", arguments);
            var position = marker.getPosition();
            addInfoMessage(position);
        });

        //信息窗口
        function addInfoMessage(position) {
            var opts = {
                width: 100,     // 信息窗口宽度
                height: 50,     // 信息窗口高度
                title: "Hello"  // 信息窗口标题
            }
            var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, position);      // 打开信息窗口
        }

        //折线

        //var polyline = new BMap.Polyline([pointA, pointB], {
        //    strokeColor: "blue",
        //    strokeWeight: 6,
        //    strokeOpacity: 0.5
        //});
        //map.addOverlay(polyline);


        function onEvent_ClickMap(e) {
            console.log("您点击了地图。", e.point);
        }

        function onEvent_MoveEndMap() {
            var center = map.getCenter();
            console.log("地图中心点变更为：" + center.lng + ", " + center.lat);
        }

        //事件参数和this
        function onEvent_ZoomEnd() {
            console.log("地图缩放至：" + this.getZoom() + "级");
        }

        map.addEventListener("click", onEvent_ClickMap);
        map.addEventListener("moveend", onEvent_MoveEndMap);
        map.addEventListener("zoomend", onEvent_ZoomEnd);

        //移除监听事件
        //map.removeEventListener("click", onEvent_ClickMap);


        ////线路规划，导航
        //var start = {
        //    latlng: pointA,
        //    name: "故宫"
        //}
        //var end = {
        //    latlng: pointB,
        //    name: "肯德基（汉光店）"
        //}
        //var opts = {
        //    mode: BMAP_MODE_WALKING,//公交、驾车、导航均修改该参数
        //    region: "北京"
        //}
        ///*
        // BMAP_MODE_TRANSIT、
        // BMAP_MODE_DRIVING、
        // BMAP_MODE_WALKING、
        // BMAP_MODE_NAVIGATION
        //* */
        //
        //var routeSearch = new BMap.RouteSearch();
        //routeSearch.routeCall(start, end, opts);


    });

})(jQuery);