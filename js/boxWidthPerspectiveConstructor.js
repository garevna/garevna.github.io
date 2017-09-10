PerspectiveBoxConstructor = function ( params ) { 
	
	this.initEventModel ();
	
		this.__parent__ = params.parent || document.body;		
		this.__sides__ = {};
		
		this.classPrefix = params.classPrefix || "garevna";
		if ( !this.classes ) this.defineClasses ();
		if ( !this.positions ) this.definePositions ();
		
		var paramsHlp = "Arguments needed: ";
		paramsHlp += "'{ parent: { html element - container }, sides: [ array of sides params ] }";
		
		if ( !params ) {
			console.warn ( "PerspectiveSideConstructor: There are no arguments. " + paramsHlp + '\nparent will be body element, sides you may build by method "createSide ( { side params } )"');
		}
		if ( !params.sides ) {
			console.warn ( "PerspectiveSideConstructor: there are no elements" + paramsHlp );
		}
		
		this.backgroundColor = params.backgroundColor || this.__parent__.style.backgroundColor || "rgba(255,255,255,0.7)";
		this.color = params.color || this.__parent__.style.color || "#333";
		this.scrollbarColor = params.scrollbarColor || "#fd2";
		this.border = params.border || this.__parent__.style.border || "inset 1px";
		this.boxShadow = params.boxShadow || undefined;
		this.__main__ = document.createElement ( 'div' );
		this.__main__.className = this.classes.mainSection;
		this.__parent__.appendChild ( this.__main__ );
		this.__main__.style.backgroundColor = this.backgroundColor;
		if ( params.mainContentURL ) { this.getContent ( params.mainContentURL, this.__main__ ); }
		else { this.__main__.innerHTML = params.mainContent ? params.mainContent : ""; }
		this.__parent__.style.fontFamily = this.__parent__.style.fontFamily ? this.__parent__.style.fontFamily : "Arial";
		this.__parent__.style.fontSize = this.__parent__.style.fontSize ? this.__parent__.style.fontSize : "14px";
		this.__parent__.style.zIndex = this.__parent__.style.zIndex ? this.__parent__.style.zIndex : 0;
		this.cssInit ();
		this.__parent__.className = this.classes.container;
		if ( params.sides ) {
			for ( var s = 0; s < params.sides.length; s++ ) {
				if ( params.sides [s] && params.sides [s].contentType && ( params.sides [s].content || params.sides [s].contentURL ) && params.sides [s].position ) {
					this.createSide ( params.sides [s] );
				} else {
					console.warn ( "Constructor needs arguments (object) to build 3D element in parent container.\nThis arguments should be: \n{ position: 'left' | 'right' | 'top' | 'bottom' , \ncontentType: 'img' | 'text', \ncontent: '...some text here...' or contentURL: 'URL' }. \nAll values should be string. \nIf contentType == 'img', contentURL should be defined (img src). \nIf contentType == 'text' and text is placed in some file on the same domain, contentURL should be defined. \nIn other cases content should be defined as string" ); 
				}
			}
		}
	
	window.addEventListener( 'resize', this.cssResize.bind ( this ) );
	
	// ================================ TEST CUSTOM EVENT ===================================
	window.onload = function ( event ) {
		if ( !window.CustomEvent ) {
			console.warn ( "*** Ваш браузер не поддерживает CustomEvent. Встраиваем поддержку..." );
			window.CustomEvent = function ( eventType, eventDetails ) {
				var newEvent = document.createEvent ( 'Event' );
				newEvent.initEvent ( eventType );
				// if ( eventDetails ) console.log ( eventDetails.details );
				newEvent.details = eventDetails ? eventDetails.details : null;
				// console.log ( newEvent );
				return newEvent;
			}
		}
	}
	return this;
}

PerspectiveBoxConstructor.prototype.getContent = function ( contentURL, elem ) {
	var request = new XMLHttpRequest ();
	request.fileURL = contentURL;
	request.__parent__ = elem;
	request.onreadystatechange = function () {
		if ( this.readyState == 4 ) {
			if ( this.status == 200 ) this.__parent__.innerHTML = this.responseText;
			else { console.error ( 'File processing error: ' + this.fileURL ); }
		}
	}
	request.open ( 'GET', contentURL );
	request.send ();
}

