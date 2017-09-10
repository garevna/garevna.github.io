function buildHTML(num, $swf) {
	var html = '<div id="flashContent' + num + '" style="width:100%; height:100%">';
	html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"';
	html += ' id="swf' + num + '" align="middle">'
	html += '<param name="movie" value="' + $swf + '" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="bgcolor" value="#ffffff" />';
	html += '<param name="play" value="true" />';
	html += '<param name="loop" value="true" />';
	html += '<param name="wmode" value="transparent" />';
	html += '<param name="scale" value="showall" />';
	html += '<param name="menu" value="true" />';
	html += '<param name="devicefont" value="false" />';
	html += '<param name="salign" value="t" />';
	html += '<param name="allowScriptAccess" value="always" />';
	html += '<!--[if !IE]>-->';
	html += '<object type="application/x-shockwave-flash" ';
	html += 'data="' + $swf + '" width="100%" height="100%">';
	html += '<param name="movie" value="' + $swf + '" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="bgcolor" value="#ffffff" />';
	html += '<param name="play" value="true" />';
	html += '<param name="loop" value="true" />';
	html += '<param name="wmode" value="transparent" />';
	html += '<param name="scale" value="showall" />';
	html += '<param name="menu" value="true" />';
	html += '<param name="devicefont" value="false" />';
	html += '<param name="salign" value="t" />';
	html += '<param name="allowScriptAccess" value="always" />';
	html += '<!--<![endif]-->';
	html += '<a href="http://www.adobe.com/go/getflash">';
	html += '<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"';
	html += ' alt="Загрузить Adobe Flash Player" /></a>';
	html += '<!--[if !IE]>-->';
	html += '</object>';
	html += '<!--<![endif]-->';
	html += '</object>';
	html += '</div>';
	return html;
};


this.addEventListener('message', function(e) {
	var data = e.data;
	var $html = buildHTML(data.num, data.url);
	postMessage($html);	
}, false);
