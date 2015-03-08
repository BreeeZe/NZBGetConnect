safari.self.addEventListener("message", handleMessage, false);

function handleMessage(msgEvent) {
   var messageName = msgEvent.name;
   var messageData = msgEvent.message;
      
   if (messageName === "success") {
      var img = safari.extension.baseURI + 'images/sab2_16_green.png';
      $("a[href=\"" +messageData+ "\"]").find('img').attr("src", img);
   }   
   else if (messageName === "error") {
      var img = safari.extension.baseURI + 'images/sab2_16_red.png';
      $("a[href=\"" +messageData+ "\"]").find('img').attr("src", img);
   }
     
}