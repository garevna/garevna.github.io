// JavaScript Document

var garevna_js_library = {
	
	jsPanelHidden: false,
	jsPanelHeight: 0,
	temporaryStyleSheet:null,
	obj: [],
	attrs: [],
	js_elem: [],
	help: [],
};

garevna_js_library.clear = function () {
	
	// убрать все панели и сбросить содержимое объектов
	
	// garevna_Level2.scene.innerHTML = '';
	if (garevna_js_library.temporaryStyleSheet) {
		garevna_lib.removeStyleSheetById(garevna_js_library.temporaryStyleSheet.id);
	}
	//var parent = parent_node || document.getElementsByTagName('body').item(0);
	var child = document.getElementById("js-panel");
	if (child) {
		child.parentNode.removeChild(child);
	}
	this.obj = [];
	this.obj_names = [];
	this.attrs = [];
	this.js_elem = [];
	this.help = [];
	if (!document.getElementById("temporaryStyleSheet")) {
		this.temporaryStyleSheet = garevna_lib.createStyleSheet ("temporaryStyleSheet");
	}
};
// ======================================================================================================== htmlInit
garevna_js_library.jsInit = function (elems, parent_node) {
	
	var parent = parent_node || document.getElementsByTagName('body').item(0);
	var _panel = document.getElementById("js-panel");
	if (!_panel) {
		_panel = document.createElement('div');
		_panel.id = "js-panel";
		_panel.className = "js-panel";
		parent.appendChild(_panel);
		var _panel_top = document.createElement('div');
		_panel_top.id = "js-panel-top";
		_panel_top.className = "js-panel-top";
		_panel.appendChild(_panel_top);
		var _panel_content = document.createElement('div');
		_panel_content.id = "js-panel-content";
		_panel.appendChild(_panel_content);
	}
	var _panel_content = document.getElementById("js-panel-content");
	_panel_content.innerHTML = '';
	
	var html = '';
	var c = '';
	var n=0;
	for (var j=0; j < elems.length; j++) {
		
		elem = document.createElement('div');
		elem.className = "js-panel-elem";
		elem.title = elems[j].title;
		_panel_content.appendChild(elem);
		
		elem.innerHTML = elems[j].txt;
	}
	
	var _size = _panel.getBoundingClientRect();
	
	garevna_js_library.jsPanelHeight = _size.bottom - _size.top;
	//_panel.style.bottom = "0px";
	TweenLite.to(_panel, 1, { bottom:"0px" });
	garevna_js_library.jsPanelHidden = false;
	
	document.getElementById("js-panel-top").onclick = function() {
		garevna_js_library.jsPanelHide();
	}
};
// ----------------------------------------------------------------------------------------------- jsPanelHide
garevna_js_library.jsPanelHide = function () {
	
	garevna_js_library.jsPanelHidden = !garevna_js_library.jsPanelHidden;
	var b = (!garevna_js_library.jsPanelHidden)?("0"):("-" + (garevna_js_library.jsPanelHeight));
	TweenLite.to("#js-panel", 1, { bottom:b });
};
// ----------------------------------------------------------------------------------------------- buildSelect
garevna_js_library.buildSelect = function ($options, $onChange, $val, lbl) {
	
	var z = ($val)?(' value="' + $val + '"'):('');
	var html = lbl + '&nbsp;<select' + z + ' onchange="garevna_html_css_library.' + $onChange + '">';
	for (var j=0; j<$options.length; j++)
	{
		html += '<option>' + $options[j] + '</option>';
	}
	html += '</select>';
	return html;
};
// ----------------------------------------------------------------------------------------------- icons
garevna_js_library.icons = function () {
	
	garevna_js_library.clear();
	var $html = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="flex-div">';
    var c = '';
    for (var j=1; j<12; j++)
    {
        c = (j<10)?('0' + j):('' + j);
        $html += '<a href="/html-css/ico/icon-' + c + '.png" download>';
        $html += '<img src="/html-css/ico/icon-' + c + '.png" alt=""/></a>&nbsp;';
    }
    $html += '</div>';
	garevna_Level2.scene.innerHTML = $html;
};
// ----------------------------------------------------------------------------------------------- code_anim
garevna_js_library.code_anim = function (parent_object, script, poz_x, delay) {
	
	var color = 'rgb(' + Math.max(100, Math.round(Math.random()*255)) + ',' + Math.max(100, Math.round(Math.random()*255)) + ',' + Math.max(100, Math.round(Math.random()*255)) + ')';
	var elem = document.createElement('div');
	elem.style.position = 'absolute';
	elem.style.opacity = '0';
	elem.style.zIndex = '5';
	elem.style.left = poz_x;
	elem.style.fontSize = "8px";
	elem.style.color = color;
	elem.innerHTML = script;
	elem.style.animation = 'fall_down 5s infinite linear';
	elem.style.animationDelay = delay + "s";
	
	parent_object.appendChild(elem);
};
