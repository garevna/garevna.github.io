// ==============================================================
//                       Courseware html & CSS
//                            module 02
// ==============================================================
var garevna_html_02 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	// ===================================================================================================== selectors
	func['formatting'] = function(parent_node) {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Блочные и строчные элементы</wht>');
		var html = '';
		html += '<p class = "p1">Большинство html-элементов относятся к одной из двух групп:</p>';
		html += '<ul>';
		html += '<li class = "li">блочные элементы, которые не терпят соседей справа и слева, а любят жить в отдельной строке</p>';	
		html += '<li class = "li">- строчные элементы, которые преспокойно разделют строку с соседями.</p>';	
		html += '</ul>';
		html += '<p class = "p1">По умолчанию к блочным элементам относятся заголовки <span class="span">h1-h6</span>, элемент <span class="span">div</span>, текстовые блоки (абзацы) <span class="span">p</span>, пункты списка <span class="span">li</span>,  горизонтальный разделитель <span class="span">hr</span></p>';
		html += '<p class = "p1">К строчным элементам относятся: ';
		html += '<span class="span">span</span>, <span class="span">em, <span class="span">i</span>, <span class="span">b</span> и <span class="span">font</span>, гипертекстовые ссылки<span class="span"> a</span>, внедренные объекты <span class="span">img</span> и разрыв строки <span class="span">br</span></p>';
		html += '<div class = "div">Блочные элементы часто выполняют функцию контейнеров для других элементов.</div>';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
		
			var html_elem = [
			{ title:'', txt:'<p>Большинство html-элементов относятся к одной из двух групп:</p>', class:"p1" },
			{ title:'', txt:'<ul>', class:"" },
			{ title:'', txt:'<li>блочные элементы, которые не терпят соседей справа и слева, а любят жить в отдельной строке</li>', class:"li" },
			{ title:'', txt:'<li>строчные элементы, которые преспокойно разделют строку с соседями.</li>', class:"li" },
			{ title:'', txt:'</ul>', class:"" },
			{ title:'', txt:'<p>По умолчанию к блочным элементам относятся заголовки <span>h1-h6</span>, элемент <span>div</span>, текстовые блоки (абзацы) <span>p</span>, пункты списка <span>li</span>,  горизонтальный разделитель <span>hr</span></p>', class:"p1" },
			{ title:'', txt:'<p>К строчным элементам относятся:', class:"p1" },
			{ title:'', txt:'<span> span</span>, <span>em</span>, <span>i</span>, <span>b</span> и <span>font</span>, гипертекстовые ссылки <span>a</span>, внедрение объектов <span>img</span> и разрыв строки <span>br</span></p>', class:"span" },
			{ title:'', txt:'<div>Блочные элементы часто выполняют функцию контейнеров для других элементов.</div>', class:"div" }
		];
		
		garevna_html_css_library.htmlInit(html_elem);
		
			var obj = [ 
	                 { id:"p1", name:"p", type:'class' },
			         { id:"li", name:"li", type:'class' },
			         { id:"div", name:"div", type:'class' },
					 { id:"span", name:"span", type:'class' }
		    ];
			var attrs = [
			         {
						 name:'width',
						 type:'text',
						 default_val:[ '200px','auto','70%','auto' ]
					 },
					 {
						 name:'height',
						 type:'text',
						 default_val:[ 'auto','auto','100px','50px' ]
					 },
					 {
						 name:'font-size',
						 type:'text',
						 default_val:[ '11px','11px','11px','11px' ]
					 },
					 {
						 name:'background-color',
						 type:'text',
						 default_val:[ '#F7F5C5','#ffa', '#dde', '#333' ]
					 },
					 {
						 name:'color',
						 type:'text',
						 default_val:[ 'black','green', 'gray', 'white' ]
					 }];
			garevna_html_css_library.cssInit(obj, attrs);
	};
	// =============================================================================================== class_selectors
	func['logic_structure'] = function(parent_node) {
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Логическая структура и визуальное представление</wht>');
			document.getElementById('garevna_browser_win').style.backgroundColor = "#ddc";
		    document.getElementById('garevna_browser_win').style.backgroundImage = "none";
			
			var html = '';
			html += '<p class="p">html-элементы отвечают только за <span class="span">логическую разметку документа</span>';
			html += ', т.е. <h3 class="h3">структуру информации</h3></p>';
			html += '<p class="p">За внешний вид элементов на веб-странице, их размещение, взаимное расположение отвечают &nbsp;<h2 class="h2">каскадные таблицы стилей. </h2></p>';
			html += '';
			html += '<p class="p">С помощью CSS любой html-элемент можно сделать строчным или блочным, поэтому строчными ("инлайновыми") или блочными они являются условно, <h3 class="h3">по дефолтным установкам браузеров</h3>, которые можно изменить.</p>';
			html += '';
			html += '<p class="p"></p>';
			html += '<hr class="hr">';
			
			html += '<h3 style="color:black;">Некоторые html-теги логической разметки страницы</h3>';
			html += '<pre id="html-tags" style="background-color:#ddc; width:95%;" width="90%"><br />';
			html += '<dfn>&lt;abbr></dfn> - аббревиатура<br />';
			html += '<dfn>&lt;address></dfn> - адрес<br />';
			html += '<dfn>&lt;sub></dfn> - подстрочный текст<br />';
			html += '<dfn>&lt;sup></dfn> - надстрочный текст<br />';
			html += '<dfn>&lt;form></dfn> - форма для ввода пользовательских данных<br />';
			html += '<dfn>&lt;input></dfn> - поле для ввода данных.<br />';
			html += '             Поле ввода может варьироваться в зависимости от атрибута type.<br />';
			html += '             Ваше имя: &lt;input type="text" name="user_name"><br />';
			html += '             &lt;input type="button" value="Готово"><br />';
			html += '<dfn>&lt;textarea></dfn> -  элемент управления для ввода текста из нескольких строк<br />';
			html += '             &lt;textarea rows="4" cols="50"><br />';
			html += '<dfn>&lt;header></dfn> - заголовок для документа или раздела (HTML5)<br />';
			html += '<dfn>&lt;footer></dfn> - подвал для документа или раздела (HTML5)<br />';
			html += '<dfn>&lt;main></dfn> - основное содержание документа (HTML5)<br />';
			html += '<dfn>&lt;nav></dfn> - набор навигационных ссылок (HTML5)<br />';
			html += '<dfn>&lt;section></dfn> - раздел в документе (HTML5)<br />';
			html += '<dfn>&lt;article></dfn> - статья (HTML5)<br />';
			html += '<dfn>&lt;aside></dfn> - контент в стороне от содержимого страницы (HTML5)<br />';
			html += '<dfn>&lt;details></dfn> - дополнительные детали, которые пользователь может отобразить или скрыть (HTML5)<br />';
			html += '<dfn>&lt;summary></dfn> - видимый заголовок для элемента &lt;details> (HTML5)<br />';
			html += '</pre>';
			
			
			document.getElementById('garevna_browser_win').innerHTML = html;
			
			var html_elem = [
			{ title:'', txt:'<p>html-элементы отвечают только за ', class:"p" },
			{ title:'', txt:'<span>логическую разметку документа</span>', class:"span" },
			{ title:'', txt:', т.е.&nbsp;', class:"p" },
			{ title:'', txt:'<h3>структуру информации</h3>', class:"h3" },
			{ title:'', txt:'. </p>', class:"p" },
			{ title:'', txt:'<p>За внешний вид элементов на веб-странице, их размещение, взаимное расположение отвечают &nbsp;</p>', class:"p" },
			{ title:'', txt:'<h2>каскадные таблицы стилей</h2>', class:"h2" },
			{ title:'', txt:'<p>С помощью CSS любой html-элемент можно сделать строчным или блочным, поэтому строчными ("инлайновыми") или блочными они являются условно, ', class:"" },
			{ title:'', txt:'<h3>по дефолтным установкам браузеров</h3>', class:"h3" },
			{ title:'', txt:', которые можно изменить.</p>', class:"p" },
			{ title:'', txt:'<hr>', class:"" },
		];
		garevna_html_css_library.htmlInit(html_elem);
			var obj = [ 
	                 { id:"p", name:"p", type:'class' },
			         { id:"h3", name:"h3", type:'class' },
			         { id:"h2", name:"h2", type:'class' },
					 { id:"span", name:"span", type:'class' }
		    ];
			var attrs = [
			         {
						 name:'display',
						 type:'select',
						 vals:[ 'inherit','block','inline','inline-block', 'list-item', 'initial' ],
						 default_val:[ 'initial','block','block','initial' ]
					 },
					 {
						 name:'font-family',
						 type:'select',
						 vals:[ 'Comic Sans MS', 'StudioScriptC', 'Verdana', 'BetinaScriptC', 'Franklin Gothic Bold' ],
						 default_val:'Verdana'
					 },
					 {
						 name:'font-size',
						 type:'text',
						 default_val:[ '14px','18px','11px','20px' ]
					 },
					 {
						 name:'color',
						 type:'text',
						 default_val:[ 'black','#960064', '#649600', 'blue' ]
					 }
					 ];
			garevna_html_css_library.cssInit(obj, attrs);
	};
	// ====================================================================================================== safe_fonts
	func['safe_fonts'] = function() {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<h1>Безопасные шрифты</h1>');
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = '#000';
		
		var fonts = [
		    'Arial', "'Arial Black'", "'Book Antiqua'", "'Comic Sans MS'", 'Courier', "'Courier New'", 'Georgia',
			'Geneva', 'Helvetica', 'Impact', "'Lucida Console'", "'Lucida Grande'", "'Lucida Sans Unicode'",
			'Marlett', "'Minion Web'", 'Monaco', 'monospace', 'Palatino', "'Palatino Linotype'", "'sans-serif'",
			'serif', 'Symbol', 'Tahoma', "'Times New Roman'", "'Trebuchet MS'", 'Verdana', 'Webdings'
		];
		sample = 'Тестируем этот шрифт';
		var html = '<table style="border-spacing: 0;"><caption style="font-size:10px;color:#ff8;">';
		html += 'С помощью Alt можно вводить коды символов</caption>';
		html += '<tr><td style="text-align:center"><grn>font-family</grn></td>';
		html += '<td style="text-align:center"><grn>normal</grn></td>';
		html += '<td style="text-align:center"><grn>bold</grn></td>';
		html += '<td style="text-align:center"><grn>italic</grn></td></tr>';
		
		var _inp = '<td><input type="text" style="background-color:black;border:none;color:white;width:200px;font-family:';
		for ( var j = 0; j < fonts.length; j++ ) {
			html += '<tr><td><mgnt>' + fonts[j] + '</mgnt></td>';
			html += _inp + fonts[j] + ';" value="' + sample + '"/></td>';
			html += _inp + fonts[j] + '; font-weight:bold;" value="' + sample + '"/></td>';
			html += _inp + fonts[j] + '; font-style:italic;" value="' + sample + '"/></td></tr>';
		}
		html += '</table>';
		document.getElementById('garevna_browser_win').innerHTML = html;
	};	
	// ======================================================================================================= home_work
	func['home_work'] = function() {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<h1>Задание на дом</h1>');
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = '#dde';
		
		var html = '';
        html += '<p>1. Создайте веб-страницу с заголовками h1, h2, h3 и блоками текста p</p>';
        html += '<p>2. Оформите стили отображения элементов страницы в блоке &lt;styles></p>';
        html += '<p>3. Используйте подстрочный и надстрочный текст</p>';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	return function() {
			return func[func_name]();
	}
}