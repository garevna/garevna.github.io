// ========================================================================================
//                                 C O N S T R U C T O R
// ========================================================================================
function AnimatedButton ( params ) {
	
    this._element = document.createElement ( 'div' );
	document.body.appendChild ( this._element ); 
	this._element.className = 'animated_button';
	this._element.parentObject = this;
	
	this.picture = params.picture || this.default_picture;
	this._element.style.backgroundImage = 'url(' + this.picture + ')';
	
	this.dispetcher.registerElement ( this._element );
	
	this._element.onmouseover = function ( event ) {
		event.target.target_width = Math.round ( window.innerWidth * 0.8 );
		event.target.target_height = Math.round ( window.innerHeight * 0.8 );
		event.target.target_top = Math.round ( window.innerHeight * 0.1 );
		event.target.target_left = Math.round ( window.innerWidth * 0.1 );
		event.target.className = 'animated_button_active';
		
		event.target.isActive = true;
		var size_event = new CustomEvent ( 'changesize' );
		event.target.dispatchEvent ( size_event );
		var move_event = new CustomEvent ( 'move' );
		event.target.dispatchEvent ( move_event );
		
	};
	this._element.onmouseout = function ( event ) {
		
		event.target.target_width = event.target.parentObject.default_width;
		event.target.target_height = event.target.parentObject.default_height;
		event.target.target_top = event.target.parentObject.dispetcher.btn_coords [ event.target.num ].y;
		event.target.target_left = event.target.parentObject.dispetcher.btn_coords [ event.target.num ].x;
		event.target.className = 'animated_button';
		event.target.isActive = false;
		var size_event = new CustomEvent ( 'changesize' );
		event.target.dispatchEvent ( size_event );
		var move_event = new CustomEvent ( 'move' );
		event.target.dispatchEvent ( move_event );
	};
}

// ======================================= P R O T O T Y P E =======================================

AnimatedButton.prototype.id = "AnimatedButtonPrototype";
AnimatedButton.prototype.default_picture = "http://fla.fg-a.com/flags/ukraine-flag-button-round.png";

AnimatedButton.prototype.default_width = 100;
AnimatedButton.prototype.default_height = 100;
AnimatedButton.prototype.default_duration = 1;
AnimatedButton.prototype.default_interval = 50;
// ---------------------------------------- M E T H O D S ------------------------------------------
AnimatedButton.prototype.move_callback = function ( event ) {
	
}

AnimatedButton.prototype.changesize_callback = function ( event ) {
	console.info ( 'changesize callback | event.target.num: ' + event.target.num );
	var func = event.target.parentObject.mc_button.bind ( event.target );
	func ( "size" );
}

AnimatedButton.prototype.mc_button = function ( typ ) {
	
	//  typ:   "size" || "move"
	
	var x = ( typ == "size" ) ? "width" : "left";
	var y = ( typ == "size" ) ? "height" : "top";
	
	var k = ( this.parentObject.default_interval / 1000 ) / this.parentObject.default_duration;   //  0.1
	 
	var __interval = 'interval_' + typ;
	
	if ( this [ __interval ] ) clearInterval ( this [ __interval ] );
	
	this [ __interval ] = setInterval ( function () {
		
		var dx = this [ "target_" + arguments[0] ] - this [ "_" + arguments[0] ];
		var dy = this [ "target_" + arguments[1] ] - this [ "_" + arguments[1] ];
		
		if ( dx == 0 && dy == 0 ) {  clearInterval ( arguments [2] );  return; }
		
		var stepX = arguments [3] * Math.abs ( dx );
		var stepY = arguments [3] * Math.abs ( dy );
		
		var signX = dx / Math.abs ( dx );
		var signY = dy / Math.abs ( dy );
		
		this [ arguments [0] ] += signX * Math.min ( Math.abs ( dx ), Math.abs ( stepX ) );
		this [ arguments [1] ] += signY * Math.min ( Math.abs ( dy ), Math.abs ( stepY ) );
		
		this.style[ arguments [0] ] = this [ "_" + arguments[0] ] + "px";
		this.style[ arguments [1] ] = this [ "_" + arguments[1] ] + "px";
		
	}.bind (this, x, y, this [ __interval ], k ), this.parentObject.default_interval );
	
	console.info ( 'this.interval: ' + this [ __interval ] );
}

