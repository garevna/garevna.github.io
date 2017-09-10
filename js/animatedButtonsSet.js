// ========================================================================================
//                                 C O N S T R U C T O R
// ========================================================================================
function AnimatedButtonSet ( sourceURL ) {
	
	this.worker = new Worker ( '/js/json_loader.js' );
	this.worker.postMessage ( sourceURL );
	this.worker.controller = this;
	this.worker.onmessage = function ( e ) {
		if ( e.data ) { this.controller.initButtonSet ( e.data ); }
		else { alert ( 'ERROR: file was not received from server' ); return null; }
	};
	this.waitImg = new Image ();
	this.waitImg.src = "url(/buttons/bart-simpson.png)";
	document.body.appendChild ( this.waitImg );
};

AnimatedButtonSet.prototype.initButtonSet	= function ( params ) {
	
	this.worker.terminate ();
	this.worker = null;
	document.body.removeChild ( this.waitImg );
	this.__parent__ = params.__parent__ || document.body;
	this.id = params.id || this.__parent.tagName + 'ButtonSet';
	this.defaultCursor = params.defaultCursor || this.defaultCursor;
	this.ratio = params.ratio || this.defaultRatio;
	this.margin = 20;
	this.setButtonsParams ();
	
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
	// ======================== Диспетчер ==================
	this.__dispetcher__ = document.createElement ( 'div' );
	this.__parent__.appendChild ( this.__dispetcher__ );
	this.__dispetcher__.className = "dispetcher";
	this.__dispetcher__.controller = this;
	this.__dispetcher__.__elements__ = [];
	// ======================== Счетчик кнопок ==================
	this.elementsCounterValue = ( function () {
		var counter = 0;
		return function ( arg ) {
			if ( arg ) { return counter; } else { return counter++; }
		}
	})();
	// ======================= Create buttons ========================
	
	if ( params.type == 'buttonsWithContent' ) {
		for ( var i = 0; i < params.objects.length; i++ ) {
			params.objects [i].num = this.elementsCounterValue ();
			params.objects [i].controller = this;
			var $button = new AnimatedButtonWithContent ( params.objects [i] );
			this.__dispetcher__.__elements__.push ( $button.__node__ );
			this.setNormalPosition ( $button.num );
			
		}
	} else {
				var $button = document.createElement ( 'button' );
				$button.innerHTML = params.objects [i].label;
				$button.__worker__ = new Worker ( '/js/animated_buttons_dispetcher.js' );
	}
	
	this.__dispetcher__.addEventListener ( "_resize", function ( event ) {
		event.target.controller.setButtonsParams ();
		for ( var i = 0; i < event.target.__elements__.length; i++ ) {
			event.target.controller.setNormalPosition ( i );
		}
	} );
	
	this.dispetcherResizeCallback = this.winResize.bind ( this.__dispetcher__ );
	window.addEventListener( 'resize', this.dispetcherResizeCallback );
};

AnimatedButtonSet.prototype.winResize = function ( event ) {
	var win_event = new CustomEvent ( "_resize" );
	this.dispatchEvent ( win_event );
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
	// Сверху резервируется 40px, снизу - как повезет... ( если что - будет вертикальный скроллинг )
	this.btns_per_row = Math.round (( this.__parent__.offsetWidth - this.margin ) / ( this.defaultWidth + this.margin ));
	this.btns_per_col = Math.round (( this.__parent__.offsetHeight - this.margin*3 )/( this.defaultHeight + this.margin ));
}

// Set buttons normal positions ( top | left )
	
AnimatedButtonSet.prototype.setNormalPosition = function ( button_num ) {
	
	var col = button_num % ( this.btns_per_row - 1 );
	var row = ( button_num - col ) / ( this.btns_per_row - 1 );
	var _target = {
		left: col * ( this.defaultWidth + this.margin ),
		top: row * ( this.defaultHeight + this.margin ) + this.margin * 2
	};
	this.__dispetcher__.__elements__ [ button_num ].controller.moveButtonTo ( _target );
};
