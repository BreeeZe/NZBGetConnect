/**********************************************************/
//Check if we are on binsearch.info
var loc_binsearch;

if (location.href.indexOf("binsearch.info") != -1) {
    loc_binsearch = 1;
}
else if (location.href.indexOf("binsearch.net") != -1 ) {
    loc_binsearch = 1;
}
else {
    loc_binsearch = 0;
}

/**********************************************************/

function addToNZBGetFromBinsearch() {

    var img = safari.extension.baseURI +'images/nzbget_16_fetching.png';
    $(this).attr("src", img);
    if ($(this).find('img').length > 0) {
	    $(this).find('img').attr("src", img);
	} else {
		$(this).css('background-image', 'url('+img+')');
	}
	var addLink = $(this).parent();
    //grab all checked boxes on page
	var a = document.getElementsByTagName('input');
	for (var i=0, len=a.length; i<len; ++i) {
		if (a[i].type == 'checkbox' && a[i].checked) {         
            var nzburl =  'http://binsearch.info/?action=nzb&' + a[i].name + '=1';
            //Construct message to send to background page
            var message = {
                callback : "setIconResult",
                arguments : [nzburl],
                reference : nzburl
            };
            safari.self.tab.dispatchMessage("Append", message);
		}
	}
	return false;
    
}

//Don't modify page if we aren't on binsearch.com
if (loc_binsearch) {
    $('input[name$="watchlist"]').each(function() {
      // add button to h3 to move checked in to NZBGetConnect
      var img = safari.extension.baseURI + 'images/nzbget_16.png';
      $(this).attr("src", img);
      var link = '<input class="b addNZBGet" type="button" value="    Download selected" style="background-image: url('+img+'); background-repeat: no-repeat; background-position: 3px 3px;" />';
      $(this).after(link);
      $(this).parent().find('input[class="b addNZBGet"]').first().click(addToNZBGetFromBinsearch);
   });
}