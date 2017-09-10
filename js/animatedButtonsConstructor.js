// ========================================================================================
//                                 C O N S T R U C T O R
// ========================================================================================
function AnimatedButtonSet ( sourceURL ) {
	this.worker = new Worker ( '/js/json_loader.js' );
	this.worker.postMessage ( sourceURL );
	this.worker.onmessage = function ( e ) {
		if ( e.data ) {
			this.initButtonSet ( e.data );
		} else {
			alert ( 'ERROR: file was not received from server' );
		}
	}
	this.waitImg = new Image ();
	img.src = "url(/buttons/bart-simpson.png)";
	document.body.appendChild ( this.waitImg );
}
AnimatedButtonSet.prototype.initButtonSet	= function ( params ) {
	document.body.removeChild ( this.waitImg );
	this.__parent__ = params.__parent__ || document.body;
	this.id = params.id || this.parent_node.tagName + 'ButtonSet';
	this.defaultCursor = params.defaultCursor || this.defaultCursor;
	if (  this.__parent__ == document.body ) {
		document.body.style.position = 'fixed';
		document.body.style.top = '0';
		document.body.style.bottom = '0';
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.overflow = 'auto';
	}
	this.__parent__.className = "animatedButtonsContainer";
	this.__parent__.style.cursor = 'url(' + this.defaultCursor + ') 10 10, pointer';
	this.ratio = params.ratio || this.defaultRatio;
	
	// ======================== Диспетчер ==================
	this.__dispetcher__ = document.createElement ( 'div' );
	this.__parent__.appendChild ( this.__dispetcher__ );
	this.__dispetcher__.className = "dispetcher";
	this.__dispetcher__.parentObject = this;
	this.__dispetcher__.__elements__ = [];
	// ======================== Счетчик кнопок ==================
	this.__dispetcher__.elementsCounterValue = ( function () {
		var counter = 0;
		return function ( arg ) {
			if ( arg ) { return counter; } else { return counter++; }
		}
	})();
	// ======================== Создаем кнопки ( если переданы параметры ) ==================
	if ( params.objects ) {
		for ( var i = 0; i < params.objects.length; i++ ) {
			if ( params.objects [i].type == 'buttonWithContent' ) {
				var $button = new AnimatedButtonWithContent ( params.objects [i] );
			} else {
				var $button = document.createElement ( 'button' );
				$button.innerHTML = params.objects [i].label;
				$button.__worker__ = new Worker ();
			}
			var $button = this.buttonConstructor ( params.objects [i] );
		}
	}
	// ================================ Развертываем контент кнопки ( элемента ) ===================================
	this.dispetcher.expandButton = function ( button_num ) {
		var _target = {};
		if ( this.elements [ button_num ].activeStateData.contentType == 'img' ) {
			 
	
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
	
	var w = Math.round ( $button.parentNode.offsetWidth );
	var h = Math.round( $button.parentNode.offsetHeight );
		
	var params = {
			type: 'init',
			num: $button.num,
			_window: { width: w, height: h },
			current: {
				width: this.default_width,
				height: this.default_height,
				top: Math.round ( Math.random () * ( w - this.default_height ) ),
				left: Math.round ( Math.random () * ( h - this.default_width ) )
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

// ======================================= P R O T O T Y P E =======================================

AnimatedButtonSet.prototype.default_cursor = "/cursors/gun_aim.gif";

AnimatedButtonSet.prototype.defaultWidth = 100;
AnimatedButtonSet.prototype.defaultHeight = 100;
AnimatedButtonSet.prototype.defaultRatio = { width: 0.8, height: 0.8 };
AnimatedButtonSet.prototype.defaultDuration = 1;
AnimatedButtonSet.prototype.defaultInterval = 50;

// ---------------------------------------- M E T H O D S ------------------------------------------

AnimatedButtonSet.prototype.setButtonsParams = function () {
	this.margin = 20;
	this.defaultWidth = 0;
	this.defaultHeight = 0;
	for ( var i = 0; i < this.dispetcher.elementsCounterValue ( true ); i++ ) {
		this.defaultWidth = Math.max ( this.defaultWidth, this.__button__.parentObject.defaultWidth );
		this.defaultHeight = Math.max ( this.defaultHeight, this.__button__.parentObject.defaultHeight );
	}
	// Сверху резервируется 40px, снизу - как повезет... ( если что - будет вертикальный скроллинг )
	this.btns_per_row = Math.round ( ( this.parent_node.offsetWidth - _margin ) / ( this.defaultWidth + _margin ) );
	this.btns_per_col = Math.round ( ( this.parent_node.offsetHeight - margin * 3 ) / ( this.defaultHeight + _margin ) );
}

// Set buttons normal positions ( top | left )
	
AnimatedButtonSet.prototype.setNormalPosition = function ( button_num ) {
	
	var col = button_num % ( this.btns_per_row - 1 );
	var row = ( button_num - col ) / ( this.btns_per_row - 1 );
	var _target = {
		left: col * ( this.defaultWidth + this.margin ),
		top: row * ( this.defaultHeight + this.margin ) + this.margin * 2
	};
	this.dispetcher.elements [ button_num ].__worker.postMessage ( { type: 'target', target: _target } );
};
// ========================================================================================================	
//                                  B U T T O N S    C O N S T R U C T O R
// ========================================================================================================
AnimatedButtonWithContent = function ( params ) {
	
	this.parentObject = params.parentObject;                         // Управляющий объект
	this.parent_node = this.parentObject.__node__ || document.body;  // Родительский контейнер
	
	this.ratio = params.ratio || this.parentObject.ratio || { width: 0.8, height: 0.8 };
	
	this.picture = params.picture || this.defaultPicture;
	
	var pictureSize = ( function getPictureSize ( pictureURL ) {
		var tmp = new Image ();
		tmp.src = pictureURL;
		var ret = null;
		tmp.onload = function ( event ) {
			document.body.appendChild ( tmp );
			ret = { width: tmp.offsetWidth, height: tmp.offsetHeight };
			document.body.removeChild ( tmp );
			return ret;
		}
	} ) ( this.picture );
	
    this.__node__ = document.createElement ( 'div' );
	this.__node__.parentObject = this;
	this.__node__.className = 'animated_button';
	this.__node__.style.backgroundImage = "url(" + this.picture + ")";
	this.parent_node.appendChild ( this.__node__ );
	
	this.activeStateData = {
		sourseUrl: params.ref,
		contentType: params.type || 'img',
		content: null,
		func_name: params.func_name || null,
		func_params: params.func_params || null,
		image_size: pictureSize
	};
	
	this.__worker__ = new Worker ( '/js/animated_buttons_dispetcher.js' );
	this.__worker__.parentObject = this;
	this.__worker__.onmessage = function ( e ) {
		console.log ( 'worker.onmessage: ', this );
		this.parentObject.processWorkerAnswer.call ( this.parentObject, e.data );
	};
	
	this.__content__ = document.createDocumentFragment();
	
	this.__node__.onmouseenter = function ( event ) {
		event.target.parentObject.expandButton.call ( event.target.parentObject );
	};
	
	this.num = this.parentObject.registerNewElement ( this );
	
};

// ============================== P R O T O T Y P E =====================================

AnimatedButtonWithContent.prototype.appendContent = function () {
	
	this.__node__.style.backgroundImage = 'none';
	this.__node__.appendChild ( this.__content__ );
	this.__node__.childNodes[0].style.position = "absolute";
	this.__node__.childNodes[0].style.top = "0";
	this.__node__.childNodes[0].style.left = "0";
	this.__node__.childNodes[0].style.bottom = "0";
	this.__node__.childNodes[0].style.right = "0";
	this.__node__.childNodes[0].style.overflow = "auto";
	
};

AnimatedButtonWithContent.prototype.processWorkerAnswer = function ( workerData ) {
	
	switch ( workerData.type ) {
				
		case 'error':
			console.log ( 'ERROR', workerData.error );
			break;
		case 'content':
			this.activeStateData.content = workerData.content;
			this.processContent ();
			break;
		case 'finish':
			if ( this.isActive ) { this.appendContent (); }
			break;
		default:
			// move process
			this.__node__.style.width = e.data.width + "px";
			this.__node__.style.height = e.data.height + "px";
			this.__node__.style.top = e.data.top + "px";
			this.__node__.style.left = e.data.left + "px";
			break;
	}
};

AnimatedButtonWithContent.prototype.expandButton = function () {
	
	this.isActive = true;
	this.__node__.className = "animated_button_active";
	this.__node__.style.zIndex = 300;
	if ( this.activeStateData.contentType == 'img' ) {
		this.__node__.style.backgroundImage = event.target.style.backgroundImage;
		this.__node__.style.backgroundRepeat = "no-repeat";
		this.__node__.style.backgroundSize = "contain";
		this.__node__.style.backgroundPosition = "center center";
		this.__node__.style.backgroundColor = "transparent";
		this.__node__.style.border = "groove 2px white";
	} else {
		this.__node__.style.backgroundImage = "none";
		this.__node__.style.boxShadow = "inset 10px 10px 10px rgba(0,0,0,0.7)";
	}
};

AnimatedButtonWithContent.prototype.curtailButton = function () {
	this.__content__.appendChild ( this.__node__.childNodes[0] );
	this.isActive = false;
	this.__node__.className = "animated_button";
	this.__node__.style.zIndex = 0;
	this.__node__.style.backgroundImage = 'url(' + this.picture + ')';
	this.setNormalPosition ();
};

AnimatedButtonWithContent.prototype.defaultPicture = "http://fla.fg-a.com/flags/ukraine-flag-button-round.png";
AnimatedButtonWithContent.prototype.defaultWidth = "100px";
AnimatedButtonWithContent.prototype.defaultHeight = "100px";
AnimatedButtonWithContent.prototype.defaultCursor = "/cursors/gun_aim.gif";

AnimatedButtonWithContent.prototype.processButtonContent = function ( elem ) {
	
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