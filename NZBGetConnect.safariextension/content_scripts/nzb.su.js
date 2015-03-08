/**********************************************************/
//Check if we are on nzb.su
var loc_nzbsu;

if (location.href.indexOf("nzb.su") == -1) {
    loc_nzbsu = 0;
}
else {
    loc_nzbsu = 1;
}
/**********************************************************/

var nzburl;
var addLink;
var category = null;

function findNZBIdSu(elem) {
	var url = $(elem).attr('href');

	var nzbid = url.substr(url.indexOf('/getnzb/')+8);
	nzbid = nzbid.substr(0, nzbid.indexOf('/'));
	url = 'http://www.nzb.su/getnzb/' + nzbid + '.nzb';

	return url;
}

function addToSABnzbdFromNZBdotsu() {
	if (this.nodeName.toUpperCase() == 'INPUT') {
		this.value = "Sending...";
		$(this).css('color', 'green');

		var user = $('input[name="UID"]').val();
		var rss_hash = $('input[name="RSSTOKEN"]').val();

	    $('table.data input:checked').each(function() {
			var tr = $(this).parent().parent();
			var a = tr.find('a[title="Send to SABnzbd"]');

			// Find the newzbin id from the href
			nzburl = findNZBIdSu(a);
			if (nzburl) {
				category = tr.find('a[href*="/browse?"]')[1].innerText.replace(' > ', '.');

				addLink = a;

				// Add the authentication to the link about to be fetched
				addLink += '?i=' + user + '&r=' + rss_hash;

               //Construct message to send to background page
               var message = {
                   callback : "setIconResult",
                   arguments : [addLink],
                   reference : addLink
               };
               safari.self.tab.dispatchMessage("Append", message);
			}
		});
		this.value = 'Sent to SAB!';
		$(this).css('color', 'red');
		sendToSabButton = this;
		
		setTimeout(function(){ sendToSabButton.value = 'Send to SAB'; $(sendToSabButton).css('color', '#888'); }, 4000);

		return false;
	} else {
		// Find the newzbin id from the href
		nzburl = findNZBIdSu(this);
		if (nzburl) {
			// Set the image to an in-progress image
			var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
			$(this).css('background-image', 'url('+img+')');

			category = null;
			if ($('#nzb_multi_operations_form').length == 0) {
				category = $(this).parent().parent().parent().parent().find('a[href*="/browse?"]')[1].innerText.replace(' > ', '.');
			} else {
				try {
					category = $(this).parent().parent().parent().find('a[href*="/browse?"]')[1].innerText.replace(' > ', '.');
				} catch (ex) { }
			}

			addLink = this;

			var user = $('input[name="UID"]').val();
			var rss_hash = $('input[name="RSSTOKEN"]').val();

			// Add the authentication to the link about to be fetched
			addLink += '?i=' + user + '&r=' + rss_hash;

            //Construct message to send to background page
            var message = {
                callback : "setIconResult",
                arguments : [addLink],
                reference : addLink
            };
            safari.self.tab.dispatchMessage("Append", message);
			return false;
		}
	}
}

//Don't check page if we aren't on nzb.su
if (loc_nzbsu) {
    
    // List view: add a button above the list to send selected NZBs to SAB
	$('input[class="nzb_multi_operations_sab"]').each(function() {
		$(this).css('display', 'inline-block');
		$(this).click(addToSABnzbdFromNZBdotsu);
    });

	$.merge($('a[title="Download Nzb"]'), $('a[title="Download NZB"]')).each(function() {
		// Change the title to "Send to SABnzbd"
		$(this).attr("title", "Send to SABnzbd");

		// Change the nzb download image
		var img = safari.extension.baseURI + 'images/sab2_16.png';
		$(this).parent().css('background-image', 'url('+img+')');

		// Change the on click handler to send to sabnzbd
		// this is the <a>
		$(this).click(addToSABnzbdFromNZBdotsu);
                                                                             
	});


}