function addStars ($id, w, h) {
	var anim_name = "'" + 'star_blink' + "'";
	var sky = '<div id="' + $id + '" width:' + w + 'px; height:' + h + 'px; overflow:hidden; z-index:0">';
	var j;
	var star = '<div style="color:#eef; position:absolute; -webkit-animation-name:' + anim_name +'; ';
	star += 'animation-name:' + anim_name + '; webkit-animation-iteration-count:infinite; ';
	star += 'animation-iteration-count:infinite; -webkit-animation-timing-function:ease-in-out;';
	star += 'animation-timing-function:ease-in-out; ';
	
	for (j=0; j < 200; j++) {
		var star_params = '';
		star_params += 'left:' + Math.random() * w + 'px;';
		star_params += 'top:' + Math.random() * h + 'px;';
		star_params += 'font-size:' + Math.random() * 5 + 'px;';
		star_params += '-webkit-animation-delay:' + Math.random()*2 + 's;';
		star_params += 'animation-delay:' + Math.random()*2 + 's;';
		star_params += '-webkit-animation-duration:' + Math.random()*2 + 's;';
		star_params += 'animation-duration:' + Math.random()*2 + 's;';
		sky += star + star_params + '">&#10023;</div>';
	}
	sky += '</div>';
	return sky;
}


this.addEventListener('message', function(e) {
	var params = e.data;
	postMessage(addStars(params.$id, params.w, params.h));	
}, false);
