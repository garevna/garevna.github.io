// ==============================================================
//                       Courseware html & CSS
//                            module 04
// ==============================================================
var garevna_html_04 = function (func_name) {
	
	var func = {};
	// ===================================================================================================== selectors
	func['selectors-3'] = function() {
		
		garevna_html_css_library.clear();
		var html = '<div class="task-text">';
		html += '<div><p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">*</span> { font-size:14px; font-family:Arial; }';
		html += '<span  class="gray">  /* Универсальный селектор - все элементы */</span></sel>';
		html += '<sel><span class="magenta">body</span>';
		html += ' { background-color:#dde; font-size:14px; font-family:Arial; }</sel>';
		html += '<sel><span class="magenta">p</span> { text-align:justify; text-indent:25px; }</sel>';
		html += '<sel><span class="magenta">img</span> { width:auto; height:auto; max-width:250px; }</sel>';
		html += '<p class="green">&lt;/style&gt;</p></div>';
		html += '</div>';
		garevna_Level2.scene.innerHTML = html;
	};
	
	func['selectors-4'] = function() {
		
		garevna_html_css_library.clear();
		var html = '<div class="task-text">';
		html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">.black_white</span> { background-color:black; color:white; }</sel>';
		html += '<sel><span class="magenta">.boxShadow</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/body></h3></div>';
		html += '</div>';
		garevna_Level2.scene.innerHTML = html;
	};
	
	func['selectors-5'] = function() {
		
		garevna_html_css_library.clear();
		var html = '<div class="task-text">';
		html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">#header</span> { font-size:150%; color:white; }</sel>';
		html += '<sel><span class="magenta">#footer</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '<div><h3>&lt;body></h3>';
		html += '&lt;div <span class="magenta">id="header"</span>Начало раздела (страницы)&lt;/div><br />';
		html += '...<br />';
		html += '&lt;div <span class="magenta">id="footer"</span>"Подвал" раздела (страницы)&lt;/div>';
		html += '<h3>&lt;/body></h3></div>';
		html += '</div>';
		garevna_Level2.scene.innerHTML = html;
	};
	
	func['selectors-6'] = function() {
		
		garevna_html_css_library.clear();
		var html = '<div class="task-text">';
		html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">[title]</span> { background-color:black; color:white; }</sel>';
		html += '<sel><span class="magenta">input[type="text"]</span> { </sel><atr>-webkit-text-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-text-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-text-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>text-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<sel><span class="magenta">input[type="button"]</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '<div><h3>&lt;body></h3>';
		html += '&lt;div <span class="magenta">title</span>="<span class="dark_gray">Этот тег имеет атрибут title</span>">Смотри &lt;/div><br />';
		html += '&lt;input <span class="magenta">type="text"</span> value="Введите текст" /><br />';
		html += '&lt;input <span class="magenta">type="button"</span> value="Нажми меня">';
		html += '<h3>&lt;/body></h3></div>';
		html += '<hr>';
		html += '<div title="Этот тег имеет атрибут title">Смотри</div>';
		html += '<div title="Этот тег имеет атрибут title">Смотри</div>';
		html += '</div>';
		garevna_Level2.scene.innerHTML = html;
	};
	
	func['selectors-7'] = function() {
		
		garevna_html_css_library.clear();
		var html = '<div class="task-text">';
		html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">p:first-letter</span> { font-size:250%; color:green; }</sel>';
		html += '<sel><span class="magenta">p:first-line</span> { font-style:italic; }</sel>';
		html += '<sel><span class="magenta">p:hover</span> { </sel><atr>-webkit-text-shadow: 1px 1px 0px rgba(0,0,0,0.5);</atr><atr>-moz-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>-o-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<sel><span class="magenta">div:hover, div:focus</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '<div><h3>&lt;body></h3>';
		html += '&lt;p>first-letter - это псевдо-элемент. Первая буква абзаца будет в два с половиной раза больше остальных и зеленого цвета&lt;/p><br />';
		html += '&lt;p>first-line - это псевдо-элемент. Первая строка абзаца будет курсивом&lt;/p><br />';
		html += '&lt;p>hover - это псевдо-класс. При наведении курсора на этот текст он будет отображаться с тенью&lt;/p><br />';
		html += '&lt;div>focus - это псевдо-класс. При получении объектом фокуса блок будет отображаться с тенью&lt;/p>';
		html += '<h3>&lt;/body></h3></div>';
		html += '</div>';
		garevna_Level2.scene.innerHTML = html;
	};
	
	func['selectors-8'] = function() {
		
		garevna_html_css_library.clear();
		var html = '<div class="task-text">';
		html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">div p</span> { color:green; font-style:italic; }';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p> внутри &lt;div> элемента */</span></sel>';
		html += '<sel><span class="magenta">div > p</span> { color:blue;  }';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p>, для которых родительским является &lt;div> элемент */</span></sel>';
		html += '<sel><span class="magenta">div + p</span> { color:red;  }';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p>, следующие непосредственно за &lt;div> элементом */</span></sel>';
		html += '<sel><span class="magenta">h1~p</span> { </sel><atr>-webkit-text-shadow: 1px 1px 0px rgba(0,0,0,0.5);</atr><atr>-moz-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>-o-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><sel>}';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p>, которым предшествует элемент &lt;h1> */</span></sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '</div>';
		garevna_Level2.scene.innerHTML = html;
	};
	// ================================================================================================== attr_selectors
	func['attr_selectors'] = function() {
		garevna_html_css_library.clear();
		var html_elem = [
		    {
				title:'Это заголовок (шапка)',
				txt:'<div title="Это заголовок (шапка)">Атрибутивные селекторы</div>',
				cls:'<div class="titled" title="Это заголовок (шапка)">Атрибутивные селекторы</div>'
			},
			{
				title:'',
				txt:'<input type="button" value="Кнопка" />',
				cls:'<input type="button" class="btn" value="Кнопка" />'
			},
			{
				title:'',
				txt:'<input type="text" placeholder="Введите текст" />',
				cls:'<input class="txt" type="text" placeholder="Введите текст" />'
			},
			{
				title:'',
				txt:'<img src="/buttons/comp.png" />',
				cls:'<img class="src" src="/buttons/comp.png" />'
			},
			{
				title:'',
				txt:'<div style="width:80%; height:auto;">Можно определить стиль для всех элементов с заданными атрибутами тегов. Например, для всех элементов, у которых есть атрибуты title, или style, или src. Чтобы указать, что стиль относится к этим элементам, нужно использовать атрибутивные селекторы стиля. Атрибутивные селекторы заключаются в квадратные скобки [], внутри которых находится название атрибута</div>',
				cls:'<div class="stl" style="width:80%; height:auto;">Можно определить стиль для всех элементов с заданными атрибутами тегов. Например, для всех элементов, у которых есть атрибуты title, или style, или src. Чтобы указать, что стиль относится к этим элементам, нужно использовать атрибутивные селекторы стиля. Атрибутивные селекторы заключаются в квадратные скобки [], внутри которых находится название атрибута</div>'
			}
		];
		var html = '<div style="border:inset 1px; width:80%; margin-left:5%;">';
		var j;
		for (j=0; j<html_elem.length; j++) {
			html += html_elem[j].cls;
		}
		
		garevna_Level2.scene.innerHTML = html;
		garevna_lib.createFlash ("/swf/html/mod-04/attr_selector.swf",
		                         { top:'0', left:'0' },
		                         { width:undefined, height:undefined },
								 garevna_Level2.scene);
		garevna_html_css_library.htmlInit(html_elem);
		var obj = [ 
	        { id:"titled", name:"[title]", type:'class' },
			{ id:"btn", name:'input[type="button"]', type:'class' },
			{ id:"txt", name:'input[type="text"]', type:'class' },
			{ id:"src", name:"[src]", type:'class' },
			{ id:"stl", name:"[style]", type:'class' }
		];
		txtShadow = '0px 0px 1px rgba(0,0,0,0.5)';
		bxShadow = '2px 2px 1px rgba(0,0,0,0.7)';
		var attrs = [
		    { name:'-webkit-text-shadow',type:'text', default_val:[txtShadow,txtShadow,txtShadow,'none',txtShadow] },
			{ name:'text-shadow', type:'text', default_val:[txtShadow,txtShadow,txtShadow,'none',txtShadow] },
			{ name:'-webkit-box-shadow', type:'text', default_val:[bxShadow,bxShadow,'inset 1px 1px 1px rgba(0,0,0,0.5)',bxShadow,bxShadow] },
			{ name:'box-shadow', type:'text', default_val:[bxShadow,bxShadow,'inset 1px 1px 1px rgba(0,0,0,0.5)',bxShadow,bxShadow] },
			{ name:'margin', type:'text', default_val:['0','5px 10px','10px 20px','4px 8px','10px 10px'] },
			{ name:'padding', type:'text', default_val:['20px 40px','4px 8px','2px 5px','5px 5px','30px 40px'] },
			{ name:'color', type:'text', default_val:['#eee','green','#333','black','white'] },
			{ name:'font-size', type:'text', default_val:['150%','90%','100%','100%','100%'] },
			{ name:'background-color', type:'text', default_val:['#080','#ddc','#eef','transparent','#050'] }
		];
		garevna_html_css_library.cssInit(obj, attrs);
	};
	// ===================================================================================================== id_selectors
	func['id_selectors'] = function() {
		garevna_html_css_library.clear();
		var html_elem = [ 
		    { title:'У меня идентификатор header', txt:'<div id="header">Идентификаторные селекторы</div>', class:'' },
			{ title:'У меня идентификатор btn', txt:'<input id="btn" type="button" value="Кнопка" />', class:'' },
			{ title:'У меня идентификатор txt', txt:'<input type="text" id="txt" />', class:'' },
			{ title:'У меня идентификатор picture', txt:'<img id="picture" src="/buttons/comp.png" />', class:'' },
			{ 
			    title:'У меня идентификатор myDiv',
				txt:'<div id="myDiv" style="width:80%; height:auto;">Можно определить стиль элемента с заданным уникальным идентификатором (значением атрибута id). В этом случае для привязки стиля к элементу используются идентификаторные селекторы. В данном примере у нас есть элементы с идентификаторами header, btn, txt, picture и myDiv. Идентификаторные селекторы начинаются с знака хеш (#)</div>',
				class:''
			}
		];
		var html = '<div style="border:inset 1px; width:80%; margin-left:5%;">';
		var j;
		for (j=0; j<html_elem.length; j++) {
			html += html_elem[j].txt;
		}
		//html += '<iframe src="/html-css/module-04/id_selector.swf" width="520" height="270"></iframe>';
		garevna_Level2.scene.innerHTML = html;
		garevna_lib.createFlash ("/swf/html/mod-04/id_selector.swf",
		                         { top:'0', left:'0' },
		                         { width:undefined, height:undefined },
								 garevna_Level2.scene);
		garevna_html_css_library.htmlInit(html_elem);
		var obj = [ 
	        { id:"header", name:"#header", type:'elem' },
			{ id:"btn", name:'#btn', type:'elem' },
			{ id:"txt", name:'#txt', type:'elem' },
			{ id:"picture", name:"#picture", type:'elem' },
			{ id:"myDiv", name:"#myDiv", type:'elem' }
		];
		txtShadow = '0px 0px 1px rgba(0,0,0,0.5)';
		bxShadow = '2px 2px 1px rgba(0,0,0,0.7)';
		var attrs = [
		    { name:'-webkit-text-shadow', type:'text', default_val:[txtShadow,txtShadow,txtShadow,'none',txtShadow] },
			{ name:'text-shadow', type:'text', default_val:[txtShadow,txtShadow,txtShadow,'none',txtShadow] },
			{ name:'-webkit-box-shadow', type:'text', default_val:[bxShadow,bxShadow,'inset 1px 1px 1px rgba(0,0,0,0.5)',bxShadow,bxShadow] },
			{ name:'box-shadow', type:'text', default_val:[bxShadow,bxShadow,'inset 1px 1px 1px rgba(0,0,0,0.5)',bxShadow,bxShadow] },
			{ name:'margin', type:'text', default_val:['0','5px 10px','10px 20px','4px 8px','10px 10px'] },
			{ name:'padding', type:'text', default_val:['20px 40px','4px 8px','2px 5px','5px 5px','30px 40px'] },
			{ name:'color', type:'text', default_val:['#fff','green','#333','black','white'] },
			{ name:'font-size', type:'text', default_val:['150%','90%','100%','100%','100%'] },
			{ name:'background-color', type:'text', default_val:['#880','#ddc','#eef','transparent','#770'] }
		];
		garevna_html_css_library.cssInit(obj, attrs);
	};
    // ================================================================================================ pseudo_selectors
	func['pseudo_selectors'] = function() {
		garevna_html_css_library.clear();
		var html_elem = [ 
		    { title:'У меня идентификатор header', txt:'<div id="container">Селекторы псевдо-классов</div>', class:'' },
			{ title:'У меня идентификатор btn', txt:'<input id="btn" type="button" value="Кнопка" />', class:'' },
			{ title:'У меня идентификатор txt', txt:'<input type="text" id="txt" />', class:'' },
			{ title:'У меня идентификатор picture', txt:'<img id="picture" src="/buttons/comp.png" />', class:'' },
			{
				title:'У меня идентификатор myDiv',
				txt:'<div id="myDiv" style="width:90%; height:auto;">Можно определить стиль элемента с заданным уникальным идентификатором (значением атрибута id). В этом случае для привязки стиля к элементу используются идентификаторные селекторы. В данном примере у нас есть элементы с идентификаторами header, btn, txt, picture и myDiv. Идентификаторные селекторы начинаются с знака хеш (#)</div>',
				class:''
			}
		];
		var html = '';
		var j;
		for (j=0; j<html_elem.length; j++) {
			html += html_elem[j].txt;
		}
		html += '<iframe src="/html-css/module-04/id_selector.swf" width="520" height="270"></iframe>';
		garevna_Level2.scene.innerHTML = html;
		garevna_html_css_library.htmlInit(html_elem);
		var obj = [ 
	        { id:"div:hover", name:"div:hover", type:'class' },
			{ id:"#btn:hover", name:'#btn:hover', type:'elem' },
			{ id:"txt", name:'#txt', type:'elem' },
			{ id:"picture", name:"#picture", type:'elem' },
			{ id:"myDiv", name:"#myDiv", type:'elem' }
		];
		txtShadow = '0px 0px 1px rgba(0,0,0,0.5)';
		bxShadow = '2px 2px 1px rgba(0,0,0,0.7)';
		var attrs = [
		    { name:'-webkit-text-shadow', type:'text', default_val:[txtShadow,txtShadow,txtShadow,'none',txtShadow] },
			{ name:'text-shadow', type:'text', default_val:[txtShadow,txtShadow,txtShadow,'none',txtShadow] },
			{ name:'-webkit-box-shadow', type:'text', default_val:[bxShadow,bxShadow,'inset 1px 1px 1px rgba(0,0,0,0.5)',bxShadow,bxShadow] },
			{ name:'box-shadow', type:'text', default_val:[bxShadow,bxShadow,'inset 1px 1px 1px rgba(0,0,0,0.5)',bxShadow,bxShadow] },
			{ name:'padding', type:'text', default_val:['20px 40px','4px 8px','2px 5px','5px 5px','30px 40px'] },
			{ name:'color', type:'text', default_val:['#fff','green','#333','black','white'] },
			{ name:'font-size', type:'text', default_val:['150%','90%','100%','100%','100%'] },
			{ name:'background-color', type:'text', default_val:['#444','#ddc','#eef','transparent','black'] }
		];
		garevna_html_css_library.cssInit(obj, attrs);
	};
	// ======================================================================================================= home_work
	func['home_work'] = function() {
		garevna_html_css_library.clear();
		var html = '<h1>Задание на дом</h1>';
        html += '<h2>1. Маркированные списки</h2>';
        html += '<h3>Маркеры</h3>';
		
        html += '<p>Создайте маркированный список, выбрав в качестве маркера картинку (кликните правой кнопкой мышки на иконке и выберите "<span class="magenta">Копировать URL картинки</span>")</p>';
        html += '<div class="flex-div">';
        html += '<a href="/html-css/ico/icon-01.png"><img src="/html-css/ico/icon-01.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-02.png"><img src="/html-css/ico/icon-02.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-03.png"><img src="/html-css/ico/icon-03.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-04.png"><img src="/html-css/ico/icon-04.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-05.png"><img src="/html-css/ico/icon-05.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-06.png"><img src="/html-css/ico/icon-06.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-07.png"><img src="/html-css/ico/icon-07.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-08.png"><img src="/html-css/ico/icon-08.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-09.png"><img src="/html-css/ico/icon-09.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-10.png"><img src="/html-css/ico/icon-10.png" alt=""/></a>';
        html += '&nbsp;<a href="/html-css/ico/icon-11.png"><img src="/html-css/ico/icon-11.png" alt=""/></a>';
        html += '</div>';
        html += '<p></p>';
        html += '<h3>Отступы</h3>';
        html += '<p>Сделайте список с обтеканием маркера текстом</p>';
        
        html += '<h2>2. Упорядоченные списки</h2>';
        html += '<h3>Нумерация</h3>';
        html += '<p>Создайте упорядоченный список, начинающийся с номера 7</p>';
        html += '<h3>Вложенные списки</h3>';
        html += '<p>Создайте вложенные списки с нумерацией пунктов списка второго уровня вида: "1.1." </p>';
        html += '<h3>Формат номеров списков</h3>';
        html += '<p>Сделайте список, перед номерами элементов которого будет символ <span class="symb">&#8658;</span></p>';
        html += '<h2>3. Списки определений</h2>';
        html += '<p>Возьмите несколько определений многозначных понятий из словаря и создайте список определений</p>';
		garevna_Level2.scene.innerHTML = html;
	};
	return function() {
			return func[func_name]();
	}
}