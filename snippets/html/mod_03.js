// ==============================================================
//                       Courseware html & CSS
//                            module 03
// ==============================================================
var garevna_html_03 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	// ===================================================================================================== selectors
	func['site_indexing'] = function(parent_node) {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Индексация в поисковых системах</wht>');
		var html = '';
		html += '<img src="/html-css/module-03/images/google-index-website.png"/> ';
		html += '<p>Поисковики (search engines) хранят информацию о содержании веб-страниц в <dfn>базе данных</dfn> ';
		html += '(<dfn>индексе</dfn>). <br>Для появления сайта в результатах поиска нужно, чтобы он попал в ';
		html += '<dfn>индекс</dfn> поисковика. <br>Можно вручную внести свой сайт в базу данных поисковых систем ';
		html += 'с помощью специального сервиса:</p>';
		html += '<h3>Регистрация в поисковых системах:</h3>';	
		html += '<div class="dyn_elem">';
		html += '<a href="http://www.google.com/addurl/?continue=/addurl" target="_blank">';
		html += '<img class="button_img" src="/html-css/module-03/images/google_logo.png"/></a></div>';
		html += '<div class="dyn_elem">';
		html += '<a href="http://webmaster.yandex.ru/" target="_blank">';
		html += '<img class="ref_img" src="/html-css/module-03/images/yandex_logo.png"/></a></div>';
		html += '<div class="dyn_elem"><a href="http://www.bing.com/docs/submit.aspx" target="_blank">';
		html += '<img class="button_img" src="/html-css/module-03/images/bing_logo.png"/></a></div>';
		html += '<div class="dyn_elem">';
		html += '<a href="http://submit.search.yahoo.com/free/request" target="_blank">';
		html += '<img class="button_img" src="/html-css/module-03/images/yahoo_logo.png"/></a></div>';
		html += '<p>Тогда сайт будет поставлен в очередь на индексацию. <br>Однако поисковые системы больше доверяют результатам работы собственных <dfn>роботов</dfn>. <br>Для того, чтобы робот сам нашел страницу или сайт, необходимо, чтобы на эту страницу или сайт была хотя бы одна ссылка с тех веб-страниц, которые уже занесены в индекс поисковика.</p>';
		html += '';
		html += '';
		html += '';
		html += '';
		html += '';
		
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