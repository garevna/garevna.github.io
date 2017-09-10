// ==============================================================
//                       Courseware html & CSS
//                            module 07
// ==============================================================
var garevna_html_07 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	
	// ---------------------------------------------------------------------------------------------- visibility
	func['visibility'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>CSS-атрибут</wht> <grn>visibility</grn>');
			
			var html = '<div id="block-1">Первый блок</div>';
			html += '<div id="block-2">Второй блок</div>';
			html += '<div id="block-3">Третий блок</div>';
			document.getElementById('garevna_browser_win').innerHTML = html;
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
		func['overflow'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>CSS-атрибут</wht> <grn>overflow</grn>');
			
			var html = '<div id="txt" style="border:inset 1px; background-color:#eef; max-width:500px;">';
			html += '<p>Однажды, некая Лори Стек, владелица магазина в небольшом городке Талкитна, расположенного на Аляске, подобрала на улице бездомного котенка. Лори назвала его Стаббс (куцый хвост), так как за время бродяжничества котенок лишился своего хвоста. Поселившись в магазине своей новой хозяйки, Стаббс быстро стал любимцем покупателей, обладая веселым и добродушным нравом.</p>';
			html += '<p>Может ли писатель, опубликовавший за всю свою жизнь только одно произведение, стать известным на весь мир? Пожалуй, это больше похоже на сказку. Но именно так случилось с обычной американкой Маргарет Митчелл, чей роман «Унесенные ветром» стал настоящим бестеллером. Маргарет родилась в 1900 году в Атланте.</p>';
			html += '<p>Всем известна история о том, как деревенский паренек три недели шел с рыбным караваном из Холмогор в Москву, чтобы по поддельным дворянским документам поступить в академию. И звали его, как вы уже конечно же догадались, Михаил Ломоносов. Через несколько лет 12 способных студентов отобрали для обучения заграницей, в их число попал и будующий великий ученый.</p>';
			html += '</div>';
			document.getElementById('garevna_browser_win').innerHTML = html;
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
		func['margin_padding'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<wht>Блочная модель | CSS-атрибуты <grn>margin</grn> и <grn>padding</grn></wht>';
			garevna_html_css_library.create_browser_window (parent, txt);
			var outer = document.createElement('div');
			outer.id = "garevna_outer_block";
			outer.style.backgroundColor = '#960064';
			outer.style.color = 'white';
			document.getElementById('garevna_browser_win').appendChild(outer);
			outer.innerHTML = 'Внешний блок';
			var inner = document.createElement('div');
			inner.id = "garevna_inner_block";
			inner.style.backgroundColor = '#649600';
			inner.style.color = 'white';
			inner.innerHTML = 'Внутренний блок';
			outer.appendChild(inner);
			
			var obj = [ 
			    { id:"garevna_outer_block", name:"Внешний блок", type:'elem' },
				{ id:"garevna_inner_block", name:"Внутренний блок", type:'elem' }
			];
			var attrs = [
			    { name:'width', type:'text', default_val:'80%' },
				{ name:'height', type:'text', default_val:'80%' },
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
		func['box_sizing'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<wht>CSS-атрибут </wht><grn>box-sizing</grn>';
			garevna_html_css_library.create_browser_window (parent, txt);
			
			var block = document.createElement('div');
			block.id = 'outer-block';
			block.innerHTML = "Внешний блок";
			document.getElementById('garevna_browser_win').appendChild(block);
			elem = document.createElement('div');
			elem.id = 'inner-block';
			elem.innerHTML = "Внутренний блок";
			block.appendChild(elem);
			
			var help = '<grn>box-sizing</grn>: <mgnt>content-box</mgnt>;<br />';
			help += 'Значение по умолчанию.<br/>В размер блока включается только контент.<br />';
			help += '<grn>box-sizing</grn>: <mgnt>border-box</mgnt>;<br />';
			help += 'Ширина и высота блока включает не только контент, но и границу (<grn>border</grn)';
			help += ' и внутренние отступы (<grn>padding</grn>) */';
			garevna_lib.createPromptWin (help);
			help = '<grn>box-sizing</grn>: <mgnt>initial</mgnt>;<br />';
			help += 'Сброс в значение по умолчанию<br />';
			help += '<grn>box-sizing</grn>: <mgnt>inherit</mgnt>;<br />';
			help += 'Значение наследуется от родительского элемента';
			garevna_lib.createPromptWin (help);
			help = 'Упражнение:<br/>Установите значение <mgnt>border-box</mgnt>';
			help += ' для CSS-атрибута <grn>box-sizing</grn> внешнего блока, и значение ';
			help += '<mgnt>content-box</mgnt> для CSS-атрибута ';
			help += '<grn>box-sizing</grn> внутреннего блока. Теперь измените значение ';
			help += 'для CSS-атрибута <grn>box-sizing</grn> внутреннего блока ';
			help += 'на <mgnt>inherit</mgnt>, и посмотрите на результат';
			garevna_lib.createPromptWin (help);
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
		func['display_values'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<wht>CSS-атрибут </wht><grn>display</grn>';
			garevna_html_css_library.create_browser_window (parent, txt);
			
			var container = document.createElement('div');
			document.getElementById('garevna_browser_win').appendChild(container);
			var elem = document.createElement('span');
			container.appendChild(elem);
			elem.id = "sample_span1";
			elem.style.backgroundColor = '#aaa';
			elem.innerHTML = 'span 1';
			elem = document.createElement('span');
			container.appendChild(elem);
			elem.id = "sample_span2";
			elem.style.backgroundColor = '#999';
			elem.innerHTML = 'span 2';
			elem = document.createElement('span');
			container.appendChild(elem);
			elem.id = "sample_span3";
			elem.style.backgroundColor = '#bbb';
			elem.innerHTML = 'span 3';
			elem = document.createElement('h1');
			container.appendChild(elem);
			elem.id = "sample_h1";
			elem.style.backgroundColor = '#960064';
			elem.innerHTML = 'h1';
			elem = document.createElement('div');
			container.appendChild(elem);
			elem.id = "sample_div";
			elem.style.backgroundColor = '#649600';
			elem.innerHTML = 'div';
			elem = document.createElement('p');
			container.appendChild(elem);
			elem.id = "sample_p";
			elem.style.backgroundColor = '#ccc';
			elem.innerHTML = 'p';
			// ================================================================================================
			//                           Панель управления стилями элементов
			//=================================================================================================
			// for the future development...
			var help = [
			   "<mgnt>Строчно-блочный элемент</mgnt> Поведение как у строчного элемента; различие в том, что ему, как и блочному элементу,  можно задать <grn>width</grn> и <grn>height</grn>. <br />Удобно для размещения в одной строке блочных элементов различной высоты и ширины",
			   "<mgnt>Блочный элемент</mgnt> Располагается в отдельной строке. <br />Имеет ширину <grn>width</grn> и высоту <grn>height</grn>, внешние (<grn>margin</grn>) и внутренние (<grn>padding</grn>) отступы",
			   "<mgnt>Строчный элемент</mgnt>Строчные элементы располагаются в одной строке, последовательно. <br />Им нельзя задать <grn>width</grn>, <grn>height</grn> и <grn>margin</grn>.<br />Эти параметры зависят от параметров всей строки."
			   ];
			   var i;
			   for (i=0; i<help.length; i++) {
				   garevna_lib.createPromptWin (help[i]);
			   }
			// ==================================================================================================
			var obj = [
			    { id:"sample_span1", name:"#span1", type:'elem' },
				{ id:"sample_span2", name:"#span2", type:'elem' },
				{ id:"sample_span3", name:"#span3", type:'elem' },
				{ id:"sample_h1", name:"h1", type:'elem' },
				{ id:"sample_div", name:"div", type:'elem' },
				{ id:"sample_p", name:"p", type:'elem' }
			];
			var attrs = [
			    {
				    name:'display',
				    type:'select',
				    vals:[ 'inline','block','inline-block','list-item', 'initial', 'inherit', 'none' ],
				    default_val:'initial'
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
		func['homework'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent, 'Задание на дом');
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			var  html = '<div style="margin:5%; overflow:auto;">';
			html += '<h2>Размещение в одной строке</h2>';
			html += '<wht>Создайте на своей странице несколько элементов<mgnt>&lt;img&gt;</mgnt> с атрибутом ';
			html += '<grn>id</grn> <wht>=</wht> <yelw>&quot;main_header&quot;</yelw></wht><br />';
			html += '<wht>Задайте ширину изображений <yelw>100px</yelw> и разместите их в одной строке</wht>';
			html += '<h2>Скроллинг</h2>';
			html += '<wht>Создайте 3 блочных элемента <mgnt>&lt;p&gt;</mgnt> с фиксированными размерами: ';
			html += 'ширина <yelw>200px</yelw>, высота <yelw>100px</yelw></wht><br />';
			html += '<wht>Вставьте в эти элементы текст, превышающий размеры блоков</wht><br />';
			html += '<wht>Задайте параметры видимости текста, выходящего за границы блоков:</wht><br />';
			html += '<wht>первому блоку - текст, выходящий за границы блока, <yelw>обрезается</yelw> (не виден)</wht><br />';
			html += '<wht>второму блоку - текст, выходящий за границы блока, <yelw>виден</yelw></wht><br />';
			html += '<wht>третьему блоку - текст, выходящий за границы блока, <yelw>скроллингуется</yelw></wht>';
			html += '</div>';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// -----------------------------------------------------------------------------
		return function() {
			
			return func[func_name]();
		}
	}