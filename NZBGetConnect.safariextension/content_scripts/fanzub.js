/**********************************************************/
//Check if we are on fanzub.com
var loc_fanzub;

if (location.href.indexOf("fanzub.com") == -1) {
    loc_fanzub = 0;
}
else {
    loc_fanzub = 1;
}
/**********************************************************/

function addToNZBGetFromFanzub() {
   var addLink = this;
    
   // Set the image to an in-progress image
   var img = safari.extension.baseURI + 'images/nzbget_16_fetching.png';
     
   var nzbid = this.href;
   nzbid = nzbid.substring(nzbid.indexOf('(')+1, nzbid.indexOf(')'));
   var nzburl = 'http://www.fanzub.com/nzb/' + nzbid;

    //Construct message to send to background page
    var message = {
        callback : "setIconResult",
        arguments : [nzburl,''],
        reference : "a[href=\"" + nzbid + "\"]"
    };
    safari.self.tab.dispatchMessage("Append", message);

   return false;
}

if (loc_fanzub) {
   $('table a[href*="javascript:Details"]').each(function() {
      var img = safari.extension.baseURI + 'images/nzbget_16.png';
      var href = $(this).attr('href');
      var link = '<a class="addNZBGet" href="' + href + '"><img title="Send to NZBGet" src="' + img + '" /></a> ';
      $(this).before(link);
      $(this).parent().find('a[class="addNZBGet"]').first().click(addToNZBGetFromFanzub);
   });
}