// ========================================================================================
//                                 C O N S T R U C T O R
// ========================================================================================
function AnimatedButton ( params ) {
	
	this.__parent__ = params.__parent__ || document.body;
	
    this._element = document.createElement ( 'div' );
	this.__parent__.appendChild ( this._element ); 
	this._element.className = 'animated_button';
	this._element.parentObject = this;
	this._element.isActive = false;
	if ( this.__parent__.tagName == 'article' && this.__parent__.parentNode.className.indexOf ( 'animated_button' ) >= 0 ) {
			this._element.parent_node = this.__parent__.parentNode;
	} else { this._element.parent_node = this._element.parentNode; }
	
	this.picture = params.picture || this.default_picture;
	this.sourseUrl = params.ref;
	this.active = {
		contentType: params.type,
		content: ''
	};
	
	if ( this.active.contentType == 'js' ) {
		this.active.func_name = params.func_name;
		this.active.func_params = params.func_params;
	}
	this._element.style.backgroundImage = 'url(' + this.picture + ')';
	
	this.dispetcher.registerElement ( this._element );
	// ======================================================================================================= mouseenter
	this._element.onmouseenter = function ( event ) {
		
		event.target.isActive = true;
		
		if ( event.target.parentElement == document.body ) {
			var rect = { width: window.innerWidth, height: window.innerHeight }
		} else {
			var rect = { width: event.target.parent_node.offsetWidth, height: event.target.parent_node.offsetHeight };
		}
		
		var params = {
			type: 'target',
			target: {
				width: Math.round ( rect.width * 0.8 ), 
				height: Math.round ( rect.height * 0.8 ),
				top: Math.round ( rect.height * 0.1 ),
				left: Math.round ( rect.width * 0.1 )
			}
		};
		event.target.style.backgroundImage = ( event.target.parentObject.active.contentType == 'img' ) ? event.target.style.backgroundImage : "none";
		event.target.className = "animated_button_active";
		
		event.target.__worker.postMessage ( params );
		console.warn ( 'Wait for answer of driver object' );
		
		var _active = event.target.parentObject.active;
		
		event.target.style.zIndex = "300";
		
		// if ( event.target.callback ) event.target.callback ();
	};
	// ======================================================================================================= mouseleave
	this._element.onmouseleave = function ( event ) {
		
		// 1: event.target == this._element ( button ) && event.toElement == this._element.parent_node
		// 2: event.target == this._element.content ( article ) && event.toElement == this._element.parent_node
		if ( event.toElement == event.target.parentNode ) {
			console.info ( 'process event...' );
			event.target.isActive = false;
			event.target.content.style.display = 'none';
			var params = { type: 'normal' };
			event.target.className = 'animated_button';
			event.target.style.backgroundImage = 'url(' + event.target.parentObject.picture + ')';
			event.target.style.zIndex = "0";
		
			event.target.__worker.postMessage ( params );
			
		} else {
			if ( event.toElement.parentNode == event.target  || event.toElement.parentNode.parentNode == event.target ) { 
				console.info ( 'do nothing...' );
				return;
			} else {
				
				console.info ( 'I do not know what to do' );
			}
		}
	};
	document.mouseOutEvent = function ( event ) {
		console.log ( event.target );
	}
}

// ======================================= P R O T O T Y P E =======================================

AnimatedButton.prototype.id = "AnimatedButtonPrototype";
AnimatedButton.prototype.default_picture = "http://fla.fg-a.com/flags/ukraine-flag-button-round.png";

AnimatedButton.prototype.default_width = 100;
AnimatedButton.prototype.default_height = 100;
AnimatedButton.prototype.default_duration = 1;
AnimatedButton.prototype.default_interval = 50;

// ---------------------------------------- M E T H O D S ------------------------------------------

AnimatedButton.prototype.processContent = function ( obj ) {
	
	switch ( obj.active.contentType ) {
		case 'js':
			var _script = document.createElement ( 'script' );
			document.getElementsByTagName('head').item(0).appendChild ( _script );
			_script.id = "dynamically loaded";
			_script.appendChild ( document.createTextNode( obj.active.content ) ) ;
			obj._element.callback = window [ obj.active.func_name ].bind ( obj._element.content, obj.active.func_params );
			obj._element.callback ();
			break;
		case 'gallery':
			obj.active.content = JSON.parse ( obj.active.content );
			//var gallery_head = document.createElement('h2');
			//gallery_head.innerHTML = obj.active.content.galery_name;
			//article.appendChild ( gallery_head );
			article.pictures = [];
			for ( var pict = 0; pict < obj.active.content.images.length; pict++ ) {
				var _url = obj.active.content.images [ pict ].url;
				article.pictures [ pict ] = new AnimatedButton ( { __parent__: article, picture: _url, type: "img" } );
			}
			obj._element.callback = function () { article.style.display = "block"; }
			break;
		default:
			break;
	}
}
AnimatedButton.prototype.buttonsCounterValue = ( function () {
	var counter = 0;
	return function ( arg ) {
		if ( arg ) { return counter; } else { return counter++; }
	}
})();

