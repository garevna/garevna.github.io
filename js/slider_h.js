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
	
function winResize()
{
		if ((win_w !== window.innerWidth)||(win_h !== window.innerHeight))
	    {
			win_w = window.innerWidth;
			win_h = window.innerHeight;
			var w = Math.round(window.innerWidth*dw) + 'px';
			var h = Math.round(window.innerHeight*dh) + 'px';
			x1 = Math.round(window.innerWidth*(1-dw)/2);
			x2 = x1 + w;
			alert(w + ' : ' + h + ' | ' + x1);
			document.getElementById("slider").style.width = w;
			document.getElementById("slider_away").style.width = w;
			document.getElementById("slider_come").style.width = w;
			document.getElementById("slider").style.height = Math.round(window.innerHeight*dh + 25) + 'px';
			document.getElementById("slider_away").style.height = h;
			document.getElementById("slider_come").style.height = h;
			document.getElementById("slider").style.left = x1 + 'px';
			document.getElementById("slider_away").style.left = x1 + 'px';
			document.getElementById("slider_come").style.left = x1 + 'px';
			var chld = document.getElementById("slider_away").childNodes;
			if (chld.length>0) { chld.item(0).style.width = w; chld.item(0).style.height = h; }
			chld = document.getElementById("slider_come").childNodes;
			if (chld.length>0) { chld.item(0).style.width = w; chld.item(0).style.height = h; }
			//document.getElementById("navi").style.top = h;
			//document.getElementById("navi").style.left = x1 + 'px';
	    }
}
function sliding(direction)
{
	var dir = (direction == 'left' || direction == 'Left' || direction == 1)?(1):(-1); // Направление сдвига слайдов
	var control_point = (dir == 1)?(slides.length):(0);
	var ctrl_1 = (dir > 0)&&(current_slide == slides.length-1);
	var ctrl_2 = (dir < 0)&&(current_slide == 0);
	if (ctrl_1 || ctrl_2) { return false; }
	var prev_slide = current_slide;
	current_slide = current_slide + dir;
	var vh = ' style="width:' + Math.round(window.innerWidth*dw) + 'px;';
	vh += ' height:' + Math.round(window.innerHeight*dh) + 'px;';
	vh += ' background-image:url(';
	var leaving = (dir > 0)?('away_to_left'):('away_to_right');
	var coming = (dir < 0)?('come_from_left'):('come_from_right');
    var html = '';
	html = '<div id="' + leaving + '"' + vh + slides[prev_slide]    + ');"></div>';
	document.getElementById('slider_away').innerHTML = html;
	html = '<div id="' + coming  + '"' + vh + slides[current_slide] + ');"></div>';
    document.getElementById('slider_come').innerHTML = html;
	//alert(coming);
	//document.getElementById(coming).style.marginLeft = x1 + 'px';
	init_spin();
}
// =============================================================================
function init_spin()
{
	var spin_html = '';
	for (var j=0; j<=current_slide; j++) { spin_html += '<spn2></spn2>'; }
	for (var j=current_slide+1; j<slides.length; j++) { spin_html += '<spn1></spn1>'; }
	document.getElementById("spins").innerHTML = spin_html;
}

function slider_h(sld,w,h,pos_x,poz_y)  //  Это функция инициализации сладера
{
	// параметр функции - массив ссылок на изображения-слайды 
	// (например, sld[0] = '/images/img1.png', sld[1] = '/images/img2.png' и т.д.)
    for (var j=0; j<sld.length; j++) { slides[j] = sld[j]; }
	if ((w<=90)&&(h<=95)) 
	{
		dw = w/100;
		dh = h/100;
	}
	else { dw = 0.8; dh = 0.9; }
	
    var html = '<div id="slider">';
	html += '<div id="slider_away"></div>';
	html += '<div id="slider_come"><div id="come_from_right"></div></div>';
	html += '<div id="navi"><span id="prev" onClick="sliding(-1);"></span>';
	html += '<span id="spins"></span><span id="next" onClick="sliding(1);"></span>';
	html += '</div><!-- navi -->';
	html += '</div><!-- slider -->';
	document.getElementsByTagName('body').item(0).insertAdjacentHTML("afterBegin",html);
    document.getElementById("come_from_right").style.backgroundImage = 'url(' + slides[0] + ')';
	init_spin();
    winResize();
}