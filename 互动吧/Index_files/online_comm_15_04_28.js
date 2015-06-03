var _postLink = {
    _appDownload: "/download?from=post",
    _map: "http://map.baidu.com"
};
var _link = {
    _appIntro: "http://www.hudongba.mobi/",
    _appDownload: "/download?from=detail",
    _downloadGuide: "/download_guide",
    //_followMp:"http://mp.weixin.qq.com/s?__biz=MzA4MzA1MjgxMg==&mid=10014212&idx=1&sn=ba48a26c7327fd5ee01bbcb0e810d3b5#rd",
    _followMp: "/post",
    _hot: "/find",
    _post: "/post",
    _login: "/login",
    _loginWithWeixin: "/go_wechat_oauth",
    _loginWithQq: "/go_qq_oauth",
    _loginWithWeibo: "/go_weibo_oauth",
    _loginWithWeixinMp: "/login/mp",
    _loginBackDefault: "/post",
    _alipay: "/alipay_submit",
    _showMap: "/show_map",
    _checkOrder: "/pay_check_pay_order"
};
var _api3 = {
    _infoHintShare: "/post/api:51",
    _like: "/post/api:36",
    _guess: "/post/api:55",
    _likeList: "/post/api:52",
    _reviewList: "/post/api:54",
    _review: "/post/api:11",
    _joinList: "/post/api:53",
    _joinProperty: "/post/api:56",
    _joinParty: "/post/api:18",
    _joinRecruit: "/post/api:40",
    _getQr: "/get/api:qr",
    _getQr2: "/get/api:qr2",
    _loginWithQr: "/post/api:24",
    _loginWithMp: "/post/api:6",
    _login: "/post/api:2",
    _getCode: "/post/api:4",
    _checkCode: "/post/api:3",
    _register: "/post/api:1",
    _vote: "/post/api:13",
    _downloadQr: "/get/api:qrdownload",
    _downloadJoinQr: "/get/api:joinqrdownload",
    _joinCancel: "/post/api:57",
    _joinQr: "/qrcode_sign_up",
    _shareCount: "/post/api:7",
    _timelineList: "/post/api:23",
    _checkInviteCode: "/get/api:45",
    _findList: "/post/api:60",
    _report: "/post/api:10",
    _feedback: "/post/api:35",
    _reset:"/post/api:21",
    _reset_from_phone: "/post/api:5",
    _checkPayOrder: "/post/api:62"
};
/**跳转链接*/
var _g = function(url) {
    location.href = url;
};

/**cookie操作*/
var _cookie = {
    _set: function(name, value, expires) {
        var _end = new Date();
        if (expires) {
            _end.setTime(_end.getTime() + (expires * 1000));
        }
        document.cookie=name+"="+escape(value)+(expires ? (";expires="+_end.toGMTString()) : "")+";path=/;domain=.hudongba.mobi";
        //document.cookie=name+"="+escape(value)+(expires ? (";expires="+_end.toGMTString()) : "")+";path=/;";
        //document.cookie=name+"="+escape(value)+(expires ? (";expires="+_end.toGMTString()) : "")+";path=/;domain=.mp.jootun.cn";
        //document.cookie = name + "=" + escape(value) + (expires ? (";expires=" + _end.toGMTString()) : "") + ";path=/;domain=." + document.domain;
    },
    _get: function(name) {
        var _cookie = document.cookie;
        var _start = _cookie.indexOf(name + "=");
        if (_start != -1) {
            _start += name.length + 1;
            var _end = _cookie.indexOf(";", _start);
            if (_end == -1) {
                _end = _cookie.length;
            }
            return unescape(_cookie.substring(_start, _end));
        }
        return "";
    }
};
var _$asyn = function(url, param, fun) {
        var _flag = false;
        $.ajax({
            type: "post",
            url: url,
            async: false,
            data: param,
            cache: false,
            dataType: "json",
            success: function(data) {
                if (data != null) {
                    var _state = data.state;
                    //请求正常
                    if (_state == '0') {
                        _flag = true;
                        fun(data, 200);
                    }
                    //请求异常
                    else {
                        var _error = data.error;
                        _toast._show(_error);
                        fun(data, 500);
                    }

                }
            },
            error: function() {
                _loading._hide();
                _toast._show("网络错误，请重试");
            }
        });
        return _flag;
    }
    /**公用的异步*/
var _$ = function(url, param, fun) {
    $.ajax({
        type: "post",
        url: url,
        // timeout:2000,
        data: param,
        cache: false,
        dataType: "json",
        success: function(data) {
            if (data != null) {
                var _state = data.state;
                //请求正常
                if (_state == '0') {
                    fun(data, 200);
                }
                //请求异常
                else {
                    var _error = data.error;
                    _toast._show(_error);
                    fun(data, 500);
                }

            }
        },
        error: function() {
            _loading._hide();
            url = url + ":";
            if (url.indexOf(":51:") > -1 || url.indexOf(":52:") > -1 || url.indexOf(":53:") > -1 || url.indexOf(":54:") > -1 || url.indexOf(":55:") > -1) {
                return;
            }
            _toast._show("网络错误，请重试");
        }
    });
};

