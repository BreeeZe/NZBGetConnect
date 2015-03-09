/**********************************************************/
//Check if we are on dognzb
var loc_dognzb;

if (location.href.indexOf("dognzb.cr") == -1) {
    loc_dognzb = 0;
}
else {
    loc_dognzb = 1;
}
/**********************************************************/

var nzburl;

function findNZBIdDog(elem) {
	nzbid = $(elem).attr('id');
	url = 'https://www.dognzb.cr' + '/fetch/' + nzbid;
	return url;
}

function addToNZBGetFromDognzb() {
	var rss_hash = $('input[name="rsstoken"]').val();
    
    if (this.nodeName.toUpperCase() == 'INPUT') {
		this.value = "Sending...";
		$(this).css('color', 'green');
        
	    $('table.data input:checked').each(function() {
           var tr = $(this).parent().parent();
           var a = tr.find('a[title="Send to NZBGet"]');
           
           // Find the nzb id from the href
           nzburl = findNZBIdDog(a);
           if (nzburl) {
               category = tr.find('span[class~="labelstyle-444444"]').text();
               
               //addLink = a;
               
               // Add the authentication to the link about to be fetched
               nzburl += '/' + rss_hash;
                                           
               //Construct message to send to background page
               var message = {
                   callback : "setIconResult",
                   arguments : [nzburl],
                   reference : "a[href=\"" + a.href + "\"]"
               };
               safari.self.tab.dispatchMessage("Append", message);
           }
        });
        
		this.value = 'Sent to NZBGet!';
		$(this).css('color', 'red');
		sendToSabButton = this;
		
		setTimeout(function(){ sendToSabButton.value = 'Send to NZBGet'; $(sendToSabButton).css('color', '#888'); }, 4000);
        
		return false;
	} else {
		// Find the newzbin id from the href
		nzburl = findNZBIdDog(this);
		if (nzburl) {
			// Set the image to an in-progress image
            var img = safari.extension.baseURI + 'images/nzbget_16_fetching.png';
            $(this).css('background-image', 'url('+img+')');
            
			var tr = $(this).parent().parent();
			category = tr.find('span[class~="labelstyle-444444"]').text();
            
			//addLink = this;
			
            
			// Add the authentication to the link about to be fetched
			nzburl += '/' + rss_hash;
                        
            var message = {
                callback : "setIconResult",
                arguments : [nzburl],
                reference : null
            };
            safari.self.tab.dispatchMessage("Append", message);
            
			return false;
		}
	}

}

//Don't check page if we aren't on dognzb
if (loc_dognzb) {
    $('div[class="dog-icon-download"]').each(function() {
        // Change the title to "Send to NZBGet"
        newlink = $('<div></div>').attr("title", "Send to NZBGet");
        newlink.addClass('dog-icon-download');

        // Change the nzb download image
        var img = safari.extension.baseURI + 'images/nzbget_16.png';
        newlink.css('background', 'url('+img+')');

        // Extract NZB id from onClick and set to ID attribute
        var nzbid = $(this).attr('onClick');
        var nzbid = nzbid.split('\'')[1];
        newlink.attr("id", nzbid);

        // Change the on click handler to send to NZBGet
        // this is the <a>
        //$(this).removeAttr("onClick");
        newlink.click(addToNZBGetFromDognzb);
        $(this).replaceWith(newlink);
    });

}


