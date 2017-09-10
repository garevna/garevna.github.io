function load_students_data() {
	if (XMLHttpRequest) {
		var requestVar = new XMLHttpRequest();
	}
	else {
		var requestVar = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return requestVar;
};


this.addEventListener('message', function(e) {
	
	var $request = load_students_data();
	
	var _msg = '404';
	
	var _group = e.data.group;
	var _student = e.data.student;
	var _password = e.data.password;
	$request.onreadystatechange = function() {
		if ($request.readyState == 4 && $request.status == 200) {
			
			var $data = JSON.parse($request.responseText);
			if ((_group == $data.admin_group) && (_student == $data.admin_name) && (_password == $data.admin_password)) {
				postMessage({msg:'admin'});
			}
			
			for (var j = 0; j<$data.groups.length; j++) {
				console.log($data.groups[j].group_number);
				if (_group == $data.groups[j].group_number) {
					for (var i=0; i<$data.groups[j].students.length; i++) {
						if (_student == $data.groups[j].students[i].name)	{
							if ($data.groups[j].students[i].access == "no") {
								postMessage({msg:"Нет прав доступа"});
							}
							else {
								if (_password == $data.groups[j].students[i].password) {
									postMessage({msg:$data.groups[j].disciplines});
								}
								else {
									postMessage({msg:"Неправильный пароль"});
								}
							}
						}
					}
					postMessage({msg:"Нет такого студента в этой группе"});
				}
			}
			postMessage({msg:"Группа не найдена"});
		}
		else if ($request.status == 404 && $request.readyState == 4) {
			postMessage({msg:"Ошибка доступа к данным"});
		}
	}
	$request.open("GET", '/data_files/students.json', false);
	$request.send();
	
}, false);
