// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
// parent_object.data - массив объектов формата { name:'', sample:'', help:'' }

// ====================================================================================== garevna_document_properties
function garevna_document_properties () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = parent_object.func_params[2];
	parent_object.picture_title = parent_object.func_params[1];
	
	// parent_object.main_head = { abbr: 'DOM', text: 'Document properties' };
	parent_object.main_head = { abbr: parent_object.func_params[0], text: parent_object.func_params[1] };
	
	parent_object.buttons_width = 150;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'scripts',
		sample: 'console.log(document.scripts);',
		help: 'Возвращает коллекцию тегов &lt;script> документа'
	};
	parent_object.data[1] = {
		name: 'activeElement',
		sample: 'console.log(document.activeElement);',
		help: 'Возвращает активный элемент DOM (в фокусе)'
	};
	parent_object.data[2] = {
		name: 'anchors',
		sample: 'console.log(document.anchors);',
		help: 'Возвращает коллекцию гиперссылок (тегов &lta>) документа'
	};
	parent_object.data[3] = {
		name: 'baseURI',
		sample: 'alert("base: " + document.baseURI);',
		help: 'Возвращает абсолютную ссылку на документ (вообще-то говоря, это свойство любого элемента DOM)'
	};
	parent_object.data[4] = {
		name: 'body',
		sample: 'console.log(document.body);',
		help: 'Возвращает элемент body документа'
	};
	parent_object.data[5] = {
		name: 'cookie',
		sample: 'document.cookie = encodeURIComponent("username=Вася;&nbsp;expires=Thu, 14 Apr 2017 14:00:00 UTC;&nbsp;path=garevna.pp.ua;&nbsp;comment:Фигня"); console.info("Закодированные куки:" + document.cookie); console.info("Декодированные куки:" + decodeURIComponent(document.cookie));',
		action: 'document.cookie = encodeURIComponent("username=Вася; expires=Thu, 14 Apr 2017 14:00:00 UTC; path=garevna.pp.ua; comment:Фигня"); console.info("Закодированные куки:\\n" + document.cookie); console.info("Декодированные куки:\\n" + decodeURIComponent(document.cookie));',
		help: 'Возвращает куки, связанные с данным документом'
	};
	parent_object.data[6] = {
		name: 'characterSet',
		sample: 'alert("Кодировочная таблица документа: " + document.characterSet);',
		help: 'Возвращает кодировочную таблицу документа'
	};
	parent_object.data[7] = {
		name: 'doctype',
		sample: 'console.log(document.doctype);',
		help: 'Возвращает декларацию doctype документа'
	};
	parent_object.data[8] = {
		name: 'documentElement',
		sample: 'console.log(document.documentElement);',
		help: 'Возвращает элемент html документа'
	};
	parent_object.data[9] = {
		name: 'domain',
		sample: 'alert("Доменное имя, связанное с документом: " + document.domain);',
		help: 'Возвращает доменное имя, связанное с документом'
	};
	parent_object.data[10] = {
		name: 'head',
		sample: 'console.log(document.head);',
		help: 'Возвращает элемент head документа'
	};
	parent_object.data[11] = {
		name: 'images',
		sample: 'console.log(document.images);',
		help: 'Возвращает коллекцию элементов img документа'
	};
	parent_object.data[12] = {
		name: 'lastModified',
		sample: 'alert("Дата последней модификации документа: " + document.lastModified);',
		help: 'Возвращает дату последней модификации документа'
	};
	parent_object.data[13] = {
		name: 'links',
		sample: 'console.log(document.links);',
		help: 'Возвращает коллекцию всех эементов с атрибутом href документа'
	};
	parent_object.data[14] = {
		name: 'referrer',
		sample: 'alert("Откуда мы сюда попали: " + document.referrer);',
		help: 'Возвращает URL документа, открывшего данный документ'
	};
	parent_object.data[15] = {
		name: 'title',
		sample: 'alert("Тег title содержит: " + document.title); document.title = "***";',
		help: 'Возвращает значение тега title документа'
	};
	parent_object.data[16] = {
		name: 'URL',
		sample: 'alert("URL документа: " + document.URL);',
		help: 'Возвращает URL документа'
	};
	create_article_content (parent_object);
}
// ====================================================================================== garevna_document_methods
function garevna_document_methods () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = parent_object.func_params[2];
	parent_object.style.backgroundImage="url(https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSdWFNbXlobFR2V1k)";
	parent_object.style.backgroundSize = "30%";
	parent_object.picture_title = parent_object.func_params[1];
	
	// parent_object.main_head = { abbr: 'DOM', text: 'Document methods' };
	parent_object.main_head = { abbr: parent_object.func_params[0], text: parent_object.func_params[1] };
	
	parent_object.buttons_width = 220;
	
	parent_object.data = [];
	
	var newImage = null;
	
	parent_object.data[0] = {
		name: 'createElement()',
		sample: 'newImage = document.createElement("img");',
		help: 'Создает новый html-элемент (в данном примере - тег img)'
	};
	parent_object.data[1] = {
		name: 'getElementById()',
		sample: 'newImage.id = "myImage"; console.log(document.getElementById("myImage"));',
		help: 'Возвращает элемент по его уникальному идентификатору (атрибуту тега id). Результат смотри в консоли'
	};
	parent_object.data[2] = {
		name: 'getElementsByClassName()',
		sample: 'var obj = document.createElement("p"); document.body.appendChild(obj); obj.className = "myClass"; var myCollection = document.getElementsByClassName("myClass"); console.log(myCollection); console.log(myCollection[0]);',
		help: 'Возвращает семейство элементов с указанным значением атрибута class'
	};
	parent_object.data[3] = {
		name: 'getElementsByTagName()',
		sample: 'var obj = document.createElement("aside"); document.body.appendChild(obj); var myCollection = document.getElementsByTagName("aside"); console.log(myCollection);  console.log(myCollection[0].tagName);',
		help: 'Возвращает семейство всех элементов aside'
	};
	parent_object.data[4] = {
		name: 'querySelectorAll()',
		sample: 'var obj = []; obj[0] = document.createElement("div"); document.body.appendChild(obj[0]); obj[0].id="myDiv"; obj[1] = document.createElement("img"); document.body.appendChild(obj[1]); obj[1].className="myImg"; console.log(document.querySelectorAll("#myDiv")); console.log(document.querySelectorAll(".myImg"));',
		help: 'Возвращает все элементы в документе, соответствующие указанному CSS-селектору'
	};
	parent_object.data[5] = {
		name: 'write()',
		sample: 'document.write("<h1>Мы пишем в тело документа</h1><p>Что хотим, то и пишем...</p>")',
		help: 'Выводит в тело документа заданную аргументом строку'
	};
	create_article_content (parent_object);
}
// ====================================================================================== dom_elements_properties
function garevna_dom_elements_properties () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object.picture = parent_object.func_params[2];
	parent_object.picture_title = parent_object.func_params[1];
	
	// parent_object.main_head = { abbr: 'DHTML', text: 'Dynamic html' };
	parent_object.main_head = { abbr: parent_object.func_params[0], text: parent_object.func_params[1] };
	
	parent_object.buttons_width = 120;
	
	parent_object.data = [];
	
	parent_object.container = document.createElement("aside");
	// parent_object.appendChild(parent_object.container);
	parent_object.container.innerHTML = "<!-- Это контейнер для картинок -->";
	parent_object.infoNode = document.createElement('p');
	parent_object.container.appendChild(parent_object.infoNode);
	parent_object.container.style.position = "absolute";
	parent_object.container.style.top = "1%";
	parent_object.container.style.left = "1%";
	parent_object.container.style.width = "10%";
	parent_object.container.style.height = "70%";
	parent_object.container.style.overflow = "auto";
	parent_object.container.style.padding = "5px";
	parent_object.container.style.border = "inset 1px white";
	parent_object.container.title = "Я - тег - ASIDE (контейнер для картинок)";
	
	parent_object.pictures_src = [
	    "http://garevna.pp.ua/buttons/js.png",
	    "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSUWVpRUJlejQ3aXc",
		"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSNFY3c1BSaUZxa1E",
		"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSMEdXSkdUT0ltdTQ",
		"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSblpVR1otcUlxbzQ",
		"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSUkxYUVY1cUJYUE0"
	];
	parent_object.pictures = [];
	for (var j = 0; j < parent_object.pictures_src.length; j++) {
		parent_object.pictures[j] = document.createElement("img");
		parent_object.pictures[j].src = parent_object.pictures_src[j]; 
		parent_object.pictures[j].style.width = "70%";
		parent_object.pictures[j].style.height = "auto";
		parent_object.pictures[j].className = "picture";
		parent_object.pictures[j].title = "Я - картинка в контейнере ASIDE, у меня класс picture";
		parent_object.container.appendChild(parent_object.pictures[j]);
	};
	// **********************************************************************************************
	
	// **********************************************************************************************
	var stars = '<span style="color:yellow">&#10024;</span>';
	// ------------------------------------------------------------------------------------------ attributes
	parent_object.data[0] = {
		title: 'attributes ' + stars + ' id',
		name: null,
		img: 'https://s-media-cache-ak0.pinimg.com/originals/88/f0/5f/88f05f746645923091cf6d24ba0c2a71.gif',
		sample: 'var container = document.getElementsByTagName( "aside" )[0]; console.log ( container.attributes ); container.id = prompt ( "Введите значение атрибута id элемента", "container" ); alert ( "Атрибут id элемента: " + container.id );',
		action: 'console.log (parent_object.container.attributes); alert("В консоли будет следующее:\\n------------------------------------------------------------------\\n▾ NamedNodeMap  { 0: title, 1: style, length: 2 }\\n         length: 2\\n     ▸ 0: title\\n     ▸ 1: style\\n     ▸ __proto__:  NamedNodeMap\\n------------------------------------------------------------------\\nпотому что у этого элемента всего два атрибута: title и style, т.е. длина массива атрибутов (length) равна 2"); parent_object.container.id = prompt("Введите значение атрибута id элемента","container"); alert("Атрибут id элемента: " + parent_object.container.id);',
		help: 'Перечень атрибутов элемента DOM как узлов. Атрибут id элемента'
	};
	
	// ------------------------------------------------------------------------------------------ childNodes
	parent_object.infoNode.innerHTML = parent_object.data[0].help;
	parent_object.data[1] = {
		title: 'childNodes  ' + stars + '  children',
		name: null,
		img: 'https://media.giphy.com/media/zN75R1cZ2WJFK/giphy.gif',
		sample: 'var container = document.getElementsByTagName("aside")[0]; alert("Число элементов в контейнере: " + container.childElementCount); console.log(container.childNodes); console.log(container.children);',
		action: 'garevna_lib.createPromptWin(parent_object.container.innerHTML); alert("Число элементов в контейнере: " + parent_object.container.childElementCount); var child_nodes = parent_object.container.childNodes; var _children = parent_object.container.children;  console.log(child_nodes); alert("При выводе в консоль childNodes элемента получим следующее:\\n------------------------------------------------------------------\\n▾ [ comment, img.picture, img.picture, img.picture, img.picture, img.picture, img.picture ]\\n       length: 7\\n    ▸0: comment\\n    ▸1: img.picture\\n    ▸2: img.picture\\n    ▸3: img.picture\\n    ▸4: img.picture\\n    ▸5: img.picture\\n    ▸6: img.picture\\n    ▸__proto__: NodeList\\n------------------------------------------------------------------\\nВ нашем примере в контейнере, кроме тегов img с атрибутом class (значение которого - picture), есть комментарий: <!-- Это контейнер для картинок -->"); console.log(_children); alert("В консоли будет следующее:\\n------------------------------------------------------------------\\n▾ [ img.picture, img.picture, img.picture, img.picture, img.picture, img.picture ]\\n       length: 6\\n    ▸0: img.picture\\n    ▸1: img.picture\\n    ▸2: img.picture\\n    ▸3: img.picture\\n    ▸4: img.picture\\n    ▸5: img.picture\\n    ▸__proto__: HTMLCollection\\n------------------------------------------------------------------\\nВ отличие от childNodes, которые представляют собой список узлов элемента (NodeList), семейство children представляет собой HTMLCollection");',
		help: 'Свойство childElementCount возвращает число элементов-потомков данного элемента DOM. Свойство childNodes возвращает NodeList: коллекцию всех потомков элемента (включая текстовые ноды и комментарии). У текстовых узлов и комментариев нет свойства innerHTML.\n Свойство childNodes возвращает HTMLCollection: семейство элементов-потомков (без текстовых нод и комментариев)'
	};
	
	// ------------------------------------------------------------------------------------------ classList | className
	parent_object.classList_txt = 'В консоли будет следующее:\n------------------------------------------------------------------\n[ "picture", value: "picture"]\n       length: 1\n       value: "picture"\n       0: "picture"\n     ▸__proto__: DOMTokenList';
	
	parent_object.data[2] = {
		title: 'classList  ' + stars + '  className',
		name: null,
		img: 'http://orig02.deviantart.net/265b/f/2010/135/7/f/yasul_run_cycle_by_reawolf.gif',
		sample: 'var container = document.getElementsByTagName( "aside" )[0]; var elems = container.children; console.log( elems[0].classList ); alert( "Имя класса элемента: " + elems[0].className ); elems[0].className = prompt ( "Укажите имя класса элемента:", "picture" ); alert( "Новое имя класса элемента: " + elems[0].className );',
		action: 'var elems = parent_object.container.children; console.log(elems[0].classList); alert(parent_object.classList_txt); alert("Имя класса элемента: " + elems[0].className); elems[0].className = prompt ("Укажите имя класса элемента:", "picture"); alert("Новое имя класса элемента: " + elems[0].className); if (confirm("Вернуть старое название класса?")) { elems[0].className = "picture"; }',
		help: 'Свойство classList возвращает DOMTokenList: семейство классов элемента DOM (элемент может иметь более одного класса). Свойство className возвращает или устанавливает имя класса элемента. Измение имени класса приведет к изменению внешнего вида элемента, если CSS-атрибуты нового класса отличаются от CSS-атрибутов старого'
	};
	
	// ------------------------------------------------------------------------------------- clientHeight / clientWidth
	
	parent_object.data[3] = {
		title: 'clientHeight  ' + stars + '  clientWidth  ' + stars + '  clientTop  ' + stars + '  clientLeft',
		name: null,
		img: "https://static1.squarespace.com/static/56e8786e86db43c8bb6e1c8d/581730853e00be80a7dd6bda/581730fd2994ca5361d84087/1477914881284/tumblr_n1z2g2MSiQ1sso6sco1_500.gif",
		sample: 'var container = document.getElementsByTagName ( "aside" )[0]; alert ( "Высота контейнера (включая внутренние отступы): " + container.clientHeight + "  Ширина контейнера (включая внутренние отступы): " + container.clientWidth ); alert ( "Ширина верхней рамки контейнера: " + container.clientTop + "  Ширина левой рамки контейнера: " + container.clientLeft );',
		action: 'alert("Высота контейнера (включая внутренние отступы): " + parent_object.container.clientHeight + "\\nШирина контейнера (включая внутренние отступы): " + parent_object.container.clientWidth); alert ( "Ширина верхней рамки контейнера: " + parent_object.container.clientTop + "\\nШирина левой рамки контейнера: " + parent_object.container.clientLeft );',
		help: 'clientHeight | clientWidth: высота и ширина элемента, включая внутренние отступы (padding). clientTop - ширина верхней (border-top) и clientLeft - левой (border-left) рамки контейнера.'
	};
	
	// ------------------------------------------------------------------------------------- contentEditable
	
	parent_object.data[4] = {
		title: 'contentEditable  ' + stars + '  isContentEditable',
		name: null,
		//img: 'http://cory.c.o.pic.centerblog.net/3m0uljq2.gif',
		img: 'http://s8.favim.com/orig/150718/blue-clouds-music-summer-Favim.com-2975385.gif',
		sample: 'var txt = document.createElement ( "p" ); document.body.appendChild( txt ); txt.innerHTML = "Попробуй изменить этот текст"; alert( "isContentEditable: " + txt.isContentEditable ); txt.contentEditable = confirm ( "Сделать элемент редактируемым?" );',
		action: 'if ( document.getElementsByTagName("figure").length == 0 ) { var figure = document.createElement ("figure"); figure.style.position = "fixed"; figure.style.top = "2%"; figure.style.left = "58%"; parent_object.appendChild(figure); var txt = document.createElement ("p"); figure.appendChild(txt); txt.style.color = "#0f0"; txt.innerHTML = "Попробуй изменить этот текст"; txt.contentEditable = true; var btn = document.createElement("button"); figure.appendChild(btn); btn.innerHTML = "Удалить"; btn.obj = figure; btn.onclick = function (event) { this.obj.parentNode.removeChild(this.obj); }; }',
		help: 'Свойство contentEditable имеет логическое значение: false - контент элемента нельзя редактировать, true -  контент элемента можно редактировать'
	};
	
	// ------------------------------------------------------------------------------------- firstChild / lastChild
	
	parent_object.lastChild_txt = "<img src='https://drive.google.com/uc?export=download&amp;id=0BxaMB69y7fvSUkxYUVY1cUJYUE0' class='picture' title='Я - картинка в контейнере ASIDE, у меня класс picture' style='width: 100%; height: auto;'>";
	parent_object.firstElementChild_txt = "<img src='http://garevna.pp.ua/buttons/js.png' class='picture' title='Я - картинка в контейнере ASIDE, у меня класс picture' style='width: 100%; height: auto;'>";
	
	parent_object.data[5] = {
		title: 'firstChild  ' + stars + '  lastChild  ' + stars + '  firstElementChild  ' + stars + '  lastElementChild',
		name:null,
		//img:'http://www.susanagarbuyo.com/imagenes/hijos/papa_e_hijos.gif',
		// img:'https://media.giphy.com/media/zN75R1cZ2WJFK/giphy.gif',
		img: "http://i.imgur.com/S1HcyDD.gif",
		sample: 'var container = document.getElementsByTagName ( "aside" )[0]; console.info ( "firstChild" ); console.log ( container.firstChild ); console.info ( "lastChild" ); console.log ( container.lastChild ); console.info ( "firstElementChild" ); console.log ( container.firstElementChild ); console.info ( "lastElementChild" ); console.log ( container.lastElementChild );',
		action: 'console.info ( "firstChild" ); console.log ( parent_object.container.firstChild ); console.info ( "lastChild" ); console.log ( parent_object.container.lastChild ); alert ("firstChild | lastChild:\\n\\nВ консоли будет следующее:\\n---------------------------------------------------------------------------------\\n <!-- Это контейнер для картинок -->\\n\\n' + parent_object.lastChild_txt + '\\n---------------------------------------------------------------------------------\\nпотому что первый узел в контейнере - комментарий, а последний - элемент img"); console.log ( parent_object.container.firstElementChild ); console.info ( "lastElementChild" ); console.log ( parent_object.container.lastElementChild ); alert ("firstElementChild | lastElementChild\\n\\nВ консоли будет следующее:\\n---------------------------------------------------------------------------------\\n\\n' + parent_object.firstElementChild_txt + '\\n\\n' + parent_object.lastChild_txt + '\\n---------------------------------------------------------------------------------\\n\\nпотому что и первый, и последний элемент-потомок в контейнере - элементы img");',
		help: 'firstChild | lastChild: Первый / последний узел-потомок элемента. firstElementChild | lastElementChild: Первый / последний элемент-потомок элемента'
	};
	// -------------------------------------------------------------------------------------------------------- innerHTML
	
	parent_object.outerHTMLanswer = "<figure id='newText' style='position:fixed; top:10%; left:10%;'>";
	parent_object.data[6] = {
		title: 'innerHTML  ' + stars + '  outerHTML',
		img: '/Javascript/anim_gif/html-1.gif',
		sample: 'var figure = document.createElement&nbsp;(&nbsp;"figure"&nbsp;); figure.style.position = "fixed"; figure.id = "newText"; figure.style.top = "10%"; figure.style.left = "10%"; document.body.appendChild ( figure ); figure.innerHTML = prompt ( "Введи любой текст (можно даже теги)", "Наверное, будет дождь" ); alert ("Внутренний html-код элемента: " + figure.innerHTML + " Внешний html-код элемента: " + figure.outerHTML);',
		// action: 'if ( document.getElementsByTagName("figure").length == 0 ) { var figure = document.createElement ("figure"); figure.style.position = "fixed"; figure.style.top = "2%"; figure.style.left = "55%"; parent_object.appendChild(figure); figure.innerHTML = prompt("Введи любой текст (можно даже теги)", "<p>Наверное, будет дождь</p>"); alert ("Внутренний html-код элемента:\\n\\n" + figure.innerHTML + "\\n\\nВнешний html-код элемента:\\n\\n" + figure.outerHTML + "\\n\\n"); var btn = document.createElement("button"); figure.appendChild(btn); btn.innerHTML = "Удалить"; btn.obj = figure; btn.onclick = function (event) { this.obj.parentNode.removeChild(this.obj); }; }',
		action: 'var $text = prompt("Введи любой текст (можно даже теги)", "Наверное, будет дождь"); var promptWinHTML = parent_object.outerHTMLanswer + $text + "</figure>"; garevna_lib.createPromptWin(promptWinHTML); alert ("Внутренний html-код элемента:\\n\\n" + $text + "\\n\\nВнешний html-код элемента:\\n\\n" + document.getElementById("newText").outerHTML);',
		help: 'Внутренний / внешний html-код элемента'
	};
	
	// --------------------------------------------------------------------------------- nextSibling | previousSibling
	
	parent_object.data[7] = {
		title: 'nextSibling  ' + stars + '  previousSibling',
		name: null,
		img: '/Javascript/anim_gif/007.gif',
		sample: 'var picture = document.getElementsByClassName ( "picture" )[2]; alert ( "URL предыдущей картинки: " + picture.previousSibling.src + "\\nURL следущей картинки: " + picture.nextSibling.src ); ',
		help: 'Ближайшие узлы-соседи элемента: предыдущий (previousSibling) и следующий (nextSibling)'
	};
	
	// --------------------------------------------------------------------------------- 
	
	parent_object.nodeParamsText = '<h1 onclick = "garevna_lib.speakAboutNode(this);">Кликни на любом элементе, чтобы получить инфо</h1><div onclick = "garevna_lib.speakAboutNode(this);">Это элемент div</div><div onclick = "garevna_lib.speakAboutNode(this);"><!-- comment -->Это элемент div с комментарием внутри</div><img src="https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSUWVpRUJlejQ3aXc" onclick = "garevna_lib.speakAboutNode(this);"/><button onclick = "garevna_lib.speakAboutNode(this);">Кнопка</button>';
	
	parent_object.data[8] = {
		title: 'nodeName  ' + stars + '  nodeType  ' + stars + '  nodeValue',
		name: null,
		//img: '/Javascript/anim_gif/node.gif',
		//img: 'http://bestanimations.com/Fantasy/Dragons/dragon-animated-gif-81.gif',
		img: 'http://images.jedessine.com/_uploads/_tiny_galerie/20080940/momie_vz0.gif',
		sample: 'alert (document.getElementsByClassName ( "picture" )[0].nodeName); alert (document.getElementsByClassName ( "picture" )[0].nodeType); alert (document.getElementsByClassName ( "picture" )[0].nodeValue);',
		//sample: 'var picture = document.getElementsByClassName ( "picture" )[0]; alert ( "picture:\\nnodeName: " + picture.nodeName + "\\nnodeType: " + picture.nodeType + "\\nnodeValue: " + picture.nodeValue ); alert ( "picture.previousSibling:\\nnodeName: " + picture.previousSibling.nodeName + "\\nnodeType: " + picture.previousSibling.nodeType + "\\nnodeValue: " + picture.previousSibling.nodeValue ); alert ( "picture.childNodes[0] ):\\nnodeName: " + picture.childNodes[0].nodeName + "\\nnodeType: " + picture.childNodes[0].nodeType + "\\nnodeValue: " + picture.childNodes[0].nodeValue );',
		
		// action: 'var picture = document.getElementsByClassName ( "picture" )[0]; alert ( "Первая картинка в контейнере (picture):\\nnodeName: " + picture.nodeName + "\\nnodeType: " + picture.nodeType + "\\nnodeValue: " + picture.nodeValue ); var prev = picture.previousSibling; alert ( "Теперь посмотрим на соседний с картинкой узел, предшествующий ей (picture.previousSibling):\\nnodeName: " + picture.previousSibling.nodeName + "\\nnodeType: " + picture.previousSibling.nodeType + "\\nnodeValue: " + picture.previousSibling.nodeValue ); alert ( "Теперь посмотрим на текстовый узел элемента picture ( picture.childNodes [0] .nodeValue ):\\nnodeName: " + picture.childNodes[0].nodeName + "\\nnodeType: " + picture.childNodes[0].nodeType + "\\nnodeValue: " + picture.childNodes[0].nodeValue );',
		action: 'garevna_lib.createPromptWin(parent_object.nodeParamsText);',
		help: 'nodeType может принимать следующие значения:\n1 - элемент; 2 - атрибут; 3 - текст; ... 8 - комментарий; 9 - документ.\nЕсли узел является элементом (nodeType == 1), свойство nodeValue будет иметь значение null.\nТекст элемента всегда находится внутри текстового узла (Text), который является дочерним узлом элемента (element.childNodes [0].nodeValue).\nАльтернативой свойству nodeValue является свойство textContent'
	};
	
	// ------------------------------------------------------------------------------------------ parentNode
	
	var parentNode_txt = "<aside title = 'Я - тег - ASIDE (контейнер для картинок)' style='position: absolute; top: 2%; left: 2%; width: 5%; height: auto; border: 1px inset white;'>"
	
	parent_object.data[9] = {
		title: 'parentNode',
		name: null,
		img: 'https://australianwaler.files.wordpress.com/2014/10/kangaroo-run.gif',
		sample: 'var pict = document.getElementsByClassName("picture")[0]; console.log(pict.parentNode);',
		action: 'console.log(parent_object.container); console.log(document.getElementsByClassName("picture")[0].parentNode); alert("В консоли будет выведен родительский элемент (контейнер) первого (с нулевым индексом) элемента коллекции элементов DOM с классом picture:\\n------------------------------------------------------------------\\n▸ ' + parentNode_txt + '\\n------------------------------------------------------------------\\n");',
		help: 'Свойство: элемент-предок (контейнер, содержащий элемент)'
	};
	
	create_article_content (parent_object);
}
// --------------------------------------------------------------------

