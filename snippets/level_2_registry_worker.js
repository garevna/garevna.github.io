//  Scripts and Styles needed for level_2.html

var styleSheets = [
	"/css/styles_new.css",															/* Общие стили */
	"/css/work-panel.css",															/* work panel */
	"/css/buttons.css",																/* Стили кнопок */
	"/css/news.css",																/* Лента новостей */
	//"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSaEs2X3hQamNMa1E"	/* Модальные окна */
];
var scripts = [
	//{
	//	src: '/snippets/login.js',
	//	functions: [ "garevnaLoginProcess", "garevnaLogin" ]
	//},
	{
		src: "/js/garevna_media_library.js",													/* old library */
		functions: [
			"create_event",
			"createStyleSheet",
			"addCSSRuleToStyleSheet",
			"removeCSSAttributeFromCSSRule",
			"appendCSSAttributeToCSSRule",
			"removeCSSRuleFromStyleSheet",
			"removeStyleSheetById",
			"loadSource",
			"fade_window",
			"ElemTooltip",
			"build_swf",
			"createPanel",
			"get_win_size",
			"speakAboutNode",
			"createPromptWin",
			"create_home_button",
			"getNaviFontSize",
			"getParentObjectSize",
			"createNaviButton",
			"init_spin",
			"createFlash",
			"addStars",
			"news_callback",
			"add_event_listener",
			"remove_event_listener"
		]
	},
	{
	    src: "/js/work_panel.js",															/* work panel */
		functions: [
			"garevna_WorkPanel.getStructure",
			"garevna_WorkPanel.createDomElements",
			"garevna_WorkPanel.createPanel",
			"garevna_WorkPanel.createPanelTop",
			"garevna_WorkPanel.createPanelContent",
			"garevna_WorkPanel.createFolderElement",
			"garevna_WorkPanel.addFolderContent",
			"garevna_WorkPanel.folderForms",
			"garevna_WorkPanel.folderStates",
			"garevna_WorkPanel.getButtonType"
		]
	},
	{
	    src: "/snippets/level_2.js",															/* work panel */
		defer: true,
		functions: [
			"SceneForStudyProcessConstructor"
		]
	}
];
var externalScripts = [
	{
		src: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvScnFHZ2ptZExzYVk",	/* Модальные окна */
		functions: [ "Modals" ]
	},
	{
		src: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSZ0QyZS1ramUwY1k",	/* get_abbreviation_object */
		functions: [ "get_abbreviation_object" ]
	},
	{
		src: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSaUV1ZDJvZ0hsMlE",	/* formatting_text */
		functions: [ "garevna_js_content.coloringText", "garevna_js_content.coloringTags" ]
	},
	{
		src: "https://www.youtube.com/iframe_api",											/* YouTube API */
		functions: []
	},
	{
		src: "http://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min.js",			/* GreenSock */
		functions: []
	},
	{
		src: "http://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/plugins/CSSPlugin.min.js",	/* GreenSock */
		functions: []
	},
	{
		src: "http://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/easing/EasePack.min.js",	/* GreenSock */
		functions: []
	}
];
for ( var i = 0; i < styleSheets.length; i++ ) {
	this.postMessage ( { type: "style", src: styleSheets [i] } );
}
for ( var j = 0; j < externalScripts.length; j++ ) {
	this.postMessage ( { type: "script", external: true, src: externalScripts [j].src  } );
}
for ( var j = 0; j < scripts.length; j++ ) {
	this.postMessage ( { type: "script", external: false, src: scripts [j].src } );
}