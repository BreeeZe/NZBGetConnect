safari.self.addEventListener("message", function(msg){
     setIconResult.invoke(this,msg.message.arguments);
     }, false);

function setIconResult(reference, result, message) {
    if (result) {
        var img = safari.extension.baseURI + 'images/nzbget_16_green.png';
        $("a[href=\"" +reference+ "\"]").find('img').attr("src", img);
    } else {
        var img = safari.extension.baseURI + 'images/nzbget_16_red.png';
        $("a[href=\"" +reference+ "\"]").find('img').attr("src", img);
        if(message) {
            alert(message);
        }
    }
}