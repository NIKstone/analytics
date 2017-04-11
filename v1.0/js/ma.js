/**
* 统计代码
* author : NIKstone (shitoubean@163.com)
* - v1.0
*/

(function() {

	var params = {};

	//Document对象数据
	if (document) {
		params.dh = document.domain || '';
		params.dl = document.URL || '';
		params.dt = document.title || '';
		params.ref = document.referrer || '';
	}

	params.ul = "other";
	try{
		var sysLanguage = navigator.language || navigator.browserLanguage;
		params.ul = sysLanguage.toLowerCase() || 'other';
	}catch(e){}

	//Window对象数据
	if (window && window.screen) {
		var sh = window.screen.height || 0;
		var sw = window.screen.width || 0;
		params.sr = sh + 'x' + sw;

		params.sd = ( window.screen.colorDepth || 0 ) + '-bit';
	}

	function getBodySize(){
		var ih = 0;
		var iw = 0;

		function findDimensions() {
			try{
				//获取窗口宽度 
				if (window.innerWidth)
					winWidth = window.innerWidth;
				else if ((document.body) && (document.body.clientWidth))
					winWidth = document.body.clientWidth;

				//获取窗口高度 
				if (window.innerHeight)
					winHeight = window.innerHeight;
				else if ((document.body) && (document.body.clientHeight))
					winHeight = document.body.clientHeight;
				//通过深入Document内部对body进行检测，获取窗口大小 
				if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
					winHeight = document.documentElement.clientHeight;
					winWidth = document.documentElement.clientWidth;
				}
				ih = winHeight;
				iw = winWidth;
			}catch(e){}
		}

		findDimensions();
		params.vp = ih + 'x' + iw;
	};
	
	getBodySize();

	function getBrowserInfo() {
		try{
			var agent = navigator.userAgent.toLowerCase();

			var regStr_ie = /msie [\d.a-zA-Z]+;/gi;
			var regStr_ff = /firefox\/[\d.]+/gi;
			var regStr_chrome = /chrome[a-zA-Z]*\/[\d.]+/gi;
			var regStr_saf = /safari\/[\d.]+/gi;
			var regStr_opr = /opr\/[\d.]+/gi;

			//IE11
			if( /trident\/([^;]+)/.test(agent) ){
		        if(/rv:([^\)]+)\)/.test(agent)){
		            return ( "msie/" + RegExp["$1"]);
		        }
		    }
			//IE
			if (agent.indexOf("msie") != -1) {
				return agent.match(regStr_ie);
			}

			//edge
			if (agent.indexOf("edge") != -1) {
				return agent.match(regStr_opr);
			}

			//firefox
			if (agent.indexOf("firefox") != -1) {
				return agent.match(regStr_ff);
			}

			//Opera
			if (agent.indexOf("opr") != -1) {
				return agent.match(regStr_opr);
			}

			//Safari
			if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") != -1) {
				return agent.match(regStr_saf);
			}

			//Chrome
			if (agent.indexOf("chrome") != -1) {
				return agent.match(regStr_chrome);
			}

			else {
				return "other";
			}
		}catch(e){}
	}
	params.brn = "other";
	params.brv = "other";
	var browser = getBrowserInfo();
	if ("other" != browser && "null" != browser && browser) {
		params.brn = (browser + "").split("\/")[0] || "other";
		params.brv = (browser + "").replace(/[^0-9._]/ig, "") || "other";
		if( -1 != params.brn.indexOf("msie")){
			params.brn = "ie";
		}
	}

	function pushParams(){
		//解析_maq配置
		if (_maq) {
			for (var i in _maq) {
				params[_maq[i][0]] = _maq[i][1] || "";
			}
		}
	};

	window.ma = {
		track:  function(type){
			if( type != 'register' && type != 'login') return;
			params.ea = type;
			requestImg();
		},
		getGenerateId: function(param_name) {
		    var generateId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		      return v.toString(16);
		    });
		    setCookie(param_name,generateId,'y2');
		    return generateId;
		},
		onAsClick: function(obj){
			if(!obj) return;
			params.ea = "click";
			params.cc = ( obj.x || 0 ) + 'x' + ( obj.y || 0 );
			requestImg();
		}
	};

	function windowOsName(){

        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        if(isWin) return "windows";
        
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "mac";
        
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) {
        	var isAndroid = navigator.userAgent.toLowerCase().match(/android/i) == "android";
        	return isAndroid ? "android" : "linux";
        }

        var isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
        if(isIos) return "ios";

        var isWp = /windows phone/.test(navigator.userAgent.toLowerCase());
        if(isWp) return "wp";
        
        return "other";
    };

    function windowOsVersion(){
    	var sUserAgent = navigator.userAgent;
        
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "2000";

        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "xp";

        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "2003";

        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "vista";

        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "7";
        
        var isWin8 = sUserAgent.indexOf("Windows NT 6.3") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8) return "8";

        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1;
        if (isWin10) return "10";

        var isIos = sUserAgent.match(/iPhone/i) || sUserAgent.match(/iPad/i) || sUserAgent.match(/iPod/i);
        if (isIos) { 
        	var _infoIos = sUserAgent.toLowerCase().match(/cpu [a-zA-Z]*\s?os [\d._]+/);
        	return (_infoIos+"").match(/[\d._]+/)+"";
        }

        var isMac = sUserAgent.indexOf("Mac OS X")> -1;
        if(isMac) {
        	var _str = sUserAgent.toLowerCase().match(/mac os x [\d._]+/);
        	return (_str + "").match(/[\d._]+/)+"";
        }

        var isAndroid = sUserAgent.match(/Android/i);
        if(isAndroid) {
        	var _infoAndorid = sUserAgent.toLowerCase().match(/android [a-zA-Z\d._]+/);
        	return ( _infoAndorid + "" ).match(/[\d._]+/)+"";
        }

        var isLinux = sUserAgent.match(/Linux/i);
        if(isLinux) {
        	var _infoLinux = sUserAgent.toLowerCase().match(/linux [a-zA-Z\d._]+/);
        	return ( _infoLinux + "" ).match(/[\d._]+/)+"";
        }

        return "other";
    };

    params.osn = "other";
    params.osv = "other";
    if("null" != windowOsName()){
    	params.osn = windowOsName() || "other";
    }
    if("null" != windowOsVersion()){
    	params.osv = windowOsVersion() || "other";
    }
    
	params.fli = "0";
    
    function flashChecker() {
	    var hasFlash = 0; //是否安装了flash
	    var flashVersion = 0; //flash版本
	    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	    var isIE = reIE.test(window.navigator.userAgent); //是否IE浏览器

	    if (isIE) {
	        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	        if (swf) {
	            hasFlash = 1; params.fli = "1";
	            flashVersion = swf.GetVariable("$version");
	            flashVersion = flashVersion.replace(/WIN/g, '').replace(/,/g, '.');
	        }
	    } else {
	        if (navigator.plugins && navigator.plugins.length > 0) {
	            var swf = navigator.plugins["Shockwave Flash"];
	            if (swf) {
	                hasFlash = 1; params.fli = "1";
	                flashVersion = swf.description
			            .replace(/([a-zA-Z]|\s)+/, "")
			            .replace(/(\s)+r/, ".") + ".0";
	            }
	        }
	    }
	    return flashVersion;
	};

	var flv = flashChecker();
	if(flv){
		params.fl = flv;
	}
	
	params.tid = getCookie('tid') || ma.getGenerateId('tid');

	function getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	};

	function delCookie(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null)
			document.cookie = name + "="+cval+";expires="+exp.toGMTString();
	};

	function setCookie(name,value,time){
		var strsec = getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	};

	//param: 's20','d20','h20','y20'
	function getsec(str){
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
	};

	if(window.addEventListener){
		window.addEventListener('click',function(e){

			params.cc = e.clientX+'x'+e.clientY;
			params.ea = 'click';
			requestImg();
		});
	}else if(document.attachEvent){
		document.attachEvent('onclick',function (e) {
			params.cc = e.clientX+'x'+e.clientY;
			params.ea = 'click';
			requestImg();
		});
	}

	function requestImg(){
		if(!params.ea) params.ea = 'pageview';
		pushParams();
		//拼接参数串
		var args = '';
		for (var i in params) {

			if (null != args){

				args += '&';

			}
			if(null != params[i]){
				var _val = params[i].replace(/(^\s*)|(\s*$)/g,"");
				args += i + '=' + encodeURIComponent(_val);
			}
		}

		//通过Image对象请求后端脚本
		var img = new Image(1, 1);
		var ma_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		var ma_ea = "view";
		switch(params.ea){
			case "pageview": break;
			case "click": ma_ea = "click"; break;
			case "login": ma_ea = "login"; break;
			case "register": ma_ea = "register"; break;
		}
		img.src = ma_protocol + 'analytics.52xiyou.com/'+ ma_ea +'.gif?' + args;
	};

	requestImg();

	function requestAjax(_url) {
		var obj = new XMLHttpRequest();
		obj.open('GET', _url, true);
		obj.onreadystatechange = function() {

		};
		obj.send(null);
	};
	
})(this);
