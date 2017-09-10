// JavaScript Document

var garevna_html_css_library = {
	
	cssPanelHidden: false,
	htmlPanelHidden: false,
	cssPanelHeight: 0,
	htmlPanelHeight: 0,
	temporaryStyleSheet:null,
	obj: [],
	attrs: [],
	html_elem: [],
	help: [],
	// ============================================================================ create_browser_window
	create_browser_window: function (parent, headerText) {
		var header = document.createElement('h1');
		header.style.fontSize = '100%';
		header.style.letterSpacing = '5px';
		header.style.margin = '20px 0 0 30px';
		header.innerHTML = headerText;
		parent.appendChild(header);
		var browser_win = document.createElement('div');
		parent.appendChild(browser_win);
		browser_win.id = 'garevna_browser_win';
		browser_win.style.backgroundImage = 'url(/images/fon.gif)';
		browser_win.style.width = '80%';
		browser_win.style.marginTop = '1%';
		browser_win.style.marginLeft = '2%';
		browser_win.style.padding = '30px';
		browser_win.style.border = 'groove 2px white';
		browser_win.style.borderRadius = '4px';
		browser_win.style.boxShadow = 'inset 4px 4px 4px rgba(0,0,0,0.5)';
		browser_win.style.overflow = 'auto';
		browser_win.parentNode.sceneResizeCallback = function () {
			var obj = document.getElementById('garevna_browser_win');
			if (obj) {
				var dim = garevna_lib.getParentObjectSize(obj.parentNode);
				obj.style.height = (dim.h - 150) + 'px';
			}
		}
	},
	// ============================================================================ getCssAttrValBySelector
	// Возвращает CSS правило по заданному селектору и атрибуту
	getCssAttrValBySelector: function (css_selector, css_attr) {
		var i, j;
		for(i=0; i< document.styleSheets.length; i++) {
			var css_rules = document.styleSheets[i].cssRules;
			for(j=0; j < css_rules.length; j++) {
				if(css_rules[j].selectorText == css_selector) {
					console.info('===== css_rules[' + j + '].style[' + css_attr + '] =======');
					console.log(css_rules[j].style[css_attr]);
					return css_rules[j].style[css_attr];
				}
			}
		}
		return null;
	},
	// =============================================================================== setCssAttrValBySelector
	// 
	setCssAttrValBySelector: function (css_selector, css_attr, attr_val) {
		
		var i, j, k, css_rules;
		var _ready = false;
		
		i = 0;
		while (!_ready && i < document.styleSheets.length) {
			
			css_rules = document.styleSheets[i].cssRules;
			console.info('------------------ styleSheets[' + i + '].cssRules --------------------');
			console.log(css_rules);
			j = 0;
			while (!_ready && j < css_rules.length) {
				console.log(css_rules[j].selectorText + ' ? ' + css_selector);
				if(css_rules[j].selectorText == css_selector) {
					console.info('------------------ styleSheets[' + i + '].cssRules --------------------');
					console.log(css_rules);
					var n = css_rules[j].style.cssText.indexOf(css_attr);
					if ( n >= 0) {
						_ready = true;
						var z = css_rules[j].style.cssText.split(';');
						var n;
						for (n=0; n<z.length; n++) {
							if (z[n].indexOf(css_attr) >=0) {
								z[n] = css_attr + ':' + attr_val;
								css_rules[j].style.cssText = z.join(';');
								break;
							}
						}
						console.log(css_rules[j]);
					}
				}
				j++;
			}
			i++;
		}
		
	},
	// ================================================================================================ htmlLineColoring
	htmlLineColoring: function (html, expr) {
		var res = html;
		
		var i;
		var f = [];
		
		//var regExpr_1 = /(&lt;)\S+/g;
		//f = res.match(regExpr_1);
		//for (i=0; i<f.length; i++) {
		//	res = res.replace(f[i],'<mgnt>' + f[i] + '</mgnt>');
		//	console.info(res);
		//}
		
		var regExpr_2 = /"([^"]*)"/g;
		f = res.match(regExpr_2);
		for (i=0; i<f.length; i++) {
			res = res.replace(f[i],'<yelw>' + f[i] + '</yelw>');
		}
		console.info(res);
		
		var regExpr_3 = /\S+([=])/g;
		f = res.match(regExpr_3);
		for (i=0; i<f.length; i++) {
			res = res.replace(f[i],'<grn>' + f[i] + '</grn>');
		}
		res = '<wht>' + res + '</wht>';
		
		if (expr) {
			
			res = res.replace(expr,'<mgnt>' + expr + '</mgnt>');
		}
		document.body.insertAdjacentHTML('beforeEnd',res);
		return res;
	}
};

