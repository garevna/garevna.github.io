// ==============================================================
//                       Courseware html & CSS
//                            module 05
// ==============================================================
var garevna_html_05 = function (func_name) {
	
	var func = {};
	// ---------------------------------------------------------------------------------------------- visibility
	func['background_image'] = function() {
			
		var $ret = garevna_Level2.scene.innerHTML = '<blck><h2><img2>&nbsp;</img2>Вставка фонового изображения с помощью таблиц стилей (CSS-форматирование)</h2></blck><blck><h3>Стиль элементов</h3><p>В данном случае мы используем в качестве селекторов названия html-элементов</p><kwds>body {</kwds><cod><atrb>background-image</atrb>:<vals> url(/images/fon.gif)</vals>;<gray>URL фонового изображения</gray></cod><cod><atrb>background-repeat</atrb>:<vals>repeat</vals>; <gray>Повторение фонового изображения</gray></cod><kwds>}</kwds><hr><kwds>body<br>{</kwds><cod><atrb>background-image</atrb>:<vals> url(/images/fon.gif)</vals>;</cod><cod><atrb>background-repeat</atrb>:<vals>no-repeat</vals>;<gray>Фоновое изображение не повторяется</gray></cod><cod><atrb>background-size</atrb>:<vals>80px 60px</vals>;<gray>Размеры фонового изображения</gray></cod><cod><atrb>background-position</atrb>:<vals>right top</vals>; <gray>Фоновое изображение размещается в правом верхнем углу страницы</gray></cod><cod><atrb>background-attachment</atrb>:<vals>fixed</vals>; <gray>Фоновое изображение не скроллингуется при прокрутке страницы</gray></cod><hr><comm><atrb>background-repeat</atrb>: <vars>repeat | no-repeat | repeat-x | repeat-y</vars></comm><comm><atrb>background-size</atrb>: <vars>auto | ширина и высота | cover | contain | initial | inherit </vars></comm><comm><atrb>background-attachment</atrb>:<vars>fixed | scroll | local | initial | inherit </vars></comm><kwds>}</kwds></blck><hr><blck><h3>Создание класса</h3><kwds>.my_elem<br>{</kwds><cod><atrb>background-image</atrb>:<vals> url(/images/fon.gif)</vals>; <gray>URL фонового изображения</gray></cod><cod><atrb>background-repeat</atrb>:<vals>repeat-x</vals>; <gray>Фоновое изображение повторяется только по горизонтали</gray></cod><kwds>}</kwds></blck><hr><blck><h3>Определение стиля элемента по уникальному идентификатору</h3><kwds>#my_div<br>{</kwds><cod><atrb>background-image</atrb>:<vals> url(/images/fon.gif)</vals>; <gray>URL фонового изображения</gray></cod><cod><atrb>background-repeat</atrb>:<vals>repeat-y</vals>; <gray>Фоновое изображение повторяется только по вертикали</gray></cod><kwds>} </kwds></blck>';
		garevna_Level2.scene.innerHTML = $ret;
	};
	func['tag_image'] = function() {
		garevna_Level2.scene.innerHTML = '<blck><mgnt>&lt;img</mgnt> <atrb>src</atrb>="<vals>/html-css/images/CSS-Edit.png</vals>" <atrb>alt</atrb>="<vals>CSS3</vals>" <atrb>height</atrb>="<vals>50px</vals>" <atrb>width</atrb>="<vals>50px</vals>"></blck><br /><h3>Атрибуты тега &lt;img></h3><blck><mgnt>src</mgnt><gray>&nbsp;&nbsp;URL-адрес изображения</gray></blck><blck><mgnt>alt</mgnt><gray>&nbsp;&nbsp;альтернативный текст, который появляется вместо изображения</gray></blck><blck><mgnt>height</mgnt><gray>&nbsp;&nbsp;высота изображения</gray></blck><blck><mgnt>width</mgnt><gray>&nbsp;&nbsp;ширина изображения</gray></blck><blck><mgnt>longdesc</mgnt><gray>&nbsp;&nbsp;URL-адрес детального описания изображения</gray></blck>';
	};
	// -----------------------------------------------------------------------------
	return function() {
		return func[func_name]();
	}
}