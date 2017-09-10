// ========================================================================================================
//                                        D I S C I P L I N E S
// ========================================================================================================

function DisciplinesList () {
		
		this.__parent__ = super ();   						// контекст вызова
		console.log ( 'super (): ', this.__parent__ );
		this.topic = this.__parent__.topic;
		this.disciplinesArea;
		this._data;
		this.commentLine;
		
		this.access = false;
		this.disciplinesData;
		
		// --------------------------------------------------------------------------------------------- loadData
		( function loadData () {
			
			this.__worker__ = new Worker ( this.workerURL );
			this.__worker__.postMessage ( this.dataURL );
			this.__worker__.controller = this;
			this.__worker__.addEventListener ('message', function ( event ) {
				var _controller = event.target.controller;
				if ( !event.data ) {
					alert ( "Извините, файл " + _controller.dataURL + " не обнаружен" );
				}
				else {
					_controller.disciplinesData = event.data;
					if ( topic == 'it' ) { _controller.buildLoginWindow (); }
					else { _controller.getData ( _controller.disciplinesData, _controller ); }
				}
			}, false);
		} )();
}
// =============================================================================================== getData
DisciplinesList.prototype.getData = function ( $data, context ) {
			
			_data = ( topic == 'it' ) ? $data.computer: (( topic == 'courseware' ) ? $data.courseware : $data.economics );
			this.disciplinesArea = document.createElement ( 'div' );
			// this.disciplinesArea.id = "garevna_disciplines";
			this.disciplinesArea.style.marginLeft = "30px";
			this.disciplinesArea.style.overflow = 'auto';
			
			this.__parent__.appendChild ( this.disciplinesArea );
			
			this.buildButtonsArea ( _data, this.disciplinesArea );
			
			
			
			this.commentLine = garevna_lib.createPanel ( "garevna_disciplines_info", 'bottom' );
			
			this.__parent__.appendChild ( commentLine );
			this.disciplinesArea.info_panel = commentLine;
			commentLine.style.paddingLeft = '30px';
			var img = document.createElement('img');
			parent_object.appendChild(img);
			img.style.position = 'absolute';
			img.style.bottom = '0';
			img.style.left = '0';
			img.src = _data.main_image;
			img.style.width = '30px';
			img.style.height = 'auto';
			
			this.disciplinesArea.normal_button_size = '80px';
			this.disciplinesArea.small_button_size = '80px';
			this.disciplinesArea.small_buttons_container_size = '340px';
			
			this.__parent__.resize_callback = this.__resize__;
			this.__resize__ ();
			
			this.buttonSet = new AnimatedButtonWithContent ( params );
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
DisciplinesList.prototype.workerURL = '/js/json_loader.js';
DisciplinesList.prototype.dataURL = '/data_files/disciplines.json';
// ========================================================================================== build login window
DisciplinesList.prototype.buildLoginWindow = function  () {
					
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
	
	parent_object.appendChild ( $win );
	
	this.groupLabel = document.createElement ( 'span' );
	this.groupLabel.innerHTML = "Группа: ";
	this.group = document.createElement ( 'input' );
	this.group.type = "text";
	this.group.style.width = "100px";
	this.nameLabel = document.createElement ( 'span' );
	this.nameLabel.innerHTML = ">Студент (фамилия и имя): ";
	this.name = document.createElement ( 'input' );
	this.name.type = "text";
	this.name.placeholder = "фамилия и имя, как записано в журнале (но без отчества)";
	this.name.style.width = "250px";
	this.passwordLabel = document.createElement ( 'span' );
	this.passwordLabel.innerHTML = ">Пароль: ";
	this.password = document.createElement ( 'input' );
	this.password.type = "password";
	this.password.title = "Номер телефона, указанный при зачислении в академию";
	this.password.style.width = "100px";
	
	
	
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
	html += '<p id="answer" class="gray"><br />Если возникли проблемы с доступом, сообщайте: irina.h.fylyppova@gmail.com</p></div>';
	$win.innerHTML = html;
	// ------------------------------------------------------------------------------------------
	document.getElementById("log_but").onclick = function () {
		try {
			this.loginWorker = new Worker ( '/js/students_list.js' );
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
					} else {
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
						TweenLite.to($user, 1, { css: { width: '300px', height: 'auto', opacity: '1.0'},
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
				} else { alert("Не удалось загрузить данные"); }
			}, false);
		} catch (err) {
			console.log(err);
			alert("Пожалуйста, обновите браузер. К сожалению, в Вашем браузере полная функциональность невозможна");
		}
	}
};