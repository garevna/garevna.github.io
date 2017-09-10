// JavaScript Document


// Вставка HTML-строки (элемента)
// по щелчку мыши на элементе:
// to_URL.length > 0 - переходим по указанному URL
// в противном случае выполняем процедуру proc_name
function build_elem(type_ico, text_line, to_URL, proc_name, tag_id) 
{
	var icoURL = new Object();

        icoURL.lecture = 'http://garevna.ucoz.com/ICO/practice.png'; // Лекция
        icoURL.metod_mat = 'http://garevna.ucoz.com/ICO/professor.png'; // Учебно-методические материалы
        icoURL.tutorial = 'http://garevna.ucoz.com/ICO/books-button.png'; // Учебное пособие
        icoURL.monography = 'http://garevna.ucoz.com/ICO/PDF-Reader-Book.png'; // Монография (pdf)
        icoURL.flash = 'http://garevna.ucoz.com/ICO/adobe_flash.png'; // flash-ролик
        icoURL.video = 'http://garevna.ucoz.com/ICO/video-ico-1.png'; // Видео
        icoURL.paper = 'http://garevna.ucoz.com/ICO/document-1.png'; // Статья
        icoURL.paper_absent = 'http://garevna.ucoz.com/ICO/book-ico-1.png'; // Статья без просмотра
        icoURL.book_absent = 'http://garevna.ucoz.com/ICO/book-ico-2.png'; // Книга без просмотра
        icoURL.task = 'http://garevna.ucoz.com/ICO/task.png'; // Задача
        icoURL.scheme = 'http://garevna.ucoz.com/ICO/schemes.png'; // Схема
        icoURL.game = 'http://garevna.ucoz.com/ICO/interactive.png'; // Ролевая игра
        icoURL.ilo = 'http://garevna.ucoz.com/metod-mat/labor_economics/images/ilo-logo.png'; // Конвенции МОТ
        icoURL.pps = 'http://garevna.ucoz.com/ICO/powerPoint.png'; // PowerPoint
        icoURL.pdf = 'http://garevna.ucoz.com/ICO/pdf_ico.png'; // pdf

	var s = '<div class="dyn_elem" align="left"';
	var transfer = to_URL.length > 0;

	var s1 = ' onclick="'.concat(proc_name);
	s1 = s1.concat('"');

	s = (transfer)?(s):(s.concat(s1));
	s = s.concat('>');

	s1 = '<a href="';
	s1 = s1.concat(to_URL);
	s1 = s1.concat('">');

	s = (transfer)?(s.concat(s1)):(s);

    s1 = (type_ico.length == 0)?(''):('<img src="' + icoURL[type_ico] + '" height="20px">');
	s = s.concat(s1);
	s = s.concat(" ");

	s = s.concat(text_line);

	s1 = (transfer)?('</a>'):("");
	s = s.concat(s1);
	s = s.concat('</div>');

	insertionPoint = document.getElementById(tag_id);
	insertionPoint.insertAdjacentHTML('beforeend', s);
}
//
//  Функция показа всплывающей подсказки (идентификатор объекта подсказки hlp_id) с текстом elem_text
//  Объект подсказки <div id="hlp" class="hlp"></div>
//
function mouseOverHandler(event, elem_text, hlp_id){
    var x = (event.pageX)? event.pageX - window.pageXOffset : event.clientX;
    var y = (event.pageY)? event.pageY - window.pageYOffset : event.clientY;
    var help_obj = document.getElementById(hlp_id);
    help_obj.innerHTML = elem_text;
    x = (x + 10);
    y = (y + 10);
    help_obj.style.left = x + "px";
    help_obj.style.top = y + "px";
}
//  Функция скрывает всплывающую подсказку
function mouseOutHandler(event, hlp_id){
    var help_obj = document.getElementById(hlp_id);
    help_obj.style.top = "-200px";
    help_obj.style.left = "-200px";  
}