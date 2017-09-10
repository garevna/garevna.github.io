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
// ================================================================================================ ScriptsRegistry
function GarevnaScriptsRegistry () {
	
	this.records = [];
	this.itemsCounter = ( function () { var counter = 0; return function () { return counter++; } } ) ();
	
	this.worker = new Worker ( '/js/loader.js' );
	this.worker.onmessage = function ( mess ) {
		console.log ( 'GarevnaScriptsRegistry received data: ', mess.data );
	}
	
	this.registerScript = function ( params ) {
		if ( !params || !params.src ) return;
		console.log ( 'GarevnaScriptsRegistry.registerScript params: ', params );
		if ( this.findScriptBySrc ( params.src ) ) return;
		var num = this.itemsCounter ();
		this.records [ num ] = {};
		
		this.records [ num ].src = params.src;
		this.records [ num ].external = params.external;
		if ( params.external ) {
			this.records [ num ].defer = params.defer || false;
			this.records [ num ].async = params.async || true;
		}
		this.records [ num ].funcs = Array.isArray ( params.functions ) ? params.functions : [ params.functions ];
		this.records [ num ].scriptItem = params.script || null;
		this.records [ num ].comment = params.comment || "";
		this.loadScriptByRecordNum ( num );
		console.log ( num, ': ', this.records [ num ] );
		return num;
	};
	
	this.loadExternalScript = function ( $src, $defer, $async ) {
		var __script__ = document.createElement ( 'script' );
		__script__.state = undefined;
		__script__.src = $src;
		__script__.type = 'text/javascript';
		__script__.defer = $defer;
		__script__.async = $async;
		document.head.appendChild ( __script__ );
		__script__.onload = function ( e ) { console.log (__script__); e.target.state = 'ready'; }
		__script__.onerror = function ( e ) { e.target.state = 'error'; }
	}
	this.loadScript = function ( src ) { this.worker.postMessage ( src ); }
	
	this.findScriptByFunction = function ( funcName ) {
		for ( var i = 0; i < this.records.length; i++ ) {
			var script = this.records [i];
			for ( var j = 0; j < script.funcs.length; j++ ) {
				if ( script.funcs [j] == funcName ) return script;
			}
		}
		return null;
	};
	
	this.findScriptBySrc = function ( $src ) {
		for ( var i = 0; i < this.records.length; i++ ) {
			if ( this.records [i].src == $src ) return this.records [i];
		}
		return null;
	};
	
	this.loadScriptByRecordNum = function ( recordNum ) {
		var script = this.records [ recordNum ];
		if ( script.external ) return this.loadExternalScript ( script.src, script.defer, script.async );
		else this.loadScript ( script.src );
	};
	
	this.loadNewScript = function ( params ) {
		if ( !params || !params.src || !params.functions || !params.external ) return;
		var num = this.registerScript ( params );
		this.loadScriptByRecordNum ( num );
		
	};
}

