// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
function createGallery () {
	
	var galleryURL = arguments [0];                               // this - контекст вызова ( bind )
	var article = this;
	var gallery;
	var gallery_worker = new Worker ( '/js/json_loader.js' );
		gallery_worker.postMessage ( galleryURL );
		gallery_worker.addEventListener ( 'message', function ( e ) {
			if ( !e.data ) { alert ( "Извините, галерея изображений " + gallery_url + " не найдена" ); }
			else {
				gallery = new AnimatedButtonSet ( { __parent__: article } );
				//article.appendChild ( document.createTextNode ( e.data.galery_name ) );
				//article.appendChild ( document.createTextNode ( e.data.galery_author ) );
				for ( var pict = 0; pict < e.data.images.length; pict++ ) {
					test_picture ( e.data.images [ pict ].url );
				}
				console.log ( '*** ', article );
			}
		}, false);
	
	function test_picture ( pictureURL ) {
		var tmp = new Image ();
		tmp.src = pictureURL;
		tmp.gallery = gallery;
		tmp.onload = function ( event ) {
			document.body.appendChild ( tmp );
			var img_size = { width: tmp.offsetWidth, height: tmp.offsetHeight };
			document.body.removeChild ( tmp );
			event.target.gallery.buttonConstructor ( { picture: event.target.src, type: "img", size: img_size } );
		}
		tmp.onerror = function ( event ) {	return false;  }
	}
}