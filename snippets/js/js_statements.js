// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
// parent_object.data - массив объектов формата { name:'', sample:'', help:'' }

// ====================================================================================== garevna_js_statements
function garevna_js_statements () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = '/Javascript/anim_gif/computer_wizard.gif';
	parent_object.picture_title = 'Следи за картинками!';
	
	parent_object.main_head = { abbr: 'JS', text: 'Следи за картинками' };
	
	parent_object.buttons_width = 120;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'for',
		sample: 'for ( var j = 0;&nbsp;&nbsp;j < 5;&nbsp;&nbsp;j++ ) { var guy = document.createElement("img"); guy.src = "/Javascript/anim_gif/zhoo.gif"; guy.className = "guy"; guy.style.position = "absolute"; guy.style.bottom = (j+1)*50 + "px"; guy.style.right = j*50 + "px"; guy.style.width = (j+1)*2 + "%"; guy.style.transform = "rotate(" + 15*j + "deg)"; guy.style.zIndex = 1200; document.body.appendChild(guy); } ',
		userObjects: ['guy'],
		userProperties: [],
		userValues: ["/Javascript/anim_gif/zhoo.gif"],
		action: 'for ( var j = 0; j < 5; j++ ) { var guy = document.createElement("img"); guy.src = "/Javascript/anim_gif/zhoo.gif"; guy.className = "guy"; guy.style.position = "absolute"; guy.style.bottom = (j+1)*50 + "px"; guy.style.right = j*50 + "px"; guy.style.width = (j+1)*2 + "%"; guy.style.transform = "rotate(" + 15*j + "deg)"; guy.style.zIndex = 1200; document.body.appendChild(guy); } ',
		
		help: 'В цикле на страницу добавляются изображения танцующего пугала. Переменная цикла j меняется от 0 до 5'
	};
	parent_object.data[1] = {
		name: 'while',
		sample: 'var guy = document.getElementsByClassName("guy"); var k = guy.length; while ( k > 0 ) { guy[k-1].style.transform = "rotate(-" + 5*j + "deg)"; k--; }',
		help: 'Используем цикл для того, чтобы повернуть все пугала. Переменная цикла k. Проверка истинности условия цикла выполняется до начала цикла. Итерации выполняются, пока k > 0',
		userObjects: ['guy'],
		userProperties: [],
		userValues: []
	};
	parent_object.data[2] = {
		name: 'do ... while',
		sample: 'var guy = document.getElementsByClassName("guy"); var i = guy.length; do { guy[i-1].parentNode.removeChild(guy[i-1]); i--; } while ( i > 0 );',
		help: 'В цикле удаляем все пугала со страницы. Первая итерация цикла будет выполнена до проверки истинности условия цикла (i > 0). Повторение зависит от того, выполнено условие цикла или нет',
		userObjects: ['guy'],
		userProperties: [],
		userValues: []
	};
	parent_object.data[3] = {
		name: 'for/in',
		sample: 'var book = { title: "Очень хорошая книга", pages: "В ней 420 страниц", published:"Ее напечатали в 1995 году" }; for ( var x in book ) { alert ( book[x] ); }',
		help: 'Цикл для объекта book. Выполняется для всех свойств объекта (title, pages, published)',
		userObjects: ['book'],
		userProperties: ['title', 'pages', 'published'],
		userValues: ["Очень хорошая книга", "В ней 420 страниц", "Ее напечатали в 1995 году"]
	};
	parent_object.data[4] = {
		name: 'if',
		sample: 'var z = confirm("Потанцуем?"); if ( z ) { var man = document.createElement("img"); man.src = "/Javascript/anim_gif/man.jpg"; man.className = "man"; man.style.position = "absolute"; man.style.bottom = "50px"; man.style.right = "100px"; man.style.width = "20%"; man.style.zIndex = 1200; document.body.appendChild(man); } else { alert ( "Ну, как хочешь..." ); var man = document.getElementsByClassName("man").item(0); if (man) { man.parentNode.removeChild(man); } }',
		help: 'Условный оператор. Если confirm вернет z = true, то на страницу будет добавлен элемент img (появится танцующий парень), в противном случае (else) будет выведено сообщение в модальном окне и выполнена еще одна проверка: если элемент с атрибутом class = "man" существует, то он будет удален',
		userObjects: ['man'],
		userProperties: [],
		userValues: ["/Javascript/anim_gif/man.jpg", "Ну, как хочешь...", "Потанцуем?"]
	};
	parent_object.data[5] = {
		name: 'forEach',
		sample: 'var arr = [ "Стой", "Иди", "Беги", "Прыгай" ]; alert ( arr ); arr.forEach( showItems ); alert ( arr ); function showItems ( item, index, _array ) { _array[ index ] += "!"; console.info ( "Index: " + index + " | item: " + item ); }',
		help: 'Метод массива. Для каждого элемента массива выполняет функцию, имя которой передается как параметр (showItems). Функция (showItems) должна быть определена. Аргументы функции: обязательный аргумент item - значение текущего элемента массива; необязательный аргумент index - индекс текущего элемента массива. Последний необязательный аргумент подразумевает массив, которому принадлежит элемент. Его следует указывать тогда, когда нужно изменить содержимое массива (переопределить значения элементов)',
		userObjects: ['arr', 'item', 'index', '_array'],
		userProperties: ['showItems'],
		userValues: ["Стой", "Иди", "Беги", "Прыгай"]
	};
	parent_object.data[6] = {
		name: 'break',
		sample: 'var arr = [ "Попал", "Промазал", "Никак", "Вдогонку" ]; for (i = 0;&nbsp;i < arr.length;&nbsp;i++) { if ( arr[i] == "Никак" ) { alert( "Это как?"); break; } alert( "Стрельбы. Результат: " + arr[i] ); }',
		action: 'var arr = [ "Попал", "Промазал", "Никак", "Вдогонку" ]; for (i = 0; i < arr.length; i++) { if ( arr[i] == "Никак" ) { alert( "Это как?"); break; } alert( "Стрельбы. Результат: " + arr[i] ); }',
		help: 'Прерывает выполнение цикла'
	};
	parent_object.data[7] = {
		name: 'continue',
		sample: 'var arr = [ "Бегемот", "Крокодил", "Верблюд", "Попугай" ]; for (i = 0;&nbsp;i < arr.length;&nbsp;i++) { if ( arr[i] == "Верблюд" ) { alert( "Я не верблюд!" ); continue; } alert( "Животные: " + arr[i] ); }',
		action: 'var arr = [ "Бегемот", "Крокодил", "Верблюд", "Попугай" ]; for (i = 0; i < arr.length; i++) { if ( arr[i] == "Верблюд" ) { alert( "Я не верблюд!" ); continue; } alert( "Животные: " + arr[i] ); }',
		help: 'Прерывает выполнение текущей итерации цикла и переходит к следующей'
	};
	parent_object.data[8] = {
		name: '?',
		sample: 'var answer = confirm ( "Ты умеешь летать? Если да, нажми ОК, если нет - Отмена" ); var _say = answer ? "Врешь, конечно..." : "Ага, я так и думал... рожденный ползать..."; alert ( _say ); ',
		help: 'Тернарный оператор. Возвращает одно из двух возможных значений в зависимости от выполнения условия'
	};
	parent_object.data[9] = {
		name: 'switch',
		sample: 'var answer = prompt ( "Введи число от 0 до 4", "7" ); switch (Number(answer)) { case 0:<br/><div style="margin-left:30px;">alert("Штиль..."); break; </div>case 1: <br/><div style="margin-left:30px;">alert("Слегка штормит..."); break;</div>case 2: <br/><div style="margin-left:30px;">alert("Похоже, гроза"); break; </div>case 3: <br/><div style="margin-left:30px;">alert("Ураган?"); break; </div>case 4: <br/><div style="margin-left:30px;">alert("Торнадо!!!"); break; </div>default: <br/><div style="margin-left:30px;">alert ( "Ты что, читать не умеешь? Сказано же: число от 0 до 4" ); break;</div>}',
		action: 'var answer = prompt ( "Введи число от 0 до 4", "7" ); switch (Number(answer)) { case 0: alert("Штиль..."); break; case 1: alert("Слегка штормит..."); break; case 2: alert("Похоже, гроза"); break; case 3: alert("Ураган?"); break; case 4: alert("Торнадо!!!"); break; default: alert ( "Ты что, читать не умеешь? Сказано же: число от 0 до 4" ); break; }',
		help: 'В зависимости от значения переключателя будет выполнен соответствующий фрагмент кода',
		userObjects: [],
		userProperties: [],
		userValues: []
	};
	create_article_content (parent_object);
}
// ====================================================================================== garevna_js_operators
function garevna_js_operators () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = 'https://s-media-cache-ak0.pinimg.com/originals/4b/23/d1/4b23d1aac00c484991615dc80d62ae8e.gif';
	parent_object.picture_title = 'Операторы JS';
	
	parent_object.main_head = { abbr: 'JS', text: 'Операторы' };
	
	parent_object.buttons_width = 300;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'Логические операторы',
		sample: 'var x = true; var y = false; alert ("x или y: " + (x || y)); alert ("x и y: " + (x && y)); alert ("x и не y: " + (x && !y));',
		userObjects: [],
		userProperties: [],
		userValues: [],
		help: 'Логические операторы "||", "&&", "!"'
	};
	parent_object.data[1] = {
		name: 'Операторы присваивания',
		sample: 'var x = 5; var y = 10; var z = x; z += y; alert ("x = " + x + ";&nbsp;y = " + y + ";&nbsp;x += y: " + z); z = x; z -= y; alert ("x = " + x + ";&nbsp;y = " + y + ";&nbsp;x -= y: " + z); z = x; z *= y; alert ("x = " + x + ";&nbsp;y = " + y + ";&nbsp;x *= y: " + z); z = x; z /=y; alert ("x = " + x + ";&nbsp;y = " + y + ";&nbsp;x /= y: " + z); z = x; z %= y; alert ("x = " + x + ";&nbsp;y = " + y + ";&nbsp;x %= y: " + z);',
		action: 'var x = 5; var y = 10; var z = x; z += y; alert ("x = " + x + "; y = " + y + "; x += y: " + z); z = x; z -= y; alert ("x = " + x + "; y = " + y + "; x -= y: " + z); z = x; z *= y; alert ("x = " + x + "; y = " + y + "; x *= y: " + z); z = x; z /=y; alert ("x = " + x + "; y = " + y + "; x /= y: " + z); z = x; z %= y; alert ("x = " + x + "; y = " + y + "; x %= y: " + z);',
		help: 'Операторы присваивания',
		userObjects: [],
		userProperties: [],
		userValues: []
	};
	parent_object.data[2] = {
		name: 'Операторы сравнения',
		sample: 'var x = "Помидор"; var y = "Огурец"; alert (x + " == " + y + ": " + (x == y)); alert (x + " != " + y + ": " + (x != y)); x = 5; y = "5"; alert (x + " == " + y + ": " + (x == y)); alert (x + " === " + y + ": " + (x === y)); alert (x + " !== " + y + ": " + (x !== y));',
		help: 'Результат - логическое значение true (истина) или false (ложь)',
		userObjects: [],
		userProperties: [],
		userValues: []
	};
	parent_object.data[3] = {
		name: 'typeof',
		sample: 'var book = { title: "Очень хорошая книга", pages:420, published:false, exist:null, getBook: function () { alert (this.exist?"Есть в наличии":"Нет на складе"); } }; alert ( typeof book ); alert ( "typeof book.title: " + typeof book.title ); alert ( "typeof book.pages: " + typeof book.pages );  alert ( "typeof book.published: " + typeof book.published );  alert ( "typeof book.exist: " + typeof book.exist ); alert ( "typeof book.author: " + typeof book.author ); alert ( "typeof book.getBook: " + typeof book.getBook );',
		help: 'Определение типа объекта (переменной). Результат: символьная строка с названием типа',
		userObjects: ['book'],
		userProperties: ['title', 'pages', 'published', 'exist', 'author'],
		userValues: ["Очень хорошая книга"]
	};
	create_article_content (parent_object);
}