PerspectiveBoxConstructor.prototype.testImageSize = function ( imageURL, obj ) {
	var shadowDOM = document.createElement ('body');
	document.documentElement.appendChild ( shadowDOM );
	shadowDOM.className = "shadowDOM";
	
	var picture = new Image ();
		picture.src = imageURL;
		picture.targetObject = obj;
		picture.parentObject = this;
		picture.onload = function ( event ) {
			event.target.targetObject.size = { width: picture.offsetWidth, height: picture.offsetHeight };
			shadowDOM.removeChild ( event.target );
			event.target.parentObject.cssRuleResize ( event.target.targetObject.parentNode.position );
			document.documentElement.removeChild ( shadowDOM );
		}
	shadowDOM.appendChild ( picture );
};

window.__vendor__ = window.WebKitCSSKeyframesRule ? 1 : 0;
window.__cssPrefix__ = ( window.WebKitCSSKeyframesRule ) ? "-webkit-" : "";

PerspectiveBoxConstructor.prototype.insertKeyframesRuleToStyleSheet = function ( sheet, $rule ) {
	var keyframesRule = "@" + __cssPrefix__ + "keyframes " + $rule.name;
	if ( __vendor__ ) {
		var __keyframesRule__ = keyframesRule + "{";
		for ( var i = 0; i < $rule.keyframeRules.length; i++ ) {
			$rule.keyframeRules [i] = $rule.keyframeRules [i].replace ( "transform", __cssPrefix__ + "transform" );
			__keyframesRule__ += $rule.keyframeRules [i];
		}
		__keyframesRule__ += "}";
		sheet.insertRule ( __keyframesRule__, sheet.cssRules.length );
	} else {
		sheet.insertRule ( keyframesRule + '{}', sheet.cssRules.length );
		var __keyframesRule__ = sheet.cssRules [ sheet.cssRules.length - 1 ];	
		for ( var i = 0; i < $rule.keyframeRules.length; i++ ) {
			__keyframesRule__.appendRule ( $rule.keyframeRules [i] );
		}
	}
}
// ===========================================================================================
//                                C R E A T E    S I D E
// ===========================================================================================
PerspectiveBoxConstructor.prototype.createSide = function ( params ) {
	
	if ( !params.position ) { return null; }
		
	this.__sides__ [ params.position ] = document.createElement ( 'div' );
	this.__parent__.appendChild ( this.__sides__ [ params.position ] );
		
	var __side__ = this.__sides__ [ params.position ];
	__side__.parentObject = this;
	
	__side__.className = this.classes [ params.position ];
	
	__side__.position = params.position;
	__side__.__content__ = document.createElement ( 'div' );
	__side__.appendChild ( __side__.__content__ );
	__side__.__content__.className = "perspectiveBoxSideContent";
		
	var __content__ = this.__sides__ [ params.position ].__content__;
		
	if ( params.contentType == 'img' ) {
			this.testImageSize ( params.contentURL, __side__.__content__ );
			__side__.__content__.style.backgroundImage = 'url(' + params.contentURL + ')';
			__side__.__content__.style.backgroundSize = 'contain';
			__side__.__content__.style.backgroundRepeat = 'no-repeat';
			__side__.__content__.style.backgroundPosition = 'center center';			
	} else {
			if ( params.contentURL ) this.getContent ( params.contentURL, __side__.__content__ );
			else __side__.__content__.innerHTML = params.content || "";
	}
	__side__.addEventListener ( 'mouseenter', this.mc_side.bind ( __side__ ), true );
	__side__.addEventListener ( 'mouseleave', this.mc_side.bind ( __side__ ), true );
	
	this.mainSectionCSSResize ( __side__.position );
}
PerspectiveBoxConstructor.prototype.mc_side = function ( event ) {
	
	this.style.zIndex = ( event.type == 'mouseenter' ) ? "100" : "5";
	var prefix = this.parentObject.positions [ this.className ];
	var animationName = prefix + ( "SideTurnO" + ( ( event.type == 'mouseenter' ) ? "n" : "f" ) );
	var cssAttr = __vendor__ ? "-webkit-animation" : "animation";
	this.style [ cssAttr ] = animationName + " 2s forwards";
}

PerspectiveBoxConstructor.prototype.classes = null;
PerspectiveBoxConstructor.prototype.defineClasses = function () {
	if ( !this.classPrefix ) {
		console.warn ( 'Prefix for class names was not defined yet. The prefix will be "garevna"' );
		this.classPrefix = "garevna";
	}
	this.classes = {
		container: this.classPrefix + "_perspectiveContainer",
		mainSection: this.classPrefix + "_mainSectionOfPerspectiveContainer",
		left: this.classPrefix + "_perspectiveLeftSide",
		right: this.classPrefix + "_perspectiveRightSide",
		top: this.classPrefix + "_perspectiveTopSide",
		bottom: this.classPrefix + "_perspectiveBottomSide"
	}
}

