String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};

String.prototype.addEndSlash = function() {
    return this.charAt(this.length-1) == '/' ? this : this+'/';
};

var NZBGetConnect =
    (new function($) {
    
    this.Category = function() {
        return safari.extension.settings.getItem("default_category");
    };
    this.Username = function() {
        return safari.extension.settings.getItem("username");
    };
    this.Password = function() {
        return safari.extension.secureSettings.getItem("password");
    };
    this.Url = function() {
        return safari.extension.settings.getItem("nzbget_url").addEndSlash() + 'jsonrpc';
    };
    this.AddPauzed = function() {
        return safari.extension.settings.getItem("add_pauzed");
    };
    this.Append = function(nzbUrl, nzbName, callback) {
        nzbName = nzbName.replace(/\//g,"|").replace(/\\/g,"|");
        NZBGetConnect.callApi("append", [nzbName, nzbUrl, NZBGetConnect.Category(), 0, false, NZBGetConnect.AddPauzed(), '', 0, 'force'], callback);
    };
    this.callApi = function(method, data, callback) {
        var request = JSON.stringify({nocache: new Date().getTime(), method: method, params: data});
        console.log("request : "+request);
     
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.Url());
        if(this.Username()) {
            xhr.withCredentials = 'true';
            xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(this.Username()+':'+this.Password()));
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var result = false;
                var message;
                if (xhr.status === 200) {
                    if (xhr.responseText != '') {
                        try {
                            var res = JSON.parse(xhr.responseText);
                        } catch (e) {
                            message = e;
                        }
                        if (res) {
                            if (res.error == null) {
                                result = true;
                                message = res.result;
                            } else {
                                message = result.error.message + '\n\rRequest: ' + request;
                            }
                        }
                    } else {
                        message = 'No response received.';
                    }
                } else if (xhr.status === 0) {
                    message = 'Cannot connect';
                } else {
                    message = 'Invalid Status: ' + xhr.status;
                }
                callback(result, message);
            }
        };
    xhr.send(request);
    };
}(jQuery));

safari.application.addEventListener("message",function(msg){
    data = msg.message;
    NZBGetConnect[msg.name].apply(this, data.arguments.concat([function(result, message){
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(data.callback,{
            arguments : [data.reference, result, message]
        });
    }]));
},false);