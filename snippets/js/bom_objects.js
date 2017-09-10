// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
// parent_object.data - массив объектов формата { name:'', sample:'', help:'' }

// ========================================================================================== garevna_window_methods
function garevna_window_methods () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = '/Javascript/img/methods-1.png';
	parent_object.picture_title = 'Методы объекта window';
	
	parent_object.main_head = { abbr: 'BOM', text: 'Browser Object Model' };
	
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	var _win = null;
	parent_object.data[0] = {
		name: 'window.open',
		sample: '_win = window.open("", "_blank", "width=400, height=400, top=50, left=400");',
		help: 'Открыть новое пустое окно'
	};
	parent_object.data[1] = {
		name: 'window.blur',
		sample: '_win.blur();',
		help: 'Сделать окно неактивным'
	};
	parent_object.data[2] = {
		name: 'window.focus',
		sample: '_win.focus();',
		help: 'Сделать окно активным'
	};
	parent_object.data[3] = {
		name: 'window.document.write',
		sample: '_win.document.write("Это новое окно. В нем есть пустой документ. В него мы поместим этот текст<br/>"); _win.focus();',
		help: 'Вставить текст в документ окна'
	};
	parent_object.data[4] = {
		name: 'window.moveBy',
		sample: '_win.moveBy(100, 100); _win.focus();',
		help: 'Сместить окно на заданное расстояние относительно текущей позиции'
	};
	parent_object.data[5] = {
		name: 'window.moveTo',
		sample: '_win.moveTo(300, 300); _win.focus();',
		help: 'Сместить окно в заданную позицию'
	};
	parent_object.data[6] = {
		name: 'window.resizeTo',
		sample: '_win.resizeTo(500, 500); _win.focus();',
		help: 'Установить новый размер окна'
	};
	parent_object.data[7] = {
		name: 'window.resizeBy',
		sample: '_win.resizeBy(-50, -50); _win.focus();',
		help: 'Изменить размер окна на заданную величину относительно текущего размера'
	};
	parent_object.data[8] = {
		name: 'window.scrollBy',
		sample: '_win.scrollBy(0, 10);  _win.focus();',
		help: 'Прокрутка содержимого окна на заданную величину'
	};
	parent_object.data[9] = {
		name: 'window.scrollTo',
		sample: '_win.scrollTo(0, 100); _win.focus();',
		help: 'Прокрутка содержимого окна до заданной позиции'
	};
	parent_object.data[10] = {
		name: 'window.close',
		sample: '_win.close();',
		help: 'Закрыть окно: _win.close();'
	};
	create_article_content (parent_object);
}
// ========================================================================================== garevna_navigator
function garevna_navigator () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = '/Javascript/img/navigator-1.png';
	parent_object.picture_title = 'Свойства объекта navigator';
	
	parent_object.main_head = { abbr: 'BOM', text: 'Browser Object Model' };
	
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'navigator.cookieEnabled',
		sample: 'console.info ( navigator.cookieEnabled );',
		help: 'Разрешены ли в браузере клиента куки'
	};
	parent_object.data[1] = {
		name: 'navigator.appName',
		sample: 'console.info ( navigator.appName );',
		help: 'Имя приложения. Для браузеров IE11, Chrome, Firefox и Safari имя приложения будет Netscape'
	};
	parent_object.data[2] = {
		name: 'navigator.appCodeName',
		sample: 'console.info ( navigator.appCodeName );',
		help: 'Кодовое имя приложения. Для браузеров Chrome, Firefox, IE, Safari и Opera имя приложения будет Mozilla'
	};
	parent_object.data[3] = {
		name: 'navigator.product',
		sample: 'console.info ( navigator.product );',
		help: 'Ядро браузера'
	};
	parent_object.data[4] = {
		name: 'navigator.appVersion',
		sample: 'console.info ( navigator.appVersion );',
		help: 'Версия браузера'
	};
	parent_object.data[5] = {
		name: 'navigator.userAgent',
		sample: 'console.info ( navigator.userAgent );',
		help: 'Программное обеспечение браузера'
	};
	parent_object.data[6] = {
		name: 'navigator.platform',
		sample: 'console.info ( navigator.platform );',
		help: 'Операционная система'
	};
	parent_object.data[7] = {
		name: 'navigator.language',
		sample: 'console.info ( navigator.language );',
		help: 'Язык версии браузера'
	};
	create_article_content (parent_object);
}
// ========================================================================================== garevna_location
function garevna_location () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = '/Javascript/img/location.png';
	parent_object.picture_title = 'Свойства объекта location';
	
	parent_object.main_head = { abbr: 'BOM', text: 'Browser Object Model' };
	
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'location',
		sample: 'alert ("Смотри в консоли"); console.log ( location );',
		help: 'Объект location'
	};
	parent_object.data[1] = {
		name: 'location.href',
		sample: 'alert ( "URL текущей страницы: " + location.href );',
		help: 'Свойство: URL текущей страницы'
	};
	parent_object.data[2] = {
		name: 'location.hostname',
		sample: 'alert ( "Имя хоста: " + location.hostname );',
		help: 'Свойство: Имя хоста (и порт, если не 80) текущего URL-адреса'
	};
	parent_object.data[3] = {
		name: 'location.pathname',
		sample: 'alert ( "Путь текущего URL-адреса" + location.pathname );',
		help: 'Свойство: Путь (без хоста, параметров и хеша) текущего URL-адреса'
	};
	parent_object.data[4] = {
		name: 'location.protocol',
		sample: 'alert ( "Протокол: " + location.protocol );',
		help: 'Свойство: Протокол текущего URL-адреса'
	};
	parent_object.data[5] = {
		name: 'location.hash',
		sample: 'alert ( "Хеш-часть URL: " + location.hash );',
		help: 'Свойство: Часть URL текущей страницы после знака #'
	};
	parent_object.data[6] = {
		name: 'location.assign',
		sample: 'var $win = window.open("", "_blank"); var _url = prompt("Окно открыто в новой вкладке. Укажите URL ресурса, который хотите открыть", "https://translate.google.com/"); $win.location.assign(_url);',
		help: 'Метод: Загрузка документа'
	};
	parent_object.data[7] = {
		name: 'location.replace',
		sample: 'var $win = window.open("https://translate.google.com/", "_blank"); var _url = prompt("Окно открыто в новой вкладке. В нем загружен ресурс https://translate.google.com/. Укажите URL нового ресурса, который хотите открыть в этом окне", "https://www.w3schools.com"); $win.location.replace(_url);',
		help: 'Метод: Заменить документ'
	};
	parent_object.data[8] = {
		name: 'location.reload',
		sample: 'var $win = window.open("https://www.w3schools.com", "_blank", "width=400, height=400"); $win.focus(); $win.location.reload();',
		help: 'Метод: Перезагрузка'
	};
	parent_object.data[9] = {
		name: 'location.search',
		sample: 'alert("Часть адресной строки, содержащая тело запроса: " + location.search );',
		help: 'Свойство: Запрос в адресной строке (часть строки, содержащая тело запроса)'
	};
	create_article_content (parent_object);
}
// ========================================================================================== garevna_screen
function garevna_screen () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = '/Javascript/img/screen-2.gif';
	parent_object.picture_title = 'Свойства объекта screen';
	
	parent_object.main_head = { abbr: 'BOM', text: 'Browser Object Model' };
	
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'screen.availHeight',
		sample: 'alert ("Доступная высота экрана (без панели задач Windows): " + screen.availHeight );',
		help: 'Свойство: Доступная высота'
	};
	parent_object.data[1] = {
		name: 'screen.availWidth',
		sample: 'alert ( "Доступная ширина экрана (без панели задач Windows): " + screen.availWidth );',
		help: 'Свойство: Доступная ширина'
	};
	parent_object.data[2] = {
		name: 'screen.width',
		sample: 'alert ( "Полная ширина экрана: " + screen.width );',
		help: 'Свойство: Полная ширина экрана'
	};
	parent_object.data[3] = {
		name: 'screen.heigth',
		sample: 'alert ( "Полная высота экрана: " + screen.height );',
		help: 'Свойство: Полная высота экрана'
	};
	create_article_content (parent_object);
}
// ========================================================================================== garevna_history
function garevna_history () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = '/Javascript/img/history-3.png';
	parent_object.picture_title = 'Свойства и методы объекта history';
	
	parent_object.main_head = { abbr: 'BOM', text: 'Browser Object Model' };
	
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'history.length',
		sample: 'alert(history.length);',
		help: 'Свойство: количество записей в журнале'
	};
	parent_object.data[1] = {
		name: 'history.go',
		sample: 'history.go(-3);',
		help: 'Метод: переход на указанное число записей в журнале истории'
	};
	parent_object.data[2] = {
		name: 'history.back',
		sample: 'history.back();',
		help: 'Метод загружает предыдущий URL из списка истории'
	};
	parent_object.data[3] = {
		name: 'history.forward',
		sample: 'history.forward();',
		help: 'Метод загружает следущий URL из списка истории'
	};
	parent_object.data[4] = {
		name: 'history.pushState',
		sample: '',
		help: 'Метод: Поместить запись в журнал'
	};
	parent_object.data[5] = {
		name: 'history.replaceState',
		sample: '',
		help: 'Метод: Замена записи в журнале'
	};
	parent_object.data[5] = {
		name: 'history.state',
		sample: 'console.log (history.state);',
		help: 'Свойство: данные, которые передаются методами pushState и replaceState'
	};
	create_article_content (parent_object);
}
// ========================================================================================== garevna_console_study
function garevna_console_study () {
	
	var parent_object = this;   // контекст вызова
	parent_object.picture = '/JavaScript/img/methods-1.png';
	parent_object.picture_title = 'Веб-консоль | Ctrl+Shift+J или F12';
	
	parent_object.main_head = { abbr: 'BOM', text: 'Browser Object Model' };
	
	parent_object.buttons_width = 120;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'console.info',
		sample: 'console.info("Мы изучаем веб-консоль");',
		help: 'Вывести в консоль информационное сообщение'
	};
	parent_object.data[1] = {
		name: 'console.error',
		sample: 'console.error("А это ошибка!");',
		help: 'Вывести в консоль сообщение об ошибке'
	};
	parent_object.data[2] = {
		name: 'console.warn',
		sample: 'console.warn("Это предупреждение");',
		help: 'Вывести в консоль предупреждение'
	};
	parent_object.data[3] = {
		name: 'console.clear',
		sample: 'console.clear();',
		help: 'Очистить консоль'
	};
	parent_object.data[4] = {
		name: 'console.log',
		sample: 'console.log(console);',
		help: 'Вывести в консоль объект браузера console'
	};
	parent_object.data[5] = {
		name: 'console.dir',
		sample: 'console.dir(window);',
		help: 'Вывести в консоль объект window'
	};
	create_article_content (parent_object);
}