PerspectiveBoxConstructor.prototype.positions = null;
PerspectiveBoxConstructor.prototype.definePositions = function () {
	if ( !this.classes ) this.defineClasses ();
	this.positions = {};
	this.positions [ this.classes.left ] = 'left';
	this.positions [ this.classes.right ] = 'right';
	this.positions [ this.classes.top ] = 'top';
	this.positions [ this.classes.bottom ] = 'bottom';
}

PerspectiveBoxConstructor.prototype.getMainSectionCSSRule = function () {
	var sheet = document.getElementById ( "stylesOfPerspectiveSides" ).sheet;
	for ( var i = 0; i < sheet.cssRules.length; i++ ) {
		if ( sheet.cssRules [i].selectorText == "." + this.classes.mainSection ) {
			return sheet.cssRules [i];
		}
	}
}

PerspectiveBoxConstructor.prototype.cssInit = function () {
	if ( !this.classes ) this.defineClasses ();
	
	var cssRulesOfSides = [
		
		//"::-webkit-scrollbar-button{background-image:url('');background-repeat:no-repeat;width:6px;height:0px;}",
		//"::-webkit-scrollbar-track{background-color:#444;box-shadow:0px 0px 3px #000 inset;}",
		//"::-webkit-scrollbar-thumb{-webkit-border-radius:5px;border-radius:5px;background-color:" + this.scrollbarColor + ";/*box-shadow:0px 1px 1px #fff inset*/;background-image:url('/ico/scrollbar.png');background-position:center center;background-repeat:no-repeat;background-size:contain;} ",
		//"::-webkit-resizer{ background-image:url('');background-repeat:no-repeat;width:6px;height:0px;}",
		//"::-webkit-scrollbar{width: 8px;}",
		".shadowDOM { position: fixed; top: 2000px; }",
			"." + this.classes.mainSection + "{ position:absolute; z-index:0; padding: 20px 30px; overflow: auto; }",
			"." + this.classes.container + "{ position:fixed; top:0; left:0; right:0; bottom:0; box-sizing:border-box; -webkit-perspective:400px; -webkit-perspective-origin: 50% 50%; perspective:400px; perspective-origin: 50% 50%; }",
				
			"." + this.classes.bottom + ",." + this.classes.top + ",." + this.classes.right + ",." + this.classes.left + "{ position:absolute; box-sizing:border-box; background-size:90%; background-position:center center; overflow:hidden; background-repeat:no-repeat; border:" + this.border + ";" + ( this.boxShadow ? ( "box-shadow:" + this.boxShadow ) : "" ) + "; padding:4%; text-align:justify; z-index:5; background-color:" + this.backgroundColor + "; color:" + this.color + " }",
				
			"." + this.classes.bottom + ",." + this.classes.top + "{ height:100px; width:100%; }",
				
			"." + this.classes.right + ",." + this.classes.left + "{ width:100px; height:100%; }",
				
			"." + this.classes.bottom + "{ bottom:0; -webkit-transform-origin: 50% 100%; transform-origin: 50% 100%; -webkit-transform: rotateX(90deg); transform: rotateX(90deg); }",
				
			"." + this.classes.top + "{ top:0; -webkit-transform-origin: 50% 0%; transform-origin: 50% 0%; -webkit-transform: rotateX(-90deg); transform: rotateX(-90deg); }",
				
			"." + this.classes.right + "{ right:0%; -webkit-transform-origin: 100% 100%; transform-origin: 100% 100%; -webkit-transform: rotateY(-90deg); transform: rotateY(-90deg); }",
				
			"." + this.classes.left + "{ left:0%; -webkit-transform-origin: 0% 0%; transform-origin: 0% 0%; -webkit-transform: rotateY(120deg); transform: rotateY(90deg); }",
			".perspectiveBoxSideContent { position:absolute; box-sizing:border-box; top:0; left:0; right:0; bottom:0; padding: 10px 20px; }"
		];
		var cssKeyframesRulesDefinition = {
			left: {
				normal: "{ transform: rotateY(90deg); width:100px; overflow: hidden; }",
				wide:   "{ transform: rotateY(0deg); width: 50%; overflow: auto; }"
			},
			top: {
				normal: "{ transform: rotateX(-90deg); height:100px; overflow: hidden; }",
				wide:   "{ transform: rotateX(0deg); height:50%; overflow: auto; }"
			},
			bottom: {
				normal: "{ transform: rotateX(90deg); height:100px; overflow: hidden; }",
				wide:   "{ transform: rotateX(0deg); height:50%; overflow: auto; }"
			},
			right: {
				normal: "{ transform: rotateY(-90deg); width:100px; overflow: hidden; }",
				wide:   "{ transform: rotateY(0deg); width: 50%; overflow: auto; }"
			}
		};
		
		var __cssKeyframesRules = {
				
				leftSideTurnOn: [
					"0%" + cssKeyframesRulesDefinition.left.normal,
					"100%" + cssKeyframesRulesDefinition.left.wide ],
				leftSideTurnOf: [
					"0% " + cssKeyframesRulesDefinition.left.wide,
					"100%" + cssKeyframesRulesDefinition.left.normal ],
				rightSideTurnOn: [
					"0%" + cssKeyframesRulesDefinition.right.normal,
					"100%" + cssKeyframesRulesDefinition.right.wide ],
				rightSideTurnOf: [
					"0%" + cssKeyframesRulesDefinition.right.wide,
					"100%" + cssKeyframesRulesDefinition.right.normal ],
				topSideTurnOn: [
					"0%" + cssKeyframesRulesDefinition.top.normal,
					"100%" + cssKeyframesRulesDefinition.top.wide ],
				topSideTurnOf: [
					"0%" + cssKeyframesRulesDefinition.top.wide,
					"100%" + cssKeyframesRulesDefinition.top.normal ],
				bottomSideTurnOn: [
					"0%" + cssKeyframesRulesDefinition.bottom.normal,
					"100%" + cssKeyframesRulesDefinition.bottom.wide ],
				bottomSideTurnOf: [
					"0%" + cssKeyframesRulesDefinition.bottom.wide,
					"100%" + cssKeyframesRulesDefinition.bottom.normal ]
		};
		
		var __cssRules = Object.keys ( __cssKeyframesRules );
		
		if ( !document.getElementById ( "stylesOfPerspectiveSides" ) ) {
			var sheetTag = document.createElement ( 'style' );
			sheetTag.appendChild(document.createTextNode(""));
			sheetTag.id = "stylesOfPerspectiveSides";
			document.head.appendChild ( sheetTag );
			var sheet = sheetTag.sheet;
			for ( var i = 0; i < cssRulesOfSides.length; i++ ) {
				sheet.insertRule ( cssRulesOfSides [i], i );
			}
		}
		this.mainSectionCSSRule = this.getMainSectionCSSRule ();
		
		var sheetTag = document.getElementById ( "keyFramesOfPerspective" );
		if ( !sheetTag ) {
			
			sheetTag = document.createElement ( 'style' );
			sheetTag.appendChild(document.createTextNode(""));
			sheetTag.id = "keyFramesOfPerspective";
			document.head.appendChild ( sheetTag );
			
			// Build array of reference to css rules by side
			var sheet = sheetTag.sheet;
			var ind = 0;
			for ( var key in __cssKeyframesRules ) {
				var _rule = {
					name: key,
					keyframeRules: [ __cssKeyframesRules [ key ] [0], __cssKeyframesRules [ key ] [1] ]
				};
				this.insertKeyframesRuleToStyleSheet ( sheet, _rule );
			}
		}
}
PerspectiveBoxConstructor.prototype.mainSectionCSSResize = function ( side ) {
	
	if ( !this.__sides__ [ side ] ) var rect = { width: 0, height: 0 };
	else var rect = this.__sides__ [ side ].getBoundingClientRect ();
	var size = ( side == 'top' || side == 'bottom' ) ? rect.height : rect.width;
	this.mainSectionCSSRule.style [ side ] = Math.round ( size ) + "px";
}

