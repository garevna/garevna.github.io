// ===============================================================================================================
//                                       Контекст вызова должен быть определен!
// ===============================================================================================================
// parent_object.data - массив объектов формата { name:'', sample:'', help:'' }

function garevna_window_methods () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object._title = '<h1 style="color:red">BOM</h1><h2>Объект window | методы</h2>';
	parent_object.buttons_width = 200;
	
	parent_object.data = [];
	
	var _win = null;
	parent_object.data[0] = {
		name: 'window.open',
		sample: '_win = window.open("", "_blank", "width=400, height=400");',
		help: 'Открываем новое пустое окно var _win = window.open("", "_blank", "width=400, height=400");'
	};
	parent_object.data[1] = {
		name: 'window.blur',
		sample: '_win.blur();',
		help: 'Сделать окно неактивным: _win.blur();'
	};
	parent_object.data[2] = {
		name: 'window.focus',
		sample: '_win.focus();',
		help: 'Сделать окно активным: _win.focus();'
	};
	parent_object.data[3] = {
		name: 'window.document.write',
		sample: '_win.document.write("Это новое окно. В нем есть пустой документ. В него мы поместим этот текст");',
		help: '_win.document.write("Это новое окно. В нем есть пустой документ. В него мы поместим этот текст");'
	};
	parent_object.data[4] = {
		name: 'window.moveBy',
		sample: '_win.moveBy(100, 100);',
		help: 'Сместить окно на заданное расстояние относительно текущей позиции: _win.moveBy(100, 100);'
	};
	parent_object.data[5] = {
		name: 'window.moveTo',
		sample: '_win.moveTo(300, 300);',
		help: 'Сместить окно в заданную позицию: _win.moveTo(300, 300);'
	};
	parent_object.data[6] = {
		name: 'window.resizeTo',
		sample: '_win.resizeTo(500, 500);',
		help: 'Установить новый размер окна: _win.resizeTo(500, 500);'
	};
	parent_object.data[7] = {
		name: 'window.resizeBy',
		sample: '_win.resizeBy(-50, -50);',
		help: 'Изменить размер окна на заданную величину относительно текущего размера: _win.resizeBy(-50, -50);'
	};
	parent_object.data[8] = {
		name: 'window.close',
		sample: '_win.close();',
		help: 'Закрыть окно: _win.close();'
	};
	create_article_content (parent_object);
}
// ========================================================================================== garevna_console_study
function garevna_console_study () {
	
	var parent_object = this;   // контекст вызова
	
	parent_object._title = '<h1 style="color:#f09">BOM</h1><h2>Веб-консоль | Ctrl+Shift+J или F12</h2>';
	parent_object.buttons_width = 120;
	
	parent_object.data = [];
	
	parent_object.data[0] = {
		name: 'console.info',
		sample: 'console.info("Мы изучаем веб-консоль");',
		help: 'Вывести в консоль информационное сообщение'
	};
	parent_object.data[1] = {
		name: 'console.error',
		sample: 'console.error("А это ошибка!");',
		help: 'Вывести в консоль сообщение об ошибке'
	};
	parent_object.data[2] = {
		name: 'console.warn',
		sample: 'console.warn("Это предупреждение");',
		help: 'Вывести в консоль предупреждение'
	};
	parent_object.data[3] = {
		name: 'console.clear',
		sample: 'console.clear();',
		help: 'Очистить консоль'
	};
	parent_object.data[4] = {
		name: 'console.log',
		sample: 'console.log(console);',
		help: 'Вывести в консоль объект браузера console'
	};
	parent_object.data[5] = {
		name: 'console.dir',
		sample: 'console.dir(window);',
		help: 'Вывести в консоль объект window'
	};
	create_article_content (parent_object);
}

// ============================================================================================ create_article_content
function create_article_content (parent_object) {
	//
	//var parent_object = this;
	parent_object.tweens = [];
	parent_object.figures = [];
	
	TweenLite.defaultOverwrite = "all";
	
	var article_title = document.createElement('div');
	article_title.innerHTML = parent_object._title;
	parent_object.appendChild(article_title);
	article_title.style.position = 'absolute';
	article_title.style.bottom = '10px';
	article_title.style.right = '10px';
	
	for (var j = 0; j < parent_object.data.length; j++) {
		
		parent_object.figures[j] = document.createElement('button');
		parent_object.figures[j].style.position = 'fixed';
		parent_object.figures[j].style.border = 'inset 1px white';
		parent_object.figures[j].style.borderRadius = '5px';
		parent_object.figures[j]._height = 40;
		parent_object.figures[j].style.width = parent_object.buttons_width + 'px';
		parent_object.figures[j].style.height = parent_object.figures[j]._height + 'px';
		
		parent_object.figures[j].innerHTML = parent_object.data[j].name;
		parent_object.figures[j].title = parent_object.data[j].help;
		parent_object.figures[j].action = parent_object.data[j].sample;
		parent_object.figures[j].onclick = function (event) { eval(this.action); };
		
		parent_object.appendChild( parent_object.figures[j] );
		//parent_object.tweens[j].play();
		
	};
	
	function create_tweens () {
		var _t = 0;
		var _l = 0;
		
		for (var j = 0; j < parent_object.figures.length; j++) {
			
			var fig = parent_object.figures[j];
			var dat = parent_object.data[j];
			var c1 = Math.random()*255;
			var c2 = Math.random()*255;
			var c3 = Math.random()*255;
			
			fig.style.top = Math.random()*window.innerHeight*0.7 + 'px';
			fig.style.left = Math.random()*window.innerWidth*0.7 + 'px';
			
			dat._top = (window.innerHeight*0.1 + (fig._height + 2)*(j - _t + 1)) + 'px';
			dat._left = (window.innerWidth*0.1 + _l) + 'px';
			
			if (window.innerHeight*0.1 + (fig._height + 2)*(j - _t + 1) > window.innerHeight*0.7) {
				_l += parent_object.buttons_width + 5;
				_t = j;
			}
			parent_object.tweens[j] = TweenLite.to(fig, 2, {
						top: dat._top,
						left: dat._left,
						color: 'rgb(' + c1 + ',' + c2 + ',' + c3 + ')',
						onComplete:function () {
							console.log(this.color);
						} 
			});
			
		}
	};
	parent_object.onTweenFront_callback = function () {
		create_tweens ();
	};
	parent_object.resize_callback = function () {
			var _t = 0;
			var _l = 0;
			for (var j = 0; j < parent_object.tweens.length; j++) {
				if (window.innerHeight*0.1 + (parent_object.figures[j]._height + 2)*(j - _t + 1) > window.innerHeight*0.7) {
					_l += parent_object.buttons_width;
					_t = j;
				}
				parent_object.data[j]._top = (window.innerHeight*0.1 + (parent_object.figures[j]._height + 2)*(j - _t + 1)) + 'px';
				parent_object.data[j]._left = (window.innerWidth*0.2 + _l) + 'px';
				parent_object.tweens[j] = TweenLite.to(parent_object.figures[j], 2, {
						top: parent_object.data[j]._top,
						left: parent_object.data[j]._left,
						onComplete:function () {
							//console.log(parent_object);
						} 
		});
			}
	};
	window.onresize = function (event) { parent_object.resize_callback(); };
}
