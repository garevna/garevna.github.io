add_event_listener: function (element, evt, listener) {
	if (element.addEventListener) {
		element.addEventListener( evt, listener, false );
	}
	else {
		element.attachEvent( 'on' + evt, function() {
			listener.call( element, window.event );
		});
	}
}
test_pictures = function($list_img) {
	var images = [];
	var test_img = [];
	var j, img_nums = -1;
	for (j = 0; j < $list_img.length; j++) {
		test_img[j] = new Image();
		test_img[j].src = $list_img[j];
		test_img[j].onload = function (event) {
			img_nums++;
			images[img_nums] = event.target.src;
		}
		test_img[j].onerror = function (event) {
		}
	}
	return images;
}


this.addEventListener('message', function(e) {
	var list_img = e.data;
	
}, false);