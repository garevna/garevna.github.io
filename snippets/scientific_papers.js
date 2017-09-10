// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
function garevna_papers () {
	//var garevna_lib = garevna_lib || garevna_media_library();
	var parent_object = this;   // контекст вызова
	var src = undefined;
	var icons = undefined;
	var themes = undefined;
	var types = undefined;
	var authors = undefined;
	var conferences = undefined;
	var places = undefined;
	var publishers = undefined;
	var journals = undefined;
	var _sort = undefined;

	var selectPanelId = 'garevna_select_papers_panel';
	var infoPanelId = 'garevna_publicat_info_panel';
	// ---------------------------------------------------------------------------------------------------- loadData
	(function loadData () {
		var publicat_worker = new Worker('/js/json_loader.js');
		publicat_worker.postMessage('/data_files/scientific_publications.json');
		publicat_worker.addEventListener('message', function(e) {
			if(!e.data) {
				alert("Извините, файл /data_files/scientific_publications.json не обнаружен");
			}
			else {
				getData(e.data, this);
			}
		}, false);
	})();
	// ---------------------------------------------------------------------------------------------------- loadData
	var paperListObject = document.createElement('div');
	paperListObject.style.boxSizing = 'border-box';
	paperListObject.style.fontFamily = 'Arial';
	paperListObject.style.color = 'black';
	paperListObject.style.fontSize = '11px';
	paperListObject.style.lineHeight = '150%';
	paperListObject.style.padding = "30px 20px";
	
	paperListObject.id = 'garevna_papers';
	// ================================================================================================ getData
	function getData ($data, context) {
		src = $data._publicat;
		authors = $data._authors;
		conferences = $data._conferences;
		publishers = $data._publishers;
		places = $data._places;
		journals = $data._journals;
		icons = $data._icons;
		themes = $data._themes;
		types = $data._types;
		_sort = $data._sort;
		
		createStylesForListButtons ();
		
		if (parent_object == document.body) {
			setMetaTags ($data);
		}
		
		buildPublicationList('all');
		parent_object.appendChild(createSortListPanel (selectPanelId));
		parent_object.appendChild(createSortListInfoPanel (infoPanelId));
		parent_object.appendChild(paperListObject);
		
		parent_object.resize_callback = publication_resize;
	}
	// ==================================================================================== createStylesForListButtons
	function createStylesForListButtons () {
		var sheet = document.createElement('style');
		var html1 = html2 = '';
		var j;
		var html3 = [];
		for (j=0; j < icons.type.length; j++) {
			html1 += (j >0)?(','):('');
			html2 += (j >0)?(','):('');
			html1 += '.ico_' + icons.type[j];
			html2 += '.ico_' + icons.type[j] + ':hover';
			html3[j] = '.ico_' + icons.type[j] + ' { background-image:url(' + icons.background_image[j] + '); }';
		}
		html1 += icons.style;
		html2 += icons.style_hover;
		sheet.innerHTML = html1 + html2 + html3.join(' ');
		document.getElementsByTagName('head').item(0).appendChild(sheet);
	}
	// ==================================================================================== setMetaTags
	function setMetaTags ($data) {
		document.getElementsByTagName('title').item(0).innerHTML = $data._title.eng;
		var meta = document.getElementsByTagName("meta");
		for (j=0; j < meta.length; j++) {
			if (meta.item(j).name == "description") {
				meta.item(j).content =  $data._description;
			}
			if (meta.item(j).name == "keywords") {
				meta.item(j).content =  $data._keywords;
			}
		}
	}
	function createSortListInfoPanel ($color, $backgroundColor) {
		var elem = garevna_lib.createPanel (infoPanelId, 'bottom');
		var ico = document.createElement('button');
		ico.style.position = 'absolute';
		ico.style.bottom = '10px';
		ico.style.left = '10px';
		ico.style.width = '70px';
		ico.style.height = '50px';
		ico.style.backgroundImage = 'url(' + _sort[0].ico_file + ')';
		ico.style.backgroundRepeat = 'no-repeat';
		ico.style.backgroundSize = 'contain';
		ico.style.border = '0';
		ico.style.backgroundColor = 'transparent';
		elem.appendChild(ico);
		var txt = document.createElement('span');
		txt.style.fontFamily = 'Comic Sans MS';
		txt.style.color = (!$color)?('white'):($color);
		txt.style.marginLeft = '80px';
		elem.appendChild(txt);
		txt.innerHTML = 'Полный библиографический перечень';
		return elem;
	}
	function changeInfoLine (sort_elem_num, val) {
		var elem = document.getElementById(infoPanelId);
		var childs = elem.children;
		childs[0].style.backgroundImage = 'url(' + _sort[sort_elem_num].ico_file + ')';
		childs[1].innerHTML = (!val)?(_sort[sort_elem_num].id_rus):(val);
	}
	function get_year ($year) {
			buildPublicationList ('year', '"' + $year + '"');
			changeInfoLine (_sort.length-1, $year);
			return;
		}
	// ==================================================================================== createNaviPanel 
	function createSortListPanel ($color, $backgroundColor) {
		var elem = garevna_lib.createPanel (selectPanelId, 'top');
		var $sel = document.createElement('select');
		$sel.style.backgroundColor = 'rgba(0,0,0,0.4)';
		$sel.style.border = '0';
		$sel.style.boxShadow = 'inset -2px -2px 2px rgba(0,0,0,0.5)';
		$sel.style.fontSize = '100%';
		$sel.style.color = 'white';
		$sel.onfocus = function (event) { this.selectedIndex = -1; }
		
		$sel.onchange = function (event) {
			var i = this.selectedIndex;
			if (this.options[i].filter == 'year') {
				var d = new Date();
				var current_year = d.getFullYear();
				garevna_lib.createPromptWin ("Год публикации", get_year, 'number', '2013', '1985', current_year);
				//var $year = prompt("Год публикации", "2013");
				
				// document.getElementById(infoPanelId).innerHTML = $year;
			}
			else {
				buildPublicationList (this.options[i].filter, '"' + this.options[i].filter_value + '"');
				changeInfoLine (i);
				// document.getElementById(infoPanelId).innerHTML = this.options[i].text;
			}
			this.blur();
		}
		var j;
		for (j=0; j<_sort.length; j++) {
				var opt = document.createElement('option');
				opt.value = _sort[j].index;
				opt.text = _sort[j].id_rus;
				opt.filter = _sort[j].index;
				opt.filter_value = _sort[j].index_value;
				$sel.appendChild(opt);
		}
		elem.appendChild($sel);
		return elem;
	}
	// ==================================================================================== buildRow
	function buildRow (num) {
		var $row = src[num];
		var html = $row.txt_html;
		html = html.replace('{name}','<b>' + $row.name + '</b>');
		html = (!$row.authors)?html:html.replace('{authors}', authors[$row.authors]);
		var $journal = (!$row.journal)?(null):(journals[$row.journal]);
		var $publisher = (!$row.publisher)?(null):(publishers[$row.publisher]);
		if ($row.publisher_URL) {
			var $ref = '<a href="' + $row.publisher_URL + '" target="_blank">';
			if ($row._journal) {
				$journal = $ref + $journal + '</a>';
			}
			else {
				if ($publisher) {
					$publisher = $ref + $publisher + '</a>';
				}
			}
		}
		html = (!$journal)?html:html.replace('{journal}', $journal);
		html = (!$publisher)?html:html.replace('{publisher}', $publisher);
		html = (!$row.place)?html:html.replace('{place}', places[$row.place]);
		html = (!$row.conference)?html:html.replace('{conference}','<em>' + conferences[$row.conference] + '</em>');
		html = (!$row.tutorial_info)?html:html.replace('{tutorial_info}','<b>' + $row.tutorial_info + '</b>');
		html = html.replace('{year}',$row.year);
		var j = icons.type.indexOf($row.ico);
		var $ico = icons.background_image[Math.max(0,j)];
		var $title = icons.title[Math.max(0,j)];
		var $item;
		if ($row.chapters) {
			var elem = document.createElement('details');
			var $summary = document.createElement('summary');
			$summary.setAttribute('title', $title);
			elem.appendChild($summary);
			var $btn = document.createElement('img');
			$summary.appendChild($btn);
			var $text = document.createElement('span');
			$text.innerHTML = html;
			$summary.appendChild($text);
			$btn.className = 'ico_pdf_book';
			for (var j=0; j<$row.chapters._name.length; j++) {
				$item = getListItem ($row.src_url + $row.chapters._url[j], $row.chapters._name[j], $row.ico, $title);
				$item.style.marginLeft = '50px';
				elem.appendChild($item);
			}
		}
		else {
			elem = getListItem (src[num].src_url, html, $row.ico, $title);
		}
		return elem;
	}
	function getListItem (src, html, ico, $title) {
		var elem = document.createElement('div');
		var $btn = document.createElement('button');
		$btn.className = 'ico_' + ico;
		$btn._url = src;
		$btn.setAttribute('title', $title);
		if  (ico !== 'empty') {
			$btn.onclick = function (event) {
				window.open(this._url, '_blank');
			}
		}
		elem.appendChild($btn);
		var $text = document.createElement('span');
		elem.appendChild($text);
		$text.style.marginLeft = "10px";
		$text.innerHTML = html;
		return elem;
	}
	function buildPublicationList (index, index_value) {
		paperListObject.innerHTML = '';
		var elem, j;
		for (j = 0; j < src.length; j++) {
			if (index == 'all' || ('"' + src[j][index] + '"' == index_value)) {
				elem = buildRow(j);
				paperListObject.appendChild(elem);
			}
		}
		publication_resize ();
	}
	function publication_resize () {
		if (!parent_object.style.height) {
			var h = window.innerHeight - 120;
		}
		else {
			var t = parent_object.style.height;
			var h = eval(t.slice(0,t.indexOf("px")))-30;
		}
		paperListObject.style.height = h + 'px';
		paperListObject.style.overflowY = 'auto';
		//document.getElementById(selectPanelId).style.fontSize = (window.innerWidth<450)?("80%"):("90%");
		// parent_object.parentNode.style.overflowY = 'hidden';
	}
};