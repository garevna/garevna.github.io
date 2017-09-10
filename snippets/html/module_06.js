// ==============================================================
//                       Courseware html & CSS
//                            module 06
// ==============================================================
var garevna_html_06 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	    // ---------------------------------------------------------------------------------------------- visibility
		func['usermap'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<wht>Атрибут <grn>image-map</grn> тега <mgnt>&lt;img></mgnt></wht>';
			garevna_html_css_library.create_browser_window (parent, txt);
			
			// ================================================================================================
			//                           Панель исходного кода html
			//=================================================================================================
			var area = [];
			area[0] = { name:'Южная Америка', left:0.26, top:0.57, right:0.388, bottom:1, ref:'https://en.wikipedia.org/wiki/South_America' };
			area[1] = { name:'Северная Америка', left:0.024, top:0.1, right:0.34, bottom:0.57, ref:'https://en.wikipedia.org/wiki/North_America' };
			area[2] = { name:'Африка', left:0.44, top:0.46, right:0.62, bottom:0.83, ref:'https://en.wikipedia.org/wiki/Africa' };
			var html_elem = [
			    { txt:'<img src="/chunks/html/mod-06/image_map.png" style="width:500px!important; height:270px!important;" usemap="#word">', title:"Исходное изображение" },
				{ txt:'<map name = "word">', title:"Карта ссылок" },
				{
					txt:'<area shape="rect" coords="130,155,194,270" href="' + area[0].ref + '" title="' + area[0].name + '" target="_blank">',
					title:area[0].name
				},
				{
					txt:'<area shape="rect" coords="12,30,170,155" href="' + area[1].ref + '" title="' + area[1].name + '" target="_blank">',
					title:area[1].name
				},
				{
					txt:'<area shape="rect" coords="220,125,310,225" href="' + area[2].ref + '" title="' + area[2].name + '" target="_blank">',
					title:area[2].name
				},
				{
					txt:'</map>',
					title:""
				}
			];
			var html = '';
			var i;
			for (i=0; i<html_elem.length; i++) {
				html += html_elem[i].txt;
			}
			document.getElementById('garevna_browser_win').innerHTML = html;
			
			garevna_html_css_library.htmlInit(html_elem);
		};
		// ---------------------------------------------------------------------------------------------- overflow
		func['pseudoclasses'] = function() {
			garevna_html_css_library.clear();
			var txt = '<div class="site-name">Псевдоклассы ссылок</div>';
			garevna_html_css_library.create_browser_window (parent, txt);
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			document.getElementById('garevna_browser_win').style.backgroundColor = '#dde';
			
			var help = "Оформление гиперссылок с помощью <yelw>CSS</yelw> помогает выделить их среди не-кликабельных ";
			help += "элементов страницы. Обычно гиперссылка отличается от остальных элементов тем, что она меняет";
			help += " свой вид, когда курсор оказывается над ней. Для управления внешним видом гиперссылки ";
			help += "в зависимости от различных условий в <yelw>CSS</yelw> существуют <grn>псевдо-классы</grn>";
			garevna_lib.createPromptWin (help);
			
			var html_elem = [
			    {
					txt:'<a class="myRef" href="http://www.online-convert.com/" target="_self">Онлайн-конвертер видео</a>',
					title:"Ссылка откроется в этом же окне"
				},
				{
					txt:'<a class="myRef" href="http://tut-cikavo.com/" target="_parent">TUT-CIKAVO</a>',
					title:"Ссылка откроется в этом же окне, поскольку у него нет родительского"
				},
				{
					txt:'<a class="myRef" href="https://www.youtube.com/" target="_blank">YouTube</a>',
					title:"Ссылка откроется в новом окне (вкладке)"
				}
			];
			
			var html = '';
			var i;
			for (i=0; i<html_elem.length; i++) {
				html += html_elem[i].txt;
			}
			document.getElementById('garevna_browser_win').innerHTML = html;
			garevna_html_css_library.htmlInit(html_elem);
			
			var obj = [
			    { css_selector:".myRef", name:".myRef", type:'css_selector' },
				{ css_selector:".myRef:hover", name:".myRef:hover", type:'css_selector' },
				{ css_selector:".myRef:visited", name:".myRef:visited", type:'css_selector' }
			];
			var attrs = [];
			attrs [0] = { name:'color', type:'text', default_val:['white','yellow','#555'] };
			attrs [1] = { name:'background-color', type:'text', default_val:['#649600','#960064','#aaa'] };
			attrs [2] = {
				name:'background-image',
				type:'text',
				default_val:[
				    'url(/buttons/eye-closed.png)',
					'url(/buttons/eye-opened.png)',
					'X'
				]
			};
			attrs [3] = { name:'background-repeat', type:'text', default_val:['no-repeat','no-repeat','X'] };
			attrs [4] = { name:'background-size', type:'text', default_val:['contain','contain','X'] };
			attrs [5] = {
					name:'background-position',
					type:'select',
					vals:[ 'left','center','right','top left', 'bottom right', 'inherit' ],
					default_val:'left'
			};
			attrs [6] = { name:'border', type:'text', default_val:['groove 1px white','inset 1px','none'] };
			attrs [7] = { name:'margin', type:'text', default_val:['10px','10px','X'] };
			attrs [8] = { name:'padding', type:'text', default_val:['5px 5px 5px 20px','5px 5px 5px 20px','X'] };
				
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------- margin_padding
		func['task'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<div class="site-name">Задание</div>';
			garevna_html_css_library.create_browser_window (parent, txt);
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			document.getElementById('garevna_browser_win').style.backgroundColor = '#dde';
			
			var html = '<div class="task-text">';
			html += 'Нужно вставить ссылки на любые веб-страницы, оформив стили ссылок по образцу</div>';
			html += '<div class="flex-div">';
			html += '<div>';
			html += '<h3>Ссылки должны открываться:</h3>';
			html += '<p>1) в новом окне;</p>';
			html += '<p>2) в родительском окне;</p>';
			html += '<p>3) в текущем окне;</p>';
			html += '<p>4) во фрейме с именем "myFrame".</p>';
			html += '</div>';
			html += '<div>';
			html += '<h3>Примеры адресов для ссылок:</h3>';
			html += '<p>http://www.online-convert.com/</p>';
			html += '<p>http://tut-cikavo.com/</p>';
			html += '<p>http://cikavo.net/</p>';
			html += '<p>https://www.youtube.com/</p>';
			html += '<p>http://24tv.ua</p>';
			html += '</div></div>';
			
			document.getElementById('garevna_browser_win').innerHTML = html;
		};
		// ---------------------------------------------------------------------------------------------- box_sizing
		func['image_map_picture'] = function() {
			garevna_html_css_library.clear();
			var txt = '<div class="site-name">Подготовка изображений</div>';
			garevna_html_css_library.create_browser_window (parent, txt);
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			document.getElementById('garevna_browser_win').style.backgroundColor = 'black';
			var html = '<wht><mgnt>image-map</mgnt> - это изображение с кликабельными зонами (участками). <br />';
			html += 'Подготовить такое изображение можно в программе <yelw>Adobe Illustrator</yelw>, ';
			html += 'используя сетку или направляющие для определения координат кликабельных участков.</wht> <br />';
			html += '<img class="image-map" src="/html-css/module-06/images/image-map.png" />';
			
			document.getElementById('garevna_browser_win').innerHTML = html;
		};
		// ---------------------------------------------------------------------------------------------- display_values
		func['image_map_attribs'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<div class="site-name">Атрибут usemap тега &lt;img&gt; и атрибут name тега &lt;map&gt;</div>';
			garevna_html_css_library.create_browser_window (parent, txt);
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			document.getElementById('garevna_browser_win').style.backgroundColor = 'black';
			var html = '<wht><p>Значение атрибута <grn>usemap</grn> тега <mgnt>&lt;img&gt;</mgnt> соответствует значению';
			html += ' атрибута <grn>name</grn> тега <mgnt>&lt;map&gt;</mgnt></p>';
			html += '<div class="flex-div task-text">';
			html += '<div><mgnt>&lt;img</mgnt> <grn>usemap</grn> = "<yelw>#word</yelw>"<mgnt>&gt;</mgnt></div>';
			html += '<div style="font-size:30px;">&nbsp;&nbsp;&hArr;&nbsp;&nbsp;</div>';
			html += '<div><mgnt>&lt;map</mgnt> <grn>name</grn> = "<yelw>word</yelw>"<mgnt>&gt;</mgnt></div>';
			html += '</div><hr />';
			html += '<p>Элемент <mgnt>&lt;map&gt;...&lt;/map&gt;</mgnt> является контейнером для элементов ';
			html += '<mgnt>&lt;area... /&gt;</mgnt></p>';
			html += '<div class="task-text"><div>';
			html += '<div><mgnt>&lt;map</mgnt> <grn>name</grn> = "<yelw>word</yelw>"<mgnt>&gt;</mgnt></div>';
			
			html += '<div style="margin-left:80px"><wht><mgnt>&lt;area</mgnt> <grn>shape</grn>="<yelw>rect</yelw>" <grn>coords</grn>="<yelw>X<sub>left</sub>, Y<sub>top</sub>, X<sub>right</sub>, Y<sub>bottom</sub></yelw>"<mgnt> /&gt;</mgnt></div>';
			//==============
			html += '<div style="margin-left:80px"><mgnt>&lt;area</mgnt> <grn>shape</grn>="<yelw>poly</yelw>" <grn>coords</grn>="<yelw>X<sub>1</sub>,&nbsp;Y<sub>1</sub>, X<sub>2</sub>,&nbsp;Y<sub>2</sub>,...&nbsp;X<sub>n</sub>,&nbsp;Y<sub>n</sub></yelw>"<mgnt> /&gt;</mgnt></div>';
			//============
			html += '<div style="margin-left:80px"><mgnt>&lt;area</mgnt> <grn>shape</grn>="<yelw>circle</yelw>" <grn>coords</grn>="<yelw>X<sub>центр</sub>, Y<sub>центр</sub>, R<sub>радиус</sub></yelw>"<mgnt> /&gt;</mgnt></div>';
			
			html += '<mgnt>&lt;/map&gt;</mgnt></div></div>';
			html += '<p>Элементы <mgnt>&lt;area ... /&gt;</mgnt>, как и элементы списка <mgnt>&lt;li&gt;</mgnt>, ';
			html += 'описывают содержимое контейнера</p><hr />';
			html += '<div class="task-text">';
			html += '<div>';
			html += '<p>Значение атрибута <grn>shape</grn> тега <mgnt>&lt;area&gt;</mgnt>:&nbsp;</p>';
			html += '<p><yelw>rect</yelw>&nbsp;-&nbsp;прямоугольник;&nbsp;</p>';
			html += '<p><yelw>circle</yelw>&nbsp;-&nbsp;круг;&nbsp;</p>';
			html += '<p><yelw>poly</yelw>&nbsp;-&nbsp;многоугольник;</p>';
			html += '</div><hr />';
			html += '<div>';
			html += '<p>Значение атрибута <grn>coords</grn> тега <mgnt>&lt;area&gt;</mgnt>:</p>';
			html += '<p><yelw>rect</yelw>:&nbsp;&nbsp;';
			html += '&nbsp;X<sub>left</sub>, Y<sub>top</sub>, X<sub>right</sub>, Y<sub>bottom</sub>';
			html += ' - координаты вершин прямоугольника</p>';
			html += '<p><yelw>circle</yelw>:&nbsp;&nbsp;';
			html += '&nbsp;X<sub>центр</sub>, Y<sub>центр</sub>, R<sub>радиус</sub></p>';
			html += '<p><yelw>circle</yelw>:&nbsp;&nbsp;&nbsp;X<sub>1</sub>,&nbsp;Y<sub>1</sub>,';
			html += '&nbsp;X<sub>2</sub>,&nbsp;Y<sub>2</sub>,...&nbsp;X<sub>n</sub>,&nbsp;Y<sub>n</sub>';
			html += ' - координаты вершин многоугольника</p>';
			html += '<p>Если координаты первой и последней точек не совпадают, браузер добавит точку, ';
			html += 'чтобы замкнуть прямоугольник</p></div>';
			html += '<div>';
			html += '<p>Значение атрибута <grn>href</grn> тега <mgnt>&lt;area&gt;</mgnt> - URL ресурса,';
			html += ' на который будет произведен переход при клике на описанной атрибутами <grn>shape</grn> и';
			html += ' <grn>coords</grn> области</p></div><div>';
			html += '<p>Значение атрибута <grn>target</grn> тега <mgnt>&lt;area&gt;</mgnt> - URL ресурса,';
			html += ' на который будет произведен переход при клике на описанной атрибутами <grn>shape</grn> ';
			html += 'и <grn>coords</grn> области</p></div>';
			html += '<div>';
			html += '<p>Значение атрибута <grn>target</grn> тега <mgnt>&lt;area&gt;</mgnt>:</p>';
			html += '<p><yelw>_blank</yelw></p> - открыть ссылку в новом окне (вкладке)';
			html += '<p><yelw>_parent</yelw></p> - открыть ссылку в родительском фрейме';
			html += '<p><yelw>_self</yelw></p> - открыть ссылку в том же фрейме, в котором размещена ссылка';
			html += '<p><yelw>_top</yelw></p> - открыть ссылку в том же окне';
			html += '<p><yelw>id фрейма</yelw></p> - открыть ссылку во фрейме с указанным идентификатором';
			html += '</div></div>';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// ---------------------------------------------------------------------------------------------------- homework
		func['homework'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent, 'Задание на дом');
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			var html = '<wht><p>Создайте изображение с кликабельными участками (<mgnt>image-map</mgnt>),';
			html += ' обеспечьте переходы по абсолютным и относительным адресам при клике на этих участках</p>';
			html += '</wht>';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// -----------------------------------------------------------------------------
		return function() {
			return func[func_name]();
		}
	}