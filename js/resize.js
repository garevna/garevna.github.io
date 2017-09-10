//                                JavaScript Document
//         Функции: browserResize, inlineSize, change_menu,
//             $mouseOut, $mouseOver, change_size, clip_obj,
//                         $get_hash, get_page_height()
//
// -----------------------------------------------------------------------------------------------------------
//                      Обработчик события изменения размеров окна браузера
//                    listParams.containerId - id масштабируемого контейнера 
//       listParams.w, listParams.h - отступы для контейнера containerId по ширине и высоте
//                         listParams.menuId - id меню-трансформера 
//                     listParams.cond - условие для переключения класса меню menuId
//                       listParams.css1 - класс меню, если listParams.cond = true
//                       listParams.css2 - класс меню, если listParams.cond = false
// -----------------------------------------------------------------------------------------------------------
function browserResize()
{
	// default values
	if (!this.listParams) { alert('There is no property listParams of object ' + this.innerHTML); return }
	this.listParams.containerId = this.listParams.containerId || "local_frame";
	this.listParams.w = this.listParams.w || 100;
	this.listParams.h = this.listParams.h || 100;
	// проверка на существование контейнера
	if (document.getElementById(this.listParams.containerId) != null)
	{
		// container resizing
        document.getElementById(this.listParams.containerId).style.width = (window.innerWidth - this.listParams.w) + 'px';
        document.getElementById(this.listParams.containerId).style.height = (window.innerHeight - this.listParams.h) + 'px';
		if (this.listParams.video)
		{
			var $width = (this.listParams.videoWidth === undefined)?(window.innerWidth - this.listParams.w):(this.listParams.videoWidth);
			var $height = (this.listParams.videoHeigh === undefined)?($width * 9 / 16):(this.listParams.videoHeigh);
			$height = Math.min(window.innerHeight - this.listParams.h, $height);
			$width = $height * 16 / 9;
			var test_width = ($width > window.innerWidth - this.listParams.w);
			var test_height = ($height > window.innerHeight - this.listParams.h);
			if (test_width) { $width = window.innerWidth - this.listParams.w; $height = $width * 9 / 16; }
			if (test_height) { $height = window.innerHeight - this.listParams.h; $width = $height * 16 / 9; }
			document.getElementById(this.listParams.containerId).style.height = $height + 'px';
			document.getElementById(this.listParams.containerId).style.width = $width + 'px';
			document.getElementById(this.listParams.containerId).style.marginBottom = '70px';
		}
		if (this.listParams.frame)
		{
			var frameId = this.listParams.frameId || "local_frame";
			var frameObj = document.getElementById(frameId);
			frameObj.style.width = (window.innerWidth - this.listParams.w) + 'px';
			frameObj.style.height = (window.innerHeight - this.listParams.h) + 'px';
			document.getElementById("local_frame").height = document.getElementById("local_frame").contentWindow.document.body.scrollHeight+4+'px';
		}
		if (document.getElementById("css-panel"))
		{
			cssPanelHeight = document.getElementById("css-panel").getBoundingClientRect().bottom - document.getElementById("css-panel").getBoundingClientRect().top;
		}
		if (document.getElementById("html-panel"))
		{
			htmlPanelHeight = document.getElementById("html-panel").getBoundingClientRect().bottom - document.getElementById("html-panel").getBoundingClientRect().top;
		}
	}
}
// --------------------------------------------------------------------------
// Функция сворачивания / развертывания панели с идентификатором panel_id
// turner_id - идентификатор переключателя панели
// turner_value - текущее значение переключателя:
// turner_value = 0 - панель развернута (высота панели auto)
// turner_value = 1 - панель свернута (высота панели равна 30px)
// Возвращает новое состояние панели (0 или 1)
// ---------------------------------------------------------------------------
function panel_state(panel_id, turner_id, turner_value)
{
	var panel_states = [];
	panel_states[0] = { lbl:'&#9650;&nbsp;&nbsp;', $height:'auto', $title:'Свернуть'  } // turn on
	panel_states[1] = { lbl:'&#9660;&nbsp;&nbsp;', $height:'30px', $title:'Развернуть'  } // turn off
	
	document.getElementById(turner_id).innerHTML=panel_states[turner_value].lbl;
	var panel_state = (turner_value == 0)?(1):(0); // переключаем состояние панели
	css_attr(panel_id, "height", panel_states[panel_state].$height);
	html_attr(turner_id, "title", panel_states[panel_state].$title);
	return panel_state;
}

// ---------------------------------------------------------------------------------------------------------
//                                 Измерение длины строки текста в пикселях
// ---------------------------------------------------------------------------------------------------------
  function inlineSize(el)
  {
        var hiddenStyle = "left:-10000px;top:-10000px;height:auto;width:auto;position:absolute;";
        var clone = document.createElement('div');
        for (var i in el.style)
        {
                try
                {
                        if ((el.style[i] != '') && (el.style[i].indexOf(":") > 0))
                        {
                                clone.style[i] = el.style[i];
                        }
                } catch (e) {}
        }
        document.all ? clone.style.setAttribute('cssText', hiddenStyle) : clone.setAttribute('style', hiddenStyle);
        clone.innerHTML = el.innerHTML;
        parent.document.body.appendChild(clone);
        var rect = {width:clone.clientWidth,height:clone.clientHeight};
        parent.document.body.removeChild(clone);
        return rect;
  }
