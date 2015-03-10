//Don't modify page if we aren't on binsearch.com
if (location.href.indexOf("binsearch.info") != -1 || location.href.indexOf("binsearch.net") != -1) {
    $('input[name$="watchlist"]').each(function() {
      // add button to h3 to move checked in to NZBGetConnect
      var img = safari.extension.baseURI + 'images/nzbget_16.png';
      $(this).attr("src", img);
      var link = '<input class="b addNZBGet" type="button" value="    Download selected" style="background-image: url('+img+'); background-repeat: no-repeat; background-position: 3px 3px;" />';
      $(this).after(link);
      $(this).parent().find('input[class="b addNZBGet"]').first().click(addToNZBGetFromBinsearch);
   });
}

function addToNZBGetFromBinsearch() {
    var img = safari.extension.baseURI + 'images/nzbget_16_fetching.png';
    //grab all checked boxes on page
    $("FORM[name='r'] INPUT[type='checkbox']:checked").each(function() {
        var chk = $(this);
        var id = chk.attr("name");
        var nzburl =  'http://binsearch.info/?action=nzb&' + id + '=1';
        var text = chk.closest("TD").next().find(".s").text();
                                                            
        var td = chk.closest("TD").prev();
        var imgNode = td.find("img");
        if(!imgNode.length) {
            imgNode = $('<img src="' + img + '"/>');
        }
        td.addClass('nzbgetconnect' + id);
        td.append(imgNode);
        var message = {
            callback : "setIconResult",
            arguments : [nzburl,text],
            reference : ".nzbgetconnect"+id
        };
        safari.self.tab.dispatchMessage("Append", message);
    });
    return false;
}