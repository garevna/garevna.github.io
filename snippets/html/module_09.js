// ==============================================================
//                       Courseware html & CSS
//                            module 09
// ==============================================================
var garevna_html_09 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	
	// ---------------------------------------------------------------------------------------------- introduction
	func['introduction'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Обтекание элементов</wht>');
			var $window = document.getElementById('garevna_browser_win');
			//$window.style.backgroundImage = "url()";
			//$window.style.backgroundColor = "black";
			var html = '<div id="garevna_outer_block"><img id="garevna_image_1" src="/buttons/work-1.png" />';
			html += '&nbsp;Элементы с установленным атрибутом <span class="green_white">float</span> автоматически ';
			html += 'становятся блочными элементами. Они позиционируются вне основного потока и смещаются влево или ';
			html += 'вправо в зависимости от значения атрибута <span class="green_white">float</span>. Содержимое ';
			html += 'страницы обтекает такие элементы, но, вопреки нормальной логике, эти элементы называют плавающими ';
			html += '(хотя, на самом деле, плавает как раз контент вокруг них). <br>';
			html += 'Для плавающих блоков нужно устанавливать размеры (<span class="green_white">width</span> | ';
			html += '<span class="green_white">height</span>), иначе результат позиционирования будет непредсказуемым.';
			html += ' Главное - задать ширину плавающего блока (<span class="green_white">width</span>), иначе он, как и ';
			html += 'обычные блоки, займет весь родительский блок, не оставив места для обтекания остальным контентом.';
			html += '<div id="garevna_inner_block_1">Внимание! Плавающий блок может перекрывать смежные блочные элементы ';
			html += 'нормального потока. Плавающий блок - это элемент, исключенный из нормального потока. Поэтому ';
			html += 'основной поток игнорирует его, не оставляя для него места.</div><!-- garevna_inner_block_1 -->';
			html += '<div id="garevna_inner_block_2"><img id="garevna_image_2" src="/buttons/work.png" />';
			html += 'Если у нас есть плавающий элемент, смещенный к правой или левой границе родительского блока,';
			html += ' то следующий плавающий в том же направлении элемент будет смещаться к границе первого, и так далее.';
			html += ' Когда ширина контейнера (родительского элемента, внутри которого расположены плавающие элементы)';
			html += ' будет запонена, плавающие элементы будут перемещаться вниз.</div><!-- garevna_inner_block_2 -->';
			html += 'Разметка html-страниц с плавающими элементами зачастую вызывает некоторые сложности; в частности, ';
			html += 'контейнер (родительский элемент) не растягивается по вертикали, чтобы полностью вместить ';
			html += 'плавающие элементы</div><!-- garevna_outer_block -->';
			html += '';
			html += '';
			html += '';
			html += '';
			document.getElementById('garevna_browser_win').innerHTML = html;
			var obj = [ 
				{ id:"garevna_inner_block_1", name:"Внутренний блок 1", type:'elem' },
				{ id:"garevna_inner_block_2", name:"Внутренний блок 2", type:'elem' },
				{ id:"garevna_image_1", name:"Изображение 1", type:'elem' },
				{ id:"garevna_image_2", name:"Изображение 2", type:'elem' }
			];
			var attrs = [
			    {
					name:'float',
					type:'select',
					vals:[ 'left','right', 'none' ],
					default_val:'none'
				},
			    { name:'width', type:'text', default_val:['auto','auto','70px','70px'] },
				{ name:'height', type:'text', default_val:['auto','auto','auto','auto'] },
				{ name:'margin', type:'text', default_val:['10px','10px','auto','auto'] },
				{ name:'padding', type:'text', default_val:['20px','20px','10px','10px'] }
			];
				
			garevna_html_css_library.cssInit(obj, attrs);
		};
		// ---------------------------------------------------------------------------------------------- fixed_position
	func['simple_model'] = function() {
			
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Простая модель</wht>');
			var $window = document.getElementById('garevna_browser_win');
			$window.style.backgroundImage = "url()";
			$window.style.backgroundColor = "black";
			var html = '<p>Это просто текст, который расположен раньше остальных элементов. По умолчанию обтекание для ';
			html += 'элементов не устанавливается. Обратите внимание на расположение блоков после изменения обтекания.</p>';
			html += '<p contenteditable="true" id="garevna_text">Это просто элемент <mgnt>&lt;p></mgnt> с атрибутом тега ';
			html += '<grn>contenteditable</grn>="<yelw>true</yelw>", у которого можно менять текст </p>';
			html += '<div id="garevna_div">';
			html += 'Это элемент <mgnt>&lt;div></mgnt> с заданными размерами <grn>width</grn>:<yelw>200px</yelw> и ';
			html += '<grn>height</grn>:<yelw>100px</yelw> </div><img id="garevna_img" src="/buttons/mouse.png">';
			html += '<p>Этот текст следует после обтекаемых элементов. Для него не установлено значение атрибута ';
			html += '<grn>float</grn>, но значения этого атрибута у других элементов отражаются на том, как данный текст';
			html += ' обтекает эти элементы. При этом блочные элементы по умолчанию будут располагаться в столбцах ';
			html += '(каждый - с новой строки), если для них значение атрибута <grn>display</grn> не установлено в '; 
			html += '<yelw>"inline"</yelw>или <yelw>"inline-block"</yelw>.</p><p>Таким образом, атрибут <grn>float</grn> ';
			html += 'действует на все близлежащие элементы независимо от того, установлено ли для них обтекание.</p>';
			html += '<p>Для того, чтобы "отключить" действие обтекания на элементы, следующие ниже, используется пустой элемент <p class="site_name"><mgnt>&lt;div</mgnt> <grn>style</grn>="<yelw>clear: both</yelw>"<mgnt>>&lt;/div></mgnt></p><p><yelw style="font-size:20px">clear</yelw> - специфический атрибут стиля, который принимает следующие значения:</p><pad><grn>left</grn> - блок должен размещаться ниже всех плавающих блоков, обтекаемых слева;</pad><pad><grn>right</grn> - блок должен размещаться ниже всех всех плавающих блоков, обтекаемых справа; </pad><pad><grn>both</grn> - блок должен размещаться ниже всех плавающих блоков;</pad> <pad><grn>none</grn> - никаких ограничений на положение блока относительно обтекаемых элементов не накладывается.</pad>';
			html += '';
			document.getElementById('garevna_browser_win').innerHTML = html;
			
			var obj = [ 
				{ id:"garevna_text", name:"[contenteditable]", type:'elem' },
				{ id:"garevna_div", name:"div", type:'elem' },
				{ id:"garevna_img", name:"img", type:'elem' }
			];
			var attrs = [
			    {
					name:'float',
					type:'select',
					vals:[ 'left','right', 'none' ],
					default_val:'none'
				}
			];
				
			garevna_html_css_library.cssInit(obj, attrs);
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