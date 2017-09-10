// JavaScript Document
  //var src = [];
  var $items = [];
  $items[0] = {  //  GOOGLE PRESENTATIONS
	  type:'presentation',
	  pref:"https://docs.google.com/presentation/d/",
	  suf1:"/pub?start=true&loop=true&delayms=60000",
	  button_type:'google_slides'
  }
  $items[1] = {  //  IFRAME
	  type:'frame',
	  pref:'<iframe src="',
	  suf1:'" id="local_frame" width="100%" height="',
	  suf2:'px"></iframe>'
  }
  $items[2] = {  //  YOUTUBE
	  type:'video',
	  pref:"<object width='1364px' height='738px'><param name='movie' value='http://www.youtube.com/v/",
	  suf1:'?version=3&autoplay=1&loop=1&playlist=',
	  suf2:"'></param><embed src='http://www.youtube.com/v/",
	  suf3:"?version=3&autoplay=1&loop=1&playlist=",
	  suf4:"' type='application/x-shockwave-flash' width='100%' height='100%'></embed></object>",
	  button_type:'youtube'
  }
  $items[3] = {  // GOOGLE DRIVE (images)
	  type:'google_disk',
	  pref:"https://drive.google.com/folderview?id=",
	  suf1:'&usp=sharing',
	  button_type:'google_disk'
  }
  $items[4] = {	  type:'div'  }
  $items[5] = {  type:'window' }
  $items[6] = {  type:'function' }
  
  var folders = [];     //  Массив папок 
  var folder_states = [];
  var folder_forms = [];
  folder_states[0] = { status:'vsbl', lbl:'&#9650;&nbsp;&nbsp;', $display:'inherit'  }
  folder_states[1] = { status:'hddn', lbl:'&#9660;&nbsp;&nbsp;', $display:'none'  }
  folder_forms[0] = { status:'normal', lbl:'&nbsp;&nbsp;&oplus;', $img:'/buttons/menu_buttons.png' }
  folder_forms[1] = { status:'brief', lbl:'&nbsp;&nbsp;&#8801;', $img:'/buttons/menu-list.png' }
  var title = '';
