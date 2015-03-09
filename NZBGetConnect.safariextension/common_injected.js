safari.self.addEventListener("message", function(msg){
    var reference = $(msg.message.arguments[0]);
    var result = msg.message.arguments[1];
    var message = msg.message.arguments[2];
    if (result) {
        var img = safari.extension.baseURI + 'images/nzbget_16_green.png';
        if(reference)
            reference.find('img').attr("src", img);
    } else {
        var img = safari.extension.baseURI + 'images/nzbget_16_red.png';
        if(reference)
            reference.find('img').attr("src", img);
        if(message) {
            alert(message);
        }
    }
});