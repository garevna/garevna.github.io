// ========================================================================================================
//                                        D I S C I P L I N E S
// ========================================================================================================

function garevna_disciplines () {
		
		var parent_object = this;   // контекст вызова
		var topic = parent_object.topic;
		var disciplines_area = undefined;
		var _data = undefined;;
		var commentLine = undefined;
		var buttonSet = [];
		var access = false;
		var disciplines_data = undefined;
		
		// --------------------------------------------------------------------------------------------- loadData
		(function loadData () {
			
			var disciplines_worker = new Worker('/js/json_loader.js');
			disciplines_worker.postMessage('/data_files/disciplines.json');
			disciplines_worker.addEventListener('message', function( event ) {
				if( !event.data ) {
					alert("Извините, файл /data_files/disciplines.json не обнаружен");
				}
				else {
					disciplines_data = event.data;
					if ( topic == 'it' ) { build_login_window (); }
					else { getData(disciplines_data, parent_object); }
				}
			}, false);
		})();
		// ============================================================================================ build_login_window
		function build_login_window () {
					
			var $win = document.createElement('div');
			$win.id = "student_login_window";
			$win.style.width = '90%';
			$win.style.height = '200px';
			$win.style.margin = '5% 2%';
			$win.style.overflown = 'auto';
			$win.style.boxShadow = 'inset 8px 8px 8px rgba(0,0,0,0.7)';
			$win.style.backgroundColor = '#DCDCDC';
			$win.style.color = 'black';
			$win.style.fontFamily = 'Comic Sans MS';
			$win.style.border = 'ridge 1px white';
			$win.style.borderRadius = '5px';
			$win.style.padding = '10px';
			$win.style.backgroundImage = 'url(/logos/step-logo.png)';
			$win.style.backgroundRepeat = 'no-repeat';
			$win.style.backgroundSize = '10%';
			$win.style.backgroundPosition = 'bottom right';
			parent_object.appendChild($win);
			var html = '';
			html += '<table width="100%" border="0" cellpadding="3">';
			html += '<caption class="module_name" style="text-align:right">Авторизация</caption>';
			html += '<tr><td width="40%">Группа:</td>';
			html += '<td width="60%"><input type="text" id="group_name" /></td></tr>';
			html += '<tr><td title="фамилия и имя, как записано в журнале (но без отчества)">Студент (фамилия и имя):</td>';
			html += '<td><input type="text" id="student_name" title="фамилия и имя, как записано в журнале (но без отчества)" /></td</tr>';
			html += '<tr><td title="Номер телефона, указанный для связи при зачислении в академию">Пароль:</td><td><input type="password" id="passw" title="Номер телефона, указанный для связи при зачислении в академию" /></td></tr>';
			html += '<tr><td></td><td><input type="button" value="Готово" id="log_but" style="text-align:right;" /></td></tr>';
			html += '</table>';
			html += '<p id="answer" class="gray"><br />Если возникли проблемы с доступом, сообщайте: garevna@mail.ru</p></div>';
			$win.innerHTML = html;
			// ------------------------------------------------------------------------------------------
			document.getElementById("log_but").onclick = function () {
				try {
					var garevna_login_worker = new Worker('/js/students_list.js');
					var group = document.getElementById("group_name");
					var student = document.getElementById("student_name");
					var password = document.getElementById("passw");
					garevna_login_worker.postMessage({ group:group.value,student:student.value,password:password.value });
					garevna_login_worker.addEventListener('message', function(e) {
						var $data = e.data;
						garevna_login_worker.terminate();
						garevna_login_worker = undefined;
						if ($data) {
							document.getElementById("answer").innerHTML = $data.msg;
							garevna_disciplines.access = ($data.msg !== "Группа не найдена")&&($data.msg !== "Нет прав доступа")&&($data.msg != "Неправильный пароль")&&($data.msg !== "Нет такого студента в этой группе");
							if (!garevna_disciplines.access) {
								document.getElementById("answer").style.color = 'red';
							}
							else {
								document.getElementById("answer").style.color = 'gray';
								$user = document.createElement('img');
								$user.src = '/images/feyerverk.gif';
								$user.style.position = 'absolute';
								$user.style.bottom = '0px';
								$user.style.right = '0px';
								$user.style.opacity = '0.0';
								$user.style.width = '0px';
								$user.style.height = '0px';
								var _parent = $win.parentNode;
								$win.parentNode.removeChild($win);
								_parent.appendChild($user);
								TweenLite.to($user, 1, {css:{ width: '300px', height: 'auto', opacity: '1.0'},
								      onComplete : function () {
										  //$user.src = 'http://www.mobilmusic.ru/mfile/cd/73/22/200781.gif';
										  //$user.src = 'http://animashky.ucoz.ru/_ph/8/300507010.gif';
										  $user.src = '/images/welcome.gif';
										  TweenLite.to($user,2,{css:{ opacity:'0.0' },delay:7});
										  $user = document.createElement('p');
										  $user.innerHTML = "Привет, " + student.value;
										  $user.style.position = 'absolute';
										  $user.style.bottom = '-5px';
										  $user.style.right = '10px';
										  $user.style.color = 'black';
										  $user.style.fontFamily = 'BetinaScriptC';
										  $user.style.fontSize = '15px';
										  _parent.appendChild($user);
									  }
								});
								getData(disciplines_data, parent_object);
							}
						}
						else {
							alert("Не удалось загрузить данные");
						}
					}, false);
				}
				catch (err) {
					console.log(err);
					alert("Пожалуйста, обновите браузер. К сожалению, в Вашем браузере полная функциональность невозможна");
				}
			}
		};
		// =============================================================================================== getData
		function getData ($data, context) {
			
			_data = (topic == 'it')?$data.computer:((topic == 'courseware')?$data.courseware:$data.economics);
			disciplines_area = document.createElement('div');
			disciplines_area.id = "garevna_disciplines";
			disciplines_area.style.marginLeft = "30px";
			
			parent_object.appendChild(disciplines_area);
			
			buildButtonsArea (_data, disciplines_area);
			
			disciplines_area.style.overflow = 'auto';
			
			commentLine = garevna_lib.createPanel ("garevna_disciplines_info", 'bottom');
			
			parent_object.appendChild(commentLine);
			disciplines_area.info_panel = commentLine;
			commentLine.style.paddingLeft = '30px';
			var img = document.createElement('img');
			parent_object.appendChild(img);
			img.style.position = 'absolute';
			img.style.bottom = '0';
			img.style.left = '0';
			img.src = _data.main_image;
			img.style.width = '30px';
			img.style.height = 'auto';
			
			disciplines_area.normal_button_size = '80px';
			disciplines_area.small_button_size = '80px';
			disciplines_area.small_buttons_container_size = '340px';
			
			parent_object.resize_callback = disciplines_resize;
			disciplines_resize ();
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
		function disciplines_resize () {
			
			var dim = garevna_lib.getParentObjectSize(parent_object);
			
			var w = dim.w * 0.8;
			var h = dim.h * 0.8;
			
			disciplines_area.style.width = w + 'px';
			disciplines_area.style.height = h + 'px';
			disciplines_area.style.marginLeft = dim.w*0.1 + 'px';
			var z = Math.min(w,h) - 30;
			disciplines_area.small_buttons_container_size = z + 'px';
			disciplines_area.small_button_size = Math.round(z/4.5) + 'px';
			
			var childs_elements = disciplines_area.childNodes;
			
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
			disciplines_area.normal_button_size = x + 'px';
			
			var i,j;
			for (i=0; i<childs_elements.length; i++) {
				
				childs_elements.item(i).resize();
			}
		}
}