function GarevnaStylesRegistry () {
	
	this.records = [];
	this.itemsCounter = ( function () { var counter = 0; return function () { return counter++; } } ) ();
	
	this.registerStyleSheet = function ( params ) {
		if ( !params || !params.src ) return;
		var num = this.findStyleBySrc ( params.src );
		if ( !num ) { 
			num = this.itemsCounter ();
			this.records [ num ] = {};
		
			this.records [ num ].href = params.src;
			if ( !this.records [ num ].styleItem ) this.loadStyleSheetByRecordNum ( num );
			this.records [ num ].comment = params.comment || "";
		}
		return num;
	};
	
	this.loadStyleSheet = function ( $src ) {
		var __style__ = document.createElement ( 'link' );
		__style__.state = undefined;
		__style__.href = $src;
		__style__.rel = "stylesheet";
	    __style__.type = "text/css";
	    document.head.appendChild ( __style__ );
		__style__.onload = function ( e ) { console.log ('Ready stylesheet'); e.target.state = 'ready'; }
		__style__.onerror = function ( e ) { console.log ('Error stylesheet'); e.target.state = 'error'; }
		return __style__;
	}
	
	this.findStyleBySrc = function ( $href ) {
		for ( var i = 0; i < this.records.length; i++ ) {
			if ( this.records [i].href == $href ) return this.records [i];
		}
		return null;
	};
	
	this.loadStyleSheetByRecordNum = function ( recordNum ) {
		return this.loadStyleSheet ( this.records [ recordNum ].href );
	};
}