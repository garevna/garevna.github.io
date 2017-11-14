//                              CUSTOM MODAL WINDOWS

// ---------------------------------- C O N S T R U C T O R ----------------------------------------
function Modals ( params ) {
    //
    if ( !params ) { alert ('Конструктор не работает без параметров'); document.body.innerHTML = "Конструктор не работает без параметров"; return; }
    this._type = params.type || 'fadow';
    this.callback = params.callback || function () {};
    this.font_family = params.font_family || 'Arial';
	this.font_size = params.font_size || '14px';
	
	
	var winElementType = ( params.type === 'alert' || params.type === 'fadow' ) ? 'section' : 'form';
    this.win = document.createElement ( winElementType );
	this.win.style.fontFamily = this.font_family;
	this.win.style.fontSize = this.font_size;
	document.body.appendChild ( this.win );
    this.win.parentObject = this;
	
    //
    this.inputDataType = ( params.type === 'prompt' ) ? ( params.inputDataType || 'text' ) : null;
    
    this.text = params.text || '';
    this.iconURL = params.iconURL || this.defaultIconURL;
	// ------------------------------------------------------------------------------ Creating header
    this.headLineText = params.headLineText || this.defaultHeadLineText;
    //
	this.headerElement  = document.createElement ( 'div' );
    this.headerElement.innerHTML = this.headLineText;
    this.headerElement.className = "modal_header";
	this.headerElement.fontSize = "50%";
    var ico = document.createElement ('img');
    ico.src = this.iconURL;
    ico.className = "modal_header_ico";
    this.headerElement.appendChild (ico);
	
    this.win.appendChild ( this.headerElement );
	
	this.messageElement = document.createElement( 'article' );
	this.win.appendChild ( this.messageElement );
	this.buildMessage ();
		
	if ( this._type != 'fadow' && this._type != 'alert' ) {
		this.inputElement = document.createElement ( 'section' );
		this.win.appendChild ( this.inputElement );
	}
	// ------------------------------------------------------------------------------- Creating nav
	if ( this._type != 'fadow' ) {
		this.navElement = document.createElement ( 'nav' );
		this.win.appendChild ( this.navElement );
	}
    //
    document.body.appendChild ( this.win );
    this.win.className = "modalWin";
	
    // ======================================================================================================== resize
    this.resizeWin = function () {
        //
		if ( !this.win ) return;
		
		var h = this.headerElement.offsetHeight + 10 + ( this.navElement ? ( this.navElement.offsetHeight + 30 ) : 10 );
		this.messageElement.style.padding = "0 20px";
		var rect = this.getOptimalSize ( this.messageElement, h );
		// this.messageElement.style.position = 'absolute';
		this.messageElement.style.top = ( this.headerElement.offsetHeight + 10 ) + "px";
		
		if ( !this.inputElement ) {
			this.win.style.width = this.messageElement.offsetWidth + "px";
			this.win.style.height = this.messageElement.offsetHeight + h + "px";
			
		} else {
			var _top = this.messageElement.offsetHeight + this.messageElement.offsetTop + 10;
			var rect = this.getOptimalSize ( this.inputElement, _top + this.navElement.offsetHeight );
			this.inputElement.style.top = _top + "px";
			this.win.style.width = Math.max ( this.messageElement.offsetWidth, this.inputElement.offsetWidth ) + "px";
			this.win.style.height = this.messageElement.offsetHeight + this.inputElement.offsetHeight + h + "px";
		} 
		
        var _top = Math.round ( ( window.innerHeight - this.win.offsetHeight ) / 2 );
        var _left = Math.round ( ( window.innerWidth - this.win.offsetWidth ) / 2 );
        this.win.style.top = _top + "px";
        this.win.style.left = _left + "px";
    };
    
    var funcResize = this.resizeWin.bind ( this );
    //
    window.addEventListener ( 'resize', funcResize );
    //
    switch ( this._type ) {
            case 'fadow':
                this.fadowWin ();
                break;
            case 'alert':
                this.alertWin ();
                break;
            case 'confirm':
                this.confirmWin ();
                break;
            case 'prompt':
                switch ( this.inputDataType ) {
                    case 'radio':
                        this.radioButtonsData = params.radioButtonsData;
                        this.radioButtonsWin ();
                        break;
                    case 'textarea':
                        this.textareaWin ();
                        break;
                    case 'checkbox':
                        this.checkboxData = params.checkboxData;
                        this.checkboxWin ();
                        break;
                    default:
                        this.promptWin ();
                        break;
                }
                break;
            default:
                break;
    }
}

