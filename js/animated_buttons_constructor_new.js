// ========================================================================================
//                                 C O N S T R U C T O R
// ========================================================================================
function AnimatedButtonSet ( params ) {
	
	this.parent_node = params.__parent__ || document.body;
	this.id = params.id || this.parent_node.tagName + 'ButtonSet';
	
	if (  this.parent_node == document.body ) {
		document.body.style.position = 'fixed';
		document.body.style.top = '0';
		document.body.style.bottom = '0';
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.overflow = 'hidden';
	}
	this.parent_node.className = "animatedButtonsContainer";
	this.parent_node.ratio = params.ratio || this.default_ratio;
	
	// ======================== Хранилище для контента кнопок ==================
	this.shadow_root = document.createElement ( 'body' );
	document.documentElement.appendChild ( this.shadow_root );
	this.shadow_root.className = 'shadowRoot';
	this.shadow_root.style.position = 'fixed';
	this.shadow_root.style.top = '5000px';
	this.shadow_root.style.left = '0';
	// ======================== Диспетчер ==================
	this.dispetcher = document.createElement ( 'div' );
	this.parent_node.appendChild ( this.dispetcher );
	this.dispetcher.className = "dispetcher";
	this.dispetcher.parentObject = this;
	this.dispetcher.elements = [];
	console.info ( this.id + ':   ' + this.parent_node.offsetWidth + ' : ' + this.parent_node.offsetHeight );
	// ======================== Счетчик кнопок ==================
	this.dispetcher.elementsCounterValue = ( function () {
		var counter = 0;
		return function ( arg ) {
			if ( arg ) { return counter; } else { return counter++; }
		}
	})();
	// ======================== Создаем кнопки ( если переданы параметры ) ==================
	if ( params.objects ) {
		for ( var i = 0; i < params.objects.length; i++ ) {
			var $button = this.buttonConstructor ( params.objects [i] );
		}
	}
	// ================================ Развертываем контент кнопки ( элемента ) ===================================
	this.dispetcher.expandButton = function ( button_num ) {
		console.info ( '********** EXPAND THE BUTTON ' + button_num + ' in container ' + this.parentObject.id + ' **************' );
		var _target = {};
		this.elements [ button_num ].activeStateData.image_size = ( this.elements [ button_num ].activeStateData.contentType != 'img' ) ? this.elements [ button_num ].activeStateData.image_size : ( function getPictureSize ( pictureURL, default_picture ) {
			var tmp = new Image ();
			tmp.src = pictureURL;
			var ret = null;
			tmp.onload = function ( event ) {
				document.body.appendChild ( tmp );
				ret = { width: tmp.offsetWidth, height: tmp.offsetHeight };
				console.log ( 'button.activeStateData.image_size: ', ret );
				document.body.removeChild ( tmp );
				return ret;
			}
			tmp.onerror = function ( event ) {	pictureURL = default_picture;  }
		
		} ) ( this.elements [ button_num ].picture, this.parentObject.default_picture );
	
		var img_size = this.elements [ button_num ].activeStateData.image_size;
		console.log ( 'Размер изображения: ', img_size );
		var btn_size = {
			width:  Math.round ( this.parentNode.offsetWidth * this.parentNode.ratio.width ),
			height: Math.round ( this.parentNode.offsetHeight * this.parentNode.ratio.height )
		};
		
		if ( this.elements [ button_num ].activeStateData.content_type == 'img' ) {
			_target.width  = Math.min ( btn_size.width, img_size.width );
			_target.height = Math.min ( btn_size.height, img_size.height );
		} else {
			_target.width = btn_size.width;
			_target.height = btn_size.height;
		}
		_target.left = Math.round ( ( this.parentNode.offsetWidth - _target.width ) / 2 );
		_target.top = Math.round ( ( this.parentNode.offsetHeight - _target.height ) / 2 );
		
		this.elements [ button_num ].__worker.postMessage ( { type: 'target', target: _target } );
		console.info ( _target.width + ' | ' + _target.height + ' | ' + _target.left + ' | ' + _target.top );
	};
	
	this.dispetcher.addEventListener ( "_resize", function ( event ) {
		
		for ( var i = 0; i < event.target.elements.length; i++ ) {
			event.target.parentObject.setNormalPosition ( i );
		}
	} );
	
	this.dispetcherResizeCallback = this.winResize.bind ( this.dispetcher );
	window.addEventListener( 'resize', this.dispetcherResizeCallback );
}

