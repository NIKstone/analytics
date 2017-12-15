(function(window) {
    var report_bug_url = "//down.xiyouence.com/error/report";

    window.onerror = function(msg, url, line, col, error) {
        var data = {};
        col = col || (window.event && window.event.errorCharacter) || 0;
        data.type = 'Script';
        data.url = window.location.href;
        data.line = line;
        data.col = col;
        if (!!error && !!error.stack) {
            data.msg = 'Script Error: [' + msg + ']->[' + url + ',' + line + ':' + col + ']' + error.stack.toString();
        } else if (!!arguments.callee) {
            var ext = [];
            var f = arguments.callee.caller,
                c = 3;
            while (f) {
                ext.push(f.toString());
                if (f === f.caller) {
                    break;
                }
                f = f.caller;
            }
            ext = ext.join(",");
            data.msg = 'Script Error: [' + msg + ']->[' + url + ',' + line + ':' + col + ']' + ext;
        }
        if (data.url && data.line && data.col && data.msg) {
            reportBug(data);
        }
        return true;
    };


    window.reportBug = function(data) {
        data.msg += ', User Agent: ' + navigator.userAgent;
        var dataString = JSON.stringify(data);
        var xhr = new Image();
        xhr.onload = xhr.error = function() {};
        xhr.src = report_bug_url + "?msg=" + data.msg;
    };
})(window);