// ===============================================================================================================
//                                            Main scene Constructor
// ===============================================================================================================
function SceneForStudyProcessConstructor () {
	
	// external reference ( maybe doesn't exist ): garevna_html_css_library
	
	this.__main__ = document.createElement ( 'main' );
	document.body.appendChild ( this.__main__ );
	this.__main__.style = "position:fixed;top:0;left:0;bottom:0;right:0;";
	this.__scene__ = document.createElement ( 'div' );
	this.__scene__.style = "position:absolute;top:10%;left:10%;bottom:10%;right:10%;";
	this.__main__.appendChild ( this.__scene__ );
	this.workPanel = this.createWorkPanel ();
	this.workPanel.parentObject = this;
	console.info ( 'workPanel has been created:' );
	console.log ( this.workPanel );
	
	this.__articles__ = [];
	
	var jsonUrl = '/data_files/' + location.hash.substring ( 1 ) + '.json';
	this.dataWorker = new DataLoadingWorkerConstructor ();
	this.dataWorker.parentObject = this;
	this.loadData ( jsonUrl, this.mainCallback );
	
	
	
	return this;
}

// SceneForStudyProcessConstructor.prototype.dataWorker = new DataLoadingWorkerConstructor ();

function DataLoadingWorkerConstructor () {
	console.info ( '---- creating dataWorker ----' );
	try { var worker = new Worker( '/js/sourse_loader.js' ); }
	catch ( err ) {
		var x = new Modals ( { type: 'alert', text: "К сожалению, в Вашем браузере полная функциональность невозможна" } );
		return;
	}
	worker.sourceURL = undefined;
	worker.callback = null;
	worker.params = "";
	worker.onmessage = function ( mess ) {
		console.log ( "data worker: ", mess );
		if ( mess.data ) {
			if ( this.callback ) this.callback ( mess.data, this.params );
			else var x = new Modals ( { type: 'alert', text: "data worker callback undefined" } );
		} else alert ( "Отсутствуют необходимые библиотеки: " + this.sourceURL );
	} 
	return worker;
};

SceneForStudyProcessConstructor.prototype.loadData = function ( sourceURL, callback, params ) {
	console.info ( '---- SceneForStudyProcessConstructor.loadData ----' );
	console.log ( this.dataWorker );
	this.dataWorker.sourceURL = sourceURL;
	this.dataWorker.callback = callback;
	this.dataWorker.params = params;
	this.dataWorker.postMessage ( sourceURL );
}

SceneForStudyProcessConstructor.prototype.articlesCounter = ( function () {
	var num = 0;
	return function () { return num++; }
} ) ();
// ================================ Processing Record ====================================

SceneForStudyProcessConstructor.prototype.processRecord = function ( record ) {
	
	record.parent_node = this.scene;
	var types = [ 'object', 'html', 'swf' ];
	if ( types.indexOf ( record.type ) >= 0 ) {
		var num = this.articlesCounter ();
		this.__articles__ [ num ] = document.createElement ( 'article' );
		this.main.appendChild ( this.__articles__ [ num ] );
		this.__articles__ [ num ].style.display = 'none';
	}
	if ( record.type == 'object' ) func = window [ record.func_name ];
	else {
		if ( record.type == 'html' ) {
			var params = { parent_node: this.__articles__ [ num ] };
			var html_worker;
			this.loadData ( record.url, this.htmlCallback, params );
		} else {
			this.loadData ( record.url, this.scriptCallback, params );
		}
	}
}

SceneForStudyProcessConstructor.prototype.appendScript = function ( scriptURL ) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.defer = true;
	script.src = scriptURL;
	document.getElementsByTagName ( 'head' ) [0].appendChild ( script );
	script.onerror = function ( e ) { console.error ( 'Script loading error: ' + scriptURL ); }
}
// ================================ H T M L    C A L L B A C K ====================================

SceneForStudyProcessConstructor.prototype.htmlCallback = function ( $data, params ) {
		var parent = params.parent_node || garevna_Level2.scene;
		parent.innerHTML = $data;
	}
// =============================== S C R I P T    C A L L B A C K =================================

