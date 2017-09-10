// JavaScript Document
// News
function generate_news_content(news)
{
	  var $html = '<div class="flex-div" id="news_content" oncontextmenu="right_mouse_button_click();">';
	  var img_style = '" style="width:20%; height:auto; float:left; margin:0 10px 10px 0" />';
      for (var j = 0; j < news.length; j++)
      {
			  $html +='<div class="paper"><div class="news_content"><div class="news_header">';
			  if (news[j].news_picture !== undefined)
			  {
					$html +='<img src="' + news[j].news_picture + img_style;
              }
			  if (news[j].news_header !== undefined && news[j].news_header.length>0)  {  $html +='<h2>' + news[j].news_header + '</h2>';  }
			  $html += '</div><!-- news_header -->';
			  if (news[j].news_text !== undefined && news[j].news_text.length>0)
			  {
				  $html += '<div class="news_text"><p>' + news[j].news_text + '</p></div>';
			  }
			  $html += '</div><!-- news_content -->';
			  $html += '</div><!-- paper -->';
	  }
      $html += (news.length > 1)?('</div>'):(''); 
      return $html;
}
  
function set_news(elem_name,news)
{
	// elem_name - id of element (div) where the news will be shown
	// news - array of objects: [ { news_header, news_text, news_picture } ]
	$new_paper = document.getElementById(elem_name);
	$new_paper.innerHTML = generate_news_content(news);
	var $size = { width:$new_paper.clientWidth, height:$new_paper.clientHeight };
	var $papers = document.getElementsByClassName("paper");
	var $content = document.getElementsByClassName("news_content");
	var $text = document.getElementsByClassName("news_text");
	var $header = document.getElementsByClassName("news_header");
	for (var j=0; j<$content.length; j++)
	{
	    $papers[j].style.width = ($content[j].clientWidth) + 'px';
		$papers[j].style.height = ($content[j].clientWidth) + 'px';
		$text[j].style.height = ($content[j].clientWidth - $header[j].clientHeight - 100) + 'px';
	}
	$('.news_text').niceScroll();
}
// ======================================================================
function right_mouse_button_click()
{
	alert('Для удаления сообщений кликните на корзине');
}
