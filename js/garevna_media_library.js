;
var garevna_media_library = function () {
	var num = 0;
	return {
		// ================================================================================================ create_event
		create_event: function (event_name, event_target_id, callback_func) {
			
			var event_target = [];
			var func = [];
			var $event_names = [];
			var i;
			//
			var n = !event_target_id.length?1:event_target_id.length;
			//
			for (i=0; i < n; i++) {
				$event_names[i] = event_name + i;
				event_target[i] = document.getElementById(event_target_id[i]);
				func[i] = callback_func[i];
			}
			var $event = [];
			try {
				for (i=0; i < n; i++) {
					$event[i] = new Event($event_names[i]);
				}
			}
			catch (err) {
				for (i=0; i < n; i++) {
					$event[i] = document.createEvent('Event');
					$event[i].initEvent($event_names[i], false, false);
				}
			}
			try {
				for (i=0; i < n; i++) {
					event_target[i].dispatchEvent($event[i]);
				}
			}
			catch (err) {
				for (i=0; i < n; i++) {
					event_target[i].fireEvent($event[i]);
				}
			}
			var callback;
			for (i=0; i < n; i++) {
				callback = func[i];
				event_target[i].addEventListener($event[i], func[i]($event[i]), true);
			}
			return $event;
		},
		// =================================================================================== createStyleSheet
		createStyleSheet: function (styleSheetId, styleSheetRules) {
			//
			//   styleSheetRules = { css_selector:'', css_attributes:[], css_values:[] }
			//
			var style = document.createElement("style");
			style.id = styleSheetId || 'temporaryStyleSheet';
			document.head.appendChild(style);
			
			style.appendChild(document.createTextNode(""));
			
			if (styleSheetRules) {
				var i, j, selector, attribs, vals, rule;
				for (i=0; i<styleSheetRules.length; i++) {
					selector = styleSheetRules[i].css_selector;
					attribs = styleSheetRules[i].css_attributes;
					vals = styleSheetRules[i].css_values;
					var j;
					rule = '';
					for (j=0; j < attribs.length; j++) {
						rule += attribs[j] + ':' + vals[j] + ';';
					}
					rule = selector + '{' + rule + '}';
					style.insertRule(rule, i);
				}
			}
			return style;
		},
		// =================================================================================== addCSSRuleToStyleSheet
		addCSSRuleToStyleSheet: function (styleSheet, selector, rules) {
			
			var index = styleSheet.rules;
			
			if("insertRule" in styleSheet) {
				styleSheet.insertRule(selector + "{" + rules + "}", index);
			}
			else if("addRule" in styleSheet) {
				styleSheet.addRule(selector, rules, index);
			}
		},
		// =========================================================================== removeCSSAttributeFromCSSRule
		removeCSSAttributeFromCSSRule: function (styleSheet, selector, css_attribute) {
			console.group('removeCSSAttributeFromCSSRule');
			console.log(styleSheet);
			var i, k;
			
			for (i=0; i<styleSheet.rules.length; i++) {
				
				var rule = styleSheet.rules[i];
				
				if (rule.selectorText == selector) {
					
					for (k=0; k < rule.style.length; k++) {
						
						if (rule.style[k] == css_attribute) {
							console.log(rule);
							rule.remove(rule.style[k]);
							console.log(rule);
							return true;
						}
					}
				}
			}
			return false;
		},
		// ============================================================================== appendCSSAttributeToCSSRule
		appendCSSAttributeToCSSRule: function (styleSheet, selector, css_attribute, attibute_val) {
			var i, k;
			for (i=0; i<styleSheet.rules.length; i++) {
				if (styleSheet.rules[i].selectorText == selector) {
					var rule = styleSheet.rules[i];
					console(rule.style);
					
				}
			}
			return false;
		},
		// ============================================================================== removeCSSRuleFromStyleSheet
		removeCSSRuleFromStyleSheet: function addCSSRule(styleSheet, selector) {
			var i;
			for (i=0; i<styleSheet.rules.length; i++) {
				if (styleSheet.rules[i].selectorText == selector) {
					stylesheet.deleteRule(i);
					return true;
				}
			}
			return false;
		},
		// ===================================================================================== removeStyleSheetById
		removeStyleSheetById: function (styleSheetId) {
			var styleSheet = document.getElementById(styleSheetId);
			styleSheet.parentNode.removeChild(styleSheet);
		},
		// ================================================================================================ loadSource 
		loadSource: function (worker, sourceURL, callback, params) {
			try {
				worker = new Worker('/js/sourse_loader.js');
				worker.postMessage(sourceURL);
				worker.addEventListener('message', function(e) {
					var $data = e.data;
					worker.terminate();
					worker = undefined;
					if (e.data) {
						callback($data, params);
					}
					else {
						alert("Ограниченная функциональность. Отсутствуют необходимые библиотеки: " + sourceURL);
					}
				}, false);
			}
			catch (err) {
				alert("Пожалуйста, обновите браузер. К сожалению, в Вашем браузере полная функциональность невозможна");
			}
		},
		// ============================================================================================================
		// Всплывающее и угасающее окно сообщения
		fade_window: function ( text, type, params ) {
			if ( !document.getElementById("garevna_info_window") ) {
				var fadow_win = document.createElement('div');
				fadow_win.style.position = 'fixed';
				fadow_win.style.zIndex = '800';
				fadow_win.style.padding = '10px 20px';
				fadow_win.style.color = '#fff';
				fadow_win.style.border = 'groove 1px white';
				fadow_win.style.borderRadius = '4px';
				fadow_win.id = "garevna_info_window";
				document.body.appendChild(fadow_win);
				fadow_win.style.opacity = '0.0';
				fadow_win.showInfoWindow = function () {
					TweenLite.to( document.getElementById("garevna_info_window"), 2, {
						opacity: '1.0',
						onComplete: function () {
							TweenLite.to( document.getElementById("garevna_info_window"), 2, { opacity: '0.0', delay:2 } );
						}
					} );
				};
			}
			else { var fadow_win = document.getElementById("garevna_info_window"); }
			
			fadow_win.style.top = params?(params.top?params.top:null):'10%';
			fadow_win.style.bottom = params?(params.bottom?params.bottom:null):null;
			fadow_win.style.right = params?(params.right?params.right:null):'10%';
			fadow_win.style.left = params?(params.left?params.left:null):null;
		   
		   // fadow_win.style.margin = '10% 10% 10% 10%';
		   var bck = { seccess:'#649600', err:'#960064', warn:'#880', info:'#009' };
		   var clr = params?(params.backgroundColor?params.backgroundColor:null):null;
		   var bckgr = type?( bck[type]?bck[type]:bck.info ):null;
		   
		   fadow_win.style.backgroundColor = clr?clr:(bckgr?bckgr:'#000');
		   
		   fadow_win.innerHTML = text;
		   
		   fadow_win.showInfoWindow();
		   //fadow_win.hideTween();
		},
		// ================================================================================================
		//
		//  Функция показа всплывающей подсказки (идентификатор объекта подсказки hlp_id) с текстом elem_text
		//  Объект подсказки <div id="hlp" class="hlp"></div>
		//
		// ------------------------------------------------------------------------------------------------
		ElemTooltip: function (elem, tooltip_text) {
			
			elem.onmouseout = function(event) {
				var child = document.getElementById('garevna_Tooltip');
				if (child) { elem.removeChild(child); }
			}
			elem.onmouseover = function(event) {
				var x = (event.pageX)?(event.pageX - window.pageXOffset):(event.clientX);
				var y = (event.pageY)?(event.pageY - window.pageYOffset):(event.clientY);
				var hlp = document.createElement("div");
				var txtNode = document.createTextNode(tooltip_text);
				hlp.id = "garevna_Tooltip";
				hlp.style.position = "fixed";
				hlp.style.left = x + "px";
				hlp.style.top = y + "px";
				hlp.style.minWidth = "150px";
				hlp.style.backgroundColor = "rgba(255,255,255,0.9)";
				hlp.style.border = "solid 1px #aaa";
				hlp.style.borderRadius = "5px";
				hlp.style.padding = "3px 7px";
				hlp.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.5)";
				hlp.appendChild(txtNode);
				elem.appendChild(hlp);
				var bcr = hlp.getBoundingClientRect();
				x = (x + bcr.width > window.innerWidth)?(x - (bcr.right - window.innerWidth + 20)):(x);
				y = (y + bcr.height > window.innerHeight)?(y - (bcr.bottom - window.innerHeight + 20)):(y);
				hlp.style.left = x + "px";
				hlp.style.top = y + "px";
			}
		},
		// =============================================================================================== flash
		build_swf: function ($swf, targetElement) {
			num++;
			var worker = new Worker('/js/swf_builder.js');
			worker.postMessage({num:num, url:$swf});
			worker.addEventListener('message', function(e) {
				targetElement.innerHTML = e.data;
			}, false);
		},
		// =============================================================================================== createPanel
		createPanel: function ($id, position, $color, $backgroundColor) {
			var elem = document.createElement('div');
			elem.id = $id || '_panel';
			elem.style.position = "absolute";
			elem.style.left = "30px";
			// elem.style.paddingLeft = "30px";
			elem.style.width = "100%";
			elem.style.height = "30px";
			elem.style.paddingLeft = "20px";
			var x = (!position)?('top'):(position);
			elem.style[x] = "0";
			elem.style.backgroundColor = $backgroundColor || "rgba(50,50,50,0.5)";
			elem.style.color = $color || "white";
			elem.style.zIndex = 300;
			return elem;
		},
		// -----------------------------------------------------------------------------
		get_win_size: function (elements, win, $fontSize) {
			
			var x = [];
			var i;
			var $x = 0;
			var ret = { w:0, h:0 };
			ret.w = window.innerWidth*0.8;
			win.style.width = ret.w + 'px';
			ret.h = 0;
			var dim;
			for (i=0; i<elements.length; i++) {
				if ($fontSize) {
					elements[i].style.fontSize = $fontSize;
				}
				dim = elements[i].getBoundingClientRect();
				x[i] = dim.width;
				ret.h += dim.height + 10;
				$x = Math.max($x, x[i] + 40);
			}
			ret.w = Math.min(window.innerWidth*0.8, $x);
			if (win) {
				win.style.width = ret.w + 'px';
				win.style.height = ret.h + 'px';
				win.style.left = (window.innerWidth - ret.w)/2 + 'px';
				win.style.top = (window.innerHeight - ret.h)/2 + 'px';
			}
			return ret;
		},
		// =========================================================================================== showNodeParams
		speakAboutNode: function (elem) {
					var txt = "Элемент:\n\n";
					txt += "nodeName: " + elem.nodeName + "\n";
					txt += "nodeValue: " + elem.nodeValue + "\n";
					txt += "nodeType: " + elem.nodeType + "\n\n";
					if (elem.firstChild) {
						txt += "Узел-потомок элемента:\n\n";
						txt += "firstChild.nodeType: " + elem.firstChild.nodeName + "\n";
						txt += "firstChild.nodeValue: " + elem.firstChild.nodeValue + "\n";
						txt += "firstChild.nodeType: " + elem.firstChild.nodeType;
					}
					else { txt += "У элемента нет узла-потомка"; }
					alert(txt);
			console.log(elem);
		},
		// =========================================================================================== createPromptWin
		createPromptWin: function (label, callback, $type, val, $min, $max) {
			
			var elements = [];
			var win = document.createElement('div');
			win.id = "garevna_prompt_win";
			document.body.appendChild(win);
			
			var figure = document.createElement('figure');
			figure.innerHTML = label;
			win.appendChild(figure);
			elements[0] = figure;
			
			if (callback || $type || val) {
				var $input = document.createElement('input');
				$input.type = $type || "text";
				$input.setAttribute("value", val || '');
				if ($type && ($type = "number")) {
					$input.setAttribute('min',  $min || '');
					$input.setAttribute('max',  $max || '');
				}
				win.appendChild($input);
				
				elements.push($input);
			}
			
			var btn = document.createElement('button');
			btn.innerHTML = 'x';
			btn.className = "closeButton";
			btn.onclick = function (event) {
				win.parentNode.removeChild(win);
				if (callback) {
					callback($input.value);
				}
				else {
					return (!$input)?(''):($input.value);
				}
			}
			win.appendChild(btn);
			//btn.style.position = 'absolute';
			//btn.style.bottom = '20px';
			//btn.style.right = '20px';
			elements.push(btn);
			//var dim = this.get_win_size (elements, win);
			
			//if (window.innerHeight*0.8 < dim.h) {
				
			//	dim = this.get_win_size (elements, win, '90%');
			//	if (window.innerHeight*0.8 < dim.h) {
					
			//		dim = this.get_win_size (elements, win, '80%');
			//	}
			//}
		},
		// =================================================================================================
		create_home_button: function (ref, $id,  $bottom, $right) {
			var elem = document.createElement('button');
			elem.id = $id || 'homeButton';
			elem.style.position = "absolute";
			elem.style.bottom = $bottom || "0";
			elem.style.right = $right || "45px";
			elem.style.width = "30px";
			elem.style.height = "30px";
			elem.style.border = 'none';
			elem.style.backgroundColor = 'transparent';
			elem.style.backgroundImage = 'url(/buttons/home_button.png)';
			elem.style.backgroundRepeat = 'no-repeat';
			elem.style.backgroundSize = 'contain';
			elem.style.backgroundPosition = 'center';
			elem.ref = ref;
			elem.onclick = function (event) {
				window.open(this.ref,'_self');
			}
			return elem;
		},
		getNaviFontSize: function (parent_object_width) {
			return (parent_object_width < 450)?('85%'):('100%');
		},
		// ====================================================================================================
		getParentObjectSize: function (parent_object) {
			var ret = { w:0, h:0, marg:0 };
			if (!parent_object || !parent_object.style.width || !parent_object.style.height) {
				ret.w = window.innerWidth;
				ret.h = window.innerHeight;
				ret.marg = 0;
			}
			else {
				ret.w = parent_object.style.width;
				ret.w = eval(ret.w.slice(0, ret.w.indexOf("px")));
				ret.h = parent_object.style.height;
				ret.h = eval(ret.h.slice(0, ret.h.indexOf("px")));
				ret.marg = parent_object.style.marginLeft;
				ret.marg = eval(ret.marg.slice(0, ret.marg.indexOf("px")));
			}
			return ret;
		},
		// ====================================================================================================
		createNaviButton: function (direction, clickHandler) {
			var but = document.createElement('button');
			but.style.color = 'white';
			but.style.backgroundColor = 'transparent';
			but.style.border = 'none';
			but.style.fontSize = '22px';
			but.style.marginTop = '0';
			but.innerHTML = (direction == 'next')?('&#9656;'):('&#9666;');
			return but;
		},
		// ====================================================================================================
		init_spin: function (current_slide, slides_num) {
			var k = Math.round((window.innerWidth*0.8)/slides_num);
			k = Math.max(k,2);
			k = Math.min(k,11);
			
			var html = '<span style="font-size:' + k + 'px;"><span style="color:#85ff0A;">';
			var j;
			for (j=0; j <= current_slide; j++) {
				//html += '&#9898;';
				html += '&#10074;';
			}
			html += '</span><span style="color:white;">';
			for (j = current_slide+1; j < slides_num; j++) {
				//html += '&#9899;';
				//html += '&#9898;';
				html += '&#10074;';
			}
			html += '</span></span>';
			return html;
		},
		// ==================================================================================================== 
		createFlash: function (url, coord, size, parent_object) {
			
			var y = (coord.top)?('top'):('bottom');
			var x = (coord.left)?('left'):('right');
			
			var flash = document.createElement('div');
			var parent = parent_object || document.body;
			parent.appendChild(flash);
			flash.id = 'flash';
			flash.style.position = 'fixed';
			flash.style[y] = (coord.top)?(coord.top):((coord.bottom)?(coord.bottom):('5px'));
			flash.style[x] = (coord.left)?(coord.left):((coord.right)?(coord.right):('5px'));
			flash.style.width = '50px';
			flash.style.height = '50px';
			flash.activeWidth = (size)?(size.width):(window.innerWidth*0.8 + 'px');
			flash.activeHeight = (size)?(size.height):(window.innerHeight*0.8 + 'px');
			flash.appendChild(document.createElement('div'));
			flash.firstChild.id = 'garevna_movie';
			flash.firstChild.style.width = '0px';
			flash.firstChild.style.height = '0px';
			flash.firstChild.style.backgroundColor = 'rgba(255,255,255,0.8)';
			flash.firstChild.style.border = 'inset 1px white';
			flash.firstChild.style.borderRadius = '5px';
			this.build_swf (url, flash.firstChild);
			//flash.firstChild.style.display = 'none';
			flash.style.backgroundImage = 'url(/buttons/adobe_flash.png)';
			flash.style.backgroundRepeat = 'no-repeat';
			flash.style.backgroundSize = 'contain';
			flash.onmouseover = function (event) {
				
				var w = event.target.activeWidth;
				var h = event.target.activeHeight;
				var obj = document.getElementById('garevna_movie');
				TweenLite.to(obj, 2, { width: w, height: h, marginTop: '50px', marginLeft:'50px' });
			}
			flash.onmouseout = function (event) {
				obj = event.target;
				//obj.firstChild.style.display = 'none';
				TweenLite.to('#garevna_movie', 2, { width:'0px', height:'0px' });
			}
		},
	    // ==================================================================================================== addStars
		addStars: function  (parent_object) {
			var $parent_object = !parent_object?document.getElementsByTagName('body').item(0):parent_object;
			var sky = document.getElementById('garevna_sky');
			if (sky) {
				sky.parentNode.removeChild(sky);
			}
			var $dim = this.getParentObjectSize ($parent_object);
			var stars_worker = new Worker('/js/stars.js');
			stars_worker.postMessage({ $id:'garevna_sky', w:$dim.w, h:$dim.h });
			stars_worker.addEventListener('message', function(e) {
				$parent_object.insertAdjacentHTML("afterBegin", e.data);
				$parent_object.style.overflow = "hidden";
				stars_worker.terminate();
				stars_worker = undefined;
			}, false);
		},
		// ============================================================================================ news_callback
		news_callback: function ($data, newsTween) {
			var newsTimer;
			if (!$data) { return; }
			var news_data = JSON.parse($data);
			var mc_text = [];
			var mc_width = [];
			var garevna_tw = [];
			var $time = [];
			
			var mc_line = document.createElement('div');
			document.body.appendChild(mc_line);
			mc_line.style.width = '100%';
			mc_line.style.height = '20px';
			mc_line.style.color = 'white';
			mc_line.style.position = 'fixed';
			mc_line.style.top = news_data._top;
			mc_line.style.left = '0';
			// mc_line.style.backgroundColor = 'black';
			mc_line.style.padding = '4px 0';
			mc_line.style.margin = '0';
			mc_line.style.overflow = 'hidden';
			
			for (var j=0; j < news_data.news.length; j++) {
				mc_text[j] = document.createElement('div');
				mc_text[j].style.position = 'absolute';
				mc_text[j].style.top = '0';
				mc_text[j].style.left = '100%';
				mc_text[j].style.fontFamily = news_data.font_family;
				mc_text[j].style.fontSize = news_data.font_size;
				mc_text[j].style.color = news_data.text_color;
				mc_text[j].innerHTML = news_data.news[j].subject;
				mc_text[j].style.whiteSpace = 'nowrap';
				mc_line.appendChild(mc_text[j]);
				mc_width[j] = mc_text[j].getBoundingClientRect().width;
				$time[j] = (window.innerWidth + mc_width[j]) / news_data.velocity;
				garevna_tw[j] = TweenLite.to(mc_text[j],$time[j], { left:'-'+mc_width[j] + 'px', ease: Power0.easeNone });
			}
			var t = 0;
			for (var j=0; j < mc_text.length; j++) {
				t += (j === 0)?(0):((mc_width[j-1]+40) / news_data.velocity);
				newsTween.add( garevna_tw[j], t);
				newsTween.eventCallback("onComplete", function() { newsTween.restart(); }, ["param1","param2"]);
			}
			newsTween.play();
		},
		// ============================================================================================ event listener
		add_event_listener: function (element, evt, listener) {
			if (element.addEventListener) {
				element.addEventListener( evt, listener, false );
			}
			else {
				element.attachEvent( 'on' + evt, function() {
					listener.call( element, window.event );
				});
			}
		},
		remove_event_listener: function (element, evt, listener) {
			try {
				element.removeEventListener( evt, listener, false );
			}
			catch (error) {
				try {
					element.detachEvent( 'on' + evt, function() {
						listener.call( element, window.event );
					});
				}
				catch (err) {
					console.error('Event handler was not removed for DOM object:');
					console.error(element);
				}
			}
		}
	}
}