function transport () {
	if (XMLHttpRequest) var requestVar = new XMLHttpRequest();
	else var requestVar = new ActiveXObject("Microsoft.XMLHTTP");
	return requestVar;
};
var $data = null;
var $request = transport ();

$request.parentObject = this;

$request.onreadystatechange = function() {
	if ($request.readyState == 4 && $request.status == 200) {
		var $data = JSON.parse ( $request.responseText );
		this.parentObject.addEventListener( 'message', function ( mess ) {
			if ( $data [ mess.data.keyword ] ) {
				var answer = {
					code: true,
					message: "Привет, " + $data [ mess.data.keyword ].name,
					name: $data [ mess.data.keyword ].name,
					lastName: $data [ mess.data.keyword ].lastName,
					group: $data [ mess.data.keyword ].group
				};
				postMessage ( answer );
			} else postMessage ( { code: false, message: "Access denied" } );
		}, false );
	} else if ( $request.readyState == 4 ) {
		postMessage( { code: false, message: "Error processing data" } );
	}
}
$request.open( "GET", '/data_files/a-level-students.json', false );
$request.send ();

