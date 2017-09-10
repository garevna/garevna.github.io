// ==============================================================
//                       Courseware html & CSS
//                            module 03
// ==============================================================
var garevna_html_03 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	// ================================================================================================= codes_of_symbols
	func['codes_of_symbols'] = function(parent_node) {
		
		var worker;
        
		var htmlSymbols = function () {
			var jsonText = JSON.parse(json.responseText);
			  //
			  var symb = '';
			  var mg = '<spn class="magenta_white" style="width:70px; font-size:12px;">';
			  var gr = '<spn class="green_white" style="width:70px; font-size:12px;">';
			  var scn = document.getElementById('garevna_browser_win');
			  for (var j=0; j<jsonText.length; j++)
			  {
				  p1 = (jsonText[j].m.length > 0)?('&amp;' + jsonText[j].m + ';'):(' ');
				  p2 = (jsonText[j].d.length > 0)?('&amp;#' + jsonText[j].d + ';'):(' ');
				  if (jsonText[j].m == 'nbsp' || jsonText[j].m == 'ensp' || jsonText[j].m == 'emsp')
				  {
					  symb = '<spn style="width:100px; background-color:grey; font-size:10px;">пробел</spn>';
				  }
				  else
				  {
					  if (jsonText[j].m == 'shy')
					  {
						  symb = '<spn style="width:100px; background-color:grey; font-size:10px;">мягкий перенос</spn>';
					  }
					  else
					  {
						  symb = (jsonText[j].m.length > jsonText[j].d.length)?(jsonText[j].m):('#' + jsonText[j].d);
						  symb = '<spn style="width:100px; font-size:18px;">&' + symb + ';</spn>';
					  }
				  }
				  //console.log(symb);
				  scn.insertAdjacentHTML('beforeEnd', symb);
				  scn.insertAdjacentHTML('beforeEnd', mg + p1 + '</spn>');
				  scn.insertAdjacentHTML('beforeEnd', gr + p2 + '</spn>');
				  scn.insertAdjacentHTML('beforeEnd','</div><br />');
			  }
		};
		garevna_media_library.loadSource (worker, '/html-css/module-03/spec-symbols.json', htmlSymbols, params);
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Кодировка символов в HTML</wht>');
		document.getElementById('garevna_browser_win').style.backgroundImage = "none";
		document.getElementById('garevna_browser_win').style.backgroundColor = "#ded";
		var html = '';
		/*html += '<img src="/html-css/module-03/images/search-engine-ranking.png" style="float:left;margin-right:20px; width:200px; height:auto;" /> ';*/
		html += '<div style="position:fixed; top:0; width:360px; height:auto; background:black; color:white;">';
	    html += ' padding:5px 10px;">';
	    html += '<h1>html-коды символов</h1><div>';
	    html += '<spn style="width:100px; font-size:10px;">символ</spn>';
	    html += '<spn style="width:70px; font-size:10px;">мнемокод</spn>';
	    html += '<spn style="width:100px; font-size:10px;">десятичный код</spn></div>';
	    html += '</div><!--end of fixed-head -->';
		html += '';
		html += '';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	// =============================================================================================== symbols_codes
	func['symbols_codes'] = function(parent_node) {
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Кодировки и символьные подстановки</wht>');
			document.getElementById('garevna_browser_win').style.backgroundColor = "#ddc";
		    document.getElementById('garevna_browser_win').style.backgroundImage = "none";
			
			var html = '';
			html += '<img src="/html-css/module-03/images/codes.png" style="float:left;margin-right:20px; width:200px; height:auto;" /> ';
			html += '<p>Символьные подстановки используются в двух случаях:</p>';
			html += '<p>1) когда символы невозможно ввести с клавиатуры (например, символ зарегистрированного торгового ';
			html += 'знака <span class="magenta">®</span> или торговой марки <span class="magenta">™</span>);.</p>'; 
			html += '<p>2) когда нужно отобразить в окне браузера специальные символы языка разметки html.</p>'; 
			html += '<p>Символьные подстановки &mdash; это специальная последовательность, преобразуемая браузерами в';
			html += ' заданный символ.</p> <p>Подстановку можно осуществить несколькими способами:</p>'; 
			html += '<p><div class="dyn_elem magenta">&<yelw>copy</yelw>;</div> вставка символа по его "мнемокоду" (имени).</p>';
			html += '<p><div class="dyn_elem magenta">&#<yelw>169</yelw>;</div> вставка символа по его десятичному коду.</p>';
			html += '<p><div class="dyn_elem magenta">&#x<yelw>AE</yelw>;</div> вставка символа по его шестнадцатиричному коду.</p>';
			html += '<p>Символьные подстановки применяются также для вставки символов, имеющих специальное назначение в html. </p>';	
			html += '<p>Например, нужно вывести на страницу текст, содержащий html тэги:</p>';			
			html += '<div class="dark_gray">Для вывода текста полужирным начертанием, выделите его тэгами &lt;strong> и &lt;/strong></div>';
			html += '<p>Символы <span class="magenta">&lt;</span> и <span class="magenta">&gt;</span> начинают и завершают тэги, поэтому вставка их в код страницы приведет к интерпретации <span class="magenta">&lt;strong></span> и <span class="magenta">&lt;/strong></span> как тэгов и не даст желаемого результата. Нужно использовать символьные подстановки.</p>';
			html += '<img src="/html-css/module-03/images/utf8_bom.png" style="float:right;margin-right:20px; width:200px; height:auto;" /> ';
			html += '<p>Какой бы ни была кодировка основного текста html документа, для подстановок всегда используется кодировка стандарта <span class="magenta">Unicode</span>.</p>';
			html += '<p>Например, подстановка символов';
			html += ' <span class="dyn_elem">&#1071;</span>';
			html += ' <span class="dyn_elem">&#1041</span> и';
			html += ' <span class="dyn_elem">&#1046;</span> ';
			html += 'будет иметь вид ';
			html += '<span class="dyn_elem">&#<yelw>1071</yelw>;</span> ';
			html += '<span class="dyn_elem">&#<yelw>1041</yelw>;</span> ';
			html += '<span class="dyn_elem">&#<yelw>1046</yelw>;</span>. ';
			html += 'Другой вопрос, как поймет такую подстановку браузер.</p>';
			html += '';
			html += '';
			html += '';
			
			document.getElementById('garevna_browser_win').innerHTML = html;
			
	};
	// ======================================================================================================= home_work
	func['home_work'] = function() {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<h1>Задание на дом</h1>');
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = '#dde';
		
		var html = '';
        html += '<h2>1. Символьные подстановки</h2>';
        html += '<h3>Неклавиатурные символы</h3>';
        html += '<p>Создайте текст на своей странице с использованием специальных символов, отсутствующих на клавиатуре (снежинки, песочные часы и т.п.)</p>';
		html += '<h3>Фрагмент кода</h3>';
		html += '<p>Вставьте в страницу фрагмент html-кода, используя мнемокоды символов</p>';
		html += '<h3>Математические символы</h3>';
		html += '<p>Используя десятичные коды символов, вставьте в свою страницу математическую формулу с интегралами и проч.</p>';
		html += '<h2>2. Работа с мета-тегами</h2>';
		html += '<h3>Кодировка</h3>';
		html += '<p>Вставьте мета-тег, который укажет браузеру кодировку Вашей страницы</p>';
		html += '<h3>Перенаправление</h3>';
		html += '<p>Вставьте мета-тег, который обеспечит загрузку страницы "https://translate.google.com.ua/" через три секунды после запуска Вашей страницы</p>';
		html += '<h3>Индексирование</h3>';
		html += '<p>Вставьте мета-теги, описывающие для посковых машин заголовок, ключевые слова и содержание Вашей страницы</p><p>Опишите на своей странице, как работает мета-тег, указывающий поисковым машинам, следует ли индексировать текущую страницу и остальные страницы Вашего сайта</p>';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	return function() {
			return func[func_name]();
	}
}