SceneForStudyProcessConstructor.prototype.scriptCallback = function ( func, params ) {
	var script = document.createElement ( 'script' );
	var funcText = document.createTextNode ( func );
	document.head.appendChild ( script );
	script.appendChild ( funcText );
	if ( params.func_type == 'library' ) {
		var $lib = window [ params.lib_name ];
		for ( var i = 0; i < params.lib_content.length; i++ ) {
			var func_name = params.lib_content [i];
			var func = $lib [ func_name ];
		}
	} else var $func = window [ params.func_name ];
}

// =============================== M A I N    C A L L B A C K =================================

SceneForStudyProcessConstructor.prototype.mainCallback = function ( response ) {
	
	var $data = JSON.parse ( response );
	
	document.head.innerHTML = $data.page_title;
	var meta = document.getElementsByTagName ( "meta" );
	for ( var j = 0; j < meta.length; j++ ) {
		if ( meta.item(j).name == "description" ) { meta.item(j).content =  $data.meta_descr; }
		if ( meta.item(j).name == "keywords" ) { meta.item(j).content =  $data.meta_keywords; }
	}
	
	if ( $data.styleSheets ) {
			for ( var j = 0; j < $data.styleSheets.length; j++ ) {
				var lnk = document.createElement ( "link" );
				lnk.rel = "stylesheet";
				lnk.href = $data.styleSheets [j];
				document.head.appendChild ( lnk );
			}
	}
	if ( $data.styles ) {
			var sheet = document.createElement ( 'style' );
			sheet.innerHTML = $data.styles;
			document.head.appendChild ( sheet );
	}
	console.log ( this.parentObject );  // worker
	if ( $data.functions ) {
		for ( var j = 0; j < $data.functions.length; j++ ) {
			var url = $data.functions [j].url || $data.functions [j].ref;
			var params = {
					func_type: $data.functions [j].type,
					lib_name: $data.functions [j].lib_name || null,
					lib_content: $data.functions [j].lib_content || null,
					func_name: $data.functions [j].func_name || null,
					func_bind: $data.functions [j].bind || null,
					func_param: $data.functions [j].params || null
			}
			this.parentObject.loadData ( url, this.scriptCallback, params );
		}
	}
	
	if ( $data.start_function ) this.parentObject.appendScript ( $data.start_function );
	
	// this.workPanel = {};
	this.parentObject.workPanel.menuItems = $data.src;
	this.parentObject.workPanel.panelHeader = $data.menu_title;
	this.parentObject.workPanel.createDomElements ();
	
	var i, elem, func;
	this.__articles__ = [];
	
	for ( i = 0; i < $data.src.length; i++ ) {
		
		var records = $data.src;
		this.parentObject.processRecord ( this.src [i] );
	}
}
	
