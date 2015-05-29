/**
 * Created by peter on 2015-05-29.
 */

function haswebp() {
    //check cookie
    var img = new Image();
    img.onload = handleSupport;
    img.onerror = handleNotSupport;
    img.src = 'imgs/webp/test.webp';
    //
}
function handleSupport() {
    setCookie('swebp', 'true', 2592);
}

function handleNotSupport() {
    setCookie('swebp', 'false', 2592);
}

/*
 * unit test haswebp.
 * */
(function () {
    haswebp();

})();

//Method two
var hasWebp = (function () {
    //some small (2x1px) test images for each feature
    var iamges = {
        basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
        lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
    };

    return function (feature) {
        var defered = $.Deferred();
        $('<img>').on('load', function () {
            // the images should have these dimensions
            if (this.width === 2 && this.height === 1) {
                defered.resolve();
            } else {
                defered.reject();
            }
        }).on('error',function(){
            defered.reject();
        }).attr('src',iamges[feature || 'basic']);
    };

})();

hasWebp().then(function(){
    console.log('Basic WebP available')
},function(){
    console.log('Basic WebP *not* available')
});

hasWebp('lossless').then(function(){
    console.log('lossless WebP available')
},function(){
    console.log('lossless WebP *not* available')
});



