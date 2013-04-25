/* Blue Button Reference Implementation
Copyright (c) 2013 by M. Jackson Wilkinson.
License: Apache */

(function(window){

  var approvedOrigins = [];

  listen("message", window, receiveMessage);

  function receiveMessage(event){
    if (approvedOrigins.indexOf(event.origin) === -1){
      return;
    }
    if (event.data !== "get_bbxml"){return;}
    event.source.postMessage('bbxml:'+$('#xmlBBData').val(), event.origin);
  };

  $(document).on('click', '.launchApp', function(e){
    console.log(arguments);
    var button = $(e.currentTarget);
    var url = $('.launchURL', button.parent()).val();
    var origin = extractOrigin(url);
    approvedOrigins.push(origin);

    button.attr('href', url);

    console.log(button, url);
  });
  console.log("registered clich handler");

  var parseUrl = (function () {
    var a = document.createElement('a');
    return function (url) {
      a.href = url;
      return {
        host: a.host,
        hostname: a.hostname,
        pathname: a.pathname,
        port: a.port,
        protocol: a.protocol,
        search: a.search,
        hash: a.hash
      };
    }
  })();

  function extractOrigin(url){
    var u = parseUrl(url);
    console.log(u, "was url parsed");
    return u.protocol + '//' + u.host;
  };

	function listen(evnt, elem, func) {
		if (elem.addEventListener) {
			elem.addEventListener(evnt, func, false);
		}
		else if (elem.attachEvent) { // IE DOM
			var r = elem.attachEvent("on"+evnt, func);
			return r;
		}
	}

})(this);
