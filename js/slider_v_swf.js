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
    var win_w = 0;
    var win_h = 0;
	var dw = 0;
	var dh = 0;
	var current_slide = 0;
	var slides = [];
	var x1=0; var x2=0;
	var slider_position = ['middle', 'center'];
	var ie = (navigator.appName.indexOf("Microsoft") != -1);
	
function winResize()
{
		if ((win_w !== window.innerWidth)||(win_h !== window.innerHeight))
	    {
			var flash = {};
			win_w = window.innerWidth;
			win_h = window.innerHeight;
			var w = Math.round(window.innerWidth*dw);
			var h = Math.round(window.innerHeight*dh);
			var x1 = Math.round(window.innerWidth*(1-dw)/2);
			document.getElementById("slider").style.width = w + 'px';
			document.getElementById("slider").style.height = (h + 25) + 'px';
			document.getElementById("slide").style.width = w + 'px';
			document.getElementById("slide").style.height = h + 'px';
			document.getElementById("slide_content").setAttribute('width', w);
			document.getElementById("slide_content").setAttribute('height', h);
			if (slider_position[1] === 'right')
			{
				document.getElementById("slider").style.right = 0;
				document.getElementById("navi").style.right = 0;
			}
			if (slider_position[1] === 'left')
			{
				document.getElementById("slider").style.left = 0;
				document.getElementById("navi").style.left = 0;
			}
			if (slider_position[1] === 'center') 
			{ 
			    document.getElementById("slide").style.left = x1 + 'px'; 
				document.getElementById("slide_content").style.left = x1 + 'px';
				document.getElementById("navi").style.left = x1 + 'px';
			}
	    }
		document.getElementById("slider").style.float = (slider_position[1] === 'center')?('none'):(slider_position[1]);
}
function sliding_swf(direction)
{
	document.getElementById('cover').className='none';
	//
	var flash = {};
	var dir = (direction == 'top' || direction == 'Top' || direction == 1)?(1):(-1); // Направление сдвига слайдов
	var control_point = (dir == 1)?(slides.length):(0);
	var ctrl_1 = (dir > 0)&&(current_slide == slides.length-1);
	var ctrl_2 = (dir < 0)&&(current_slide == 0);
	if (ctrl_1 || ctrl_2) { return false; }
	var prev_slide = current_slide;
	current_slide = current_slide + dir;
	var w = Math.round(window.innerWidth*dw);
	var h = Math.round(window.innerHeight*dh);
	var wh = ' style="width:' + w + 'px; height:' + h + 'px;">';
	document.getElementById('slide').innerHTML = build_slide(slides[current_slide],w,h,'***');
	init_spin();
	winResize();
	document.getElementById('cover').className='move';
	document.getElementById('cover').style.animationPlayState = "running";
}
function build_slide(slide,w,h,alter)
{
	
	var html = '';
	if (ie)
	{
		html = '<object id="slide_content" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w;
		html += '" height="' + h + '"><param name="movie" value="' + slide + '" /></object>';
	}
	else
	{
		html = '<object id="slide_content" type="application/x-shockwave-flash" data="' + slide;
		html += '" width="' + w + '" height="' + h + '"><div>' + alter + '</div></object>';
	}
	return html;
}
// =============================================================================
function init_spin()
{
	var spin_html = '';
	for (var j=0; j<=current_slide; j++) { spin_html += '<spn2></spn2>'; }
	for (var j=current_slide+1; j<slides.length; j++) { spin_html += '<spn1></spn1>'; }
	document.getElementById("spins").innerHTML = spin_html;
}

function slider_v_swf(sld,w,h,pos_x,pos_y)  //  Это функция инициализации сладера
{
	// параметр функции - массив ссылок на изображения-слайды 
	// (например, sld[0] = '/images/img1.png', sld[1] = '/images/img2.png' и т.д.)
    for (var j=0; j<sld.length; j++) { slides[j] = sld[j]; slider_position[0] = pos_y; slider_position[1] = pos_x; }
	if ((w<=90)&&(h<=95)) 
	{
		dw = w/100;
		dh = h/100;
	}
	else { dw = 0.8; dh = 0.9; }
	dw = (slider_position[1] === 'center')?(0.9):(dw);
    var html = '<div id="slider">';
	html += '<div id="slide"></div>';
	html += '<div id="cover" class="move"></div>';
	html += '<div id="navi"><span id="next" onClick="sliding_swf(-1);"></span>';
	html += '<span id="spins"></span><span id="prev" onClick="sliding_swf(1);"></span>';
	html += '</div><!-- navi -->';
	html += '</div><!-- slider -->';
	document.getElementsByTagName('body').item(0).insertAdjacentHTML("afterBegin",html);
    document.getElementById("slide").innerHTML = build_slide(slides[0],500,400,'***');
	document.getElementById("slider").style.float = (slider_position[1] === 'center')?('left'):(slider_position[1]);
	init_spin();
    winResize();
}
// ==================================================================================================================