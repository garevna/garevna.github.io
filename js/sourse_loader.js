function transport() {
	if (XMLHttpRequest) {
		var requestVar = new XMLHttpRequest();
	}
	else {
		var requestVar = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return requestVar;
};


this.addEventListener('message', function(e) {
	var sourceURL = e.data;
	var $request = transport();
	$request.onreadystatechange = function() {
		if ($request.readyState == 4 && $request.status == 200) {
			postMessage($request.responseText);
		}
		else if ($request.status == 404 && $request.readyState == 4) {
			postMessage(null);
		}
	}
	$request.open("GET", sourceURL, false);
	$request.send();
	
}, false);