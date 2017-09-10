var sourceDataURL = location.hash.substr(1,location.hash.length); // hash: #/data_files/main_buttons.json

var garevnaScene = document.getElementById("garevna_mainScene");
    garevnaScene.boxContent = [];
	garevnaScene.boxes = [];
	garevnaScene.activeBox = undefined;
	// ====================================================================================================== loadSource 
	garevnaScene.loadSource = function (worker, sourceURL, callback, params) {
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
	}
	// ==================================================================================================== pin
	garevnaScene.pin = (function () {
		var innerContentFixed = false;
		return {
			block: function() {
				innerContentFixed = true;
			},
			free: function() {
				innerContentFixed = false;
			},
			value: function() {
				return innerContentFixed;
			}
		};
	})();
	// ==================================================================================================== tween
	garevnaScene.tween = (function () {
		var tweenState = true;
		return {
			block: function() {
				tweenState = false;
			},
			free: function() {
				tweenState = true;
			},
			value: function() {
				return tweenState;
			}
		};
	})();
	
	// =============================================================================================================
	//                                              loadElements
	// =============================================================================================================
	garevnaScene.loadElementsCallback = function ($responce) {
		garevnaScene.boxContent = JSON.parse($responce);
		// garevnaScene.resizeElementsList = [];
		var num = garevnaScene.boxContent.length;
		garevna_libTweenMethods = garevna_libTweenMethods(num);
		var $request = [];
		var k;
		
		for (k=0; k < num; k++) {
			garevnaScene.boxes[k] = garevnaScene.appendChild(document.createElement("div"));
			garevnaScene.boxes[k].className = "garevna_floatingBox";
			garevnaScene.boxes[k].id = "garevna_box" + k;
			// garevnaScene.resizeElementsList.push(garevnaScene.boxes[k].id);
			garevnaScene.boxes[k].style.backgroundImage = 'url(' + garevnaScene.boxContent[k].passive + ')';
			garevnaScene.boxes[k].onmouseover = function(event) {
				garevna_libTweenMethods.mouse_move(event);
			}
			garevnaScene.boxes[k].onmouseout = function(event) {
				garevna_libTweenMethods.mouse_move(event);
			}
			
			var articleData = garevnaScene.boxContent[k].active;
			var article = document.createElement('article');
			article.id = 'garevna_article' + k;
			article.style.display = 'none';
			garevnaScene.boxes[k].appendChild(article);
			article.onTweenFront_callback = undefined;
			switch (articleData.type) {
				case 'js':
				    var func_name = articleData.func_name;
					var params = [func_name, article, articleData.func_params];
					if (articleData.topic) {
						article.topic = articleData.topic;
					}
				    garevnaScene.loadSource($request[k], articleData.ref, garevnaScene.loadScriptCallback, params);
					break;
				case 'swf':
				    article.innerHTML = garevna_lib.build_swf(articleData.ref);
					break;
				case 'html':
				    garevnaScene.loadSource ($request[k], articleData.ref, garevnaScene.loadHTMLcallback, article);
					break;
				case 'button set':   // ?????
				    //var params = [article, articleData.func_params];
					console.log(articleData.ref);
				    garevnaScene.loadSource($request[k], articleData.ref, garevnaScene.loadButtonSetCallback, article);
					break;
				case 'img':
				    article.innerHTML = '<img src="' + articleData.ref + ' />';
				    break;
				case 'function':
				    article.innerHTML = window[articleData.func](articleData.func_params);
				    break;
				case 'button_set':
				    article.picture = articleData.func_params.picture;
					article.picture_title = articleData.func_params.picture_title;
					article.main_head = articleData.func_params.main_head;
					article.buttons_width = articleData.func_params.buttons_width;
					article.data = articleData.func_params.data;
					create_article_content ( article );
					break;
				default:
				    break;
			}
			garevna_libTweenMethods.setBoxSize (garevnaScene.boxes[k], false);
		}
	};
	garevnaScene.loadButtonSetCallback = function ($responce, parent) {
		var $params = JSON.parse($responce);
		
		var i;
		var subject_buttons = [];
		for (i=0; i < $params.length; i++) {
			$params[i].parent_node = parent;
			parent.topic = 'it';
			subject_buttons[i] = garevna_button_set($params[i]);
		}
	};
	// ======================================================================================================= scripts
	garevnaScene.loadElements = (function() {
		var requestMainData;
		garevnaScene.loadSource (requestMainData, garevna_sourceDataURL, garevnaScene.loadElementsCallback);
	})();
	// ====================================================================================================== loadHTML
	garevnaScene.loadHTMLcallback = function (responceHTML, article) {
		article.innerHTML = responceHTML;
		article.firstChild.style.overflow = 'auto';
		article.resize_callback = function () {
			var obj = this.firstChild;
			var dim = garevna_lib.getParentObjectSize(this);
			obj.style.width = (dim.w - window.innerWidth*0.02) + 'px';
			obj.style.height = (dim.h - window.innerHeight*0.02) + 'px';
			obj.style.marginLeft = window.innerWidth*0.02 + 'px';
			obj.style.marginTop = window.innerHeight*0.02 + 'px';
		}
	}
	// ==================================================================================================== loadScript
	garevnaScene.loadScriptCallback = function (responceScript, params) {
		var func_name = params[0];
		var parent_object = params[1];
		var func_params = params[2];
		var script_obj = document.createElement('script');
		var script_txt = document.createTextNode(responceScript);
		script_obj.appendChild(script_txt);
		
		document.getElementsByTagName('head').item(0).appendChild(script_obj);
		parent_object.func_params = func_params;
		
		var func = window[func_name];
		var wrapper = func.bind(parent_object);
		wrapper();
	}

function resize_window () {
	
	garevna_libTweenMethods.resize();
	
	var k, _active;
	for (k = 0; k < garevnaScene.boxes.length; k++) {
		_active = garevnaScene.boxes[k] == garevnaScene.activeBox;
		garevna_libTweenMethods.setBoxSize (garevnaScene.boxes[k], _active);
	}
	// garevna_player.playerResize();
}

garevna_lib.add_event_listener (window, "resize", resize_window);