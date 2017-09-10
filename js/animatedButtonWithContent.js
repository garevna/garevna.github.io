// ========================================================================================================	
//                                  B U T T O N S    C O N S T R U C T O R
// ========================================================================================================
AnimatedButtonWithContent = function ( params ) {
	
	this.controller = params.controller;                               // Управляющий объект
	this.__parent__ = this.controller.__node__ || document.body;      // Родительский контейнер
	this.num = params.num || 0;
	this.ratio = params.ratio || this.controller.ratio || { width: 0.8, height: 0.8 };
	
	this.picture = params.picture || this.defaultPicture;
	this.defaultWidth = params.defaultWidth || this.defaultWidth;
	this.defaultHeight = params.defaultHeight || this.defaultHeight;
	
	this.pictureSize = ( function getPictureSize ( pictureURL ) {
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
	this.__node__.controller = this;
	this.__node__.className = 'animated_button';
	this.__node__.style.width = this.defaultWidth + "px";
	this.__node__.style.height = this.defaultHeight + "px";
	this.__node__.style.backgroundImage = "url(" + this.picture + ")";
	
	this.__parent__.appendChild ( this.__node__ );
	
	var workerData = {
		type: 'init',
		num: params.num,
		_window: { width: this.__parent__.offsetWidth, height: this.__parent__.offsetHeight },
		current: {
			width: this.defaultWidth,
			height: this.defaultHeight,
			top: Math.round ( Math.random () * ( this.__parent__.offsetHeight - this.defaultHeight ) ),
			left: Math.round ( Math.random () * ( this.__parent__.offsetWidth - this.defaultWidth ) )
		},
		ref: params.ref
	};
	
	this.__node__.style.top = workerData.current.top + "px";
	this.__node__.style.left = workerData.current.left + "px";
	
	this.activeStateData = {
		sourseUrl: params.ref,
		contentType: params.contentType || 'img',
		content: null,
		func_name: params.func_name || null,
		func_params: params.func_params || null,
		image_size: this.pictureSize
	};
	
	this.__worker__ = new Worker ( '/js/animated_buttons_dispetcher.js' );
	this.__worker__.controller = this;
	this.__worker__.onmessage = function ( e ) {
		this.controller.processWorkerAnswer.call ( this.controller, e.data );
	};
	
	this.__content__ = document.createDocumentFragment();
	
	this.__node__.onmouseenter = function ( event ) {
		event.target.style.cursor = "default";
		event.target.controller.expandButton.call ( event.target.controller );
	};
	this.__node__.onmouseleave = function ( event ) {
		
		event.target.controller.curtailButton.call ( event.target.controller );
	};
	
	// this.num = this.controller.registerNewElement ( this );
	this.__worker__.postMessage ( workerData );
};

AnimatedButtonWithContent.prototype.moveButtonTo = function ( $target ) {
	this.__worker__.postMessage ( {
		type: "target",
		target: {
			width: this.defaultWidth,
			height: this.defaultHeight,
			top: $target.top,
			left: $target.left
		}
	} );
};

// ============================== P R O T O T Y P E =====================================

AnimatedButtonWithContent.prototype.appendContent = function () {
	
	this.__node__.style.backgroundImage = 'none';
	console.dir ( this.__content__ );
	this.__node__.appendChild ( this.__content__ );
};

AnimatedButtonWithContent.prototype.processWorkerAnswer = function ( workerData ) {
	switch ( workerData.type ) {
				
		case 'error':
			console.log ( 'ERROR', workerData.error );
			break;
		case 'content':
			this.activeStateData.content = workerData.content;
			console.log ( this.activeStateData.content );
			this.processButtonContent ();
			break;
		case 'finish':
			if ( this.isActive ) { this.appendContent (); }
			break;
		default:
			// move process
			this.__node__.style.width = workerData.width + "px";
			this.__node__.style.height = workerData.height + "px";
			this.__node__.style.top = workerData.top + "px";
			this.__node__.style.left = workerData.left + "px";
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
		this.__node__.style.overflow = "auto";
	}
	this.__worker__.postMessage ( {
		type: "target",
		target: {
			width: Math.round ( this.__parent__.offsetWidth * this.ratio.width ),
			height: Math.round ( this.__parent__.offsetHeight * this.ratio.height ),
			top: Math.round ( this.__parent__.offsetHeight * ( 1 - this.ratio.height ) /2 ),
			left: Math.round ( this.__parent__.offsetWidth * ( 1 - this.ratio.width ) / 2 )
		}
	} )
};

AnimatedButtonWithContent.prototype.curtailButton = function () {
	
	for ( var i = 0; i < this.__node__.childNodes.length; i++ ) {
		this.__content__.appendChild ( this.__node__.childNodes[i] );
	}
	
	this.isActive = false;
	this.__node__.className = "animated_button";
	this.__node__.style.zIndex = 0;
	this.__node__.style.backgroundImage = 'url(' + this.picture + ')';
	this.controller.setNormalPosition ( this.num );
};

AnimatedButtonWithContent.prototype.defaultPicture = "/buttons/education.png";
AnimatedButtonWithContent.prototype.defaultWidth = 100;
AnimatedButtonWithContent.prototype.defaultHeight = 100;
AnimatedButtonWithContent.prototype.defaultCursor = "/cursors/gun_aim.gif";
// ====================================================================================== processButtonContent
AnimatedButtonWithContent.prototype.processButtonContent = function () {
	var article = document.createElement ( 'article' );
	article.style.position = "absolute";
	article.style.top = "0";
	article.style.left = "0";
	article.style.bottom = "0";
	article.style.right = "0";
	article.style.overflow = "auto";
	
	if ( this.activeStateData.contentType == 'js' || this.activeStateData.contentType == 'constructor' ) {
		var _script = document.createElement ( 'script' );
		document.getElementsByTagName ( 'head' ).item (0).appendChild ( _script );
		_script.className = "dynamically_loaded";
		_script.appendChild ( document.createTextNode ( this.activeStateData.content ) );
		console.info ( this.activeStateData.func_name );
		var func = window [ this.activeStateData.func_name ];
		console.log ( '**** ', func );
	}
	
	switch ( this.activeStateData.contentType ) {
		case 'js':
			var constructor = func.bind ( article, this.activeStateData.func_params );
			constructor ();
			this.__content__.appendChild ( article );
			console.dir ( 'JS: ', this.__content__ );
			break;
		case 'constructor':
			var content = new func ( article, this.activeStateData.func_params );
			console.log ( content );
			break;
		case 'img':
			
			break;
		case 'text':
			article.innerHTML = this.activeStateData.content;
			this.__content__.appendChild ( article );
			break;
		default:
			article.innerHTML = this.activeStateData.content;
			this.__content__.appendChild ( article );
			console.dir ( 'html: ', this.__content__ );
			break;
	}
	console.log ( this.__content__ );
}