// ================================================================================================== generateMethod
SceneForStudyProcessConstructor.prototype.generateMethod = function ( elementData ) {
	// =============================================================================================================
	//            Полиморфная функция generateMethod
	//            Вызов: var showSrc = generateMethod ( elem_type, ref ); showSrc.call ();
	//            или: generateMethod ( elem_type, ref ).call ();
	// =============================================================================================================
		var elemType = elementData.type;
		var __parent__ = elementData.parent_node || this.scene;
		var func = {};
		
		this.clearScene ();
		__parent__.style.display = 'block';
		
		func [ 'presentation' ] = function () {
			var ref = elementData.ref;
			var $url = "https://docs.google.com/presentation/d/" + ref + "/pub?start=true&loop=true&delayms=60000";
			window.open ( $url, '_blank' );
		};
		func [ 'frame' ] = function() {
			//  ( только для swf )
			var frame = document.createElement ( 'iframe' );
			frame.src = elementData.ref;
			frame.id = "local_frame";
			frame.width = window.innerWidth*0.8;
			frame.height = window.innerHeight*0.8;
			
			this.scene.appendChild ( frame );
			this.browserResize ();
		};
		func [ 'video' ] = function () {
			var url = 'https://www.youtube.com/watch?v=' + elementData.ref;
			window.open ( url, '_blank' );
		};
		func [ 'google_disk' ] = function () {
			var ref = elementData.ref;
			var $url = "https://drive.google.com/folderview?id=" + ref + '&usp=sharing';
			window.open ( $url, '_blank' );
		};
		func [ 'div' ] = function () {
			var ref = elementData.ref;
			var $url = ( ref.split ( "&lt;" ).join ( "<" ) ).split ( "&gt;" ).join ( ">" );
			__parent__.innerHTML = ref;
			this.browserResize ();
		};
		func [ 'window' ] = function () {
			
			window.open ( elementData.url, '_blank' );
		};
		func [ 'function set' ] = function () {
			var set_name = elementData.func_set_name;
			var func_name = elementData.func_name;
			var $func = window [ set_name ] ( func_name );
			$func ();
			this.browserResize ();
		};
		func [ 'lib function' ] = function () {
			var lib_name = elementData.lib_name;
			var func_name = elementData.func_name;
			var $func = window [ lib_name ] [ func_name ];
			$func ();
			this.browserResize ();
		};
		func [ 'function' ] = function () {
			var func_name = elementData.func_name;
			var $func = window [ func_name ];
			// var $parent = src.func_bind || garevna_Level2.scene;
			__parent__.func_params = elementData.func_params;
			func_ret ();
			this.browserResize();
		};
		func [ 'object' ] = function () {
			if ( !elementData.parent_node.firstChild ) {
				var func_name = elementData.func_name;
				var $func = window [ func_name ];
				elementData.parent_node.func_params = elementData.func_params;
				var func_ret = $func.bind ( __parent__ );
				
				func_ret ();
			}
			this.browserResize ();
		};
		func [ 'swf' ] = function () {
			if ( !elem_src.parent_node.firstChild ) {
				this.buildSwf ( elementData.url, __parent__ );
				if ( elementData._background ) __parent__.style.backgroundColor = elementData._background;
				this.browserResize ();
			}
		};
		func [ 'html' ] = function () { };
		// -----------------------------------------------------------------------------
		return function () {
			if ( garevna_html_css_library && garevna_html_css_library.clear ) garevna_html_css_library.clear ();
			return func [ elemType ] ();
		};
}
SceneForStudyProcessConstructor.prototype.clearScene = function () {
		var articles = document.getElementsByTagName('article');
		for ( var i = 0; i < articles.length; i++ ) articles[i].style.display = 'none';
		this.scene.style.display = 'none';
}
SceneForStudyProcessConstructor.prototype.buildSwf = function ( $swf, targetElement ) {
		var worker = new Worker( '/js/swf_builder.js' );
		worker.postMessage( { num:num, url: $swf } );
		worker.onmessage = function ( mess ) { targetElement.innerHTML = e.data; }
}
// ================================================================================================== browserResize
SceneForStudyProcessConstructor.prototype.browserResize = function () {
		
		for ( var i = 0; i < this.__articles__.length; i++ ) {
			articles[i].style.width = Math.round(window.innerWidth * 0.8) + 'px';
			articles[i].style.marginLeft = Math.round(window.innerWidth * 0.05) + 'px';
			articles[i].style.height = Math.round(window.innerHeight * 0.9) + 'px';
			articles[i].style.marginTop = Math.round(window.innerHeight * 0.05) + 'px';
			if (articles[i].resize_callback) {
				articles[i].resize_callback();
			}
		}
		if (document.getElementById("css-panel"))
		{
			var _css = document.getElementById("css-panel");
			cssPanelHeight = _css.offsetHeight;
		}
		if ( document.getElementById ( "html-panel" ) ) {
			var _html = document.getElementById ( "html-panel" );
			htmlPanelHeight = _html.offsetHeight;
		}
		if ( this.__scene__.sceneResizeCallback )  this.__scene__.sceneResizeCallback ();
}

// ===============================================================================================================
//                                           Panel Constructor
// ===============================================================================================================

