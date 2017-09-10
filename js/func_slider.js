// ================================================================================================================
//                                             Image Slider
// ================================================================================================================
function garevnaImageSlider () {
	
	var parent_object = this;                        // ____________________________________________ контекст вызова
	var htmlSourse = parent_object.func_params;      // ____________________________________________ JSON file name
	
	if (parent_object == window) {
		parent_object = document.getElementsByTagName('body').item(0);
	}
	
	var slide_id = 'garevna_htmlContainer';
	var slider_id = 'garevna_htmlSlider';
	
	// --------------------------------------------------
	// set params and creating instance of slider_library
	// --------------------------------------------------
	
	var htmlSlider = garevna_sliderLibrary ({
		parent_object:parent_object,
		sourseJSON:htmlSourse,
		changeSlideCallback:changeCurrentHTML,
		urlField:"func_name",
		commentField:"comment",
		// =============== Name Space =============
		slider_id:slider_id,
		slide_container_id:slide_id,
		naviPanelId:'garevna_html_navi_panel',
		infoPanelId: 'garevna_html_info_panel' 
		// ========================================
	});
	var images;
	//parent_object.resize_callback = imageSlider.slider_resize;
	
	// load Data for slider
	
	imageSlider.load_data (getData);

	function getData ($data) {
		html = $data.images;
		
		imageSlider.set_slides_content (images);
		imageSlider.buildNavigationPanel (images.length);
		
		var $content = document.getElementById(slide_id);
		//$content.style.width = '100%';
		//$content.style.height = '400px';
		$content.style.backgroundImage = 'url(' + images[0]['url'] + ')';
		$content.style.backgroundRepeat = 'no-repeat';
		$content.style.backgroundSize = 'contain';
		$content.style.backgroundPosition = 'center';
		parent_object.resize_callback ();
	}
	function changeCurrentImage () {
		var k = imageSlider.getCurrentSlide();
		document.getElementById(slide_id).style.backgroundImage = 'url(' + images[k]['url'] + ')';
	}
	
}
