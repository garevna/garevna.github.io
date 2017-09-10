// ==============================================================
//                       Courseware html & CSS
//                            module 07
// ==============================================================
var garevna_html_07 = function (func_name) {
	
	var func = {};
	    // ---------------------------------------------------------------------------------------------- visibility
		func['visibility'] = function() {
			garevna_html_css_library.clear();
			var html = '<div class="site_name">';
			html += '<img src="/html-css/images/CSS-Edit.png">Атрибут стиля visibility</div><hr />';
			html += '<div id="block-1">Первый блок</div>';
			html += '<div id="block-2">Второй блок</div>';
			html += '<div id="block-3">Третий блок</div>';
			garevna_Level2.scene.innerHTML = html;
			var obj = [ 
	                 { id:"block-1", name:"block-1", type:'elem' },
			         { id:"block-2", name:"block-2", type:'elem' },
			         { id:"block-3", name:"block-3", type:'elem' }
		    ];
			var attrs = [
			         {
						 name:'display',
						 type:'select',
						 vals:[ 'inline','block','inline-block','list-item', 'initial', 'inherit', 'none' ],
						 default_val:'initial'
					 },
					 {
						 name:'visibility',
						 type:'select',
						 vals:[ 'visible','hidden', 'initial', 'inherit' ],
						 default_val:'visible'
					 }];
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------- overflow
		func['overflow'] = function(ref) {
			garevna_html_css_library.clear();
			var html = '<div class="site_name">';
			html += '<img src="/html-css/images/CSS-Edit.png">Атрибут стиля overflow</div><hr />';
			html += '<div id="txt" style="border:inset 1px; background-color:#eef; max-width:500px;">';
			html += '<p>Однажды, некая Лори Стек, владелица магазина в небольшом городке Талкитна, расположенного на Аляске, подобрала на улице бездомного котенка. Лори назвала его Стаббс (куцый хвост), так как за время бродяжничества котенок лишился своего хвоста. Поселившись в магазине своей новой хозяйки, Стаббс быстро стал любимцем покупателей, обладая веселым и добродушным нравом.</p>';
			html += '<p>Может ли писатель, опубликовавший за всю свою жизнь только одно произведение, стать известным на весь мир? Пожалуй, это больше похоже на сказку. Но именно так случилось с обычной американкой Маргарет Митчелл, чей роман «Унесенные ветром» стал настоящим бестеллером. Маргарет родилась в 1900 году в Атланте.</p>';
			html += '<p>Всем известна история о том, как деревенский паренек три недели шел с рыбным караваном из Холмогор в Москву, чтобы по поддельным дворянским документам поступить в академию. И звали его, как вы уже конечно же догадались, Михаил Ломоносов. Через несколько лет 12 способных студентов отобрали для обучения заграницей, в их число попал и будующий великий ученый.</p>';
			html += '</div>';
			garevna_Level2.scene.innerHTML = html;
			var obj = [ { id:"txt", name:"#text_block", type:'elem' } ];
			var attrs = [];
			attrs [0] = {
					name:'overflow',
					type:'select',
					vals:[ 'auto','hidden','visible','scroll', 'initial', 'inherit' ],
					default_val:'auto'
			};
			attrs [1] = { name:'height', type:'text', default_val:'200px' };
			attrs [2] = { name:'margin', type:'text', default_val:'10px 10px 10px 20px' };
			attrs [3] = { name:'padding', type:'text', default_val:'20px' };
				
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------- margin_padding
		func['margin_padding'] = function(ref) {
			
			garevna_html_css_library.clear();
			var html = '<div class="site_name"><img src="/html-css/images/CSS-Edit.png">Блочная модель</div>';
			html += '<h3>margin  |  padding</h3>';
			html += '<div id="outer-block">Внешний блок<div id="inner-block">Внутренний блок</div></div>';
			garevna_Level2.scene.innerHTML = html;
			var obj = [ 
			    { id:"outer-block", name:"Внешний блок", type:'elem' },
				{ id:"inner-block", name:"Внутренний блок", type:'elem' }
			];
			var attrs = [
			    { name:'width', type:'text', default_val:'auto' },
				{ name:'height', type:'text', default_val:'auto' },
				{ name:'margin-top', type:'text', default_val:'10px' },
				{ name:'margin-right', type:'text', default_val:'15px' },
				{ name:'margin-bottom', type:'text', default_val:'10px' },
				{ name:'margin-left', type:'text', default_val:'15px' },
				{ name:'padding-top', type:'text', default_val:'10px' },
				{ name:'padding-right', type:'text', default_val:'20px' },
				{ name:'padding-bottom', type:'text', default_val:'10px' },
				{ name:'padding-left', type:'text', default_val:'20px' },
				{ name:'border', type:'text', default_val:'solid 4px white' }];
				
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------- box_sizing
		func['box_sizing'] = function(ref) {
			garevna_html_css_library.clear();
			var html = '<div class="site_name">';
			html += '<img src="/html-css/images/CSS-Edit.png">Атрибут стиля box-sizing</div>';
			html += '<h3>content-box  |  border-box</h3><div id="outer-block">Внешний блок';
			html += '<div id="inner-block">Внутренний блок&nbsp;<img src="/html-css/images/CSS-Edit.png">';
			html += '</div></div><hr />';
			html += '<div>';
			html += '<p><span class="dark_gray">box-sizing</span>: <span class="magenta">content-box</span>;&nbsp;<span class="gray">&nbsp;/* Значение по умолчанию. В размер блока включается только контент. */</span></p>';
			html += '<p><span class="dark_gray">box-sizing</span>: <span class="magenta">border-box</span>;&nbsp;<span class="gray">&nbsp;/* Ширина и высота блока включает не только контент, но и границу (border) и внутренние отступы (padding) */</span></p>';
			html += '<p><span class="dark_gray">box-sizing</span>: <span class="dark_gray">initial</span>;&nbsp;&nbsp;<span class="gray">/* Сброс в значение по умолчанию */</span></p>';
			html += '<p><span class="dark_gray">box-sizing</span>: <span class="magenta">inherit</span>;&nbsp;<span class="gray">&nbsp;/* Значение наследуется от родительского элемента */</span></p><hr />';
			html += '<p class="gray"><span class="dark_gray">Упражнение</span>:Установите значение <span class="magenta">border-box</span> для CSS-атрибута <span class="dark_gray">box-sizing</span> внешнего блока, и значение <span class="magenta">content-box</span> для CSS-атрибута <span class="dark_gray">box-sizing</span> внутреннего блока. Теперь измените значение для CSS-атрибута <span class="dark_gray">box-sizing</span> внутреннего блока на <span class="magenta">inherit</span>, и посмотрите на результат</p>';
			html += '</div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
			garevna_Level2.scene.innerHTML = html;
			var obj = [
			    { id:"outer-block", name:"Внешний блок", type:'elem' },
				{ id:"inner-block", name:"Внутренний блок", type:'elem' }
			];
			var attrs = [
			    {
					name:'box-sizing',
					type:'select',
					vals:[ 'content-box','border-box', 'initial', 'inherit' ],
					default_val:'initial'
				},
				{ name:'width', type:'text', default_val:'80%' },
				{ name:'height', type:'text', default_val:'50%' },
				{ name:'margin', type:'text', default_val:'5px 5px 5px 5px' },
				{ name:'padding', type:'text', default_val:'10px 20px 10px 20px' },
				{ name:'border', type:'text', default_val:'double 4px white' }];
				
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------- display_values
		func['display_values'] = function(ref) {
			
			garevna_html_css_library.clear();
			var html = '<div class="site_name">';
			html += '<img src="/html-css/images/CSS-Edit.png"> CSS-атрибут display</div><hr>';
			html += '<div class="task-text"><div id="visual_model"><div id="browsers">';
			html += '<img src="/logos/google_chrome.ico" alt=""/><img src="/logos/opera_logo.png" alt=""/>';
			html += '<img src="/logos/mozilla.png" alt=""/><img src="/logos/safari_logo.png" alt=""/>';
			html += '<img src="/logos/internet_explorer_logo.png" alt=""/></div><h3>В браузере</h3><br />';
			html += '<div><span id="sample_span1">span 1</span><span id="sample_span2">span 2</span>';
			html += '<span id="sample_span3">span 3</span><h1 id="sample_h1">h1</h1><div id="sample_div">div</div>';
			html += '<p id="sample_p">p</p></div><!-- В браузере --></div><!-- visual model -->';
			html += '<div><gray id="hlp"></gray>&nbsp;&nbsp;</div></div>';
			html += '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
			html += '<!-- Демо работы атрибута dispalay -->';
			garevna_Level2.scene.innerHTML = html;
			// ================================================================================================
			//                           Панель управления стилями элементов
			//=================================================================================================
			// for the future development...
			var help = [
			   "'<mgnt>С трочный элемент</mgnt><br />Строчные элементы располагаются в одной строке, последовательно. <br />Им нельзя задать width и height. <br />Эти параметры зависят от параметров всей строки.'",
			   "'<mgnt>Блочный элемент</mgnt> <br />Располагается в отдельной строке. <br />Имеет ширину width и высоту height, <br />внешние (margin) и внутренние (padding) отступы'",
			   "'<mgnt>Строчно-блочный элемент</mgnt><br />Поведение как у строчного элемента; <br />различие в том, что ему, как и блочному элементу,  <br />можно задать width и height. <br />Удобно для размещения в одной строке <br />блочных элементов различной высоты и ширины'",
			   "'<mgnt>Элемент списка</mgnt>'",
			   "'Значение по умолчанию (<mgnt>inline</mgnt>)'",
			   "'<mgnt>Наследует от родительского элемента</mgnt>'",
			   "'<mgnt>Невидимый элемент</mgnt>'"];
			// ==================================================================================================
			var obj = [
			    { id:"sample_span1", name:"span1", type:'elem' },
				{ id:"sample_span2", name:"span2", type:'elem' },
				{ id:"sample_span3", name:"span3", type:'elem' },
				{ id:"sample_h1", name:"h1", type:'elem' },
				{ id:"sample_div", name:"div", type:'elem' },
				{ id:"sample_p", name:"p", type:'elem' }
			];
			var attrs = [
			    {
				    name:'display',
				    type:'select',
				    vals:[ 'inline','block','inline-block','list-item', 'initial', 'inherit', 'none' ],
				    default_val:'initial', hlp:help
			    },
				{ name:'width', type:'text', default_val:'120px' },
				{ name:'height', type:'text', default_val:'40px' },
				{ name:'margin', type:'text', default_val:'5px 5px 5px 5px' },
				{ name:'padding', type:'text', default_val:'5px 10px 5px 10px' },
				{ name:'border', type:'text', default_val:'inset 1px' }];
				
			garevna_html_css_library.cssInit(obj, attrs);
			// ================================================================================================
			//                           Панель исходного кода html
			//=================================================================================================
			var html_elem = [
			    { txt:'<span>span 1</span>', title:"По умолчанию это строчный элемент" },
				{ txt:'<span>span 2</span>', title:"По умолчанию это строчный элемент" },
				{ txt:'<span>span 3</span>', title:"По умолчанию это строчный элемент" },
				{ txt:'<h1>h1</h1>', title:"По умолчанию это блочный элемент" },
				{ txt:'<div>div</div>', title:"По умолчанию это блочный элемент" },
				{ txt:'<p>p</p>', title:"По умолчанию это блочный элемент" }];
			garevna_html_css_library.htmlInit(html_elem);
		};
		// ---------------------------------------------------------------------------------------------------- homework
		func['homework'] = function(ref) {
			garevna_html_css_library.clear();
			var html = '<h1>Задание на дом</h1>';
			html += '<h2>Блочные элементы</h2>';
			html += '<h3>Размещение в одной строке</h3>';
			html += '<p>Создайте на своей странице несколько элементов <span class="magenta">&lt;img&gt;</span> с атрибутом <span class="green">id</span> <span class="dark_gray">= &quot;main_header&quot;</span></p>';
			html += '<p><a href="/html-css/module-05/galery.html" title="Галерея изображений" target="_blank" class="dyn_elem"><img src="/buttons/download.png" style="width:50px; height:auto" alt=""/>&nbsp;Загрузить картинки</a></p>';
			html += '<p>Задать ширину изображений 100px и разместить их в одной строке</p>';
			html += '<h3>Скроллинг</h3>';
			html += '<p>Создать 3 блочных элемента <span class="magenta">&lt;p&gt;</span> с фиксированными размерами: ширина 200px, высота 100px</p>';
			html += '<p>Вставить в эти элементы текст, превышающий размеры блоков</p>';
			html += '<p>Задать параметры видимости текста, выходящего за границы блоков:</p>';
			html += '<p>первому блоку - текст, выходящий за границы блока, обрезается (не виден)</p>';
			html += '<p>второму блоку - текст, выходящий за границы блока, виден</p>';
			html += '<p>третьему блоку - текст, выходящий за границы блока, скроллингуется</p>';
			garevna_Level2.scene.innerHTML = html;
		};
		// -----------------------------------------------------------------------------
		return function() {
			return func[func_name]();
		}
	}