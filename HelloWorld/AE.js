/**
 * Created by peter on 2015-05-19.
 */

(function (q, m, o) {
    /*
     copy from http://style.alibaba.com/js/ae.js
     * q=window,
     * m="AE",
     * o=undefined
     * */
    var h = {},
        i = 0,
        g = false,
        d = Object.prototype.toString,
        p = Array.prototype.slice,
        b = false,
        e = {
            debug: false
        },
        f = {},
        c = {};

    function a(t) {
        var x,
            w = q,
            v = w.document,
            u = v.onreadystatechange;

        function s(y) {
            y = y || w.event;
            if (y && y.type && (/DOMContentLoaded|load/).test(y.type)) {
                r()
            } else {
                if (v.readyState) {
                    if ((/loaded|complete/).test(v.readyState)) {
                        r()
                    } else {
                        if (self === self.top && v.documentElement.doScroll) {
                            try {
                                if (!g) {
                                    v.documentElement.doScroll("left")
                                }
                            } catch (y) {
                                return
                            }
                            r()
                        }
                    }
                }
            }
        }

        function r() {
            if (!g) {
                g = true;
                t.apply({});
                if (v.removeEventListener) {
                    v.removeEventListener("DOMContentLoaded", s, false)
                }
                clearInterval(x)
            }
        }

        if (v.addEventListener) {
            v.addEventListener("DOMContentLoaded", s, false)
        }
        x = setInterval(s, 40);
        l(s);
        v.onreadystatechange = function () {
            s.apply(v, arguments);
            if (typeof u === "function") {
                u.apply(v, arguments)
            }
        }
    }

    function l(r) {
        var s;
        if (q.addEventListener) {
            q.addEventListener("load", r, false)
        } else {
            if (q.attachEvent) {
                q.attachEvent("onload", r)
            } else {
                if (typeof q.onload === "function") {
                    s = q.onload;
                    q.onload = function () {
                        r.apply(q, arguments);
                        s.apply(q, arguments)
                    }
                } else {
                    q.onload = r
                }
            }
        }
    }

    function k(r) {
        var s;
        if (typeof c[r] === "object") {
            s = function () {
                if (c[r].length > 0) {
                    var t = c[r].shift();
                    setTimeout(s, 0);
                    if (--t.dependenceCount === 0) {
                        _ae.use(t.name)
                    }
                } else {
                    delete c[r]
                }
            };
            setTimeout(s, 0)
        }
    }

    function n(u) {
        var s,
            v,
            t,
            r;
        if (f.hasOwnProperty(u)) {
            s = p.call(arguments, 1);
            v = f[u].slice();
            for (t = 0, r = v.length; t < r; ++t) {
                v[t].apply({},
                    s)
            }
            return true
        }
        return false
    }

    var _ae = q[m] = q[m] || {};
    _ae.defer = _ae.defer || function (t, s, r) {
            var u = function () {
                _ae.use(["$domReady"],
                    function () {
                        t.apply(s || q, r || [])
                    })
            };
            if (g) {
                setTimeout(u, 0)
            } else {
                u()
            }
        };
    _ae.define = _ae.define || function (s, t, r) {
            if (typeof s === "function") {
                r = s;
                t = [];
                s = "$anonymous_" + (++i)
            } else {
                if (typeof s === "object") {
                    r = t;
                    t = s;
                    s = "$anonymous_" + (++i)
                } else {
                    if (typeof t === "function") {
                        r = t;
                        t = []
                    }
                }
            }
            if (!h.hasOwnProperty(s)) {
                h[s] = {
                    available: false,
                    dependencies: t,
                    exports: null,
                    factory: r,
                    name: s
                };
                if (c[s]) {
                    _ae.use([s])
                }
            }
            return {
                remove: function () {
                    return _ae.remove(s)
                },
                use: function (u) {
                    return u ? _ae.use([s], u) : _ae.use([s])
                }
            }
        };
    _ae.remove = _ae.remove || function (s) {
            var t,
                r,
                u = typeof s === "object" ? s : arguments;
            for (t = 0, r = u.length; t < r; ++t) {
                s = u[t];
                if (h.hasOwnProperty(s)) {
                    delete h[s]
                }
            }
        };
    _ae.use = _ae.use || function () {
            var z,
                w,
                x,
                u,
                D = p.call(arguments),
                r,
                E,
                t,
                v,
                B,
                s,
                y = (typeof D[D.length - 1] === "function") ? D.pop() : null,
                C = (typeof D[0] === "object") ? D[0].slice() : D;
            if (y) {
                return _ae.define.call(_ae, C, y).use()
            }
            for (z = 0, x = C.length; z < x; ++z) {
                r = C[z];
                E = [];
                if (h.hasOwnProperty(r)) {
                    t = h[r];
                    if (!t.exports) {
                        v = _ae.use(t.dependencies);
                        if (v === null) {
                            return null
                        }
                        for (w = 0, u = v.length; w < u; ++w) {
                            if (v[w] === null) {
                                E.push(t.dependencies[w])
                            }
                        }
                        if (E.length > 0) {
                            if (!c[r]) {
                                c[r] = []
                            }
                            s = {
                                name: r,
                                dependenceCount: E.length
                            };
                            for (w = 0, u = E.length; w < u; ++w) {
                                c[E[w]].push(s)
                            }
                        } else {
                            t.exports = {};
                            try {
                                B = t.factory.apply(t, v);
                                if (B !== o) {
                                    t.exports = B
                                }
                                t.available = true;
                                k(r)
                            } catch (A) {
                                t.exports = null;
                                if (n("error", A)) {
                                    return null
                                } else {
                                    if (b || e.debug) {
                                        throw A
                                    } else {
                                        return null
                                    }
                                }
                            }
                        }
                    }
                    C[z] = t.exports
                } else {
                    if (!c[r]) {
                        c[r] = []
                    }
                    C[z] = null
                }
            }
            return C
        };
    _ae.define("hoz", function () {
        var r = this.exports,
            t = (q.console && q.console.log) ? function (u) {
                console.log(u)
            } : null,
            s = (q.console && q.console.error) ? function (u) {
                console.error(u)
            } : t;
        r.log = function (u) {
            if ((b || e.debug) && t) {
                t(u)
            }
            n("log", u);
            return this
        };
        r.error = function (u) {
            if (typeof u === "string") {
                u = new Error(u)
            }
            if ((b || e.debug) && s) {
                s(u.message)
            }
            n("error", u);
            return this
        };
        r.config = function (u) {
            var v;
            if (u) {
                for (v in u) {
                    if (u.hasOwnProperty(v)) {
                        e[v] = u[v]
                    }
                }
            }
            return e
        };
        r.addHandler = function (v, u) {
            if (!f.hasOwnProperty(v)) {
                f[v] = []
            }
            f[v].push(u);
            return this
        };
        r.removeHandler = function (x, w) {
            var y,
                v,
                u;
            if (f.hasOwnProperty(x)) {
                y = f[x];
                for (v = 0, u = y.length; v < u; ++v) {
                    if (y[v] === w) {
                        y.splice(v, 1);
                        break
                    }
                }
                if (y.length === 0) {
                    delete f[x]
                }
            }
            return this
        }
    });
    a(function () {
        _ae.define("$domReady",
            function () {
            })
    });
    l(function () {
        _ae.define("$pageLoad",
            function () {
            })
    });
    (function () {
        var t = location.search.substring(1).split("&"),
            r = t.length,
            s = 0;
        for (; s < r; ++s) {
            if (t[s].split("=")[0] === "hoz-debug") {
                b = true;
                break
            }
        }
    }())
}(this, "AE"));