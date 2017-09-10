// ==============================================================
//                       Courseware html & CSS
//                            module 11
// ==============================================================
var garevna_html_11 = function (func_name, parent_object) {
	
	var func = {};
	var parent = parent_object || garevna_Level2.scene || document.body;
	// ===================================================================================================== site_indexing
	func['site_indexing'] = function(parent_node) {
		
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<wht>Индексация в поисковых системах</wht>');
		document.getElementById('garevna_browser_win').style.backgroundImage = "none";
		document.getElementById('garevna_browser_win').style.backgroundColor = "#ded";
		var html = '';
		html += '<img src="/html-css/module-11/images/search-engine-ranking.png" style="float:left;margin-right:20px; width:200px; height:auto;" /> ';
		html += '<p>Поисковики (search engines) хранят информацию о содержании веб-страниц в <dfn>базе данных</dfn> ';
		html += '(<dfn>индексе</dfn>). <br>Для появления сайта в результатах поиска нужно, чтобы он попал в ';
		html += '<dfn>индекс</dfn> поисковика. <br>Можно вручную внести свой сайт в базу данных поисковых систем ';
		html += 'с помощью специального сервиса:</p>';
		html += '<h3>Регистрация в поисковых системах:</h3>';	
		html += '<div class="dyn_elem">';
		html += '<a href="http://www.google.com/addurl/?continue=/addurl" target="_blank">';
		html += '<img class="button_img" src="/html-css/module-11/images/google_logo.png"/></a></div>';
		html += '<div class="dyn_elem"><a href="http://www.bing.com/docs/submit.aspx" target="_blank">';
		html += '<img class="button_img" src="/html-css/module-11/images/bing_logo.png"/></a></div>';
		html += '<div class="dyn_elem">';
		html += '<a href="http://submit.search.yahoo.com/free/request" target="_blank">';
		html += '<img class="button_img" src="/html-css/module-11/images/yahoo_logo.png"/></a></div>';
		html += '<div class="dyn_elem">';
		html += '<a href="http://webmaster.yandex.ru/" target="_blank">';
		html += '<img class="ref_img" src="/html-css/module-11/images/yandex_logo.png"/></a></div>';
		
		html += '<div class="dyn_elem">';
		html += '<a href="http://meta.ua/webmaster/addurl.asp" target="_blank">';
		html += '<img class="ref_img" src="/html-css/module-11/images/meta-logo.gif"/></a></div>';
		html += '<div class="dyn_elem">';
		html += '<a href="http://catalog.i.ua/choose_cat/" target="_blank">';
		html += '<img class="ref_img" src="/html-css/module-11/images/i_ua.png"/></a></div>';
		
		html += '<p>Тогда сайт будет поставлен в очередь на индексацию. <br>';
		html += 'Однако поисковые системы больше доверяют результатам работы собственных <dfn>роботов</dfn>.</p>';
		html += '<img src="/html-css/module-11/images/google-index-website.png" style="width:300px; height:auto;" />';
		html += '<p>Для того, чтобы робот сам нашел страницу или сайт, необходимо, чтобы на эту страницу или сайт была хотя бы одна ссылка с тех веб-страниц, которые уже занесены в индекс поисковика.</p>';
		html += '';
		html += '';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
	};
	// =============================================================================================== relevance
	func['relevance'] = function(parent_node) {
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Релевантность</wht>');
			document.getElementById('garevna_browser_win').style.backgroundColor = "#ddc";
		    document.getElementById('garevna_browser_win').style.backgroundImage = "none";
			
			var html = '';
			html += '<img src="/html-css/module-11/images/relevance.png" style="float:left;margin-right:20px; width:50%; height:auto;" /> ';
			html += '<p>Релевантность поисковому запросу или ключевым словам определяется поисковиками на основании результатов анализа  содержания веб-страницы.</p>';
			html += '<img src="/html-css/module-11/images/relevance_key.png" style="float:right; width:20%; height:auto; margin:10px;" /> ';
			html += 'Если <dfn>ключевые слова</dfn> из <dfn>поискового запроса</dfn> встречаются на странице достаточное число раз, то эта страница релевантна запросу. </p>';
			html += 'Однако если ключевые слова наиболее частых запросов интернет-пользователей повторяются на странице слишком часто (более 5% текста), то страница может быть классифицирована поисковиком как <dfn>спам</dfn> и исключена из базы данных.</p><br /> ';
			
			html += 'Существуют внутренние и внешние критерии релевантности страницы. <br />';
			html += '<dfn>Внутренние</dfn> - это частота, с которой встречаются ключевые слова запроса на странице и их близость к началу страницы. <br />';
			html += '<dfn>Внешние</dfn> - это ссылки на страницу с других ресурсов (<dfn>индекс цитируемости</dfn>) и их авторитетность.</p>';
			html += '<hr /><img src="https://smart-engagement.com/wp-content/uploads/2014/08/NPS-2014-BD21.png" style="width:100%; height:auto; margin:10px 0;" /> ';
			html += '<div><h3>Проверка на релевантность:</h3>';
			html += '<div class="dyn_elem">';
			html += '<a href="http://www.seogadget.ru/relpages" target="_blank">';
			html += '<img class="button_img" src="/html-css/module-11/images/seo_gadget.png"/></a></div>';
			html += '<div class="dyn_elem">';
			html += '<a href="https://seolib.ru/tools/site/relevant/" target="_blank">';			
			html += '<img class="button_img" src="/html-css/module-11/images/seo_lib.png"/> </a></div>';
			html += '<div class="dyn_elem">';
			html += '<a href="http://pr-cy.ru/analysis_content/" target="_blank">';
			html += '<img class="button_img" src="/html-css/module-11/images/cy_pr.png"/> </a></div></div>';
			
			document.getElementById('garevna_browser_win').innerHTML = html;
			
		};
	// =============================================================================================== statistics
	func['statistics'] = function(parent_node) {
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Статистика поисковых запросов</wht>');
			document.getElementById('garevna_browser_win').style.backgroundColor = "#ddc";
		    document.getElementById('garevna_browser_win').style.backgroundImage = "none";
			
			var html = '';
			html += '<img src="/html-css/module-11/images/statistics.png" style="float:left;margin-right:20px; width:200px; height:auto;" /> ';
			html += '<p>Поисковики ведут статистику частоты различных запросов интернет-пользователей.</p>'; 
			html += 'Чем чаще встречается то или иное слово или фраза в поисковых запросах, тем выгоднее использовать на веб-странице именно это слово или фразу, поскольку они обеспечат попадание страницы в результаты поиска и увеличат шанс посещения.</p>'; 
			html += 'Эту статистику используют при продвижении сайтов</p>';
			
			html += '<h3>Проверка статистики:</h3>';
			html += '<div class="dyn_elem">';
			html += '<a href="https://www.google.com.ua/trends/?hl=ru" target="_blank">';
			html += '<img class="button_img" src="/html-css/module-11/images/google_logo.png"/></a></div>';
			html += '<div class="dyn_elem">';
			html += '<a href="https://wordstat.yandex.ua/" target="_blank">';			
			html += '<img class="button_img" src="/html-css/module-11/images/yandex_logo.png"/> </a></div>';
			
			document.getElementById('garevna_browser_win').innerHTML = html;
			
	};
	// =============================================================================================== plagiat
	func['plagiat'] = function(parent_node) {
			garevna_html_css_library.clear();
			garevna_html_css_library.create_browser_window (parent,'<wht>Уникальность контента</wht>');
			document.getElementById('garevna_browser_win').style.backgroundColor = "#ddc";
		    document.getElementById('garevna_browser_win').style.backgroundImage = "none";
			
			var html = '';
			html += '<img src="/html-css/module-11/images/plagiat.jpg" style="float:left;margin-right:20px; width:300px; height:auto;" /> ';
			html += '<p>Уникальность контента страницы является очень важным критерием для поисковых систем при определении рейтинга страницы (сайта).</p>'; 
			html += '<p>Для того, чтобы попасть в топ результатов поиска, нужно обеспечить 100% уникальность текста на странице.</p>'; 
			html += '<p>Если тест скопирован из другого источника, это отразится на рейтинге страницы (сайта) в сторону снижения.</p>';
			html += '<img src="/html-css/module-11/images/copywriting-1.png" style="float:left;margin-right:20px; width:300px; height:auto;" /> ';
			html += '<h3 class="magenta">Проверка на плагиат:</h3>';
			html += '<div class="dyn_elem">';
			html += '<a href="http://content-watch.ru/text/" target="_blank">';
			html += '<img class="button_img" src="/html-css/module-11/images/content_watch.png"/></a></div>';
			html += '<div class="dyn_elem">';
			html += '<a href="http://text.ru/faq?category=1" target="_blank">';			
			html += '<img class="button_img" src="/html-css/module-11/images/text_ru.jpg"/> </a></div>';
			html += '<h3 class="magenta">Семантический анализ текста:</h3>';
			html += '<div class="dyn_elem">';
			html += '<a href="http://advego.ru/text/seo/" target="_blank"><span class="green">ADVEGO</span></a></div>';
			html += '<div class="dyn_elem">';
			html += '<a href="http://istio.com/rus/text/analyz/" target="_blank"><span class="green">Istio</span></a></div>';
			
			document.getElementById('garevna_browser_win').innerHTML = html;
			
	};
	// ================================================================================================ domen_and_hosting
	func['domen_and_hosting'] = function() {
		garevna_html_css_library.clear();
		garevna_html_css_library.create_browser_window (parent,'<h1>Регистрация доменного имени</h1>');
		document.getElementById('garevna_browser_win').style.backgroundImage = 'none';
		document.getElementById('garevna_browser_win').style.backgroundColor = '#000';
		var domen = [];
  		domen[0] = {
			registrator:"Перечень провайдеров",
			img:"/buttons/lecture.png",
			url:"http://drs.ua/rus/registrars.html",
			text:"Перечень регистраторов доменных имен"
		};
		domen[1] = {
			registrator:"nic.ua",
			img:"http://nic.ua/f/sites/nic/i/nic.ua.png",
			url:"http://nic.ua/",
			text:"Регистрирует бесплатные домены ***.pp.ua"
		};
		domen[2] = {
			registrator:"regnames",
			img:"images/regnames-logo.png",
			url:"http://regnames.ua/ru/",
			text:"Регистрирует бесплатные домены ***.pp.ua"
		};
		domen[3] = {
			registrator:"hostpro",
			img:"https://hostpro.ua/wp-content/themes/hostpro/assets/img/logo2.png",
			url:"https://hostpro.ua/",
			text:"Регистрирует бесплатные домены ***.pp.ua"
		};
		domen[4] = {
			registrator:"mesto.in.ua",
			img:"images/mesto-logo.png",
			url:"http://mesto.zp.ua/",
			text:"Регистрирует бесплатные домены ***.pp.ua"
		};
		domen[5] = {
			registrator:"ukrhosting",
			img:"images/ukrhosting-logo.png",
			url:"http://ukrhosting.com/",
			text:"Регистрирует бесплатные домены ***.pp.ua"
		};
		domen[6] = {
			registrator:"ПРОСТО ХОСТИНГ",
			img:"images/prostohosting-logo.png",
			url:"http://prostohosting.com/",
			text:"Регистрирует бесплатные домены ***.pp.ua"
		};
		domen[7] = {
			registrator:"TheHost - Хостинг провайдер",
			img:"",
			url:"http://thehost.ua/",
			text:""
		};
		domen[8] = {
			registrator:"000webhost",
			img:"https://www.000webhost.com/static/default.000webhost.com/images/logo.png",
			url:"https://www.000webhost.com/",
			text:"Бесплатный хостинг и субдомен с серверными скриптами"
		};
		domen[8] = {
			registrator:"Freehostia",
			img:"https://cp.freehostia.com/images/freehostia-logo-small.png",
			url:"http://www.freehostia.com/",
			text:"Бесплатный хостинг с PHP (без MySQL)"
		};
		domen[8] = {
			registrator:"UAHOSTING",
			img:"http://uahosting.com.ua/images/logo.jpg",
			url:"http://uahosting.com.ua",
			text:"Хостинг с PHP/MySQL"
		};
		domen[9] = {
			registrator:"Hostinger",
			img:"https://www.hostinger.com.ua/static/default.hostinger.co.uk/images/logo.png",
			url:"http://www.hostinger.com.ua/",
			text:"Хостинг с PHP/MySQL",
			background:true
		};
		domen[10] = {
			registrator:"free.1gb.ua",
			img:"https://free.1gb.ua/img/free1gbua-logo.png",
			url:"https://free.1gb.ua/",
			text:"Простой бесплатный хостинг без серверных скриптов с бесплатным доменом в зоне cc.ua, ltd.ua, inf.ua" 
		};
		domen[11] = {
			registrator:"ZZZ",
			img:"https://www.zzz.com.ua/img/logo_zzz.png",
			url:"https://www.zzz.com.ua/ru",
			text:"Бесплатный хостинг с серверными скриптами и бесплатным доменом" 
		};
		domen[12] = {
			registrator:"beget",
			img:"https://beget.com/img/logo.png",
			url:"https://beget.com/ru/free-hosting",
			text:"Бесплатный хостинг с серверными скриптами" 
		};
  
		var html = '';
        html += '<div style="margin-right:50px;">';
		html += '    <img id = "garevna_registratorLogo" src="" style = "max-width:200px; max-height:100px;" />';
        html += '    <h3 id="garevna_registratorName"></h3>';
		html += '    <a id="garevna_registratorURL" href="" target="_blank"></a>';
		html += '</div>';
        html += '<div>';
        html += '<select id="garevna_reg" class="magenta_white"></select>';
		html += '</div>';
		html += '<div id="scene">';
		html += '<iframe id="garevna_registratorSite" src="http://drs.ua/rus/registrars.html" width="90%" height="500px">';
		html += '</iframe></div>';
		html += '';
		
		document.getElementById('garevna_browser_win').innerHTML = html;
		var _regs = document.getElementById("garevna_reg");
        for (var j=0; j<domen.length; j++) {
			_regs.insertAdjacentHTML("beforeEnd", '<option>' + domen[j].registrator + '</option>');
	    }
		
		_regs.onchange = function ( event ) {
			var registrator_name = event.target.value;
			alert(registrator_name);
			var ind = event.target.selectedIndex;
			alert(ind);
			if (!ind) { alert("Не выбрано значение или данные отсутствуют"); return false; }
			var _logo = document.getElementById("garevna_registratorLogo");
			_logo.src = domen[ind].img;
			_logo.style.backgroundColor = domen[ind].background?'rgba(255,255,255,0.5)':'transparent';
			
			document.getElementById("garevna_registratorName").innerHTML = registrator_name;
			_logo.src = domen[ind].img;
			document.getElementById("garevna_registratorSite").src = domen[ind].url;
			document.getElementById("garevna_registratorURL").href = domen[ind].url;
			document.getElementById("garevna_registratorURL").innerHTML = domen[ind].url;
			window.open(domen[ind].url,'_blank');
		}
	};
	return function() {
			return func[func_name]();
	}
}