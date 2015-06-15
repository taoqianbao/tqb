/**
 * Created by peter on 2015-06-12.
 */

(function ($, undefined) {

    // On document ready
    $(function() {

        var myScroll;
        function loaded() {
            myScroll = new IScroll('#wrapper', {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
        }

        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

        loaded();
    });

})(jQuery);