/**本地缓存*/
var _t = {
    _set: function(key, value) {
        if (window.localStorage) {
            localStorage[key] = value;
        }
    },
    _get: function(key) {
        return window.localStorage ? (localStorage[key] || "") : "";
    }
};

/**公用*/
var _ = {
    _trim: function(text) {
        return text.replace(/(^\s*)|(\s*$)/g, "");
    },
    _len: function(text) {
        return text.replace(/[^\x00-\xff]/g, "aa").length;
    },
    _encode: function(text) {
        return escape(encodeURIComponent(text));
    },
    _htmlencode: function(text) {
        return text.replace(/\'/g, "&#39;")
            .replace(/\"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/ /g, "&nbsp;")
            .replace(/\n\r/g, "<br>")
            .replace(/\r\n/g, "<br>")
            .replace(/\n/g, "<br>");
    },
    _htmlencodeReturn: function(text) {
        return text.replace(/&#39;/g, "\'")
        .replace(/&quot;/g, "\"")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&");
    },
    _zero: function(n) {
        return n < 0 ? 0 : n;
    },
    _scroll: function() {
        return {
            x: $(document).scrollLeft() + $(window).scrollLeft(),
            y: $(document).scrollTop() + $(window).scrollTop()
        };
    },
    _client: function() {
        return {
            w: document.documentElement.scrollWidth,
            h: document.documentElement.scrollHeight,
            bw: $(window).width(),
            bh: $(window).height()
        };
    },
    _center: function(id) {
        var _top = _._zero(_._client().bh - $("#" + id).outerHeight()) / 2;
        var _left = _._zero(_._client().bw - $("#" + id).outerWidth()) / 2;

        $("#" + id).css({
            "top": _top + "px",
            "left": _left + "px"
        });
    },
    _isHide: function(id) {
        $("#" + id).css("display") == "none";
    }

};


var _scroll = {
    _to: function(y) {
        var _clientHeight = _._client().h;
        y = _clientHeight > y ? y : _clientHeight;
        window.scrollTo(0, y);
    }
};

/**弹框*/
var _toast = {
    _center: function() {
        var _left = _._zero(_._client().bw - $("#toast").outerWidth()) / 2 + "px";
        $("#toast").css({
            "bottom": "80px",
            "left": _left /* ,"position":_user._useAndroid()?"fixed":"absolute"*/
        });
    },
    _show: function(text, fun) {
        $("#toast").html(text);
        _toast._center();
        $("#toast").show();
        $("#toast").bind("resize", _toast._center);
        setTimeout(function() {
            _toast._hide(fun);
        }, 3 * 1000);
    },
    _hide: function(fun) {
        $("#toast").hide();
        $("#toast").unbind("resize");
        if (fun) {
            (fun)();
        }
    }
};

/**后面的蒙板*/
var _cover = {
    _flag: false,
    _resize: function(id) {
        var _width = (_._client().w > _._client().bw ? _._client().w : _._client().bw) + "px";
        var _height = (_._client().h > _._client().bh ? _._client().h : _._client().bh) + "px";
        $("#" + id).css({
            "width": _width,
            "height": _height
        });

    },
    _resizeAll: function() {
        if ($("#cover2")) {
            _cover._resize("cover2");
        }
        _cover._resize("cover");
    },
    _show: function(id) {
        _cover._flag = true;
        $("#" + id).show();
        if (_user._useIOs()) {
            _cover._resizeAll();
            $(window).bind("resize", "", _cover._resizeAll);
            $(window).bind("scroll", "", _cover._resizeAll);
        } else {
            $("#" + id).css({
                "position": "fixed",
                "width": "100%",
                "height": "100%"
            });
        }
    },
    _hide: function(id) {
        $("#" + id).hide();
        _cover._flag = false;
        if (($("#cover2") && !_._isHide("cover2")) || !_._isHide("cover")) {
            return;
        };
        if (!_user._useIOs()) {
            return;
        }
        $(window).unbind("resize");
        $("#" + id).unbind("click");
    }
};

/**类似alter如发布页的提示*/
var _alert = {
    _center: function() {
        _._center("alert");
    },
    _show: function(title, text, buttonText, fun, cancelText) {
        _cover._show("cover");
        if (title != "") {
            $("#alert_title").html(title);
            $("#alert_title").show();
        } else {
            $("#alert_title").hide();
        }
        $("#alert_text").html(text);
        $("#alert_button_ok").html(buttonText);
        $("#alert_button_ok").bind("click", function() {
            _alert._hide();
            if (fun) {
                (fun)();
            }
        });

        if (cancelText) {
            $("#alert_button_ok").attr("class", "button_1");
            $("#alert_cancel").show();
            $("#alert_cancel").html(cancelText);
        }

        $("#alert").show();
        _alert._center();
        $(window).bind("resize", _alert._center);
        $("#cover").bind("click", _alert._hide);
    },
    _hide: function() {
        _cover._hide("cover");
        $("#alert").hide();
    }
};

/**加载*/
var _loading = {
    _center: function() {
        var y = $(window).height();
        var w = $("body").width();
        $(".loadingDiv").css({
            "left": (w - 120) / 2 + "px",
            "top": (y - 120) / 2 + "px",
            "z-index": 10000
        });
    },
    _show: function(text) {
        _loading._center();
        $("#cover").css({
            "background-color": "#ffffff",
            "opacity": 0
        });
        _cover._show("cover");
        $(".loadingDiv .pTxt").html(text);
        $(".loadingDiv").show();
        $(window).bind("resize", "", _loading._center);
    },
    _hide: function() {
        _cover._hide("cover");
        $(".loadingDiv").hide();
        $("#cover").css({
            "background-color": "#000000",
            "opacity": 0.7
        });
    }
};

/**登录前判断*/
var _beforeLogin = {
    _mark: function(value) {
        _t._set("before_login_" + _info._type + "_" + _info._id, value);
    },
    _continue: function(fun) {
        if (_t._get("before_login_" + _info._type + "_" + _info._id) != "") {
            (fun)();
        }
    }
};

/**登录*/
var _login = {
    _center: function() {
        _._center("login");
    },
    _show: function() {
        _cover._show("cover");
        $("#login").show();
        $("#cover").bind("click", _login._hide);
        _login._center();
        $(window).bind("resize", _login._center);
    },
    _hide: function() {
        _cover._hide("cover");
        $("#login").hide();
    }
};
/**用户*/
var _user = {
    _id: function() {
        return _cookie._get("W_U_L_I");
    },
    _login: function() {
        return _user._id() != "";
    },
    _loginWithSnp: function(snp) {
        switch (snp) {
            case "weixin":
                _g(_user._inWeixin() ? _link._loginWithWeixin : _link._loginWithWeixinMp);
                break;
            case "qq":
                _g(_link._loginWithQq);
                break;
            case "weibo":
                _g(_link._loginWithWeibo);
                break;
        }
    },
    _setLogin: function(i, s) {
        _cookie._set("W_U_L_I", i, 60 * 60 * 24 * 365 * 10);
        _cookie._set("W_U_L_S", s, 60 * 60 * 24 * 365 * 10);
    },
    _error: function(state, type) {
        switch (state.toString()) {
            case "1004":
            case "1006":
            case "2310":
            case "2509":
            case "2709":
            case "2809":
            case "3014":
            case "5303":
            case "5910":
                _user._toLogin('');
                break;
            case "2304":
            case "2504":
            case "2704":
                _beforeLogin._mark("");
                break;
            case "2804":
                _option._setTemp("");
                break;
            case "5304":
                _likeBeforeLogin._mark("");
                break;
        }
    },
    _toLogin: function(id) {
        if (_user._inHudongba()) {
            HudongbaJsBridge["showLoginPage"]();
            return;
        }
        var wulbu = location.href.toString();
        wulbu = wulbu.indexOf("#") > 0 ? wulbu.substring(0, wulbu.indexOf("#")) : wulbu;
        wulbu = wulbu.indexOf("?") > 0 ? wulbu.substring(0, wulbu.indexOf("?")) : wulbu;
        _cookie._set("W_U_L_B_U", wulbu);
        if (_user._inWeixin() || _user._inQq()) {
            _login._show();
            return;
        }
        if (_user._inMobile()) {
            _g(_link._login + "?hdb_from=Wap" + id);
        } else {
            _g(_link._login + "?hdb_from=PC" + id);
        }
    },
    _toLoginUrl: function(url) {
        if (_user._login()) {
            _g(url);
            return false;
        }
        _cookie._set("W_U_L_B_U", url);
        _g(_link._login);
    },
    _loginBack: function() {
        _g(_cookie._get("W_U_L_B_U") == "" ? _link._loginBackDefault : _cookie._get("W_U_L_B_U"));
    },
    _toLogout: function() {
        if (window.localStorage) {
            window.localStorage.clear();
        }
        _cookie._set("W_U_L_I", "");
        _cookie._set("W_U_L_S", "");
        var wulbu = location.href.toString();
        wulbu = wulbu.indexOf("#") > 0 ? wulbu.substring(0, wulbu.indexOf("#")) : wulbu;
        wulbu = wulbu.indexOf("?") > 0 ? wulbu.substring(0, wulbu.indexOf("?")) : wulbu;
        _cookie._set("W_U_L_B_U", wulbu);
        _g(_link._login);
    },
    _inWeixin: function() {
        return navigator.userAgent.match(/micromessenger/i) != null;
    },
    _inQq: function() {
        return /(iPad|iPhone|iPod).*?QQ/g.test(navigator.userAgent) || /\bV1_AND_SQ_/.test(navigator.userAgent);
    },
    _inWeibo: function() {
        return navigator.userAgent.match(/weibo/i) != null;
    },
    _inHudongba: function() {
        return navigator.userAgent.match(/jootun\.hudongba/i) != null;
    },
    _inMobile: function() {
        return appInfo.pub_system == "mb";
    },
    _useIOs: function() {
        return navigator.userAgent.match(/ipad|iphone|ipod/i) != null;
    },
    _useAndroid: function() {
        return navigator.userAgent.match(/android/i) != null;
    },
    _isappinstalled: function() {
        return _cookie._get("IS") == "1";
    },
    _init: function() {
        if (_user._inWeixin()) {
            if (location.href.toString().match(/isappinstalled=1/i) != null) {
                _cookie._set("IS", "1", 60 * 60 * 24 * 30);
            }
            $("#login_button").html("<div class='button_5' ontouchstart='' onclick='_g(_link._loginWithWeixin)'><p><img width='25' height='20' src='" + _imgCdn + "/images/icon_weixin_2.png'><span>一键登录</span></p></div>");
        } else if (_user._inQq()) {
            $("#login_button").html("<div class='button_6' ontouchstart='' onclick='_g(_link._loginWithQq)'><p><img width='20' height='20' src='" + _imgCdn + "/images/icon_qq.png'><span>QQ登录</span></p></div>");
        }
        if (_user._login()) {
            $("#a_top_login_out").html("退出");
            $("#a_top_register,#a_top_login,#j_getiao2,#loginBefore,#loginBefore_a").hide();
            $("#loginAfter_a").css({
                "display": "block"
            });
        } else {
            $("#a_top_login").html("登录");
            $("#a_top_register").html("注册");
            $("#a_top_user,#a_top_login_out,#loginAfter,#loginAfter_a").hide();
            $("#loginBefore_a").css({
                "display": "block"
            });
        }
        $('body>*').each(function(index, element) {
            var item = $(element);
            item.css('zIndex') > 15000 && item.remove();
        });
    }
};
if (_user._inHudongba() && _user._useIOs()) {
    var HudongbaJsBridge = {
        setData: function(pageTitle, weixinIcon, weixinTlIcon, weixinUrl, qqIcon, weiboIcon, url, title, description, sms, invite, infoId, infoType) {
            pageTitle = pageTitle.replace(/\s*/g, "");
            title = title.replace(/\s*/g, "");
            description = description.replace(/\s*/g, "");
            sms = sms.replace(/\s*/g, "");
            invite = invite.replace(/\s*/g, "");
            if (weixinUrl.indexOf("?") > 0) {
                weixinUrl = weixinUrl.substring(0, weixinUrl.indexOf("?"));
            }
            if (appInfo.app_v >= 3.0) {
                if (pageTitle == "投票") {
                    pageTitle = "vote";
                } else {
                    pageTitle = encode._deCode(pageTitle);
                }
                var params = encode.base64Encode("://setData::" + pageTitle + "::" + weixinIcon + "::" + weixinTlIcon + "::" + weixinUrl + "::" + qqIcon + "::" + weiboIcon + "::" + url + "::" + encode._deCode(title) + "::" + encode._deCode(description) + "::" + encode._deCode(sms) + "::" + invite + "::" + infoId + "::" + infoType);
                _g("hudongba" + params);
            } else {
                _g("hudongba://setData::" + encode.utf8Encode(pageTitle) + "::" + weixinIcon + "::" + weixinTlIcon + "::" + weixinUrl + "::" + qqIcon + "::" + weiboIcon + "::" + url + "::" + encode.utf8Encode(title) + "::" + encode.utf8Encode(description) + "::" + encode.utf8Encode(sms) + "::" + invite + "::" + infoId + "::" + infoType);
            }
        },
        setConfig: function(closeBtn) {
            var params = encode.base64Encode("://setConfig::" + closeBtn);
            _g("hudongba" + params);
        },
        showSharePanel: function() {
            _g("hudongba://showSharePanel");
        },
        showLoginPage: function() {
            _g("hudongba://showLoginPage");
        },
        showPicPreview: function(pic, pics) {
            if (appInfo.app_v >= 3.0) {
                var params = encode.base64Encode("://showPicPreview::" + pic + "::" + pics);
                _g("hudongba" + params);
            } else {
                _g("hudongba://showPicPreview::" + pic + "::" + pics);
            }
        },
        showReviewPanel: function(infoId, infoType, replyUid, replyUName) {
            if (appInfo.app_v >= 3.0) {
                var params = encode.base64Encode("://showReviewPanel::" + infoId + "::" + infoType + "::" + replyUid + "::" + encode._deCode(replyUName));
                _g("hudongba" + params);
            } else {
                _g("hudongba://showReviewPanel::" + infoId + "::" + infoType + "::" + replyUid + "::" + encode.utf8Encode(replyUName));
            }
        },
        getModifyPage: function(infoId, infoType, title) {
            if (appInfo.app_v >= 3.0) {
                var params = encode.base64Encode("://getModifyPage::" + infoId + "::" + infoType + (title ? "::" + encode._deCode(title) : ""));
                _g("hudongba" + params);
            } else {
                _g("hudongba://getModifyPage::" + infoId + "::" + infoType + (title ? "::" + encode.utf8Encode(title) : ""));
            }
        },
        getPayPage: function(orderId) {
            if (appInfo.app_v >= 3.0) {
                _g("hudongba" + encode.base64Encode("://getPayPage::" + orderId));
            } else {
                _g("hudongba://getPayPage::" + orderId);
            }
        },
        shareType: function(type) {
            var params = encode.base64Encode("://shareType::" + type);
            _g("hudongba" + params);
        },
        downQr: function(type, url) {
            var params = encode.base64Encode("://downQr::" + type + "::" + url);
            _g("hudongba" + params);
        },
        showFindPanel: function() {
            _g("hudongba://showFindPanel");
        },
        showPostPanel: function() {
            _g("hudongba://showPostPanel");
        },
        showPostInfoPanel: function(type, title, description, voteOption) {
            var params = encode.base64Encode("://showPostInfoPanel::" + type + "::" + encode._deCode(title) + "::" + encode._deCode(description) + "::" + encode._deCode(voteOption));
            _g("hudongba" + params)
        }
    };
}
/**表情图片*/
var _emo = {
    _text: ["[笑]", "[感冒]", "[流泪]", "[发怒]", "[爱慕]", "[吐舌]", "[发呆]", "[可爱]", "[调皮]", "[寒]", "[呲牙]", "[闭嘴]", "[害羞]", "[苦闷]", "[难过]", "[流汗]", "[犯困]", "[惊恐]", "[咖啡]", "[炸弹]", "[西瓜]", "[爱心]", "[心碎]"],
    _indexOf: function(text) {
        if (_emo._text.indexOf) {
            return _emo._text.indexOf(text);
        }
        for (var i = 0, _len = _emo._text.length; i < _len; i++) {
            if (_emo._text[i] == text) {
                return i;
            }
        }
        return -1;
    },
    _insertFun: null,
    _show: function(id, fun) {
        _emo._insertFun = fun;
        if ($("#" + id).children().length == 0) {
            var _html = "<ul>";
            for (var i = 0; i < 23; i++) {
                _html += "<li class='emo' ontouchstart='' onclick='_emo._insert(" + i + ")'><img src='" + _imgCdn + "/images/emo/" + (i + 1) + ".png'></li>";
            }
            _html += "</ul>";
            $("#" + id).html(_html);
        }
        $("#" + id).show();
    },
    _hide: function(id) {
        $("#" + id).hide();
    },
    _insert: function(index) {
        (_emo._insertFun)(index);
    },
    _toCode: function(content) {
        return content.replace(/\[[\u4e00-\u9fa5]{1,2}\]/g, function(a) {
            var _code = _emo._indexOf(a) + 1;
            return _code == 0 ? a : "[/" + _code + "]";
        });
    }
};


/**默认文字*/
var _placeholder = {
    _support: function() {
        return "placeholder" in document.createElement("input");
    },
    _add: function(o) {
        var _ph = o.getAttribute("placeholder") || "";
        if (_ph == "" || o.getAttribute("noplaceholder")) {
            return;
        }
        var _holder = document.createElement("div");
        _holder.className = "form_placeholder";
        _holder.innerHTML = _ph;
        o.parentNode.parentNode.insertBefore(_holder, o.parentNode);
        o.parentNode.style.marginTop = "0";

    },
    _init: function(formId) {
        if (_placeholder._support()) {
            return;
        }
        var _input = $("#" + formId + " input");
        for (var i = 0, _len = _input.length; i < _len; i++) {
            _placeholder._add(_input[i]);
        }
        var _textarea = $("#" + formId + " textarea");
        for (var i = 0, _len = _textarea.length; i < _len; i++) {
            _placeholder._add(_textarea[i]);
        }
    }
};

/**详情查看二维码*/
var _qr = {
    _id: "",
    _center: function() {
        var _top = _._zero(_._client().bh - $("#" + _qr._id).outerHeight()) / 2 + "px";
        var _left = _._zero(_._client().bw - $("#" + _qr._id).outerWidth()) / 2 + "px";
        $("#" + _qr._id).css({
            "left": _left,
            "top": _top,
            "z-index": "3000",
            "position": "fixed"
        });
    },
    _show: function(id) {
        _qr._id = id;
        if (id == "share_qr_1") {
            $("#" + _qr._id + " .tc_c_btn").show();
            $("#" + _qr._id + " .tc_c_btn_load").hide();
            if (_user._inMobile() && !_user._inHudongba()) {
                $("#" + _qr._id + " .tc_c_ts").show();
                $("#" + _qr._id + " .tc_c_btn").hide();
            }
        }
        //详情页二维码
        $("#" + _qr._id).show();
        var _url = _api3._getQr + "?info_id=" + _info._id + "&info_type=" + _info._type;
        $("#" + _qr._id + "_img").attr("src", _url);
        $("#" + _qr._id + "_img").bind("error", function() {
            if ($("#" + _qr._id).css("display") == "none") {
                return;
            }
            _qr._hide();
            _toast._show("网络错误，请稍后重试");
        });
        _cover._show("cover2");
        $("#cover2").bind("click", _qr._hide);
        _qr._center();
        $(window).bind("resize", _qr._center);
        _cover._show("cover2");
    },
    _hide: function() {
        _cover._hide("cover2");
        $("#" + _qr._id).hide();
    },
    _download: function() {
        if (_user._inHudongba()) {
            $("#" + _qr._id + " .tc_c_btn").hide();
            $("#" + _qr._id + " .tc_c_btn_load").show();
            HudongbaJsBridge["downQr"]("1", _api3._downloadQr + "?info_id=" + _info._id + "&info_type=" + _info._type);
            return;
        }
        location.href = _api3._downloadQr + "?info_id=" + _info._id + "&info_type=" + _info._type;
    },
    _ok: function() {
        $("#" + _qr._id + " .tc_c_btn").show();
        $("#" + _qr._id + " .tc_c_btn_load").hide();
    }
};

/**报名后二维码*/
var _joinQr = {
    _id: "tc_2weima",
    _center: function() {
        var _top = _._zero(_._client().bh - $("#tc_2weima").outerHeight()) / 2 + "px";
        var _left = _._zero(_._client().bw - $("#tc_2weima").outerWidth()) / 2 + "px";
        $("#tc_2weima").css({
            "left": _left,
            "top": _top,
            "z-index": "3000",
            "position": "fixed"
        });
    },
    _show: function() {
        $("#tc_2weima .tc_c_btn").show();
        $("#tc_2weima .tc_c_btn_load").hide();

        if (_user._inMobile() && !_user._inHudongba()) {
            $("#tc_2weima .tc_c_ts").show();
            $("#tc_2weima .tc_c_btn").hide();
        }
        var _url = _api3._joinQr + "?user_id=" + _user._id() + "&info_id=" + _info._id + "&info_type=" + _info._type;
        $("#join_qr_img").attr("src", _url);
        $("#join_qr_img").bind("error", function() {
            if ($("#tc_2weima").css("display") == "none") {
                return;
            }
            _joinQr._hide();
            _toast._show("网络错误，请稍后重试");
        });
        _cover._show("cover2");
        $("#cover2").bind("click", _joinQr._hide);
        $("#p_dt_title").html($("#dt_title").html());
        _joinQr._center();
        $("#tc_2weima").show();
        $(window).bind("resize", _joinQr._center);
    },
    _hide: function() {
        _cover._hide("cover2");
        $("#tc_2weima").hide();
    },
    _download: function() {
        if (_user._inHudongba()) {
            $("#tc_2weima .tc_c_btn").hide();
            $("#tc_2weima .tc_c_btn_load").show();
            HudongbaJsBridge["downQr"]("2", _api3._downloadJoinQr + "?user_id=" + _user._id() + "&info_id=" + _info._id + "&info_type=" + _info._type);
            return;
        }
        location.href = _api3._downloadJoinQr + "?user_id=" + _user._id() + "&info_id=" + _info._id + "&info_type=" + _info._type;
    },
    _ok: function() {
        $("#" + _joinQr._id + " .tc_c_btn").show();
        $("#" + _joinQr._id + " .tc_c_btn_load").hide();
    }
};

var _shareInWeixin = {
    _after: null,
    _show: function(fun) {
        _cover._show("cover2");
        $("#share_weixin").show();
        $("#cover2").bind("click", _shareInWeixin._hide);
        _shareInWeixin._after = fun || null;
    },
    _hide: function() {
        _cover._hide("cover2");
        $("#share_weixin").hide();
        if (_shareInWeixin._after) {
            (_shareInWeixin._after)();
        }
    },
    _hideFromJsBridge: function() {
        if ($("#cover2").attr("id") != undefined && $("#share_weixin").attr("id") != undefined) {
            _shareInWeixin._hide();
        }
    }
};
var _shareInQq = {
    _after: null,
    _timer: null,
    _show: function(fun) {
        _cover._show("cover2");
        $("#share_qq").show();
        $("#cover2").bind("click", _shareInQq._hide);
        _shareInQq._timer = setTimeout(_shareInQq._hide, 8 * 1000);
        _shareInQq._after = fun || null;
    },
    _hide: function() {
        _cover._hide("cover2");
        $("#share_qq").hide();
        clearTimeout(_shareInQq._timer);
        if (_shareInQq._after) {
            (_shareInQq._after)();
        }
    }
};

/**下载*/
var _download = function(link) {
    if (_user._useAndroid() && _user._inWeixin()) {
        setTimeout(function() {
            _g(_link._downloadGuide);
        }, 500);
    }
    _g(link);
};

/**成功*/
var _sucess = {
    _show: function(text, fun) {
        _cover._show("cover");
        $("#sucess_text").html(text);
        $("#tc_bmSuccess").show();
        setTimeout(function() {
            _sucess._hide();
            if (fun) {
                (fun)();
            }
        }, 2 * 1000);
    },
    _hide: function() {
        _cover._hide("cover");
        $("#tc_bmSuccess").hide();
    }
};

/**展开更多*/
var _loadingBottom = {
    _init: function(text, fun, id) {
        $("#" + id).html("<a>" + text + "<img src=\"" + _imgCdn + "/images3/loading_bottom.png\"></a>");
        $("#" + id).bind("click", fun);
        $("#" + id).show();
    },
    _loading: function(id) {
        $("#" + id).html("<p><img src='" + _imgCdn + "/images3/loading2.gif'><span>加载中…</span></p>");
        $("#" + id).unbind("click");
        $("#" + id).show();
    },
    _hide: function(id) {
        $("#" + id).hide();
    },
    _noMore: function(text, id) {
        $("#" + id).html("<a>" + text + "</a>");
        $("#" + id).attr("onclick", "");
        $("#" + id).show();
    },
    _initTime: function(text, fun, id) {
        $("#" + id).html(text);
        $("#" + id).bind("click", fun);
        $("#" + id).show();
    }
};

var _backToRefresh = {
    _mark: function() {
        _t._set("join_sucess", "/" + _info._type + "/" + _info._id);
    },
    _should: function() {
        return _t._get("join_sucess") != "" && document.referrer.toString().indexOf(_t._get("join_sucess")) != -1;
    },
    _clear: function() {
        _t._set("join_sucess", "");
    }
};
/**发布*/
var _post_alert = function() {
    if (!_user._login() && !window.localStorage) {
        _user._toLogin('');
        return;
    }
    if (_cookie._get("POST") == "") {
        var _text;
        if (_user._inWeixin() || _user._inQq()) {
            _text = "在任意聊天框输入hudong.ba<br>发送并点击即可来到这里";
        } else {
            _text = "在浏览器里输入<span>hudong.ba</span>即可来到这里";
        }
        _alert._show("友情提示", _text, "知道了");
        _cookie._set("POST", "1", 60 * 60 * 24 * 100);
    }
};

/**发布页的互动吧*/
var _followMp = function() {
    if (_user._inWeixin()) {
        _g(_link._followMp);
    } else {
        _hdbQr._show();
    }
};
/*公众号二维码*/
var _hdbQr = {
    _center: function() {
        var _top = _._zero(_._client().bh - $("#indexTc").outerHeight()) / 2 + "px";
        var _left = _._zero(_._client().bw - $("#indexTc").outerWidth()) / 2 + "px";
        $("#indexTc").css({
            "left": _left,
            "top": _top,
            "z-index": "3000",
            "position": "fixed"
        });
    },
    _show: function() {
        _cover._show("cover2");
        _hdbQr._center();
        _cover._show("cover2");
        $("#indexTc .guanbiQu a").bind("click", _hdbQr._hide);
        $("#indexTc").show();
        $(window).bind("resize", _hdbQr._center);
        $("#cover2").bind("click", _hdbQr._hide);
    },
    _hide: function() {
        $("#indexTc").hide();
        _cover._hide("cover2");
    },
    _tab: function(x, y) {
        $("#" + x).addClass("thisOver").siblings().removeClass("thisOver");
        $("#" + y).show().siblings().hide();
    }
};


/** 给 app 分享数据*/
var _setData = function() {
    var _invite = "false",
        _infoId = "",
        _infoType = "";
    var pageTitle = $("#div_topbar_title").html();
    if (typeof _info != "undefined" && typeof _info._id != "undefined" && typeof _info._type != "undefined") {
        _infoId = _info._id;
        _infoType = _info._type;
        if ((_info._type == "party" || _info._type == "recruit") && _user._login() && _user._id() == _info._postUid) {
            _invite = "true";
        }
    }
    HudongbaJsBridge["setData"](pageTitle, dataForShare.weixin_icon, dataForShare.weixin_tl_icon, dataForShare.weixin_url, dataForShare.qq_icon, dataForShare.weibo_icon, dataForShare.url, dataForShare.title, dataForShare.description, dataForShare.sms, _invite, _infoId, _infoType);
};

/**是否显示关闭按钮*/
var _setConfig = function() {
    HudongbaJsBridge["setConfig"](_config._showBtn);
};

/**分享*/
(function() {
    var onBridgeReady = function() {
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            _shareInWeixin._hideFromJsBridge();
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": dataForShare.appId,
                "img_url": dataForShare.weixin_icon,
                "img_width": "180",
                "img_height": "180",
                "link": dataForShare.weixin_url,
                "desc": dataForShare.description,
                "title": dataForShare.title
            }, function(res) {
                (dataForShare.callback)();
            });
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            _shareInWeixin._hideFromJsBridge();
            (dataForShare.callback)();
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": dataForShare.weixin_tl_icon,
                "img_width": "120",
                "img_height": "120",
                "link": dataForShare.weixin_url,
                "desc": dataForShare.description,
                "title": dataForShare.title
            }, function(res) {});
        });
        WeixinJSBridge.on('menu:share:weibo', function(argv) {
            _shareInWeixin._hideFromJsBridge();
            WeixinJSBridge.invoke('shareWeibo', {
                "content": dataForShare.title,
                "url": dataForShare.url
            }, function(res) {
                (dataForShare.callback)();
            });
        });
        WeixinJSBridge.on('menu:share:facebook', function(argv) {
            _shareInWeixin._hideFromJsBridge();
            (dataForShare.callback)();
            WeixinJSBridge.invoke('shareFB', {
                "img_url": dataForShare.weibo_icon,
                "img_width": "180",
                "img_height": "180",
                "link": dataForShare.url,
                "desc": dataForShare.description,
                "title": dataForShare.title
            }, function(res) {});
        });
        WeixinJSBridge.on("menu:general:share", function(s) {
            _shareInWeixin._hideFromJsBridge();
            var _img_url_s, _img_width_s, _img_height_s, _link_s;
            switch (s.shareTo) {
                case "friend":
                    _img_url_s = dataForShare.weixin_icon;
                    _img_width_s = "180";
                    _img_height_s = "180";
                    _link_s = dataForShare.weixin_url;
                    break;
                case "timeline":
                    _img_url_s = dataForShare.weixin_tl_icon;
                    _img_width_s = "120";
                    _img_height_s = "120";
                    _link_s = dataForShare.weixin_url;
                    break;
                default:
                    _img_url_s = dataForShare.weibo_icon;
                    _img_width_s = "180";
                    _img_height_s = "180";
                    _link_s = dataForShare.url;
                    break;
            }
            s.generalShare({
                appid: dataForShare.appId,
                img_url: _img_url_s,
                img_width: _img_width_s,
                img_height: _img_height_s,
                link: _link_s,
                desc: dataForShare.description,
                title: dataForShare.title
            }, function(e) {
                (dataForShare.callback)();
            });
        });
    };
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
})();