Modals.prototype.defaultIconURL = "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSQjJCSm9vRndINkE";
Modals.prototype.defaultHeadLineText = "Филиппова Ірина Гаріївна";
//
// ================================================================== build Nav
Modals.prototype.buildNav = function ( buttons ) {
        //
        for ( var i = 0; i < buttons.length; i++ ) {
			this.navElement.appendChild ( buttons [i] );
		}
};
// ==================================================================== build Input
Modals.prototype.buildInput = function ( elems ) {
	
	this.inputElement.style.top = this.headerElement.offsetHeight + this.messageElement.offsetHeight + "px";
	var h = this.headerElement.offsetHeight + ( this.navElement ? this.navElement.offsetHeight : 0 );
	h += this.messageElement.offsetHeight;
	this.inputElement.style.maxWidth = Math.round ( window.innerWidth * 0.8 ) + "px";
	this.inputElement.style.maxHeight = Math.round ( window.innerHeight * 0.8 ) - h + "px";
	
	for ( var i = 0; i < elems.length; i++ ) {
		this.inputElement.appendChild ( elems[i] );
	}
}
//
// ================================================================== build Modal Content
Modals.prototype.buildMessage = function () {
        
		var h = this.headerElement.offsetHeight + ( this.navElement ? this.navElement.offsetHeight : 0 );
		this.messageElement.style.maxWidth = Math.round ( window.innerWidth * 0.8 ) + "px";
		this.messageElement.style.maxHeight = Math.round ( window.innerHeight * 0.8 ) - h + "px";
		this.messageElement.innerHTML = this.text;
};
//
// ================================================================== alert
//
Modals.prototype.alertWin = function () {
        //
        var but = document.createElement('button');
        but.innerHTML ="Закрыть";
        but.onclick = function ( event ) {
            var win = event.target.parentNode.parentNode;
            win.parentNode.removeChild ( win );
        }
        this.buildNav ( [ but ] );
        
        this.resizeWin ();
        
};

// ================================================================== create modal window
Modals.prototype.createModal = function () {
        
        this.win.addEventListener ( "answerIsReady", this.callback );
        
        this.win.onsubmit = function ( event ) { event.preventDefault(); }
        
        this.win.changeAnswer = function ( val ) {
            document.modalWinAnswer = val;
            var event = new CustomEvent ( "answerIsReady", { detail: val } );
            this.dispatchEvent ( event );
            this.removeEventListener( "answerIsReady", this.callback );
            
            try { this.parentNode.removeChild ( this ); }
            catch ( err ) {
                var win = document.querySelector ( "form.modalWin" );
                win.parentNode.removeChild ( win );
            }
        };
};

// ================================================================== confirm

Modals.prototype.confirmWin = function () {
        
        this.createModal ();
        
        var submitButton = document.createElement('input');
        submitButton.type = "submit";
        submitButton.value ="OK";
        submitButton.onclick = function ( event ) {
            event.target.parentNode.parentNode.changeAnswer ( true );
        };
        var cancelButton = document.createElement('input');
        cancelButton.type = 'button';
        cancelButton.value ="Cancel";
        cancelButton.onclick = function ( event ) {
            event.target.parentNode.parentNode.changeAnswer ( false );
        };
        this.buildNav ( [ submitButton, cancelButton ] );
        
        this.resizeWin ();
};
// =========================================================================================
Modals.prototype.getOptimalSize = function ( elem, h ) {
	
	var val = elem.value ? elem.value : elem.innerHTML;
	var test = document.createElement ( 'div' );
	test.style.display = "inline-block";
	test.style.WebkitBoxSizing = "border-box";
	test.style.MozBoxSizing = "border-box";
	test.style.boxSizing = "border-box";
	test.style.maxWidth = Math.round ( window.innerWidth * 0.8 ) - 80 + "px";
	test.style.maxHeight = Math.round ( window.innerHeight * 0.8 ) - h + "px";
	test.style.padding = elem.style.padding;
	test.style.border = elem.style.border;
	test.innerHTML = val;
	
	document.body.appendChild ( test );
	var rect = { width: test.offsetWidth, height: test.offsetHeight };
	document.body.removeChild ( test );
	elem.style.width = rect.width + "px";
	elem.style.height = rect.height + "px";
	return rect;
}
// ================================================================== prompt

Modals.prototype.promptWin = function () {
        
        this.createModal ();
        this.inputData = document.createElement ( 'input' );
        this.inputData.type = this.inputDataType;
        this.inputData.value = "";
        this.inputData.enable = true;
        
		if ( this.inputDataType == 'text' || this.inputDataType == 'number' || this.inputDataType == 'password' ) {
			this.inputData.oninput = function ( event ) {
            	var win = event.target.parentNode.parentNode;
				var h = win.parentObject.messageElement.offsetHeight + win.parentObject.messageElement.offsetTop;
            	var rect = win.parentObject.getOptimalSize ( event.target, h );
				win.parentObject.resizeWin ();
			}
		}
        this.inputData.onchange = function ( event ) {
            
            var win = event.target.parentNode.parentNode;
            if ( win.parentObject.inputData.type == 'text' || win.parentObject.inputData.type == 'number' || win.parentObject.inputData.type == 'password' ) {
                win.parentObject.readyButton.onclick = "";
                win.changeAnswer ( event.target.value );
            }
        };
        this.readyButton = document.createElement('input');
        this.readyButton.type = 'submit';
        this.readyButton.value ="OK";
        this.readyButton.onclick = function ( event ) {
            var win = event.target.parentNode.parentNode;
            win.changeAnswer ( win.parentObject.inputData.value );
        };
		
		this.buildNav ( [ this.win.parentObject.readyButton ] );
        this.buildInput ( [ this.win.parentObject.inputData ] );
        
        this.resizeWin ();
};

