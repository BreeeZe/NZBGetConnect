/**********************************************************/
//Check if we are on bintube.com
var loc_bintube;

if (location.href.indexOf("bintube.com") == -1) {
    loc_bintube = 0;
}
else {
    loc_bintube = 1;
}
/**********************************************************/

function addToNZBGetFromBintube() {
    // Set the image to an in-progress image
    var img = safari.extension.baseURI + 'images/nzbget_16_fetching.png';
    $(this).find('img').attr("src", img);
    
    var nzburl = $(this).attr('href');
    var addLink = this;
    	
    //Construct message to send to background page
    var message = {
        callback : "setIconResult",
        arguments : [nzburl,''],
        reference : "a[href=\"" + nzburl + "\"]"
    };
    safari.self.tab.dispatchMessage("Append", message);
    
    return false;
}

//Don't modify page if we aren't on bintube.com
if (loc_bintube) {
    console.info("Parsing bintube");
	$('a.dlbtn').each(function() {
		var href = $(this).attr('href');
		var img = chrome.extension.getURL('/images/nzbget_16.png');
		var link = '<a class="addNZBGet" href="' + href + '"><img src="' + img + '" /></a> ';
		$(this).before(link);
		$(this).remove();
	});

	// Change the on click handler to send to NZBGet
	// moved because the way it was the click was firing multiple times
	$('.addNZBGet').each(function() {
		$(this).click(addToNZBGetFromBintube);
	});	
}