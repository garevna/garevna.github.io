// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
function garevna_createGalery () {
	
	var parent_object = this;                                              // контекст вызова
	var galery_url = parent_object.func_params [0];
	var $galery_id = (parent_object.func_params[1])?(parent_object.func_params[1]):('garevna_galery');
	var $galery_background = ( parent_object.func_params[2] ) ? ( parent_object.func_params[2] ) : ( 'black' );
	var $galery_id = galery_id || 'garevna_galery';
	var galeryContent_id = $galery_id + '_content';
	var galeryPictureLarge_id = $galery_id + "_picture_large";
	var galerySelected_id = $galery_id + "_selected";
	var galeryName_id = $galery_id + '_name';
	
	var $galery = document.createElement('galery');
	var galeryFixedHead = document.createElement('div');
	var galeryContent = document.createElement('div');
	var galeryPictureLarge = document.createElement('div');
	var galeryPictures = document.createElement('div');
	
	var galeryName = document.createElement('h1');
	galeryName.id = galeryName_id;
	var galerySelected = document.createElement('div');
	galerySelected.id = galerySelected_id;
	
	parent_object.appendChild($galery);
	$galery.appendChild(galeryFixedHead);
	galeryFixedHead.appendChild(galeryName);
	galeryFixedHead.appendChild(galerySelected);
	$galery.appendChild(galeryContent);
	galeryContent.appendChild(galeryPictureLarge);
	galeryContent.appendChild(galeryPictures);
	
	$galery.id = $galery_id;
	$galery.name = '';
	$galery.author = '';
	$galery.ready = false;
	parent_object.resize_callback = $galery_resize;
	galeryContent.id = galeryContent_id;
	galeryPictureLarge.id = galeryPictureLarge_id;
	
	galeryPictures.images = [];
	$galery.img_URL = [];
	
	var galery_name = document.createElement('h1');
	galeryFixedHead.appendChild(galery_name);
	
	galeryName.innerHTML = "Галерея изображений";
	galerySelected.className = "gray";
	galerySelected.style.width = '80%';
	galerySelected.style.wordWrap = 'break-word';
	
	galeryFixedHead.style.margin = "0";
	galeryFixedHead.firstChild.style.fontSize = "120%";
	
	$galery_init (galery_url);
	
	function $galery_resize () {
		
		var dim = garevna_lib.getParentObjectSize(parent_object);
		$galery.style.height = dim.h + "px";
		galeryContent.style.height = (dim.h - 80) + "px";
		galeryPictureLarge.style.height = (dim.h - 100) + "px";
		galeryPictures.style.height = (dim.h - 100) + "px";
		
		if (dim.w < 500) {
			galeryPictures.style.width = "30%";
		}
		else {
			galeryPictures.style.width = "40%";
		}
		
		// galeryPictureLarge.style.width = dim.w*0.5 + "px";
		
		var $fs = (dim.w < 450)?("80%"):((dim.w > 750)?("100%"):("90%"));
		galeryFixedHead.style.fontSize = $fs;
	}
	
	// ======================================================================================= $galery_init
	function $galery_init (galery_url) {
		var galery_worker = new Worker('/js/json_loader.js');
		galery_worker.postMessage(galery_url);
		galery_worker.addEventListener('message', function(e) {
			if(!e.data) {
				alert("Извините, файл " + galery_url + " не обнаружен");
			}
			else {
				var tmp = e.data;
				galeryName.innerHTML = tmp.galery_name;
				$galery.author = tmp.galery_author;
				$galery.test_pictures(tmp.images);
				$galery.styling_galery();
				$galery_resize ();
			}
		}, false);
	}
	function galery_image_init (event) {
		var img = event ? event.target : window.event.srcElement;
		var galeryPicture = document.createElement('button');
		galeryPictures.appendChild(galeryPicture);
		galeryPicture.comment = img.comment;
		galeryPicture.style.width = "100px";
		galeryPicture.style.height = "100px";
		galeryPicture.style.backgroundColor = 'transparent';
		galeryPicture.style.border = 'none';
		galeryPicture.style.backgroundImage = "url(" + img.src + ")";
		galeryPicture.style.backgroundRepeat = "no-repeat";
		galeryPicture.style.backgroundSize = "contain";
		galeryPicture.style.backgroundPosition = "center";
		galeryPicture.img = img.src;
		garevna_lib.remove_event_listener (img, "load", galery_image_init);
		garevna_lib.remove_event_listener (img, "error", galery_image_init);
		garevna_lib.add_event_listener (galeryPicture, "click", function (event) {
			var elem = event ? event.target : window.event.srcElement;
			galery_image_click(elem);
		});
	}
	function galery_image_click (elem) {
		document.getElementById(galerySelected_id).innerHTML = !elem.comment?elem.img:elem.comment;
		document.getElementById(galeryPictureLarge_id).style.backgroundImage = "url(" + elem.img + ")";
	}
	// ======================================================================================= $galery.test_pictures
	$galery.test_pictures = function($images) {
		var j;
		var k = 0;
		for (j = 0; j < $images.length; j++) {
			galeryPictures.images[j] = new Image();
			galeryPictures.images[j].src = $images[j].url;
			galeryPictures.images[j].comment = $images[j].comment;
			var callback = galery_image_init;
			garevna_lib.add_event_listener (galeryPictures.images[j], "load", galery_image_init);
			garevna_lib.add_event_listener (galeryPictures.images[j], "error", img_err);
		}
	}
	function img_err (event) {
		var elem = event ? event.target : window.event.srcElement;
		garevna_lib.remove_event_listener (elem, "load", img_err);
		garevna_lib.remove_event_listener (elem, "error", img_err);
	}
	// ======================================================================================= $galery.styling_galery
	$galery.styling_galery = function() {
		$galery.style.width = '100%';
		galeryFixedHead.style.width = '100%';
		galeryContent.style.width = '100%';
		galeryPictureLarge.style.width = '50%';
		galeryPictures.style.width = '40%';
		galeryContent.style.backgroundColor = $galery_background;
		// ------------------------------------------------- galeryFixedHead
		galeryFixedHead.style.position = "relative";
		galeryFixedHead.style.top = "0";
		galeryFixedHead.style.left = "0";
		galeryFixedHead.style.height = "80px";
		galeryFixedHead.style.paddingLeft = "20px";
		// ------------------------------------------------- galeryContent
		galeryContent.className = "flex-div";
		// ------------------------------------------------- galeryPictureLarge
		galeryPictureLarge.style.backgroundImage = "url(" + $galery.img_URL[0] + ")";
		galeryPictureLarge.style.backgroundRepeat = "no-repeat";
		galeryPictureLarge.style.backgroundSize = "contain";
		galeryPictureLarge.style.backgroundPosition = "center";
		galeryPictureLarge.style.backgroundColor = 'transparent';
		galeryPictureLarge.style.margin = "0 10px";
		// galeryPictureLarge.style.marginLeft = "0";
		galeryPictureLarge.style.border = 'none';
		// ------------------------------------------------- galeryPictures
		galeryPictures.className = "flex-div";
		galeryPictures.style.overflowY = 'auto';
		galeryPictures.style.margin = "0";
		// ------------------------------------------------- 
		$galery_resize ();
		
	}
}