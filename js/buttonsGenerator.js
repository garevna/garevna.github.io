// Buttons Generator

function GarevnaButtonGeneratorConstructor () {
	var buttons = null;
	var styleSheet = null;
	var responseReady = false;
	var request = new XMLHttpRequest ();
	request.onreadystatechange = function ( event ) {
		console.log (request);
		if ( this.readyState == 4 ) {
			responseReady = true;
			buttons = ( this.status == 200 ) ? this.responseText : false;
		}
	}
	
	request.open ( 'GET', '/data_files/buttons.json', true );
	request.send ();
	
	var waitForResponse = function ( responseReady ) {
		console.log ( responseReady );
		if ( !responseReady ) return waitForResponse ( responseReady );
		else return buttons;
	};
	
	if ( !document.getElementById ( "dynamicallyCreatedStyleSheet" ) ) {
		styleSheet = document.createElement ( 'style' );
		document.head.appendChild ( styleSheet );
		styleSheet.id = "dynamicallyCreatedStyleSheet";
	}
	
	return function ( buttonType, buttonSize ) {
		waitForResponse ();
		if ( !buttons ) return buttons;
		if ( buttons [ buttonType ] ) {
				console.log ( styleSheet );
				styleSheet.innerHTML += ".button_" + buttonType + "{";
				styleSheet.innerHTML += "background-image:url(" + buttons [ buttonType ] + ");";
				styleSheet.innerHTML += "background-size:" + buttonSize + "px;";
				styleSheet.innerHTML += "background-repeat:no-repeat;";
				styleSheet.innerHTML += "background-position:center center;";
				styleSheet.innerHTML += "width:" + buttonSize + "px;";
				styleSheet.innerHTML += "height:" + buttonSize + "px;}";
				var btn = document.createElement ( "button" );
				btn.className = "button_" + buttonType;
				return btn;
		} else return undefined;
	}
}