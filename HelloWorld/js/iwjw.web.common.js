/**
 * Created by peter on 2015-06-05.
 */
function Ks(e) {
    return e ? e.replace(/(^\s*|(\s*$))/g, "") : "";
}
function cutN(e) {
    return /^([\-\d+]).*$/.test(e) ? parseInt(e.replace(/^(\d+).*$/, "$1")) : 0;
}
function Kh(e) {
    return Ks(e.replace(/(<.*>.*<\/.*>)|(<.*>)/g, ""));
}
function Gs(e, t) {
    if (!t)var t = location.search;
    var n = new RegExp("^\\?(?:" + e + "=|.+=.*&" + e + "=)([^&]+).*", "i");
    return n.test(t) ? decodeURI(t.replace(n, "$1")) : "";
}
function Num(e) {
    return isNaN(e) ? 0 : Number(e);
}
function isNum(e) {
    return /^([1-9]\d*|0)$/.test(e);
}
function Len(e) {
    var t = 0;
    if (e)for (var n = 0; n < e.length; n++)t++, (e.charCodeAt(n) < 0 || e.charCodeAt(n) > 255) && t++;
    return t;
}
function Cut(e, t) {
    if (!(Len(e) > t))return e;
    for (var n = "", i = 0; i < e.length; i++) {
        if (Len(n + e.substr(i, 1)) >= t - 2)return n + e.substr(i, 1) + "…";
        n += e.substr(i, 1);
    }
}
function initCut() {
    $(".needCut").each(function () {
        var e = $(this).attr("len");
        e = "" == e ? 10 : e;
        var t = Cut($(this).text(), e);
        $(this).html(t)
    })
}
function Val(e) {
    e = $(e);
    var t = Ks(e.val());
    return t == e.attr("placeholder") ? "" : t
}
function IE() {
    var e, t = navigator.userAgent, n = /.+?MSIE (\d+)\.0.+/;
    return e = n.test(t) ? parseInt(t.replace(n, "$1")) : 0
}
function Pop(e, t) {
    "object" == typeof e ? (e.addClass("Pop"), 0 == e.find(".Close").length && e.append('<i class="Close"></i><iframe frameborder="0" class="iframeAll"></iframe>')) : e = $('<div class="Pop">').appendTo("body").html(e + '<i class="Close"></i>'), e.show();
    var n = $(".Mask");
    0 == n.length && (n = $('<div class="Mask" style="z-index:1000;"><iframe frameborder="0" width="100%" height="100%" style="visible:hidden; z-index:1; position:absolute;"></iframe></div>').appendTo("body")), n.show().height($(document).height()), e.css({
        top: ($(window).height() - e.height()) / 3,
        left: ($(window).width() - e.width()) / 2
    }), $(".Pop .Close,.Pop .Btn").click(function () {
        $(this).parents(".Pop").hide(), 0 == $(".Pop:visible").length && $(".Mask").remove(), t instanceof Function && t()
    })
}
function Alert(e, t, n) {
    t && (e = '<i class="war"></i>' + e), Pop('<div class="Alert"><p class="des">' + e + '</p><p class="end"><i class="Btn">确定</i></p></div>', n)
}
function Confirm(e, t) {
    Alert(e, 1);
    var n = $(".Pop .end .Btn").last();
    n.before(n.clone(!0).addClass("Sb").removeClass("Btn").html("取消")).click(function () {
        t instanceof Function && t()
    })
}
function FormSubmit(e, t) {
    var n = $('<form method="post" action="' + e + '"></form>');
    if (null != t)for (var i in t)n.append('<input type="hidden" name="' + i + '" value=' + t[i] + ">");
    n.appendTo("body"), n.submit()
}
function check_os() {
    var e, t = -1 != navigator.userAgent.indexOf("Windows", 0) ? 1 : 0, n = -1 != navigator.userAgent.indexOf("Mac", 0) ? 1 : 0, i = -1 != navigator.userAgent.indexOf("Linux", 0) ? 1 : 0, r = -1 != navigator.userAgent.indexOf("X11", 0) ? 1 : 0;
    return t ? e = "MS" : n ? e = "Mac" : i ? e = "Lunix" : r && (e = "Unix"), e
}
function supportCss3(e) {
    var t, n = ["webkit", "moz", "ms", "o"], i = [], r = document.documentElement.style, a = function (e) {
        return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase()
        })
    };
    for (t in n)i.push(a(n[t] + "-" + e));
    i.push(a(e));
    for (t in i)if (i[t]in r)return !0;
    return !1
}
function Login(e) {
    var t = $("#Login");
    0 == t.length && (t = $('<form method="post" action="" id="Login"></form>').appendTo("body"));
    var n = [];
    n[0] = "<h3>注册/登录</h3>", n[1] = '<ul><li><i class="Ib">手机号码</i>', n[2] = '<input type="tel" name="mobile" maxlength="11" placeholder="请输入手机号码">', n[3] = '<button type="submit" url="' + Url + 'sendCode.action">发送验证码</button></li><li class="Rr"></li></ul>', t.html(n.join("")), Place(t);
    var i, r = t.find('input[name="mobile"]'), a = t.find(".Rr");
    r.btn = t.find("button:first"), r.btn.txt = r.btn.html(), r.keyup(function (e) {
        if (!r.attr("readonly")) {
            var t = r.val();
            13 != e.keyCode && a.html(""), t.length == r.attr("maxlength") ? /^1[3|4|5|7|8]\d{9}$/.test(t) || a.html("手机号码不正确!") : /^\d*$/.test(t) || a.html("手机号码只能为数字!")
        }
    }).keydown(function (e) {
        i && 9 == e.keyCode && i.focus()
    }), t.submit(function () {
        return i ? i.btn.click() : r.btn.click(), !1
    }), r.btn.click(function () {
        return r.val() == r.attr("placeholder") && r.val(""), "" == Ks(r.val()) ? (r.focus(), a.html("手机号码不能为空!"), !1) : /^1[3|4|5|7|8]\d{9}$/.test(r.val()) ? (_hmt.push(["_trackEvent", "login", "send_code"]), $.ajax({
            type: "post",
            dataType: "text",
            url: Url + "getToken.action",
            cache: !1,
            data: {mobile: r.val()},
            success: function (n) {
                "" != n && (r.btn.attr("disabled", !0).html("正在提交..."), r.attr("readonly", !0), a.html(""), $.ajax({
                    type: t.attr("method"),
                    url: r.btn.attr("url"),
                    cache: !1,
                    data: {mobile: r.val(), uuid: n},
                    error: function () {
                        r.attr("readonly", !1), r.btn.attr("disabled", !1).html(r.btn.txt), a.html("系统错误," + r.btn.txt + "失败!")
                    },
                    success: function (n) {
                        if (2 == n.status || 3 == n.status) {
                            r.btn.attr("type", "button");
                            var o = [], s = t.find(".sbt");
                            if (i = t.find('input[name="code"]'), r.btn.play = function () {
                                    r.btn.tim && clearTimeout(r.btn.tim);
                                    var e = /^.*?(\d+)$/, t = r.btn.html();
                                    if (e.test(t)) {
                                        var n = parseInt(t.replace(e, "$1"));
                                        n > 0 && n--, n > 0 ? (r.btn.html("重发验证码 " + n), r.btn.tim = setTimeout(r.btn.play, 1e3)) : i && i.attr("readonly") ? r.btn.html(r.btn.txt) : (r.btn.html(r.btn.txt).attr("disabled", !1), r.attr("readonly", !1))
                                    } else r.btn.html("重发验证码 60"), setTimeout(r.btn.play, 1e3)
                                }, r.btn.play(), 0 == i.length && (a.before('<li><i class="Ib">验证码</i><input type="tel" maxlength="6" name="code" autocomplete="off" placeholder="填写验证码"></li>'), i = t.find('input[name="code"]'), Place(t)), 2 == n.status)t.find("h3").html("登录"), 0 == s.length ? (a.after('<li class="sbt"><button type="submit" url="' + Url + 'login.action" disabled>登录</button></li>'), s = t.find(".sbt")) : s.html('<button type="submit" url="' + Url + 'login.action" disabled>登录</button>'), _hmt.push(["_trackEvent", "login", "sign_up", "old"]); else {
                                t.find("h3").html("注册");
                                var o = [];
                                o[0] = '<label><input type="checkbox" checked>', o[1] = '同意<a href="' + Url + 'protocol/u/" target="_blank">《爱屋吉屋软件许可及服务协议》</a></label>', o[2] = '<button type="submit" url="' + Url + 'register.action" disabled>注册</button>', 0 == s.length ? (a.after('<li class="sbt">' + o.join("") + "</li>"), s = t.find(".sbt")) : s.html(o.join("")), Checkbox(s), i.chk = t.find(".Checkbox"), i.chk.click(function () {
                                    if (i.chk.hasClass("checked")) {
                                        var e = i.val();
                                        /^\d{6}$/.test(e) && !i.attr("readonly") ? (a.html(""), i.btn.attr("disabled", !1)) : /^\d*$/.test(e) ? a.html("") : (i.focus(), a.html("请输入正确的验证码!"))
                                    } else a.html("请同意我们的服务协议!"), i.btn.attr("disabled", !0)
                                }), _hmt.push(["_trackEvent", "login", "sign_up", "new"])
                            }
                            i.btn = t.find("button:last"), i.btn.txt = i.btn.html(), i.focus(function () {
                                /^\d{6}$/.test(i.val()) && i.btn.attr("disabled", !1)
                            }), i.focus(), i.keyup(function (e) {
                                if (!i.attr("readonly")) {
                                    var t = !0, n = i.val();
                                    i.chk && (t = i.chk.hasClass("checked")), 13 != e.keyCode && a.html(""), t && /^\d{6}$/.test(n) ? i.btn.attr("disabled", !1) : (i.btn.attr("disabled", !0), /^\d*$/.test(n) ? t || n.length != i.attr("maxlength") || a.html("您未同意我们的服务协议!") : a.html("请输入正确的验证码!"))
                                }
                            }).keydown(function (e) {
                                i && 9 == e.keyCode && r.focus()
                            }), i.btn.unbind("click").bind("click", function (n) {
                                a.html(""), r.attr("readonly", !0), i.attr("readonly", !0), i.btn.attr("disabled", !0).html("正在" + i.btn.txt + "...");
                                var o = e;
                                return $.ajax({
                                    type: t.attr("method"),
                                    url: i.btn.attr("url"),
                                    cache: !1,
                                    data: {mobile: r.val(), code: i.val()},
                                    error: function () {
                                        r.btn.attr("disabled") || r.attr("readonly", !1), i.attr("readonly", !1).val(""), i.btn.attr("disabled", !1).html(i.btn.txt), a.html("系统错误," + i.btn.txt + "失败!")
                                    },
                                    success: function (e) {
                                        r.btn.attr("disabled") || r.attr("readonly", !1), i.attr("readonly", !1), i.btn.attr("disabled", !1).html(i.btn.txt), 1 == e.status ? (t.find(".Close").click(), "注册" == t.find("h3").html() && (localStorage.setItem("registMobile", r.val()), localStorage.setItem("registUserId", e.userId), _hmt.push(["_trackEvent", "Reg01", "click"])), o instanceof Function && (o(), e.reffer = ""), null != o && null != o.refererUrl && (e.reffer = o.refererUrl), e.reffer ? location = e.reffer : checkLogin(e)) : 2 == e.status ? (r.focus(), i.val(""), a.html(i.btn.txt + "失败,用户已注册!")) : 3 == e.status ? (i.val(""), r.focus(), a.html(i.btn.txt + "失败,用户未注册!")) : 4 == e.status ? (i.val(""), r.focus(), a.html("对不起!本网站只为租房用户提供服务")) : 5 == e.status ? (i.val("").focus(), a.html("验证码错误!")) : (i.val(""), a.html("登录失败,未知错误!"))
                                    }
                                }), !1
                            })
                        } else r.attr("readonly", !1), r.btn.html(r.btn.txt).attr("disabled", !1), 4 == n.status ? (r.focus(), a.html("对不起!本网站只为租房用户提供服务")) : (r.focus(), a.html("未知错误!"))
                    }
                }))
            }
        }), !1) : (r.focus(), a.html("手机号码不正确!"), !1)
    }), Pop(t), $(".Mask").css("opacity", "0.65")
}
function checkLogin(e) {
    1 == e.status ? (e.uname && ($("#Top .login").removeClass("none").html('<a href="' + Url + 'userInfo/"><i class="iconfont">&#xe602;</i>' + e.uname + '<i class="iconfont" style="font-size:12px;">&#xe61f;</i></a>'), $("#Top .login").after('<b><i></i><a href="' + Url + 'collectHouseList/">我的收藏</a><a href="' + Url + 'userInfo/">我的账号</a><a href="javascript:loginOut()">退出登录</a></b>')), null != e.kfNum && ($("#Showings span").length > 0 ? e.kfNum > 0 ? $("#Showings span").html(e.kfNum) : $("#Showings span").remove() : e.kfNum > 0 && $("#Showings").append("<span>" + e.kfNum + "</span>")), null != e.ykNum && ($("#Itinerary span").length > 0 ? e.ykNum > 0 ? $("#Itinerary span").html(e.ykNum) : $("#Itinerary span").remove() : e.ykNum > 0 && $("#Itinerary").append("<span>" + e.ykNum + "</span>")), e.reffer && (location = e.reffer)) : ($("#Top .login").addClass("none").html('<i class="iconfont">&#xe602;</i>注册/登录').attr("href", "javascript:Login()"), $("#Itinerary span").remove(), $("#Showings span").remove())
}
function loginOut() {
    $.ajax({
        url: Url + "loginout.action", cache: !1, success: function (e) {
            1 == e.status && (location = Url)
        }
    })
}
function Update() {
    AjaxCheckLogin = $.ajax({
        url: Url + "checkLogin.action", cache: !1, error: function (e) {
            checkLogin(e)
        }, success: function (e) {
            checkLogin(e)
        }
    })
}
function Place(e) {
    if (!(IE() < 6 || IE() > 9)) {
        if (e)e = e.find(":text,input[type=tel],textarea"); else {
            if (1 == pageConfig.flag)return;
            e = $(":text,input[type=tel],textarea")
        }
        e.each(function (e, t) {
            var n = $(t);
            if (!n.attr("Place")) {
                n.attr("Place", !0);
                var i = n.attr("placeholder");
                n.focus(function () {
                    i == n.val() && n.val(""), n.css("color", "")
                }), n.blur(function () {
                    "" == n.val() && n.val(i).css("color", "#aaa")
                }), !n.val() && i && n.val(i).css("color", "#aaa"), $(t.form).submit(function () {
                    n.val() == i && n.val("")
                })
            }
        })
    }
}
function Checkbox(e) {
    e = e ? e.find(':checkbox:not(".chklist")') : $(':checkbox:not(".chklist")'), e.each(function (e, t) {
        t = $(t);
        var n = t.parent();
        n.hasClass("Checkbox") || (t.prop("checked") && n.addClass("checked"), t.click(function (e) {
            return e.stopPropagation(), !1
        }), n.addClass("Checkbox").click(function () {
            return "disabled" == n.attr("disabled") ? !1 : void(n.hasClass("checked") ? (n.removeClass("checked"), t.prop("checked", !1)) : (n.addClass("checked"), t.prop("checked", !0)))
        }))
    })
}
function Radio(e) {
    e = e ? e.find(":radio") : $(":radio"), e.each(function (e, t) {
        t = $(t);
        var n = t.parent();
        n.hasClass("Radio") || (t.prop("checked") && n.addClass("checked"), t.click(function (e) {
            return e.stopPropagation(), !1
        }), n.addClass("Radio").click(function () {
            $(":radio[name=" + t.attr("name") + "]").prop("checked", !1).parent().removeClass("checked"), n.addClass("checked"), t.prop("checked", !0)
        }))
    })
}
function setProvince(e) {
    $.ajax({
        url: Url + "changeCity.action", data: {provinceId: e}, success: function (e) {
            location = e.url ? e.url : Url
        }
    })
}
function Imagess(e, t, n, i) {
    var r = e, a = new Image;
    Browser.ie ? a.onreadystatechange = function () {
        ("complete" == a.readyState || "loaded" == a.readyState) && i(a, t)
    } : Browser.Moz && (a.onload = function () {
        1 == a.complete && i(a, t)
    }), a.onerror = function () {
        t.attr("src", n)
    }, a.src = r
}
function checkimg(e, t) {
    t.attr("src", e.src), t.siblings(".dj,.videoBtn,.Tc").show()
}
function initLoadImg(e) {
    $(".details[flag=2],.details[flag=3]").length > 0 && (e = 1), e = e > 0 ? e : "";
    var t = pageConfig.staticUrl + "/static/iwjw/css/web/img/load/loading" + e + ".png";
    $("img").each(function () {
        var e = $(this), n = e.data("img");
        "undefined" != typeof n && (e.siblings(".dj,.videoBtn,.Tc").hide(), Imagess(n, e, t, checkimg))
    })
}
function SendTo(e) {
    var t = $("#Send");
    0 == t.length && (t = $('<form method="post" action="" id="Send"></form>').appendTo("body"));
    var n = [];
    n[0] = "<h3>发送到手机</h3>", n[1] = '<ul><li class="hint">免费发送下载链接短信到手机</li><li><i class="Ib">手机号码</i>', n[2] = '<input type="tel" name="mobile" maxlength="11" placeholder="请输入手机号码">', n[3] = '<button type="submit" url="' + Url + 'sendMsg.action">确认提交</button></li><li class="Rr"></li></ul>', t.html(n.join("")), Place(t);
    var i, r = t.find('input[name="mobile"]'), a = t.find(".Rr");
    r.btn = t.find("button:first"), r.btn.txt = r.btn.html(), r.keyup(function (e) {
        if (!r.attr("readonly")) {
            var t = r.val();
            13 != e.keyCode && a.html(""), t.length == r.attr("maxlength") ? /^1[3|4|5|7|8]\d{9}$/.test(t) || a.html("手机号码不正确!") : /^\d*$/.test(t) || a.html("手机号码只能为数字!")
        }
    }).keydown(function (e) {
        i && 9 == e.keyCode && i.focus()
    }), r.btn.click(function () {
        return r.val() == r.attr("placeholder") && r.val(""), "" == Ks(r.val()) ? (r.focus(), a.html("手机号码不能为空!"), !1) : /^1[3|4|5|7|8]\d{9}$/.test(r.val()) ? ($.ajax({
            type: "post",
            dataType: "text",
            url: Url + "getToken.action",
            cache: !1,
            data: {mobile: r.val()},
            success: function (e) {
                "" != e && (r.btn.attr("disabled", !0).html("正在提交..."), r.attr("readonly", !0), a.html(""), $.ajax({
                    type: t.attr("method"),
                    url: r.btn.attr("url"),
                    cache: !1,
                    data: {mobile: r.val(), uuid: e},
                    error: function () {
                        r.attr("readonly", !1), r.btn.attr("disabled", !1).html(r.btn.txt), a.html("系统错误," + r.btn.txt + "失败!")
                    },
                    success: function (e) {
                        if (1 == e.status) {
                            r.btn.attr("type", "button");
                            {
                                t.find(".sbt")
                            }
                            i = t.find('input[name="mobile"]'), r.btn.play = function () {
                                r.btn.tim && clearTimeout(r.btn.tim);
                                var e = /^.*?(\d+)$/, t = r.btn.html();
                                if (e.test(t)) {
                                    var n = parseInt(t.replace(e, "$1"));
                                    n > 0 && n--, n > 0 ? (r.btn.html("重新发送 " + n), r.btn.tim = setTimeout(r.btn.play, 1e3)) : r.btn.html(r.btn.txt)
                                } else r.btn.html("重新发送 60"), setTimeout(r.btn.play, 1e3)
                            }, r.btn.play(), t.find(".Close").click(), Alert("短信发送成功，请查收~"), ag_iwjw("207", r.val())
                        } else r.attr("readonly", !1), r.btn.html(r.btn.txt).attr("disabled", !1), r.focus(), a.html("短信发送失败!")
                    }
                }))
            }
        }), !1) : (r.focus(), a.html("手机号码不正确!"), !1)
    }), Pop(t), $(".Mask").css("opacity", "0.65")
}
function searchHistory(e, t, n) {
    if ("" != e) {
        var i = localStorage.getItem("searchHistory" + t + n);
        if (i) {
            i = i.split(",");
            for (var r = i.length - 1; r >= 0; r--)if (i[r] == e) {
                i.splice(r, 1);
                break
            }
            i.unshift(e), i.length > 10 && (i.length = 10), localStorage.setItem("searchHistory" + t + n, i.join(","))
        } else localStorage.setItem("searchHistory" + t + n, e)
    }
}
function showKwClose(e) {
    return "" == Ks(Val(e)) ? void e.nextAll(".Close0").hide() : void(0 == e.nextAll(".Close0").length ? $('<i class="iconfont Close0" title="清除内容">&#xe648;</i>').insertAfter(e).click(function (t) {
        e.val(""), $(this).hide(), e.blur()
    }) : e.nextAll(".Close0").show())
}
function showKwBlankMask(e) {
    0 == e.nextAll(".CloseBlank").length ? $('<i class="CloseBlank"></i>').insertAfter(e) : e.nextAll(".CloseBlank").show()
}
function hideBlankMask(e) {
    e.nextAll(".CloseBlank").hide()
}
function getagCodeVal(e) {
    return agCodes[e] ? agCodes[e] : ""
}
function agjs_load() {
    !function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = ("https:" == document.location.protocol ? "https" : "http") + "://t.agrantsem.com/js/ag.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    }()
}
function ag_iwjw(e, t) {
    _agt = [], _agt.push(["_atscu", "AG_334133_PJPE"]), _agt.push(["_atsdomain", "iwjw.com"]), _agt.push(["_atsev", e]);
    var n = getagCodeVal(e);
    n && _agt.push([n, t]), agjs_load()
}
function all() {
    _agt = _agt || [], _agt.push(["_atscu", "AG_334133_PJPE"]), _agt.push(["_atsdomain", "iwjw.com"]), agjs_load()
}
window.App = {modules: {}, common: {modules: {}}}, !function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = e.length, n = re.type(e);
        return "function" === n || re.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function i(e, t, n) {
        if (re.isFunction(t))return re.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType)return re.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (he.test(t))return re.filter(t, e, n);
            t = re.filter(t, e)
        }
        return re.grep(e, function (e) {
            return re.inArray(e, t) >= 0 !== n
        })
    }

    function r(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function a(e) {
        var t = we[e] = {};
        return re.each(e.match(be) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function o() {
        pe.addEventListener ? (pe.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (pe.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (pe.addEventListener || "load" === event.type || "complete" === pe.readyState) && (o(), re.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(De, "-$1").toLowerCase();
            if (n = e.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ce.test(n) ? re.parseJSON(n) : n
                } catch (r) {
                }
                re.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function u(e) {
        var t;
        for (t in e)if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
        return !0
    }

    function c(e, t, n, i) {
        if (re.acceptData(e)) {
            var r, a, o = re.expando, s = e.nodeType, l = s ? re.cache : e, u = s ? e[o] : e[o] && o;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof t)return u || (u = s ? e[o] = Q.pop() || re.guid++ : o), l[u] || (l[u] = s ? {} : {toJSON: re.noop}), ("object" == typeof t || "function" == typeof t) && (i ? l[u] = re.extend(l[u], t) : l[u].data = re.extend(l[u].data, t)), a = l[u], i || (a.data || (a.data = {}), a = a.data), void 0 !== n && (a[re.camelCase(t)] = n), "string" == typeof t ? (r = a[t], null == r && (r = a[re.camelCase(t)])) : r = a, r
        }
    }

    function d(e, t, n) {
        if (re.acceptData(e)) {
            var i, r, a = e.nodeType, o = a ? re.cache : e, s = a ? e[re.expando] : re.expando;
            if (o[s]) {
                if (t && (i = n ? o[s] : o[s].data)) {
                    re.isArray(t) ? t = t.concat(re.map(t, re.camelCase)) : t in i ? t = [t] : (t = re.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
                    for (; r--;)delete i[t[r]];
                    if (n ? !u(i) : !re.isEmptyObject(i))return
                }
                (n || (delete o[s].data, u(o[s]))) && (a ? re.cleanData([e], !0) : ne.deleteExpando || o != o.window ? delete o[s] : o[s] = null)
            }
        }
    }

    function h() {
        return !0
    }

    function f() {
        return !1
    }

    function p() {
        try {
            return pe.activeElement
        } catch (e) {
        }
    }

    function m(e) {
        var t = Ue.split("|"), n = e.createDocumentFragment();
        if (n.createElement)for (; t.length;)n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, i, r = 0, a = typeof e.getElementsByTagName !== Te ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Te ? e.querySelectorAll(t || "*") : void 0;
        if (!a)for (a = [], n = e.childNodes || e; null != (i = n[r]); r++)!t || re.nodeName(i, t) ? a.push(i) : re.merge(a, g(i, t));
        return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], a) : a
    }

    function v(e) {
        Se.test(e.type) && (e.defaultChecked = e.checked)
    }

    function y(e, t) {
        return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function b(e) {
        return e.type = (null !== re.find.attr(e, "type")) + "/" + e.type, e
    }

    function w(e) {
        var t = Ye.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function x(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++)re._data(n, "globalEval", !t || re._data(t[i], "globalEval"))
    }

    function k(e, t) {
        if (1 === t.nodeType && re.hasData(e)) {
            var n, i, r, a = re._data(e), o = re._data(t, a), s = a.events;
            if (s) {
                delete o.handle, o.events = {};
                for (n in s)for (i = 0, r = s[n].length; r > i; i++)re.event.add(t, n, s[n][i])
            }
            o.data && (o.data = re.extend({}, o.data))
        }
    }

    function T(e, t) {
        var n, i, r;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[re.expando]) {
                r = re._data(t);
                for (i in r.events)re.removeEvent(t, i, r.handle);
                t.removeAttribute(re.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text, w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !re.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Se.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function C(t, n) {
        var i, r = re(n.createElement(t)).appendTo(n.body), a = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(r[0])) ? i.display : re.css(r[0], "display");
        return r.detach(), a
    }

    function D(e) {
        var t = pe, n = Ze[e];
        return n || (n = C(e, t), "none" !== n && n || (Ge = (Ge || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ge[0].contentWindow || Ge[0].contentDocument).document, t.write(), t.close(), n = C(e, t), Ge.detach()), Ze[e] = n), n
    }

    function j(e, t) {
        return {
            get: function () {
                var n = e();
                return null != n ? n ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
            }
        }
    }

    function _(e, t) {
        if (t in e)return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = ht.length; r--;)if (t = ht[r] + n, t in e)return t;
        return i
    }

    function M(e, t) {
        for (var n, i, r, a = [], o = 0, s = e.length; s > o; o++)i = e[o], i.style && (a[o] = re._data(i, "olddisplay"), n = i.style.display, t ? (a[o] || "none" !== n || (i.style.display = ""), "" === i.style.display && Me(i) && (a[o] = re._data(i, "olddisplay", D(i.nodeName)))) : (r = Me(i), (n && "none" !== n || !r) && re._data(i, "olddisplay", r ? n : re.css(i, "display"))));
        for (o = 0; s > o; o++)i = e[o], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[o] || "" : "none"));
        return e
    }

    function N(e, t, n) {
        var i = lt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function S(e, t, n, i, r) {
        for (var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2)"margin" === n && (o += re.css(e, n + _e[a], !0, r)), i ? ("content" === n && (o -= re.css(e, "padding" + _e[a], !0, r)), "margin" !== n && (o -= re.css(e, "border" + _e[a] + "Width", !0, r))) : (o += re.css(e, "padding" + _e[a], !0, r), "padding" !== n && (o += re.css(e, "border" + _e[a] + "Width", !0, r)));
        return o
    }

    function F(e, t, n) {
        var i = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, a = et(e), o = ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, a);
        if (0 >= r || null == r) {
            if (r = tt(e, t, a), (0 > r || null == r) && (r = e.style[t]), it.test(r))return r;
            i = o && (ne.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + S(e, t, n || (o ? "border" : "content"), i, a) + "px"
    }

    function E(e, t, n, i, r) {
        return new E.prototype.init(e, t, n, i, r)
    }

    function $() {
        return setTimeout(function () {
            ft = void 0
        }), ft = re.now()
    }

    function A(e, t) {
        var n, i = {height: e}, r = 0;
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = _e[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function L(e, t, n) {
        for (var i, r = (bt[t] || []).concat(bt["*"]), a = 0, o = r.length; o > a; a++)if (i = r[a].call(n, t, e))return i
    }

    function U(e, t, n) {
        var i, r, a, o, s, l, u, c, d = this, h = {}, f = e.style, p = e.nodeType && Me(e), m = re._data(e, "fxshow");
        n.queue || (s = re._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
            s.unqueued || l()
        }), s.unqueued++, d.always(function () {
            d.always(function () {
                s.unqueued--, re.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], u = re.css(e, "display"), c = "none" === u ? re._data(e, "olddisplay") || D(e.nodeName) : u, "inline" === c && "none" === re.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ne.shrinkWrapBlocks() || d.always(function () {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in t)if (r = t[i], mt.exec(r)) {
            if (delete t[i], a = a || "toggle" === r, r === (p ? "hide" : "show")) {
                if ("show" !== r || !m || void 0 === m[i])continue;
                p = !0
            }
            h[i] = m && m[i] || re.style(e, i)
        } else u = void 0;
        if (re.isEmptyObject(h))"inline" === ("none" === u ? D(e.nodeName) : u) && (f.display = u); else {
            m ? "hidden"in m && (p = m.hidden) : m = re._data(e, "fxshow", {}), a && (m.hidden = !p), p ? re(e).show() : d.done(function () {
                re(e).hide()
            }), d.done(function () {
                var t;
                re._removeData(e, "fxshow");
                for (t in h)re.style(e, t, h[t])
            });
            for (i in h)o = L(p ? m[i] : 0, i, d), i in m || (m[i] = o.start, p && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function O(e, t) {
        var n, i, r, a, o;
        for (n in e)if (i = re.camelCase(n), r = t[i], a = e[n], re.isArray(a) && (r = a[1], a = e[n] = a[0]), n !== i && (e[i] = a, delete e[n]), o = re.cssHooks[i], o && "expand"in o) {
            a = o.expand(a), delete e[i];
            for (n in a)n in e || (e[n] = a[n], t[n] = r)
        } else t[i] = r
    }

    function H(e, t, n) {
        var i, r, a = 0, o = yt.length, s = re.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (r)return !1;
            for (var t = ft || $(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, a = 1 - i, o = 0, l = u.tweens.length; l > o; o++)u.tweens[o].run(a);
            return s.notifyWith(e, [u, a, n]), 1 > a && l ? n : (s.resolveWith(e, [u]), !1)
        }, u = s.promise({
            elem: e,
            props: re.extend({}, t),
            opts: re.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: ft || $(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var i = re.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(i), i
            },
            stop: function (t) {
                var n = 0, i = t ? u.tweens.length : 0;
                if (r)return this;
                for (r = !0; i > n; n++)u.tweens[n].run(1);
                return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
            }
        }), c = u.props;
        for (O(c, u.opts.specialEasing); o > a; a++)if (i = yt[a].call(u, e, c, u.opts))return i;
        return re.map(c, L, u), re.isFunction(u.opts.start) && u.opts.start.call(e, u), re.fx.timer(re.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function I(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, r = 0, a = t.toLowerCase().match(be) || [];
            if (re.isFunction(n))for (; i = a[r++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function P(e, t, n, i) {
        function r(s) {
            var l;
            return a[s] = !0, re.each(e[s] || [], function (e, s) {
                var u = s(t, n, i);
                return "string" != typeof u || o || a[u] ? o ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }

        var a = {}, o = e === Bt;
        return r(t.dataTypes[0]) || !a["*"] && r("*")
    }

    function V(e, t) {
        var n, i, r = re.ajaxSettings.flatOptions || {};
        for (i in t)void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
        return n && re.extend(!0, e, n), e
    }

    function q(e, t, n) {
        for (var i, r, a, o, s = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)for (o in s)if (s[o] && s[o].test(r)) {
            l.unshift(o);
            break
        }
        if (l[0]in n)a = l[0]; else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    a = o;
                    break
                }
                i || (i = o)
            }
            a = a || i
        }
        return a ? (a !== l[0] && l.unshift(a), n[a]) : void 0
    }

    function B(e, t, n, i) {
        var r, a, o, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1])for (o in e.converters)u[o.toLowerCase()] = e.converters[o];
        for (a = c.shift(); a;)if (e.responseFields[a] && (n[e.responseFields[a]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = a, a = c.shift())if ("*" === a)a = l; else if ("*" !== l && l !== a) {
            if (o = u[l + " " + a] || u["* " + a], !o)for (r in u)if (s = r.split(" "), s[1] === a && (o = u[l + " " + s[0]] || u["* " + s[0]])) {
                o === !0 ? o = u[r] : u[r] !== !0 && (a = s[0], c.unshift(s[1]));
                break
            }
            if (o !== !0)if (o && e["throws"])t = o(t); else try {
                t = o(t)
            } catch (d) {
                return {state: "parsererror", error: o ? d : "No conversion from " + l + " to " + a}
            }
        }
        return {state: "success", data: t}
    }

    function R(e, t, n, i) {
        var r;
        if (re.isArray(t))re.each(t, function (t, r) {
            n || Yt.test(e) ? i(e, r) : R(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
        }); else if (n || "object" !== re.type(t))i(e, t); else for (r in t)R(e + "[" + r + "]", t[r], n, i)
    }

    function W() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function z() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function Y(e) {
        return re.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var Q = [], J = Q.slice, X = Q.concat, K = Q.push, G = Q.indexOf, Z = {}, ee = Z.toString, te = Z.hasOwnProperty, ne = {}, ie = "1.11.1", re = function (e, t) {
        return new re.fn.init(e, t)
    }, ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, oe = /^-ms-/, se = /-([\da-z])/gi, le = function (e, t) {
        return t.toUpperCase()
    };
    re.fn = re.prototype = {
        jquery: ie, constructor: re, selector: "", length: 0, toArray: function () {
            return J.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : J.call(this)
        }, pushStack: function (e) {
            var t = re.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return re.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(re.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(J.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: K, sort: Q.sort, splice: Q.splice
    }, re.extend = re.fn.extend = function () {
        var e, t, n, i, r, a, o = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof o && (u = o, o = arguments[s] || {}, s++), "object" == typeof o || re.isFunction(o) || (o = {}), s === l && (o = this, s--); l > s; s++)if (null != (r = arguments[s]))for (i in r)e = o[i], n = r[i], o !== n && (u && n && (re.isPlainObject(n) || (t = re.isArray(n))) ? (t ? (t = !1, a = e && re.isArray(e) ? e : []) : a = e && re.isPlainObject(e) ? e : {}, o[i] = re.extend(u, a, n)) : void 0 !== n && (o[i] = n));
        return o
    }, re.extend({
        expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === re.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === re.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return !re.isArray(e) && e - parseFloat(e) >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e))return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (n) {
                return !1
            }
            if (ne.ownLast)for (t in e)return te.call(e, t);
            for (t in e);
            return void 0 === t || te.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && re.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(oe, "ms-").replace(se, le)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, i) {
            var r, a = 0, o = e.length, s = n(e);
            if (i) {
                if (s)for (; o > a && (r = t.apply(e[a], i), r !== !1); a++); else for (a in e)if (r = t.apply(e[a], i), r === !1)break
            } else if (s)for (; o > a && (r = t.call(e[a], a, e[a]), r !== !1); a++); else for (a in e)if (r = t.call(e[a], a, e[a]), r === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(ae, "")
        }, makeArray: function (e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
        }, inArray: function (e, t, n) {
            var i;
            if (t) {
                if (G)return G.call(t, e, n);
                for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)if (n in t && t[n] === e)return n
            }
            return -1
        }, merge: function (e, t) {
            for (var n = +t.length, i = 0, r = e.length; n > i;)e[r++] = t[i++];
            if (n !== n)for (; void 0 !== t[i];)e[r++] = t[i++];
            return e.length = r, e
        }, grep: function (e, t, n) {
            for (var i, r = [], a = 0, o = e.length, s = !n; o > a; a++)i = !t(e[a], a), i !== s && r.push(e[a]);
            return r
        }, map: function (e, t, i) {
            var r, a = 0, o = e.length, s = n(e), l = [];
            if (s)for (; o > a; a++)r = t(e[a], a, i), null != r && l.push(r); else for (a in e)r = t(e[a], a, i), null != r && l.push(r);
            return X.apply([], l)
        }, guid: 1, proxy: function (e, t) {
            var n, i, r;
            return "string" == typeof t && (r = e[t], t = e, e = r), re.isFunction(e) ? (n = J.call(arguments, 2), i = function () {
                return e.apply(t || this, n.concat(J.call(arguments)))
            }, i.guid = e.guid = e.guid || re.guid++, i) : void 0
        }, now: function () {
            return +new Date
        }, support: ne
    }), re.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var ue = function (e) {
        function t(e, t, n, i) {
            var r, a, o, s, l, u, d, f, p, m;
            if ((t ? t.ownerDocument || t : P) !== E && F(t), t = t || E, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (s = t.nodeType) && 9 !== s)return [];
            if (A && !i) {
                if (r = ye.exec(e))if (o = r[1]) {
                    if (9 === s) {
                        if (a = t.getElementById(o), !a || !a.parentNode)return n;
                        if (a.id === o)return n.push(a), n
                    } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && H(t, a) && a.id === o)return n.push(a), n
                } else {
                    if (r[2])return Z.apply(n, t.getElementsByTagName(e)), n;
                    if ((o = r[3]) && x.getElementsByClassName && t.getElementsByClassName)return Z.apply(n, t.getElementsByClassName(o)), n
                }
                if (x.qsa && (!L || !L.test(e))) {
                    if (f = d = I, p = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (u = D(e), (d = t.getAttribute("id")) ? f = d.replace(we, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = u.length; l--;)u[l] = f + h(u[l]);
                        p = be.test(e) && c(t.parentNode) || t, m = u.join(",")
                    }
                    if (m)try {
                        return Z.apply(n, p.querySelectorAll(m)), n
                    } catch (g) {
                    } finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return _(e.replace(le, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
            }

            var t = [];
            return e
        }

        function i(e) {
            return e[I] = !0, e
        }

        function r(e) {
            var t = E.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function a(e, t) {
            for (var n = e.split("|"), i = e.length; i--;)k.attrHandle[n[i]] = t
        }

        function o(e, t) {
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Q) - (~e.sourceIndex || Q);
            if (i)return i;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return i(function (t) {
                return t = +t, i(function (n, i) {
                    for (var r, a = e([], n.length, t), o = a.length; o--;)n[r = a[o]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }

        function c(e) {
            return e && typeof e.getElementsByTagName !== Y && e
        }

        function d() {
        }

        function h(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++)i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir, r = n && "parentNode" === i, a = q++;
            return t.first ? function (t, n, a) {
                for (; t = t[i];)if (1 === t.nodeType || r)return e(t, n, a)
            } : function (t, n, o) {
                var s, l, u = [V, a];
                if (o) {
                    for (; t = t[i];)if ((1 === t.nodeType || r) && e(t, n, o))return !0
                } else for (; t = t[i];)if (1 === t.nodeType || r) {
                    if (l = t[I] || (t[I] = {}), (s = l[i]) && s[0] === V && s[1] === a)return u[2] = s[2];
                    if (l[i] = u, u[2] = e(t, n, o))return !0
                }
            }
        }

        function p(e) {
            return e.length > 1 ? function (t, n, i) {
                for (var r = e.length; r--;)if (!e[r](t, n, i))return !1;
                return !0
            } : e[0]
        }

        function m(e, n, i) {
            for (var r = 0, a = n.length; a > r; r++)t(e, n[r], i);
            return i
        }

        function g(e, t, n, i, r) {
            for (var a, o = [], s = 0, l = e.length, u = null != t; l > s; s++)(a = e[s]) && (!n || n(a, i, r)) && (o.push(a), u && t.push(s));
            return o
        }

        function v(e, t, n, r, a, o) {
            return r && !r[I] && (r = v(r)), a && !a[I] && (a = v(a, o)), i(function (i, o, s, l) {
                var u, c, d, h = [], f = [], p = o.length, v = i || m(t || "*", s.nodeType ? [s] : s, []), y = !e || !i && t ? v : g(v, h, e, s, l), b = n ? a || (i ? e : p || r) ? [] : o : y;
                if (n && n(y, b, s, l), r)for (u = g(b, f), r(u, [], s, l), c = u.length; c--;)(d = u[c]) && (b[f[c]] = !(y[f[c]] = d));
                if (i) {
                    if (a || e) {
                        if (a) {
                            for (u = [], c = b.length; c--;)(d = b[c]) && u.push(y[c] = d);
                            a(null, b = [], u, l)
                        }
                        for (c = b.length; c--;)(d = b[c]) && (u = a ? te.call(i, d) : h[c]) > -1 && (i[u] = !(o[u] = d))
                    }
                } else b = g(b === o ? b.splice(p, b.length) : b), a ? a(null, o, b, l) : Z.apply(o, b)
            })
        }

        function y(e) {
            for (var t, n, i, r = e.length, a = k.relative[e[0].type], o = a || k.relative[" "], s = a ? 1 : 0, l = f(function (e) {
                return e === t
            }, o, !0), u = f(function (e) {
                return te.call(t, e) > -1
            }, o, !0), c = [function (e, n, i) {
                return !a && (i || n !== M) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i))
            }]; r > s; s++)if (n = k.relative[e[s].type])c = [f(p(c), n)]; else {
                if (n = k.filter[e[s].type].apply(null, e[s].matches), n[I]) {
                    for (i = ++s; r > i && !k.relative[e[i].type]; i++);
                    return v(s > 1 && p(c), s > 1 && h(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(le, "$1"), n, i > s && y(e.slice(s, i)), r > i && y(e = e.slice(i)), r > i && h(e))
                }
                c.push(n)
            }
            return p(c)
        }

        function b(e, n) {
            var r = n.length > 0, a = e.length > 0, o = function (i, o, s, l, u) {
                var c, d, h, f = 0, p = "0", m = i && [], v = [], y = M, b = i || a && k.find.TAG("*", u), w = V += null == y ? 1 : Math.random() || .1, x = b.length;
                for (u && (M = o !== E && o); p !== x && null != (c = b[p]); p++) {
                    if (a && c) {
                        for (d = 0; h = e[d++];)if (h(c, o, s)) {
                            l.push(c);
                            break
                        }
                        u && (V = w)
                    }
                    r && ((c = !h && c) && f--, i && m.push(c))
                }
                if (f += p, r && p !== f) {
                    for (d = 0; h = n[d++];)h(m, v, o, s);
                    if (i) {
                        if (f > 0)for (; p--;)m[p] || v[p] || (v[p] = K.call(l));
                        v = g(v)
                    }
                    Z.apply(l, v), u && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                }
                return u && (V = w, M = y), m
            };
            return r ? i(o) : o
        }

        var w, x, k, T, C, D, j, _, M, N, S, F, E, $, A, L, U, O, H, I = "sizzle" + -new Date, P = e.document, V = 0, q = 0, B = n(), R = n(), W = n(), z = function (e, t) {
            return e === t && (S = !0), 0
        }, Y = "undefined", Q = 1 << 31, J = {}.hasOwnProperty, X = [], K = X.pop, G = X.push, Z = X.push, ee = X.slice, te = X.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                return -1
            }, ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ie = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ae = re.replace("w", "w#"), oe = "\\[" + ie + "*(" + re + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ae + "))|)" + ie + "*\\]", se = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)", le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"), ue = new RegExp("^" + ie + "*," + ie + "*"), ce = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"), de = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"), he = new RegExp(se), fe = new RegExp("^" + ae + "$"), pe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + oe),
            PSEUDO: new RegExp("^" + se),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ne + ")$", "i"),
            needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
        }, me = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, we = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"), ke = function (e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        };
        try {
            Z.apply(X = ee.call(P.childNodes), P.childNodes), X[P.childNodes.length].nodeType
        } catch (Te) {
            Z = {
                apply: X.length ? function (e, t) {
                    G.apply(e, ee.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        x = t.support = {}, C = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, F = t.setDocument = function (e) {
            var t, n = e ? e.ownerDocument || e : P, i = n.defaultView;
            return n !== E && 9 === n.nodeType && n.documentElement ? (E = n, $ = n.documentElement, A = !C(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function () {
                F()
            }, !1) : i.attachEvent && i.attachEvent("onunload", function () {
                F()
            })), x.attributes = r(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), x.getElementsByTagName = r(function (e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), x.getElementsByClassName = ve.test(n.getElementsByClassName) && r(function (e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), x.getById = r(function (e) {
                return $.appendChild(e).id = I, !n.getElementsByName || !n.getElementsByName(I).length
            }), x.getById ? (k.find.ID = function (e, t) {
                if (typeof t.getElementById !== Y && A) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, k.filter.ID = function (e) {
                var t = e.replace(xe, ke);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete k.find.ID, k.filter.ID = function (e) {
                var t = e.replace(xe, ke);
                return function (e) {
                    var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), k.find.TAG = x.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
            } : function (e, t) {
                var n, i = [], r = 0, a = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = a[r++];)1 === n.nodeType && i.push(n);
                    return i
                }
                return a
            }, k.find.CLASS = x.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== Y && A ? t.getElementsByClassName(e) : void 0
                }, U = [], L = [], (x.qsa = ve.test(n.querySelectorAll)) && (r(function (e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && L.push("[*^$]=" + ie + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ie + "*(?:value|" + ne + ")"), e.querySelectorAll(":checked").length || L.push(":checked")
            }), r(function (e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ie + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
            })), (x.matchesSelector = ve.test(O = $.matches || $.webkitMatchesSelector || $.mozMatchesSelector || $.oMatchesSelector || $.msMatchesSelector)) && r(function (e) {
                x.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), U.push("!=", se)
            }), L = L.length && new RegExp(L.join("|")), U = U.length && new RegExp(U.join("|")), t = ve.test($.compareDocumentPosition), H = t || ve.test($.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, z = t ? function (e, t) {
                if (e === t)return S = !0, 0;
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !x.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === P && H(P, e) ? -1 : t === n || t.ownerDocument === P && H(P, t) ? 1 : N ? te.call(N, e) - te.call(N, t) : 0 : 4 & i ? -1 : 1)
            } : function (e, t) {
                if (e === t)return S = !0, 0;
                var i, r = 0, a = e.parentNode, s = t.parentNode, l = [e], u = [t];
                if (!a || !s)return e === n ? -1 : t === n ? 1 : a ? -1 : s ? 1 : N ? te.call(N, e) - te.call(N, t) : 0;
                if (a === s)return o(e, t);
                for (i = e; i = i.parentNode;)l.unshift(i);
                for (i = t; i = i.parentNode;)u.unshift(i);
                for (; l[r] === u[r];)r++;
                return r ? o(l[r], u[r]) : l[r] === P ? -1 : u[r] === P ? 1 : 0
            }, n) : E
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== E && F(e), n = n.replace(de, "='$1']"), !(!x.matchesSelector || !A || U && U.test(n) || L && L.test(n)))try {
                var i = O.call(e, n);
                if (i || x.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
            } catch (r) {
            }
            return t(n, E, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== E && F(e), H(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== E && F(e);
            var n = k.attrHandle[t.toLowerCase()], i = n && J.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !A) : void 0;
            return void 0 !== i ? i : x.attributes || !A ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], i = 0, r = 0;
            if (S = !x.detectDuplicates, N = !x.sortStable && e.slice(0), e.sort(z), S) {
                for (; t = e[r++];)t === e[r] && (i = n.push(r));
                for (; i--;)e.splice(n[i], 1)
            }
            return N = null, e
        }, T = t.getText = function (e) {
            var t, n = "", i = 0, r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += T(e)
                } else if (3 === r || 4 === r)return e.nodeValue
            } else for (; t = e[i++];)n += T(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(xe, ke), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, ke), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && he.test(n) && (t = D(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(xe, ke).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && B(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, i) {
                    return function (r) {
                        var a = t.attr(r, e);
                        return null == a ? "!=" === n : n ? (a += "", "=" === n ? a === i : "!=" === n ? a !== i : "^=" === n ? i && 0 === a.indexOf(i) : "*=" === n ? i && a.indexOf(i) > -1 : "$=" === n ? i && a.slice(-i.length) === i : "~=" === n ? (" " + a + " ").indexOf(i) > -1 : "|=" === n ? a === i || a.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, i, r) {
                    var a = "nth" !== e.slice(0, 3), o = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === i && 0 === r ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var u, c, d, h, f, p, m = a !== o ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s;
                        if (g) {
                            if (a) {
                                for (; m;) {
                                    for (d = t; d = d[m];)if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)return !1;
                                    p = m = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [o ? g.firstChild : g.lastChild], o && y) {
                                for (c = g[I] || (g[I] = {}), u = c[e] || [], f = u[0] === V && u[1], h = u[0] === V && u[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (h = f = 0) || p.pop();)if (1 === d.nodeType && ++h && d === t) {
                                    c[e] = [V, f, h];
                                    break
                                }
                            } else if (y && (u = (t[I] || (t[I] = {}))[e]) && u[0] === V)h = u[1]; else for (; (d = ++f && d && d[m] || (h = f = 0) || p.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++h || (y && ((d[I] || (d[I] = {}))[e] = [V, h]), d !== t)););
                            return h -= r, h === i || h % i === 0 && h / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var r, a = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return a[I] ? a(n) : a.length > 1 ? (r = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, r = a(e, n), o = r.length; o--;)i = te.call(e, r[o]), e[i] = !(t[i] = r[o])
                    }) : function (e) {
                        return a(e, 0, r)
                    }) : a
                }
            },
            pseudos: {
                not: i(function (e) {
                    var t = [], n = [], r = j(e.replace(le, "$1"));
                    return r[I] ? i(function (e, t, n, i) {
                        for (var a, o = r(e, null, i, []), s = e.length; s--;)(a = o[s]) && (e[s] = !(t[s] = a))
                    }) : function (e, i, a) {
                        return t[0] = e, r(t, null, a, n), !n.pop()
                    }
                }), has: i(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: i(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                    }
                }), lang: i(function (e) {
                    return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, ke).toLowerCase(), function (t) {
                        var n;
                        do if (n = A ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === $
                }, focus: function (e) {
                    return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !k.pseudos.empty(e)
                }, header: function (e) {
                    return ge.test(e.nodeName)
                }, input: function (e) {
                    return me.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return [0]
                }), last: u(function (e, t) {
                    return [t - 1]
                }), eq: u(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;)e.push(i);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;)e.push(i);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})k.pseudos[w] = s(w);
        for (w in{submit: !0, reset: !0})k.pseudos[w] = l(w);
        return d.prototype = k.filters = k.pseudos, k.setFilters = new d, D = t.tokenize = function (e, n) {
            var i, r, a, o, s, l, u, c = R[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (s = e, l = [], u = k.preFilter; s;) {
                (!i || (r = ue.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(a = [])), i = !1, (r = ce.exec(s)) && (i = r.shift(), a.push({
                    value: i,
                    type: r[0].replace(le, " ")
                }), s = s.slice(i.length));
                for (o in k.filter)!(r = pe[o].exec(s)) || u[o] && !(r = u[o](r)) || (i = r.shift(), a.push({
                    value: i,
                    type: o,
                    matches: r
                }), s = s.slice(i.length));
                if (!i)break
            }
            return n ? s.length : s ? t.error(e) : R(e, l).slice(0)
        }, j = t.compile = function (e, t) {
            var n, i = [], r = [], a = W[e + " "];
            if (!a) {
                for (t || (t = D(e)), n = t.length; n--;)a = y(t[n]), a[I] ? i.push(a) : r.push(a);
                a = W(e, b(r, i)), a.selector = e
            }
            return a
        }, _ = t.select = function (e, t, n, i) {
            var r, a, o, s, l, u = "function" == typeof e && e, d = !i && D(e = u.selector || e);
            if (n = n || [], 1 === d.length) {
                if (a = d[0] = d[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && x.getById && 9 === t.nodeType && A && k.relative[a[1].type]) {
                    if (t = (k.find.ID(o.matches[0].replace(xe, ke), t) || [])[0], !t)return n;
                    u && (t = t.parentNode), e = e.slice(a.shift().value.length)
                }
                for (r = pe.needsContext.test(e) ? 0 : a.length; r-- && (o = a[r], !k.relative[s = o.type]);)if ((l = k.find[s]) && (i = l(o.matches[0].replace(xe, ke), be.test(a[0].type) && c(t.parentNode) || t))) {
                    if (a.splice(r, 1), e = i.length && h(a), !e)return Z.apply(n, i), n;
                    break
                }
            }
            return (u || j(e, d))(i, t, !A, n, be.test(e) && c(t.parentNode) || t), n
        }, x.sortStable = I.split("").sort(z).join("") === I, x.detectDuplicates = !!S, F(), x.sortDetached = r(function (e) {
            return 1 & e.compareDocumentPosition(E.createElement("div"))
        }), r(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), x.attributes && r(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || a("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), r(function (e) {
            return null == e.getAttribute("disabled")
        }) || a(ne, function (e, t, n) {
            var i;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    re.find = ue, re.expr = ue.selectors, re.expr[":"] = re.expr.pseudos, re.unique = ue.uniqueSort, re.text = ue.getText, re.isXMLDoc = ue.isXML, re.contains = ue.contains;
    var ce = re.expr.match.needsContext, de = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, he = /^.[^:#\[\.,]*$/;
    re.filter = function (e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(e, re.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, re.fn.extend({
        find: function (e) {
            var t, n = [], i = this, r = i.length;
            if ("string" != typeof e)return this.pushStack(re(e).filter(function () {
                for (t = 0; r > t; t++)if (re.contains(i[t], this))return !0
            }));
            for (t = 0; r > t; t++)re.find(e, i[t], n);
            return n = this.pushStack(r > 1 ? re.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(i(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(i(this, e || [], !0))
        }, is: function (e) {
            return !!i(this, "string" == typeof e && ce.test(e) ? re(e) : e || [], !1).length
        }
    });
    var fe, pe = e.document, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ge = re.fn.init = function (e, t) {
        var n, i;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : pe, !0)), de.test(n[1]) && re.isPlainObject(t))for (n in t)re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (i = pe.getElementById(n[2]), i && i.parentNode) {
                if (i.id !== n[2])return fe.find(e);
                this.length = 1, this[0] = i
            }
            return this.context = pe, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? "undefined" != typeof fe.ready ? fe.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
    };
    ge.prototype = re.fn, fe = re(pe);
    var ve = /^(?:parents|prev(?:Until|All))/, ye = {children: !0, contents: !0, next: !0, prev: !0};
    re.extend({
        dir: function (e, t, n) {
            for (var i = [], r = e[t]; r && 9 !== r.nodeType && (void 0 === n || 1 !== r.nodeType || !re(r).is(n));)1 === r.nodeType && i.push(r), r = r[t];
            return i
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), re.fn.extend({
        has: function (e) {
            var t, n = re(e, this), i = n.length;
            return this.filter(function () {
                for (t = 0; i > t; t++)if (re.contains(this, n[t]))return !0
            })
        }, closest: function (e, t) {
            for (var n, i = 0, r = this.length, a = [], o = ce.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; r > i; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                a.push(n);
                break
            }
            return this.pushStack(a.length > 1 ? re.unique(a) : a)
        }, index: function (e) {
            return e ? "string" == typeof e ? re.inArray(this[0], re(e)) : re.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(re.unique(re.merge(this.get(), re(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), re.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return re.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return re.dir(e, "parentNode", n)
        }, next: function (e) {
            return r(e, "nextSibling")
        }, prev: function (e) {
            return r(e, "previousSibling")
        }, nextAll: function (e) {
            return re.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return re.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return re.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return re.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return re.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return re.sibling(e.firstChild)
        }, contents: function (e) {
            return re.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : re.merge([], e.childNodes)
        }
    }, function (e, t) {
        re.fn[e] = function (n, i) {
            var r = re.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = re.filter(i, r)), this.length > 1 && (ye[e] || (r = re.unique(r)), ve.test(e) && (r = r.reverse())), this.pushStack(r)
        }
    });
    var be = /\S+/g, we = {};
    re.Callbacks = function (e) {
        e = "string" == typeof e ? we[e] || a(e) : re.extend({}, e);
        var t, n, i, r, o, s, l = [], u = !e.once && [], c = function (a) {
            for (n = e.memory && a, i = !0, o = s || 0, s = 0, r = l.length, t = !0; l && r > o; o++)if (l[o].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
        }, d = {
            add: function () {
                if (l) {
                    var i = l.length;
                    !function a(t) {
                        re.each(t, function (t, n) {
                            var i = re.type(n);
                            "function" === i ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && a(n)
                        })
                    }(arguments), t ? r = l.length : n && (s = i, c(n))
                }
                return this
            }, remove: function () {
                return l && re.each(arguments, function (e, n) {
                    for (var i; (i = re.inArray(n, l, i)) > -1;)l.splice(i, 1), t && (r >= i && r--, o >= i && o--)
                }), this
            }, has: function (e) {
                return e ? re.inArray(e, l) > -1 : !(!l || !l.length)
            }, empty: function () {
                return l = [], r = 0, this
            }, disable: function () {
                return l = u = n = void 0, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return u = void 0, n || d.disable(), this
            }, locked: function () {
                return !u
            }, fireWith: function (e, n) {
                return !l || i && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!i
            }
        };
        return d
    }, re.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", re.Callbacks("once memory"), "resolved"], ["reject", "fail", re.Callbacks("once memory"), "rejected"], ["notify", "progress", re.Callbacks("memory")]], n = "pending", i = {
                state: function () {
                    return n
                }, always: function () {
                    return r.done(arguments).fail(arguments), this
                }, then: function () {
                    var e = arguments;
                    return re.Deferred(function (n) {
                        re.each(t, function (t, a) {
                            var o = re.isFunction(e[t]) && e[t];
                            r[a[1]](function () {
                                var e = o && o.apply(this, arguments);
                                e && re.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === i ? n.promise() : this, o ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? re.extend(e, i) : i
                }
            }, r = {};
            return i.pipe = i.then, re.each(t, function (e, a) {
                var o = a[2], s = a[3];
                i[a[1]] = o.add, s && o.add(function () {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), r[a[0]] = function () {
                    return r[a[0] + "With"](this === r ? i : this, arguments), this
                }, r[a[0] + "With"] = o.fireWith
            }), i.promise(r), e && e.call(r, r), r
        }, when: function (e) {
            var t, n, i, r = 0, a = J.call(arguments), o = a.length, s = 1 !== o || e && re.isFunction(e.promise) ? o : 0, l = 1 === s ? e : re.Deferred(), u = function (e, n, i) {
                return function (r) {
                    n[e] = this, i[e] = arguments.length > 1 ? J.call(arguments) : r, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                }
            };
            if (o > 1)for (t = new Array(o), n = new Array(o), i = new Array(o); o > r; r++)a[r] && re.isFunction(a[r].promise) ? a[r].promise().done(u(r, i, a)).fail(l.reject).progress(u(r, n, t)) : --s;
            return s || l.resolveWith(i, a), l.promise()
        }
    });
    var xe;
    re.fn.ready = function (e) {
        return re.ready.promise().done(e), this
    }, re.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? re.readyWait++ : re.ready(!0)
        }, ready: function (e) {
            if (e === !0 ? !--re.readyWait : !re.isReady) {
                if (!pe.body)return setTimeout(re.ready);
                re.isReady = !0, e !== !0 && --re.readyWait > 0 || (xe.resolveWith(pe, [re]), re.fn.triggerHandler && (re(pe).triggerHandler("ready"), re(pe).off("ready")))
            }
        }
    }), re.ready.promise = function (t) {
        if (!xe)if (xe = re.Deferred(), "complete" === pe.readyState)setTimeout(re.ready); else if (pe.addEventListener)pe.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
            pe.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && pe.documentElement
            } catch (i) {
            }
            n && n.doScroll && !function r() {
                if (!re.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(r, 50)
                    }
                    o(), re.ready()
                }
            }()
        }
        return xe.promise(t)
    };
    var ke, Te = "undefined";
    for (ke in re(ne))break;
    ne.ownLast = "0" !== ke, ne.inlineBlockNeedsLayout = !1, re(function () {
        var e, t, n, i;
        n = pe.getElementsByTagName("body")[0], n && n.style && (t = pe.createElement("div"), i = pe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== Te && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
    }), function () {
        var e = pe.createElement("div");
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                ne.deleteExpando = !1
            }
        }
        e = null
    }(), re.acceptData = function (e) {
        var t = re.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var Ce = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, De = /([A-Z])/g;
    re.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando], !!e && !u(e)
        },
        data: function (e, t, n) {
            return c(e, t, n)
        },
        removeData: function (e, t) {
            return d(e, t)
        },
        _data: function (e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return d(e, t, !0)
        }
    }), re.fn.extend({
        data: function (e, t) {
            var n, i, r, a = this[0], o = a && a.attributes;
            if (void 0 === e) {
                if (this.length && (r = re.data(a), 1 === a.nodeType && !re._data(a, "parsedAttrs"))) {
                    for (n = o.length; n--;)o[n] && (i = o[n].name, 0 === i.indexOf("data-") && (i = re.camelCase(i.slice(5)), l(a, i, r[i])));
                    re._data(a, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function () {
                re.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                re.data(this, e, t)
            }) : a ? l(a, e, re.data(a, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                re.removeData(this, e)
            })
        }
    }), re.extend({
        queue: function (e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = re._data(e, t), n && (!i || re.isArray(n) ? i = re._data(e, t, re.makeArray(n)) : i.push(n)), i || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = re.queue(e, t), i = n.length, r = n.shift(), a = re._queueHooks(e, t), o = function () {
                re.dequeue(e, t)
            };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete a.stop, r.call(e, o, a)), !i && a && a.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return re._data(e, n) || re._data(e, n, {
                    empty: re.Callbacks("once memory").add(function () {
                        re._removeData(e, t + "queue"), re._removeData(e, n)
                    })
                })
        }
    }), re.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = re.queue(this, e, t);
                re._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                re.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, i = 1, r = re.Deferred(), a = this, o = this.length, s = function () {
                --i || r.resolveWith(a, [a])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;)n = re._data(a[o], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
            return s(), r.promise(t)
        }
    });
    var je = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, _e = ["Top", "Right", "Bottom", "Left"], Me = function (e, t) {
        return e = t || e, "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
    }, Ne = re.access = function (e, t, n, i, r, a, o) {
        var s = 0, l = e.length, u = null == n;
        if ("object" === re.type(n)) {
            r = !0;
            for (s in n)re.access(e, t, s, n[s], !0, a, o)
        } else if (void 0 !== i && (r = !0, re.isFunction(i) || (o = !0), u && (o ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                return u.call(re(e), n)
            })), t))for (; l > s; s++)t(e[s], n, o ? i : i.call(e[s], s, t(e[s], n)));
        return r ? e : u ? t.call(e) : l ? t(e[0], n) : a
    }, Se = /^(?:checkbox|radio)$/i;
    !function () {
        var e = pe.createElement("input"), t = pe.createElement("div"), n = pe.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== pe.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                ne.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (i) {
                ne.deleteExpando = !1
            }
        }
    }(), function () {
        var t, n, i = pe.createElement("div");
        for (t in{
            submit: !0,
            change: !0,
            focusin: !0
        })n = "on" + t, (ne[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ne[t + "Bubbles"] = i.attributes[n].expando === !1);
        i = null
    }();
    var Fe = /^(?:input|select|textarea)$/i, Ee = /^key/, $e = /^(?:mouse|pointer|contextmenu)|click/, Ae = /^(?:focusinfocus|focusoutblur)$/, Le = /^([^.]*)(?:\.(.+)|)$/;
    re.event = {
        global: {},
        add: function (e, t, n, i, r) {
            var a, o, s, l, u, c, d, h, f, p, m, g = re._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, r = l.selector), n.guid || (n.guid = re.guid++), (o = g.events) || (o = g.events = {}), (c = g.handle) || (c = g.handle = function (e) {
                    return typeof re === Te || e && re.event.triggered === e.type ? void 0 : re.event.dispatch.apply(c.elem, arguments)
                }, c.elem = e), t = (t || "").match(be) || [""], s = t.length; s--;)a = Le.exec(t[s]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f && (u = re.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = re.event.special[f] || {}, d = re.extend({
                    type: f,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && re.expr.match.needsContext.test(r),
                    namespace: p.join(".")
                }, l), (h = o[f]) || (h = o[f] = [], h.delegateCount = 0, u.setup && u.setup.call(e, i, p, c) !== !1 || (e.addEventListener ? e.addEventListener(f, c, !1) : e.attachEvent && e.attachEvent("on" + f, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, d) : h.push(d), re.event.global[f] = !0);
                e = null
            }
        },
        remove: function (e, t, n, i, r) {
            var a, o, s, l, u, c, d, h, f, p, m, g = re.hasData(e) && re._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(be) || [""], u = t.length; u--;)if (s = Le.exec(t[u]) || [], f = m = s[1], p = (s[2] || "").split(".").sort(), f) {
                    for (d = re.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, h = c[f] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = a = h.length; a--;)o = h[a], !r && m !== o.origType || n && n.guid !== o.guid || s && !s.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (h.splice(a, 1), o.selector && h.delegateCount--, d.remove && d.remove.call(e, o));
                    l && !h.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || re.removeEvent(e, f, g.handle), delete c[f])
                } else for (f in c)re.event.remove(e, f + t[u], n, i, !0);
                re.isEmptyObject(c) && (delete g.handle, re._removeData(e, "events"))
            }
        },
        trigger: function (t, n, i, r) {
            var a, o, s, l, u, c, d, h = [i || pe], f = te.call(t, "type") ? t.type : t, p = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = i = i || pe, 3 !== i.nodeType && 8 !== i.nodeType && !Ae.test(f + re.event.triggered) && (f.indexOf(".") >= 0 && (p = f.split("."), f = p.shift(), p.sort()), o = f.indexOf(":") < 0 && "on" + f, t = t[re.expando] ? t : new re.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = p.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : re.makeArray(n, [t]), u = re.event.special[f] || {}, r || !u.trigger || u.trigger.apply(i, n) !== !1)) {
                if (!r && !u.noBubble && !re.isWindow(i)) {
                    for (l = u.delegateType || f, Ae.test(l + f) || (s = s.parentNode); s; s = s.parentNode)h.push(s), c = s;
                    c === (i.ownerDocument || pe) && h.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = h[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? l : u.bindType || f, a = (re._data(s, "events") || {})[t.type] && re._data(s, "handle"), a && a.apply(s, n), a = o && s[o], a && a.apply && re.acceptData(s) && (t.result = a.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = f, !r && !t.isDefaultPrevented() && (!u._default || u._default.apply(h.pop(), n) === !1) && re.acceptData(i) && o && i[f] && !re.isWindow(i)) {
                    c = i[o], c && (i[o] = null), re.event.triggered = f;
                    try {
                        i[f]()
                    } catch (m) {
                    }
                    re.event.triggered = void 0, c && (i[o] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = re.event.fix(e);
            var t, n, i, r, a, o = [], s = J.call(arguments), l = (re._data(this, "events") || {})[e.type] || [], u = re.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this,
                !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (o = re.event.handlers.call(this, e, l), t = 0; (r = o[t++]) && !e.isPropagationStopped();)for (e.currentTarget = r.elem, a = 0; (i = r.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((re.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, i, r, a, o = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (r = [], a = 0; s > a; a++)i = t[a], n = i.selector + " ", void 0 === r[n] && (r[n] = i.needsContext ? re(n, this).index(l) >= 0 : re.find(n, this, null, [l]).length), r[n] && r.push(i);
                r.length && o.push({elem: l, handlers: r})
            }
            return s < t.length && o.push({elem: this, handlers: t.slice(s)}), o
        },
        fix: function (e) {
            if (e[re.expando])return e;
            var t, n, i, r = e.type, a = e, o = this.fixHooks[r];
            for (o || (this.fixHooks[r] = o = $e.test(r) ? this.mouseHooks : Ee.test(r) ? this.keyHooks : {}), i = o.props ? this.props.concat(o.props) : this.props, e = new re.Event(a), t = i.length; t--;)n = i[t], e[n] = a[n];
            return e.target || (e.target = a.srcElement || pe), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, a) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, i, r, a = t.button, o = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || pe, r = i.documentElement, n = i.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== p() && this.focus)try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === p() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return re.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return re.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, i) {
            var r = re.extend(new re.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            i ? re.event.trigger(r, null, t) : re.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
        }
    }, re.removeEvent = pe.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var i = "on" + t;
        e.detachEvent && (typeof e[i] === Te && (e[i] = null), e.detachEvent(i, n))
    }, re.Event = function (e, t) {
        return this instanceof re.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? h : f) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), void(this[re.expando] = !0)) : new re.Event(e, t)
    }, re.Event.prototype = {
        isDefaultPrevented: f,
        isPropagationStopped: f,
        isImmediatePropagationStopped: f,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = h, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = h, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = h, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, re.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        re.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, i = this, r = e.relatedTarget, a = e.handleObj;
                return (!r || r !== i && !re.contains(i, r)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ne.submitBubbles || (re.event.special.submit = {
        setup: function () {
            return re.nodeName(this, "form") ? !1 : void re.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = re.nodeName(t, "input") || re.nodeName(t, "button") ? t.form : void 0;
                n && !re._data(n, "submitBubbles") && (re.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), re._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && re.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            return re.nodeName(this, "form") ? !1 : void re.event.remove(this, "._submit")
        }
    }), ne.changeBubbles || (re.event.special.change = {
        setup: function () {
            return Fe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (re.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), re.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), re.event.simulate("change", this, e, !0)
            })), !1) : void re.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Fe.test(t.nodeName) && !re._data(t, "changeBubbles") && (re.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || re.event.simulate("change", this.parentNode, e, !0)
                }), re._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return re.event.remove(this, "._change"), !Fe.test(this.nodeName)
        }
    }), ne.focusinBubbles || re.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            re.event.simulate(t, e.target, re.event.fix(e), !0)
        };
        re.event.special[t] = {
            setup: function () {
                var i = this.ownerDocument || this, r = re._data(i, t);
                r || i.addEventListener(e, n, !0), re._data(i, t, (r || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, r = re._data(i, t) - 1;
                r ? re._data(i, t, r) : (i.removeEventListener(e, n, !0), re._removeData(i, t))
            }
        }
    }), re.fn.extend({
        on: function (e, t, n, i, r) {
            var a, o;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (a in e)this.on(a, t, n, e[a], r);
                return this
            }
            if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1)i = f; else if (!i)return this;
            return 1 === r && (o = i, i = function (e) {
                return re().off(e), o.apply(this, arguments)
            }, i.guid = o.guid || (o.guid = re.guid++)), this.each(function () {
                re.event.add(this, e, i, n, t)
            })
        }, one: function (e, t, n, i) {
            return this.on(e, t, n, i, 1)
        }, off: function (e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj)return i = e.handleObj, re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (r in e)this.off(r, t, e[r]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = f), this.each(function () {
                re.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                re.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? re.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Ue = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Oe = / jQuery\d+="(?:null|\d+)"/g, He = new RegExp("<(?:" + Ue + ")[\\s/>]", "i"), Ie = /^\s+/, Pe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Ve = /<([\w:]+)/, qe = /<tbody/i, Be = /<|&#?\w+;/, Re = /<(?:script|style|link)/i, We = /checked\s*(?:[^=]|=\s*.checked.)/i, ze = /^$|\/(?:java|ecma)script/i, Ye = /^true\/(.*)/, Qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Je = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Xe = m(pe), Ke = Xe.appendChild(pe.createElement("div"));
    Je.optgroup = Je.option, Je.tbody = Je.tfoot = Je.colgroup = Je.caption = Je.thead, Je.th = Je.td, re.extend({
        clone: function (e, t, n) {
            var i, r, a, o, s, l = re.contains(e.ownerDocument, e);
            if (ne.html5Clone || re.isXMLDoc(e) || !He.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (Ke.innerHTML = e.outerHTML, Ke.removeChild(a = Ke.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e)))for (i = g(a), s = g(e), o = 0; null != (r = s[o]); ++o)i[o] && T(r, i[o]);
            if (t)if (n)for (s = s || g(e), i = i || g(a), o = 0; null != (r = s[o]); o++)k(r, i[o]); else k(e, a);
            return i = g(a, "script"), i.length > 0 && x(i, !l && g(e, "script")), i = s = r = null, a
        }, buildFragment: function (e, t, n, i) {
            for (var r, a, o, s, l, u, c, d = e.length, h = m(t), f = [], p = 0; d > p; p++)if (a = e[p], a || 0 === a)if ("object" === re.type(a))re.merge(f, a.nodeType ? [a] : a); else if (Be.test(a)) {
                for (s = s || h.appendChild(t.createElement("div")), l = (Ve.exec(a) || ["", ""])[1].toLowerCase(), c = Je[l] || Je._default, s.innerHTML = c[1] + a.replace(Pe, "<$1></$2>") + c[2], r = c[0]; r--;)s = s.lastChild;
                if (!ne.leadingWhitespace && Ie.test(a) && f.push(t.createTextNode(Ie.exec(a)[0])), !ne.tbody)for (a = "table" !== l || qe.test(a) ? "<table>" !== c[1] || qe.test(a) ? 0 : s : s.firstChild, r = a && a.childNodes.length; r--;)re.nodeName(u = a.childNodes[r], "tbody") && !u.childNodes.length && a.removeChild(u);
                for (re.merge(f, s.childNodes), s.textContent = ""; s.firstChild;)s.removeChild(s.firstChild);
                s = h.lastChild
            } else f.push(t.createTextNode(a));
            for (s && h.removeChild(s), ne.appendChecked || re.grep(g(f, "input"), v), p = 0; a = f[p++];)if ((!i || -1 === re.inArray(a, i)) && (o = re.contains(a.ownerDocument, a), s = g(h.appendChild(a), "script"), o && x(s), n))for (r = 0; a = s[r++];)ze.test(a.type || "") && n.push(a);
            return s = null, h
        }, cleanData: function (e, t) {
            for (var n, i, r, a, o = 0, s = re.expando, l = re.cache, u = ne.deleteExpando, c = re.event.special; null != (n = e[o]); o++)if ((t || re.acceptData(n)) && (r = n[s], a = r && l[r])) {
                if (a.events)for (i in a.events)c[i] ? re.event.remove(n, i) : re.removeEvent(n, i, a.handle);
                l[r] && (delete l[r], u ? delete n[s] : typeof n.removeAttribute !== Te ? n.removeAttribute(s) : n[s] = null, Q.push(r))
            }
        }
    }), re.fn.extend({
        text: function (e) {
            return Ne(this, function (e) {
                return void 0 === e ? re.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pe).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, i = e ? re.filter(e, this) : this, r = 0; null != (n = i[r]); r++)t || 1 !== n.nodeType || re.cleanData(g(n)), n.parentNode && (t && re.contains(n.ownerDocument, n) && x(g(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && re.cleanData(g(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                e.options && re.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return re.clone(this, e, t)
            })
        }, html: function (e) {
            return Ne(this, function (e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Oe, "") : void 0;
                if (!("string" != typeof e || Re.test(e) || !ne.htmlSerialize && He.test(e) || !ne.leadingWhitespace && Ie.test(e) || Je[(Ve.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Pe, "<$1></$2>");
                    try {
                        for (; i > n; n++)t = this[n] || {}, 1 === t.nodeType && (re.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (r) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, re.cleanData(g(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = X.apply([], e);
            var n, i, r, a, o, s, l = 0, u = this.length, c = this, d = u - 1, h = e[0], f = re.isFunction(h);
            if (f || u > 1 && "string" == typeof h && !ne.checkClone && We.test(h))return this.each(function (n) {
                var i = c.eq(n);
                f && (e[0] = h.call(this, n, i.html())), i.domManip(e, t)
            });
            if (u && (s = re.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (a = re.map(g(s, "script"), b), r = a.length; u > l; l++)i = s, l !== d && (i = re.clone(i, !0, !0), r && re.merge(a, g(i, "script"))), t.call(this[l], i, l);
                if (r)for (o = a[a.length - 1].ownerDocument, re.map(a, w), l = 0; r > l; l++)i = a[l], ze.test(i.type || "") && !re._data(i, "globalEval") && re.contains(o, i) && (i.src ? re._evalUrl && re._evalUrl(i.src) : re.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Qe, "")));
                s = n = null
            }
            return this
        }
    }), re.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        re.fn[e] = function (e) {
            for (var n, i = 0, r = [], a = re(e), o = a.length - 1; o >= i; i++)n = i === o ? this : this.clone(!0), re(a[i])[t](n), K.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Ge, Ze = {};
    !function () {
        var e;
        ne.shrinkWrapBlocks = function () {
            if (null != e)return e;
            e = !1;
            var t, n, i;
            return n = pe.getElementsByTagName("body")[0], n && n.style ? (t = pe.createElement("div"), i = pe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== Te && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(pe.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
        }
    }();
    var et, tt, nt = /^margin/, it = new RegExp("^(" + je + ")(?!px)[a-z%]+$", "i"), rt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (et = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    }, tt = function (e, t, n) {
        var i, r, a, o, s = e.style;
        return n = n || et(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== o || re.contains(e.ownerDocument, e) || (o = re.style(e, t)), it.test(o) && nt.test(t) && (i = s.width, r = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = n.width, s.width = i, s.minWidth = r, s.maxWidth = a)), void 0 === o ? o : o + ""
    }) : pe.documentElement.currentStyle && (et = function (e) {
        return e.currentStyle
    }, tt = function (e, t, n) {
        var i, r, a, o, s = e.style;
        return n = n || et(e), o = n ? n[t] : void 0, null == o && s && s[t] && (o = s[t]), it.test(o) && !rt.test(t) && (i = s.left, r = e.runtimeStyle, a = r && r.left, a && (r.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : o, o = s.pixelLeft + "px", s.left = i, a && (r.left = a)), void 0 === o ? o : o + "" || "auto"
    }), !function () {
        function t() {
            var t, n, i, r;
            n = pe.getElementsByTagName("body")[0], n && n.style && (t = pe.createElement("div"), i = pe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a = o = !1, l = !0, e.getComputedStyle && (a = "1%" !== (e.getComputedStyle(t, null) || {}).top, o = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, r = t.appendChild(pe.createElement("div")), r.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", r.style.marginRight = r.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = t.getElementsByTagName("td"), r[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === r[0].offsetHeight, s && (r[0].style.display = "", r[1].style.display = "none", s = 0 === r[0].offsetHeight), n.removeChild(i))
        }

        var n, i, r, a, o, s, l;
        n = pe.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = n.getElementsByTagName("a")[0], (i = r && r.style) && (i.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === i.opacity, ne.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, re.extend(ne, {
            reliableHiddenOffsets: function () {
                return null == s && t(), s
            }, boxSizingReliable: function () {
                return null == o && t(), o
            }, pixelPosition: function () {
                return null == a && t(), a
            }, reliableMarginRight: function () {
                return null == l && t(), l
            }
        }))
    }(), re.swap = function (e, t, n, i) {
        var r, a, o = {};
        for (a in t)o[a] = e.style[a], e.style[a] = t[a];
        r = n.apply(e, i || []);
        for (a in t)e.style[a] = o[a];
        return r
    };
    var at = /alpha\([^)]*\)/i, ot = /opacity\s*=\s*([^)]*)/, st = /^(none|table(?!-c[ea]).+)/, lt = new RegExp("^(" + je + ")(.*)$", "i"), ut = new RegExp("^([+-])=(" + je + ")", "i"), ct = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, dt = {letterSpacing: "0", fontWeight: "400"}, ht = ["Webkit", "O", "Moz", "ms"];
    re.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = tt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": ne.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, a, o, s = re.camelCase(t), l = e.style;
                if (t = re.cssProps[s] || (re.cssProps[s] = _(l, s)), o = re.cssHooks[t] || re.cssHooks[s], void 0 === n)return o && "get"in o && void 0 !== (r = o.get(e, !1, i)) ? r : l[t];
                if (a = typeof n, "string" === a && (r = ut.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(re.css(e, t)), a = "number"), null != n && n === n && ("number" !== a || re.cssNumber[s] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(o && "set"in o && void 0 === (n = o.set(e, n, i)))))try {
                    l[t] = n
                } catch (u) {
                }
            }
        },
        css: function (e, t, n, i) {
            var r, a, o, s = re.camelCase(t);
            return t = re.cssProps[s] || (re.cssProps[s] = _(e.style, s)), o = re.cssHooks[t] || re.cssHooks[s], o && "get"in o && (a = o.get(e, !0, n)), void 0 === a && (a = tt(e, t, i)), "normal" === a && t in dt && (a = dt[t]), "" === n || n ? (r = parseFloat(a), n === !0 || re.isNumeric(r) ? r || 0 : a) : a
        }
    }), re.each(["height", "width"], function (e, t) {
        re.cssHooks[t] = {
            get: function (e, n, i) {
                return n ? st.test(re.css(e, "display")) && 0 === e.offsetWidth ? re.swap(e, ct, function () {
                    return F(e, t, i)
                }) : F(e, t, i) : void 0
            }, set: function (e, n, i) {
                var r = i && et(e);
                return N(e, n, i ? S(e, t, i, ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }), ne.opacity || (re.cssHooks.opacity = {
        get: function (e, t) {
            return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, i = e.currentStyle, r = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", a = i && i.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === re.trim(a.replace(at, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = at.test(a) ? a.replace(at, r) : a + " " + r)
        }
    }), re.cssHooks.marginRight = j(ne.reliableMarginRight, function (e, t) {
        return t ? re.swap(e, {display: "inline-block"}, tt, [e, "marginRight"]) : void 0
    }), re.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        re.cssHooks[e + t] = {
            expand: function (n) {
                for (var i = 0, r = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)r[e + _e[i] + t] = a[i] || a[i - 2] || a[0];
                return r
            }
        }, nt.test(e) || (re.cssHooks[e + t].set = N)
    }), re.fn.extend({
        css: function (e, t) {
            return Ne(this, function (e, t, n) {
                var i, r, a = {}, o = 0;
                if (re.isArray(t)) {
                    for (i = et(e), r = t.length; r > o; o++)a[t[o]] = re.css(e, t[o], !1, i);
                    return a
                }
                return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return M(this, !0)
        }, hide: function () {
            return M(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Me(this) ? re(this).show() : re(this).hide()
            })
        }
    }), re.Tween = E, E.prototype = {
        constructor: E, init: function (e, t, n, i, r, a) {
            this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = a || (re.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = E.propHooks[this.prop];
            return e && e.get ? e.get(this) : E.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = E.propHooks[this.prop];
            return this.pos = t = this.options.duration ? re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : E.propHooks._default.set(this), this
        }
    }, E.prototype.init.prototype = E.prototype, E.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                re.fx.step[e.prop] ? re.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop]) ? re.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, E.propHooks.scrollTop = E.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, re.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, re.fx = E.prototype.init, re.fx.step = {};
    var ft, pt, mt = /^(?:toggle|show|hide)$/, gt = new RegExp("^(?:([+-])=|)(" + je + ")([a-z%]*)$", "i"), vt = /queueHooks$/, yt = [U], bt = {
        "*": [function (e, t) {
            var n = this.createTween(e, t), i = n.cur(), r = gt.exec(t), a = r && r[3] || (re.cssNumber[e] ? "" : "px"), o = (re.cssNumber[e] || "px" !== a && +i) && gt.exec(re.css(n.elem, e)), s = 1, l = 20;
            if (o && o[3] !== a) {
                a = a || o[3], r = r || [], o = +i || 1;
                do s = s || ".5", o /= s, re.style(n.elem, e, o + a); while (s !== (s = n.cur() / i) && 1 !== s && --l)
            }
            return r && (o = n.start = +o || +i || 0, n.unit = a, n.end = r[1] ? o + (r[1] + 1) * r[2] : +r[2]), n
        }]
    };
    re.Animation = re.extend(H, {
        tweener: function (e, t) {
            re.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, i = 0, r = e.length; r > i; i++)n = e[i], bt[n] = bt[n] || [], bt[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? yt.unshift(e) : yt.push(e)
        }
    }), re.speed = function (e, t, n) {
        var i = e && "object" == typeof e ? re.extend({}, e) : {
            complete: n || !n && t || re.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !re.isFunction(t) && t
        };
        return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            re.isFunction(i.old) && i.old.call(this), i.queue && re.dequeue(this, i.queue)
        }, i
    }, re.fn.extend({
        fadeTo: function (e, t, n, i) {
            return this.filter(Me).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
        }, animate: function (e, t, n, i) {
            var r = re.isEmptyObject(e), a = re.speed(t, n, i), o = function () {
                var t = H(this, re.extend({}, e), a);
                (r || re._data(this, "finish")) && t.stop(!0)
            };
            return o.finish = o, r || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
        }, stop: function (e, t, n) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, r = null != e && e + "queueHooks", a = re.timers, o = re._data(this);
                if (r)o[r] && o[r].stop && i(o[r]); else for (r in o)o[r] && o[r].stop && vt.test(r) && i(o[r]);
                for (r = a.length; r--;)a[r].elem !== this || null != e && a[r].queue !== e || (a[r].anim.stop(n), t = !1, a.splice(r, 1));
                (t || !n) && re.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = re._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], a = re.timers, o = i ? i.length : 0;
                for (n.finish = !0, re.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = a.length; t--;)a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                for (t = 0; o > t; t++)i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), re.each(["toggle", "show", "hide"], function (e, t) {
        var n = re.fn[t];
        re.fn[t] = function (e, i, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, i, r)
        }
    }), re.each({
        slideDown: A("show"),
        slideUp: A("hide"),
        slideToggle: A("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        re.fn[e] = function (e, n, i) {
            return this.animate(t, e, n, i)
        }
    }), re.timers = [], re.fx.tick = function () {
        var e, t = re.timers, n = 0;
        for (ft = re.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || re.fx.stop(), ft = void 0
    }, re.fx.timer = function (e) {
        re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
    }, re.fx.interval = 13, re.fx.start = function () {
        pt || (pt = setInterval(re.fx.tick, re.fx.interval))
    }, re.fx.stop = function () {
        clearInterval(pt), pt = null
    }, re.fx.speeds = {slow: 600, fast: 200, _default: 400}, re.fn.delay = function (e, t) {
        return e = re.fx ? re.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var i = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(i)
            }
        })
    }, function () {
        var e, t, n, i, r;
        t = pe.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], n = pe.createElement("select"), r = n.appendChild(pe.createElement("option")), e = t.getElementsByTagName("input")[0], i.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(i.getAttribute("style")), ne.hrefNormalized = "/a" === i.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = r.selected, ne.enctype = !!pe.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !r.disabled, e = pe.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
    }();
    var wt = /\r/g;
    re.fn.extend({
        val: function (e) {
            var t, n, i, r = this[0];
            return arguments.length ? (i = re.isFunction(e), this.each(function (n) {
                var r;
                1 === this.nodeType && (r = i ? e.call(this, n, re(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : re.isArray(r) && (r = re.map(r, function (e) {
                    return null == e ? "" : e + ""
                })), t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, r, "value") || (this.value = r))
            })) : r ? (t = re.valHooks[r.type] || re.valHooks[r.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(wt, "") : null == n ? "" : n)) : void 0
        }
    }), re.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = re.find.attr(e, "value");
                    return null != t ? t : re.trim(re.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, a = "select-one" === e.type || 0 > r, o = a ? null : [], s = a ? r + 1 : i.length, l = 0 > r ? s : a ? r : 0; s > l; l++)if (n = i[l], !(!n.selected && l !== r || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && re.nodeName(n.parentNode, "optgroup"))) {
                        if (t = re(n).val(), a)return t;
                        o.push(t)
                    }
                    return o
                }, set: function (e, t) {
                    for (var n, i, r = e.options, a = re.makeArray(t), o = r.length; o--;)if (i = r[o], re.inArray(re.valHooks.option.get(i), a) >= 0)try {
                        i.selected = n = !0
                    } catch (s) {
                        i.scrollHeight
                    } else i.selected = !1;
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), re.each(["radio", "checkbox"], function () {
        re.valHooks[this] = {
            set: function (e, t) {
                return re.isArray(t) ? e.checked = re.inArray(re(e).val(), t) >= 0 : void 0
            }
        }, ne.checkOn || (re.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var xt, kt, Tt = re.expr.attrHandle, Ct = /^(?:checked|selected)$/i, Dt = ne.getSetAttribute, jt = ne.input;
    re.fn.extend({
        attr: function (e, t) {
            return Ne(this, re.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                re.removeAttr(this, e)
            })
        }
    }), re.extend({
        attr: function (e, t, n) {
            var i, r, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? typeof e.getAttribute === Te ? re.prop(e, t, n) : (1 === a && re.isXMLDoc(e) || (t = t.toLowerCase(), i = re.attrHooks[t] || (re.expr.match.bool.test(t) ? kt : xt)), void 0 === n ? i && "get"in i && null !== (r = i.get(e, t)) ? r : (r = re.find.attr(e, t), null == r ? void 0 : r) : null !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : void re.removeAttr(e, t)) : void 0
        }, removeAttr: function (e, t) {
            var n, i, r = 0, a = t && t.match(be);
            if (a && 1 === e.nodeType)for (; n = a[r++];)i = re.propFix[n] || n, re.expr.match.bool.test(n) ? jt && Dt || !Ct.test(n) ? e[i] = !1 : e[re.camelCase("default-" + n)] = e[i] = !1 : re.attr(e, n, ""), e.removeAttribute(Dt ? n : i)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ne.radioValue && "radio" === t && re.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), kt = {
        set: function (e, t, n) {
            return t === !1 ? re.removeAttr(e, n) : jt && Dt || !Ct.test(n) ? e.setAttribute(!Dt && re.propFix[n] || n, n) : e[re.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = Tt[t] || re.find.attr;
        Tt[t] = jt && Dt || !Ct.test(t) ? function (e, t, i) {
            var r, a;
            return i || (a = Tt[t], Tt[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, Tt[t] = a), r
        } : function (e, t, n) {
            return n ? void 0 : e[re.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), jt && Dt || (re.attrHooks.value = {
        set: function (e, t, n) {
            return re.nodeName(e, "input") ? void(e.defaultValue = t) : xt && xt.set(e, t, n)
        }
    }), Dt || (xt = {
        set: function (e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Tt.id = Tt.name = Tt.coords = function (e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }, re.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        }, set: xt.set
    }, re.attrHooks.contenteditable = {
        set: function (e, t, n) {
            xt.set(e, "" === t ? !1 : t, n)
        }
    }, re.each(["width", "height"], function (e, t) {
        re.attrHooks[t] = {
            set: function (e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), ne.style || (re.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var _t = /^(?:input|select|textarea|button|object)$/i, Mt = /^(?:a|area)$/i;
    re.fn.extend({
        prop: function (e, t) {
            return Ne(this, re.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = re.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {
                }
            })
        }
    }), re.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var i, r, a, o = e.nodeType;
            return e && 3 !== o && 8 !== o && 2 !== o ? (a = 1 !== o || !re.isXMLDoc(e), a && (t = re.propFix[t] || t, r = re.propHooks[t]), void 0 !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get"in r && null !== (i = r.get(e, t)) ? i : e[t]) : void 0
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = re.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : _t.test(e.nodeName) || Mt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), ne.hrefNormalized || re.each(["href", "src"], function (e, t) {
        re.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ne.optSelected || (re.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        re.propFix[this.toLowerCase()] = this
    }), ne.enctype || (re.propFix.enctype = "encoding");
    var Nt = /[\t\r\n\f]/g;
    re.fn.extend({
        addClass: function (e) {
            var t, n, i, r, a, o, s = 0, l = this.length, u = "string" == typeof e && e;
            if (re.isFunction(e))return this.each(function (t) {
                re(this).addClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(be) || []; l > s; s++)if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nt, " ") : " ")) {
                for (a = 0; r = t[a++];)i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                o = re.trim(i), n.className !== o && (n.className = o)
            }
            return this
        }, removeClass: function (e) {
            var t, n, i, r, a, o, s = 0, l = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (re.isFunction(e))return this.each(function (t) {
                re(this).removeClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(be) || []; l > s; s++)if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nt, " ") : "")) {
                for (a = 0; r = t[a++];)for (; i.indexOf(" " + r + " ") >= 0;)i = i.replace(" " + r + " ", " ");
                o = e ? re.trim(i) : "", n.className !== o && (n.className = o)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(re.isFunction(e) ? function (n) {
                re(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n)for (var t, i = 0, r = re(this), a = e.match(be) || []; t = a[i++];)r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else(n === Te || "boolean" === n) && (this.className && re._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : re._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Nt, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    }), re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        re.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), re.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, i) {
            return this.on(t, e, n, i)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var St = re.now(), Ft = /\?/, Et = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    re.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
        var n, i = null, r = re.trim(t + "");
        return r && !re.trim(r.replace(Et, function (e, t, r, a) {
            return n && t && (i = 0), 0 === i ? e : (n = r || t, i += !a - !r, "")
        })) ? Function("return " + r)() : re.error("Invalid JSON: " + t)
    }, re.parseXML = function (t) {
        var n, i;
        if (!t || "string" != typeof t)return null;
        try {
            e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (r) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), n
    };
    var $t, At, Lt = /#.*$/, Ut = /([?&])_=[^&]*/, Ot = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, It = /^(?:GET|HEAD)$/, Pt = /^\/\//, Vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, qt = {}, Bt = {}, Rt = "*/".concat("*");
    try {
        At = location.href
    } catch (Wt) {
        At = pe.createElement("a"), At.href = "", At = At.href
    }
    $t = Vt.exec(At.toLowerCase()) || [], re.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: At,
            type: "GET",
            isLocal: Ht.test($t[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Rt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": re.parseJSON, "text xml": re.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? V(V(e, re.ajaxSettings), t) : V(re.ajaxSettings, e)
        },
        ajaxPrefilter: I(qt),
        ajaxTransport: I(Bt),
        ajax: function (e, t) {
            function n(e, t, n, i) {
                var r, c, v, y, w, k = t;
                2 !== b && (b = 2, s && clearTimeout(s), u = void 0, o = i || "", x.readyState = e > 0 ? 4 : 0, r = e >= 200 && 300 > e || 304 === e, n && (y = q(d, x, n)), y = B(d, y, x, r), r ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (re.lastModified[a] = w), w = x.getResponseHeader("etag"), w && (re.etag[a] = w)), 204 === e || "HEAD" === d.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = y.state, c = y.data, v = y.error, r = !v)) : (v = k, (e || !k) && (k = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || k) + "", r ? p.resolveWith(h, [c, k, x]) : p.rejectWith(h, [x, k, v]), x.statusCode(g), g = void 0, l && f.trigger(r ? "ajaxSuccess" : "ajaxError", [x, d, r ? c : v]), m.fireWith(h, [x, k]), l && (f.trigger("ajaxComplete", [x, d]), --re.active || re.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var i, r, a, o, s, l, u, c, d = re.ajaxSetup({}, t), h = d.context || d, f = d.context && (h.nodeType || h.jquery) ? re(h) : re.event, p = re.Deferred(), m = re.Callbacks("once memory"), g = d.statusCode || {}, v = {}, y = {}, b = 0, w = "canceled", x = {
                readyState: 0,
                getResponseHeader: function (e) {
                    var t;
                    if (2 === b) {
                        if (!c)for (c = {}; t = Ot.exec(o);)c[t[1].toLowerCase()] = t[2];
                        t = c[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function () {
                    return 2 === b ? o : null
                },
                setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return b || (e = y[n] = y[n] || e, v[e] = t), this
                },
                overrideMimeType: function (e) {
                    return b || (d.mimeType = e), this
                },
                statusCode: function (e) {
                    var t;
                    if (e)if (2 > b)for (t in e)g[t] = [g[t], e[t]]; else x.always(e[x.status]);
                    return this
                },
                abort: function (e) {
                    var t = e || w;
                    return u && u.abort(t), n(0, t), this
                }
            };
            if (p.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, d.url = ((e || d.url || At) + "").replace(Lt, "").replace(Pt, $t[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = re.trim(d.dataType || "*").toLowerCase().match(be) || [""], null == d.crossDomain && (i = Vt.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === $t[1] && i[2] === $t[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === ($t[3] || ("http:" === $t[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = re.param(d.data, d.traditional)), P(qt, d, t, x), 2 === b)return x;
            l = d.global, l && 0 === re.active++ && re.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !It.test(d.type), a = d.url, d.hasContent || (d.data && (a = d.url += (Ft.test(a) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Ut.test(a) ? a.replace(Ut, "$1_=" + St++) : a + (Ft.test(a) ? "&" : "?") + "_=" + St++)), d.ifModified && (re.lastModified[a] && x.setRequestHeader("If-Modified-Since", re.lastModified[a]), re.etag[a] && x.setRequestHeader("If-None-Match", re.etag[a])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : d.accepts["*"]);
            for (r in d.headers)x.setRequestHeader(r, d.headers[r]);
            if (d.beforeSend && (d.beforeSend.call(h, x, d) === !1 || 2 === b))return x.abort();
            w = "abort";
            for (r in{success: 1, error: 1, complete: 1})x[r](d[r]);
            if (u = P(Bt, d, t, x)) {
                x.readyState = 1, l && f.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                    x.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, u.send(v, n)
                } catch (k) {
                    if (!(2 > b))throw k;
                    n(-1, k)
                }
            } else n(-1, "No Transport");
            return x
        },
        getJSON: function (e, t, n) {
            return re.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return re.get(e, void 0, t, "script")
        }
    }), re.each(["get", "post"], function (e, t) {
        re[t] = function (e, n, i, r) {
            return re.isFunction(n) && (r = r || i, i = n, n = void 0), re.ajax({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            })
        }
    }), re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        re.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), re._evalUrl = function (e) {
        return re.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, re.fn.extend({
        wrapAll: function (e) {
            if (re.isFunction(e))return this.each(function (t) {
                re(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return this.each(re.isFunction(e) ? function (t) {
                re(this).wrapInner(e.call(this, t))
            } : function () {
                var t = re(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = re.isFunction(e);
            return this.each(function (n) {
                re(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
            }).end()
        }
    }), re.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || re.css(e, "display"))
    }, re.expr.filters.visible = function (e) {
        return !re.expr.filters.hidden(e)
    };
    var zt = /%20/g, Yt = /\[\]$/, Qt = /\r?\n/g, Jt = /^(?:submit|button|image|reset|file)$/i, Xt = /^(?:input|select|textarea|keygen)/i;
    re.param = function (e, t) {
        var n, i = [], r = function (e, t) {
            t = re.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e))re.each(e, function () {
            r(this.name, this.value)
        }); else for (n in e)R(n, e[n], t, r);
        return i.join("&").replace(zt, "+")
    }, re.fn.extend({
        serialize: function () {
            return re.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = re.prop(this, "elements");
                return e ? re.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !re(this).is(":disabled") && Xt.test(this.nodeName) && !Jt.test(e) && (this.checked || !Se.test(e))
            }).map(function (e, t) {
                var n = re(this).val();
                return null == n ? null : re.isArray(n) ? re.map(n, function (e) {
                    return {name: t.name, value: e.replace(Qt, "\r\n")}
                }) : {name: t.name, value: n.replace(Qt, "\r\n")}
            }).get()
        }
    }), re.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && W() || z()
    } : W;
    var Kt = 0, Gt = {}, Zt = re.ajaxSettings.xhr();
    e.ActiveXObject && re(e).on("unload", function () {
        for (var e in Gt)Gt[e](void 0, !0)
    }), ne.cors = !!Zt && "withCredentials"in Zt, Zt = ne.ajax = !!Zt, Zt && re.ajaxTransport(function (e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function (n, i) {
                    var r, a = e.xhr(), o = ++Kt;
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (r in e.xhrFields)a[r] = e.xhrFields[r];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (r in n)void 0 !== n[r] && a.setRequestHeader(r, n[r] + "");
                    a.send(e.hasContent && e.data || null), t = function (n, r) {
                        var s, l, u;
                        if (t && (r || 4 === a.readyState))if (delete Gt[o], t = void 0, a.onreadystatechange = re.noop, r)4 !== a.readyState && a.abort(); else {
                            u = {}, s = a.status, "string" == typeof a.responseText && (u.text = a.responseText);
                            try {
                                l = a.statusText
                            } catch (c) {
                                l = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                        }
                        u && i(s, l, u, a.getAllResponseHeaders())
                    }, e.async ? 4 === a.readyState ? setTimeout(t) : a.onreadystatechange = Gt[o] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), re.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return re.globalEval(e), e
            }
        }
    }), re.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), re.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = pe.head || re("head")[0] || pe.documentElement;
            return {
                send: function (i, r) {
                    t = pe.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || r(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var en = [], tn = /(=)\?(?=&|$)|\?\?/;
    re.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = en.pop() || re.expando + "_" + St++;
            return this[e] = !0, e
        }
    }), re.ajaxPrefilter("json jsonp", function (t, n, i) {
        var r, a, o, s = t.jsonp !== !1 && (tn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(tn, "$1" + r) : t.jsonp !== !1 && (t.url += (Ft.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function () {
            return o || re.error(r + " was not called"), o[0]
        }, t.dataTypes[0] = "json", a = e[r], e[r] = function () {
            o = arguments
        }, i.always(function () {
            e[r] = a, t[r] && (t.jsonpCallback = n.jsonpCallback, en.push(r)), o && re.isFunction(a) && a(o[0]), o = a = void 0
        }), "script") : void 0
    }), re.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || pe;
        var i = de.exec(e), r = !n && [];
        return i ? [t.createElement(i[1])] : (i = re.buildFragment([e], t, r), r && r.length && re(r).remove(), re.merge([], i.childNodes))
    };
    var nn = re.fn.load;
    re.fn.load = function (e, t, n) {
        if ("string" != typeof e && nn)return nn.apply(this, arguments);
        var i, r, a, o = this, s = e.indexOf(" ");
        return s >= 0 && (i = re.trim(e.slice(s, e.length)), e = e.slice(0, s)), re.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (a = "POST"), o.length > 0 && re.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: t
        }).done(function (e) {
            r = arguments, o.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e)
        }).complete(n && function (e, t) {
                o.each(n, r || [e.responseText, t, e])
            }), this
    }, re.expr.filters.animated = function (e) {
        return re.grep(re.timers, function (t) {
            return e === t.elem
        }).length
    };
    var rn = e.document.documentElement;
    re.offset = {
        setOffset: function (e, t, n) {
            var i, r, a, o, s, l, u, c = re.css(e, "position"), d = re(e), h = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), a = re.css(e, "top"), l = re.css(e, "left"), u = ("absolute" === c || "fixed" === c) && re.inArray("auto", [a, l]) > -1, u ? (i = d.position(), o = i.top, r = i.left) : (o = parseFloat(a) || 0, r = parseFloat(l) || 0), re.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (h.top = t.top - s.top + o), null != t.left && (h.left = t.left - s.left + r), "using"in t ? t.using.call(e, h) : d.css(h)
        }
    }, re.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                re.offset.setOffset(this, e, t)
            });
            var t, n, i = {top: 0, left: 0}, r = this[0], a = r && r.ownerDocument;
            return a ? (t = a.documentElement, re.contains(t, r) ? (typeof r.getBoundingClientRect !== Te && (i = r.getBoundingClientRect()), n = Y(a), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i) : void 0
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, i = this[0];
                return "fixed" === re.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (n = e.offset()), n.top += re.css(e[0], "borderTopWidth", !0), n.left += re.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - re.css(i, "marginTop", !0),
                    left: t.left - n.left - re.css(i, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || rn; e && !re.nodeName(e, "html") && "static" === re.css(e, "position");)e = e.offsetParent;
                return e || rn
            })
        }
    }), re.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        re.fn[e] = function (i) {
            return Ne(this, function (e, i, r) {
                var a = Y(e);
                return void 0 === r ? a ? t in a ? a[t] : a.document.documentElement[i] : e[i] : void(a ? a.scrollTo(n ? re(a).scrollLeft() : r, n ? r : re(a).scrollTop()) : e[i] = r)
            }, e, i, arguments.length, null)
        }
    }), re.each(["top", "left"], function (e, t) {
        re.cssHooks[t] = j(ne.pixelPosition, function (e, n) {
            return n ? (n = tt(e, t), it.test(n) ? re(e).position()[t] + "px" : n) : void 0
        })
    }), re.each({Height: "height", Width: "width"}, function (e, t) {
        re.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
            re.fn[i] = function (i, r) {
                var a = arguments.length && (n || "boolean" != typeof i), o = n || (i === !0 || r === !0 ? "margin" : "border");
                return Ne(this, function (t, n, i) {
                    var r;
                    return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? re.css(t, n, o) : re.style(t, n, i, o)
                }, t, a ? i : void 0, a, null)
            }
        })
    }), re.fn.size = function () {
        return this.length
    }, re.fn.andSelf = re.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return re
    });
    var an = e.jQuery, on = e.$;
    return re.noConflict = function (t) {
        return e.$ === re && (e.$ = on), t && e.jQuery === re && (e.jQuery = an), re
    }, typeof t === Te && (e.jQuery = e.$ = re), re
}), function () {
    function e(e) {
        function t(t, n, i, r, a, o) {
            for (; a >= 0 && o > a; a += e) {
                var s = r ? r[a] : a;
                i = n(i, t[s], s, t)
            }
            return i
        }

        return function (n, i, r, a) {
            i = y(i, a, 4);
            var o = !T(n) && v.keys(n), s = (o || n).length, l = e > 0 ? 0 : s - 1;
            return arguments.length < 3 && (r = n[o ? o[l] : l], l += e), t(n, i, r, o, l, s)
        }
    }

    function t(e) {
        return function (t, n, i) {
            n = b(n, i);
            for (var r = null != t && t.length, a = e > 0 ? 0 : r - 1; a >= 0 && r > a; a += e)if (n(t[a], a, t))return a;
            return -1
        }
    }

    function n(e, t) {
        var n = M.length, i = e.constructor, r = v.isFunction(i) && i.prototype || o, a = "constructor";
        for (v.has(e, a) && !v.contains(t, a) && t.push(a); n--;)a = M[n], a in e && e[a] !== r[a] && !v.contains(t, a) && t.push(a)
    }

    var i = this, r = i._, a = Array.prototype, o = Object.prototype, s = Function.prototype, l = a.push, u = a.slice, c = o.toString, d = o.hasOwnProperty, h = Array.isArray, f = Object.keys, p = s.bind, m = Object.create, g = function () {
    }, v = function (e) {
        return e instanceof v ? e : this instanceof v ? void(this._wrapped = e) : new v(e)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = v), exports._ = v) : i._ = v, v.VERSION = "1.8.2";
    var y = function (e, t, n) {
        if (void 0 === t)return e;
        switch (null == n ? 3 : n) {
            case 1:
                return function (n) {
                    return e.call(t, n)
                };
            case 2:
                return function (n, i) {
                    return e.call(t, n, i)
                };
            case 3:
                return function (n, i, r) {
                    return e.call(t, n, i, r)
                };
            case 4:
                return function (n, i, r, a) {
                    return e.call(t, n, i, r, a)
                }
        }
        return function () {
            return e.apply(t, arguments)
        }
    }, b = function (e, t, n) {
        return null == e ? v.identity : v.isFunction(e) ? y(e, t, n) : v.isObject(e) ? v.matcher(e) : v.property(e)
    };
    v.iteratee = function (e, t) {
        return b(e, t, 1 / 0)
    };
    var w = function (e, t) {
        return function (n) {
            var i = arguments.length;
            if (2 > i || null == n)return n;
            for (var r = 1; i > r; r++)for (var a = arguments[r], o = e(a), s = o.length, l = 0; s > l; l++) {
                var u = o[l];
                t && void 0 !== n[u] || (n[u] = a[u])
            }
            return n
        }
    }, x = function (e) {
        if (!v.isObject(e))return {};
        if (m)return m(e);
        g.prototype = e;
        var t = new g;
        return g.prototype = null, t
    }, k = Math.pow(2, 53) - 1, T = function (e) {
        var t = null != e && e.length;
        return "number" == typeof t && t >= 0 && k >= t
    };
    v.each = v.forEach = function (e, t, n) {
        t = y(t, n);
        var i, r;
        if (T(e))for (i = 0, r = e.length; r > i; i++)t(e[i], i, e); else {
            var a = v.keys(e);
            for (i = 0, r = a.length; r > i; i++)t(e[a[i]], a[i], e)
        }
        return e
    }, v.map = v.collect = function (e, t, n) {
        t = b(t, n);
        for (var i = !T(e) && v.keys(e), r = (i || e).length, a = Array(r), o = 0; r > o; o++) {
            var s = i ? i[o] : o;
            a[o] = t(e[s], s, e)
        }
        return a
    }, v.reduce = v.foldl = v.inject = e(1), v.reduceRight = v.foldr = e(-1), v.find = v.detect = function (e, t, n) {
        var i;
        return i = T(e) ? v.findIndex(e, t, n) : v.findKey(e, t, n), void 0 !== i && -1 !== i ? e[i] : void 0
    }, v.filter = v.select = function (e, t, n) {
        var i = [];
        return t = b(t, n), v.each(e, function (e, n, r) {
            t(e, n, r) && i.push(e)
        }), i
    }, v.reject = function (e, t, n) {
        return v.filter(e, v.negate(b(t)), n)
    }, v.every = v.all = function (e, t, n) {
        t = b(t, n);
        for (var i = !T(e) && v.keys(e), r = (i || e).length, a = 0; r > a; a++) {
            var o = i ? i[a] : a;
            if (!t(e[o], o, e))return !1
        }
        return !0
    }, v.some = v.any = function (e, t, n) {
        t = b(t, n);
        for (var i = !T(e) && v.keys(e), r = (i || e).length, a = 0; r > a; a++) {
            var o = i ? i[a] : a;
            if (t(e[o], o, e))return !0
        }
        return !1
    }, v.contains = v.includes = v.include = function (e, t, n) {
        return T(e) || (e = v.values(e)), v.indexOf(e, t, "number" == typeof n && n) >= 0
    }, v.invoke = function (e, t) {
        var n = u.call(arguments, 2), i = v.isFunction(t);
        return v.map(e, function (e) {
            var r = i ? t : e[t];
            return null == r ? r : r.apply(e, n)
        })
    }, v.pluck = function (e, t) {
        return v.map(e, v.property(t))
    }, v.where = function (e, t) {
        return v.filter(e, v.matcher(t))
    }, v.findWhere = function (e, t) {
        return v.find(e, v.matcher(t))
    }, v.max = function (e, t, n) {
        var i, r, a = -(1 / 0), o = -(1 / 0);
        if (null == t && null != e) {
            e = T(e) ? e : v.values(e);
            for (var s = 0, l = e.length; l > s; s++)i = e[s], i > a && (a = i)
        } else t = b(t, n), v.each(e, function (e, n, i) {
            r = t(e, n, i), (r > o || r === -(1 / 0) && a === -(1 / 0)) && (a = e, o = r)
        });
        return a
    }, v.min = function (e, t, n) {
        var i, r, a = 1 / 0, o = 1 / 0;
        if (null == t && null != e) {
            e = T(e) ? e : v.values(e);
            for (var s = 0, l = e.length; l > s; s++)i = e[s], a > i && (a = i)
        } else t = b(t, n), v.each(e, function (e, n, i) {
            r = t(e, n, i), (o > r || r === 1 / 0 && a === 1 / 0) && (a = e, o = r)
        });
        return a
    }, v.shuffle = function (e) {
        for (var t, n = T(e) ? e : v.values(e), i = n.length, r = Array(i), a = 0; i > a; a++)t = v.random(0, a), t !== a && (r[a] = r[t]), r[t] = n[a];
        return r
    }, v.sample = function (e, t, n) {
        return null == t || n ? (T(e) || (e = v.values(e)), e[v.random(e.length - 1)]) : v.shuffle(e).slice(0, Math.max(0, t))
    }, v.sortBy = function (e, t, n) {
        return t = b(t, n), v.pluck(v.map(e, function (e, n, i) {
            return {value: e, index: n, criteria: t(e, n, i)}
        }).sort(function (e, t) {
            var n = e.criteria, i = t.criteria;
            if (n !== i) {
                if (n > i || void 0 === n)return 1;
                if (i > n || void 0 === i)return -1
            }
            return e.index - t.index
        }), "value")
    };
    var C = function (e) {
        return function (t, n, i) {
            var r = {};
            return n = b(n, i), v.each(t, function (i, a) {
                var o = n(i, a, t);
                e(r, i, o)
            }), r
        }
    };
    v.groupBy = C(function (e, t, n) {
        v.has(e, n) ? e[n].push(t) : e[n] = [t]
    }), v.indexBy = C(function (e, t, n) {
        e[n] = t
    }), v.countBy = C(function (e, t, n) {
        v.has(e, n) ? e[n]++ : e[n] = 1
    }), v.toArray = function (e) {
        return e ? v.isArray(e) ? u.call(e) : T(e) ? v.map(e, v.identity) : v.values(e) : []
    }, v.size = function (e) {
        return null == e ? 0 : T(e) ? e.length : v.keys(e).length
    }, v.partition = function (e, t, n) {
        t = b(t, n);
        var i = [], r = [];
        return v.each(e, function (e, n, a) {
            (t(e, n, a) ? i : r).push(e)
        }), [i, r]
    }, v.first = v.head = v.take = function (e, t, n) {
        return null == e ? void 0 : null == t || n ? e[0] : v.initial(e, e.length - t)
    }, v.initial = function (e, t, n) {
        return u.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
    }, v.last = function (e, t, n) {
        return null == e ? void 0 : null == t || n ? e[e.length - 1] : v.rest(e, Math.max(0, e.length - t))
    }, v.rest = v.tail = v.drop = function (e, t, n) {
        return u.call(e, null == t || n ? 1 : t)
    }, v.compact = function (e) {
        return v.filter(e, v.identity)
    };
    var D = function (e, t, n, i) {
        for (var r = [], a = 0, o = i || 0, s = e && e.length; s > o; o++) {
            var l = e[o];
            if (T(l) && (v.isArray(l) || v.isArguments(l))) {
                t || (l = D(l, t, n));
                var u = 0, c = l.length;
                for (r.length += c; c > u;)r[a++] = l[u++]
            } else n || (r[a++] = l)
        }
        return r
    };
    v.flatten = function (e, t) {
        return D(e, t, !1)
    }, v.without = function (e) {
        return v.difference(e, u.call(arguments, 1))
    }, v.uniq = v.unique = function (e, t, n, i) {
        if (null == e)return [];
        v.isBoolean(t) || (i = n, n = t, t = !1), null != n && (n = b(n, i));
        for (var r = [], a = [], o = 0, s = e.length; s > o; o++) {
            var l = e[o], u = n ? n(l, o, e) : l;
            t ? (o && a === u || r.push(l), a = u) : n ? v.contains(a, u) || (a.push(u), r.push(l)) : v.contains(r, l) || r.push(l)
        }
        return r
    }, v.union = function () {
        return v.uniq(D(arguments, !0, !0))
    }, v.intersection = function (e) {
        if (null == e)return [];
        for (var t = [], n = arguments.length, i = 0, r = e.length; r > i; i++) {
            var a = e[i];
            if (!v.contains(t, a)) {
                for (var o = 1; n > o && v.contains(arguments[o], a); o++);
                o === n && t.push(a)
            }
        }
        return t
    }, v.difference = function (e) {
        var t = D(arguments, !0, !0, 1);
        return v.filter(e, function (e) {
            return !v.contains(t, e)
        })
    }, v.zip = function () {
        return v.unzip(arguments)
    }, v.unzip = function (e) {
        for (var t = e && v.max(e, "length").length || 0, n = Array(t), i = 0; t > i; i++)n[i] = v.pluck(e, i);
        return n
    }, v.object = function (e, t) {
        for (var n = {}, i = 0, r = e && e.length; r > i; i++)t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
        return n
    }, v.indexOf = function (e, t, n) {
        var i = 0, r = e && e.length;
        if ("number" == typeof n)i = 0 > n ? Math.max(0, r + n) : n; else if (n && r)return i = v.sortedIndex(e, t), e[i] === t ? i : -1;
        if (t !== t)return v.findIndex(u.call(e, i), v.isNaN);
        for (; r > i; i++)if (e[i] === t)return i;
        return -1
    }, v.lastIndexOf = function (e, t, n) {
        var i = e ? e.length : 0;
        if ("number" == typeof n && (i = 0 > n ? i + n + 1 : Math.min(i, n + 1)), t !== t)return v.findLastIndex(u.call(e, 0, i), v.isNaN);
        for (; --i >= 0;)if (e[i] === t)return i;
        return -1
    }, v.findIndex = t(1), v.findLastIndex = t(-1), v.sortedIndex = function (e, t, n, i) {
        n = b(n, i, 1);
        for (var r = n(t), a = 0, o = e.length; o > a;) {
            var s = Math.floor((a + o) / 2);
            n(e[s]) < r ? a = s + 1 : o = s
        }
        return a
    }, v.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
        for (var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), a = 0; i > a; a++, e += n)r[a] = e;
        return r
    };
    var j = function (e, t, n, i, r) {
        if (!(i instanceof t))return e.apply(n, r);
        var a = x(e.prototype), o = e.apply(a, r);
        return v.isObject(o) ? o : a
    };
    v.bind = function (e, t) {
        if (p && e.bind === p)return p.apply(e, u.call(arguments, 1));
        if (!v.isFunction(e))throw new TypeError("Bind must be called on a function");
        var n = u.call(arguments, 2), i = function () {
            return j(e, i, t, this, n.concat(u.call(arguments)))
        };
        return i
    }, v.partial = function (e) {
        var t = u.call(arguments, 1), n = function () {
            for (var i = 0, r = t.length, a = Array(r), o = 0; r > o; o++)a[o] = t[o] === v ? arguments[i++] : t[o];
            for (; i < arguments.length;)a.push(arguments[i++]);
            return j(e, n, this, this, a)
        };
        return n
    }, v.bindAll = function (e) {
        var t, n, i = arguments.length;
        if (1 >= i)throw new Error("bindAll must be passed function names");
        for (t = 1; i > t; t++)n = arguments[t], e[n] = v.bind(e[n], e);
        return e
    }, v.memoize = function (e, t) {
        var n = function (i) {
            var r = n.cache, a = "" + (t ? t.apply(this, arguments) : i);
            return v.has(r, a) || (r[a] = e.apply(this, arguments)), r[a]
        };
        return n.cache = {}, n
    }, v.delay = function (e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, v.defer = v.partial(v.delay, v, 1), v.throttle = function (e, t, n) {
        var i, r, a, o = null, s = 0;
        n || (n = {});
        var l = function () {
            s = n.leading === !1 ? 0 : v.now(), o = null, a = e.apply(i, r), o || (i = r = null)
        };
        return function () {
            var u = v.now();
            s || n.leading !== !1 || (s = u);
            var c = t - (u - s);
            return i = this, r = arguments, 0 >= c || c > t ? (o && (clearTimeout(o), o = null), s = u, a = e.apply(i, r), o || (i = r = null)) : o || n.trailing === !1 || (o = setTimeout(l, c)), a
        }
    }, v.debounce = function (e, t, n) {
        var i, r, a, o, s, l = function () {
            var u = v.now() - o;
            t > u && u >= 0 ? i = setTimeout(l, t - u) : (i = null, n || (s = e.apply(a, r), i || (a = r = null)))
        };
        return function () {
            a = this, r = arguments, o = v.now();
            var u = n && !i;
            return i || (i = setTimeout(l, t)), u && (s = e.apply(a, r), a = r = null), s
        }
    }, v.wrap = function (e, t) {
        return v.partial(t, e)
    }, v.negate = function (e) {
        return function () {
            return !e.apply(this, arguments)
        }
    }, v.compose = function () {
        var e = arguments, t = e.length - 1;
        return function () {
            for (var n = t, i = e[t].apply(this, arguments); n--;)i = e[n].call(this, i);
            return i
        }
    }, v.after = function (e, t) {
        return function () {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }, v.before = function (e, t) {
        var n;
        return function () {
            return --e > 0 && (n = t.apply(this, arguments)), 1 >= e && (t = null), n
        }
    }, v.once = v.partial(v.before, 2);
    var _ = !{toString: null}.propertyIsEnumerable("toString"), M = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    v.keys = function (e) {
        if (!v.isObject(e))return [];
        if (f)return f(e);
        var t = [];
        for (var i in e)v.has(e, i) && t.push(i);
        return _ && n(e, t), t
    }, v.allKeys = function (e) {
        if (!v.isObject(e))return [];
        var t = [];
        for (var i in e)t.push(i);
        return _ && n(e, t), t
    }, v.values = function (e) {
        for (var t = v.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++)i[r] = e[t[r]];
        return i
    }, v.mapObject = function (e, t, n) {
        t = b(t, n);
        for (var i, r = v.keys(e), a = r.length, o = {}, s = 0; a > s; s++)i = r[s], o[i] = t(e[i], i, e);
        return o
    }, v.pairs = function (e) {
        for (var t = v.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++)i[r] = [t[r], e[t[r]]];
        return i
    }, v.invert = function (e) {
        for (var t = {}, n = v.keys(e), i = 0, r = n.length; r > i; i++)t[e[n[i]]] = n[i];
        return t
    }, v.functions = v.methods = function (e) {
        var t = [];
        for (var n in e)v.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, v.extend = w(v.allKeys), v.extendOwn = v.assign = w(v.keys), v.findKey = function (e, t, n) {
        t = b(t, n);
        for (var i, r = v.keys(e), a = 0, o = r.length; o > a; a++)if (i = r[a], t(e[i], i, e))return i
    }, v.pick = function (e, t, n) {
        var i, r, a = {}, o = e;
        if (null == o)return a;
        v.isFunction(t) ? (r = v.allKeys(o), i = y(t, n)) : (r = D(arguments, !1, !1, 1), i = function (e, t, n) {
            return t in n
        }, o = Object(o));
        for (var s = 0, l = r.length; l > s; s++) {
            var u = r[s], c = o[u];
            i(c, u, o) && (a[u] = c)
        }
        return a
    }, v.omit = function (e, t, n) {
        if (v.isFunction(t))t = v.negate(t); else {
            var i = v.map(D(arguments, !1, !1, 1), String);
            t = function (e, t) {
                return !v.contains(i, t)
            }
        }
        return v.pick(e, t, n)
    }, v.defaults = w(v.allKeys, !0), v.create = function (e, t) {
        var n = x(e);
        return t && v.extendOwn(n, t), n
    }, v.clone = function (e) {
        return v.isObject(e) ? v.isArray(e) ? e.slice() : v.extend({}, e) : e
    }, v.tap = function (e, t) {
        return t(e), e
    }, v.isMatch = function (e, t) {
        var n = v.keys(t), i = n.length;
        if (null == e)return !i;
        for (var r = Object(e), a = 0; i > a; a++) {
            var o = n[a];
            if (t[o] !== r[o] || !(o in r))return !1
        }
        return !0
    };
    var N = function (e, t, n, i) {
        if (e === t)return 0 !== e || 1 / e === 1 / t;
        if (null == e || null == t)return e === t;
        e instanceof v && (e = e._wrapped), t instanceof v && (t = t._wrapped);
        var r = c.call(e);
        if (r !== c.call(t))return !1;
        switch (r) {
            case"[object RegExp]":
            case"[object String]":
                return "" + e == "" + t;
            case"[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
            case"[object Date]":
            case"[object Boolean]":
                return +e === +t
        }
        var a = "[object Array]" === r;
        if (!a) {
            if ("object" != typeof e || "object" != typeof t)return !1;
            var o = e.constructor, s = t.constructor;
            if (o !== s && !(v.isFunction(o) && o instanceof o && v.isFunction(s) && s instanceof s) && "constructor"in e && "constructor"in t)return !1
        }
        n = n || [], i = i || [];
        for (var l = n.length; l--;)if (n[l] === e)return i[l] === t;
        if (n.push(e), i.push(t), a) {
            if (l = e.length, l !== t.length)return !1;
            for (; l--;)if (!N(e[l], t[l], n, i))return !1
        } else {
            var u, d = v.keys(e);
            if (l = d.length, v.keys(t).length !== l)return !1;
            for (; l--;)if (u = d[l], !v.has(t, u) || !N(e[u], t[u], n, i))return !1
        }
        return n.pop(), i.pop(), !0
    };
    v.isEqual = function (e, t) {
        return N(e, t)
    }, v.isEmpty = function (e) {
        return null == e ? !0 : T(e) && (v.isArray(e) || v.isString(e) || v.isArguments(e)) ? 0 === e.length : 0 === v.keys(e).length
    }, v.isElement = function (e) {
        return !(!e || 1 !== e.nodeType)
    }, v.isArray = h || function (e) {
            return "[object Array]" === c.call(e)
        }, v.isObject = function (e) {
        var t = typeof e;
        return "function" === t || "object" === t && !!e
    }, v.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (e) {
        v["is" + e] = function (t) {
            return c.call(t) === "[object " + e + "]"
        }
    }), v.isArguments(arguments) || (v.isArguments = function (e) {
        return v.has(e, "callee")
    }), "function" != typeof/./ && "object" != typeof Int8Array && (v.isFunction = function (e) {
        return "function" == typeof e || !1
    }), v.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, v.isNaN = function (e) {
        return v.isNumber(e) && e !== +e
    }, v.isBoolean = function (e) {
        return e === !0 || e === !1 || "[object Boolean]" === c.call(e)
    }, v.isNull = function (e) {
        return null === e
    }, v.isUndefined = function (e) {
        return void 0 === e
    }, v.has = function (e, t) {
        return null != e && d.call(e, t)
    }, v.noConflict = function () {
        return i._ = r, this
    }, v.identity = function (e) {
        return e
    }, v.constant = function (e) {
        return function () {
            return e
        }
    }, v.noop = function () {
    }, v.property = function (e) {
        return function (t) {
            return null == t ? void 0 : t[e]
        }
    }, v.propertyOf = function (e) {
        return null == e ? function () {
        } : function (t) {
            return e[t]
        }
    }, v.matcher = v.matches = function (e) {
        return e = v.extendOwn({}, e), function (t) {
            return v.isMatch(t, e)
        }
    }, v.times = function (e, t, n) {
        var i = Array(Math.max(0, e));
        t = y(t, n, 1);
        for (var r = 0; e > r; r++)i[r] = t(r);
        return i
    }, v.random = function (e, t) {
        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    }, v.now = Date.now || function () {
            return (new Date).getTime()
        };
    var S = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, F = v.invert(S), E = function (e) {
        var t = function (t) {
            return e[t]
        }, n = "(?:" + v.keys(e).join("|") + ")", i = RegExp(n), r = RegExp(n, "g");
        return function (e) {
            return e = null == e ? "" : "" + e, i.test(e) ? e.replace(r, t) : e
        }
    };
    v.escape = E(S), v.unescape = E(F), v.result = function (e, t, n) {
        var i = null == e ? void 0 : e[t];
        return void 0 === i && (i = n), v.isFunction(i) ? i.call(e) : i
    };
    var $ = 0;
    v.uniqueId = function (e) {
        var t = ++$ + "";
        return e ? e + t : t
    }, v.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var A = /(.)^/, L = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, U = /\\|'|\r|\n|\u2028|\u2029/g, O = function (e) {
        return "\\" + L[e]
    };
    v.template = function (e, t, n) {
        !t && n && (t = n), t = v.defaults({}, t, v.templateSettings);
        var i = RegExp([(t.escape || A).source, (t.interpolate || A).source, (t.evaluate || A).source].join("|") + "|$", "g"), r = 0, a = "__p+='";
        e.replace(i, function (t, n, i, o, s) {
            return a += e.slice(r, s).replace(U, O), r = s + t.length, n ? a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : o && (a += "';\n" + o + "\n__p+='"), t
        }), a += "';\n", t.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", a)
        } catch (s) {
            throw s.source = a, s
        }
        var l = function (e) {
            return o.call(this, e, v)
        }, u = t.variable || "obj";
        return l.source = "function(" + u + "){\n" + a + "}", l
    }, v.chain = function (e) {
        var t = v(e);
        return t._chain = !0, t
    };
    var H = function (e, t) {
        return e._chain ? v(t).chain() : t
    };
    v.mixin = function (e) {
        v.each(v.functions(e), function (t) {
            var n = v[t] = e[t];
            v.prototype[t] = function () {
                var e = [this._wrapped];
                return l.apply(e, arguments), H(this, n.apply(v, e))
            }
        })
    }, v.mixin(v), v.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = a[e];
        v.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], H(this, n)
        }
    }), v.each(["concat", "join", "slice"], function (e) {
        var t = a[e];
        v.prototype[e] = function () {
            return H(this, t.apply(this._wrapped, arguments))
        }
    }), v.prototype.value = function () {
        return this._wrapped
    }, v.prototype.valueOf = v.prototype.toJSON = v.prototype.value, v.prototype.toString = function () {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function () {
        return v
    })
}.call(this), !function () {
    function e(e) {
        return e.replace(b, "").replace(w, ",").replace(x, "").replace(k, "").replace(T, "").split(C)
    }

    function t(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function n(n, i) {
        function r(e) {
            return h += e.split(/\n/).length - 1, c && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), e && (e = y[1] + t(e) + y[2] + "\n"), e
        }

        function a(t) {
            var n = h;
            if (u ? t = u(t, i) : o && (t = t.replace(/\n/g, function () {
                    return h++, "$line=" + h + ";"
                })), 0 === t.indexOf("=")) {
                var r = d && !/^=[=#]/.test(t);
                if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""),
                        r) {
                    var a = t.replace(/\s*\([^\)]+\)/, "");
                    f[a] || /^(include|print)$/.test(a) || (t = "$escape(" + t + ")")
                } else t = "$string(" + t + ")";
                t = y[1] + t + y[2]
            }
            return o && (t = "$line=" + n + ";" + t), v(e(t), function (e) {
                if (e && !m[e]) {
                    var t;
                    t = "print" === e ? w : "include" === e ? x : f[e] ? "$utils." + e : p[e] ? "$helpers." + e : "$data." + e, k += e + "=" + t + ",", m[e] = !0
                }
            }), t + "\n"
        }

        var o = i.debug, s = i.openTag, l = i.closeTag, u = i.parser, c = i.compress, d = i.escape, h = 1, m = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, g = "".trim, y = g ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], b = g ? "$out+=text;return $out;" : "$out.push(text);", w = "function(){var text=''.concat.apply('',arguments);" + b + "}", x = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}", k = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (o ? "$line=0," : ""), T = y[0], C = "return new String(" + y[3] + ");";
        v(n.split(s), function (e) {
            e = e.split(l);
            var t = e[0], n = e[1];
            1 === e.length ? T += r(t) : (T += a(t), n && (T += r(n)))
        });
        var D = k + T + C;
        o && (D = "try{" + D + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var j = new Function("$data", "$filename", D);
            return j.prototype = f, j
        } catch (_) {
            throw _.temp = "function anonymous($data,$filename) {" + D + "}", _
        }
    }

    var i = function (e, t) {
        return "string" == typeof t ? g(t, {filename: e}) : o(e, t)
    };
    i.version = "3.0.0", i.config = function (e, t) {
        r[e] = t
    };
    var r = i.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, a = i.cache = {};
    i.render = function (e, t) {
        return g(e, t)
    };
    var o = i.renderFile = function (e, t) {
        var n = i.get(e) || m({filename: e, name: "Render Error", message: "Template not found"});
        return t ? n(t) : n
    };
    i.get = function (e) {
        var t;
        if (a[e])t = a[e]; else if ("object" == typeof document) {
            var n = document.getElementById(e);
            if (n) {
                var i = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                t = g(i, {filename: e})
            }
        }
        return t
    };
    var s = function (e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? s(e.call(e)) : ""), e
    }, l = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, u = function (e) {
        return l[e]
    }, c = function (e) {
        return s(e).replace(/&(?![\w#]+;)|[<>"']/g, u)
    }, d = Array.isArray || function (e) {
            return "[object Array]" === {}.toString.call(e)
        }, h = function (e, t) {
        var n, i;
        if (d(e))for (n = 0, i = e.length; i > n; n++)t.call(e, e[n], n, e); else for (n in e)t.call(e, e[n], n)
    }, f = i.utils = {$helpers: {}, $include: o, $string: s, $escape: c, $each: h};
    i.helper = function (e, t) {
        p[e] = t
    };
    var p = i.helpers = f.$helpers;
    i.onerror = function (e) {
        var t = "Template Error\n\n";
        for (var n in e)t += "<" + n + ">\n" + e[n] + "\n\n";
        "object" == typeof console && console.error(t)
    };
    var m = function (e) {
        return i.onerror(e), function () {
            return "{Template Error}"
        }
    }, g = i.compile = function (e, t) {
        function i(n) {
            try {
                return new l(n, s) + ""
            } catch (i) {
                return t.debug ? m(i)() : (t.debug = !0, g(e, t)(n))
            }
        }

        t = t || {};
        for (var o in r)void 0 === t[o] && (t[o] = r[o]);
        var s = t.filename;
        try {
            var l = n(e, t)
        } catch (u) {
            return u.filename = s || "anonymous", u.name = "Syntax Error", m(u)
        }
        return i.prototype = l.prototype, i.toString = function () {
            return l.toString()
        }, s && t.cache && (a[s] = i), i
    }, v = f.$each, y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, w = /[^\w$]+/g, x = new RegExp(["\\b" + y.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), k = /^\d[^,]*|,\d[^,]*/g, T = /^,+|,+$/g, C = /^$|,+/;
    r.openTag = "{{", r.closeTag = "}}";
    var D = function (e, t) {
        var n = t.split(":"), i = n.shift(), r = n.join(":") || "";
        return r && (r = ", " + r), "$helpers." + i + "(" + e + r + ")"
    };
    r.parser = function (e) {
        e = e.replace(/^\s/, "");
        var t = e.split(" "), n = t.shift(), r = t.join(" ");
        switch (n) {
            case"if":
                e = "if(" + r + "){";
                break;
            case"else":
                t = "if" === t.shift() ? " if(" + t.join(" ") + ")" : "", e = "}else" + t + "{";
                break;
            case"/if":
                e = "}";
                break;
            case"each":
                var a = t[0] || "$data", o = t[1] || "as", s = t[2] || "$value", l = t[3] || "$index", u = s + "," + l;
                "as" !== o && (a = "[]"), e = "$each(" + a + ",function(" + u + "){";
                break;
            case"/each":
                e = "});";
                break;
            case"echo":
                e = "print(" + r + ");";
                break;
            case"print":
            case"include":
                e = n + "(" + t.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(r)) {
                    var c = !0;
                    0 === e.indexOf("#") && (e = e.substr(1), c = !1);
                    for (var d = 0, h = e.split("|"), f = h.length, p = h[d++]; f > d; d++)p = D(p, h[d]);
                    e = (c ? "=" : "=#") + p
                } else e = i.helpers[n] ? "=#" + n + "(" + t.join(",") + ");" : "=" + e
        }
        return e
    }, "function" == typeof define ? define(function () {
        return i
    }) : "undefined" != typeof exports ? module.exports = i : this.template = i
}(), function (e) {
    var t = "placeholder"in document.createElement("input");
    e.fn.placeholder = function (n) {
        return t ? this : (this.each(function () {
            var t = e(this), i = t.attr("placeholder");
            if (!i)return t;
            n && (t.wrap(e('<div class="placeholder-inp-wrap"></div>')), e('<label class="placeholder-inp-label">' + i + "</label>").insertBefore(t));
            var r = function (e) {
                "" === e.val() ? e.prev().show() : e.prev().hide()
            };
            t.bind("focus blur keydown paste", function () {
                var t = e(this);
                setTimeout(function () {
                    r(t)
                }, 0)
            }).prev().show().click(function () {
                e(this).next().focus()
            })
        }), this)
    }
}(jQuery), function (e) {
    "use strict";
    var t = {
        __topics: {}, on: function (t, n) {
            var i = this;
            i.__topics[t] || (i.__topics[t] = e.Callbacks()), i.__topics[t].add(n)
        }, remove: function (e, t) {
            var n = this;
            n.__topics[e] && (t ? n.__topics[e].remove(t) : n.__topics[e].empty())
        }, trigger: function (e) {
            var t = this;
            if (t.__topics[e]) {
                var n = [].slice.call(arguments, 1);
                t.__topics[e].fire.apply(t, n)
            }
        }
    };
    e.jps = t
}(jQuery), function (e) {
    var t = function (t) {
        var n = this;
        n.__options = {
            width: 560,
            height: null,
            title: "",
            showTitle: !0,
            showFooter: !0,
            cssClass: null,
            showClose: !0,
            message: "你木有事做吗？你真的木有事做吗？缅怀青春吧~",
            isFixed: !0,
            denyEsc: !1,
            modal: !0,
            isAlert: !1,
            isConfirm: !1,
            okText: "确&nbsp;&nbsp;定",
            cancelText: "取&nbsp;&nbsp;消",
            okClass: "gbutton-action",
            okCallback: jQuery.noop,
            cancelCallback: jQuery.noop,
            closeCallback: jQuery.noop
        }, (t.isAlert || t.isConfirm) && (t.width = 360, t.height = 80), e.extend(n.__options, t), n.init()
    };
    t.prototype = {
        init: function () {
            var t = this, n = t.element = t.__getElement();
            this.bindEvent(), i.keepSingle(t), e(document.body).append(n), this.__offset(), this.__dragable(), t.__options.showClose || t.find(".close").hide(), t.show()
        }, __getElement: function () {
            var t = this, n = t.__options, i = n.message, r = ['<div class="mod-dialog">', '<div class="wrapper">', '<div class="header">', '<h3 class="title">', n.title || "", "</h3>", '<a class="close"></a>', "</div>", '<div class="content">', "</div>", "</div>", "</div>"].join(""), a = e(r);
            return n.showFooter && (n.isAlert ? (a.addClass("dialog-alert"), a.find(".wrapper").append('<div class="footer clr"><button class="ok ' + n.okClass + '">' + n.okText + "</button></div>")) : (a.find(".wrapper").append('<div class="footer clr"><button class="cancel">' + n.cancelText + "</button></div>"), a.find(".footer").append('<button class="ok ' + n.okClass + '">' + n.okText + "</button>"), n.isConfirm && n.isConfirm && a.addClass("dialog-confirm"))), "string" == typeof i ? ((n.isAlert || n.isConfirm) && (i = '<div class="dialog-warn"></div><div class="dialog-warn-txt">' + i + "</div>"), a.find(".content").html(i)) : e(i).appendTo(a.find(".content")), n.showFooter || a.find(".footer").remove(), n.showTitle || a.find(".header").remove(), a.css({width: n.width}), null !== n.height && a.find(".content").css({height: n.height}), n.isFixed !== !0 && a.css({position: "absolute"}), n.cssClass && a.addClass(n.cssClass), a
        }, reLocation: function () {
            this.__offset()
        }, __dragable: function () {
            var e = this.element;
            e.draggable && e.draggable({containment: "window", handle: ".header"})
        }, __offset: function () {
            var t = this, n = t.element, i = t.__options.top, r = t.__options.left;
            null == r && (r = (e(window).width() - t.element.outerWidth()) / 2, r = Math.max(0, r)), null == i && (i = (e(window).height() - t.element.outerHeight()) / 2, i = Math.max(0, i)), "fixed" != this.element.css("position") && (r += jQuery(document).scrollLeft(), i += jQuery(document).scrollTop()), n.css({
                left: r,
                top: i
            })
        }, setWidth: function (e) {
            var t = this;
            t.element.css({width: e}), t.__options.width = e, t.__offset()
        }, getHeader: function () {
            return this.find(".wrapper > .header")
        }, getFooter: function () {
            return this.find(".wrapper > .footer")
        }, getMaskLayer: function () {
            return n.getElement()
        }, show: function () {
            var e = this;
            e.__options.modal === !0 && n.show(), e.__offset()
        }, close: function (e) {
            var t = this;
            !e && n.hide();
            var i = t.element;
            i.remove(), t.__options.closeCallback.call(t)
        }, find: function (e) {
            return this.element.find(e)
        }, confirm: function () {
            var e = this;
            e.element.find(".footer .ok").trigger("click")
        }, bindEvent: function () {
            var t = this;
            t.find(".header .close").click(function () {
                return t.close(), !1
            }), t.find(".footer .ok").click(function () {
                return t.__options.okCallback.call(t) !== !1 && t.close(), !1
            }), t.find(".footer .cancel").click(function () {
                return t.__options.cancelCallback.call(t) !== !1 && t.close(), !1
            });
            var n = function () {
                0 === t.element.parent().size() ? jQuery(window).unbind("resize", n) : t.element.is(":visible") && t.__offset()
            };
            e(window).resize(n)
        }
    };
    var n = {
        getElement: function () {
            var t = this;
            return t.element || (t.element = e("#mod-dialog-masklayer"), 0 == t.element.size() && (t.element = e('<div class="mod-dialog-masklayer" />').appendTo(e(document.body)))), t.element
        }, show: function () {
            this.getElement().show()
        }, hide: function () {
            this.getElement().hide()
        }
    }, i = {
        present: null, keepSingle: function (e) {
            this.present instanceof t && (this.present.close(), this.present = null), this.present = e, this.bindEvent()
        }, escCancel: function (e) {
            if (27 == e.keyCode && i.present) {
                var t = i.present;
                t.hide()
            }
        }, bindEvent: function () {
            e(document).keydown(this.escCancel), this.bindEvent = jQuery.noop
        }
    };
    App.common.modules.Dialog = t
}(jQuery), $(function () {
    function e(e, n) {
        var i;
        n ? (n.text = e, i = n) : i = {text: e}, new t(i)
    }

    var t = function (e) {
        this.options = {
            top: 0,
            time: 4e3,
            pattern: null,
            text: "加载中...",
            hold: !1,
            remove: !1,
            callback: jQuery.noop
        }, jQuery.extend(this.options, e);
        var n = this.element = jQuery('<div class="mod-smallnote">' + this.options.text + "</div>");
        n.css({top: this.options.top}), null !== this.options.pattern && n.addClass("smallnote-" + this.options.pattern), t.present && t.present.__remove(), this.options.remove || (t.present = this, $(document.body).append(n), this.__offset(n), this.options.hold || this.__destroyTimer())
    };
    t.prototype = {
        __destroyTimer: function () {
            var e = this;
            setTimeout(function () {
                e.element.fadeOut("slow", function () {
                    e.__remove(), e.options.callback.call(e)
                })
            }, this.options.time)
        }, __remove: function () {
            return this.element && this.element.remove()
        }, __offset: function (e) {
            var t = this.options.top, n = this.options.left;
            null == n && (n = (jQuery(window).width() - this.element.outerWidth()) / 2, n = Math.max(0, n)), null == t && (t = 0), "fixed" != this.element.css("position") && (n += jQuery(document).scrollLeft(), t += jQuery(document).scrollTop()), e.css({
                left: n,
                top: t
            })
        }
    }, App.common.modules.smallnote = e
}), $(function () {
    window.LogUrl = $("#dataCollectUrl").attr("url")
});
var logObj = {}, logFn = {}, JQobj = {};
JQobj.listFilter = $("#listFilter"), JQobj.LineObj = $("#Line"), JQobj.AreaObj = $("#Area"), JQobj.kw = $("[name=kw]"), JQobj.Filter = $("#Filter"), $.jps.on("log", function (e) {
    switch (e.type) {
        case"province":
            logObj.ct = e.id
    }
}), logFn.resetLog = function () {
    var e = logObj.act_k, t = logObj.act_v;
    logObj = {}, AjaxCheckLogin && AjaxCheckLogin.done(function (e) {
        logObj.uid = e.uuid, logObj.usid = e.userId
    }), logObj.ss = screen.width + "*" + screen.height, logObj.bs = $(window).width() + "*" + $(window).height(), logObj.url = decodeURI(window.location.href), logObj.ref = document.referrer ? encodeURI(document.referrer) : void 0, logObj.act_k = e ? e : void 0, logObj.act_v = t ? t : void 0
}, logFn.sendLog = function () {
    LogUrl ? $.ajax({url: LogUrl + "track/user/web.do", data: logObj, dataType: "jsonp"}).always(function () {
        logFn.actLog()
    }) : $(function () {
        window.LogUrl = $("#dataCollectUrl").attr("url"), $.ajax({
            url: LogUrl + "track/user/web.do",
            data: logObj,
            dataType: "jsonp"
        }).always(function () {
            logFn.actLog()
        })
    })
}, logFn.SearchLogT1 = function (e) {
    logFn.resetLog(), logObj.sk = e.find("[name=kw],[name=searchName]").attr("value") || $("[name=kw],[name=searchName]").attr("value"), logObj.clt = void 0, logObj.ck = void 0, logFn.sendLog()
}, logFn.SearchLogT2 = function (e) {
    logFn.resetLog(), logObj.sk = void 0, logObj.clt = "2", logObj.ck = e.text(), logFn.sendLog()
}, logFn.SearchLogT3 = function (e, t) {
    logFn.resetLog(), logObj.sk = t.attr("key"), logObj.clt = "1", logObj.ck = e.text(), logFn.sendLog()
}, logFn.listFilterLog = function () {
    if (JQobj.listFilter.length) {
        var e = Num($("#pSel").find(".act").attr("txt")), t = Num($("#rnSel").find(".act").attr("txt"));
        logObj.ret = e, logObj.bdr = t
    }
    if (JQobj.kw.val() && (logObj.sk = JQobj.kw.val()), $("#rnSel").find(".chked").length > 0) {
        var t = [];
        $("#rnSel").find(".chked").each(function () {
            t.push($(this).index() + 1)
        }), logObj.bdr = t.length > 0 ? t.join(",") : void 0
    } else logObj.bdr = void 0
}, logFn.FilterLog = function () {
    if (JQobj.Filter.length) {
        var e = Num($(".Multi2").first().find(".Dn").find(".cur").attr("val")), t = [];
        $(".Multi").first().find(".Dn").find(".checked").each(function () {
            t.push($(this).index() + 1)
        }), logObj.ret = e, logObj.bdr = t.length > 0 ? t.join(",") : -1
    }
    if (JQobj.Filter.find("select").length) {
        var e = JQobj.Filter.find("select[name=priceId]").val(), t = JQobj.Filter.find("select[name=roomNum]").val();
        logObj.ret = e, logObj.bdr = t
    }
    JQobj.kw.val() && (logObj.sk = JQobj.kw.val())
}, logFn.mapLine_i = function (e) {
    logFn.resetLog(), logObj.sw_st = e.attr("id"), logObj.sw_le = $("#" + logObj.sw_st).parentsUntil("li").parent().attr("id"), sessionStorage.setItem("sw_st", logObj.sw_st), sessionStorage.setItem("sw_le", logObj.sw_le), logFn.listFilterLog(), logFn.FilterLog(), logFn.sendLog()
}, logFn.mapLine_li = function (e) {
    logFn.resetLog(), logObj.sw_le = e.attr("id"), sessionStorage.setItem("sw_st", ""), sessionStorage.setItem("sw_le", logObj.sw_le), logFn.listFilterLog(), logFn.FilterLog(), logFn.sendLog()
}, logFn.mapArea_i = function (e) {
    logFn.resetLog(), logObj.sw_ae = e.attr("id"), logObj.sw_rg = $("#" + logObj.sw_ae).parentsUntil("li").parent().attr("id"), sessionStorage.setItem("sw_ae", logObj.sw_ae), sessionStorage.setItem("sw_rg", logObj.sw_rg), logFn.listFilterLog(), logFn.FilterLog(), logFn.sendLog()
}, logFn.mapArea_li = function (e) {
    logFn.resetLog(), logObj.sw_rg = e.attr("id"), sessionStorage.setItem("sw_ae", ""), sessionStorage.setItem("sw_rg", logObj.sw_rg), logFn.listFilterLog(), logFn.FilterLog(), logFn.sendLog()
}, logFn.pSelCli = function () {
    if (logFn.resetLog(), logFn.listFilterLog(), JQobj.LineObj.find(".set").length) {
        var e = sessionStorage.getItem("sw_st"), t = sessionStorage.getItem("sw_le");
        logObj.sw_st = e ? e : void 0, logObj.sw_le = t ? t : void 0
    } else if (JQobj.AreaObj.find(".set").length) {
        var n = sessionStorage.getItem("sw_ae"), i = sessionStorage.getItem("sw_rg");
        logObj.sw_ae = n ? n : void 0, logObj.sw_rg = i ? i : void 0
    }
    logFn.sendLog()
}, logFn.Filter = function () {
    if (logFn.resetLog(), logFn.FilterLog(), JQobj.LineObj.find(".set").length) {
        var e = sessionStorage.getItem("sw_st"), t = sessionStorage.getItem("sw_le");
        logObj.sw_st = e ? e : void 0, logObj.sw_le = t ? t : void 0
    } else if (JQobj.AreaObj.find(".set").length) {
        var n = sessionStorage.getItem("sw_ae"), i = sessionStorage.getItem("sw_rg");
        logObj.sw_ae = n ? n : void 0, logObj.sw_rg = i ? i : void 0
    }
    logFn.sendLog()
}, logFn.houseLog = function () {
    logFn.resetLog(), logObj.hos = logFn.house_code(), logObj.rem = logFn.house_rem(), logFn.sendLog()
}, logFn.house_code = function () {
    var e = Ks(window.location.pathname), t = e.split("/"), n = t.length;
    return n > 2 ? t[n - 2] : !1
}, JQobj.remObj = $("#sameAreaHouses ol li"), logFn.house_rem = function () {
    var e = $("#sameAreaHouses ol li");
    if (e.length) {
        var t = [];
        return e.each(function (e, n) {
            t.push($(this).attr("data"))
        }), t.join(",")
    }
    return void 0
}, logObj.act_k = void 0, logObj.act_v = void 0, logFn.actLog = function (e, t) {
    2 == arguments.length ? (logObj.act_k = e, logObj.act_v = t) : (logObj.act_k = void 0, logObj.act_v = void 0)
}, logFn.actMoreLog = function () {
    logFn.actLog("21", "more"), logFn.resetLog(), logObj.hos = logFn.house_code(), logFn.sendLog()
}, logFn.actRemLog = function (e) {
    logFn.actLog("22", e), logFn.resetLog(), logObj.hos = logFn.house_code(), logFn.sendLog()
}, JQobj.remObj.on("click", "a", function () {
    if ($(this).parent().is("li[data]")) {
        var e = $(this).parent().attr("data");
        logFn.actRemLog(e)
    } else {
        var e = $(this).parentsUntil("li").parent().attr("data");
        logFn.actRemLog(e)
    }
}), $("#sameAreaHouses .tit a").on("click", function () {
    logFn.actMoreLog()
});
var Url = "/", Cache = "/", VideoClientId = "17f7d65e0b6fe662", loadGif = '<div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div>';
$.ajaxSetup({dataType: "json", type: "get", cache: !1}), Gs("tpa") && $.ajax({
    url: Url + "iwStatistics.action",
    cache: !1,
    data: {tpa: Gs("tpa"), ref: document.referrer}
}), function (e) {
    e.getStyle = function (t, n) {
        var i = e("link");
        i.each(function (n, i) {
            return e(i).attr("href") == t ? !0 : void 0
        }) ? (i = document.createElement("link"), i.setAttribute("rel", "stylesheet"), i.setAttribute("href", t), document.getElementsByTagName("head")[0].insertBefore(i, null), i.onload = function () {
            n instanceof Function && n()
        }) : n instanceof Function && n()
    }, e.DateTime = function (t, n) {
        if (!n) {
            var i = new Date;
            i.setMinutes(0);
            var r = new Date(i);
            r.setDate(r.getDate() + 7), n = {
                format: "yyyy-mm-dd hh:ii",
                autoclose: !0,
                startView: 2,
                minView: 1,
                todayHighlight: !0,
                startDate: i,
                endDate: r,
                initialDate: i
            }
        }
        t ? t.hasClass("DateTime") || (t = t.find(".DateTime")) : t = e(".DateTime"), t.datetimepicker(n)
    }
}(jQuery);
var Browser = new Object;
Browser.userAgent = window.navigator.userAgent.toLowerCase(), Browser.ie = /msie/.test(Browser.userAgent), Browser.Moz = /gecko/.test(Browser.userAgent);
var Fixed;
$(document).ready(function () {
    if (initLoadImg(), Place(), Checkbox(), Radio(), Fixed = $(".Fixed"), Fixed.length && (Fixed.offTop = Fixed.offset().top, Fixed.fixTop = Num(Fixed.attr("top"))), localStorage.getItem("registMobile") && localStorage.getItem("registUserId")) {
        var e = window._mvq || [];
        window._mvq = e, e.push(["$setAccount", "m-80613-0"]), e.push(["$setGeneral", "registered", "", localStorage.getItem("registMobile"), localStorage.getItem("registUserId")]), e.push(["$logConversion"]), localStorage.removeItem("registMobile"), localStorage.removeItem("registUserId")
    }
}).keydown(function (e) {
    var t = e.keyCode;
    if ($(".Mask").length) {
        if (27 == t)return $(".Pop .Close").click(), !1;
        if (9 == t)return !1
    }
    return $(".Alert").length && 13 == t ? ($(".Alert .Btn").click(), !1) : void 0
}), $(function () {
    var e = $(".searchForm"), t = e.find("[name=searchName],[name=kw]"), n = e.find("p.Pa");
    t.bind("focus keyup propertychange", function () {
        var e = $(this);
        showKwBlankMask(e), showKwClose(e)
    }).on("blur", function () {
        hideBlankMask($(this));
        var e = $(this).nextAll(".Close0:visible");
        e.length && setTimeout(function () {
            e.hide()
        }, 200)
    }), $(document).click(function (e) {
        n.is(":visible") && "searchName" != e.target.name && "kw" != e.target.name && n.hide()
    }).keydown(function (e) {
        if (n.is(":visible")) {
            var t = e.keyCode;
            if (27 == t || 13 == t)n.hide(); else if (38 == t || 40 == t) {
                n.act = -1, n.a = n.find("a");
                for (var i = n.a.length - 1; i >= 0; i--)if (n.a.eq(i).hasClass("act")) {
                    n.act = i;
                    break
                }
                38 == t ? n.act <= 0 ? n.act = n.a.length - 1 : n.act-- : 40 == t && (n.act < 0 || n.act >= n.a.length - 1 ? n.act = 0 : n.act++);
                var r = n.a.eq(n.act).attr("title");
                r || (r = n.a.eq(n.act).find("span").text()), n.filter(":visible").parents("form").find("[name=searchName],[name=kw]").val(r);
                var a = new RegExp("(" + r + ")");
                n.a.each(function (e, t) {
                    t.className = "", t = $(t), t.find("span").html(t.find("span").text().replace(a, "<b>$1</b>"))
                }), n.a.eq(n.act).addClass("act")
            }
        }
    }), 0 == n.length && (n = $('<p class="Pa"></p>').prependTo(e)), t.blur(function () {
        setTimeout(function () {
            n.hide()
        }, 200)
    }), t.bind("click focus", function () {
        var e = $(this), t = e.parents("form"), n = Val(e), i = Num(t.attr("ht")), r = Num(t.attr("provinceId")), a = t.find(".Pa");
        if ("" == n) {
            var o = localStorage.getItem("searchHistory" + r + i);
            if (o) {
                var s = "";
                o = o.split(",");
                for (var l = 0; l < o.length; l++)s += '<a href="javascript:"><span>' + Cut(o[l].split("--")[0], 50) + "</span></a>";
                s && a.html(s).show().find("a").click(function () {
                    queryType = 2;
                    var n = $(this).text();
                    e.val(n), e.blur();
                    var o = new RegExp("(" + n + ")", "gi");
                    a.find("a").each(function (e, t) {
                        t.className = "", t = $(t), t.find("span").html(t.find("span").text().replace(o, "<b>$1</b>"))
                    }), $(this).addClass("act"), searchHistory(e.val(), r, i);
                    var s = $("#sellMap").length;
                    s > 0 ? (t.attr("t", queryType), t.submit()) : location = t.attr("action") + "?" + e.attr("name") + "=" + encodeURIComponent(e.val()) + "&t=" + queryType, logFn.SearchLogT2($(this))
                })
            }
        } else"" != a.html() ? a.show() : e.keyup()
    });
    var i = null;
    t.keyup(function (e) {
        i && window.clearTimeout(i);
        var n = $(this);
        i = window.setTimeout(function () {
            var i = n.parents("form"), r = (Val(n), Num(i.attr("ht"))), a = Num(i.attr("provinceId")), o = i.find(".Pa"), s = e.keyCode;
            if (27 != s && 38 != s && 40 != s && 13 != s) {
                var l = Val(n);
                if (l != n.attr("key")) {
                    if (n.attr("key", l), "" == l)return o.html("").hide(), void n.focus();
                    this.Ajax && this.Ajax.abort(), this.Ajax = new $.ajax({
                        url: Url + "getSuggestions.action",
                        cache: !1,
                        data: {provinceId: a, searchName: l},
                        success: function (e) {
                            if (1 == e.status)if (0 == e.data.length)o.html("").hide(); else {
                                o.html("");
                                var s, u, c, d = new RegExp("(" + l + ")", "gi");
                                $(e.data).each(function (e, l) {
                                    l.key && (s = Len(l.key) > 50 ? ' title="' + l.key + '"' : "", u = Cut(l.key, 50), c = l.tip ? "<i>" + Cut(l.tip, 48 - Len(u)) + "</i>" : "", $('<a href="javascript:"' + s + "><span>" + u.replace(d, "<b>$1</b>") + "</span>" + c + "</a>").click(function () {
                                        var e = 3;
                                        n.val(l.key), n.blur();
                                        var s = new RegExp("(" + l.key + ")");
                                        o.find("a").each(function (e, t) {
                                            t.className = "", t = $(t), t.find("span").html(t.find("span").text().replace(s, "<b>$1</b>"))
                                        }), $(this).addClass("act"), searchHistory(n.val(), a, r);
                                        var u = $("#sellMap").length;
                                        u > 0 ? (i.attr("t", e), i.submit()) : location = i.attr("action") + "?" + n.attr("name") + "=" + encodeURIComponent(n.val()) + "&t=" + e, o.hide(), logFn.SearchLogT3($(this), t)
                                    }).appendTo(o))
                                }), o.show()
                            }
                        },
                        error: function () {
                            o.hide()
                        }
                    })
                }
            }
        }, 200)
    }), e.submit(function (n) {
        searchHistory(Val(t.filter(":visible")), Num(e.filter(":visible").attr("provinceId")), Num(e.filter(":visible").attr("ht"))), t.filter(":visible").blur(), logFn.SearchLogT1($(this))
    })
}), function (e) {
    "use strict";
    App.common.modules.iwjw = {
        getUserInfo: function () {
        }
    }, e(document).ajaxError(function (e, t, n, i) {
    }), e(document).ajaxSuccess(function (e, t, n) {
    })
}(jQuery), $(function () {
}), function (e) {
    var t = {
        init: function (e, t) {
            var n = this;
            n.__container = e, n.__options = t, Update(), n.__initProvince()
        }, __initProvince: function () {
            var t = this, n = t.__container, i = n.find("#Province");
            i.size() > 0 && e.ajax({
                url: Url + "getProvinceId.action", success: function (t) {
                    i.parent(".city").removeClass("none"), i.attr({
                        provinceId: t.id,
                        provincePy: t.py
                    }).html(t.text + '<i class="iconfont">&#xe619;</i>'), e.jps.trigger("log", {
                        type: "province",
                        id: t.id
                    })
                }
            })
        }
    };
    App.common.modules.header = t, e(function () {
        t.init(e(".mod-header"), pageConfig), e(".header-city-wrap.wrap-iframe").height(e(".header-city-wrap.wrap-b").height())
    })
}(jQuery);
var agCodes = {
    101: "_atsusr",
    200: "_atscdy",
    201: "_atstmk",
    202: "_atsmka",
    203: "_atskct",
    204: "_atstlj",
    205: "_atsiri",
    206: "_atspjr",
    207: "_atsepi",
    208: "_atsplb"
}, _agt = _agt || [];
!function (e) {
    function t() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    var n = function (t, n) {
        var a = this;
        this.element = e(t), this.language = n.language || this.element.data("date-language") || "zh-CN", this.language = this.language in i ? this.language : "zh-CN", this.isRTL = i[this.language].rtl || !1, this.formatType = n.formatType || this.element.data("format-type") || "standard", this.format = r.parseFormat(n.format || this.element.data("date-format") || i[this.language].format || r.getDefaultFormat(this.formatType, "input"), this.formatType), this.isInline = !1, this.isVisible = !1, this.isInput = this.element.is("input"), this.bootcssVer = this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2, this.component = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar").parent() : !1, this.componentReset = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-remove").parent() : this.element.find(".add-on .icon-remove").parent() : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.linkField = n.linkField || this.element.data("link-field") || !1, this.linkFormat = r.parseFormat(n.linkFormat || this.element.data("link-format") || r.getDefaultFormat(this.formatType, "link"), this.formatType), this.minuteStep = n.minuteStep || this.element.data("minute-step") || 5, this.pickerPosition = n.pickerPosition || this.element.data("picker-position") || "bottom-right", this.showMeridian = n.showMeridian || this.element.data("show-meridian") || !1, this.initialDate = n.initialDate || new Date, this._attachEvents(), this.formatViewType = "datetime", "formatViewType"in n ? this.formatViewType = n.formatViewType : "formatViewType"in this.element.data() && (this.formatViewType = this.element.data("formatViewType")), this.minView = 0, "minView"in n ? this.minView = n.minView : "minView"in this.element.data() && (this.minView = this.element.data("min-view")), this.minView = r.convertViewMode(this.minView), this.maxView = r.modes.length - 1, "maxView"in n ? this.maxView = n.maxView : "maxView"in this.element.data() && (this.maxView = this.element.data("max-view")), this.maxView = r.convertViewMode(this.maxView), this.wheelViewModeNavigation = !1, "wheelViewModeNavigation"in n ? this.wheelViewModeNavigation = n.wheelViewModeNavigation : "wheelViewModeNavigation"in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")), this.wheelViewModeNavigationInverseDirection = !1, "wheelViewModeNavigationInverseDirection"in n ? this.wheelViewModeNavigationInverseDirection = n.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection"in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")), this.wheelViewModeNavigationDelay = 100, "wheelViewModeNavigationDelay"in n ? this.wheelViewModeNavigationDelay = n.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay"in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")), this.startViewMode = 2, "startView"in n ? this.startViewMode = n.startView : "startView"in this.element.data() && (this.startViewMode = this.element.data("start-view")), this.startViewMode = r.convertViewMode(this.startViewMode), this.viewMode = this.startViewMode, this.viewSelect = this.minView, "viewSelect"in n ? this.viewSelect = n.viewSelect : "viewSelect"in this.element.data() && (this.viewSelect = this.element.data("view-select")), this.viewSelect = r.convertViewMode(this.viewSelect), this.forceParse = !0, "forceParse"in n ? this.forceParse = n.forceParse : "dateForceParse"in this.element.data() && (this.forceParse = this.element.data("date-force-parse")), this.picker = e(3 == this.bootcssVer ? r.templateV3 : r.template).appendTo(this.isInline ? this.element : "body").on({
            click: e.proxy(this.click, this),
            mousedown: e.proxy(this.mousedown, this)
        }), this.wheelViewModeNavigation && (e.fn.mousewheel ? this.picker.on({mousewheel: e.proxy(this.mousewheel, this)}) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")), this.picker.addClass(this.isInline ? "datetimepicker-inline" : "datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu"), this.isRTL && (this.picker.addClass("datetimepicker-rtl"), 3 == this.bootcssVer ? this.picker.find(".prev span, .next span").toggleClass("glyphicon-arrow-left glyphicon-arrow-right") : this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), e(document).on("mousedown", function (t) {
            0 === e(t.target).closest(".datetimepicker").length && a.hide()
        }), this.autoclose = !1, "autoclose"in n ? this.autoclose = n.autoclose : "dateAutoclose"in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation"in n ? this.keyboardNavigation = n.keyboardNavigation : "dateKeyboardNavigation"in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.todayBtn = n.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = n.todayHighlight || this.element.data("date-today-highlight") || !1, this.weekStart = (n.weekStart || this.element.data("date-weekstart") || i[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -(1 / 0), this.endDate = 1 / 0, this.daysOfWeekDisabled = [], this.setStartDate(n.startDate || this.element.data("date-startdate")), this.setEndDate(n.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(n.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.isInline && this.show()
    };
    n.prototype = {
        constructor: n, _events: [], _attachEvents: function () {
            this._detachEvents(), this.isInput ? this._events = [[this.element, {
                focus: e.proxy(this.show, this),
                click: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? (this._events = [[this.element.find("input"), {
                focus: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }], [this.component, {click: e.proxy(this.show, this)}]], this.componentReset && this._events.push([this.componentReset, {click: e.proxy(this.reset, this)}])) : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: e.proxy(this.show, this)}]];
            for (var t, n, i = 0; i < this._events.length; i++)t = this._events[i][0], n = this._events[i][1], t.on(n)
        }, _detachEvents: function () {
            for (var e, t, n = 0; n < this._events.length; n++)e = this._events[n][0], t = this._events[n][1], e.off(t);
            this._events = []
        }, show: function (t) {
            this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.forceParse && this.update(), this.place(), e(window).on("resize", e.proxy(this.place, this)), t && (t.stopPropagation(), t.preventDefault()), this.isVisible = !0, this.element.trigger({
                type: "show",
                date: this.date
            })
        }, hide: function (t) {
            this.isVisible && (this.isInline || (this.picker.hide(), e(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || e(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.isVisible = !1, this.element.trigger({
                type: "hide",
                date: this.date
            })))
        }, remove: function () {
            this._detachEvents(), this.picker.remove(), delete this.picker, delete this.element.data().datetimepicker
        }, getDate: function () {
            var e = this.getUTCDate();
            return new Date(e.getTime() + 6e4 * e.getTimezoneOffset())
        }, getUTCDate: function () {
            return this.date
        }, setDate: function (e) {
            this.setUTCDate(new Date(e.getTime() - 6e4 * e.getTimezoneOffset()))
        }, setUTCDate: function (e) {
            e >= this.startDate && e <= this.endDate ? (this.date = e, this.setValue(), this.viewDate = this.date, this.fill()) : this.element.trigger({
                type: "outOfRange",
                date: e,
                startDate: this.startDate,
                endDate: this.endDate
            })
        }, setFormat: function (e) {
            this.format = r.parseFormat(e, this.formatType);
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val() && this.setValue()
        }, setValue: function () {
            var t = this.getFormattedDate();
            this.isInput ? this.element.val(t) : (this.component && this.element.find("input").val(t), this.element.data("date", t)), this.linkField && e("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
        }, getFormattedDate: function (e) {
            return void 0 == e && (e = this.format), r.formatDate(this.date, e, this.language, this.formatType)
        }, setStartDate: function (e) {
            this.startDate = e || -(1 / 0), this.startDate !== -(1 / 0) && (this.startDate = r.parseDate(this.startDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
        }, setEndDate: function (e) {
            this.endDate = e || 1 / 0, this.endDate !== 1 / 0 && (this.endDate = r.parseDate(this.endDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
        }, setDaysOfWeekDisabled: function (t) {
            this.daysOfWeekDisabled = t || [], e.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, function (e) {
                return parseInt(e, 10)
            }), this.update(), this.updateNavArrows()
        }, place: function () {
            if (!this.isInline) {
                var t = 0;
                e("div").each(function () {
                    var n = parseInt(e(this).css("zIndex"), 10);
                    n > t && (t = n)
                });
                var n, i, r, a = t + 10;
                this.component ? (n = this.component.offset(), r = n.left, ("bottom-left" == this.pickerPosition || "top-left" == this.pickerPosition) && (r += this.component.outerWidth() - this.picker.outerWidth())) : (n = this.element.offset(),
                    r = n.left), i = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? n.top - this.picker.outerHeight() : n.top + this.height, this.picker.css({
                    top: i,
                    left: r,
                    zIndex: a
                })
            }
        }, update: function () {
            var e, t = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0]instanceof Date) ? (e = arguments[0], t = !0) : (e = this.element.data("date") || (this.isInput ? this.element.val() : this.element.find("input").val()) || this.initialDate, ("string" == typeof e || e instanceof String) && (e = e.replace(/^\s+|\s+$/g, ""))), e || (e = new Date, t = !1), this.date = r.parseDate(e, this.format, this.language, this.formatType), t && this.setValue(), this.viewDate = new Date(this.date < this.startDate ? this.startDate : this.date > this.endDate ? this.endDate : this.date), this.fill()
        }, fillDow: function () {
            for (var e = this.weekStart, t = "<tr>"; e < this.weekStart + 7;)t += '<th class="dow">' + i[this.language].daysMin[e++ % 7] + "</th>";
            t += "</tr>", this.picker.find(".datetimepicker-days thead").append(t)
        }, fillMonths: function () {
            for (var e = "", t = 0; 12 > t;)e += '<span class="month">' + i[this.language].monthsShort[t++] + "</span>";
            this.picker.find(".datetimepicker-months td").html(e)
        }, fill: function () {
            if (null != this.date && null != this.viewDate) {
                var n = new Date(this.viewDate), a = n.getUTCFullYear(), o = n.getUTCMonth(), s = n.getUTCDate(), l = n.getUTCHours(), u = n.getUTCMinutes(), c = this.startDate !== -(1 / 0) ? this.startDate.getUTCFullYear() : -(1 / 0), d = this.startDate !== -(1 / 0) ? this.startDate.getUTCMonth() : -(1 / 0), h = this.endDate !== 1 / 0 ? this.endDate.getUTCFullYear() : 1 / 0, f = this.endDate !== 1 / 0 ? this.endDate.getUTCMonth() : 1 / 0, p = new t(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()).valueOf(), m = new Date;
                if (this.picker.find(".datetimepicker-days thead th:eq(1)").text(i[this.language].months[o] + " " + a), "time" == this.formatViewType) {
                    var g = l % 12 ? l % 12 : 12, v = (10 > g ? "0" : "") + g, y = (10 > u ? "0" : "") + u, b = i[this.language].meridiem[12 > l ? 0 : 1];
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(v + ":" + y + " " + b.toUpperCase()), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(v + ":" + y + " " + b.toUpperCase())
                } else this.picker.find(".datetimepicker-hours thead th:eq(1)").text(s + " " + i[this.language].months[o] + " " + a), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(s + " " + i[this.language].months[o] + " " + a);
                this.picker.find("tfoot th.today").text(i[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
                var w = t(a, o - 1, 28, 0, 0, 0, 0), x = r.getDaysInMonth(w.getUTCFullYear(), w.getUTCMonth());
                w.setUTCDate(x), w.setUTCDate(x - (w.getUTCDay() - this.weekStart + 7) % 7);
                var k = new Date(w);
                k.setUTCDate(k.getUTCDate() + 42), k = k.valueOf();
                for (var T, C = []; w.valueOf() < k;)w.getUTCDay() == this.weekStart && C.push("<tr>"), T = "", w.getUTCFullYear() < a || w.getUTCFullYear() == a && w.getUTCMonth() < o ? T += " old" : (w.getUTCFullYear() > a || w.getUTCFullYear() == a && w.getUTCMonth() > o) && (T += " new"), this.todayHighlight && w.getUTCFullYear() == m.getFullYear() && w.getUTCMonth() == m.getMonth() && w.getUTCDate() == m.getDate() && (T += " today"), w.valueOf() == p && (T += " active"), (w.valueOf() + 864e5 <= this.startDate || w.valueOf() > this.endDate || -1 !== e.inArray(w.getUTCDay(), this.daysOfWeekDisabled)) && (T += " disabled"), C.push('<td class="day' + T + '">' + w.getUTCDate() + "</td>"), w.getUTCDay() == this.weekEnd && C.push("</tr>"), w.setUTCDate(w.getUTCDate() + 1);
                this.picker.find(".datetimepicker-days tbody").empty().append(C.join("")), C = [];
                for (var D = "", j = "", _ = "", M = 0; 24 > M; M++) {
                    var N = t(a, o, s, M);
                    T = "", N.valueOf() + 36e5 <= this.startDate || N.valueOf() > this.endDate ? T += " disabled" : l == M && (T += " active"), this.showMeridian && 2 == i[this.language].meridiem.length ? (j = 12 > M ? i[this.language].meridiem[0] : i[this.language].meridiem[1], j != _ && ("" != _ && C.push("</fieldset>"), C.push('<fieldset class="hour"><legend>' + j.toUpperCase() + "</legend>")), _ = j, D = M % 12 ? M % 12 : 12, C.push('<span class="hour' + T + " hour_" + (12 > M ? "am" : "pm") + '">' + D + "</span>"), 23 == M && C.push("</fieldset>")) : (D = M + ":00", C.push('<span class="hour' + T + '">' + D + "</span>"))
                }
                this.picker.find(".datetimepicker-hours td").html(C.join("")), C = [], D = "", j = "", _ = "";
                for (var M = 0; 60 > M; M += this.minuteStep) {
                    var N = t(a, o, s, l, M, 0);
                    T = "", N.valueOf() < this.startDate || N.valueOf() > this.endDate ? T += " disabled" : Math.floor(u / this.minuteStep) == Math.floor(M / this.minuteStep) && (T += " active"), this.showMeridian && 2 == i[this.language].meridiem.length ? (j = 12 > l ? i[this.language].meridiem[0] : i[this.language].meridiem[1], j != _ && ("" != _ && C.push("</fieldset>"), C.push('<fieldset class="minute"><legend>' + j.toUpperCase() + "</legend>")), _ = j, D = l % 12 ? l % 12 : 12, C.push('<span class="minute' + T + '">' + D + ":" + (10 > M ? "0" + M : M) + "</span>"), 59 == M && C.push("</fieldset>")) : (D = M + ":00", C.push('<span class="minute' + T + '">' + l + ":" + (10 > M ? "0" + M : M) + "</span>"))
                }
                this.picker.find(".datetimepicker-minutes td").html(C.join(""));
                var S = this.date.getUTCFullYear(), F = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(a).end().find("span").removeClass("active");
                S == a && F.eq(this.date.getUTCMonth()).addClass("active"), (c > a || a > h) && F.addClass("disabled"), a == c && F.slice(0, d).addClass("disabled"), a == h && F.slice(f + 1).addClass("disabled"), C = "", a = 10 * parseInt(a / 10, 10);
                var E = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(a + "-" + (a + 9)).end().find("td");
                a -= 1;
                for (var M = -1; 11 > M; M++)C += '<span class="year' + (-1 == M || 10 == M ? " old" : "") + (S == a ? " active" : "") + (c > a || a > h ? " disabled" : "") + '">' + a + "</span>", a += 1;
                E.html(C), this.place()
            }
        }, updateNavArrows: function () {
            var e = new Date(this.viewDate), t = e.getUTCFullYear(), n = e.getUTCMonth(), i = e.getUTCDate(), r = e.getUTCHours();
            switch (this.viewMode) {
                case 0:
                    this.picker.find(".prev").css(this.startDate !== -(1 / 0) && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() && i <= this.startDate.getUTCDate() && r <= this.startDate.getUTCHours() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() && i >= this.endDate.getUTCDate() && r >= this.endDate.getUTCHours() ? {visibility: "hidden"} : {visibility: "visible"});
                    break;
                case 1:
                    this.picker.find(".prev").css(this.startDate !== -(1 / 0) && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() && i <= this.startDate.getUTCDate() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() && i >= this.endDate.getUTCDate() ? {visibility: "hidden"} : {visibility: "visible"});
                    break;
                case 2:
                    this.picker.find(".prev").css(this.startDate !== -(1 / 0) && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() ? {visibility: "hidden"} : {visibility: "visible"});
                    break;
                case 3:
                case 4:
                    this.picker.find(".prev").css(this.startDate !== -(1 / 0) && t <= this.startDate.getUTCFullYear() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() ? {visibility: "hidden"} : {visibility: "visible"})
            }
        }, mousewheel: function (t) {
            if (t.preventDefault(), t.stopPropagation(), !this.wheelPause) {
                this.wheelPause = !0;
                var n = t.originalEvent, i = n.wheelDelta, r = i > 0 ? 1 : 0 === i ? 0 : -1;
                this.wheelViewModeNavigationInverseDirection && (r = -r), this.showMode(r), setTimeout(e.proxy(function () {
                    this.wheelPause = !1
                }, this), this.wheelViewModeNavigationDelay)
            }
        }, click: function (n) {
            n.stopPropagation(), n.preventDefault();
            var i = e(n.target).closest("span, td, th, legend");
            if (1 == i.length) {
                if (i.is(".disabled"))return void this.element.trigger({
                    type: "outOfRange",
                    date: this.viewDate,
                    startDate: this.startDate,
                    endDate: this.endDate
                });
                switch (i[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (i[0].className) {
                            case"switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                var a = r.modes[this.viewMode].navStep * ("prev" == i[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, a);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, a);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveMonth(this.viewDate, a);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, a)
                                }
                                this.fill();
                                break;
                            case"today":
                                var o = new Date;
                                o = t(o.getFullYear(), o.getMonth(), o.getDate(), o.getHours(), o.getMinutes(), o.getSeconds(), 0), o < this.startDate ? o = this.startDate : o > this.endDate && (o = this.endDate), this.viewMode = this.startViewMode, this.showMode(0), this._setDate(o), this.fill(), this.autoclose && this.hide()
                        }
                        break;
                    case"span":
                        if (!i.is(".disabled")) {
                            var s = this.viewDate.getUTCFullYear(), l = this.viewDate.getUTCMonth(), u = this.viewDate.getUTCDate(), c = this.viewDate.getUTCHours(), d = this.viewDate.getUTCMinutes(), h = this.viewDate.getUTCSeconds();
                            if (i.is(".month") ? (this.viewDate.setUTCDate(1), l = i.parent().find("span").index(i), u = this.viewDate.getUTCDate(), this.viewDate.setUTCMonth(l), this.element.trigger({
                                    type: "changeMonth",
                                    date: this.viewDate
                                }), this.viewSelect >= 3 && this._setDate(t(s, l, u, c, d, h, 0))) : i.is(".year") ? (this.viewDate.setUTCDate(1), s = parseInt(i.text(), 10) || 0, this.viewDate.setUTCFullYear(s), this.element.trigger({
                                    type: "changeYear",
                                    date: this.viewDate
                                }), this.viewSelect >= 4 && this._setDate(t(s, l, u, c, d, h, 0))) : i.is(".hour") ? (c = parseInt(i.text(), 10) || 0, (i.hasClass("hour_am") || i.hasClass("hour_pm")) && (12 == c && i.hasClass("hour_am") ? c = 0 : 12 != c && i.hasClass("hour_pm") && (c += 12)), this.viewDate.setUTCHours(c), this.element.trigger({
                                    type: "changeHour",
                                    date: this.viewDate
                                }), this.viewSelect >= 1 && this._setDate(t(s, l, u, c, d, h, 0))) : i.is(".minute") && (d = parseInt(i.text().substr(i.text().indexOf(":") + 1), 10) || 0, this.viewDate.setUTCMinutes(d), this.element.trigger({
                                    type: "changeMinute",
                                    date: this.viewDate
                                }), this.viewSelect >= 0 && this._setDate(t(s, l, u, c, d, h, 0))), 0 != this.viewMode) {
                                var f = this.viewMode;
                                this.showMode(-1), this.fill(), f == this.viewMode && this.autoclose && this.hide()
                            } else this.fill(), this.autoclose && this.hide()
                        }
                        break;
                    case"td":
                        if (i.is(".day") && !i.is(".disabled")) {
                            var u = parseInt(i.text(), 10) || 1, s = this.viewDate.getUTCFullYear(), l = this.viewDate.getUTCMonth(), c = this.viewDate.getUTCHours(), d = this.viewDate.getUTCMinutes(), h = this.viewDate.getUTCSeconds();
                            i.is(".old") ? 0 === l ? (l = 11, s -= 1) : l -= 1 : i.is(".new") && (11 == l ? (l = 0, s += 1) : l += 1), this.viewDate.setUTCFullYear(s), this.viewDate.setUTCMonth(l, u), this.element.trigger({
                                type: "changeDay",
                                date: this.viewDate
                            }), this.viewSelect >= 2 && this._setDate(t(s, l, u, c, d, h, 0))
                        }
                        var f = this.viewMode;
                        this.showMode(-1), this.fill(), f == this.viewMode && this.autoclose && this.hide()
                }
            }
        }, _setDate: function (e, t) {
            t && "date" != t || (this.date = e), t && "view" != t || (this.viewDate = e), this.fill(), this.setValue();
            var n;
            this.isInput ? n = this.element : this.component && (n = this.element.find("input")), n && (n.change(), this.autoclose && (!t || "date" == t)), this.element.trigger({
                type: "changeDate",
                date: this.date
            })
        }, moveMinute: function (e, t) {
            if (!t)return e;
            var n = new Date(e.valueOf());
            return n.setUTCMinutes(n.getUTCMinutes() + t * this.minuteStep), n
        }, moveHour: function (e, t) {
            if (!t)return e;
            var n = new Date(e.valueOf());
            return n.setUTCHours(n.getUTCHours() + t), n
        }, moveDate: function (e, t) {
            if (!t)return e;
            var n = new Date(e.valueOf());
            return n.setUTCDate(n.getUTCDate() + t), n
        }, moveMonth: function (e, t) {
            if (!t)return e;
            var n, i, r = new Date(e.valueOf()), a = r.getUTCDate(), o = r.getUTCMonth(), s = Math.abs(t);
            if (t = t > 0 ? 1 : -1, 1 == s)i = -1 == t ? function () {
                return r.getUTCMonth() == o
            } : function () {
                return r.getUTCMonth() != n
            }, n = o + t, r.setUTCMonth(n), (0 > n || n > 11) && (n = (n + 12) % 12); else {
                for (var l = 0; s > l; l++)r = this.moveMonth(r, t);
                n = r.getUTCMonth(), r.setUTCDate(a), i = function () {
                    return n != r.getUTCMonth()
                }
            }
            for (; i();)r.setUTCDate(--a), r.setUTCMonth(n);
            return r
        }, moveYear: function (e, t) {
            return this.moveMonth(e, 12 * t)
        }, dateWithinRange: function (e) {
            return e >= this.startDate && e <= this.endDate
        }, keydown: function (e) {
            if (this.picker.is(":not(:visible)"))return void(27 == e.keyCode && this.show());
            var t, n, i, r = !1;
            switch (e.keyCode) {
                case 27:
                    this.hide(), e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation)break;
                    t = 37 == e.keyCode ? -1 : 1, viewMode = this.viewMode, e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1), 4 == viewMode ? (n = this.moveYear(this.date, t), i = this.moveYear(this.viewDate, t)) : 3 == viewMode ? (n = this.moveMonth(this.date, t), i = this.moveMonth(this.viewDate, t)) : 2 == viewMode ? (n = this.moveDate(this.date, t), i = this.moveDate(this.viewDate, t)) : 1 == viewMode ? (n = this.moveHour(this.date, t), i = this.moveHour(this.viewDate, t)) : 0 == viewMode && (n = this.moveMinute(this.date, t), i = this.moveMinute(this.viewDate, t)), this.dateWithinRange(n) && (this.date = n, this.viewDate = i, this.setValue(), this.update(), e.preventDefault(), r = !0);
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation)break;
                    t = 38 == e.keyCode ? -1 : 1, viewMode = this.viewMode, e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1), 4 == viewMode ? (n = this.moveYear(this.date, t), i = this.moveYear(this.viewDate, t)) : 3 == viewMode ? (n = this.moveMonth(this.date, t), i = this.moveMonth(this.viewDate, t)) : 2 == viewMode ? (n = this.moveDate(this.date, 7 * t), i = this.moveDate(this.viewDate, 7 * t)) : 1 == viewMode ? this.showMeridian ? (n = this.moveHour(this.date, 6 * t), i = this.moveHour(this.viewDate, 6 * t)) : (n = this.moveHour(this.date, 4 * t), i = this.moveHour(this.viewDate, 4 * t)) : 0 == viewMode && (n = this.moveMinute(this.date, 4 * t), i = this.moveMinute(this.viewDate, 4 * t)), this.dateWithinRange(n) && (this.date = n, this.viewDate = i, this.setValue(), this.update(), e.preventDefault(), r = !0);
                    break;
                case 13:
                    if (0 != this.viewMode) {
                        var a = this.viewMode;
                        this.showMode(-1), this.fill(), a == this.viewMode && this.autoclose && this.hide()
                    } else this.fill(), this.autoclose && this.hide();
                    e.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (r) {
                var o;
                this.isInput ? o = this.element : this.component && (o = this.element.find("input")), o && o.change(), this.element.trigger({
                    type: "changeDate",
                    date: this.date
                })
            }
        }, showMode: function (e) {
            if (e) {
                var t = Math.max(0, Math.min(r.modes.length - 1, this.viewMode + e));
                t >= this.minView && t <= this.maxView && (this.element.trigger({
                    type: "changeMode",
                    date: this.viewDate,
                    oldViewMode: this.viewMode,
                    newViewMode: t
                }), this.viewMode = t)
            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + r.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }, reset: function (e) {
            this._setDate(null, "date")
        }
    }, e.fn.datetimepicker = function (t) {
        var i = Array.apply(null, arguments);
        i.shift();
        var r;
        return this.each(function () {
            var a = e(this), o = a.data("datetimepicker"), s = "object" == typeof t && t;
            return o || a.data("datetimepicker", o = new n(this, e.extend({}, e.fn.datetimepicker.defaults, s))), "string" == typeof t && "function" == typeof o[t] && (r = o[t].apply(o, i), void 0 !== r) ? !1 : void 0
        }), void 0 !== r ? r : this
    }, e.fn.datetimepicker.defaults = {}, e.fn.datetimepicker.Constructor = n;
    var i = e.fn.datetimepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["am", "pm"],
            suffix: ["st", "nd", "rd", "th"],
            today: "Today"
        }
    }, r = {
        modes: [{clsName: "minutes", navFnc: "Hours", navStep: 1}, {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        }, {clsName: "days", navFnc: "Month", navStep: 1}, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
        isLeapYear: function (e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        },
        getDaysInMonth: function (e, t) {
            return [31, r.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        getDefaultFormat: function (e, t) {
            if ("standard" == e)return "input" == t ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
            if ("php" == e)return "input" == t ? "Y-m-d H:i" : "Y-m-d H:i:s";
            throw new Error("Invalid format type.")
        },
        validParts: function (e) {
            if ("standard" == e)return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if ("php" == e)return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw new Error("Invalid format type.")
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function (e, t) {
            var n = e.replace(this.validParts(t), "\x00").split("\x00"), i = e.match(this.validParts(t));
            if (!n || !n.length || !i || 0 == i.length)throw new Error("Invalid date format.");
            return {separators: n, parts: i}
        },
        parseDate: function (r, a, o, s) {
            if (r instanceof Date) {
                var l = new Date(r.valueOf() - 6e4 * r.getTimezoneOffset());
                return l.setMilliseconds(0), l
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(r) && (a = this.parseFormat("yyyy-mm-dd", s)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(r) && (a = this.parseFormat("yyyy-mm-dd hh:ii", s)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(r) && (a = this.parseFormat("yyyy-mm-dd hh:ii:ss", s)), /^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(r)) {
                var u, c, d = /([-+]\d+)([dmwy])/, h = r.match(/([-+]\d+)([dmwy])/g);
                r = new Date;
                for (var f = 0; f < h.length; f++)switch (u = d.exec(h[f]), c = parseInt(u[1]), u[2]) {
                    case"d":
                        r.setUTCDate(r.getUTCDate() + c);
                        break;
                    case"m":
                        r = n.prototype.moveMonth.call(n.prototype, r, c);
                        break;
                    case"w":
                        r.setUTCDate(r.getUTCDate() + 7 * c);
                        break;
                    case"y":
                        r = n.prototype.moveYear.call(n.prototype, r, c)
                }
                return t(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), 0)
            }
            var p, m, u, h = r && r.match(this.nonpunctuation) || [], r = new Date(0, 0, 0, 0, 0, 0, 0), g = {}, v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"], y = {
                hh: function (e, t) {
                    return e.setUTCHours(t)
                }, h: function (e, t) {
                    return e.setUTCHours(t)
                }, HH: function (e, t) {
                    return e.setUTCHours(12 == t ? 0 : t)
                }, H: function (e, t) {
                    return e.setUTCHours(12 == t ? 0 : t)
                }, ii: function (e, t) {
                    return e.setUTCMinutes(t)
                }, i: function (e, t) {
                    return e.setUTCMinutes(t)
                }, ss: function (e, t) {
                    return e.setUTCSeconds(t)
                }, s: function (e, t) {
                    return e.setUTCSeconds(t)
                }, yyyy: function (e, t) {
                    return e.setUTCFullYear(t)
                }, yy: function (e, t) {
                    return e.setUTCFullYear(2e3 + t)
                }, m: function (e, t) {
                    for (t -= 1; 0 > t;)t += 12;
                    for (t %= 12, e.setUTCMonth(t); e.getUTCMonth() != t;)e.setUTCDate(e.getUTCDate() - 1);
                    return e
                }, d: function (e, t) {
                    return e.setUTCDate(t)
                }, p: function (e, t) {
                    return e.setUTCHours(1 == t ? e.getUTCHours() + 12 : e.getUTCHours())
                }
            };
            if (y.M = y.MM = y.mm = y.m, y.dd = y.d, y.P = y.p, r = t(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds()), h.length == a.parts.length) {
                for (var f = 0, b = a.parts.length; b > f; f++) {
                    if (p = parseInt(h[f], 10), u = a.parts[f], isNaN(p))switch (u) {
                        case"MM":
                            m = e(i[o].months).filter(function () {
                                var e = this.slice(0, h[f].length), t = h[f].slice(0, e.length);
                                return e == t
                            }), p = e.inArray(m[0], i[o].months) + 1;
                            break;
                        case"M":
                            m = e(i[o].monthsShort).filter(function () {
                                var e = this.slice(0, h[f].length), t = h[f].slice(0, e.length);
                                return e == t
                            }), p = e.inArray(m[0], i[o].monthsShort) + 1;
                            break;
                        case"p":
                        case"P":
                            p = e.inArray(h[f].toLowerCase(), i[o].meridiem)
                    }
                    g[u] = p
                }
                for (var w, f = 0; f < v.length; f++)w = v[f], w in g && !isNaN(g[w]) && y[w](r, g[w])
            }
            return r
        },
        formatDate: function (t, n, a, o) {
            if (null == t)return "";
            var s;
            if ("standard" == o)s = {
                yy: t.getUTCFullYear().toString().substring(2),
                yyyy: t.getUTCFullYear(),
                m: t.getUTCMonth() + 1,
                M: i[a].monthsShort[t.getUTCMonth()],
                MM: i[a].months[t.getUTCMonth()],
                d: t.getUTCDate(),
                D: i[a].daysShort[t.getUTCDay()],
                DD: i[a].days[t.getUTCDay()],
                p: 2 == i[a].meridiem.length ? i[a].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                h: t.getUTCHours(),
                i: t.getUTCMinutes(),
                s: t.getUTCSeconds()
            }, s.H = 2 == i[a].meridiem.length ? s.h % 12 == 0 ? 12 : s.h % 12 : s.h, s.HH = (s.H < 10 ? "0" : "") + s.H, s.P = s.p.toUpperCase(), s.hh = (s.h < 10 ? "0" : "") + s.h, s.ii = (s.i < 10 ? "0" : "") + s.i, s.ss = (s.s < 10 ? "0" : "") + s.s, s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m; else {
                if ("php" != o)throw new Error("Invalid format type.");
                s = {
                    y: t.getUTCFullYear().toString().substring(2),
                    Y: t.getUTCFullYear(),
                    F: i[a].months[t.getUTCMonth()],
                    M: i[a].monthsShort[t.getUTCMonth()],
                    n: t.getUTCMonth() + 1,
                    t: r.getDaysInMonth(t.getUTCFullYear(), t.getUTCMonth()),
                    j: t.getUTCDate(),
                    l: i[a].days[t.getUTCDay()],
                    D: i[a].daysShort[t.getUTCDay()],
                    w: t.getUTCDay(),
                    N: 0 == t.getUTCDay() ? 7 : t.getUTCDay(),
                    S: t.getUTCDate() % 10 <= i[a].suffix.length ? i[a].suffix[t.getUTCDate() % 10 - 1] : "",
                    a: 2 == i[a].meridiem.length ? i[a].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                    g: t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12,
                    G: t.getUTCHours(),
                    i: t.getUTCMinutes(),
                    s: t.getUTCSeconds()
                }, s.m = (s.n < 10 ? "0" : "") + s.n, s.d = (s.j < 10 ? "0" : "") + s.j, s.A = s.a.toString().toUpperCase(), s.h = (s.g < 10 ? "0" : "") + s.g, s.H = (s.G < 10 ? "0" : "") + s.G, s.i = (s.i < 10 ? "0" : "") + s.i, s.s = (s.s < 10 ? "0" : "") + s.s
            }
            for (var t = [], l = e.extend([], n.separators), u = 0, c = n.parts.length; c > u; u++)l.length && t.push(l.shift()), t.push(s[n.parts[u]]);
            return l.length && t.push(l.shift()), t.join("")
        },
        convertViewMode: function (e) {
            switch (e) {
                case 4:
                case"decade":
                    e = 4;
                    break;
                case 3:
                case"year":
                    e = 3;
                    break;
                case 2:
                case"month":
                    e = 2;
                    break;
                case 1:
                case"day":
                    e = 1;
                    break;
                case 0:
                case"hour":
                    e = 0
            }
            return e
        },
        headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
        headTemplateV3: '<thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"></i> </th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"></i> </th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    r.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>", r.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + r.headTemplateV3 + r.contTemplate + r.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + r.headTemplateV3 + r.contTemplate + r.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + r.headTemplateV3 + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + r.headTemplateV3 + r.contTemplate + r.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + r.headTemplateV3 + r.contTemplate + r.footTemplate + "</table></div></div>", e.fn.datetimepicker.DPGlobal = r, e.fn.datetimepicker.noConflict = function () {
        return e.fn.datetimepicker = old, this
    }, e(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function (t) {
        var n = e(this);
        n.data("datetimepicker") || (t.preventDefault(), n.datetimepicker("show"))
    }), e(function () {
        e('[data-provide="datetimepicker-inline"]').datetimepicker()
    }), e.fn.datetimepicker.dates["zh-CN"] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今日",
        suffix: [],
        meridiem: ["上午", "下午"]
    }
}(window.jQuery);