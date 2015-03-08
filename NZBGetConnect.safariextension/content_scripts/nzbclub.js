/**********************************************************/
//Check if we are on nzbclub.com
var loc_nzbclub;

if (location.href.indexOf("nzbclub.com") == -1) {
    loc_nzbclub = 0;
}
else {
    loc_nzbclub = 1;
}
/**********************************************************/

function addToNZBGetFromNZBCLUB() {
    // Set the image to an in-progress image
    var img = safari.extension.baseURI +'images/nzbget_16_fetching.png';
    $(this).attr("src", img);
    
    var nzburl = 'http://nzbclub.com' + $(this).parent().attr('href');
    var addLink = $(this).parent();
    	
    //Construct message to send to background page
    var message = {
        callback : "setIconResult",
        arguments : [nzburl],
        reference : nzburl
    };
    safari.self.tab.dispatchMessage("Append", message);
    
    return false;
}

function handleAllDownloadLinks() {
        var unbind = false;
        $('img[alt="Get NZB"]').each(function() {
                // Change the title to "Send to NZBGet"
                $(this).attr("title", "Send to NZBGet");
                
                // Change the nzb download image
                var img = safari.extension.baseURI + 'images/nzbget_16.png';
                $(this).attr("src", img);

                // Change the on click handler to send to NZBGet
                $(this).click(addToNZBGetFromNZBCLUB);         
                unbind = true;
        });
        if ( unbind )
                $("#ctl00_ContentPlaceHolder1_ui_searchformMain_ui_updatepanelMain").unbind("DOMNodeInserted", handleAllDownloadLinks);
        return;
}

//Don't modify page if we aren't on nzbclub.com
if (loc_nzbclub) {
    handleAllDownloadLinks();
}