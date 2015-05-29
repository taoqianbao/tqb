/**
 * Created by peter on 2015-05-29.
 */

//write cookie
function setCookie(name, value, seconds) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Number(seconds) * 1000);
    document.cookie = name + '=' + escape(value) + ';path=/;;expire=' + exp.toGMTString();
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return (arr[2]);
    } else {
        return "";
    }
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

/*unit test on cookie*/
(function () {

    var cookName = 'testCookie';

    setCookie(cookName, 'true', 100);

    var value = getCookie(cookName);

    console.log('unit test cookie', value);

    setTimeout(function () {

        console.log('delete cookie');
        delCookie(cookName);

    }, 5000);

})();