// -----------------------------------------------------------------------------------------------
function show_src(typ,ref) // obj - $module.src[i]
{
   var $url = '';
   switch(typ) {
      case $items[0].type:
	      $url = $items[0].pref + ref + $items[0].suf1;
          window.open($url, '_blank')
          break;
      case $items[1].type:
          $url = $items[1].pref + ref + $items[1].suf1 + window.innerHeight + $items[1].suf2;
	      document.getElementById("scene").innerHTML = $url;
          break;
      case $items[2].type:
          $url  = $items[2].pref + ref + $items[2].suf1 + ref + $items[2].suf2;
	      $url += ref + $items[2].suf3 + ref + $items[2].suf4;
	      document.getElementById("scene").innerHTML = $url;
          break;
      case $items[3].type:
	      $url = $items[3].pref + ref + $items[3].suf1;
	      window.open($url, '_blank');
          break;
      case $items[4].type:
		  var c = obj.ref;
		  c.replace(/&lt;/g, '<');
		  c.replace(/&gt;/g, '>');
	      document.getElementById("scene").innerHTML = c;
          break
      case $items[5].type:
	      window.open(ref, '_blank');
	      break;
      case $items[6].type:
	      eval(obj.ref);
	      break;
	  default:   
   }
}
// ---------------------------------------------------------------------------------------------
function get_button_type(el_num)
{
	var s = 'none';
	for (var k = 0; k < $items.length; k++)
	{
		s = (this.src[el_num].type === $items[k].type)?($items[k].button_type):(s);
	}
	if (s === 'none') { alert('Не определен тип элемента меню:' + this.src[el_num].item_name); }
	else
	{ 
	   this.src[el_num].button_type = (s === undefined)?(this.src[el_num].button_type):(s);
	}
}
// ---------------------------------------------------------------------------------------------
function hide_panel()
{
	var h = (panel_hidden)?("&raquo;"):("&laquo;");
	panel_hidden = !panel_hidden;
	document.getElementById("work_panel").style.right = (panel_hidden)?("-280px"):("0");
	document.getElementById("panel-top").innerHTML = h + '&nbsp;&nbsp;' + title;
}
// ---------------------------------------------------------------------------------------------
function change_visibility(folder_num)
{
	folders[folder_num]._hidden = !folders[folder_num]._hidden;
	display_folder_content(folder_num);
	change_folder_head(folder_num);
}
function change_form(folder_num)
{
	var folder_id = 'folder' + folder_num;
	var block_id = folder_id + '_content';
	folders[folder_num]._brief = !folders[folder_num]._brief;
	document.getElementById(block_id).innerHTML = get_folder_content(folder_num);
	change_folder_head(folder_num);
}
// --------------------------------------------------------------------------------
//  Функция обновляет  полный html-код папки folder_num
// --------------------------------------------------------------------------------
function display_folder_content(folder_num)
{
	var folder_state = (folders[folder_num]._hidden)?(1):(0);
	var folder_id = 'folder' + folder_num;
	var block_id = folder_id + '_content';
	
	document.getElementById(block_id).style.display = folder_states[folder_state].$display;
	var $html = '<div>' + folders[folder_num]._name + folder_states[folder_state].lbl + '</div>';
	document.getElementById(folder_id).innerHTML = $html;
}
// ===========================================================================================
function build_panel_structure()
{
	var folder_num = -1;
	var _folder = { _name:'', _hidden:true, _content:[] };
	var _content = [];
	
	for (var j=0; j<this.src.length; j++)
	{
		this.get_button_type(j);
		folder_num = -1;
		for (var k = 0; k < folders.length; k++)
		{
			if (folders[k]._name === this.src[j].folder_name) { folder_num = k; break; }
		}
		if (folder_num === -1) // not found
		{
			var _folder = { _name:'', _hidden:false, _brief:false, _content:[] };
			_folder._name = this.src[j].folder_name;
			_folder._content[0] = j;
			folders.push(_folder);
		}
		else
		{
			var z = folders[folder_num]._content.length;
			folders[folder_num]._content[z] = j;
		}
	}
}

