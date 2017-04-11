/**
* analytics for xiyou
* v2.0
* author: NIKstone (shitoubean@163/com)
*/
!function(){
	if(window.hasMo) return;
	var ua = navigator.userAgent;
	var platform = navigator.platform;
	var xiyou_analytics_domain = "https:" == document.location.protocol ? "https://track.xiyouence.com/" : "http://track.xiyouence.com/",
        xiyou_analytics_path = xiyou_analytics_domain + "mo.gif";
    var emptyFunction = function(){};
	window.console = window.console || (function() {
	    var c = {};
	    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
	    return c;
	})();

	var Util = {
		parseQueryString: function(qs){
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
								var value = (pair.length > 1) ? decodeURIComponent(pair[1]) : "true";
								paris[name] = value;
							} catch (e) {}
						}
					}
				}
			}
		},
		unParseQueryString: function(qs){
			var params = [], k, v;
			for(k in qs){
				if(!qs.hasOwnProperty || qs.hasOwnProperty(k)){
					v = qs[k];

					params.push(
						encodeURIComponent(k) + '=' + encodeURIComponent(v)
					);
				}
			}
			var _str = params.join("&");
			if(_str.length > 0) return "?" + _str;
			else return "";
		},
		getQueryString: function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) return unescape(r[2]);
		    return null;
		},
		parseUrl: function(url) {
			var l = document.createElement("a");
			l.href = url;
			if(l.host === "") {
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
					url.unParseQueryString(url.query) +
					(url.hash || "");
		},
		isString: function(str){
			return Object.prototype.toString.call(str) === "[object String]";
		},
		isArray: function(obj){
  			return Object.prototype.toString.call(obj) === '[object Array]';
		},
		parseString: function(str){
			return str.replace(/(^\s*)|(\s*$)/g,"").toLowerCase();
		},
		parseArray: function(_arr, _space){
			var arr = [];
			for(var i = 0; _val = _arr[i]; i++){
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
		getDevice: function(){

			var winWidth = 0, winHeight = 0;
			//获取窗口宽度 
			if (window.innerWidth)
				winWidth = window.innerWidth;
			else if (document.body && document.body.clientWidth)
				winWidth = document.body.clientWidth;

			//获取窗口高度 
			if (window.innerHeight)
				winHeight = window.innerHeight;
			else if (document.body && document.body.clientHeight)
				winHeight = document.body.clientHeight;
			//通过深入Document内部对body进行检测，获取窗口大小 
			if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
				winHeight = document.documentElement.clientHeight;
				winWidth = document.documentElement.clientWidth;
			}
			this.height = winHeight;
			this.width = winWidth;
		},
		getInfo: function(){
			var oThis = this;

			if(/MicroMessenger\/(\S+)/.test(ua) || /MQQBrowser\/(\S+)/.test(ua)){
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
		}
	};

	browser.getDevice();
	browser.getInfo();

	var web = {
		domain: document.domain || "",
		url: document.URL || "",
		title: document.title || "",
		pwu: window.parent.document.URL || "", 
		pwt: window.parent.document.title || "",
		ref: document.referrer && Util.parseUrl(document.referrer).hostname || "",
		hostname: document.location && document.location.hostname || "",
		getUrlData: function(){
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
		getDevice: function(){
			if (window && window.screen) {
				this.screen_height = window.screen.height || 0;
				this.screen_width = window.screen.width || 0;

				this.screen_colors = ( window.screen.colorDepth || 0 ) + '-bit';
			}
		},
		getInfo: function(){
			//平台、设备和操作系统
			var oThis = this, ua_lower = ua.toLowerCase();

			function parseVersion(version) {
		        version = version.toString();
		        var components = version.split('.');
		        var major = components.shift();
		        return parseFloat(major + '.' + components.join(''));
		    };

			var Version = function () {
		        this.initialize.apply(this, Array.prototype.slice.call(arguments));
		    };

		    Version.prototype = {
		        initialize: function (v) {
		            this.original = v.value || null;
		            this.alias = v.alias || null;  
		        }
		    };
			/*
			* Linux
			*/
			if(ua.match('Unix')){
				oThis.type = 'Unix';
			}
			if (ua_lower.match('freebsd')) {
                oThis.type = 'freebsd';
            }
            if (ua.match('OpenBSD')) {
                oThis.type = 'OpenBSD';
            }
            if (ua.match('NetBSD')) {
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
                        oThis.version = new Version({
                            value: match[1].replace(/_/g, '.')
                        });
                    }
                }

                if (ua.match('Debian')) {
                    oThis.type = 'Debian';
                }

                if (ua.match('Fedora')) {
                    oThis.type = 'Fedora';
                    if (match = /Fedora\/[0-9\.\-]+fc([0-9]+)/.exec(ua)) {
                        oThis.version = new Version({
                            value: match[1]
                        });
                    }
                }

                if (ua.match('Gentoo')) {
                    oThis.type = 'Gentoo';
                }

                if (ua.match('Kubuntu')) {
                    oThis.type = 'Kubuntu';
                }

                if (ua.match('Mandriva Linux')) {
                    oThis.type = 'Mandriva';
                    if (match = /Mandriva Linux\/[0-9\.\-]+mdv([0-9]+)/.exec(ua)) {
                        oThis.version = new Version({
                            value: match[1]
                        });
                    }
                }

                if (ua.match('Mageia')) {
                    oThis.type = 'Mageia';
                    if (match = /Mageia\/[0-9\.\-]+mga([0-9]+)/.exec(ua)) {
                        oThis.version = new Version({
                            value: match[1]
                        });
                    }
                }

                if (ua.match('Red Hat')) {
                    oThis.type = 'Red Hat';
                    if (match = /Red Hat[^\/]*\/[0-9\.\-]+el([0-9_]+)/.exec(ua)) {
                        oThis.version = new Version({
                            value: match[1].replace(/_/g, '.')
                        });
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
                        oThis.version = new Version({
                            value: match[1]
                        });
                    }
                }
            }
            if (ua.match('iPhone( Simulator)?;') || ua.match('iPad;') || ua.match('iPod;')) {
                oThis.type = 'iOS';
                oThis.version = new Version({
                    value: '1.0'
                });

                if (match = /OS (.*) like Mac OS X/.exec(ua)) {
                    oThis.version = new Version({
                        value: match[1].replace(/_/g, '.')
                    });
                }
			} else if (ua.match('Mac OS X')) {

				oThis.type = 'Mac OS X';

				if (match = /Mac OS X (10[0-9\._]*)/.exec(ua)) {
					oThis.version = new Version({
						value: match[1].replace(/_/g, '.')
					});
				}
			}

			 /*
             *      Windows
             */

            if (ua.match('Windows')) {
                oThis.type = 'Windows';

                if (match = /Windows NT ([0-9]\.[0-9])/.exec(ua)) {
                    oThis.version = parseVersion(match[1]);

                    switch (match[1]) {
                    	case '10.0':
                            oThis.version = new Version({
                                value: match[1],
                                alias: '10'
                            });
                            break;
                    	case '6.4':
                            oThis.version = new Version({
                                value: match[1],
                                alias: '10'
                            });
                            break;
                    	case '6.3':
                            oThis.version = new Version({
                                value: match[1],
                                alias: '8.1'
                            });
                            break;
                        case '6.2':
                            oThis.version = new Version({
                                value: match[1],
                                alias: '8'
                            });
                            break;
                        case '6.1':
                            oThis.version = new Version({
                                value: match[1],
                                alias: '7'
                            });
                            break;
                        case '6.0':
                            oThis.version = new Version({
                                value: match[1],
                                alias: 'Vista'
                            });
                            break;
                        case '5.2':
                            oThis.version = new Version({
                                value: match[1],
                                alias: 'Server 2003'
                            });
                            break;
                        case '5.1':
                            oThis.version = new Version({
                                value: match[1],
                                alias: 'XP'
                            });
                            break;
                        case '5.0':
                            oThis.version = new Version({
                                value: match[1],
                                alias: '2000'
                            });
                            break;
                        default:
                            oThis.version = new Version({
                                value: match[1],
                                alias: 'NT ' + oThis.version
                            });
                    }
                }
                if (ua.match('Windows 95') || ua.match('Win95') || ua.match('Win 9x 4.00')) {
                    oThis.version = new Version({
                        value: '4.0',
                        alias: '95'
                    });
                }

                if (ua.match('Windows 98') || ua.match('Win98') || ua.match('Win 9x 4.10')) {
                    oThis.version = new Version({
                        value: '4.1',
                        alias: '98'
                    });
                }

                if (ua.match('Windows ME') || ua.match('WinME') || ua.match('Win 9x 4.90')) {
                    oThis.version = new Version({
                        value: '4.9',
                        alias: 'ME'
                    });
                }

                if (ua.match('Windows XP') || ua.match('WinXP')) {
                    oThis.type = new Version({
                        value: '5.1',
                        alias: 'XP'
                    });
                }

                if (ua.match('WP7')) {
                    oThis.type = 'Windows Phone';
                    oThis.version = new Version({
                        value: '7.0',
                        details: 2
                    });
                }

                if (ua.match('Windows CE') || ua.match('WinCE') || ua.match('WindowsCE')) {
                    if (ua.match(' IEMobile')) {
                        oThis.type = 'Windows Mobile';

                        if (ua.match(' IEMobile 8')) {
                            oThis.version = new Version({
                                value: '6.5',
                                details: 2
                            });
                        }

                        if (ua.match(' IEMobile 7')) {
                            oThis.version = new Version({
                                value: '6.1',
                                details: 2
                            });
                        }

                        if (ua.match(' IEMobile 6')) {
                            oThis.version = new Version({
                                value: '6.0',
                                details: 2
                            });
                        }
                    } else {
                        oThis.type = 'Windows CE';

                        if (match = /WindowsCEOS\/([0-9.]*)/.exec(ua)) {
                            oThis.version = new Version({
                                value: match[1],
                                details: 2
                            });
                        }

                        if (match = /Windows CE ([0-9.]*)/.exec(ua)) {
                            oThis.version = new Version({
                                value: match[1],
                                details: 2
                            });
                        }
                    }
                }

                if (ua.match('Windows Mobile')) {
                    oThis.type = 'Windows Mobile';
                }

                if (match = /WindowsMobile\/([0-9.]*)/.exec(ua)) {
                    oThis.type = 'Windows Mobile';
                    oThis.version = new Version({
                        value: match[1],
                        details: 2
                    });
                }

                if (ua.match('Windows Phone')) {
                    oThis.type = 'Windows Mobile';
                    oThis.version = new Version({
                        value: ua.match(/Windows Phone ([0-9.]*)/)[1],
                        details: 2
                    });
                }

                if (ua.match('Windows Phone OS')) {
                    oThis.type = 'Windows Phone';
                    oThis.version = new Version({
                        value: ua.match(/Windows Phone OS ([0-9.]*)/)[1],
                        details: 2
                    });

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
                oThis.version = null;

                if (match = /Android(?: )?(?:AllPhone_|CyanogenMod_)?(?:\/)?v?([0-9.]+)/.exec(ua.replace('-update', '.'))) {
                    oThis.version = new Version({
                        value: match[1],
                        details: 3
                    })
                }

                if (ua.match('Android Eclair')) {
                    oThis.version = new Version({
                        value: '2.0',
                        details: 3
                    });
                }
            }

            /**
             *      Google TV
             */

            if (ua.match('GoogleTV')) {
                oThis.type = 'Google TV';

                if (ua.match('Chrome/5.')) {
                    oThis.version = new Version({
                        value: '1'
                    });
                }

                if (ua.match('Chrome/11.')) {
                    oThis.version = new Version({
                        value: '2'
                    });
                }

                this.device.type = 'television';
            }

            /**
             *      WoPhone
             */

            if (ua.match('WoPhone')) {
                oThis.type = 'WoPhone';

                if (match = /WoPhone\/([0-9\.]*)/.exec(ua)) {
                    oThis.version = new Version({
                        value: match[1]
                    });
                }
            }

            /**
             *      BlackBerry
             */

            if (ua.match('BlackBerry') || ua.match('BB10')) {
                oThis.type = 'BlackBerry OS';

                if (!ua.match('Opera')) {
                    if (match = /BlackBerry([0-9]*)\/([0-9.]*)/.exec(ua)) {
                        oThis.version = new Version({
                            value: match[2],
                            details: 2
                        });
                    }

                    if (match = /Version\/([0-9.]*)/.exec(ua)) {
                        oThis.version = new Version({
                            value: match[1],
                            details: 2
                        });
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
                oThis.version = new Version({
                    value: ua.match(/RIM Tablet OS ([0-9.]*)/)[1],
                    details: 2
                });
            } else if (ua.match('PlayBook')) {
                if (match = /Version\/(10[0-9.]*)/.exec(ua)) {
                    oThis.type = 'BlackBerry';
                    oThis.version = new Version({
                        value: match[1],
                        details: 2
                    });
                }
            }

		}
	};

	system.getDevice();
	system.getInfo();

	var flash = {
		flash_install: false,
		flash_version: "",
		fancy3d: false,
		getInfo: function(){
			var hasFlash = 0; //是否安装了flash
		    var flashVersion = 0; //flash版本
		    var isIE = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/.test(ua.toLowerCase()); //是否IE浏览器

		    if (isIE) {
		    	try {
			        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			        if (swf) {
			            hasFlash = 1;
			            flashVersion = swf.GetVariable("$version");
			            flashVersion = flashVersion.replace(/WIN/g, '').replace(/,/g, '.');
			        }
			    } catch(e){ }
		    } else {
		        if (navigator.plugins && navigator.plugins.length > 0) {
		            var swf = navigator.plugins["Shockwave Flash"];
		            if (swf) {
		                hasFlash = 1;
		                flashVersion = swf.description
				            .replace(/([a-zA-Z]|\s)+/, "")
				            .replace(/(\s)+r/, ".") + ".0";
		            }
		        }
		    }

		    if(hasFlash) this.flash_install = true;
		    if(flashVersion) this.flash_version = flashVersion;

			if (!isIE) {
				try {
					navigator.plugins.refresh(false);
					for (var m in window.navigator.mimeTypes) {
						if (window.navigator.mimeTypes[m].type == 'application/fancy-npruntime-fancy3d-plugin') {
							this.fancy3d = true;
						}
					}
				} catch (e) {
					this.fancy3d = false;
				}
			} else {
				try {
					new ActiveXObject("FANCY3DOCX.Fancy3DOCXCtrl.1");
					this.fancy3d = true;
				} catch (e) {
					this.fancy3d = false;
				}
			}
		}
	};

	flash.getInfo();

	var Cookie = {
		set: function(name,value,time){
			var strsec = this.getSec(time);
			var exp = new Date();
			exp.setTime(exp.getTime() + strsec*1);
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		},
		del: function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=getCookie(name);
			if(cval!=null)
				document.cookie = name + "="+cval+";expires="+exp.toGMTString();
		},
		get: function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		getSec: function(str){//param: 's20','d20','h20','y20'
			var str1=str.substring(1,str.length)*1;
			var str2=str.substring(0,1);
			if (str2=="s"){
				return str1*1000;
			}
			else if (str2=="h"){
				return str1*60*60*1000;
			}
			else if (str2=="d"){
				return str1*24*60*60*1000;
			}else if(str2=="y"){
				return str1*365*24*60*60*1000;
			}
		}
	};

	/**
	* 用于向服务器发出请求的对象。
	*/
	var Ajax = function(){
		var oThis = this;
		/**
		* 发送请求。
		* @param url {String} 发送请求的地址。
		* @param param {String} 发送请求的参数串。
		* @param callback {Function} 回调函数。
		* @param _ioo {Boolean}
		*/
        oThis.send = function(url, param, callback, _ioo){
            if(param["length"] <= 2036 || _ioo){
                oThis.sendByImage(url + "?" + param, callback);
            }else {
                oThis.Send(param, callback); 
            }
        };
		/**
        * 使用图片对象发出请求。
        * @param src {String} 组装完毕的图片的地址。
        * @param callback {Function} 回调函数。
        */
        oThis.sendByImage = function(src, callback){
            var image = new Image(1, 1);
            image.onload = function(){
                image = null;
                (callback || emptyFunction)();
            };
            image.src = src;
        };

        /**
        * 根据情况使用XMLHttpRequest或iframe对象发出请求。
        * @param param {String} 发送请求的参数串。
        * @param callback {Function} 回调函数。
        */
        oThis.Send = function(param, callback){
            oThis.sendByRequest(param, callback);
        };
        /**
         * 使用XMLHttpRequest对象发出请求。
         * @param param {String} 发送请求的参数串。
         * @param callback {Function} 回调函数。
         */
        oThis.sendByRequest = function(param, callback){
            var request,
                Request = window.XDomainRequest;
            if(Request){
                request = new Request;
                request.open("GET", xiyou_analytics_path + "?" + param);
            }else if(Request = window.XMLHttpRequest){
                Request = new Request;
                if("withCredentials" in Request){
                    request = Request;
                    request.open("GET", xiyou_analytics_path + "?" + param, true);
                    request.setRequestHeader("Content-Type", "text/plain");
                }
            }
            if(request){
                request.onreadystatechange = function(){
                    if(request.readyState == 4){
                        callback && callback();
                        request = null;
                    }
                };
                request.send();
                return true;
            }
            return false;
        };
	};

	var ma = {
		startTime: (new Date()).getTime(),
		params: {
			"ic": "pageview",	//事件类型
			"osn": system.type, // 操作系统类型（mac、windows、ios、linux、Android）
			"osv": system.version.alias || system.version.original || system.version, //操作系统版本
			"brn": browser.type, //浏览器类型（chrome、ie、safri、opera、Firefox）
			"brv": browser.version, //浏览器版本号
			"sr": system.screen_width + "x" + system.screen_height	//系统分辨率
		},
		commonParams: {
			
		},
		paramStack: [],
		/*
		* 页面点击事件
		* @param _sendType{String} 点击事件名：PosterClick,MaterialClick...
		* @param _coordinate{String} 点击坐标(x坐标+“x”+y坐标)
		*/
		onPageClick: function(_sendType, _coordinate){
			this.params.ic = _sendType || "click";
			var curTime = (new Date()).getTime(),
				click_delayed = Math.floor(( curTime - this.startTime ) / 1000);
			this.requestInfo([
				["cc", _coordinate + ""],
				["cd", click_delayed + ""]
			]);
		},
		pushParams: function(){
			//解析_maq配置
			var paramStack = this.paramStack;
			for(var i = 0; i < paramStack["length"]; i++){
				this.params[paramStack[i][0]] = paramStack[i][1] + "";
			}
		},
		putParams: function(_key){
			//删除参数，仅允许删除自定义参数，公共参数不允许删除
			var paramStack = this.paramStack;
			for(var i = 0; _val = paramStack[i]; i++){
				if(_key && ( _val[0] == _key ) ){
					this.paramStack.splice(i, 1);
					delete this.params[_key];
				}	
			}
		},
		objToArray: function(obj, array){
			/* 序列化参数 Object -> Array
			* @param obj { Object } 需要序列化的对象
			* @param array { Array } 返回的数组
			*/
			var _obj = obj || {}, _array = array;
			for( var key in _obj){
				var _key = encodeURIComponent(key + ""),
					_value = encodeURIComponent(obj[key] + "");
				_array.push(_key + "=" + _value);
			}
			return _array;
		},
		checkSendCommon: function(){
			var type = this.params.ic || "";
			var sendArray = ["materialvisit", "postervisit", "mapostervisit", "mopostervisit"];
			return sendArray.indexOf(type.toLowerCase()) > -1;
		},
		/*发送统计请求
		* @param param { Array } 参数数组 [[key, value], [key, value]],自定义参数上传，仅当次有效
		*/
		requestInfo: function(param){ 
			var oThis = this;
			oThis.pushParams();

			var params = oThis.params, arr_req = [];

			arr_req = oThis.objToArray(params, arr_req);

			var sendCommon = oThis.checkSendCommon();
			
			if(!!sendCommon){
				var commonParams = oThis.commonParams;
				arr_req = oThis.objToArray(commonParams, arr_req);
			}else {
				arr_req.push("_tt="+(new Date()).getTime());
			}

			//额外参数拼接
			if(param && Util.isArray(param)){
				var arr_ext = [];
				for (var j = 0; _param = param[j]; j++) {
					if(_param[0]){
						var exstr = encodeURIComponent(_param[0]) + "=" + encodeURIComponent(_param[1] + "");
						arr_ext.push(exstr);
					}
				}
				arr_req.push(arr_ext.join("&"));
			}

			var str_req = arr_req.join("&");

			function ajaxImg(_src){
				var _img = new Image(1,1);
				_img.onload = function(){
					_img = null;
				};
				_img.src = _src || "";
			};

			//通过Image对象请求后端脚本
			var ajax = new Ajax();
			ajaxImg("//down.xiyouence.com/index/statisticstmp?type=3&opt1=send_before&paid="+(params["paid"] || "")+"&opt2="+(params["ic"] || ""));
			ajax.send(xiyou_analytics_path, str_req, function(){
				//发送成功后回调函数
				ajaxImg("//down.xiyouence.com/index/statisticstmp?type=4&opt1=send_after&paid="+(params["paid"] || "")+"&opt2="+(params["ic"] || ""));
			}, false);
		}
	};

	function myOnload(){
		/*
		* js文件加载完成之前，window._ma接收所有事件到队列，存储在window.ma.q。
		*/
		var maq = window._ma.q || [];
		for(var i = 0; _val = maq[i]; i++){
			setTracker(_val);
		}
		/*
		* JS 文件加载完成
		* 改写window._ma 方法, 接收事件触发。
		*/
		window._ma = function(){
			var arg = arguments || '';
			if(arg && arg[0]){
				setTracker(arg);
			}
		};

		function setTracker(_val){
			var oThis = this,
				pList = _val || [];

			oThis["create"] = function(){
				var _key = pList[1] || "",
					_value = pList[2] || ""; 
				_key && ma.paramStack.push([_key, _value]);
			};

			oThis["send"] = function(){
				var send_type = pList[1] || "",
					param = pList[2] || [];

				if("pageclick" == send_type){
					pageClick(pList[2] + "");
					return;
				}

				send_type && ( ma.params.ic = send_type, ma.requestInfo(param.length && param));
			};

			oThis["clear"] = function(){
				var _keys = pList[1];
				if(_keys){
					if( _keys && Util.isArray(_keys) ) {
						for( var j = 0; j < _keys.length; j++ ){
							_keys[j] && ma.putParams(_keys[j]);
						}
					}else {
						ma.putParams(_keys);
					}
				}
			};

			oThis["trackEvent"] = function(){
				var category = pList[1] || "",
					action = pList[2] || "";
				var trackArr = [
					["cat", category],
					["act", action]
				];

				if (Util.isArray(pList[3])) {
					pushTrackArr(pList[3]);
				} else {
					trackArr.push(["des", pList[3] ? ( pList[3] + "" ) : ""]);
					pushTrackArr(pList[4] || []);
				}
				ma.params.ic = 'TrackEvent';
				ma.requestInfo(trackArr);

				function pushTrackArr(trackExtra){
					for (var i = 0; _ext = trackExtra[i]; i++) {
						if(Util.isArray(_ext) && _ext.length > 1){
							trackArr.push(_ext);
						}
					}
				};
			};
			
			if(pList[0] && oThis[pList[0]]){
				new oThis[pList[0]];
			}

			//页面点击事件统计
			pageClick = function(_sendType){
				if(window.addEventListener){
					window.addEventListener('click', function(e){
						var _clientX = e.clientX || 0,
							_clientY = e.clientY || 0;
						ma.onPageClick(_sendType, _clientX + "" + "x" + _clientY + "");
					});
				}else if(document.attachEvent){
					document.attachEvent('onclick', function (e) {
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
}(window);
