// Slider Library
;
var garevna_sliderLibrary = function (params) {
	
	var parent_object = params.parent_object;

	// ------------------------------------------------------------------------------------------------- slider
	var slider;
	var slider_id;
	if (!params.slider_id || !document.getElementById(params.slider_id)) {
		slider = document.createElement('div');
		slider_id = params.slider_id || 'garevna_slider';
		parent_object.appendChild(slider);
	}
	else {
		slider = document.getElementById(params.slider_id);
	}
	slider.style.position = "absolute";
	slider.style.width = "100%";
	slider.style.height = parent_object.style.height;
	slider.style.top = "0";
	slider.style.left = "0";
	slider.style.boxSizing = 'border-box';
	slider.style.marginTop = "30px";
	slider.style.marginLeft = "0";
	slider.style.overflow = 'hidden';
	
	// ------------------------------------------------------------------------------------------- slide container
	var slide_container;
	if (!params.slide_container_id || !document.getElementById(params.slide_container_id)) {
		slide_container = document.createElement('div');
		slide_container.id = params.slide_container_id || 'garevna_slide_container';
		slider.appendChild(slide_container);
	}
	else {
		slide_container = document.getElementById(params.slide_container_id);
	}
	// ------------------------------------------------------------------------------------------------- panels
	var naviPanelId = params.naviPanelId || 'navi_panel';
	var infoPanelId = params.infoPanelId || 'info_panel';
	var navigation_panel = garevna_lib.createPanel (naviPanelId, 'top');
	parent_object.appendChild(navigation_panel);
	var navi_elements = document.createElement('nav');
	navigation_panel.appendChild(navi_elements);
	navi_elements.style.boxSizing = 'border-box';
	navi_elements.style.width = "auto";
	var $comments = garevna_lib.createPanel (infoPanelId, 'bottom');
	$comments.style.boxSizing = 'border-box';
	$comments.style.width = "auto";
	$comments.style.margin = "2px 1%";
	$comments.style.boxShadow = "inset 2px 2px 3px rgba(0,0,0,0.5)";
	$comments.style.borderRadius = "5px";
	$comments.style.paddingLeft = '20px';
	$comments.style.paddingRight = '20px';
	$comments.className = 'magenta';
	parent_object.appendChild($comments);
	// ------------------------------------------------------------------------------------------------- callbacks
	var changeSlideCallback = params.changeSlideCallback;
	
	slider.video = params.video || false;
	
	var sourseData = params.sourseJSON;
	
	var slides_content = [];                       //  array of objects { url_field:string, comment_field:string }
	var url_field = params.urlField || 'url';
	var comment_field = params.commentField || 'comment';
	var slides_length = 0;
	var spins = {};
	var current_slide_num = 0;
	var $marginLeft = window.innerWidth*0.05;
	var $marginTop = 30;
	var $width = window.innerWidth*0.8;
	var $height = window.innerHeight*0.8;
	
	function slider_resize () {
		// this === parent_object (bind)
			var slider = this.firstChild;
			var slide = slider.firstChild;
			var navi = this.getElementsByTagName('nav').item(0);
			var info = this.childNodes[2];
			var video = slider.video;
			
			var dim = garevna_lib.getParentObjectSize(slider.parentNode);
			var n = (video)?(1.777778):(window.innerWidth/window.innerHeight);
			var x = Math.min(dim.w, Math.round((dim.h-60)*n));
			var y = Math.min((dim.h-60), Math.round(dim.w/n));
			slider.style.height = (dim.h - 60) + 'px';
			slider.style.width = x + 'px';
			slider.style.marginLeft = Math.round((dim.w - x)/2) + 'px';
			slide.style.width = x + 'px';
			slide.style.height = y + 'px';
			
			navi.style.fontSize = (dim.w<450)?('80%'):((dim.w<700)?('90%'):('100%'));
			if (navi.childNodes[1]) {
				navi.childNodes[1].childNodes[0].innerHTML = garevna_lib.init_spin (this.currentSlideNum,this.slidesNumber);
				var navi_width = navi.childNodes[0].getBoundingClientRect().width;
				navi_width = navi_width + navi.childNodes[1].getBoundingClientRect().width;
				navi_width = navi_width + navi.childNodes[2].getBoundingClientRect().width;
				navi.style.marginLeft = Math.round((dim.w - navi_width)/2) + 'px';
			}
			
			info.style.fontSize = navi.style.fontSize;
	}
	parent_object.resize_callback = slider_resize.bind(parent_object);
	
	return {
		
		load_data:function (callback) {
			var worker = new Worker('/js/json_loader.js');
			worker.postMessage(sourseData);
			worker.addEventListener('message', function(e) {
				if(!e.data) {
					alert("Извините, файл " + sourseData + " не обнаружен");
					worker.terminate();
					worker = undefined;
				}
				else {
					worker.terminate();
					worker = undefined;
					callback(e.data);
				}
			}, false);
		},
		set_slides_content: function (_slides_content) {
			
			//  slides_content [index][url_field]
			//  slides_content [index][comment_field]
			
			slides_content = _slides_content;
			slides_length = slides_content.length;
			$comments.innerHTML = slides_content[current_slide_num][comment_field];
			parent_object.slidesNumber = slides_length;
			parent_object.currentSlideNum = current_slide_num;
		},
		
		buildNavigationPanel: function (slides_num) {
			var $but = garevna_lib.createNaviButton('prev');
			$but.style.textShadow = "2px 2px 1px rgba(0,0,0,0.58)";
			$but.style.boxShadow = 'none';
			$but.onclick = function () {
				if (current_slide_num > 0) {
					current_slide_num--;
					var _prev = new TimelineLite();
					var margin1 = (-window.innerWidth) + 'px';
					var margin2 = (window.innerWidth) + 'px';
					_prev.add( TweenLite.fromTo(slide_container, 1, { marginLeft:0, opacity:'1' },
			                                                        { marginLeft:margin2, opacity:'0.2',
														               onComplete: changeSlideCallback }) );
		            _prev.add( TweenLite.fromTo(slide_container, 1, { marginLeft:margin1, opacity:'0.2' },
		                                                            { marginLeft:0, opacity:'1' }) );
					spins.innerHTML = garevna_lib.init_spin (current_slide_num, slides_length);
					$comments.innerHTML = slides_content[current_slide_num][comment_field];
				}
			}
			navi_elements.appendChild($but);
			spins = document.createElement('span');
			//spins.style.fontSize = Math.round(11*(23/slides_num)) + 'px';
			//spins.style.textShadow = "2px 2px 2px rgba(0,0,0,0.5)";
			spins.innerHTML = garevna_lib.init_spin (current_slide_num, slides_num);
			navi_elements.appendChild(spins);
			$but = garevna_lib.createNaviButton('next');
			$but.style.textShadow = "2px 2px 1px rgba(0,0,0,0.5)";
			$but.style.boxShadow = 'none';
			navi_elements.appendChild($but);
			$but.onclick = function () {
				if (current_slide_num < slides_length-1) {
					current_slide_num++;
					var _next = new TimelineLite();
					var margin1 = (-window.innerWidth) + 'px';
					var margin2 = (window.innerWidth) + 'px';
					_next.add( TweenLite.fromTo(slide_container, 1, { marginLeft:0, opacity:'1' },
			                                                        { marginLeft:margin1, opacity:'0.2',
														               onComplete: changeSlideCallback }) );
		            _next.add( TweenLite.fromTo(slide_container, 1, { marginLeft:margin2, opacity:'0.2' },
		                                                            { marginLeft:0, opacity:'1' }) );
					spins.innerHTML = garevna_lib.init_spin (current_slide_num, slides_length);
					$comments.innerHTML = slides_content[current_slide_num][comment_field];
				}
			}
		},
		
		resize_navi: function () {
			garevna_lib.init_spin(this.current_slide_num, his.slides_length);
		},
		
		getSlidesNumber: function () {
			return slides_length;
		},
		
		getCurrentSlide: function () {
			return current_slide_num;
		}
	}
}