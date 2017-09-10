// ==============================================================
//                       Courseware html & CSS
//                            module 05
// ==============================================================
var garevna_html_05 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	
	func['css_background'] = function () {
		garevna_html_css_library.clear();
		var txt = '<wht>Вставка фонового изображения с помощью <yelw>CSS</yelw></wht>';
		garevna_html_css_library.create_browser_window (parent, txt);
		
		var html = '<div id="garevna_div" style="width:300px; height:100px; border:inset 1px white;"></div>';
		html += '<button type="button" style="padding-left:40px;" id="garevna_button">КНОПКА</button>';
		html += '<div style="width:300px; height:100px;"></div>';
		html += '<div style="width:300px; height:100px;"></div>';
		html += '<div style="width:300px; height:100px;"></div>';
		document.getElementById('garevna_browser_win').innerHTML = html;
		var html_elem = [
			    {
					txt:'<body>',
					title:"Это элемент body"
				},
				{
					txt:'<div></div>',
					title:"Это элемент div"
				},
				{
					txt:'<button type="button">КНОПКА</button>',
					title:"Это элемент button"
				}
			];
			
			garevna_html_css_library.htmlInit(html_elem);
		var obj = [
			    { id:"garevna_browser_win", name:"body", type:'elem' },
				{ id:"garevna_div", name:"div", type:'elem' },
				{ id:"garevna_button", name:"button", type:'elem' }
			];
			var attrs = [];
			attrs [0] = {
				name:'background-image',
				type:'select',
				vals:[ 'url(/images/fon.gif)', 'url(/buttons/eye-closed.png)', 'url(/buttons/eye-opened.png)','url(/logos/facebook-icon.png)','url(/logos/twitter-icon.png)','url(/logos/vk-icon.png)', 'url(/logos/step-logo.png)', 'url(/logos/ukraine_revolution_3.png)', 'url(/buttons/feedback.png)' ],
				default_val:[
				    'url(/images/fon.gif)',
					'url(/logos/step-logo.png)',
					'url(/buttons/eye-opened.png)'
				]
			};
			attrs [1] = {
				name:'background-image',
				type:'text',
				default_val:[
				    'url(/images/fon.gif)',
					'url(/logos/step-logo.png)',
					'url(/buttons/eye-opened.png)'
				]
			};
			attrs [2] = {
				name:'background-repeat',
				type:'select',
				vals:[ 'repeat','repeat-x','repeat-y','no-repeat', 'initial', 'inherit' ],
				default_val:['repeat','no-repeat','no-repeat']
			};
			attrs [3] = {
				name:'background-size',
				type:'select',
				vals:[ 'contain','cover', 'initial', 'inherit' ],
				default_val:['','contain','contain']
			};
			attrs [4] = {
				name:'background-size',
				type:'text',
				default_val:['','contain','contain']
			};
			attrs [5] = {
					name:'background-position',
					type:'select',
					vals:[ 'left top','left center','left bottom','right top', 'right center', 'right bottom', 'center top', 'center center', 'center bottom', 'initial', 'inherit' ],
					default_val:['initial', 'center center', 'left center']
			};
			attrs [6] = {
				name:'background-attachment',
				type:'select',
				vals:['scroll','fixed','local','initial','inherit'],
				default_val:['inherit','inherit','inherit']
			};
			attrs [7] = {
				name:'background-attachment',
				type:'select',
				vals:['scroll','fixed','local','initial','inherit'],
				default_val:['inherit','inherit','inherit']
			};	
			garevna_html_css_library.cssInit(obj, attrs);
	}
	// ---------------------------------------------------------------------------------------------- background_image
	func['background_image'] = function() {
		garevna_html_css_library.clear();
		var txt = '<wht>Вставка фонового изображения с помощью <yelw>CSS</yelw></wht>';
		garevna_html_css_library.create_browser_window (parent, txt);
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = 'black';
		
		var html = '<wht><div><h3>Стиль элементов</h3><p>';
		html += 'В данном случае мы используем в качестве селекторов названия html-элементов</p>';
		html += '<mgnt>body {</mgnt>';
		html += '';
		html += '<cod><grn>background-image</grn>:<yelw> url(/images/fon.gif)</yelw>;';
		html += '<gray> URL фонового изображения</gray></cod>';
		html += '<cod><grn>background-repeat</grn>: <yelw>repeat</yelw>; ';
		html += '<gray>Повторение фонового изображения</gray></cod>';
		html += '<mgnt>}</mgnt><hr>';
		html += '<div><mgnt>body<br>{</mgnt></div>';
		html += '<cod><grn>background-image</grn>: <yelw> url(/images/fon.gif)</yelw>;</cod>';
		html += '<cod><grn>background-repeat</grn>: <yelw>no-repeat</yelw>;';
		html += '<gray>Фоновое изображение не повторяется</gray></cod>';
		html += '<cod><grn>background-size</grn>:<yelw>80px 60px</yelw>;';
		html += '<gray>Размеры фонового изображения</gray></cod>';
		html += '<cod><grn>background-position</grn>: <yelw>right top</yelw>; ';
		html += '<gray>Фоновое изображение размещается в правом верхнем углу страницы</gray></cod>';
		html += '<cod><grn>background-attachment</grn>: <yelw>fixed</yelw>; ';
		html += '<gray>Фоновое изображение не скроллингуется при прокрутке страницы</gray></cod>';
		html += '<div><mgnt>}</mgnt></div><hr>';
		html += '<comm><grn>background-repeat</grn>: <yelw>repeat | no-repeat | repeat-x | repeat-y</yelw></comm>';
		html += '<comm><grn>background-size</grn>: ';
		html += '<yelw>auto | ширина и высота | cover | contain | initial | inherit </yelw></comm>';
		html += '<comm><grn>background-attachment</grn>:';
		html += '<yelw>fixed | scroll | local | initial | inherit </yelw></comm>';
		
		html += '<h3>Создание класса</h3>';
		html += '<div><mgnt>.my_elem<br>{</mgnt>';
		html += '<cod><grn>background-image</grn>:<yelw> url(/images/fon.gif)</yelw>; ';
		html += '<gray>URL фонового изображения</gray></cod>';
		html += '<cod><grn>background-repeat</grn>:<yelw>repeat-x</yelw>; ';
		html += '<gray>Фоновое изображение повторяется только по горизонтали</gray></cod>';
		html += '<mgnt>}</mgnt></div><hr>';
		html += '<div><h3>Определение стиля элемента по уникальному идентификатору</h3>';
		html += '<mgnt>#my_div<br>{</mgnt>';
		html += '<cod><grn>background-image</grn>: <yelw>url(/images/fon.gif)</yelw>; ';
		html += '<gray>URL фонового изображения</gray></cod>';
		html += '<cod><grn>background-repeat</grn>:<yelw>repeat-y</yelw>; ';
		html += '<gray>Фоновое изображение повторяется только по вертикали</gray></cod>';
		html += '<mgnt>} </mgnt></div>';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	// ===================================================================================================== tag_image
	func['tag_image'] = function() {
		garevna_html_css_library.clear();
		var txt = '<wht>Вставка изображения</wht>';
		garevna_html_css_library.create_browser_window (parent, txt);
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = 'black';
		
		var html = '<wht><div><mgnt>&lt;img</mgnt> <grn>src</grn>="<yelw>/html-css/images/CSS-Edit.png</yelw>" ';
		html += '<grn>alt</grn>="<yelw>CSS3</yelw>" <grn>height</grn>="<yelw>50px</yelw>" ';
		html += '<grn>width</grn>="<yelw>50px</yelw>"<mgnt> /></mgnt></div><hr />';
		html += '<h3>Атрибуты тега &lt;img></h3>';
		html += '<div><grn>src</grn><gray>&nbsp;&nbsp;URL-адрес изображения</gray></div>';
		html += '<div><grn>alt</grn>';
		html += '<gray>&nbsp;&nbsp;альтернативный текст, который появляется вместо изображения</gray></div>';
		html += '<div><grn>height</grn>';
		html += '<gray>&nbsp;&nbsp;высота изображения</gray></div>';
		html += '<div><grn>width</grn>';
		html += '<gray>&nbsp;&nbsp;ширина изображения</gray></div>';
		html += '<blck><grn>longdesc</grn>';
		html += '<gray>&nbsp;&nbsp;URL-адрес детального описания изображения</gray></div></wht>';
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	// ===================================================================================================== body_image
	func['body_image'] = function() {
		garevna_html_css_library.clear();
		var txt = '<wht>Вставка фонового изображения с помощью <yelw>HTML</yelw></wht>';
		garevna_html_css_library.create_browser_window (parent, txt);
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = 'black';
		
		
		var html = '<wht><mgnt>&lt;body</mgnt> <grn>background</grn>="<yelw>garevna/www/buttons/menu_buttons.png</yelw>"';
		html += '<mgnt>>&lt;/body></mgnt></wht>';
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	// ---------------------------------------------------------------------------------------------------- homework
		func['homework'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent, 'Задание на дом');
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			var html = '<div style="margin:5%; overflow:auto;"><wht>';
			html += '<h2>1. Фоновые изображения</h2>';
			html += '<h3>Фон html-страницы</h3>';
			html += '<p>Сделать повторяющийся фон страницы с помощью html-форматирования</p>';
			html += '<p>Сделать неповторяющийся фон страницы с помощью css-форматирования, ';
			html += 'разместив фоновую картинку в правом нижнем углу и запретив ее скроллинг</p>';
			html += '<p>Сделать повторяющийся фон страницы, масштабируя фоновое изображение для ';
			html += 'достижения наилучшего эффекта</p>';
			html += '<h3>Фон элемента</h3>';
			html += '<p>Создать элемент с фоновым изображением, полностью покрывающим площадь элемента</p>';
			html += '<p>Создать элемент с фоновым изображением, полностью вписывающимся в площадь элемента</p>';
			html += '<h2>2. Вставка изображений</h2>';
			html += '<h3>Масштабирование и обтекание текстом</h3>';
			html += '<p>Вставьте на страницу картинку шириной 200px, обтекаемую текстом слева</p>';
			html += '<p>Вставьте на страницу картинку шириной на все окно</p>';
			html += '<h3>Галерея</h3>';
			html += '<p>Вставьте на страницу несколько изображений фиксированной ширины с расстояниями между ними ';
			html += 'в 20px. Сделайте появляющуюся рамку картинке, над которой находится указатель мышки.</p>';
			html += '</wht></div>';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
	return function() {
		return func[func_name]();
	}
}