/*base64编码*/
window.encode = {
    base64Key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_=",
    utf8Encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    utf8Decode: function(utftext) {
        var string = "",
            i = 0,
            c = 0,
            c2 = 0,
            c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    base64Encode: function(input) {
        var keyStr = this.base64Key,
            output = "",
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0;
        //input = this.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    },
    base64Decode: function(input) {
        var keyStr = this.base64Key,
            output = "",
            chr1, chr2, chr3,
            enc1, enc2, enc3, enc4,
            i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = window.utf8Decode(output);
        return output;
    },
    _Str2Hex: function(text) {
        var _c = "";
        var _n;
        var _s = "0123456789ABCDEF";
        var _digS = "";
        for (var i = 0, _len = text.length; i < _len; i++) {
            _c = text.charAt(i);
            _n = _s.indexOf(_c);
            _digS += this._Dec2Dig(eval(_n));
        }
        return _digS;
    },
    _Dec2Dig: function(n1) {
        var _s = "";
        var _n2 = 0;
        for (var i = 0; i < 4; i++) {
            _n2 = Math.pow(2, 3 - i);
            if (n1 >= _n2) {
                _s += "1";
                n1 = n1 - _n2;
            } else {
                _s += "0";
            }
        }
        return _s;
    },
    _Dig2Dec: function(s) {
        var _retV = 0;
        if (s.length == 4) {
            for (var i = 0; i < 4; i++) {
                _retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return _retV;
        }
        return -1;
    },
    _Hex2Utf8: function(s) {
        var _retS = "";
        var _tempS = "";
        var _s = "";
        if (s.length == 16) {
            _tempS = "1110" + s.substring(0, 4);
            _tempS += "10" + s.substring(4, 10);
            _tempS += "10" + s.substring(10, 16);
            var __s = "0123456789ABCDEF";
            for (var i = 0; i < 3; i++) {
                _retS += "%";
                _s = _tempS.substring(i * 8, (eval(i) + 1) * 8);
                _retS += __s.charAt(this._Dig2Dec(_s.substring(0, 4)));
                _retS += __s.charAt(this._Dig2Dec(_s.substring(4, 8)));
            }
            return _retS;
        }
        return "";
    },
    _deCode: function(text) {
        text = text.replace(/\·/g, " ");
        var _text = escape(text);
        var _t = _text.split("%");
        var _v = "";
        if (_t[0] != "") {
            _v = _t[0];
        }
        for (var i = 1, _len = _t.length; i < _len; i++) {
            if (_t[i].substring(0, 1) == "u") {
                _v += this._Hex2Utf8(this._Str2Hex(_t[i].substring(1, 5)));
                if (_t[i].length >= 6) {
                    _v += _t[i].substring(5);
                }
            } else {
                _v += "%" + _t[i];
            }
        }
        return _v;
    }
};
/*公共弹窗*/
var _tc = {
    _id: "",
    _center: function() {
        var _top = _._zero(_._client().bh - $("#" + _tc._id).outerHeight()) / 2 + "px";
        var _left = _._zero(_._client().bw - $("#" + _tc._id).outerWidth()) / 2 + "px";
        $("#" + _tc._id).css({
            "left": _left,
            "top": _top,
            "z-index": "3000",
            "position": "fixed"
        });
    },
    _show: function(id) {
        _tc._id = id;
        $("#" + _tc._id).show();
        _cover._show("cover2");
        $("#cover2").bind("click", _tc._hide);
        _tc._center();
        $(window).bind("resize", _tc._center);
        _cover._show("cover2");
    },
    _hide: function() {
        _cover._hide("cover2");
        $("#" + _tc._id).hide();
    }
};
/**公共*/
$(document).ready(function() {
    _user._init();
});