// ====================================================================================== dom_elements_methods
function garevna_dom_elements_methods () {
	
	var parent_object = this;   // контекст вызова
	
	//var _code = document.body.innerHTML;
	//_code = _code.split("<");
	
	//for (var j = 0; j < _code.length; j++) {
	//	_code[j] = "&lt;" + _code[j].trim();
		// if (_code[j].length == 0) { console.info('empty'); continue; }
	//	garevna_js_library.code_anim (parent_object, _code[j], (Math.random()*window.innerWidth-200) + "px", j*0.1);
	//}
	parent_object.style.backgroundImage="url(https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSdWFNbXlobFR2V1k)";
	parent_object.style.backgroundSize = "40%";
	
	parent_object.picture = parent_object.func_params[2];
	parent_object.picture_title = parent_object.func_params[1];
	
	// parent_object.main_head = { abbr: 'DHTML', text: 'Dynamic html' };
	parent_object.main_head = { abbr: parent_object.func_params[0], text: parent_object.func_params[1] };
	
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	parent_object.container = document.createElement("aside");
	document.body.appendChild(parent_object.container);
	parent_object.container.style.position = "absolute";
	parent_object.container.style.top = "5%";
	parent_object.container.style.left = "2%";
	parent_object.container.style.width = "5%";
	parent_object.container.style.height = "5%"; 
	parent_object.newImage = document.createElement("img");
	parent_object.newImage.src = "http://garevna.pp.ua/buttons/js.png"; 
	parent_object.newImage.style.width = "100%";
	parent_object.newImage.style.height = "auto";
	parent_object.newImage.title = "Меня добавили динамически";
	
	parent_object.pictures = [
	    "http://www.alecjacobson.com/weblog/media/worm-propeller-animation.gif",
		"http://www.anniemation.com/poser-stuff/animations/instructions/moonwalk.gif",
		"https://i.stack.imgur.com/e8nZC.gif",
		"http://www.playcast.ru/uploads/2015/08/08/14612492.gif",
		"https://media.giphy.com/media/tvkdVuZS8mbza/giphy.gif"
	];
	parent_object.addImage = [];
	for (var j = 0; j < parent_object.pictures.length; j++) {
		parent_object.addImage[j] = document.createElement("img");
		parent_object.addImage[j].src = parent_object.pictures[j]; 
		parent_object.addImage[j].style.width = "100%";
		parent_object.addImage[j].style.height = "auto";
		parent_object.addImage[j].title = "Меня добавили динамически";
	}
	parent_object.inserted_picture_index = -1; 
	parent_object.data[0] = {
		name: 'appendChild()',
		sample: 'var container = document.createElement("aside"); document.body.appendChild(container); container.style.position = "absolute"; container.style.top = "5%"; container.style.left = "2%"; container.style.width = "5%"; container.style.height = "5%"; var newImage = document.createElement("img"); container.appendChild(newImage); newImage.style.width = "100%"; newImage.style.height = "auto"; newImage.title = "Меня добавили динамически";',
		action: 'if (parent_object.container.childNodes.length == 0) { parent_object.container.appendChild(parent_object.newImage);  } else { alert("Картинка уже добавлена, смотри внимательнее"); }',
		help: 'Метод. Добавляет новый элемент DOM. Новый элемент может быть вставлен в любой уже существующий на странице контейнер (элемент DOM) с помощью метода appendChild'
	};
	parent_object.data[1] = {
		name: 'hasChildNodes()',
		sample: 'alert("Есть ли потомки у элемента container:  " + container.hasChildNodes());',
		action: 'alert(parent_object.container.hasChildNodes());',
		help: 'Метод. Проверяет наличие потомков элемента (в нашем примере - элемента container)'
	};
	parent_object.data[2] = {
		name: 'insertBefore',
		sample: 'var elem = document.createElement("img"); elem.src = "' + parent_object.pictures[j] + '"; container.insertBefore(elem,newImage);',
		action: 'if (!parent_object.container.hasChildNodes()) { alert ("Нужно, чтобы в DOM уже существовал элемент, перед которым будет вставлен новый элемент. Используй сначала метод appendChild");} else { if (parent_object.inserted_picture_index<(parent_object.pictures.length-1)) { parent_object.inserted_picture_index++; parent_object.container.insertBefore(parent_object.addImage[parent_object.inserted_picture_index],parent_object.newImage);} else { alert("Ну, хватит уже, разошелся... На тебя никаких картинок не хватит!"); }} ',
		help: 'Вставляет новый элемент перед указанным (уже существующим) элементом DOM'
	};
	parent_object.data[3] = {
		name: 'removeChild()',
		sample: 'var elems = container.children; elems[elems.length-1].parentNode.removeChild(elems[elems.length-1]);',
		action: 'if (parent_object.container.hasChildNodes()) { var elems = parent_object.container.children; console.log(elems); elems[elems.length-1].parentNode.removeChild(elems[elems.length-1]);  } else { alert ("Неплохо бы сначала вставить элемент, а уж потом его удалять");}',
		help: 'Метод. Удаляет элемент DOM. Элемент не может удалить сам себя, поэтому нужно, чтобы его удалил элемент-предок'
	};
	create_article_content (parent_object);
}