PerspectiveBoxConstructor.prototype.testEvent = function ( _event ) {
	return ( 'on' + _event ) in document.createElement ( 'div' );
}
PerspectiveBoxConstructor.prototype.initEventModel = function () {
	if ( !this.testEvent ( 'mouseenter' ) /*|| Object.keys ( Event ).indexOf ( 'MOUSEOVER' ) >= 0*/ ) {
		document.body.addEventListener ( 'mouseover', function createMouseEnterEvent ( event ) {
			try {
				var mouseenterEvent = new MouseEvent ( 'mouseenter', {
    				'view': window,
    				'bubbles': false,
    				'cancelable': true
				} );
			} catch ( err ) {
				var mouseenterEvent = document.createEvent ( 'Event' );
				mouseenterEvent.initEvent ( 'mouseenter', false, true );
			}
			event.target.dispatchEvent ( mouseenterEvent );
		}, true );
	}
	if ( !this.testEvent ( 'mouseleave' ) /*|| Object.keys ( Event ).indexOf ( 'MOUSEOUT' ) >= 0*/ ) {
		document.body.addEventListener ( 'mouseout', function createMouseLeaveEvent ( event ) {
			try {
				var mouseleaveEvent = new MouseEvent ( 'mouseleave', {
    				'view': window,
    				'bubbles': false,
    				'cancelable': true
				} );
			} catch ( err ) {
				var mouseleaveEvent = document.createEvent ( 'Event' );
				mouseleaveEvent.initEvent ( 'mouseleave', false, true );
			}
			event.target.dispatchEvent ( mouseleaveEvent );
		}, true );
	}
}
PerspectiveBoxConstructor.prototype.cssResize = function () {
	
	this.mainSectionCSSResize ( 'top' );
	this.mainSectionCSSResize ( 'bottom' );
	this.mainSectionCSSResize ( 'left' );
	this.mainSectionCSSResize ( 'right' );
	
	var sheet = document.getElementById ( "keyFramesOfPerspective" ).sheet;
	for ( var i = 0; i < sheet.cssRules.length; i++ ) {
		var rule = sheet.cssRules [i];
		
		if ( rule.type != CSSRule.KEYFRAMES_RULE ) { continue; }
				
		var tstLeft   = ( rule.name.indexOf ('left') >= 0 );
		var tstRight  = ( rule.name.indexOf ('right') >= 0 );
		var tstTop    = ( rule.name.indexOf ( 'top' ) >= 0 );
		var tstBottom = ( rule.name.indexOf ( 'bottom' ) >= 0 );
		
		var side = tstLeft ? 'left' : ( tstRight ? 'right' : ( tstTop ? 'top' : 'bottom' ) );
		if ( !this.__sides__ [ side ] ) continue;
		var elem = this.__sides__ [ side ];
		
		if ( elem.__content__.size ) {
			var wp = elem.__content__.size.width;
			var hp = elem.__content__.size.height;
			var w = this.__parent__.offsetWidth;
			var h = this.__parent__.offsetHeight;
			if ( hp / h > wp / w ) { wp /= ( hp / h ); }
			size = [
				Math.round ( Math.min ( w * 0.5, wp ) ) + "px",
				Math.round ( Math.min ( h * 0.5, hp ) ) + "px"
			];
		} else { 
			size = [ "50%", "50%" ];
		}
		var atr = ( tstLeft || tstRight ) ? "width" : "height";
		var s = ( tstLeft || tstRight ) ? size [0] : size[1];
			
		var degree = ( rule.name.indexOf ( 'TurnOf' ) >= 0 ) ? 0 : ( ( tstLeft || tstBottom ) ? 90 : -90 );
		
		rule.cssRules[0].style [ atr ] = ( rule.name.indexOf ( 'TurnOf' ) >= 0 ) ? s : "100px";		
		rule.cssRules[1].style [ atr ] = ( rule.name.indexOf ( 'TurnOn' ) >= 0 ) ? s : "100px";
	}
}

