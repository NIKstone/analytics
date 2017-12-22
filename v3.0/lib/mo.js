/**
 * analytics for xiyou
 * v3.0
 * author: NIKstone (shitoubean@163/com)
 */
! function() {
    try {
        if (window.hasMo) return;
        var ua = navigator.userAgent;
        var platform = navigator.platform;
        var xiyou_analytics_domain = "https:" == document.location.protocol ? "https://analytics.52xiyou_test.com/" : "http://analytics.52xiyou_test.com/",
            xiyou_analytics_path = xiyou_analytics_domain + "mo.gif",
            xiyou_analytics_path_temp = "//collector.xiyouence_test.com/mo.gif";
        var emptyFunction = function() {};
        window.console = window.console || (function() {
            var c = {};
            c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
            return c;
        })();

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(ele) {
                var len = this.length;
                var fromIndex = Number(arguments[1]) || 0;
                if (fromIndex < 0) {
                    fromIndex += len;
                }
                while (fromIndex < len) {
                    if (fromIndex in this && this[fromIndex] === ele) {
                        return fromIndex;
                    }
                    fromIndex++;
                }
                if (len === 0) {
                    return -1;
                }
            }
        }

        var Util = {
            parseQueryString: function(qs) {
                var paris = {};
                if (qs.length > 0) {
                    var query = qs.charAt(0) === "?" ? qs.substring(1) : qs;
                    if (query.length > 0) {
                        var vars = query.split("&");
                        for (var i = 0; i < vars.length; i++) {
                            if (vars[i].length > 0) {
                                var pair = vars[i].split("=");
                                try {
                                    var name = decodeURIComponent(pair[0]);
                                    var value = (pair.length > 1) ? decodeURIComponent(pair[1]) : "";
                                    (pair.length > 1) && (paris[name] = value);
                                } catch (e) {}
                            }
                        }
                    }
                }
                return paris;
            },
            unParseQueryString: function(qs) {
                var params = [],
                    k, v;
                for (k in qs) {
                    if (!qs.hasOwnProperty || qs.hasOwnProperty(k)) {
                        v = qs[k];

                        params.push(
                            encodeURIComponent(k) + '=' + encodeURIComponent(v)
                        );
                    }
                }
                var _str = params.join("&");
                if (_str.length > 0) return "?" + _str;
                else return "";
            },
            getQueryString: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            parseUrl: function(url) {
                var l = document.createElement("a");
                l.href = url;
                if (l.host === "") {
                    l.href = l.href;
                }
                return {
                    hash: l.hash,
                    host: l.host,
                    hostname: l.hostname,
                    pathname: l.pathname,
                    protocol: l.protocol,
                    query: Util.parseQueryString(l.search)
                };
            },
            unParseUrl: function(url) {
                return (url.protocol || "") +
                    "//" +
                    (url.host || "") +
                    (url.pathname || "") +
                    (url.hash || "");
            },
            isString: function(str) {
                return Object.prototype.toString.call(str) === "[object String]";
            },
            isArray: function(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            },
            parseString: function(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "").toLowerCase();
            },
            parseArray: function(_arr, _space) {
                var arr = [];
                for (var i = 0; _val = _arr[i]; i++) {
                    arr.push(this.parseString(_val + ""));
                }
                return arr.join(_space || "&");
            }
        };

        var browser = {
            type: "other",
            version: "other",
            width: 0,
            height: 0,
            engine_type: "other",
            engine_version: "other",
            getDevice: function() {

                var winWidth = 0,
                    winHeight = 0;
                //获取窗口宽度 
                if (window.innerWidth) {
                    winWidth = window.innerWidth;
                } else if (document.body && document.body.clientWidth) {
                    winWidth = document.body.clientWidth;
                }

                //获取窗口高度 
                if (window.innerHeight) {
                    winHeight = window.innerHeight;
                } else if (document.body && document.body.clientHeight) {
                    winHeight = document.body.clientHeight;
                }

                //通过深入Document内部对body进行检测，获取窗口大小 
                if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                    winHeight = document.documentElement.clientHeight;
                    winWidth = document.documentElement.clientWidth;
                }
                this.height = winHeight;
                this.width = winWidth;
            },
            getInfo: function() {
                var oThis = this;

                if (/MicroMessenger\/(\S+)/.test(ua) || /MQQBrowser\/(\S+)/.test(ua)) {
                    this.type = "X5";
                    this.version = RegExp["$1"];
                    return;
                }

                if (window.opera) {
                    oThis.type = "opera";
                    oThis.version = window.opera.version() || "other";
                    return;
                }

                if (/AppleWebKit\/(\S+)/.test(ua)) {
                    oThis.type = "webkit";
                    if (/Chrome\/(\S+)/.test(ua)) {
                        oThis.version = RegExp["$1"];
                    } else if (/Version\/(\S+)/.test(ua)) {
                        oThis.version = RegExp["$1"];
                    } else {
                        //近似地确定版本号
                        var safariVersion = 1;
                        var engine = engine || "";
                        if (engine.webkit < 100) {
                            safariVersion = 1;
                        } else if (engine.webkit < 312) {
                            safariVersion = 1.2;
                        } else if (engine.webkit < 412) {
                            safariVersion = 1.3;
                        } else {
                            safariVersion = 2;
                        }

                        oThis.version = safariVersion;
                    }
                    return;
                }

                if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
                    oThis.type = "khtml";
                    oThis.version = RegExp["$1"];
                    return;
                }

                if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
                    oThis.type = "gecko";
                    oThis.version = RegExp["$1"];
                    return;
                }

                if (/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/.test(ua.toLowerCase())) {
                    oThis.type = "trident";
                    oThis.version = RegExp["$1"];
                    return;
                }

                if ("douyu_android" == ua.toLowerCase()) {
                    oThis.type = "douyuapp";
                    return;
                }
            }
        };

        browser.getDevice();
        browser.getInfo();

        var web = {
            domain: document.domain || "",
            url: document.URL || "",
            title: document.title || "",
            ref: Util.getQueryString("ref") || document.referrer || "",
            hostname: document.location && document.location.hostname || "",
            getUrlData: function() {
                var l = document.location;
                return ({
                    hash: l.hash,
                    host: l.host,
                    hostname: l.hostname,
                    pathname: l.pathname,
                    protocol: l.protocol,
                    query: Util.parseQueryString(l.search)
                });
            }
        };

        var system = {
            type: "other",
            version: "other",
            screen_width: 0,
            screen_height: 0,
            screen_colors: "0-bit",
            language: "other",
            gpu_vender: "",
            gpu_renderer: "",
            getDevice: function() {
                if (window && window.screen) {
                    this.screen_height = window.screen.height || 0;
                    this.screen_width = window.screen.width || 0;

                    this.screen_colors = (window.screen.colorDepth || 0) + '-bit';
                }

                var canvas = document.createElement("canvas");
                var gl = "";

                if (!gl.getContext) {
                    return;
                }

                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

                if (!gl) {
                    return;
                }
                var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

                if (!debugInfo) {
                    return;
                }
                this.gpu_renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL || "") || ""; // 显卡渲染器
                this.gpu_vender = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL || "") || ""; // 显卡供应商

            },
            getInfo: function() {
                //平台、设备和操作系统
                var oThis = this,
                    ua_lower = ua.toLowerCase();

                /*
                 * Linux
                 */
                if (ua.match('Unix')) {
                    oThis.type = 'Unix';
                }
                if (ua_lower.match('freebsd')) {
                    oThis.type = 'Freebsd';
                }
                if (ua.match('openBSD')) {
                    oThis.type = 'OpenBSD';
                }
                if (ua.match('netBSD')) {
                    oThis.type = 'NetBSD';
                }
                if (ua.match('SunOS')) {
                    oThis.type = 'Solaris';
                }
                if (ua.match('Linux')) {
                    oThis.type = 'Linux';

                    if (ua.match('CentOS')) {
                        oThis.type = 'CentOS';
                        if (match = /CentOS\/[0-9\.\-]+el([0-9_]+)/.exec(ua)) {
                            oThis.version = match[1].replace(/_/g, '.');
                        }
                    }

                    if (ua.match('Debian')) {
                        oThis.type = 'Debian';
                    }

                    if (ua.match('Fedora')) {
                        oThis.type = 'Fedora';
                        if (match = /Fedora\/[0-9\.\-]+fc([0-9]+)/.exec(ua)) {
                            oThis.version = match[1];
                        }
                    }

                    if (ua.match('Gentoo')) {
                        oThis.type = 'Gentoo';
                    }

                    if (ua.match('Kubuntu')) {
                        oThis.type = 'Kubuntu';
                    }

                    if (ua.match('Mandriva Linux')) {
                        oThis.type = 'mandriva';
                        if (match = /Mandriva Linux\/[0-9\.\-]+mdv([0-9]+)/.exec(ua)) {
                            oThis.version = match[1];
                        }
                    }

                    if (ua.match('Mageia')) {
                        oThis.type = 'Mageia';
                        if (match = /Mageia\/[0-9\.\-]+mga([0-9]+)/.exec(ua)) {
                            oThis.version = match[1];
                        }
                    }

                    if (ua.match('Red Hat')) {
                        oThis.type = 'Red Hat';
                        if (match = /Red Hat[^\/]*\/[0-9\.\-]+el([0-9_]+)/.exec(ua)) {
                            oThis.version = match[1].replace(/_/g, '.');
                        }
                    }

                    if (ua.match('Slackware')) {
                        oThis.type = 'Slackware';
                    }

                    if (ua.match('SUSE')) {
                        oThis.type = 'SUSE';
                    }

                    if (ua.match('Turbolinux')) {
                        oThis.type = 'Turbolinux';
                    }

                    if (ua.match('Ubuntu')) {
                        oThis.type = 'Ubuntu';
                        if (match = /Ubuntu\/([0-9.]*)/.exec(ua)) {
                            oThis.version = match[1];
                        }
                    }
                }
                if (ua.match('iPhone( Simulator)?;') || ua.match('iPad;') || ua.match('iPod;')) {
                    oThis.type = 'iOS';
                    oThis.version = '1.0';

                    if (match = /OS (.*) like Mac OS X/.exec(ua)) {
                        oThis.version = match[1].replace(/_/g, '.');
                    }
                } else if (ua.match('Mac OS X')) {

                    oThis.type = 'Mac OS X';

                    if (match = /Mac OS X (10[0-9\._]*)/.exec(ua)) {
                        oThis.version = match[1].replace(/_/g, '.');
                    }
                }

                /*
                 *  Windows
                 */

                if (ua.match('Windows')) {
                    oThis.type = 'Windows';

                    if (match = /Windows NT ([0-9]\.[0-9])/.exec(ua)) {
                        oThis.version = match[1];

                        switch (match[1]) {
                            case '10.0':
                                oThis.version = '10';
                                break;
                            case '6.4':
                                oThis.version = '10';
                                break;
                            case '6.3':
                                oThis.version = '8.1';
                                break;
                            case '6.2':
                                oThis.version = '8';
                                break;
                            case '6.1':
                                oThis.version = '7';
                                break;
                            case '6.0':
                                oThis.version = 'Vista';
                                break;
                            case '5.2':
                                oThis.version = 'Server 2003';
                                break;
                            case '5.1':
                                oThis.version = 'XP';
                                break;
                            case '5.0':
                                oThis.version = '2000';
                                break;
                            default:
                                oThis.version = 'NT ' + oThis.version;
                        }
                    }
                    if (ua.match('Windows 95') || ua.match('Win95') || ua.match('Win 9x 4.00')) {
                        oThis.version = '95';
                    }

                    if (ua.match('Windows 98') || ua.match('Win98') || ua.match('Win 9x 4.10')) {
                        oThis.version = '98';
                    }

                    if (ua.match('Windows ME') || ua.match('WinME') || ua.match('Win 9x 4.90')) {
                        oThis.version = 'ME';
                    }

                    if (ua.match('Windows XP') || ua.match('WinXP')) {
                        oThis.type = 'XP';
                    }

                    if (ua.match('WP7')) {
                        oThis.type = 'Windows Phone';
                        oThis.version = '7.0';
                    }

                    if (ua.match('Windows CE') || ua.match('WinCE') || ua.match('WindowsCE')) {
                        if (ua.match(' IEMobile')) {
                            oThis.type = 'Windows Mobile';

                            if (ua.match(' IEMobile 8')) {
                                oThis.version = '6.5';
                            }

                            if (ua.match(' IEMobile 7')) {
                                oThis.version = '6.1';
                            }

                            if (ua.match(' IEMobile 6')) {
                                oThis.version = '6.0';
                            }
                        } else {
                            oThis.type = 'Windows CE';

                            if (match = /WindowsCEOS\/([0-9.]*)/.exec(ua)) {
                                oThis.version = match[1];
                            }

                            if (match = /Windows CE ([0-9.]*)/.exec(ua)) {
                                oThis.version = match[1];
                            }
                        }
                    }

                    if (ua.match('Windows Mobile')) {
                        oThis.type = 'Windows Mobile';
                    }

                    if (match = /WindowsMobile\/([0-9.]*)/.exec(ua)) {
                        oThis.type = 'Windows Mobile';
                        oThis.version = match[1];
                    }

                    if (ua.match('Windows Phone')) {
                        oThis.type = 'Windows Mobile';
                        oThis.version = ua.match(/Windows Phone ([0-9.]*)/)[1];
                    }

                    if (ua.match('Windows Phone OS')) {
                        oThis.type = 'Windows Phone';
                        oThis.version = ua.match(/Windows Phone OS ([0-9.]*)/)[1];

                        if (oThis.version < 7) {
                            oThis.type = 'Windows Mobile';
                        }
                    }
                }

                /*
                 * 		Android
                 */
                if (ua.match('Android')) {
                    oThis.type = 'Android';

                    if (match = /Android(?: )?(?:AllPhone_|CyanogenMod_)?(?:\/)?v?([0-9.]+)/.exec(ua.replace('-update', '.'))) {
                        oThis.version = match[1];
                    }

                    if (ua.match('Android Eclair')) {
                        oThis.version = '2.0';
                    }
                }

                /**
                 *      Google TV
                 */

                if (ua.match('GoogleTV')) {
                    oThis.type = 'Google TV';

                    if (ua.match('Chrome/5.')) {
                        oThis.version = '1';
                    }

                    if (ua.match('Chrome/11.')) {
                        oThis.version = '2';
                    }

                }

                /**
                 *   WoPhone
                 */

                if (ua.match('WoPhone')) {
                    oThis.type = 'WoPhone';

                    if (match = /WoPhone\/([0-9\.]*)/.exec(ua)) {
                        oThis.version = match[1];
                    }
                }

                /**
                 *   BlackBerry
                 */

                if (ua.match('BlackBerry') || ua.match('BB10')) {
                    oThis.type = 'BlackBerry OS';

                    if (!ua.match('Opera')) {
                        if (match = /BlackBerry([0-9]*)\/([0-9.]*)/.exec(ua)) {
                            oThis.version = match[2];
                        }

                        if (match = /Version\/([0-9.]*)/.exec(ua)) {
                            oThis.version = match[1];
                        }

                        if (oThis.version >= 10) {
                            oThis.type = 'BlackBerry';
                        }
                    }
                }

                /*
                 *      BlackBerry PlayBook
                 */

                if (ua.match('RIM Tablet OS')) {
                    oThis.type = 'BlackBerry Tablet OS';
                    oThis.version = ua.match(/RIM Tablet OS ([0-9.]*)/)[1];
                } else if (ua.match('PlayBook')) {
                    if (match = /Version\/(10[0-9.]*)/.exec(ua)) {
                        oThis.type = 'BlackBerry';
                        oThis.version = match[1];
                    }
                }
            }
        };

        system.getDevice();
        system.getInfo();

        /**
         * 用于向服务器发出请求的对象。
         */
        var Ajax = function() {
            var oThis = this;
            oThis.collectUrl = xiyou_analytics_path;
            /**
             * 发送请求。
             * @param url {String} 发送请求的地址。
             * @param param {String} 发送请求的参数串。
             * @param callback {Function} 回调函数。
             * @param _ioo {Boolean}
             */
            oThis.send = function(url, param, callback, _ioo) {
                oThis.collectUrl = url;
                if (param["length"] >= 2036 || _ioo) {
                    oThis.sendByRequest(param, callback);
                } else {
                    oThis.sendByImage(param, callback);
                }
            };
            /**
             * 使用图片对象发出请求。
             * @param param {String} 组装完毕的参数。
             * @param callback {Function} 回调函数。
             */
            oThis.sendByImage = function(param, callback) {
                var win = window;
                var n = 'moImage_' + oThis.make_rnd(),
                    img = win[n] = new Image();
                img.onload = function() {
                    win[n] = null;
                    (callback || emptyFunction)(true);
                    document.body.removeChild(img);
                };
                img.onerror = function() {
                    win[n] = null;
                    (callback || emptyFunction)(false);
                    document.body.removeChild(img);
                };
                img.src = oThis.collectUrl + "?" + param;

                document.body.appendChild(img);
            };

            oThis.make_rnd = function() {
                return (+new Date()) + '.r' + Math.floor(Math.random() * 1000);
            };

            /**
             * 使用XMLHttpRequest对象发出请求。
             * @param param {String} 发送请求的参数串。
             * @param callback {Function} 回调函数。
             */
            oThis.sendByRequest = function(param, callback) {
                var request,
                    Request = window.XMLHttpRequest;
                if (Request)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                    request = new XMLHttpRequest();
                }
                else
                {// code for IE6, IE5
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (request) {
                    request.open("POST", oThis.collectUrl, true);
                    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    request.onreadystatechange = function() {
                        if (request.readyState == 4) {
                            if(request.status == 200){
                                (callback || emptyFunction)(true);
                            }
                            else {
                                (callback || emptyFunction)(false);
                            }
                            request = null;
                        }
                    };
                    request.send(param);
                    return true;
                }
                return false;
            };
        };

        var ma = {
            startTime: (new Date()).getTime(),
            params: {
                "ic": "pageview", //事件类型
                "osn": system.type.toLowerCase(), // 操作系统类型（mac、windows、ios、linux、Android）
                "osv": system.version, //操作系统版本
                "brn": browser.type, //浏览器类型（chrome、ie、safri、opera、Firefox）
                "brv": browser.version, //浏览器版本号
                "gr": system.gpu_renderer, // GPU渲染器
                "gv": system.gpu_vender, // GPU供应商
                "sr": system.screen_width + "x" + system.screen_height, //系统分辨率
                "rr": Util.unParseUrl(Util.parseUrl(web.ref)),
                "mn": "1"
            },
            commonParams: {

            },
            paramStack: [],
            /*
             * 页面点击事件
             * @param _sendType{String} 点击事件名：PosterClick,MaterialClick...
             * @param _coordinate{String} 点击坐标(x坐标+“x”+y坐标)
             */
            onPageClick: function(_sendType, _coordinate) {
                this.params.ic = _sendType || "click";
                var curTime = (new Date()).getTime(),
                    click_delayed = Math.floor((curTime - this.startTime) / 1000);
                this.requestInfo([
                    ["cc", _coordinate + ""],
                    ["cd", click_delayed + ""]
                ]);
            },
            pushParams: function() {
                //解析_maq配置
                var paramStack = this.paramStack;
                for (var i = 0; i < paramStack["length"]; i++) {
                    this.params[paramStack[i][0]] = paramStack[i][1] + "";
                }
            },
            putParams: function(_key) {
                //删除参数，仅允许删除自定义参数，公共参数不允许删除
                var paramStack = this.paramStack;
                for (var i = 0; _val = paramStack[i]; i++) {
                    if (_key && (_val[0] == _key)) {
                        this.paramStack.splice(i, 1);
                        delete this.params[_key];
                    }
                }
            },
            objToArray: function(obj, array) {
                /* 序列化参数 Object -> Array
                 * @param obj { Object } 需要序列化的对象
                 * @param array { Array } 返回的数组
                 */
                var _obj = obj || {},
                    _array = array;
                for (var key in _obj) {
                    var _key = encodeURIComponent(key + ""),
                        _value = encodeURIComponent(obj[key] + "");
                    _array.push(_key + "=" + _value);
                }
                return _array;
            },
            checkSendCommon: function() {
                var type = this.params.ic || "";
                var sendArray = ["materialvisit", "postervisit", "mapostervisit", "mopostervisit"];
                return sendArray.indexOf(type.toLowerCase()) > -1;
            },
            getNow: function() {
                return Math.floor(new Date().getTime() / 1e3);
            },
            /*发送统计请求
             * @param param { Array } 参数数组 [[key, value], [key, value]],自定义参数上传，仅当次有效
             */
            requestInfo: function(param) {
                var oThis = this;
                oThis.pushParams();

                var params = oThis.params,
                    arr_req = [];

                arr_req = oThis.objToArray(params, arr_req);

                var sendCommon = oThis.checkSendCommon();

                if (!!sendCommon) {
                    var commonParams = oThis.commonParams;
                    arr_req = oThis.objToArray(commonParams, arr_req);
                } else {
                    arr_req.push("_tt=" + oThis.getNow());
                }

                //额外参数拼接
                if (param && Util.isArray(param)) {
                    var arr_ext = [];
                    for (var j = 0; _param = param[j]; j++) {
                        if (_param[0]) {
                            var exstr = encodeURIComponent(_param[0]) + "=" + encodeURIComponent(_param[1] + "");
                            arr_ext.push(exstr);
                        }
                    }
                    arr_req.push(arr_ext.join("&"));
                }

                var str_req = arr_req.join("&");

                //通过Image对象上报统计数据
                var ajax = new Ajax();

                ajax.send(xiyou_analytics_path_temp, str_req, function(success) {
                    
                    //发送成功后回调函数
                    if (!success) {
                        window.reportBug && window.reportBug({ msg: "temp__" + arr_req.join(",") }); // 上报错误
                        setTimeout(function() {
                            ajax.send(xiyou_analytics_path_temp, str_req, null, true); // 重试一次    
                        }, 1000);
                    }
                }, false);

                ajax.send(xiyou_analytics_path, str_req, function(success) {
                    //发送成功后回调函数
                    if (!success) {
                        window.reportBug && window.reportBug({ msg: arr_req.join(",") }); // 上报错误
                        setTimeout(function() {
                            ajax.send(xiyou_analytics_path, str_req, null, true); // 重试一次    
                        }, 1000);
                    }
                }, false);
            }
        };

        function myOnload() {
            /*
             * js文件加载完成之前，window._ma接收所有事件到队列，存储在window.ma.q。
             */
            var maq = window._ma.q || [];
            for (var i = 0; _val = maq[i]; i++) {
                setTracker(_val);
            }
            /*
             * JS 文件加载完成
             * 改写window._ma 方法, 接收事件触发。
             */
            window._ma = function() {
                var args = arguments;
                if (args && args[0]) {
                    setTracker(args);
                }
            };

            function setTracker(_val) {
                var oThis = this,
                    pList = _val;

                oThis["create"] = function() {
                    var _key = pList[1] || "",
                        _value = pList[2] || "";
                    _key && ma.paramStack.push([_key, _value]);
                };

                oThis["send"] = function() {
                    var send_type = pList[1] || "",
                        param = pList[2] || [];

                    if ("pageclick" == send_type) {
                        pageClick(pList[2] + "");
                        return;
                    }

                    send_type && (ma.params.ic = send_type, ma.requestInfo(param.length && param));
                };

                oThis["clear"] = function() {
                    var _keys = pList[1];
                    if (_keys) {
                        if (_keys && Util.isArray(_keys)) {
                            for (var j = 0; j < _keys.length; j++) {
                                _keys[j] && ma.putParams(_keys[j]);
                            }
                        } else {
                            ma.putParams(_keys);
                        }
                    }
                };

                oThis["trackEvent"] = function() {
                    var category = pList[1] || "",
                        action = pList[2] || "";
                    var trackArr = [
                        ["cat", category],
                        ["act", action]
                    ];

                    if (Util.isArray(pList[3])) {
                        pushTrackArr(pList[3]);
                    } else {
                        trackArr.push(["des", pList[3] ? (pList[3] + "") : ""]);
                        pushTrackArr(pList[4] || []);
                    }
                    ma.params.ic = 'TrackEvent';
                    ma.requestInfo(trackArr);

                    function pushTrackArr(trackExtra) {
                        for (var i = 0; _ext = trackExtra[i]; i++) {
                            if (Util.isArray(_ext) && _ext.length > 1) {
                                trackArr.push(_ext);
                            }
                        }
                    };
                };

                if (pList[0] && oThis[pList[0]]) {
                    new oThis[pList[0]];
                }

                //页面点击事件统计
                pageClick = function(_sendType) {
                    if (window.addEventListener) {
                        window.addEventListener('click', function(e) {
                            var _clientX = e.clientX || 0,
                                _clientY = e.clientY || 0;
                            ma.onPageClick(_sendType, _clientX + "" + "x" + _clientY + "");
                        });
                    } else if (document.attachEvent) {
                        document.attachEvent('onclick', function(e) {
                            var _clientX = e.clientX || 0;
                            var _clientY = e.clientY || 0;
                            ma.onPageClick(_sendType, _clientX + "" + "x" + _clientY + "");
                        });
                    }
                };
            };
        };

        myOnload();

        window.hasMo = 1;
    } catch (e) {
        var _msg = (e && e.message) + ",ua: " + navigator.userAgent;
        window.reportBug && window.reportBug({ msg: _msg });
    }
}(window);