// --------------------------------------------------------------------------------------
//     Переключение меню-трансформера с горизонтального на вертикальное
//                        при изменении размеров окна браузера
//                         menu_obj - объект меню-трансформер
//                                     $width - ширина окна
//     в объекте $len должна хранится длина и высота строки меню в пикселях
//                                     ($len.width и $len.height)
//                    в объекте $maxLen должна хранится длина и высота 
//                          самого длинного элемента меню в пикселях
//                                  ($maxLen.width и $maxLen.height)
// --------------------------------------------------------------------------------------
function change_menu(menu_obj, $width)
  {
	  $width = $width*1;
	  $len.width = $len.width*1;
	  if ($width > $len.width)
	  {
		  menu_obj.className = "menu_panel menu_row";
		  menu_obj.style.height = ($len.height + 10) + 'px';
		  menu_obj.style.width = '100%';
	  }
	  else
	  {
		  menu_obj.className = "menu_panel menu_col";
		  menu_obj.style.height = (($len.height + 10) * product_menu.length) + 'px';
		  menu_obj.top = -(menu_obj.style.height*0.9) + 'px';
		  menu_obj.style.width = ($maxLen.width + 50) + 'px';
	  }
  }
// -----------------------------------------------------------------------
//         Методы объекта меню-трансформер (панель справа)
// -----------------------------------------------------------------------
  function $mouseOut()
  {
	  this.style.right = (-($maxLen.width + 50)*0.95) + 'px';
  }
  function $mouseOver($obj)
  {
	  this.style.right = '0';
  }
// -----------------------------------------------------------------------------------------
//         Подгонка высоты $frame под высоту загруженного в него документа
//           условие: это должен быть первый (0) или единственный iframe!!!
//          в противном случае нужно передавать параметром номер фрейма
// -----------------------------------------------------------------------------------------
function $get_hash(frameId)
{
	var $hash = frames[0].location.hash;
	if ($hash) { document.getElementById(frameId).height = $hash + 'px'; }
}
// -----------------------------------------------------------------------------------------
function $set_hash()
{
      var pageHeight = Math.max( document.body.scrollHeight, document.documentElement.scrollHeight,
                                 document.body.offsetHeight, document.documentElement.offsetHeight,
                                 document.body.clientHeight, document.documentElement.clientHeight);
      window.location.hash = "#" + pageHeight;
}
// -----------------------------------------------------------------------------------------
//            Построение объекта меню menu_obj из массива menu_arr
// -----------------------------------------------------------------------------------------
  function show_menu(menu_obj, menu_arr, $class)
  {
		var html_line = '';
		for (j = 0; j < menu_arr.length; j++)
		{
			html_line += '<div class="' + $class + '" onclick="get_content(' + j + ')">';
			html_line += menu_arr[j] + '</div>';
		}
		menu_obj.insertAdjacentHTML('beforeEnd', html_line);
  }

// ------------------------------------------------------------------------------------------------------------------------
function get_menu_params($class_name)
{
		var mass = document.getElementsByClassName($class_name);
		var $max_elem_width = 0;
		var $full_width = 40;
		var $full_height = 0;
		for (var j = 0; j< mass.length; j++)
		{
			$max_elem_width = ($max_elem_width>inlineSize(mass[j]).width)?($max_elem_width):(inlineSize(mass[j]).width);
			$full_width = $full_width + inlineSize(mass[j]).width + 20;
			$full_height += inlineSize(mass[j]).height*2;
		}
		// alert('row width: ' + $full_width + '  column height: ' + $full_height);
		css_code = createStyleText($max_elem_width);
		var params = { max_width:$max_elem_width, full_width:$full_width, full_height:$full_height };
		createStyle(createStyleText($max_elem_width));
		return params;
}
// -----------------------------------------------------
function createStyleText(v) {
	var $ret = ".menu_col { top:0; right:-" + (v - 20) + "px; }";
	return $ret
}
// -----------------------------------------------------------
function createStyle($text) {
	var css = $text,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) { style.styleSheet.cssText = css; } 
	else { style.appendChild(document.createTextNode(css)); }

    head.appendChild(style);
}
// ---------------------------------------------------------------------------
function change_content(i, frameId, srcURI, targetWindow)
{
        document.getElementById("main_frame").setAttribute('scrolling', "yes");
		document.getElementById("main_frame").setAttribute('overflow', "auto");
		var $target = (targetWindow == undefined)?(target_window[i]):(targetWindow[i]);
		var $src = (srcURI == undefined)?(src_url[i]):(srcURI[i]);
		var $frame = (frameId == undefined)?("local_frame"):(frameId);
        if ($target=="iframe")
        {
            document.getElementById($frame).src = $src;
        }
        else
        {
            window.open(src_url[i], $target);
        }
}