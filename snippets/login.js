var helloPicture = "http://pics.sc.chinaz.com/Files/pic/faces/4351/02.gif";
var garevna_lib;
var garevna_libTweenMethods;                        // Риск: в глобальной области видимости

function garevnaLoginProcess ( text ) {
		var params = {
			type: 'prompt',
			text: text,
			iconURL: "/logos/a-level-ico.png",
			headLineText: "Авторизация",
			callback: function ( event ) { loginWorker.postMessage ( { keyword: event.detail } ); }
		};
        var keyPrompt = new Modals ( params );
}
	
var loginWorker = new Worker ( '/snippets/a-level-login-worker.js' );

loginWorker.onmessage = function ( mess ) {
	if ( !mess.data.code ) {
			if ( mess.data.message == "Access denied" )  garevnaLoginProcess ( "Еще одна попытка" );
			else { var badAnswer = new Modals ( { type:'alert', text:'Плохой ответ сервера' } ); }
	} else {
			var params = {
				type: 'fadow',
				iconURL: "/logos/a-level-ico.png",
				headLineText: "",
				text: mess.data.message + "<img src = " + helloPicture + " style='position:fixed; width:30%; top:10%;left:5%;'/>"
			}
			var goodAnswer = new Modals ( params );
			
			garevna_lib = garevna_media_library();
			setTimeout ( garevna_Level2.loadData, 1000 );
	}
}

this.worker = new Worker ( '/js/loader.js' );
this.worker.onmessage = function ( mess ) {
	if ( mess.data.status ) {
		console.log ( mess.data );
	} else console.log ( 'Error processing file: ' + mess.data.url );
}

garevnaLogin = ( function () {
    
   		modalsCSS = document.createElement ( 'link' );
	    modalsCSS.id = "CustomModalStyleSheet";
	    modalsCSS.href = "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSaEs2X3hQamNMa1E";
	    modalsCSS.rel = "stylesheet";
	    modalsCSS.type = "text/css";
	    document.head.appendChild ( modalsCSS );
		
		//var script = document.createElement('script');
		//script.type = 'text/javascript';
		//script.id = "level2";
    	//script.src = '/snippets/level_2.js';
		//document.getElementsByTagName ( 'head' ) [0].appendChild ( script );
		
    	loginScript = document.createElement('script');
        loginScript.type = 'text/javascript';
		loginScript.src = "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvScnFHZ2ptZExzYVk";
        loginScript.defer = true;
        document.getElementsByTagName ( 'head' ) [0].appendChild ( loginScript );
    	
        loginScript.onload = function () {
        
            if ( document.getElementsByTagName ( 'body' ) [0] ) {
                garevnaLoginProcess ( "Введите Ваш персональный ключ доступа" );
            } else { console.error ( 'document is not ready' ); }
        }
		
} ) ();