AnimatedButton.prototype.setElementStartPosition = function () {
	this._element._top = Math.round ( Math.random () * ( window.innerHeight - this._height ) );
	this._element._left = Math.round ( Math.random () * ( window.innerWidth - this._width ) );
	this._element.style.top = this._element._top + "px";
	this._element.style.left = this._element._left + "px";
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

AnimatedButton.prototype.dispetcher.parentObject = AnimatedButton.prototype;
AnimatedButton.prototype.dispetcher.bnt_per_row = Math.round ( ( window.innerWidth - 10 ) / ( AnimatedButton.prototype.default_width + 10 ) );
AnimatedButton.prototype.dispetcher.bnt_per_col = Math.round ( ( window.innerHeight - 10 ) / ( AnimatedButton.prototype.default_height + 10 ) );

// -------------------------------------------------------------------------- Регистрация нового экземпляра кнопки

AnimatedButton.prototype.dispetcher.registerElement = function ( element ) {
		this.elements.push ( element );
		this.numberOfButtons = this.parentObject.buttonsCounterValue ();
		element.num = this.numberOfButtons;
		
		if ( !document.getElementById( "dispetcher_element" ) ) {
			document.body.appendChild ( this.__element );
			this.__element.id = "dispetcher_element";
			this.__element.parentObject = this;
		}
		if ( !this.btn_coords ) {
			this.setButtonsNormalPosition ();
		}
		element._width = this.parentObject.default_width;
		element._height = this.parentObject.default_height;
		element._top = Math.round ( Math.random () * ( window.innerHeight - element._height ) );
		element._left = Math.round ( Math.random () * ( window.innerWidth - element._width ) );
		element.style.width = element._width + "px";
		element.style.height = element._height + "px";
		element.style.top = element._top + "px";
		element.style.left = element._left + "px";
		element.target_width = element._width;
		element.target_height = element._height;
		element.target_top = this.btn_coords [ this.numberOfButtons ].y;
		element.target_left = this.btn_coords [ this.numberOfButtons ].x;
		element.__worker = new Worker ('/js/animated_buttons_dispetcher.js');
		element.__worker.postMessage ( { type:'init', width:element._width, height:element._height, top:element._top, left:element._left, target_width:element.target_width, target_height:element.target_height, target_top:element.target_top, target_left:element.target_left } );
		element.__worker.onmessage = function ( e ) {
			console.log (e);
		};
		
		element.addEventListener ( 'move', function moveCallback ( event ) {
			console.info ( 'move callback | event.target.num: ' + event.target.num );
			var func = event.target.parentObject.mc_button.bind ( event.target );
			console.log ( 'callback: ', func );
			func ( "move" );
		});
		
		element.addEventListener ( 'changesize', function moveCallback ( event ) {
			console.info ( 'changesize callback | event.target.num: ' + event.target.num );
			var func = event.target.parentObject.mc_button.bind ( event.target );
			console.log ( 'callback: ', func );
			func ( "size" );
		});
		
		var elem_event = new CustomEvent ( 'move' );
		// console.log ('********************', elem_event);
		element.dispatchEvent ( elem_event );
};
	
AnimatedButton.prototype.dispetcher.resizeWin = function () {
		this.bnt_per_row = Math.round ( ( window.innerWidth - 10 ) / ( this.parentObject.default_width + 10 ) );
		this.bnt_per_col = Math.round ( ( window.innerHeight - 10 ) / ( this.parentObject.default_height + 10 ) );
};
	
AnimatedButton.prototype.dispetcher.setButtonsNormalPosition = function () {
	
		this.btn_coords = [];
		var k = 0;
		for ( var col = 0; col < this.bnt_per_row; col++ ) {
			var _x = col * this.parentObject.default_width + 10;
			for ( var row = 0; row < this.bnt_per_col; row++ ) {
				this.btn_coords [k] = { x: _x, y: row * this.parentObject.default_height + 10 }
				k++;
			}
		}
};
    
AnimatedButton.prototype.dispetcher.dispatchEventToButtons = function () { 
		var btnEvent = new CustomEvent ( 'move' );
		for ( var j = 0; j < this.elements.length; j++ ) { this.elements [j].dispatchEvent ( btnEvent ); }
};

// =================================== Анимация движения кнопок в нормальное положение 
	
AnimatedButton.prototype.dispetcher.animateButtons = function () {
	console.info ("*************** dispetcher works! ********************");
		var winRatio = window.innerHeight / window.innerWidth;
		var normalStep = 10;
		var maxStepY = Math.min ( Math.round ( winRatio * normalStep ), 10 );
		var maxStepX = Math.round ( maxStepY / winRatio );
		
		function mc_elems () {
			// Один шаг анимации
			var _continue = false;
			for ( var i = 0; i < this.elements.length; i++ ) {
				if ( this.elements [i].isActive ) {
					console.info ( i + ': element is active');
					continue;
				}
				var mc_top = this.btn_coords [i].y - this.elements [i]._top;
				if ( mc_top != 0 ) {
						var signY = mc_top / Math.abs ( mc_top );
						var stepY = Math.min ( Math.abs ( mc_top ), maxStepY );
						this.elements [i]._top += signY * stepY;
						this.elements [i].style.top = this.elements [i]._top + "px";
				}
				var mc_left = this.btn_coords [i].x - this.elements [i]._left;
				if ( mc_left != 0 ) {
						var signX = mc_left / Math.abs ( mc_left );
						var stepX = Math.min ( Math.abs ( mc_left ), maxStepX );
						this.elements [i]._left += signX * stepX;
						this.elements [i].style.left = this.elements [i]._left + "px";
				}
				_continue = ( mc_top != 0 || mc_left != 0 ) ? true : _continue;
			}
			if ( !_continue ) { clearInterval ( this.__interval ); this.__interval = null; }
		};
	
		if ( !this.__interval ) {
			var func = mc_elems.bind ( this );
			this.__interval = setInterval ( func, 50 );
		}
};


AnimatedButton.prototype.dispetcher.__element.addEventListener ( "reform", function ( event ) {
	
	event.target.parentObject.resizeWin ();
	event.target.parentObject.setButtonsNormalPosition ();
	event.target.parentObject.animateButtons ();
} );

AnimatedButton.prototype.winResize = function () {
	var win_event = new CustomEvent ( "reform", {
  		// detail: { hazcheeseburger: true }
	});
	this.dispetcher.__element.dispatchEvent ( win_event );
}

AnimatedButton.prototype.__resize__ = AnimatedButton.prototype.winResize.bind ( AnimatedButton.prototype );

window.addEventListener( 'resize', AnimatedButton.prototype.__resize__ );