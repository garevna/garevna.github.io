// ========================================================================================================
//                                        C O U R S E W A R E
// ========================================================================================================

function garevna_games () {
		
		var parent_object = this;   // контекст вызова
		var topic = parent_object.topic;
		var games_area = undefined;
		var _data = undefined;;
		var commentLine = undefined;
		var buttonSet = [];
		var access = false;
		var games_data = undefined;
		
		// --------------------------------------------------------------------------------------------- loadData
		(function loadData () {
			
			var games_worker = new Worker('/js/json_loader.js');
			games_worker.postMessage('/data_files/courseware.json');
			games_worker.addEventListener('message', function(ev) {
				if(!ev.data) {
					alert("Извините, файл /data_files/games.json не обнаружен");
				}
				else {
					games_data = ev.data;
				}
			}, false);
		})();
		// =============================================================================================== getData
		function getData ($data, context) {
			
			_data = (topic = 'it')?($data.computer):($data.economics);
			games_area = document.createElement('div');
			games_area.id = "garevna_games";
			games_area.style.marginLeft = "30px";
			
			parent_object.appendChild(games_area);
			
			buildButtonsArea (_data, games_area);
			
			games_area.style.overflow = 'auto';
			
			commentLine = garevna_lib.createPanel ("garevna_games_info", 'bottom');
			
			parent_object.appendChild(commentLine);
			games_area.info_panel = commentLine;
			commentLine.style.paddingLeft = '30px';
			var img = document.createElement('img');
			parent_object.appendChild(img);
			img.style.position = 'absolute';
			img.style.bottom = '0';
			img.style.left = '0';
			img.src = _data.main_image;
			img.style.width = '30px';
			img.style.height = 'auto';
			
			games_area.normal_button_size = '80px';
			games_area.small_button_size = '80px';
			games_area.small_buttons_container_size = '340px';
			
			parent_object.resize_callback = games_resize;
			games_resize ();
		};
		// ========================================================================================== buildButtonsArea
		function buildButtonsArea ($data, $obj) {
			
			// $obj.className = 'flex-div';
			$obj.backimg = $data.main_image;
			
			$obj.style.backgroundRepeat = 'no-repeat';
			$obj.style.boxShadow = 'inset 2px 2px 2px rgba(0,0,0,0.5)';
			$obj.style.borderRadius = '5px';
			var i, btn;
			for (i=0; i<$data.button_images.length; i++) {
				var params = {
					parent_node:$obj,
					img:$data.small_button_image,
					mainImage: $data.button_images[i],
					hash_prefix:$data.hash_prefix[i],
					hash_vals: $data.hash_vals[i],
					subject:$data.txt[i],
					info_panel:commentLine
				};
				buttonSet[i] = garevna_button_set(params);
			}
		};
		// =========================================================================================== 
		function games_resize () {
			
			var dim = garevna_lib.getParentObjectSize(parent_object);
			
			var w = dim.w * 0.8;
			var h = dim.h * 0.8;
			
			games_area.style.width = w + 'px';
			games_area.style.height = h + 'px';
			games_area.style.marginLeft = dim.w*0.1 + 'px';
			var z = Math.min(w,h) - 30;
			games_area.small_buttons_container_size = z + 'px';
			games_area.small_button_size = Math.round(z/4.5) + 'px';
			
			var childs_elements = games_area.childNodes;
			
			var num = childs_elements.length;
			var x = (w*h)/num;
			
			var nx = Math.floor(w/x);
			var ny = Math.floor(h/x);
			var s = nx*ny;
			while (s < num) {
				x -=0.1*x;
				nx = Math.floor(w/x);
				ny = Math.floor(h/x);
				s = nx*ny;
			}
			games_area.normal_button_size = x + 'px';
			
			var i,j;
			for (i=0; i<childs_elements.length; i++) {
				
				childs_elements.item(i).resize();
			}
		}
}