garevna_html_css_library.clear = function () {
	
	// убрать все панели и сбросить содержимое объектов
	
	garevna_Level2.scene.innerHTML = '';
	if (garevna_html_css_library.temporaryStyleSheet) {
		garevna_lib.removeStyleSheetById(garevna_html_css_library.temporaryStyleSheet.id);
	}
	//var parent = parent_node || document.getElementsByTagName('body').item(0);
	var child = document.getElementById("css-panel");
	if (child) {
		child.parentNode.removeChild(child);
	}
	child = document.getElementById("html-panel");
	if (child) {
		child.parentNode.removeChild(child);
	}
	var win = document.getElementsByClassName("browser_win").item(0);
	if (win) {
		win.parentNode.innerHTML = '';
	}
	this.obj = [];
	this.obj_names = [];
	this.attrs = [];
	this.html_elem = [];
	this.help = [];
	if (!document.getElementById("temporaryStyleSheet")) {
		this.temporaryStyleSheet = garevna_lib.createStyleSheet ("temporaryStyleSheet");
	}
};

// -----------------------------------------------------------------------------
//    Изменение значения CSS-атрибута $attrName для объекта $objName
//                 $attrName - название CSS-атрибута
//                   $val - новое значение атрибута
// -----------------------------------------------------------------------------
garevna_html_css_library.css_attr = function (obj_id, $attrName, $val) {
	
	var attr = this.getAttrName($attrName);
	document.getElementById(obj_id).style[attr] = $val;
};
// -----------------------------------------------------------------------------
garevna_html_css_library.css_class_attr = function (class_name, $attrName, $val) {
	
	var attr = this.getAttrName($attrName);
	var mass = document.getElementsByClassName(class_name);
	var $l = '';
	for (var j=0; j < mass.length; j++) {
		$l = 'mass[' + j + '].style.' + attr + '="' + $val + '"';
		eval('mass[' + j + '].style.' + attr + '="' + $val + '"');
	}
};
// -----------------------------------------------------------------------------
//    Изменение значения CSS-атрибута $attrName для html-элемента (тега) elem
//                 $attrName - название CSS-атрибута
//                   $val - новое значение атрибута
// -----------------------------------------------------------------------------
garevna_html_css_library.css_tag_attr = function (elem, $attrName, $val) {
	var attr = this.getAttrName($attrName);
	var mass = document.getElementsByTagName(elem);
	var $l = '';
	for (var j=0; j < mass.length; j++) {
		$l = 'mass[' + j + '].style.' + attr + '="' + $val + '"';
		eval($l);
	}
};
// ------------------------------------------------------------------------------
garevna_html_css_library.getAttrName = function ($attrName) {
	
	var attr = $attrName;
	attr = attr.replace('-webkit-','webkit-');
	var n = attr.indexOf('-');
	attr = attr.split('-');
	for (var j=1; j<attr.length; j++) {
		attr[j] = attr[j].substr(0,1).toUpperCase() + attr[j].substr(1);
	}
	attr = attr.join('');
	return attr;
};
// -----------------------------------------------------------------------------
//    Изменение значения атрибута тега $attrName для объекта $objName
//                   $val - новое значение атрибута
// -----------------------------------------------------------------------------
garevna_html_css_library.html_attr = function ($objName, $attrName, $val) {
	
	document.getElementById($objName).setAttribute($attrName, $val);
	
};
// -----------------------------------------------------------------------------
//    Изменение значения атрибута тега $attrName для тега $tagName
//                   $val - новое значение атрибута
// -----------------------------------------------------------------------------
garevna_html_css_library.elem_attr = function ($tagName, $attrName, $val) {
	
	document.getElementsByTagName($tagName)[0].setAttribute($attrName, $val);
	
};
// ----------------------------------------------------------------------------------------------- changeObject
garevna_html_css_library.changeObject = function (obj_num) {
	
	
	var st = '';
	var elem = '';
	var j, css_selector, attr_name, attr_value, input_attr_field;
	
	for (j=0; j < garevna_html_css_library.attrs.length; j++)
	{
		st += garevna_html_css_library.attrs[j].name + ':&nbsp;';
		st += garevna_html_css_library.getAttrInput(j, obj_num) + '<br />';
	}
	document.getElementById("css-attributes").innerHTML = st;
	
	for (j=0; j < garevna_html_css_library.attrs.length; j++)
	{
		attr_name = garevna_html_css_library.attrs[j].name;
		
		input_attr_field = document.getElementById(attr_name);
		
		switch (this.obj[obj_num].type)
		{
			case 'tag':
			    elem = document.getElementsByTagName(this.obj[obj_num].id).item(0);
				input_attr_field.value = elem.style[this.attrs[j].name];
				break;
			case 'elem':
			    elem = document.getElementById(this.obj[obj_num].id);
				input_attr_field.value = elem.style[this.attrs[j].name];
				break;
			case 'class':
			    elem = document.getElementsByClassName(this.obj[obj_num].id).item(0);
				input_attr_field.value = elem.style[this.attrs[j].name];
				break;
			case 'css_selector':
			    css_selector = this.obj[obj_num].css_selector;
				attr_value = garevna_html_css_library.getCssAttrValBySelector(css_selector, attr_name);
				console.log();
				input_attr_field.value = attr_value;
				break;
			default:
				break;
		}
	}
	// document.getElementById("htmlElem").innerHTML = obj[obj_num].name;
};
// ---------------------------------------------------------------------------------
//    Функция устанавливает поля ввода значений атрибута для элемента с id=obj_name
//    возвращает html-текст строки для онлайн-редактирования значения атрибута
//    Массив аттрибутов attrs (sample):
//    attrs[0] = {
//	      name:'display',
//        type:'select',
//        vals:[ 'inline','block','inline-block','list-item', 'initial', 'inherit', 'none' ],
//        default_val:'initial'
//    };
//    или: attrs[1] = { name:'width', type:'text', default_val:'120px' };
// --------------------------------------------------------------------------------- getAttrInput
garevna_html_css_library.getAttrInput = function (attr_num, obj_num) {
	
	if (obj_num == undefined) { return }
	var _obj = garevna_html_css_library.obj[obj_num];
	var _attr = garevna_html_css_library.attrs[attr_num];
	
	var callbacks = {};
	callbacks['tag'] = 'css_tag_attr(';
	callbacks['class'] = 'css_class_attr(';
	callbacks['elem'] = 'css_attr(';
	callbacks['css_selector'] = 'setCssAttrValBySelector(';
	
	var ret = '';
	var callback = 'garevna_html_css_library.' + callbacks[_obj.type];
	var first_param = (_obj.type == 'css_selector')?(_obj.css_selector):(_obj.id);
	
	var q = ' onchange = "' + callback + "'" + first_param + "','" +  _attr.name + "'" + ', this.value)">';

	if (_attr.type == 'select')
	{
		ret += '<select id="' + _attr.name + '"' + q;
		for (var i=0; i < _attr.vals.length; i++)
		{
			ret += '<option>' + _attr.vals[i] + '</option>';
		}
		ret += '</select>';
	}
	else { ret += '<input id="' + _attr.name + '" type="text"' + q; }
    return ret;
};
// ---------------------------------------------------------------------------------
//   Инициализация значений css-атрибутов объектов из массива id объектов obj = [];
//   Формирование панели управления стилями объектов
//   id панели выбора объекта         css-buttons
//   id панели css-атрибутов объекта   css-attributes 
// ---------------------------------------------------------------------------------
garevna_html_css_library.cssInit = function ($obj, $attributes, parent_node) {
	
	this.obj = $obj;
	this.attrs = $attributes;
	var parent = parent_node || document.getElementsByTagName('body').item(0);
	var _panel = document.createElement('div');
	_panel.id = "css-panel";
	_panel.className = "css-panel";
	parent.appendChild(_panel);
	var elem = document.createElement('div');
	elem.id = "css-panel-top";
	elem.className = "css-panel-top";
	_panel.appendChild(elem);
	elem = document.createElement('span');
	elem.id = "htmlElem";
	elem.className = "magenta";
	_panel.appendChild(elem);
	elem = document.createElement('div');
	elem.id = "css-buttons";
	elem.className = "css-panel-name";
	_panel.appendChild(elem);
	elem = document.createElement('div');
	elem.id = "css-attributes";
	elem.className = "css-panel-elem";
	_panel.appendChild(elem);
	
	var style = document.createElement("style");
	
	style.id = 'css_' + $obj.id;
	
    var tg = '';
	var attrVal = '';
	var _default, $attr;
	var j,i,k;
	
	var _obj = garevna_html_css_library.obj;
	
    for (j=0; j < _obj.length; j++) {
		
		_obj[j].rules = [];
		
		for (i=0; i < garevna_html_css_library.attrs.length; i++) {

			$attr = garevna_html_css_library.attrs[i];
			_default = $attr.default_val;
			
			attrVal = (_default.length == _obj.length)?(_default[j]):(_default);
			
			switch (_obj[j].type) {
				
				case "tag":
				    tg = document.getElementsByTagName(_obj[j].id);
					for (k=0; k < tg.length; k++) {
						tg.item(k).style[$attr.name] = attrVal;
					}
				    break;
				case "class":
				    tg = document.getElementsByClassName(_obj[j].id);
					for (k=0; k < tg.length; k++) {
						tg.item(k).style[$attr.name] = attrVal;
					}
				    break;
				case "css_selector":
					_obj[j].rules[i] = $attr.name + ':' + attrVal;
					
					break;
				case "elem":
				    var elem = document.getElementById(_obj[j].id);
				    elem.style[$attr.name] = attrVal;
				    break;
				default:
				    break;
			}
		}
		if (_obj[j].rules.length > 0) {
			
			var rule = _obj[j].css_selector + '{' + _obj[j].rules.join('; ') + '}';
			var sheet = document.styleSheets[document.styleSheets.length-1];
			sheet.insertRule(rule,0);
			
		}
	}
	var html = 'CSS селектор: <select id="elem" value=0 onchange="garevna_html_css_library.changeObject(this.value);">';
	for (j=0; j < garevna_html_css_library.obj.length; j++)
	{
		html += '<option value="' + j + '">' + garevna_html_css_library.obj[j].name + '</option>';
	}
	html += '</select>';
	document.getElementById("css-buttons").innerHTML = html;
	
	var html = '';
	for (j=0; j < garevna_html_css_library.attrs.length; j++)
	{
		html += '<span>' + garevna_html_css_library.attrs[j].name + ':&nbsp;</span>';
		html += garevna_html_css_library.getAttrInput(j,0) + '<br />';
	}
	document.getElementById("css-attributes").innerHTML = html;
	document.getElementById("css-panel-top").onclick = function() {
		garevna_html_css_library.cssPanelHide();
	}
	garevna_html_css_library.changeObject(0);
	var _size = document.getElementById("css-panel").getBoundingClientRect();
	garevna_html_css_library.cssPanelHeight = _size.bottom - _size.top;
};
// ======================================================================================================== htmlInit
garevna_html_css_library.htmlInit = function (elems, parent_node) {
	
	var parent = parent_node || document.getElementsByTagName('body').item(0);
	var _panel = document.createElement('div');
	_panel.id = "html-panel";
	_panel.className = "html-panel";
	parent.appendChild(_panel);
	
	var elem = document.createElement('div');
	elem.id = "html-panel-top";
	elem.className = "html-panel-top";
	_panel.appendChild(elem);
	
	elem = document.createElement('div');
	elem.id = "html-panel-name";
	elem.className = "html-panel-name";
	_panel.appendChild(elem);
	elem.innerHTML = 'Исходный код';
	
	var html = '';
	var c = '';
	var n=0;
	for (var j=0; j < elems.length; j++) {
		
		elem = document.createElement('div');
		elem.className = "html-panel-elem";
		elem.title = elems[j].title;
		_panel.appendChild(elem);
		
		c = elems[j].txt.replace(/</g,'%%%&lt;');
		c = c.replace(/>/g,'&gt;%%');
		c = c.replace(/(%%%)/g,'<mgnt>');
		c = c.replace(/(%%)/g,'</mgnt>');
		c = '<div class="gray"><wht>' + c + '</wht></div>';
		
		elem.innerHTML = c;
	}
	
	var _size = _panel.getBoundingClientRect();
	
	garevna_html_css_library.htmlPanelHeight = _size.bottom - _size.top;
	
	document.getElementById("html-panel-top").onclick = function() {
		garevna_html_css_library.htmlPanelHide();
	}
};
// ----------------------------------------------------------------------------------------------- cssPanelHide
garevna_html_css_library.cssPanelHide = function () {
	
	garevna_html_css_library.cssPanelHidden = !garevna_html_css_library.cssPanelHidden;
	var b = (!garevna_html_css_library.cssPanelHidden)?("0"):("-" + (garevna_html_css_library.cssPanelHeight));
	TweenLite.to("#css-panel", 1, { bottom:b });
};
// ----------------------------------------------------------------------------------------------- htmlPanelHide
garevna_html_css_library.htmlPanelHide = function () {
	
	garevna_html_css_library.htmlPanelHidden = !garevna_html_css_library.htmlPanelHidden;
	var b = (!garevna_html_css_library.htmlPanelHidden)?("0"):("-" + (garevna_html_css_library.htmlPanelHeight));
	TweenLite.to("#html-panel", 1, { bottom:b });
};
// ----------------------------------------------------------------------------------------------- buildSelect
garevna_html_css_library.buildSelect = function ($options, $onChange, $val, lbl) {
	
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
garevna_html_css_library.icons = function () {
	
	garevna_html_css_library.clear();
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
