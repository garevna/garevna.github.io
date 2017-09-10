// ==============================================================
//                       Courseware html & CSS
//                            module 04
// ==============================================================
var garevna_html_04 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	// ===================================================================================================== selectors
	func['selectors_ierarchy'] = function() {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Иерархические селекторы (демо)</wht>');
		var html = '';
		html += '<section style = "background-color:rgba(100,100,0,0.7); padding:2% 5%; font-size:14px;"><span class="dark_gray">Элемент section</span>';
		html += '<div style="width:90%;background-color:rgba(150,150,150,0.7);border: inset 1px; box-shadow: inset 2px 2px 2px rgba(0,0,0,0.5); height:auto; padding:10px;"><span class="dark_gray">Элемент div</span>';
		html += '<p class = "child descendant" style="width:40%;margin-left:5%;">Элемент p</p>';
		html += '<p class = "child descendant" style="width:40%;margin-left:5%;">Элемент p</p>';
		html += '<p class = "child descendant" style="width:40%;margin-left:5%;">Элемент p</p>';
		html += '<aside style="width:70%;margin-left:40px;background-color:rgba(255,255,255,0.5);border: inset 1px; box-shadow: inset 2px 2px 2px rgba(0,0,0,0.5); height:100px; padding:2% 5%; "><span class="dark_gray">Элемент aside</span>';
		html += '<p class = "descendant" style="width:50%;margin-left:5%;">Элемент p</p>';
		html += '<p class = "descendant" style="width:50%;margin-left:5%;">Элемент p</p>';
		html += '</aside>';
		html += '<p class = "child descendant" style="width:40%;margin-left:5%;">Элемент p</p>';
		html += '</div>';
		html += '<p class = "next sibling" style="width:30%;margin-left:5%;">Элемент p</p>';
		html += '<p class = "sibling" style="width:40%;margin-left:5%;">Элемент p</p>';
		html += '<p class = "sibling" style="width:40%;margin-left:5%;">Элемент p</p>';
		html += '</section>';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
		var space1 = '&nbsp;&nbsp;&nbsp;&nbsp;';
		var space2 = space1 + space1;
		var space3 = space2 + space1;
			var html_elem = [
		    { title:'', txt:'<section>Элемент section' },
			{ title:'', txt: space1 + '<div>Элемент div' },
			{ title:'', txt: space2 + '<p>Элемент p</p>', class:"child" },
			{ title:'', txt: space2 + '<p>Элемент p</p>', class:"child" },
			{ title:'', txt: space2 + '<p>Элемент p</p>', class:"child" },
			{ title:'', txt: space2 + '<aside>Элемент aside' },
			{ title:'', txt: space3 + '<p>Элемент p</p>', class:"descendant" },
			{ title:'', txt: space3 + '<p>Элемент p</p>', class:"descendant" },
			{ title:'', txt: space2 + '</aside>' },
			{ title:'', txt: space2 + '<p>Элемент p</p>', class:"child" },
			{ title:'', txt: space1 + '</div>' },
			{ title:'', txt: space1 + '<p>Элемент p</p>', class:"next" },
			{ title:'', txt: space1 + '<p>Элемент p</p>', class:"sibling" },
			{ title:'', txt: space1 + '<p>Элемент p</p>', class:"sibling" },
			{ title:'', txt: '</section>' }
		];
		
		garevna_html_css_library.htmlInit(html_elem);
		
			var obj = [ 
	                 { id:"descendant", name:"div p", type:'class' },
					 { id:"child", name:"div > p", type:'class' },
					 { id:"sibling", name:"div ~ p", type:'class' },
			         { id:"next", name:"div + p", type:'class' }
		    ];
			var attrs = [
			         {
						 name:'font-family',
						 type:'text',
						 default_val:[ 'BetinaScriptC','StudioScriptC','Comic Sans MS', 'Arial' ]
					 },
					 {
						 name:'border',
						 type:'text',
						 default_val:[ 'inset 1px','solid 1px white','solid 1px yellow', 'solid 1px red' ]
					 },
					 {
						 name:'background-color',
						 type:'text',
						 default_val:[ 'rgba(150,0,100,0.7)','rgba(100,150,0,0.7)','transparent', 'transparent' ]
					 },
					 {
						 name:'box-shadow',
						 type:'text',
						 default_val:[ 'inset 4px 4px 4px rgba(0,0,0,0.7)','2px 2px 2px rgba(0,0,0,0.7)', '2px 2px 2px rgba(0,0,0,0.7)', 'inset 2px 2px 2px rgba(0,0,0,0.7)' ]
					 },
					 {
						 name:'color',
						 type:'text',
						 default_val:[ 'yellow','white', 'black', 'white' ]
					 }];
			garevna_html_css_library.cssInit(obj, attrs);
	};
	// ===================================================================================================== selectors
	func['tag_selectors'] = function() {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Селекторы элементов (теговые)</wht>');
		var html = '';
		html += '<div class = "_div"><h3 class="_h3"></h3><p class="_p"></p><h3 class="_h3"></h3><p class="_p"></p>';
		html += '</div><div class = "_div"></div>';	
		document.getElementById('garevna_browser_win').innerHTML = html;
		
			var html_elem = [
		    { title:'', txt:'<div>', class:"_div" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3></h3>', class:"_h3" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p></p>', class:"_p" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3></h3>', class:"_h3" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p></p>', class:"_p" },
			{ title:'', txt:'</div>' },
			{ title:'', txt:'<div></div>', class:"_div" }
		];
		
		garevna_html_css_library.htmlInit(html_elem);
		
			var obj = [ 
	                 { id:"_div", name:"div", type:'class' },
			         { id:"_h3", name:"h3", type:'class' },
			         { id:"_p", name:"p", type:'class' }
		    ];
			var attrs = [
			         {
						 name:'font-size',
						 type:'text',
						 default_val:[ '100%','130%','100%' ]
					 },
					 {
						 name:'background-color',
						 type:'text',
						 default_val:[ '#F7F5C5','#ffa', '#dde' ]
					 },
					 {
						 name:'color',
						 type:'text',
						 default_val:[ 'black','green', 'gray' ]
					 }];
			garevna_html_css_library.cssInit(obj, attrs);
	};
	// =============================================================================================== class_selectors
	func['class_selectors'] = function() {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Селекторы элементов (теговые)</wht>');
		var html = '';
		html += '<div class = "_article"><h3 class="_h3"></h3><p class="_p"></p><h3 class="_h3"></h3><p class="_p"></p>';
		html += '</div><div class = "_div"></div>';	
		document.getElementById('garevna_browser_win').innerHTML = html;
		
			var html_elem = [
		    { title:'', txt:'<div class = "article">', class:"_article" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3 class="header"></h3>', class:"_h3" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p class="text"></p>', class:"_p" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3 class="header"></h3>', class:"_h3" },
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p class="text"></p>', class:"_p" },
			{ title:'', txt:'</div>' },
			{ title:'', txt:'<div class = "myDiv"></div>', class:"_div" }
		];
		
		garevna_html_css_library.htmlInit(html_elem);
		
			var obj = [ 
	                 { id:"_article", name:".article", type:'class' },
					 { id:"_div", name:".myDiv", type:'class' },
			         { id:"_h3", name:".header", type:'class' },
			         { id:"_p", name:".text", type:'class' }
		    ];
			var attrs = [
			         {
						 name:'border',
						 type:'text',
						 default_val:[ 'inset 1px white','inset 1px','none','none' ]
					 },
					 {
						 name:'font-size',
						 type:'text',
						 default_val:[ '100%','130%','100%','110%' ]
					 },
					 {
						 name:'background-color',
						 type:'text',
						 default_val:[ '#C4F7BE','#F7F5C5', 'transparent', 'transparent' ]
					 },
					 {
						 name:'color',
						 type:'text',
						 default_val:[ '#649600','#0d9', 'black', '#960064' ]
					 }];
			garevna_html_css_library.cssInit(obj, attrs);
	};
	// ================================================================================================ attr_selectors
	func['attr_selectors'] = function() {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Атрибутивные селекторы</wht>');
		var html_elem = [
		    {
				title:'[title]',
				txt:'<div title="Это заголовок (шапка)">Атрибутивные селекторы</div>',
				cls:'<div class="titled" title="[title]">Атрибутивные селекторы</div>'
			},
			{
				title:'[type="button"]',
				txt:'<input type="button" value="Кнопка" />',
				cls:'<input type="button" title="[type=' + "'" + 'button' + "'" + ']" class="btn" value="Кнопка" />'
			},
			{
				title:'[type="text"]',
				txt:'<input type="text" placeholder="Введите текст" />',
				cls:'<input class="txt" type="text" title="[type=' + "'" + 'text' + "'" + ']" placeholder="Введите текст" />'
			},
			{
				title:'[src]',
				txt:'<img src="/buttons/comp.png" />',
				cls:'<img class="src" src="/buttons/comp.png" title="[src]" />'
			},
			{
				title:'[style]',
				txt:'<div style="width:80%; height:auto;">Можно определить стиль для всех элементов с заданными атрибутами тегов. Например, для всех элементов, у которых есть атрибуты title, или style, или src. Чтобы указать, что стиль относится к этим элементам, нужно использовать атрибутивные селекторы стиля. Атрибутивные селекторы заключаются в квадратные скобки [], внутри которых находится название атрибута</div>',
				cls:'<div class="stl" style="width:80%; height:auto;" title="[style]">Можно определить стиль для всех элементов с заданными атрибутами тегов. Например, для всех элементов, у которых есть атрибуты title, или style, или src. Чтобы указать, что стиль относится к этим элементам, нужно использовать атрибутивные селекторы стиля. Атрибутивные селекторы заключаются в квадратные скобки [], внутри которых находится название атрибута</div>'
			}
		];
		var html = '<div style="border:inset 1px; width:80%; margin-left:5%;">';
		var j;
		for (j=0; j<html_elem.length; j++) {
			html += html_elem[j].cls;
		}
		
		document.getElementById('garevna_browser_win').innerHTML = html;
		
		garevna_html_css_library.htmlInit(html_elem);
		
		var obj = [ 
	        { id:"titled", name:"[title]", type:'class' },
			{ id:"btn", name:'[type="button"]', type:'class' },
			{ id:"txt", name:'[type="text"]', type:'class' },
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
		garevna_html_css_library.create_browser_window (parent,'<wht>Идентификаторные селекторы</wht>');
		var html_elem = [ 
		    { title:'#header', txt:'<div id="header">Идентификаторные селекторы</div>', class:'' },
			{ title:'#btn', txt:'<input id="btn" type="button" value="Кнопка" />', class:'' },
			{ title:'#txt', txt:'<input type="text" id="txt" />', class:'' },
			{ title:'#picture', txt:'<img id="picture" src="/buttons/comp.png" />', class:'' },
			{ 
			    title:'#myDiv',
				txt:'<div id="myDiv" style="width:80%; height:auto;">Можно определить стиль элемента с заданным уникальным идентификатором (значением атрибута id). В этом случае для привязки стиля к элементу используются идентификаторные селекторы. В данном примере у нас есть элементы с идентификаторами header, btn, txt, picture и myDiv. Идентификаторные селекторы начинаются с знака хеш (#)</div>',
				class:''
			}
		];
		var html = '<div style="border:inset 1px; width:80%; margin-left:5%;">';
		var j;
		for (j=0; j<html_elem.length; j++) {
			html += html_elem[j].txt;
		}
		
		document.getElementById('garevna_browser_win').innerHTML = html;
		document.getElementById('header').title = html_elem[0].title;
		document.getElementById('btn').title = html_elem[1].title;
		document.getElementById('txt').title = html_elem[2].title;
		document.getElementById('picture').title = html_elem[3].title;
		document.getElementById('myDiv').title = html_elem[4].title;
		
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
		garevna_html_css_library.create_browser_window (parent,'<wht>Селекторы псевдоклассов</wht>');
		var html = '<div style = "float:left;">';
		html += '<input type="checkbox" id="checkbox" />';
		html += '<span>Селекторы псевдо-классов</span><br />';
		html += '<input type="button" id="btn" value="Кнопка" />';
		html += '<input class="tmp_input" type="email" />';
		html += '<input class="tmp_input" type="number" />';
		html += '<input class="tmp_input" type="url" />';
		html += '</div>';
		html += '<img id="picture" src="/buttons/comp.png" />';
		html += '<div id="container">Псевдоклассы позволяют изменять внешний вид элемента в ответ на действие пользователя (<yelw>:hover</yelw> - при наведении указателя мышки на элемент, <yelw>:checked</yelw> - если элемент-переключатель в состоянии «включено», <yelw>:empty</yelw> - если элемент пустой, <yelw>:valid</yelw> - если в поле ввода введено правильное значение)</div>';
		document.getElementById('garevna_browser_win').innerHTML = html;
		
		var html_elem = [
		    { title:'', txt:'<input type="checkbox" /><span>Селекторы псевдо-классов</span><br />', class:'' },
			{ title:'', txt:'<input type="button" value="Кнопка" />', class:'' },
			{ title:'', txt:'<input type="email" />', class:'tmp_input' },
			{ title:'', txt:'<input type="number" />', class:'tmp_input' },
			{ title:'', txt:'<input type="url" />', class:'tmp_input' },
			{ title:'', txt:'<img src="/buttons/comp.png" />', class:'' },
			{
				title:'',
				txt:'<div id="container">Псевдоклассы позволяют изменять внешний вид элемента в ответ на действие пользователя (:hover - при наведении указателя мышки на элемент, :checked - если элемент-переключатель в состоянии «включено», :empty - если элемент пустой, :valid - если в поле ввода введено правильное значение)</div>',
				class:''
			}
		];
		
		garevna_html_css_library.htmlInit(html_elem);
		var obj = [ 
	        { css_selector:"#container:hover", name:"#container:hover", type:'css_selector' },
			{ css_selector:'#btn:hover', name:'input[type="button"]:hover', type:'css_selector' },
			{ css_selector:".tmp_input:valid", name:"input:valid", type:'css_selector' },
			{ css_selector:"#picture:hover", name:"img:hover", type:'css_selector' },
			{ css_selector:"#checkbox:checked + span", name:"input[type='checkbox']:checked + span", type:'css_selector' }
		];
		txtShadow = '0px 0px 1px rgba(0,0,0,0.5)';
		bxShadow = 'inset 2px 2px 2px rgba(0,0,0,0.7)';
		var attrs = [
			{ name:'margin',type:'text',default_val:['10px','20px','15px','20px','10px'] },
			{ name:'display',type:'text',default_val:['block','block','inherit','inherit','inherit'] },
			{
				name:'box-shadow',
				type:'text',
				default_val:[bxShadow,'outset 3px 3px 2px rgba(0,0,0,0.5)',bxShadow,bxShadow,bxShadow]
			},
			{ name:'padding', type:'text', default_val:['20px','8px','4px 8px','20px','0'] },
			{ name:'color', type:'text', default_val:['#fff','green','white','black','#888'] },
			{ name:'font-size', type:'text', default_val:['120%','90%','100%','100%','100%'] },
			{
				name:'background-color',
				type:'text',
				default_val:['#080','#ddc','green','transparent','white']
			}
		];
		garevna_html_css_library.cssInit(obj, attrs);
	};
	// ============================================================================================== 
	func['ierarchy_selectors'] = function() {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Иерархические селекторы</wht>');
		var html = '<div class="article">';
		html += '<h3 class="_h3"></h3>';
		html += '<p class="_p"></p>';
		html += '<div class="_div">';
		html += '<h3 class="_h3"></h3>';
		html += '<p class="_p"></p>';
		html += '<div class="_div"></div>';
		html += '</div>';
		html += '</div>';
		html += '<div class="article">';
		html += '<div class="_div"></div>';
		html += '<h3 class="_h3"></h3>';
		html += '<div class="_div"></div>';
		html += '<figure class="_figure">*</figure>';
		html += '<p class = "_p"></p>';
		html += '<figure class="_figure">***</figure>';
		html += '</div>';
		document.getElementById('garevna_browser_win').innerHTML = html;
		
		var html_elem = [ 
		    {
				title:'Контейнер 1 (родительский элемент)',
				txt:'<article>',
				class:'article'
			},
			{
				title:'Контейнер 2 - дочерний элемент контейнера 1',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div>',
				class:'_div'
			},
			{
				title:'Дочерний элемент (потомок 1) контейнера 2',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3></h3>',
				class:'_h3'
			},
			{
				title:'Дочерний элемент (потомок 2) контейнера 2',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p></p>',
				class:'_p'
			},
			{
				title:'Дочерний элемент (потомок 2) контейнера 2',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div></div>',
				class:'_div'
			},
			{ title:'', txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>', class:'' },
			{ title:'', txt:'</article>', class:'' },
			
			{
				title:'Контейнер 3',
				txt:'<article>',
				class:'article'
			},
			{
				title:'Дочерний элемент (потомок 1) контейнера 3',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div></div>',
				class:'_div'
			},
			{
				title:'Дочерний элемент (потомок 2) контейнера 3',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3></h3>',
				class:'_h3'
			},
			{
				title:'Дочерний элемент (потомок 3) контейнера 3',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div></div>',
				class:'_div'
			},
			{
				title:'Дочерний элемент (потомок 4) контейнера 3',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<figure></figure>',
				class:'_figure'
			},
			{
				title:'Дочерний элемент (потомок 5) контейнера 3',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p></p>',
				class:'_p'
			},
			{
				title:'Дочерний элемент (потомок 6) контейнера 3',
				txt:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<figure></figure>',
				class:'_figure'
			},
			{ title:'', txt:'</article>', class:'' }
		];
		
		garevna_html_css_library.htmlInit(html_elem);
		var obj = [ 
	        { css_selector:".article > ._p", name:"article > p", type:'css_selector' },
			{ css_selector:".article ._h3", name:'article h3', type:'css_selector' },
			{ css_selector:"._h3 ~ ._div", name:'h3~div', type:'css_selector' },
			{ css_selector:"._div + ._figure", name:"div + figure", type:'css_selector' }//,
			//{ css_selector:"* > *", name:"* > *", type:'css_selector' }
		];
		txtShadow = '0px 0px 1px rgba(0,0,0,0.5)';
		bxShadow = '2px 2px 1px rgba(0,0,0,0.7)';
		var attrs = [
			{ name:'color', type:'text', default_val:['black','green','#960064','blue'] },
			{ name:'background-color',type:'text',default_val:['transparent','transparent','transparent','yellow'] }
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
        html += '<h2>1. Маркированные списки</h2>';
        html += '<h3>Маркеры</h3>';
		
        html += '<p>Создайте маркированный список, выбрав в качестве маркера картинку</p>';
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
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	return function() {
			return func[func_name]();
	}
}