AnimatedButtonSet.prototype.winResize = function ( event ) {
	var win_event = new CustomEvent ( "_resize" );
	this.dispatchEvent ( win_event );
}

// --------------------------------------------------------------------------- Регистрация нового экземпляра кнопки
AnimatedButtonSet.prototype.registerNewElement = function ( $button ) {
		
	this.dispetcher.elements.push ( $button );
	$button.num = this.dispetcher.elementsCounterValue ();
	this.setNormalPosition ( $button.num );
		
	var params = {
			type: 'init',
			num: $button.num,
			_window: { width: $button.parentNode.offsetWidth, height: $button.parentNode.offsetHeight },
			current: {
				width: this.default_width,
				height: this.default_height,
				top: Math.round ( Math.random () * ( $button.parentNode.offsetHeight - this.default_height ) ),
				left: Math.round ( Math.random () * ( $button.parentNode.offsetWidth - this.default_width ) )
			},
			ref: $button.sourseUrl
	};
		
	$button.style.width = params.current.width + "px";
	$button.style.height = params.current.height + "px";
	$button.style.top = params.current.top + "px";
	$button.style.left = params.current.left + "px";
		
	$button.__worker.postMessage ( params );
		
	$button.addEventListener ( '_resize', function winResized ( event ) {
		event.target.parentObject.dispetcher.setNormalPosition ( $button.num );
	} );
};

// ================================= E L E M E N T S    C O N S T R U C T O R =========================

AnimatedButtonSet.prototype.buttonConstructor = function ( params ) {
	
    var $button = document.createElement ( 'div' );
	$button.parentObject = this;
	//$button.isActive = false;
	//$button.content = null;
	this.parent_node.appendChild ( $button );
	
	$button.className = 'animated_button';
	
	$button.sourseUrl = params.ref;
	
	$button.picture = params.picture || this.default_picture;
	$button.style.backgroundImage = 'url(' + $button.picture + ')';
	
	$button.activeStateData = {
		contentType: params.type || 'img',
		content: null,
		func_name: params.func_name || null,
		func_params: params.func_params || null,
		image_size: {
			width: Math.round ( $button.parentNode.offsetWidth * $button.parentNode.ratio.width ),
			height: Math.round ( $button.parentNode.offsetHeight * $button.parentNode.ratio.height )
		}
	};
	
	//$button.appendChild ( $button.content );
	// ---------------------------------------------------------------------- shadow root content
	$button.__content__ = document.createElement( 'article' );
	$button.__content__.style.position = "absolute";
	$button.__content__.style.top = "0";
	$button.__content__.style.bottom = "0";
	$button.__content__.style.left = "0";
	$button.__content__.style.right = "0";
	$button.__content__.parentObject = $button;
	$button.__content__.style.overflow = "auto";
	
	//$button.__content__.addEventListener ( '_resize', function ( event ) {
	//	console.log ( '$button ', $button.num, ' __content__ size ', event.detail );
	//	event.target.style.width = event.detail.width + "px";
	//	event.target.style.height = event.detail.height + "px";
	//} );
	$button.parentObject.shadow_root.appendChild ( $button.__content__ );
	// ------------------------------------------------------------------------------- worker
	$button.__worker = new Worker ('/js/animated_buttons_dispetcher.js');
	
	$button.__worker.onmessage = function ( e ) {
			
			switch ( e.data.type ) {
				
				case 'error':
					console.log ( $button.num, 'ERROR', e.data.error );
					break;
					
				case 'content':
					$button.activeStateData.content = e.data.content;
					$button.parentObject.processButtonContent ( $button );
					break;
					
				case 'finish':
					if ( $button.isActive ) {
						$button.appendChild ( $button.__content__ );
						$button.content = $button.firstChild;
						console.log ( $button.content );
						if ( $button.content.dispetcher ) {
							var resize_event = new CustomEvent ( '_resize' );
							$button.content.dispetcher.dispatchEvent ( resize_event );
						}
					}
					break;
					
				default:
					// move process
					$button.style.width = e.data.width + "px";
					$button.style.height = e.data.height + "px";
					$button.style.top = e.data.top + "px";
					$button.style.left = e.data.left + "px";
					
					break;
			}
		};
	// ------------------------------------------------------------------------------------
	
	this.registerNewElement ( $button );
	
	// ======================================================================================================= mouseenter
	$button.onmouseenter = function ( event ) {
		
		event.target.isActive = true;
		event.target.className = "animated_button_active";
		event.target.style.zIndex = 300;
		if ( event.target.activeStateData.contentType == 'img' ) {
			event.target.style.backgroundImage = event.target.style.backgroundImage;
			event.target.style.backgroundRepeat = "no-repeat";
			event.target.style.backgroundSize = "contain";
			event.target.style.backgroundPosition = "center center";
			event.target.style.backgroundColor = "transparent";
			event.target.style.border = "groove 2px white";
			
		} else {
			event.target.style.backgroundImage = "none";
			event.target.style.boxShadow = "inset 10px 10px 10px rgba(0,0,0,0.7)";
		}
		
		event.target.parentObject.dispetcher.expandButton ( event.target.num );
		
	};
	
	// ======================================================================================================= mouseleave
	$button.onmouseleave = function ( event ) {
		
		event.target.parentObject.shadow_root.appendChild ( event.target.__content__ );
		event.target.isActive = false;
		event.target.className = "animated_button";
		event.target.style.zIndex = 0;
		event.target.style.backgroundImage = 'url(' + event.target.picture + ')';
		event.target.style.boxShadow = "0 0 0";
		// event.target.__worker.postMessage ( { type: 'normal' } );
		event.target.parentObject.setNormalPosition ( event.target.num );
	};
	return $button;
}

