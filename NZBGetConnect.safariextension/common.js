function checkEndSlash(input) {
    if (input.charAt(input.length-1) == '/') {
        return input;
    } else {
        var output = input+'/';
        return output;
    }
}

function constructApiUrl() {
    return checkEndSlash(safari.extension.settings.getItem("nzbget_url")) + 'jsonrpc';
}

function addToSABnzbd(addLink, nzb, mode) {
    var default_cat = safari.extension.settings.getItem("default_category");
    var username = safari.extension.settings.getItem("username");
    var password = safari.extension.secureSettings.getItem("password");
    RPC.withCredentials = false;
    if(username) {
        RPC.withCredentials = true;
        RPC.userName = username;
        RPC.passWord = password;
    }
    RPC.rpcUrl = constructApiUrl();
    var data = ['', nzb, default_cat, 0, false, false, '', 0, "SCORE"];
    alert("adding : " + nzb);
    RPC.call('append', data,
             function(res){
                safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("success", addLink);
             },
             function(res){
                safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("error", addLink);
             });
    //On success the image doesn't get updated
//
//    var sabApiUrl = constructApiUrl();
//    var data = constructApiPost();
//    
//    data.mode = mode;
//    data.name = nzb;
//    
//    $.ajax({
//        type: "GET",
//        url: sabApiUrl,
//        dataType: "JSON",
//        data: data,
//        success: function(data){
//           safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("success", addLink);
//        },
//        error:function(){
//           safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("error", addLink);
//        }
//    });
}

//Function to respond and pass message from injected javascript
function respondToMessage(theMessageEvent) {
    if(theMessageEvent.name === "addToSABnzbd")
    {
       var message_array = theMessageEvent.message.split(" ");
       var addLink = message_array[0];
       var nzbid = message_array[1];
       var mode = message_array[2];
       addToSABnzbd(addLink,nzbid,mode);
    }
}

//Add Listener to respond to injected javascript
safari.application.addEventListener("message",respondToMessage,false);