// ===================================================================== building a set of radio buttons or checkboxes
Modals.prototype.buildRadioOrCheckButtons = function ( buttonsData, $type ) {
    
    var inputElements = [];
    var _type = ( $type == 'radio' || $type == 'checkbox') ? $type : 'checkbox';
    var maxChars = 0;
    
    for ( var i = 0; i < buttonsData.length; i++ ) {
        
        inputElements [i] = document.createElement('div');
        
        inputElements [i].btn = document.createElement('input');
        inputElements [i].btn.id = _type + '_' + i;
        inputElements [i].btn.type = _type;
        inputElements [i].btn.value = buttonsData [i].val;
		console.info ( buttonsData [i].val );
        inputElements [i].btn.name = 'modal_' + _type;
        inputElements [i].appendChild ( inputElements [i].btn );
        
        inputElements [i].label = document.createElement ('label');
        inputElements [i].label.for = _type + '_' + i;
        inputElements [i].label.innerHTML = buttonsData [i].text;
        inputElements [i].appendChild ( inputElements [i].label ); 
        
        inputElements [i].btn.onclick = function ( event ) {
			
			var obj = event.target.parentNode.parentNode.parentNode.parentObject;
			if ( _type == 'radio' ) {  obj.answer = event.target.value;  }
			else {
                if ( event.target.checked ) {  obj.answer.push ( event.target.value );  }
				else {
                    var ind = obj.answer.indexOf ( event.target.value );
                    if ( ind >= 0 ) {  obj.answer.splice ( ind, 1 );  }
                }
            }
        }
    }
	this.buildInput ( inputElements );
	
    var readyButton = document.createElement('input');
    readyButton.type = 'submit';
    readyButton.value ="OK";
	
    readyButton.onclick = function ( event ) {
        event.target.parentNode.parentNode.changeAnswer ( event.target.parentNode.parentNode.parentObject.answer );
	}
    
    this.buildNav ( [ readyButton ] );
    this.resizeWin ();
}

// ================================================================== radio buttons
Modals.prototype.radioButtonsWin = function () {
    
    this.createModal ();
    this.answer = undefined;
    this.inputData = this.buildRadioOrCheckButtons ( this.radioButtonsData, 'radio' );

    this.resizeWin ();
}
// ================================================================== check buttons
Modals.prototype.checkboxWin = function () {
    this.createModal ();
    this.answer = [];
    this.inputData = this.buildRadioOrCheckButtons ( this.checkboxData, 'checkbox' );
    
    this.resizeWin ();
}
// ==================================================================== textarea
Modals.prototype.textareaWin = function () {
        
        this.createModal ();
        this.inputData = document.createElement ( 'textarea' );
        this.inputData.value = "";
		//this.inputData.rows = 5;
		//this.inputData.cols = 10;
        
        //this.inputData.onkeydown = function ( event ) {
            
        //    var win = event.target.parentNode.parentNode;
        //    var key = event.which || event.keyCode || event.charCode;
        //    if ( key == 13 && event.target.rows < event.target.maxWinRows ) { event.target.rows++; }
        //}
        this.inputData.oninput = function ( event ) {
            
            var win = event.target.parentNode.parentNode;
			var h = win.parentObject.messageElement.offsetHeight + win.parentObject.messageElement.offsetTop;
            var rect = win.parentObject.getOptimalSize ( event.target, h );
			win.parentObject.resizeWin ();
        }
        
        this.inputData.onchange = function ( event ) {
            
            var win = event.target.parentNode.parentNode;
            win.parentObject.readyButton.onclick = "";
            win.changeAnswer ( event.target.value );
        };
		this.inputElement.appendChild ( this.inputData );
		
        this.readyButton = document.createElement('input');
        this.readyButton.type = 'submit';
        this.readyButton.value ="OK";
        this.readyButton.onclick = function ( event ) {
            var win = event.target.parentNode.parentNode;
            win.changeAnswer ( win.parentObject.inputData.value );
        };
        this.buildNav ( [ this.win.parentObject.readyButton ] );
        
        this.resizeWin ();
};
// ===================================================================== fadow

Modals.prototype.fadowWin = function () {
    
        var timeout = this.text.length * 130;
        var duration = Math.round ( this.text.length / 8 );
        this.win.className = "fadowWin";
        this.resizeWin ();
        var _win = document.querySelector("section.fadowWin");
        _win.style.animationDuration = duration + "s";
        setTimeout ( function () { document.body.removeChild( _win ); }, timeout );
        
}
