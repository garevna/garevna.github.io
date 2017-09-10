// JavaScript Document
function selectors(item_num)
{
	var html = '<div class="task-text">';
	switch(item_num) {
      case 3:
        html += '<div><p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">*</span> { font-size:14px; font-family:Arial; }';
		html += '<span  class="gray">  /* Универсальный селектор - все элементы */</span></sel>';
		html += '<sel><span class="magenta">body</span> { background-color:#dde; font-size:14px; font-family:Arial; }</sel>';
		html += '<sel><span class="magenta">p</span> { text-align:justify; text-indent:25px; }</sel>';
		html += '<sel><span class="magenta">img</span> { width:auto; height:auto; max-width:250px; }</sel>';
		html += '<p class="green">&lt;/style&gt;</p></div>';
        break;
      case 4:
        html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">.black_white</span> { background-color:black; color:white; }</sel>';
		html += '<sel><span class="magenta">.boxShadow</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/body></h3></div>';
        break;
      case 5:
	    html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">#header</span> { font-size:150%; color:white; }</sel>';
		html += '<sel><span class="magenta">#footer</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '<div><h3>&lt;body></h3>';
		html += '&lt;div <span class="magenta">id="header"</span>Начало раздела (страницы)&lt;/div><br />';
		html += '...<br />';
		html += '&lt;div <span class="magenta">id="footer"</span>"Подвал" раздела (страницы)&lt;/div>';
		html += '<h3>&lt;/body></h3></div>';
	  case 6:
	    html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">[title]</span> { background-color:black; color:white; }</sel>';
		html += '<sel><span class="magenta">input[type="text"]</span> { </sel><atr>-webkit-text-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-text-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-text-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>text-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<sel><span class="magenta">input[type="button"]</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '<div><h3>&lt;body></h3>';
		html += '&lt;div <span class="magenta">title</span>="<span class="dark_gray">Этот тег имеет атрибут title</span>">Смотри &lt;/div><br />';
		html += '&lt;input <span class="magenta">type="text"</span> value="Введите текст" /><br />';
		html += '&lt;input <span class="magenta">type="button"</span> value="Нажми меня">';
		html += '<h3>&lt;/body></h3></div>';
		html += '<hr>';
		html += '<div title="Этот тег имеет атрибут title">Смотри</div>';
		html += '<div title="Этот тег имеет атрибут title">Смотри</div>';
	  case 7:
	    html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">p:first-letter</span> { font-size:250%; color:green; }</sel>';
		html += '<sel><span class="magenta">p:first-line</span> { font-style:italic; }</sel>';
		html += '<sel><span class="magenta">p:hover</span> { </sel><atr>-webkit-text-shadow: 1px 1px 0px rgba(0,0,0,0.5);</atr><atr>-moz-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>-o-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<sel><span class="magenta">div:hover, div:focus</span> { </sel><atr>-webkit-box-shadow: 4px 4px 3px rgba(0,0,0,0.5);</atr><atr>-moz-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>-o-box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><atr>box-shadow: 4px 4px 3px rgba(0,0,0,0.5); </atr><sel>}</sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
		html += '<div><h3>&lt;body></h3>';
		html += '&lt;p>first-letter - это псевдо-элемент. Первая буква абзаца будет в два с половиной раза больше остальных и зеленого цвета&lt;/p><br />';
		html += '&lt;p>first-line - это псевдо-элемент. Первая строка абзаца будет курсивом&lt;/p><br />';
		html += '&lt;p>hover - это псевдо-класс. При наведении курсора на этот текст он будет отображаться с тенью&lt;/p><br />';
		html += '&lt;div>focus - это псевдо-класс. При получении объектом фокуса блок будет отображаться с тенью&lt;/p>';
		html += '<h3>&lt;/body></h3></div>';
	  case 8:
	    html += '<div><h3>&lt;head></h3>...';
		html += '<p class="green">&lt;style&gt;</p>';
		html += '<sel><span class="magenta">div p</span> { color:green; font-style:italic; }';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p> внутри &lt;div> элемента */</span></sel>';
		html += '<sel><span class="magenta">div > p</span> { color:blue;  }';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p>, для которых родительским является &lt;div> элемент */</span></sel>';
		html += '<sel><span class="magenta">div + p</span> { color:red;  }';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p>, следующие непосредственно за &lt;div> элементом */</span></sel>';
		html += '<sel><span class="magenta">h1~p</span> { </sel><atr>-webkit-text-shadow: 1px 1px 0px rgba(0,0,0,0.5);</atr><atr>-moz-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>-o-text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><atr>text-shadow: 1px 1px 0px rgba(0,0,0,0.5); </atr><sel>}';
		html += '<span  class="gray">  /* Выбираются все элементы &lt;p>, которым предшествует элемент &lt;h1> */</span></sel>';
		html += '<p class="green">&lt;/style&gt;</p>';
		html += '<h3>&lt;/head></h3><hr></div>';
	  default:
        break;
	} 
	html += '</div>';
	document.getElementById("scene").innerHTML = html;
}