SceneForStudyProcessConstructor.prototype.createWorkPanel = function () {
	
	var panel = document.createElement ( 'div' );
	this.__main__.appendChild ( panel );
		panel.className = "work-panel";
		//panel.hidden = false;
		panel.header = '';
		panel.menuItems = [];          		// src
		panel.folderVars = [];         		// state:0, form:0, header:'', content: [ src_num1, src_num2... ]
		panel.__folders__ = [];        	    // DOM elements - containers for menu items
		panel.__panelTop__ = {};        	// DOM element
		panel.__panelContent__ = {};       	// DOM element - container for DOM elements folders
		
	// --------------------------------------------------------------------------------- Method getStructure()
	panel.getStructure = function () {
			
			var folderNum;
			var _folder = { header:'', content:[] };
			for ( var j = 0; j < this.menuItems.length; j++ ) {
				folderNum = -1;
				for ( var k = 0; k < this.folderVars.length; k++ ) {
					if ( this.folderVars [k].header === this.menuItems [j].folder_name ) {
						this.folderVars [k].__content__.push (j);
						folderNum = k;
						break;
					}
				}
				if ( folderNum == -1 ) {
					_folder = { header:this.menuItems[j].folder_name, content:[] };
					_folder.__content__.push (j);
					this.folderVars.push ( _folder );
				}
			}
	};
	// ------------------------------------------------------------------------ addFolderHeadElement
	panel.addFolderHeadElement = function ( folderNum ) {
			var _folderHead = document.createElement ( 'div' );
			this.__folders__ [ folderNum ].appendChild ( _folderHead );
			_folderHead.className = "panel-name";
			return _folderHead;
	}
	// ----------------------------------------------------------------------- addFolderStateButton
	panel.addFolderStateButton = function ( folderNum ) {
			
			var _folderStateButton = document.createElement ( 'button' );
			this.__folders__ [ folderNum ].head.appendChild ( _folderStateButton );
			_folderStateButton.className = "folderStateButton";
			_folderStateButton.innerHTML = this.folderStates () [0].lbl;
			_folderStateButton.setAttribute ( 'title', this.folderStates () [0].titl );
			
			// --------------------------------------------------------------- FolderStateButton onClick
			_folderStateButton.onclick = function ( event ) {
				var _folder = this.parentNode.parentNode;				    // folder element
				_folder.state = ( _folder.state == 0 ) ? 1 : 0 ;            // change folder state property
				var _state = _folder.state;				                    // folder state property
				var _content = this.parentNode.parentNode.__content__;          // folder content element
				
				// ----------------------------- Animation ---------------------------------------------------
				if ( _state == 1 ) { TweenLite.to ( _content, 1, { height:"0", opacity:"0", display:"none" } ); }
				else { TweenLite.to ( _content, 1, { height:"auto", opacity:"1", display:"block" } ); }
				// -------------------------------------------------------------------------------------------
				this.innerHTML = this.folderStates () [ _state ].lbl;
				this.setAttribute ( 'title', garevna_WorkPanel.folderStates () [ _state ].titl );
			}
			this.__folders__ [ folderNum ].stateButton = _folderStateButton;
	};
		
	// ----------------------------------------------------------------------- addFolderFormButton
	panel.addFolderFormButton = function ( folderNum ) {
			var _folderFormButton = document.createElement ( 'button' );
			this.__folders__ [ folderNum ].head.appendChild ( _folderFormButton );
			_folderFormButton.className = "folderFormButton";
			// --------------------------------------------------------------- FolderFormButton onClick
			_folderFormButton.onclick = function ( event ) {
				var _folder = this.parentNode.parentNode;				    // folder element
				_folder.form = ( _folder.form == 0 ) ? 1 : 0;               // change folder form property
				var _content = this.parentNode.parentNode.__content__;          // folder content element
		        // --------- change button appearance ------------
		        this.style.backgroundImage = 'url(' + this.folderForms ()[ _folder.form ].$img + ')';
		        this.setAttribute ( 'title', this.folderForms () [ _folder.form ].titl );
		        // ---------- change folder appearance ------------
				var items = _content.childNodes;
				var z;
				for ( var j = 0; j < items.length; j++ ) {
					z = items [j].getElementsByTagName ( 'span' ).item (0);
					z.style.display = ( _folder.form == 1 ) ? 'none' : 'inline';
					items [j].className = ( _folder.form == 1 ) ? 'work-panel-elem-short' : 'work-panel-elem';
				}
			}
	};
	// -------------------------------------------------------------------------------- createDomElements
	panel.createDomElements = function () {
			// this.panel = this.createPanel ();
			this.__panelTop__ = this.createPanelTop ();
			this.getStructure ();
			this.__panelContent__ = this.createPanelContent ();
			this.panel.style.zIndex = "500";
			
			for ( var j = 0; j < this.folderVars.length; j++ ) {
				this.__folders__ [j] = this.createFolderElement (j);
				this.__folders__ [j].state = 0;
				this.__folders__ [j].form = 0;
				this.__folders__ [j].head = this.addFolderHeadElement (j);
				this.__folders__ [j].stateButton = this.addFolderStateButton (j);
				var h = document.createElement ( 'span' );
				h.innerHTML = this.folderVars [j].header;
				this.__folders__ [j].head.appendChild (h);
				this.__folders__ [j].formButton = this.addFolderFormButton (j);
				this.addFolderContent (j);
			}
	};
	
	// ----------------------------------------------------------------------------------- Panel Top (DOM element)
	panel.createPanelTop = function () {
		this.__panelTop__ = document.createElement ( 'div' );
		this.appendChild ( this.__panelTop__ );
		this.__panelTop__.className = "panel-top";
		// ------------------------------------------------------------------------- panel Top Show (Method)
	    this.__panelTop__.showPanelTopElement = function () {
			var h = ( !this.panel_hidden ) ? "&raquo;" : "&laquo;";
			this.setAttribute( "title", this.panel_hidden ? "Показать" : "Свернуть" );
			this.innerHTML = '&nbsp;&nbsp;' + h + '&nbsp;&nbsp;' + this.panelHeader;
		}
		this.__panelTop__.showPanelTopElement ();
		// ------------------------------------------------------------------ event 'click' of panelTop element
		this.__panelTop__.onclick = function ( event ) {
			// ------------------------------------------------------------------- hide Panel
			var panel = event.target.parentNode;
			panel.panel_hidden = !panel.panel_hidden;
			event.target.showPanelTopElement ();
			var w = event.target.offsetWidth;
			// --------------- animation -----------------------------
			if ( !panel.panel_hidden ) { TweenLite.to ( panel, 1, { right:"0px" } ); }
			else { TweenLite.to ( panel, 1, { right:(30-w) + 'px' } ); }
		}
		return this.__panelTop__;
	};
	// ------------------------------------------------------------------------------- Panel Content
	panel.createPanelContent = function () {
		this.__panelContent__ = document.createElement ( 'div' );
		this.panel.appendChild ( this.__panelContent__ );
		return this.__panelContent__;
	};
	// ------------------------------------------------------------------------------- createFolderElement
   panel.createFolderElement = function ( folderNum ) {
	   if ( !this.__panelContent__ ) { console.log ( 'addFolderElement: Unable to add folder!' ); return false; }
	   var _folder = document.createElement ('div');
	   this.__panelContent__.appendChild ( _folder );
	   _folder.__content__ = document.createElement( 'div' );
	   _folder.appendChild ( _folder.__content__ );	
	   return _folder;
   };
   // ----------------------------------------------------------------------------------------- addFolderContent
   panel.addFolderContent = function ( folderNum ) {
	   var itemVars = this.folderVars [ folderNum ];
	   this.__folders__ [ folderNum ].__content__ = document.createElement ( 'div' );
	   this.__folders__ [ folderNum ].appendChild ( this.__folders__ [ folderNum ].__content__ );
	   this.__folders__ [ folderNum ].__content__.elem = [];
	   
	   var $form = this.__folders__ [ folderNum ].form ? this.__folders__ [ folderNum ].form : 0;
	   var elem, btn, txt, elemVar;
	   
	   for ( var j = 0; j < itemVars.__content__.length; j++ ) {
		   elemVar = this.menuItems [ itemVars.__content__[j] ];
		   elem = document.createElement ( 'div' );
		   
		   elem.parentFolder = elem.parentNode.parentNode;
		   elem.parentPanel = elem.parentFolder.parentNode.parentNode;
		   elem.parentObject = elem.parentPanel.parentObject;
		   
		   elem.className = "work-panel-elem";
		   
		   this.__folders__ [ folderNum ].__content__.appendChild ( elem );    // DOM element
		   this.__folders__ [ folderNum ].__content__.elem.push ( elem );      // reference to DOM element (array item)
		   btn = document.createElement ( 'button' );
		   elem.appendChild ( btn );
		   btn.className = this.getButtonType ( elemVar );
		   btn.params = elemVar;
		   btn.parentObject = btn.parentNode.parentObject;
		   var tooltipText =  elemVar.h_text || elemVar.item_name;
		   btn.__tooltip__ = new ElemTooltip ( btn, tooltipText );
		   // ---------------------------------------------------------------- onclick
		   btn.onclick = function (event) {
			   event.target.parentObject.generateMethod ( btn.params ).call ();
		   }
		   txt = document.createElement ( 'span' );
		   elem.appendChild ( txt );
		   txt.innerHTML = elemVar.item_name;
		   
		   elem.item_name = txt;
		   btn.style = 'display:inline-block; margin-right:5px';
		   elem.item_name.display = ( itemVars.form == 1 ) ? 'none' : 'inlineBlock';
	   }
   };
	// --------------------------------------------------------------------- folderForms (array)
	panel.folderForms = ( function () {
		var folder_forms = [
		    { $img: '/buttons/menu_buttons.png', titl: 'Краткая форма (в виде кнопок)' },
	        { $img: '/buttons/menu-list.png', titl: 'Развернутая форма (список)' } ];
		return function (j) { if (  j!= 0 && j != 1 ) { return folder_forms } else { return folder_forms [j] } }
	}) (),
	// -------------------------------------------------------------------- folderStates (array)
	panel.folderStates = ( function () {
		var folder_states = [ { lbl:'&#9650;', titl:'Скрыть содержимое папки' },
	                          { lbl:'&#9660;', titl:'Показать содержимое папки' } ];
		return function () { return folder_states }
	})(),
	// ================================================================================================== getButtonType
	panel.getButtonType = function ( elem ) {
		var button_type = [];
		button_type [ 'presentation' ] = 'google_slides';
		button_type [ 'frame' ] = undefined;
		button_type [ 'video' ] = 'youtube';
		button_type [ 'google_disk' ] = 'google_disk';
		button_type [ 'div' ] = undefined;
		button_type [ 'window' ] = undefined;
		button_type [ 'function' ] = undefined;
		var bt = button_type [ elem.type ] ? button_type [ elem.type ] : ( elem.button_type ? elem.button_type : 'show' );
		if ( bt == 'show' ) { console.log( 'Не определен тип элемента меню:' + elem.item_name ); }
		return "button_" + bt;
	}
		
    return panel;
}
// ================================================================================================
//
//  Функция показа всплывающей подсказки (идентификатор объекта подсказки hlp_id) с текстом elem_text
//  Объект подсказки <div id="hlp" class="hlp"></div>
//
// ------------------------------------------------------------------------------------------------
function ElemTooltip ( elem, tooltip_text ) {
	
	elem.tooltipText = tooltip_text;
	elem.onmouseout = function ( event ) {
		if ( event.target.children [0] ) { event.target.removeChild ( event.target.children [0] ); }
	}
	elem.onmouseover = function ( event ) {
		var x = event.pageX ? ( event.pageX - window.pageXOffset ) : event.clientX;
		var y = event.pageY ? ( event.pageY - window.pageYOffset ) : event.clientY;
		
		var __tooltip__ = document.createElement ( "div" );
		__tooltip__.innerHTML = event.target.tooltipText;
		__tooltip__.style = 'position: fixed; min-width: 150px; background-color: rgba(255,255,255,0.9);border: solid 1px #aaa;border-radius:5px; padding: 3px 7px; boxShadow: 2px 2px 2px rgba(0,0,0,0.5);';
		elem.appendChild ( __tooltip__ );
		var w = __tooltip__.offsetWidth;
		var h = __tooltip__.offserHeight;
		x = ( x + w > window.innerWidth ) ? ( window.innerWidth - w - 20 ) : x;
		y = ( y + h > window.innerHeight ) ? ( window.innerHeight - h - 20 ) : y;
		__tooltip__.style.left = x + "px";
		__tooltip__.style.top = y + "px";
	}
}

	
	
	// ----------------------------- folders structure ---------------------------------------------------------
    // workPanel.__folders__[j]                                DOM element
    // workPanel.__folders__[j].head                           DOM element (child of workPanel.__folders__[j])
    // workPanel.__folders__[j].stateButton                    DOM element (child of workPanel.__folders__[j].head)
    // workPanel.__folders__[j].formButton                     DOM element (child of workPanel.__folders__[j].head)
    // workPanel.__folders__[j].__content__                        DOM element (child of workPanel.__folders__[j])
    // workPanel.__folders__[j].__content__.elem[i]                DOM element (child of workPanel.__folders__[j].__content__)
   
    // workPanel.__folders__[j].form                           value ( 0 || 1 )
    // workPanel.__folders__[j].state                          value ( 0 || 1 )
    // workPanel.folderVars[j].header                      string ( folder header )
   
 