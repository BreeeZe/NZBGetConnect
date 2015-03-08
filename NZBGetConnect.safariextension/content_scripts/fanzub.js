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

function addToSABnzbdFromFanzub() {
   var addLink = this;
    
   // Set the image to an in-progress image
   var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
     
   var nzbid = this.href;
   nzbid = nzbid.substring(nzbid.indexOf('(')+1, nzbid.indexOf(')'));
   var nzburl = 'http://www.fanzub.com/nzb/' + nzbid;

   //Construct message to send to background page
   var message = addLink + " " + nzburl + " " + "addurl";
   safari.self.tab.dispatchMessage("addToSABnzbd", message);

   return false;
}

if (loc_fanzub) {
   $('table a[href*="javascript:Details"]').each(function() {
      var img = safari.extension.baseURI + 'images/sab2_16.png';
      var href = $(this).attr('href');
      var link = '<a class="addSABnzbd" href="' + href + '"><img title="Send to SABnzbd" src="' + img + '" /></a> ';
      $(this).before(link);
      $(this).parent().find('a[class="addSABnzbd"]').first().click(addToSABnzbdFromFanzub);
   });
}