
//                              C O N S T R U C T O R

function CustomScrollBar ( elem ) {
	
    this._element = elem;
	this.totalHeight = this._element.scrollHeight;
	
	this.scrollbar = document.createElement('div');
	this.scrollbar.className = "scrollbar";
	this._element.parentNode.appendChild ( this.scrollbar );
	this._element.scrollbar = this.scrollbar;
	
	this.scrollbar.__element = document.createElement( 'div' );
	this.scrollbar.__element.className = "scrollbar_element";
	this.scrollbar.__element.style.width = this.scrollbar.style.width;
	this.scrollbar.appendChild ( this.scrollbar.__element );
	
	this.__pointerOver = false;
	this.__pointerDown = false;
	this.__pointerUp = false;
	this.__pointerMove = false;
	this.__pointerLeave = false;
	this.__pointerPosition = null;
	
	this._element.onpointerenter = function ( event ) { event.target.__pointerOver = true;  }
	this._element.onpointerleave = function ( event ) { event.target.__pointerOver = false; }
	this._element.onpointermove = function ( event ) {
		if ( event.target.__pointerOver && event.target.__pointerDown ) {
			event.target.scrollTop += event.clientY - event.target.__pointerPosition;
		}
	}
	this._element.onpointerdown = function ( event ) {
		if ( event.target.__pointerOver ) {
			event.target.__pointerDown = true;
			console.info ('event: pointer down; __pointerDown: ' + event.target.__pointerDown);
			event.target.style.cursor = 'url(http://garevna.pp.ua/cursors/hand-small.png) 5 5, pointer';
			//event.target.style.cursor = 'url(http://garevna.pp.ua/cursors/ring_pulse_50.gif) -25 -25, pointer';
			event.target.__pointerPosition = event.clientY;
		}
	}
	this._element.onpointerup = function ( event ) {
		
		console.info ('event: pointer up; __pointerDown: ' + event.target.__pointerDown);
		
		if ( event.target.__pointerOver && event.target.__pointerDown ) {
			event.target.style.cursor = 'default';
			event.target.__pointerDown = false;
			var step = event.target.scrollbar.__element._step;
			var _scrollTopDelta = Math.round ( ( event.clientY - event.target.__pointerPosition ) / step);
			console.info ( "/ :" + Math.round ( ( event.clientY - event.target.__pointerPosition ) / step) );
			console.log ( "* :" + Math.round ( ( event.clientY - event.target.__pointerPosition ) * step) );
			event.target.scrollTop += _scrollTopDelta;
			console.info ( 'scrollTop: ' + tmp + " -> " + event.target.scrollTop + ' __pointerDown: ' + event.target.__pointerDown );
			event.target.__pointerEnter = false;
		}
	}
	
	
	
	this._resize = this.__proto__.__resize__.bind ( this, event );
	window.addEventListener ( 'resize', this._resize );
	window.addEventListener ( 'pageshow', function __reload ( event ){
   		console.info ( 'Загрузка из кэша браузера: ' + event.persisted ); if ( event.persisted ) { window.location.reload(); }
	});
	
	this._element.addEventListener( 'scroll', this.__scroll__.bind ( this ), false );
	this._element.addEventListener( 'wheel', this.__wheel__.bind ( this ), false );
	this._resize ();
};

CustomScrollBar.prototype.currentActiveElement = null;

CustomScrollBar.prototype.__resize__ = function () {
	
	var _rect = this._element.getBoundingClientRect ();
	var localHeight = Math.round ( _rect.height );
		
	this.scrollbar.style.height = localHeight + "px";
	this.scrollbar.style.top = _rect.top + "px";
	this.scrollbar.style.left = _rect.right + "px";
	this.scrollbar.__element._step = ( localHeight - 20 ) / ( this.totalHeight - localHeight );
};

CustomScrollBar.prototype.__scroll__ = function  ( event ) {
		var _scrollY = this._element.scrollTop;
		var _scrollSize = this.scrollbar.__element._step * _scrollY;
		this.scrollbar.__element.style.top = _scrollSize + "px";
};

CustomScrollBar.prototype.__wheel__ = function  ( event ) {
		if ( event ) { event.stopImmediatePropagation(); }
    	this._element.scrollTop += event.deltaY;
};