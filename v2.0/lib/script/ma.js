/**
* analytics for xiyou
* v2.0
* author: NIKstone (shitoubean@163/com)
*/

!function(){
	if(window.hasMa) return;
	var ua = navigator.userAgent;
	var platform = navigator.platform;

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
			//呈现引擎
			var engine = {
				ie: 0,
				gecko: 0,
				webkit: 0,
				khtml: 0,
				opera: 0,

				//完整的版本号
				ver: null
			};

			//浏览器
			var browser = {
				//常见浏览器
				ie: 0,
				firefox: 0,
				safari: 0,
				konq: 0,
				opera: 0,
				chrome: 0,

				//具体的版本号
				ver: null
			};

			//检测呈现引擎和浏览器
			if (window.opera) {
				engine.ver = browser.ver = window.opera.version();
				engine.opera = browser.opera = parseFloat(engine.ver);
			} else if (/AppleWebKit\/(\S+)/.test(ua)) {
				engine.ver = RegExp["$1"];
				engine.webkit = parseFloat(engine.ver);

				//确定是Chrome还是Safari, 2013年开始，opera放弃自家内核改用webkit，这里也判定为chrome，包括其他2345，QQbrowser，猎豹，UC等等
				if (/Chrome\/(\S+)/.test(ua)) {
					browser.ver = RegExp["$1"];
					browser.chrome = parseFloat(browser.ver);
				} else if (/Version\/(\S+)/.test(ua)) {
					browser.ver = RegExp["$1"];
					browser.safari = parseFloat(browser.ver);
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

					browser.safari = browser.ver = safariVersion;
				}
			} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
				engine.ver = browser.ver = RegExp["$1"];
				engine.khtml = browser.konq = parseFloat(engine.ver);
			} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
				engine.ver = RegExp["$1"];
				engine.gecko = parseFloat(engine.ver);

				//确定是不是Firefox
				if (/Firefox\/(\S+)/.test(ua)) {
					browser.ver = RegExp["$1"];
					browser.firefox = parseFloat(browser.ver);
				}
			} else if (/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/.test(ua.toLowerCase())) {
				engine.ver = browser.ver = RegExp["$1"];
				engine.ie = browser.ie = parseFloat(engine.ver);
			}

			//确定浏览器
			browser.ie = engine.ie;
			browser.opera = engine.opera;

			if(browser.ie){
				this.type = "ie";
				this.version = browser.ver;
			}
			if(browser.firefox){
				this.type = "firefox";
				this.version = browser.ver;
			}
			if(browser.safari){
				this.type = "safari";
				this.version = browser.ver;
			}
			if(browser.opera){
				this.type = "opera";
				this.version = browser.ver;
			}
			if(browser.chrome){
				this.type = "chrome";
				this.version = browser.ver;
			}

			if(engine.ie){
				this.engine_type = "ie";
				this.engine_version = engine.ver;
			}
			if(engine.gecko){
				this.engine_type = "gecko";
				this.engine_version = engine.ver;
			}
			if(engine.webkit){
				this.engine_type = "webkit";
				this.engine_version = engine.ver;
			}
			if(engine.khtml){
				this.engine_type = "khtml";
				this.engine_version = engine.ver;
			}
			if(engine.opera){
				this.engine_type = "opera";
				this.engine_version = engine.ver;
			}
		}
	};

	browser.getDevice();
	browser.getInfo();

	var web = {
		domain: document.domain || "localhost",
		url: document.URL || "",
		title: document.title || "",
		ref: ( document.referrer && document.referrer.match(/^(http[s]?:\/\/)?([^\/]+)(.*)/)[2] ) || ""
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
			var system = {
				win: false,
				mac: false,
				x11: false,

				//移动设备
				iphone: false,
				ipod: false,
				ipad: false,
				ios: false,
				android: false,
				nokiaN: false,
				winMobile: false,

				//游戏系统
				wii: false,
				ps: false
			};


			//检测平台
			var p = navigator.platform;
			system.win = p.indexOf("Win") == 0;
			system.mac = p.indexOf("Mac") == 0;
			system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

			//检测Windows操作系统
			if (system.win) {
				if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
					if (RegExp["$1"] == "NT") {
						switch (RegExp["$2"]) {
							case "5.0":
								system.win = "2000";
								break;
							case "5.1":
								system.win = "XP";
								break;
							case "6.0":
								system.win = "Vista";
								break;
							case "6.1":
								system.win = "7";
								break;
							case "6.2":
								system.win = "8";
								break;
							case "6.3":
								system.win = "8.1";
								break;
							case "10.0":
								system.win = "10";
								break;
							default:
								system.win = "NT";
								break;
						}
					} else if (RegExp["$1"] == "9x") {
						system.win = "ME";
					} else {
						system.win = RegExp["$1"];
					}
				}
			}

			//移动设备
			system.iphone = ua.indexOf("iPhone") > -1;
			system.ipod = ua.indexOf("iPod") > -1;
			system.ipad = ua.indexOf("iPad") > -1;
			system.nokiaN = ua.indexOf("NokiaN") > -1;

			//windows 移动设备
			if (system.win == "CE") {
				system.winMobile = system.win;
			} else if (system.win == "Ph") {
				if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
					system.win = "Phone";
					system.winMobile = RegExp["$1"];
				}
			}

			if(system.mac) {
				if(/Mac OS X (\S+)\)/.test(ua)) {
					system.mac = RegExp.$1.replace("_", ".");
				}
			}

			//检测IOS版本
			if (system.iphone || system.ipod || system.ipad) {
				if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
					system.ios = RegExp.$1.replace("_", ".");
				} else {
					system.ios = 2; //不能真正测出来，所以只能猜测
				}
			}

			//检测Android版本
			if (/Android (\d+\.\d+)/.test(ua)) {
				system.android = RegExp.$1;
			}

			if(system.x11 && /Linux ([a-zA-Z\d._]+)/.test(system.x11)){
				system.x11 = RegExp["$1"];
			}

			//游戏系统
			system.wii = ua.indexOf("Wii") > -1;
			system.ps = /playstation/i.test(ua);

			if(system.x11) {
				this.type = "linux";
				this.version = system.x11;
			}
			if(system.android) {
				this.type = "android";
				this.version = system.android;
			}
			if(system.mac) {
				this.type = "mac";
				this.version = system.mac;
			}
			if(system.iphone || system.ipod || system.ipad) {
				this.type = "ios";
				this.version = system.ios;
			}
			if(system.win) {
				this.type = "windows";
				this.version = system.win;
			}
			if(system.winMobile) {
				this.type = "wp";
				this.version = system.winMobile;
			}

			if(navigator){
				this.language = navigator.language || navigator.browserLanguage || "other";
			}
		}
	};

	system.getDevice();
	system.getInfo();

	var flash = {
		flash_install: "0",
		flash_version: "",
		getInfo: function(){
			var hasFlash = 0; //是否安装了flash
		    var flashVersion = 0; //flash版本
		    var isIE = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/.test(ua.toLowerCase()); //是否IE浏览器

		    if (isIE) {
		        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		        if (swf) {
		            hasFlash = 1;
		            flashVersion = swf.GetVariable("$version");
		            flashVersion = flashVersion.replace(/WIN/g, '').replace(/,/g, '.');
		        }
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

		    if(hasFlash) this.flash_install = "1";
		    if(flashVersion) this.flash_version = flashVersion;
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
	
	var ma = {
		params: {
			"ea": "pageview",
			"sr": system.screen_height + "x" + system.screen_width,
			"vp": browser.height + "x" + browser.width,
			"sd": system.screen_colors,
			"ul": system.language,
			"fli": flash.flash_install,
			"fl": flash.flash_version,
			"dl": web.url,
			"ref": web.ref,
			"dh": web.domain,
			"dt": web.title,
			"osn": system.type,
			"osv": system.version,
			"brn": browser.type,
			"brv": browser.version
		},
		onPageClick: function(){
			if(window.addEventListener){
				window.addEventListener('click',function(e){
					this.params.cc = e.clientX+'x'+e.clientY;
					this.params.ea = 'click';
					this.requestImg();
				});
			}else if(document.attachEvent){
				document.attachEvent('onclick',function (e) {
					this.params.cc = e.clientX+'x'+e.clientY;
					this.params.ea = 'click';
					this.requestImg();
				});
			}
		},
		getGenerateId: function(param_name) {
		    var generateId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		      return v.toString(16);
		    });
		    Cookie.set(param_name,generateId,'y2');
		    return generateId;
		},
		pushParams: function(){
			//解析_maq配置
			if (window._maq) {
				for (var i in window._maq) {
					eval("this.params." + window._maq[i][0] + "=\'" + ( window._maq[i][1] + "" ) +"\'");
				}
			}
		},
		requestImg: function(){
			this.params.tid = Cookie.get('tid') || this.getGenerateId('tid');
			this.pushParams();
			//拼接参数串
			var args = '';
			for (var i in this.params) {
				if (args){
					args += '&';
				}
				if(null != this.params[i]){
					var _val = (this.params[i]+"").replace(/(^\s*)|(\s*$)/g,"").toLowerCase();
					args += i + '=' + encodeURIComponent(_val);
				}
			}

			//通过Image对象请求后端脚本
			var img = new Image(1, 1);
			var ma_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
			var ma_ea = "view";
			switch(this.params.ea){
				case "pageview": break;
				case "click": ma_ea = "click"; break;
				case "login": ma_ea = "login"; break;
				case "register": ma_ea = "register"; break;
			}
			img.src = ma_protocol + 'analytics.52xiyou.com/'+ ma_ea +'.gif?' + args;
		},
		requestAjax: function(_url){
			var obj = new XMLHttpRequest();
			obj.open('GET', _url, true);
			obj.onreadystatechange = function() {};
			obj.send(null);
		}
	};

	ma.requestImg();

	//暴露给外部调用。注册、登录、flash调用点击事件
	window.ma = {
		track:  function(type){
			if( type != 'register' && type != 'login') return;
			ma.params.ea = type;
			ma.requestImg();
		},
		onAsClick: function(obj){
			if(!obj) return;
			ma.params.ea = "click";
			ma.params.cc = ( obj.x || 0 ) + 'x' + ( obj.y || 0 );
			ma.requestImg();
		}
	};

	window.hasMa = 1;
}();