// ======================================= P R O T O T Y P E =======================================

AnimatedButtonSet.prototype.default_picture = "http://fla.fg-a.com/flags/ukraine-flag-button-round.png";

AnimatedButtonSet.prototype.default_width = 100;
AnimatedButtonSet.prototype.default_height = 100;
AnimatedButtonSet.prototype.default_ratio = { width: 0.8, height: 0.8 };
AnimatedButtonSet.prototype.default_duration = 1;
AnimatedButtonSet.prototype.default_interval = 50;

// ---------------------------------------- M E T H O D S ------------------------------------------

// Set buttons normal positions ( top | left )
	
AnimatedButtonSet.prototype.setNormalPosition = function ( button_num ) {
		// Сверху резервируется 40px, снизу - как повезет... ( если что - будет вертикальный скроллинг )
		var btns_per_row = Math.round ( ( this.parent_node.offsetWidth - 10 ) / ( this.default_width + 10 ) );
		var btns_per_col = Math.round ( ( this.parent_node.offsetHeight - 60 ) / ( this.default_height + 10 ) );
		var col = button_num % ( btns_per_row - 1 );
		var row = ( button_num - col ) / ( btns_per_row - 1 );
		var _target = {
				left: col * ( this.default_width + 10 ),
				top: row * ( this.default_height + 10 ) + 40,
				width: this.default_width,
				height: this.default_height
		};
		this.dispetcher.elements [ button_num ].__worker.postMessage ( { type: 'target', target: _target } );
};
	
	
AnimatedButtonSet.prototype.processButtonContent = function ( elem ) {
	
	var _data = elem.activeStateData;
	
	switch ( _data.contentType ) {
		case 'js':
			var _script = document.createElement ( 'script' );
			document.getElementsByTagName ( 'head' ).item (0).appendChild ( _script );
			_script.name = "dynamically loaded";
			_script.appendChild ( document.createTextNode ( _data.content ) ) ;
			
			var func = window [ _data.func_name ].bind ( elem.__content__, _data.func_params );
			
			func ();
			
			elem.parentObject.shadow_root.appendChild ( elem.__content__ );
			
			break;
		case 'button_set':
			_data.content = JSON.parse ( _data.content );
			button_set = new AnimatedButtonSet ( { __parent__: elem.__content__ } );
			
			for ( var i = 0; i < _data.content.objects.length; i++ ) {
				event.target.gallery.buttonConstructor ( {
					picture: _data.content [i].src,
					type: _data.content [i].type,
					ref: _data.content [i].ref || null,
					func_name: _data.content [i].func_name || null,
					func_params: _data.content [i].func_params || null
				} );
			}
			break;
		case 'img':
			
			break;
		default:
			break;
	}
}