PerspectiveBoxConstructor.prototype.cssRuleResize = function ( side ) {
	
	if ( !this.__sides__ [ side ] ) return;
	
	var sheet = document.getElementById ( "keyFramesOfPerspective" ).sheet;
	for ( var i = 0; i < sheet.cssRules.length; i++ ) {
		var rule = sheet.cssRules [i];
		if ( rule.type != 7 || rule.name.indexOf ( side ) < 0 ) continue;
		
		var elem = this.__sides__ [ side ];
		
		if ( elem.__content__.size ) {
			var wp = elem.__content__.size.width;
			var hp = elem.__content__.size.height;
			var w = this.__parent__.offsetWidth;
			var h = this.__parent__.offsetHeight;
			var dw = wp / w;
			var dh = hp / h;
			if ( dh > dw ) { wp /= dh; }
			size = [
				Math.round ( Math.min ( w * 0.5, wp ) ) + "px",
				Math.round ( Math.min ( h * 0.5, hp ) ) + "px"
			];
		} else { 
			size = [ "50%", "50%" ];
		}
		// console.info ( 'width: ' + elem.__content__.size.width + ' | ' + size [0] + ';  height: ' + elem.__content__.size.height + ' | ' + size [1] );
		var atr = ( side == 'left' || side == 'right' ) ? "width" : "height";
		var val = ( side == 'left' || side == 'right' ) ? size [0] : size[1];
		
		rule.cssRules[0].style [ atr ] = ( rule.name.indexOf ( 'TurnOf' ) >= 0 ) ? val : "100px";		
		rule.cssRules[1].style [ atr ] = ( rule.name.indexOf ( 'TurnOn' ) >= 0 ) ? val : "100px";
	}
}