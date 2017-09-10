// ==============================================================
//                       Courseware html & CSS
//                            module 01
// ==============================================================
var garevna_html_01 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	// ===================================================================================================== selectors
	func['doctype'] = function(parent_node) {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Структура html-документа</wht>');
		var html = '';
		html += '<h2>Декларация &lt;!DOCTYPE html&gt;</h2>';
		html += '<h3>!DOCTYPE - самая первая декларация перед тегом &lt;html&gt; </h3>';	
		html += '<p>С этой декларации должна начинаться каждая веб-страница<br>';	
		html += 'Это не тег, а информационное сообщение браузеру о языке разметки страницы</p>';
		html += '<h3 class="green">HTML5</h3><p class="dark_gray">&lt;!DOCTYPE html&gt;</p>';
		html += '<h3 class="green">HTML 4.01 Strict</h3><p class="gray">';
		html += '&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"&gt;</p>';
		html += '<p>Это &quot;усеченный&quot; вариант HTML 4.01, где не поддерживаются фреймы и существует ряд других ограничений</p>';
		html += '<h3 class="green">HTML 4.01 Transitional</h3><p class="gray">';
		html += '&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;</p>';
		html += '<p>В этом варианте HTML 4.01 также не поддерживаются фреймы, но поддерживаются другие устаревшие элементы языка разметки</p>';
		html += '<h3 class="green">HTML 4.01 Frameset</h3><p class="gray">';
		html += '&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd"&gt;</p>';
		html += '<p>Здесь уже осуществлена поддержка фреймов</p>';
		html += '';
		document.getElementById('garevna_browser_win').innerHTML = html;
		document.getElementById('garevna_browser_win').style.backgroundColor = "#ccd";
		document.getElementById('garevna_browser_win').style.backgroundImage = "none";
	};
	// ======================================================================================================= home_work
	func['homework'] = function(parent_node) {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<h1>Задание на дом</h1>');
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = '#dde';
		
		var html = '';
        html += '<h2>1. html-документ</h2>';
        html += '<h3>Структура html-страницы</h3>';
		
        html += '<p>Создайте структуру своей первой html-страницы, вставив необходимые теги</p>';
        html += '<h3>Контент</h3>';
        html += '<p>Вставьте в страницу текст, описывающий, что такое гипертекст, и что такое протокол http</p>';
        html += '<h3>Заголовки</h3>';
		html += '<p>Создайте элементы-заголовки для своего текста</p>';
        html += '<h2>2. Форматирование html</h2>';
        html += '<h3>Стили элементов</h3>';
        html += '<p>Создайте стили для html-элементов своей страницы, используя аттрибуты font-size, color, font-weight, background-color</p>';
        html += '<h3>Классы</h3>';
        html += '<p>Создайте классы стилей и оформите html-элементы своей страницы с их помощью</p>';
        html += '<h3>Ведорные префиксы</h3>';
        html += '<p>Создайте класс с тенью блока и класс с тенью текста, используя вендорные префиксы для различных браузеров</p>';
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	return function() {
			return func[func_name]();
	}
}