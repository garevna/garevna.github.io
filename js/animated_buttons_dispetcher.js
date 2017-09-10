// this.velocity = 300; // pixels per second
var velocity = 15; // px per 50ms

( function __init () {
	
	_window = { width: 800, height: 600 };
	_normal = { width: 100, height: 100, top: 0, left: 0 };
	current = { width: 100, height: 100, top: 0, left: 0 };
	target = { width: 100, height: 100, top: 0, left: 0 };
	distance = { width: 0, height: 0, top: 0, left: 0 };
	steps = { width: 0, height: 0, top: 0, left: 0 };
	worker_num = 0;
	sourseURL = '';
	sourse_content = '';
	blocked = false;
	__interval = null;
	
})();

setNormalPosition = function () {
	
	// Сверху резервируется 40px, снизу - как повезет... ( если что - будет вертикальный скроллинг )
	var btns_per_row = Math.round ( ( _window.width - 10 ) / ( _normal.width + 10 ) );
	var btns_per_col = Math.round ( ( _window.height - 60 ) / ( _normal.height + 10 ) );
	var col = worker_num % ( btns_per_row - 1 );
	var row = ( worker_num - col ) / ( btns_per_row - 1 );
	
	_normal.left = col * ( _normal.width + 10 );
	_normal.top = row * ( _normal.height + 10 ) + 40;
};

function getDistance () {
	distance.width = target.width - current.width;
	distance.height = target.height - current.height;
	distance.left = target.left - current.left;
	distance.top = target.top - current.top;
	
	return ( distance.width != 0 || distance.height != 0 || distance.left != 0 || distance.top != 0 );
}

function getSteps () {
	var proportion = _window.width / _window.height;
	var stepX = ( proportion > 1 ) ? velocity : Math.round ( velocity * proportion );
	var stepY = ( proportion < 1 ) ? velocity : Math.round ( stepX / proportion );
	steps = {
		width: stepX,
		height: stepY,
		left: Math.round ( stepX / 2 ),
		top: Math.round ( stepY / 2 )
	};
}
var types = [ 'init', 'target', 'win_resize', 'normal', 'wide', 'unblock', 'block' ];

this.addEventListener( 'message', function ( e ) {
	
	var message_type = ( typeof e.data.type == 'number' ) ? types [ e.data.type ] : e.data.type;
	
	blocked = ( message_type != 'block' && message_type != 'unblock' ) ? blocked : ( message_type == 'block' ) ;
	if ( blocked ) { return; }
	
	switch ( message_type ) {
		case types [0]:
			//  Инициализация
			
			worker_num = e.data.num || worker_num;
			sourseURL = e.data.ref || null;
			_window = e.data._window || _window;
			setNormalPosition ();
			current = e.data.current || current;
			target.top = _normal.top;
			target.left = _normal.left;
			getSteps ();
			if ( getDistance () ) { movie (); }
			if ( sourseURL ) {
				var $request = transport ();
				$request.onreadystatechange = function () {
					if ( $request.readyState == 4 && $request.status == 200 ) {
						postMessage ( { type: "content", content: $request.responseText } );
					}
				};
				$request.open ( "GET", sourseURL, false );
				$request.send ();
			}
			break;
		case types [1]:
			//  Если меняются целевые значения параметров анимации
			target = e.data.target || target;
			if ( getDistance () ) { movie (); }
			break;
		case types [2]:
			// Если изменились размеры окна браузера или родительского элемента
			_window = e.data._window;
			console.log ( '*** worker ', worker_num, ' window: ', _window );
			setNormalPosition ();
			getSteps ();
			if ( getDistance () ) { console.info ( 'start moving' ); movie (); }
			break;
		case types [3]:
			// Вернуться в нормальное положение
			target.width = _normal.width;
			target.height = _normal.height;
			target.top = _normal.top;
			target.left = _normal.left;
			if ( getDistance () ) { movie (); }
			break;
		case types [4]:
		    // Развернуть до максимального размера
			target.width = Math.round ( _window.width * 0.8 );
			target.height = Math.round (_window.height * 0.8 );
			target.left = Math.round (_window.width * 0.1 );
			target.top = Math.round (_window.height * 0.1 );
			if ( getDistance () ) { movie (); }
			break;
		default:
			break;
	}
});

function movie () {
		
		var signW = ( distance.width != 0 ) ? ( distance.width / Math.abs ( distance.width ) ) : 0;
		var signH = ( distance.height != 0 ) ? ( distance.height / Math.abs ( distance.height ) ) : 0;
		var signX = ( distance.left != 0 ) ? ( distance.left / Math.abs ( distance.left ) ) : 0;
		var signY = ( distance.top != 0 ) ? ( distance.top / Math.abs ( distance.top ) ) : 0;
		
		if ( __interval ) {
			clearInterval ( __interval );
			__interval = null;
			postMessage ( { type: 'finish', width: current.width, height: current.height } );
		}
		
		__interval = setInterval ( function () {
				if ( !getDistance () ) {
					clearInterval ( __interval );
					__interval = null;
				} else {
					current.width += signW * Math.min ( Math.abs ( distance.width ), steps.width );
					current.height += signH * Math.min ( Math.abs ( distance.height ), steps.height );
					current.left += signX * Math.min ( Math.abs ( distance.left ), steps.left );
					current.top += signY * Math.min ( Math.abs ( distance.top ), steps.top );
					postMessage ( current );
				}
		}, 50 );
}

function transport() {
	if (XMLHttpRequest) { var requestVar = new XMLHttpRequest(); }
	else { var requestVar = new ActiveXObject("Microsoft.XMLHTTP"); }
	return requestVar;
};