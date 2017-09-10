// ===============================================================================================================
//                                                 VIDEO SLIDER
// ===============================================================================================================
function garevnaSlider () {
	var parent_object = this;       // ___________________________________________________ контекст вызова
	var videoSourse = parent_object.func_params;
	loadSliderData (videoSourse);
	console.log('parent_object: ' + parent_object.id);
	console.log('videoSourse: ' + videoSourse);
	var sliderWidth, sliderHeight;  // ___________________________________________________ slider size
	var $width, $height;            // ___________________________________________________ video size
	var slider_content;             // ___________________________________________________ slide's data
	
	var slider = document.createElement('div');
	parent_object.appendChild(slider);
	
	var slider_id = 'garevna_slider';
	
	slider.style.boxSizing = 'border-box';
	slider.id = slider_id;
	slider.style.width = '100%';
	slider.style.height = sliderHeight;
	slider.style.overflowX = 'hidden';
	
	slider.onresize = function(event) {
		calc_video_size ();
	}
	
	// =========================================================================================== loadData
	function loadSliderData (videoSourse) {
		var request_slides;
		if (window.XMLHttpRequest) {
			request_slides = new XMLHttpRequest();
		}
		else {
			request_slides = new ActiveXObject("Microsoft.XMLHTTP");
		}
		request_slides.onreadystatechange = function() {
			if (request_slides.readyState == 4 && request_slides.status == 200) {
				getData(JSON.parse(request_slides.responseText));
			}
			else if (request_slides.status == 404 && request_slides.readyState == 4) {
				alert("Сообщение от: " + slider.id + ": извините, файл " + $url + " не обнаружен");
				return;
			}
		}
		request_slides.open("GET", videoSourse, true);
		request_slides.send();
	}
	
	var garevna_lib = garevna_media_library();
	
	var navigation_panel, navi_elements, spins, home_button, comments;
	var naviPanelId = 'garevna_slider_navi_panel';
	var infoPanelId = 'garevna_slider_info_panel';
	var current_slide_id = 'garevna_slider_current_slide';
	var previous_slide_id = 'garevna_slider_previous_slide';
	var next_slide_id = 'garevna_slider_next_slide';
	
	var current_slide_num = 0;
	
	var current_slide = document.createElement('div');
	current_slide.id = current_slide_id;
	var previous_slide = document.createElement('div');
	previous_slide.id = previous_slide_id;
	var next_slide = document.createElement('div');
	next_slide.id = next_slide_id;
	
	initVideoStyle (current_slide);
	initVideoStyle (previous_slide);
	initVideoStyle (next_slide);
	
	slider.appendChild(current_slide);
	slider.appendChild(previous_slide);
	slider.appendChild(next_slide);
	calc_video_size ();
	
	function initVideoStyle (slide) {
		slide.style.boxSizing = 'border-box';
		slide.style.padding = "30px 0";
		slide.style.position = 'absolute';
		slide.style.top = '0';
		slide.style.left = '0';
		slide.style.width = $width + 'px';
		slide.style.height = $height + 'px';
	}
	// =========================================================================================== set_video_size
	function calc_video_size () {
		var t,w,h;
		console.log('parent object');
		if (!parent_object.style.height) {
			w = window.innerWidth*0.8;
			h = window.innerHeight*0.8;
		}
		else {
			t = parent_object.style.width;
			w = eval(t.slice(0,t.indexOf("px"))) - 20;
			t = parent_object.style.height;
			h = eval(t.slice(0,t.indexOf("px"))) - 50;
		}
		sliderWidth = w + 'px';
		sliderHeight = h + 'px';
		
		$width = Math.min(w, h*1.7777778);
		$height = Math.min(h, w/1.7777778);
		
		current_slide.style.width = $width + 'px';
		current_slide.style.height = $height + 'px';
		next_slide.style.width = $width + 'px';
		next_slide.style.height = $height + 'px';
		previous_slide.style.width = $width + 'px';
		previous_slide.style.height = $height + 'px';
		current_slide.style.marginLeft = Math.round((w - $width)/2) + 'px';
		next_slide.style.marginLeft = (window.innerWidth + 100) + 'px';
		previous_slide.style.marginLeft = -(window.innerWidth + 100) + 'px';
	}
	// mainScene.resizeElementsList.push({id:"garevna_slider"});
	
	function getData ($data) {
		slider_content = $data.music;
		create_video_player ();
		buildNavigationPanel (naviPanelId);
		comments = garevna_lib.createPanel (infoPanelId, 'bottom');
		slider.appendChild(comments);
		// var but = garevna_lib.create_home_button ($data.homeButton);
		// comments.appendChild(but);
		// ========================================================================================= event 'elemIsReady'
		var event = new CustomEvent('elemIsReady', { 'detail': slider_id });
		parent_object.dispatchEvent(event);
	}
	// =========================================================================================== buildNavigationPanel
	function buildNavigationPanel (naviPanelId) {
		navigation_panel = garevna_lib.createPanel (naviPanelId, 'top');
		parent_object.appendChild(navigation_panel);
		navi_elements = document.createElement('nav');
		navigation_panel.appendChild(navi_elements);
		var $but = garevna_lib.createNaviButton('prev');
		$but.onclick = function () {
			if (current_slide_num == 0) {
				return null;
			}
			change_slide ('prev');
		}
		navi_elements.appendChild($but);
		spins = document.createElement('span');
		spins.innerHTML = garevna_lib.init_spin (current_slide_num, slider_content.length);
		navi_elements.appendChild(spins);
			  
		$but = garevna_lib.createNaviButton('next');
		navi_elements.appendChild($but);
		$but.onclick = function () {
			if (current_slide_num == slider_content.length-1) {
				return null;
			}
			change_slide ('next');
		}
		navi_elements.style.marginLeft = garevna_lib.getNaviMarginLeft(slider_content.length, parent_object);
	}
	// =========================================================================================== buildHomeButton
	/* function buildHomeButton (homeButton) {
		home_button = garevna_lib.create_home_button();
		navigation_panel.appendChild(home_button);
		home_button._url = homeButton;
		home_button.className = 'homeButton';
		home_button.onclick = function () {
			window.open(home_button._url, '_self');
		}
	} */
	// =========================================================================================== create_video_player
	function create_video_player () {
		var $video = slider_content[current_slide_num].content;
		var video_container = document.createElement('div');
		current_slide.appendChild(video_container);
		video_container.id = "video_container";
		video_container.width = "100%";
		video_container.height = "100%";
		video_container.style.width = "100%";
		video_container.style.height = "100%";
		var html = '<video style="width:100%; height:100%;" width="100%" height="100%" controls id="garevna_player">';
		html += '<source id="video_sourse" src="http://www.youtube.com/watch?v=' + $video;
		html += '" type="video/youtube"></video>';
		video_container.innerHTML = html;
		var player = new MediaElementPlayer('#garevna_player');
		return 
	}
	// =========================================================================================== change_slide
	function change_slide (dir) {
		var lim = (dir == 'next')?(slider_content.length-1):(0);
		var w = (window.innerWidth - $width)/2 + 'px';
		var newSlide = (dir == 'next')?(next_slide):(previous_slide);
		if (current_slide_num == lim) {
				return null;
		}
		current_slide_num = (dir == 'next')?(current_slide_num+1):(current_slide_num-1);
		newSlide.innerHTML = current_slide.innerHTML;
		var player = document.getElementById("garevna_player");
		player.parentNode.removeChild(player);
		current_slide.innerHTML = '';
		create_video_player ();
		var offset = window.innerWidth + 100;
		var offset_out = (dir == 'next')?((0-offset) + 'px'):(offset + 'px');
		var offset_in = (dir == 'next')?(offset + 'px'):((0-offset) + 'px');
		TweenLite.fromTo(current_slide, 1.5, { marginLeft:offset_in, opacity:'0' },
			                                 { marginLeft:w, opacity:'1' });
		TweenLite.fromTo(newSlide, 1.5,  { marginLeft:w, opacity:'1' },
			                             { marginLeft:offset_out, opacity:'0',
										   onComplete: function () { newSlide.innerHtml = ''; }
		});
		spins.innerHTML = garevna_lib.init_spin (current_slide_num, slider_content.length);
		comments.innerHTML = slider_content[current_slide_num].txt;
	}
}