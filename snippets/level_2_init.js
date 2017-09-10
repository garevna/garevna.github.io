document.scriptsRegistry = new GarevnaScriptsRegistry ();
document.stylesheetsRegistry = new GarevnaStylesRegistry ();
document.worker = new Worker ( '/snippets/level_2_registry_worker.js' );
console.info ( '--- level_2_init works ---' );
document.worker.onmessage = function ( mess ) {
	console.info ( 'level_2_registry_worker received data: type = ' + mess.data.type + '; src = ' + mess.data.src );
	if ( mess.data.type == 'script' ) {
		console.log ( '#### level_2_init received data from level_2_registry_worker: ', mess.data.src );
		document.scriptsRegistry.registerScript ( {
					src: mess.data.src,
					external: true,
					functions: mess.data.functions || [],
					defer: mess.data.defer || false,
					async: mess.data.async || true,
		} );
	} else document.stylesheetsRegistry.registerStyleSheet ( mess.data );
}
console.info ( '===================== Реестр скриптов ==========================' );
console.log ( document.scriptsRegistry );
console.info ( '===================== Реестр таблиц стилей ==========================' );
console.log ( document.stylesheetsRegistry );