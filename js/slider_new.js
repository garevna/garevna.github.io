//                    Slider
// ===========================================
//    Copyright Филиппова Ирина Гариевна 2016
//    Copyright Филиппова Ірина Гаріївна 2016
//    Copyright Irina H. Fylyppova  2016
// ===========================================
// =============================================================================================
//     Для нормальной работы слайдера необходимо подключить скрипты и стили:
//     <link rel="stylesheet" href="/css/slider.css">
//     <script src="/js/slider.js">(закрывающий тег /script обязателен, здесь вставить не могу)
//     а так же (!!!) вставить следующий script перед закрывающим тегом </head>:
// =============================================================================================
//
//    if (window.addEventListener) {              
//        window.addEventListener("resize", winResize);
//        window.addEventListener("load", winResize);
//    } else if (window.attachEvent) {                 
//        window.attachEvent("onresize", winResize);
//        window.attachEvent("onload", winResize);
//    }
// 
// =============================================================================================
var mainScene = {
	slides:[],
	slider:{},
	current_slide:0,
	listParams: { containerId:"scene", w:100, h:100, video:false, frame:false },
	createSlider: (function()
	{
		var slider = document.createElement('main');
		document.getElementsByTagName('body').item(0).appendChild(slider);
		slider.id = "slider";
		var json_container = document.createElement('div');
		document.getElementsByTagName('body').item(0).appendChild(json_container);
		json_container.id = "json_container";
	})(),
	// ---------------------------------------------------------------------------------------------------- loadData
	loadData: (function() {
		if (window.XMLHttpRequest) { requestJSON = new XMLHttpRequest(); }
		else { requestJSON = new ActiveXObject("Microsoft.XMLHTTP"); }
		requestJSON.onreadystatechange = function() {
		  if (requestJSON.readyState == 4 && requestJSON.status == 200) {
			  mainScene.slides = JSON.parse(requestJSON.responseText);
			  // mainScene.proportion = $data.proportion || 1.85;
			  var sld;
			  for (var j=0; j<mainScene.slides.length; j++) {
				  sld = document.createElement('div');
				  mainScene.slider.appendChild(sld);
				  mainScene.slides[j].obj = sld;
				  mainScene.slides[j].proportion = mainScene.slides[j].proportion || 1.85;
				  sld.style.position = 'absolute';
				  sld.style.left = (window.innerWidth + 100) + 'px';
				  // sld.style.marginLeft = (window.innerWidth + 100) + 'px';
				  sld.style.width = (window.innerWidth*0.8);
				  sld.style.height = Math.min(window.innerHeight*0.8, sld.style.width*mainScene.slides[j].proportion);
				  sld.style.top = (window.innerHeight - sld.style.height)/2 + 'px';
				  sld.style.width += 'px';
				  sld.style.height += 'px';
				  sld.style.opacity = 0;
				  if (mainScene.slides[j].type == 'swf') {
					  sld.innerHTML = mainScene.build_swf(mainScene.slides[j].content,sld.style.width,sld.style.height,'Ваш браузер не поддерживает flash');
				  }
			  }
			  document.getElementsByTagName('title').item(0).innerHTML = $data._title.eng;
			  var meta = document.getElementsByTagName("meta");
			  for (var j=0; j < meta.length; j++) {
				  if (meta.item(j).name == "description") { meta.item(j).content =  $data._description; }
				  if (meta.item(j).name == "keywords") { meta.item(j).content =  $data._keywords; }
			  }
		  }
		  else { 
			  if (requestJSON.status == 404 && requestJSON.readyState == 4) { alert("Извините, файл не обнаружен"); return }
		  }
      }
      requestJSON.open("GET", '/wp_study/slides.json', true);
      requestJSON.send();
	})(),
	// ==================================================================================================
	buildNaviPanel: function () {
		var $navi = document.createElement('div');
		mainScene.slider.appendChild($navi);
		$navi.id = 'navi';
		var $prev = document.createElement('span');
		$navi.appendChild($prev);
		$prev.id = 'prev';
		$prev.innerHTML = '&#9664;';
		$prev.onclick = function() {
			if (mainScene.current_slide == 0) {
				return;
			}
			var $obj = mainScene.slides[mainScene.current_slide].obj;
			TweenLite.to($obj, 1.5, { right:"0", opacity:"0", paddingRight:"-110%" });
			mainScene.current_slide--;
			$obj = mainScene.slides[mainScene.current_slide].obj;
			TweenLite.to($obj, 1.5, { left:"0", opacity:"1", paddingLeft:"10%" });
			this.setAttibute('title',(mainScene.current_slide == 0)?'Это самый первый слайд':'Предыдущий');
		}
		var $spins = document.createElement('span');
		$navi.appendChild($spins);
		$spins.id = 'spins';
		mainScene.init_spin();
		var $next = document.createElement('span');
		$navi.appendChild($next);
		$next.onclick = function() {
			if (mainScene.current_slide == mainScene.slides.length-1) {
				return;
			}
			var $obj = mainScene.slides[mainScene.current_slide].obj;
			TweenLite.to($obj, 1.5, { left:"0", opacity:"0", paddingLeft:"-110%" });
			mainScene.current_slide++;
			$obj = mainScene.slides[mainScene.current_slide].obj;
			TweenLite.to($obj, 1.5, { left:"0", opacity:"1", paddingLeft:"10%" });
			this.setAttibute('title',(mainScene.current_slide==mainScene.slides.length-1)?'Это последний слайд':'Следующий');
		}
		$prev.id = 'next';
		$prev.innerHTML = '&#9654;';
		
	},
	init_spin: (function () {
		var spin_html = '';
		for (var j=0; j <= mainScene.current_slide; j++) {
			spin_html += '&#9898;';
		}
		for (var j=current_slide+1; j<mainScene.slides.length; j++) {
			spin_html += '&#9899;';
		}
		document.getElementById("spins").innerHTML = spin_html;
	})(),
	// ================================================================================================== browserResize
	browserResize: function () {
		
		if (!mainScene.listParams) {
			alert('There is no property listParams of object ' + mainScene.tagName); return false; 
		}
		mainScene.listParams.containerId = mainScene.listParams.containerId || "local_frame";
		// проверка на существование контейнера
		if (!document.getElementById(mainScene.listParams.containerId)) {
			alert('Resizing container does not exist');
			return false;
		}
		
		mainScene.listParams.w = mainScene.listParams.w || 100;
		mainScene.listParams.h = mainScene.listParams.h || 100;
		
		var _width = window.innerWidth - mainScene.listParams.w;
		var _height = window.innerHeight - mainScene.listParams.h;
		var _margin = Math.round(mainScene.listParams.w/2);
		
		if (mainScene.listParams.video)
		{
			_height = Math.min(_height, (_width * 9/16));
			_width = _height * 16/9;
			_margin = Math.round((window.innerWidth - _width)/2);
		}
		document.getElementById(mainScene.listParams.containerId).style.width = _width + 'px';
		document.getElementById(mainScene.listParams.containerId).style.marginLeft = _margin + 'px';
		document.getElementById(mainScene.listParams.containerId).style.height = _height + 'px';
		document.getElementById(mainScene.listParams.containerId).style.marginBottom = mainScene.listParams.h + 'px';
	},
	// =============================================================================================== build_swf
	build_swf: function (slide,_width,_height,alter) {
		var html = '';
		if (ie) {
			html = '<object id="slide_content" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + _width;
			html += '" height="' + _height + '"><param name="movie" value="' + slide + '" /></object>';
		}
		else {
			html = '<object id="slide_content" type="application/x-shockwave-flash" data="' + slide;
			html += '" width="' + _width + '" height="' + _height + '"><div>' + alter + '</div></object>';
		}
		return html;
	}
}
// ==================================================================================================================