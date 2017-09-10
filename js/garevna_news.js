;
var garevna_news_callback = function ($data) {
		var news_data = JSON.parse($data);
		var mc_text = [];
		var mc_width = [];
		var garevna_tw = [];
		var $time = [];
		
		var mc_line = document.createElement('div');
		document.body.appendChild(mc_line);
		mc_line.style.width = '100%';
		mc_line.style.height = '25px';
		mc_line.style.position = 'fixed';
		mc_line.style.top = news_data._top;
		mc_line.style.left = '0';
		mc_line.style.backgroundColor = 'black';
		mc_line.style.padding = '4px 0';
		mc_line.style.margin = '0';
		mc_line.style.overflow = 'hidden';
		
		for (var j=0; j < news_data.news.length; j++) {
			mc_text[j] = document.createElement('div');
			mc_text[j].style.position = 'absolute';
			mc_text[j].style.top = '0';
			mc_text[j].style.left = '100%';
			mc_text[j].style.fontFamily = news_data.font_family;
			mc_text[j].style.fontSize = news_data.font_size;
			mc_text[j].style.color = news_data.text_color;
			mc_text[j].innerHTML = news_data.news[j].subject;
			mc_text[j].style.whiteSpace = 'nowrap';
			mc_line.appendChild(mc_text[j]);
			mc_width[j] = mc_text[j].getBoundingClientRect().width;
			$time[j] = (window.innerWidth + mc_width[j]) / news_data.velocity;
			garevna_tw[j] = TweenLite.to(mc_text[j], $time[j], { left:'-' + mc_width[j] + 'px', ease: Power0.easeNone });
		}
		var t = 0;
		for (var j=0; j < mc_text.length; j++) {
			t += (j === 0)?(0):((mc_width[j-1]+40) / news_data.velocity);
			garevna_newsTween.add( garevna_tw[j], t);
			garevna_newsTween.eventCallback("onComplete", garevna_newsTween_repeat, ["param1","param2"]);
		}
		garevna_newsTween.play();
};
	
var garevna_newsTween_repeat = function () {
		garevna_newsTween.restart();
}