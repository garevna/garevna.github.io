// ==============================================================
//                       Courseware html & CSS
//                            module 08
// ==============================================================
var garevna_html_08 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	
	// ---------------------------------------------------------------------------------------------- absolute_position
	func['absolute_position'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Абсолютное позиционирование</wht>');
			var $window = document.getElementById('garevna_browser_win');
			$window.style.backgroundImage = "url()";
			$window.style.backgroundColor = "black";
			var _left = '<mgnt>left</mgnt>';
			var _top = '<mgnt>top</mgnt>';
			var _right = '<mgnt>right</mgnt>';
			var _bottom = '<mgnt>bottom</mgnt>';
			var html = '<p>При абсолютном позиционировании элемент существует вне основного потока.</p>';
			html += '<p>Его положение задаётся относительно границ окна браузера с помощью CSS-атрибутов ';
			html += _left + ', ' + _top + ', ' + _right + ' и ' + _bottom + '.</p><p>При этом у атрибутов ';
			html += _left + ' и ' + _top + ' приоритет выше, чем у ' + _right + ' и ' + _bottom + '.</p><p class="gray">';
			html += 'Если ' + _left + ' и ' + _right + ' противоречат друг другу, то значение ' + _right + ' игнорируется. ';
			html += '</p><p class="gray">То же самое происходит и с атрибутами ' + _top + ' и ' + _bottom + '.</p>';
			html += '<p>Если ' + _left + ' задать отрицательное значение, то элемент уйдёт за левую границу окна браузера. ';
			html += '<p>Аналогично с отрицательным значением атрибута ' + _top + ': ';
			html += 'элемент скроется за верхней границей окна браузера.</p>';
			html += '<p class="gray">Полоса скроллинга при этом не появится.';
			html += ' Таким образом можно спрятать элемент от просмотра.</p>';
			html += '<p>Когда значение атрибута ' + _left + ' превышает ширину окна браузера или ' + _right; 
			html += ' имеет отрицательное значение, появляется горизонтальная полоса прокрутки.</p>';
			html += '<p>Полоса вертикального скроллинга веб-страницы появляется, когда значение атрибута ' + _top;
			html += ' отрицательное, или значение атрибута' + _bottom + ' превышает высоту окна браузера.</p>';
			html += '<p>Если ширина <mgnt>width</mgnt> элемента не указана явно, то она вычисляется путем вычитания из'
			html += " ширины окна браузера значений " + _left + " и " + _right + " (если они определены).</p>";
			html += '<p>Аналогично с высотой элемента <mgnt>height</mgnt>: если она не задана, то вычисляется на основании';
			html += ' значений атрибутов ' + _top + " и " + _bottom + ".</p>";
			html += '';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// ---------------------------------------------------------------------------------------------- fixed_position
	func['fixed_position'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Фиксированное позиционирование</wht>');
			var $window = document.getElementById('garevna_browser_win');
			$window.style.backgroundImage = "url()";
			$window.style.backgroundColor = "black";
			var html = '<p>При фиксированом позиционировании элемента (как и при абсолютном) он вырывается ';
			html += 'из сновного потока.</p>';
			html += '<p>Однако в отличие от абсолютного позиционирования, при прокрутке страницы элемент остается на месте.</p>';
			html += '<p>Ещё одно отличие фиксированого позиционирования от абсолютного заключается в том, что при выходе элемента за границы окна браузера полоса скроллинга не появляется.</p>';
			
			html += '';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// -------------------------------------------------------------------------------------------- relative_position
	func['relative_position'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Относительное позиционирование</wht>');
			var $window = document.getElementById('garevna_browser_win');
			$window.style.backgroundImage = "url()";
			$window.style.backgroundColor = "black";
			var _left = '<mgnt>left</mgnt>';
			var _top = '<mgnt>top</mgnt>';
			var _right = '<mgnt>right</mgnt>';
			var _bottom = '<mgnt>bottom</mgnt>';
			var html = '<p>Элементы позиционируются относительно своего нормального (статического) положения.</p>';
			html += '<p>Добавление атрибутов <mgnt>left</mgnt>, <mgnt>top</mgnt>, <mgnt>right</mgnt> и <mgnt>bottom</mgnt>';
			html += ' приводит к сдвигу элемента относительно его положения в нормальном потоке (static). </p>';
			html += '<p>Положительное значение <mgnt>left</mgnt> приводит к сдвигу элемента вправо относительно его левой ';
			html += 'границы, отрицательное — влево. </p>';
			html += '<p>Положительное значение <mgnt>top</mgnt> задаёт сдвиг элемента вниз, отрицательное — сдвиг вверх.</p>';
			html += '<p>Атрибуты <mgnt>bottom</mgnt> и <mgnt>right</mgnt> дают противоположный эффект. </p>';
			html += '<p>Если атрибут <mgnt>right</mgnt> имеет положителное значение, то элемент сдвигается влево ';
			html += 'относительно его правого края; если же атрибут <mgnt>right</mgnt> имеет отрицательное значение, то ';
			html += 'элемент сдвигается вправо.</p>';
			html += '<p>При положительном значении атрибута <mgnt>bottom</mgnt> элемент сдвигается вверх, ';
			html += 'а при отрицательном смещается вниз.</p><p>&nbsp;</p><hr />';
			html += '<p><yelw>При отностельном позиционировании элемента его смещение относительно исходного положения ';
			html += 'приводит к образованию "пустоты" в основном потоке (место, которое занимал элемент, не заполняется ';
			html += 'следующими за ним элементами).</yelw></p>';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// ---------------------------------------------------------------------------------------------- margin_padding
		func['container_position'] = function() {
			
			garevna_html_css_library.clear();
			var txt = '<wht>Позиционирование контейнера и его содержимого</wht>';
			garevna_html_css_library.create_browser_window (parent, txt);
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			//document.getElementById('garevna_browser_win').style.backgroundColor = 'black';
			var outer = document.createElement('div');
			outer.id = "garevna_outer_block";
			outer.style.border = 'solid 2px yellow';
			outer.style.color = 'yellow';
			document.getElementById('garevna_browser_win').appendChild(outer);
			outer.innerHTML = 'Контейнер';
			var inner = document.createElement('div');
			inner.id = "garevna_inner_block";
			inner.style.border = 'solid 2px green';
			inner.style.color = 'green';
			inner.innerHTML = 'Содержимое';
			outer.appendChild(inner);
			
			var obj = [ 
			    { id:"garevna_outer_block", name:"Контейнер", type:'elem' },
				{ id:"garevna_inner_block", name:"Содержимое", type:'elem' }
			];
			var attrs = [
			    {
					name:'position',
					type:'select',
					vals:[ 'static','relative', 'absolute', 'fixed' ],
					default_val:['relative','absolute']
				},
				{ name:'top', type:'text', default_val:['10%','50px'] },
				{ name:'left', type:'text', default_val:['10%','50px'] },
				{ name:'bottom', type:'text', default_val:['10%','50px'] },
				{ name:'right', type:'text', default_val:['10%','50px'] },
				{ name:'width', type:'text', default_val:['80%','auto'] },
				{ name:'height', type:'text', default_val:['80%','auto'] }
			];
				
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------------- homework
		func['homework'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent, 'Задание на дом');
			document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
			var  html = '<div style="margin:5%; overflow:auto;">';
			html += '<h2>Фиксированное позиционирование элементов</h2>';
			html += '<h3>Фиксированный заголовок страницы</h3>';
			html += '<p>Создайте на своей странице элемент <grn>&lt;div&gt;</grn> с атрибутом ';
			html += '<mgnt>id</mgnt> = <yelw>&quot;main_header&quot;</yelw></p><p>Закрепить элемент ';
			html += 'вверху страницы, задать ширину на весь экран, высоту <yelw>100px</yelw>, цвет фона</p>';
			html += '<p>Оформить фиксированный заголовок с помощью CSS (вставить картинку-логотип, оформить название)</p>';
			html += '<h3>Фиксированный подвал страницы</h3>';
			html += '<p>Создать элемент с фиксированным позиционированием внизу страницы</p>';
			html += '<p>Задать ширину на весь экран, высоту  <yelw>50px</yelw>, цвет фона, вставить текст</p>';
			html += '';
			html += '';
			html += '<wht></wht>';
			html += '</div>';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
		// -----------------------------------------------------------------------------
		return function() {
			
			return func[func_name]();
		}
	}