// ======================================= D I S P E T C H E R =======================================

AnimatedButton.prototype.dispetcher = {
	id: 'buttons_dispetcher',
	elements: [],
	__interval: null,
	__element: document.createElement( 'div' )
};
AnimatedButton.prototype.dispetcher.parentObject = AnimatedButton.prototype;

// -------------------------------------------------------------------------- Регистрация нового экземпляра кнопки

AnimatedButton.prototype.dispetcher.registerElement = function ( $button ) {
		this.elements.push ( $button );
		this.numberOfButtons = this.parentObject.buttonsCounterValue ();
		$button.num = this.numberOfButtons;
		
		if ( !document.getElementById( "dispetcher_element" ) ) {
			document.body.appendChild ( this.__element );
			this.__element.id = "dispetcher_element";
			this.__element.parentObject = this;
		}
		$button.isActive = false;
		$button.content = document.createElement( 'article' );
		$button.appendChild ( $button.content );
		$button.content.parent_node = $button;
		$button.content.style.position = "absolute";
		$button.content.style.width = "100%";
		$button.content.style.height = "100%";
		$button.content.style.display = "none";
		
		$button.__worker = new Worker ('/js/animated_buttons_dispetcher.js');
		
		if ( $button.__parent__ == document.body ) {
			var rect = { width: window.innerWidth, height: window.innerHeight };
		} else {	var rect = $button.parentNode.getBoundingClientRect ();		}
		
		var params = {
			type: 'init',
			num: $button.num,
			_window: { width: rect.width, height: rect.height },
			current: {
				width: this.parentObject.default_width,
				height: this.parentObject.default_height,
				top: Math.round ( Math.random () * ( rect.height - this.parentObject.default_height ) ),
				left: Math.round ( Math.random () * ( rect.width - this.parentObject.default_width ) )
			},
			ref: $button.parentObject.sourseUrl
		};
		
		$button.style.width = params.current.width + "px";
		$button.style.height = params.current.height + "px";
		$button.style.top = params.current.top + "px";
		$button.style.left = params.current.left + "px";
		
		$button.__worker.postMessage ( params );
		
		$button.__worker.onmessage = function ( e ) {
			
			switch ( e.data.type ) {
				case 'error':
					console.log ( $button.num, 'ERROR', e.data.error );
					break;
				case 'content':
					
					$button.parentObject.active.content = e.data.content;
					$button.parentObject.processContent ( $button.parentObject );
					
					break;
				case 'finish':
					console.info ( 'Answer of driver object has been received' );
					console.log ( 'FINISH animation: button ', $button.num, ': active = ', $button.isActive, '; content: ', $button.content );
					
					//var elems = $button.content.children;
					//for ( var i = 0; i < elems.length; i++ ) {
					//	console.log ( elems [i] );
					//	var resize_event = new CustomEvent ( 'win_resize' );
					//	elems [i].dispatchEvent ( resize_event );
					//}
					
					if ( $button.content && $button.isActive ) {
						$button.content.style.display = 'block';
						var _event = new CustomEvent ( 'reform' );
						$button.content.dispatchEvent ( _event );
					}
					break;
				default:
					$button.style.width = e.data.width + "px";
					$button.style.height = e.data.height + "px";
					$button.style.top = e.data.top + "px";
					$button.style.left = e.data.left + "px";
					
					break;
			}
		};
		
		$button.addEventListener ( 'win_resize', function winResized ( event ) {
			if ( event.target.parentNode == document.body ) {
				_size = { width: window.innerWidth, height: window.innerHeight };
			} else {
				rect = event.target.parentNode.getBoundingClientRect ();
				_size = { width: rect.width, height: rect.height };
			}
			event.target.__worker.postMessage ( {
				type: 'win_resize',
				_window: _size
			} );
		} );
};

AnimatedButton.prototype.dispetcher.__element.addEventListener ( "reform", function ( event ) {
	
	for ( var j = 0; j < event.target.parentObject.elements.length; j++ ) {
		var resize_event = new CustomEvent ( 'win_resize' );
		event.target.parentObject.elements [j].dispatchEvent ( resize_event );
	}
	
} );

AnimatedButton.prototype.winResize = function () {
	var win_event = new CustomEvent ( "reform", {
  		// detail: { hazcheeseburger: true }
	});
	this.__element.dispatchEvent ( win_event );
}

AnimatedButton.prototype.__resize__ = AnimatedButton.prototype.winResize.bind ( AnimatedButton.prototype.dispetcher );

window.addEventListener( 'resize', AnimatedButton.prototype.__resize__ );