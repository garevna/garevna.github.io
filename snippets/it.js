// ========================================================================================================
//                                        I T    D I S C I P L I N E S
// ========================================================================================================

function garevna_disciplines () {
		
		var parent_object = this;   // контекст вызова
		console.log(parent_object);
		var disciplines_area = undefined;
		var economics_data = undefined;
		var economics_area = undefined;
		var computer_data = undefined;
		var computer_area = undefined;
		var commentLine = undefined;
		
		var selectPanelId = 'garevna_select_papers_panel';
		var infoPanelId = 'garevna_publicat_info_panel';
		// --------------------------------------------------------------------------------------------- loadData
		(function loadData () {
			var publicat_worker = new Worker('/js/json_loader.js');
			publicat_worker.postMessage('/data_files/disciplines.json');
			publicat_worker.addEventListener('message', function(e) {
				if(!e.data) {
					alert("Извините, файл /data_files/disciplines.json не обнаружен");
				}
				else {
					getData(e.data, this);
				}
			}, false);
		})();
		// =============================================================================================== getData
		function getData ($data, context) {
			economics_data = $data.economics;
			computer_data = $data.computer;
			disciplines_area = document.createElement('div');
			disciplines_area.id = "garevna_disciplines";
			disciplines_area.className = "flex-div";
			parent_object.appendChild(disciplines_area);
			
			economics_area = document.createElement('div');
			//economics_area.style.border = "inset 1px white";
			disciplines_area.appendChild(economics_area);
			buildButtonsArea (economics_data, economics_area);
			
			computer_area = document.createElement('div');
			//computer_area.style.border = "inset 1px white";
			disciplines_area.appendChild(computer_area);
			buildButtonsArea (computer_data, computer_area);
			
			commentLine = garevna_lib.createPanel ("garevna_disciplines_info", 'bottom');
			parent_object.appendChild(commentLine);
			commentLine.innerHTML = "Выберите раздел";
			
			parent_object.resize_callback = disciplines_resize;
			disciplines_resize ();
		};
		// ========================================================================================== buildButtonsArea
		function buildButtonsArea ($data, $obj) {
			
			$obj.className = 'flex-div';
			$obj.backimg = $data.main_image;
			//$obj.style.backgroundImage = 'url(' + $obj.backimg + ')';
			$obj.style.backgroundRepeat = 'no-repeat';
			//$obj.style.backgroundSize = '80px';
			$obj.style.boxShadow = 'inset 2px 2px 2px rgba(0,0,0,0.5)';
			$obj.style.borderRadius = '5px';
			$obj.style.backgroundPosition = 'bottom right';
			var i, btn;
			for (i=0; i<$data.button_images.length; i++) {
				btn = document.createElement('input');
				btn.type = 'image';
				btn.style.boxSizing = 'border-box';
				btn.style.position = 'relative';
				btn.src = $data.button_images[i];
				btn.style.width = window.innerWidth*0.1 + 'px';
				btn.style.height = window.innerHeight*0.1 + 'px';
				//btn.style.opacity = '0';
				btn.ref = $data.url[i];
				btn.txt = $data.txt[i];
				btn.onmouseover = function (event) {
					event.stopPropagation();
					var obj = this;
					TweenLite.to(obj, 1, { scale:1.2, boxShadow:"5px 5px 5px rgba(0,0,0,0.5)" });
					commentLine.innerHTML = '<img src="' + this.src + '" style="width:55px; height:auto; position:relative; bottom:25px; float:left;" />&nbsp;<span class="magenta" style="color:white">' + this.txt + '</span>'
					// commentLine.innerHTML = this.txt;
				}
				btn.onmouseout = function (event) {
					commentLine.innerHTML = '';
					TweenLite.to(this, 1, { scale:1, boxShadow:"none" });
				}
				btn.onclick = function (event) {
					window.open(this.ref, '_blank');
				}
				$obj.appendChild(btn);
			}
			$obj.onmouseover = function (event) {
				//this.style.backgroundImage = 'none';
				//var childs = this.childNodes;
				//TweenLite.to(childs, 1, {opacity:1});
				//TweenLite.to(childs, 5, { position:'relative', right:'inherit', bottom:'inherit' });
				commentLine.innerHTML = '<img src="' + $data.main_image + '" style="width:55px; height:auto; position:relative; bottom:25px; float:left;" />&nbsp;<span class="magenta" style="color:white">' + $data.title + '</span>';
			}
			$obj.onmouseout = function (event) {
				
				//this.style.backgroundImage = 'url(' + this.backimg + ')';
				//var childs = this.childNodes;
				commentLine.innerHTML = '';
				//TweenLite.to(childs, 1, {opacity:0});
				//TweenLite.to(childs, 5, { position:'absolute', bottom:'0', right:'0'});
			}
		};
		// =========================================================================================== 
		function disciplines_resize () {
			console.info('disciplines resize');
			var dim = garevna_lib.getParentObjectSize(parent_object);
			console.info('parent_object: ' + parent_object.id + ' width = ' + parent_object.style.width + ' height = ' + parent_object.style.height);
			var w = dim.w * 0.9 + 'px';
			var h = dim.h * 0.9 + 'px';
			//var margTop = dim.h * 0.05 + 'px';
			//var margLeft = dim.w * 0.05 + 'px';
			
			disciplines_area.style.width = w;
			disciplines_area.style.height = h;
			
			var $dim = garevna_lib.getParentObjectSize(disciplines_area);
			console.info('disciplines_area: width=' + $dim.w + ' height=' + $dim.h);
			$w = $dim.w*0.45;
			$h = $dim.h*0.9;
			//var $margLeft = $dim.w*0.05 + 'px';
			//var $margTop = $dim.h*0.05 + 'px';
			economics_area.style.maxWidth = $w + 'px';
			economics_area.style.height = $h + 'px';
			economics_area.style.marginLeft = $dim.w*0.05 + 'px';
			
			
			computer_area.style.maxWidth = $w + 'px';
			computer_area.style.height = $h + 'px';
			computer_area.style.marginLeft = $dim.w*0.05 + 'px';
			
			var childs_econ = economics_area.childNodes;
			var childs_comp = computer_area.childNodes;
			var num = Math.max(childs_econ.length, childs_comp.length);
			var x = ($w*$h)/num;
			
			var nx = Math.floor($w/x);
			var ny = Math.floor($h/x);
			var s = nx*ny;
			while (s < num) {
				x -=0.1*x;
				nx = Math.floor($w/x);
				ny = Math.floor($h/x);
				s = nx*ny;
			}
			var s = x + 'px';
			var i;
			for (i=0; i<childs_econ.length; i++) {
				childs_econ[i].style.width = s;
				childs_econ[i].style.height = s;
			}
			for (i=0; i<childs_comp.length; i++) {
				childs_comp[i].style.width = s;
				childs_comp[i].style.height = s;
			}
		}
}