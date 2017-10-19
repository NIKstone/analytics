(function() {
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
  };
  var t = {
    chrsz: 8,
    hexcase: 0,
    binl2hex: function(t) {
      var i = this.hexcase ? "0123456789ABCDEF": "0123456789abcdef";
      var e = "";
      for (var n = 0; n < t.length * 4; n++) {
        e += i.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + i.charAt(t[n >> 2] >> n % 4 * 8 & 15)
      }
      return e
    },
    str2binl: function(t) {
      var i = Array();
      var e = (1 << this.chrsz) - 1;
      for (var n = 0; n < t.length * this.chrsz; n += this.chrsz) i[n >> 5] |= (t.charCodeAt(n / this.chrsz) & e) << n % 32;
      return i
    },
    md5_cmn: function(t, i, e, n, s, r) {
      return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(i, t), this.safe_add(n, r)), s), e)
    },
    md5_ff: function(t, i, e, n, s, r, h) {
      return this.md5_cmn(i & e | ~i & n, t, i, s, r, h)
    },
    md5_gg: function(t, i, e, n, s, r, h) {
      return this.md5_cmn(i & n | e & ~n, t, i, s, r, h)
    },
    md5_hh: function(t, i, e, n, s, r, h) {
      return this.md5_cmn(i ^ e ^ n, t, i, s, r, h)
    },
    md5_ii: function(t, i, e, n, s, r, h) {
      return this.md5_cmn(e ^ (i | ~n), t, i, s, r, h)
    },
    safe_add: function(t, i) {
      var e = (t & 65535) + (i & 65535);
      var n = (t >> 16) + (i >> 16) + (e >> 16);
      return n << 16 | e & 65535
    },
    bit_rol: function(t, i) {
      return t << i | t >>> 32 - i
    },
    core_md5: function(t, i) {
      t[i >> 5] |= 128 << i % 32;
      t[(i + 64 >>> 9 << 4) + 14] = i;
      var e = 1732584193;
      var n = -271733879;
      var s = -1732584194;
      var r = 271733878;
      for (var h = 0; h < t.length; h += 16) {
        var a = e;
        var d = n;
        var o = s;
        var m = r;
        e = this.md5_ff(e, n, s, r, t[h + 0], 7, -680876936);
        r = this.md5_ff(r, e, n, s, t[h + 1], 12, -389564586);
        s = this.md5_ff(s, r, e, n, t[h + 2], 17, 606105819);
        n = this.md5_ff(n, s, r, e, t[h + 3], 22, -1044525330);
        e = this.md5_ff(e, n, s, r, t[h + 4], 7, -176418897);
        r = this.md5_ff(r, e, n, s, t[h + 5], 12, 1200080426);
        s = this.md5_ff(s, r, e, n, t[h + 6], 17, -1473231341);
        n = this.md5_ff(n, s, r, e, t[h + 7], 22, -45705983);
        e = this.md5_ff(e, n, s, r, t[h + 8], 7, 1770035416);
        r = this.md5_ff(r, e, n, s, t[h + 9], 12, -1958414417);
        s = this.md5_ff(s, r, e, n, t[h + 10], 17, -42063);
        n = this.md5_ff(n, s, r, e, t[h + 11], 22, -1990404162);
        e = this.md5_ff(e, n, s, r, t[h + 12], 7, 1804603682);
        r = this.md5_ff(r, e, n, s, t[h + 13], 12, -40341101);
        s = this.md5_ff(s, r, e, n, t[h + 14], 17, -1502002290);
        n = this.md5_ff(n, s, r, e, t[h + 15], 22, 1236535329);
        e = this.md5_gg(e, n, s, r, t[h + 1], 5, -165796510);
        r = this.md5_gg(r, e, n, s, t[h + 6], 9, -1069501632);
        s = this.md5_gg(s, r, e, n, t[h + 11], 14, 643717713);
        n = this.md5_gg(n, s, r, e, t[h + 0], 20, -373897302);
        e = this.md5_gg(e, n, s, r, t[h + 5], 5, -701558691);
        r = this.md5_gg(r, e, n, s, t[h + 10], 9, 38016083);
        s = this.md5_gg(s, r, e, n, t[h + 15], 14, -660478335);
        n = this.md5_gg(n, s, r, e, t[h + 4], 20, -405537848);
        e = this.md5_gg(e, n, s, r, t[h + 9], 5, 568446438);
        r = this.md5_gg(r, e, n, s, t[h + 14], 9, -1019803690);
        s = this.md5_gg(s, r, e, n, t[h + 3], 14, -187363961);
        n = this.md5_gg(n, s, r, e, t[h + 8], 20, 1163531501);
        e = this.md5_gg(e, n, s, r, t[h + 13], 5, -1444681467);
        r = this.md5_gg(r, e, n, s, t[h + 2], 9, -51403784);
        s = this.md5_gg(s, r, e, n, t[h + 7], 14, 1735328473);
        n = this.md5_gg(n, s, r, e, t[h + 12], 20, -1926607734);
        e = this.md5_hh(e, n, s, r, t[h + 5], 4, -378558);
        r = this.md5_hh(r, e, n, s, t[h + 8], 11, -2022574463);
        s = this.md5_hh(s, r, e, n, t[h + 11], 16, 1839030562);
        n = this.md5_hh(n, s, r, e, t[h + 14], 23, -35309556);
        e = this.md5_hh(e, n, s, r, t[h + 1], 4, -1530992060);
        r = this.md5_hh(r, e, n, s, t[h + 4], 11, 1272893353);
        s = this.md5_hh(s, r, e, n, t[h + 7], 16, -155497632);
        n = this.md5_hh(n, s, r, e, t[h + 10], 23, -1094730640);
        e = this.md5_hh(e, n, s, r, t[h + 13], 4, 681279174);
        r = this.md5_hh(r, e, n, s, t[h + 0], 11, -358537222);
        s = this.md5_hh(s, r, e, n, t[h + 3], 16, -722521979);
        n = this.md5_hh(n, s, r, e, t[h + 6], 23, 76029189);
        e = this.md5_hh(e, n, s, r, t[h + 9], 4, -640364487);
        r = this.md5_hh(r, e, n, s, t[h + 12], 11, -421815835);
        s = this.md5_hh(s, r, e, n, t[h + 15], 16, 530742520);
        n = this.md5_hh(n, s, r, e, t[h + 2], 23, -995338651);
        e = this.md5_ii(e, n, s, r, t[h + 0], 6, -198630844);
        r = this.md5_ii(r, e, n, s, t[h + 7], 10, 1126891415);
        s = this.md5_ii(s, r, e, n, t[h + 14], 15, -1416354905);
        n = this.md5_ii(n, s, r, e, t[h + 5], 21, -57434055);
        e = this.md5_ii(e, n, s, r, t[h + 12], 6, 1700485571);
        r = this.md5_ii(r, e, n, s, t[h + 3], 10, -1894986606);
        s = this.md5_ii(s, r, e, n, t[h + 10], 15, -1051523);
        n = this.md5_ii(n, s, r, e, t[h + 1], 21, -2054922799);
        e = this.md5_ii(e, n, s, r, t[h + 8], 6, 1873313359);
        r = this.md5_ii(r, e, n, s, t[h + 15], 10, -30611744);
        s = this.md5_ii(s, r, e, n, t[h + 6], 15, -1560198380);
        n = this.md5_ii(n, s, r, e, t[h + 13], 21, 1309151649);
        e = this.md5_ii(e, n, s, r, t[h + 4], 6, -145523070);
        r = this.md5_ii(r, e, n, s, t[h + 11], 10, -1120210379);
        s = this.md5_ii(s, r, e, n, t[h + 2], 15, 718787259);
        n = this.md5_ii(n, s, r, e, t[h + 9], 21, -343485551);
        e = this.safe_add(e, a);
        n = this.safe_add(n, d);
        s = this.safe_add(s, o);
        r = this.safe_add(r, m)
      }
      return Array(e, n, s, r)
    },
    getMD5Str: function(t) {
      return this.binl2hex(this.core_md5(this.str2binl(t), t.length * this.chrsz))
    }
  };
  function i() {
    this._getInstance = function() {
      var t;
      if (window.ActiveXObject) {
        var i = ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
        for (var e = 0; e < i.length; e++) {
          try {
            t = new ActiveXObject(i[e]);
            return t
          } catch(t) {}
        }
      } else if (window.XMLHttpRequest) {
        t = new XMLHttpRequest;
        return t
      } else {
        return null
      }
    };
    this._ins = this._getInstance();
    this.sendURL = function(t, i, e) {
      var n = this._ins;
      n.open("post", t, true);
      n.onreadystatechange = function() {
        if (n.readyState == 4 && (n.status == 200 || n.status == 304)) {
          if (typeof e == "function") {
            e(n.response)
          }
        }
      };
      n.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
      n.send(JSON.stringify(i))
    };
    this.quit = function() {
      this._ins.abort()
    }
  }
  var e = {};
  var n = {
    locationurl: "",
    preurl: "https://log.reyun.com/receive/tkio/",
    getSessionId: function() {
      var i = n.getItem("ryh5_sessionid");
      if (i && i != "") {
        return i
      }
      var e = document.cookie,
      s = e.split(";"),
      r = "";
      for (var h = 0; h < s.length; h++) {
        var a = s[h],
        d = a.split("=");
        if (d[0].trim() === "JSESSIONID") {
          r = d[1];
          break
        }
      }
      if (r == "") {
        r = t.getMD5Str(navigator.userAgent + String((new Date).getTime() + Math.random()));
        n.setItem("ryh5_sessionid", r)
      } else {
        r = t.getMD5Str(r + String((new Date).getTime() + Math.random()))
      }
      return r
    },
    getItem: function(t) {
      try {
        localStorage.setItem("rmdkk", 111);
        localStorage.removeItem("rmdkk");
        var i = localStorage.getItem(t);
        return i == null ? "": i
      } catch(n) {
        var i = e[t];
        return i == undefined ? "": i
      }
    },
    setItem: function(t, i) {
      try {
        localStorage.setItem(t, i)
      } catch(n) {
        e[t] = i
      }
    },
    getValue: function(i) {
      var e = "";
      switch (i) {
      case "who":
        e = n.getItem("ryh5_usid");
        if (e == "") {
          e = this.getSessionId()
        }
        break;
      case "deviceid":
        e = n.getItem("ryh5_usid");
        if (e == "") {
          e = this.getSessionId()
        } else {
          e = t.getMD5Str(e)
        }
        break;
      default:
        e = this.getItem(i);
        break
      }
      return e
    },
    getCommonParams: function(t) {
      var i = {
        appid: this.getItem("ryh5_appid"),
        who: this.getValue("who"),
        context: {
          _deviceid: this.getValue("deviceid"),
          _cid: this.getItem("ryh5_cid"),
          _campaignid: this.getItem("ryh5_campid"),
          _apptype: "wap",
          _ua: navigator.userAgent
        }
      };
      if (t && typeof t === "object") {
        for (var e in t) {
          i.context[e] = t[e]
        }
      }
      return i
    },
    send: function(t, e, n) {
      var s = this.preurl + t;
      var r = new i;
      r.sendURL(s, e, n)
    }
  };
  var s = new function() {
    this.version = "v1.1.0";
    var t = function() {
      var t = function() {
        var t = n.getCommonParams();
        n.locationurl = t.context._url = document.location.href;
        t.what = "pageview";
        n.send("event", t)
      };
      if (n.locationurl == "") {
        t()
      } else {
        setTimeout(function() {
          var i = document.location.href;
          if (n.locationurl == i) {
            return false
          }
          t()
        },
        100)
      }
    };
    this.init = function(i) {
      n.setItem("ryh5_appid", i);
      var e = window.location.href,
      s = e.substring(e.indexOf("?") + 1),
      r = s.split("&");
      var h = n.getItem("ryh5_cid"),
      a = n.getItem("ryh5_campid"),
      d = n.getItem("ryh5_sessionid");
      h = h == "" ? "-1": h;
      a = a == "" ? "_default_": a;
      d = d == "" ? n.getSessionId() : d;
      for (var o = 0; o < r.length; o++) {
        var m = r[o].split("=");
        if (m[0] == "cid") {
          h = m[1]
        }
        if (m[0] == "campaignid") {
          a = m[1]
        }
      }
      if (!/^-?\d+$/.test(h)) {
        h = -1
      }
      n.setItem("ryh5_cid", h);
      n.setItem("ryh5_campid", a);
      n.setItem("ryh5_sessionid", d);
      t();
      document.addEventListener("click", t);
      var c = this;
      var _ = function() {
        c.event("finishload", {
          _url: document.location.href
        })
      };
      document.addEventListener("DOMContentLoaded", _, false)
    };
    this.register = function(t, i) {
      var e = n.getCommonParams(i);
      e.who = t;
      n.send("register", e)
    };
    this.loggedin = function(i, e) {
      var s = n.getCommonParams(e);
      s.who = i;
      n.setItem("ryh5_usid", i);
      n.send("loggedin", s);
      t()
    };
    this.download = function(t) {
      var i = n.getCommonParams(t);
      i.what = "download";
      n.send("event", i)
    };
    this.order = function(t, i) {
      var e = n.getCommonParams(i);
      e.what = "order";
      e.context._transactionid = t;
      n.send("event", e)
    };
    this.payment = function(t, i, e, s, r) {
      var h = n.getCommonParams(r);
      h.context._transactionid = t;
      h.context._currencyamount = i;
      h.context._currencytype = e;
      h.context._paymenttype = s;
      n.send("payment", h)
    };
    this.event = function(t, i) {
      var i = n.getCommonParams(i);
      i.what = t;
      n.send("event", i)
    }
  };
  window["TrackingIO"] = s
})();