// ------------------------------------------------------------------------------------
function build_scene_html()
{
	//
	// Функция возвращает html-код страницы вместе с панелью меню
	//
	build_panel_structure();
	title = (this.menu_title === undefined)?(""):(this.menu_title);
	var $html = '<div id="container"><div class="flex-div"><div id="scene"></div>';
	$html += '<div class="work-panel" id="work_panel">';
	$html += '<div class="panel-top" id="panel-top" onClick="hide_panel()" title="Свернуть/Показать">';
	$html += '&raquo;&nbsp;&nbsp;' + title + '</div><!-- panel-top -->';
	for (var j=0; j < folders.length; j++) { $html += this.build_folder(j) }
	$html += '</div><!-- work-panel --></div>';
	$html += '</div><!-- scene --></div><!-- flex-div --></div><!-- container -->';
	return $html;
}
// --------------------------------------------------------------------------------
//  Функция возвращает полный html-код папки folder_num
// --------------------------------------------------------------------------------
function build_folder(folder_num)
{
	var folder_brief = (folders[folder_num]._brief)?(1):(0);   // 1 - buttons; 0 - list
	var folder_state = (folders[folder_num]._hidden)?(1):(0);  // 1 - hiddden; 0 - visible
	var $html = '<div class="panel-name" id="folder' + folder_num + '">';
	$html += '<span onClick="change_visibility(' + folder_num + ')" title="Свернуть/Показать">';
	$html += folder_states[folder_state].lbl + '</span>' + folders[folder_num]._name;
	$html += '<button class="folder_btn" style="background-image:url(' + folder_forms[folder_brief].$img + ');" ';
	$html += ' onClick="change_img(this); change_form(' + folder_num + ')" title="Кнопки/Список">';
	$html += '</button></div><!-- panel-name -->';
	$html += '<div id="folder' + folder_num + '_content">' + this.get_folder_content(folder_num);
	$html += '</div><!-- Конец блока контента -->';
	return $html;
}
function change_folder_head(folder_num)
{
	var folder_brief = (folders[folder_num]._brief)?(1):(0);   // 1 - buttons; 0 - list
	var folder_state = (folders[folder_num]._hidden)?(1):(0);  // 1 - hiddden; 0 - visible
	var folder_id = 'folder' + folder_num;
	$html = '<span onClick="change_visibility(' + folder_num + ')" title="Свернуть/Показать">';
	$html += folder_states[folder_state].lbl + '</span>' + folders[folder_num]._name;
	$html += '<button class="folder_btn" style="background-image:url(' + folder_forms[folder_brief].$img + ')";';
	$html += ' onClick="change_img(this); change_form(' + folder_num + ')" title="Кнопки/Список">';
	$html += '</button>';
	document.getElementById(folder_id).innerHTML = $html;
}
// --------------------------------------------------------------------------------
//  Функция возвращает html-код содержимого папки folder_num
// --------------------------------------------------------------------------------
function get_folder_content(folder_num)
{
	var $html = '';
	var $src_num = 0;
	var $brief = folders[folder_num]._brief;
	for (var i=0; i < folders[folder_num]._content.length; i++)
	{
		$src_num = folders[folder_num]._content[i];
		this.src[$src_num].h_text = (this.src[$src_num].h_text === undefined)?(this.src[$src_num].item_name):(this.src[$src_num].h_text);
		var t = "'" + this.src[$src_num].type + "'";
		var r = "'" + this.src[$src_num].ref + "'";
		var h = "'" + this.src[$src_num].h_text + "'";
		$html += ($brief)?('<span'):('<div');
		$html += ' class="work-panel-elem">';
		$html += '<button class="button_' + this.src[$src_num].button_type + '"';
		$html += ' onMouseOver="create_hlp(event,'+ h + ')"'; 
		$html += ' onMouseOut="remove_hlp()"';
		$html += ' onClick="show_src(' + t + ',' + r + ')"></button>&nbsp;&nbsp;';
		$html += ($brief)?(''):(this.src[$src_num].item_name);
		$html += ($brief)?('</span>'):('</div>') + '<!-- work-panel-elem -->';
	}
	return $html;
}
// ------------------------------------------------------------------------------------
//
//  Функция показа всплывающей подсказки (идентификатор объекта подсказки hlp_id) с текстом elem_text
//  Объект подсказки <div id="hlp" class="hlp"></div>
//
// ------------------------------------------------------------------------------------

function remove_hlp() { $("#hlp").remove(); }
// ------------------------------------------------------------------------------------	
function create_hlp(event, hlp_text)
{
	var x = (event.pageX)? (event.pageX - window.pageXOffset) : (event.clientX);
	var y = (event.pageY)? (event.pageY - window.pageYOffset) : (event.clientY);
	var hlp = document.createElement("div");
    hlp.id = "hlp";
    hlp.className = "hlp";
	hlp.style.position = "fixed";
	hlp.style.left = get_x(x) + "px";
	hlp.style.top = get_y(y) + "px";
	hlp.style.minWidth = "150px";
    var t = document.createTextNode(hlp_text);
    hlp.appendChild(t);
    document.body.appendChild(hlp);
}
// ------------------------------------------------------------------------------------
function get_x(x) { x = (x > window.innerWidth-150)?(x-150):(x); return x; }
function get_y(y) { y = (y > window.innerHeight-50)?(y-50):(y);  return y; }
function change_img(btn_obj)
{
	var img_old = btn_obj.style.backgroundImage;
	var btn_status = (img_old === folder_forms[0].$img)?(1):(0);
	btn_obj.style.backgroundImage = 'url(' + folder_forms[btn_status].$img + ')';
}
function html_icons()
{
	var $html = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="flex-div">';
    var c = '';
    for (var j=1; j<12; j++)
    {
        c = (j<10)?('0' + j):('' + j);
        $html += '<a href="../module-04/pictures/icon-' + c + '.png" download>';
        $html += '<img src="../module-04/pictures/icon-' + c + '.png" alt=""/></a>&nbsp;';
    }
    $html += '</div>';
	return $html;
}