// ================================================================================================================
//                                             Image Slider
// ================================================================================================================
function garevnaImageSlider () {
	
	var parent_object = this;                        // ____________________________________________ контекст вызова
	var sliderBackground;
	var imageSourse;                                 // ____________________________________________ JSON file name
	
	var _params = [];
	var _params = (Array.isArray(parent_object.func_params))?(parent_object.func_params):([parent_object.func_params]);
	imageSourse = _params[0];
	
	var slider_id = (_params[1])?(_params[1] + '_ImageSlider'):('garevna_ImageSlider');
	var slide_id = (_params[1])?(_params[1] + '_ImageContainer'):('garevna_ImageContainer');
	var naiPanel_id = (_params[1])?(_params[1] + '_naiPanel'):('garevna_image_navi_panel');
	var infoPanel_id = (_params[1])?(_params[1] + '_infoPanel'):('garevna_image_info_panel');
	
	sliderBackground = (_params[2])?(_params[2]):('black');
	
	if (parent_object == window) {
		parent_object = document.getElementsByTagName('body').item(0);
	}
	
	// --------------------------------------------------
	// set params and creating instance of slider_library
	// --------------------------------------------------
	
	var imageSlider = garevna_sliderLibrary ({
		parent_object:parent_object,
		sourseJSON:imageSourse,
		changeSlideCallback:changeCurrentImage,
		urlField:"url",
		commentField:"comment",
		// =============== Name Space =============
		slider_id:slider_id,
		slide_container_id:slide_id,
		naviPanelId:naiPanel_id,
		infoPanelId: infoPanel_id 
		// ========================================
	});
	var images;
	//parent_object.resize_callback = imageSlider.slider_resize;
	
	// load Data for slider
	
	imageSlider.load_data (getData);

	function getData ($data) {
		images = $data.images;
		
		imageSlider.set_slides_content (images);
		imageSlider.buildNavigationPanel (images.length);
		
		var $content = document.getElementById(slide_id);
		//$content.style.width = '100%';
		//$content.style.height = '400px';
		$content.style.backgroundImage = 'url(' + images[0]['url'] + ')';
		if (images[0]._prompt) {
			garevna_lib.createPromptWin (images[0]._prompt);
		}
		$content.style.backgroundRepeat = 'no-repeat';
		$content.style.backgroundSize = 'contain';
		$content.style.backgroundPosition = 'center';
		$content.style.backgroundColor = sliderBackground;
		parent_object.resize_callback ();
	}
	function changeCurrentImage () {
		var k = imageSlider.getCurrentSlide();
		document.getElementById(slide_id).style.backgroundImage = 'url(' + images[k]['url'] + ')';
		if (images[k]._prompt) {
			garevna_lib.createPromptWin (images[k]._prompt);
		}
	}
	
}
