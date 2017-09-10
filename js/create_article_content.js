// ============================================================================================
//             Формирует контент объекта parent_object в виде плавающих кнопок
//                     На входе должен быть массив parent_object.data
//                     Структура элементов массива parent_object.data:
//                     {
//                      	name: [ надпись на кнопке (строка) ],
//                       	sample: [ исполняемый скрипт ],
//                       	help: [ всплывающая подсказка (строка) ]
//                     }
// ============================================================================================
function create_article_content ( parent_object ) {
	//
	parent_object.style.backgroundColor = 'black';
	parent_object.style.overflow = 'auto';
	parent_object.tweens = [];
	parent_object.figures = [];
	
	TweenLite.defaultOverwrite = "all";
	if (parent_object.picture) {
		var article_picture = document.createElement('img');
		article_picture.src = parent_object.picture;
		article_picture.style.width = "70px";
		article_picture.style.height = "auto";
		article_picture.style.position = 'absolute';
		article_picture.style.bottom = '10px';
		article_picture.style.left = '10px';
		parent_object.appendChild(article_picture);
		article_picture.title = parent_object.picture_title;
	}
	// garevna_main_head.parentNode.replaceChild( get_abbreviation_object ( parent_object.main_head.abbr, parent_object.main_head.text), garevna_main_head );
	var article_main_head = get_abbreviation_object ( parent_object.main_head.abbr, parent_object.main_head.text );
	parent_object.appendChild(article_main_head);
	article_main_head.style.position = 'absolute';
	article_main_head.style.bottom = '0';
	article_main_head.style.margin = '0';
	article_main_head.style.right = '10px';
	article_main_head.style.fontSize = '150px';
	
	parent_object.result = document.createElement('p');
	parent_object.appendChild(parent_object.result);
	parent_object.result.style.position = 'fixed';
	parent_object.result.style.bottom = '0';
	parent_object.result.style.left = '80px';
	parent_object.result.style.color = '#fff';
	parent_object.result.style.backgroundColor = '#000';
	parent_object.result.style.padding = '4px 10px';
	parent_object.result.style.fontSize = '11px';
	parent_object.result.style.borderRadius = '4px';
	
	for (var j = 0; j < parent_object.data.length; j++) {
		
		parent_object.figures[j] = document.createElement('div');
		parent_object.figures[j].className = 'floating_buttons';
		parent_object.figures[j]._height = parent_object.data[j].img?50:30;
		parent_object.figures[j]._width = parent_object.buttons_width || (parent_object.data[j].img?100:50);
		
		if ( parent_object.data[j].img ) {
			parent_object.figures[j].style.backgroundImage = 'url(' + parent_object.data[j].img + ')';
		}
		parent_object.figures[j].innerHTML = parent_object.data[j].name;
		parent_object.figures[j].style.borderRadius = '5px';
		parent_object.figures[j].style.width = parent_object.buttons_width + 'px';
		parent_object.figures[j].style.height = parent_object.figures[j]._height + 'px';
		parent_object.figures[j].style.position = 'fixed';
		parent_object.figures[j].style.zIndex = '10';
		
		parent_object.figures[j].title = parent_object.data[j].help;
		parent_object.figures[j].name = parent_object.data[j].title;
		parent_object.figures[j].action = parent_object.data[j].action || parent_object.data[j].sample;
		parent_object.figures[j].sample = parent_object.data[j].sample || '';
		parent_object.figures[j].userObjects = parent_object.data[j].userObjects || null;
		parent_object.figures[j].userProperties = parent_object.data[j].userProperties || null;
		parent_object.figures[j].userValues = parent_object.data[j].userValues || null;
		parent_object.figures[j].onmouseover = function (event) {
				parent_object.result.innerHTML = '<h3>' + event.target.name + '</h3>';
		}
		parent_object.figures[j].onmouseout = function (event) {
				parent_object.result.innerHTML = '';
		}
		parent_object.figures[j].onclick = function (event) {
			if (parent_object.result && garevna_js_content) {
				parent_object.result.innerHTML = this.title;
				js_elem = [{
					txt:garevna_js_content.coloringText (this.sample),
					title:this.title 
				}];
				garevna_js_library.jsInit(js_elem);
			}
			//garevna_lib.fade_window (this.title, null, { bottom:'5%', right:'5%', left:'50%', top:'10%' } );
			try {
				eval(this.action);
			}
			catch (err) {
				console.info('Думай, что делаешь, потому что: ' + err.message);
			}
		};
		
		parent_object.appendChild( parent_object.figures[j] );
		var size = parent_object.figures[j].getBoundingClientRect();
	};
	
	function create_tweens () {
		var _t = 0;
		var _l = 0;
		
		for (var j = 0; j < parent_object.figures.length; j++) {
			
			var fig = parent_object.figures[j];
			
			var fh = ( fig._height + 2 ) * ( j - _t );
			
			var dat = parent_object.data[j];
			var c1 = Math.round ( Math.random() * 255 );
			var c2 = Math.round ( Math.random() * 255 );
			var c3 = Math.round ( Math.random() * 255 );
			
			var h01 = Math.round ( window.innerHeight * 0.1 );
			var h07 = Math.round ( window.innerHeight * 0.7 );
			var w01 = Math.round ( window.innerWidth * 0.1 );
			var w07 = Math.round ( window.innerWidth * 0.7 );
			
			fig.style.top = Math.round ( Math.random() * h07 ) + 'px';
			fig.style.left = Math.round ( Math.random() * w07 ) + 'px';
			
			dat._top = Math.round ( h01 + fh ) + 'px';
			dat._left = Math.round ( w01 + _l ) + 'px';
			
			if ( h01 + fh > w07 ) {
				_l += parent_object.buttons_width + 5;
				_t = j;
			}
			parent_object.tweens[j] = TweenLite.to(fig, 2, {
						top: dat._top,
						left: dat._left,
						color: 'rgb(' + c1 + ',' + c2 + ',' + c3 + ')',
						onComplete:function () {
							
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
			var h01 = Math.round ( window.innerHeight * 0.1 );
			var h07 = Math.round ( window.innerHeight * 0.7 );
			var w01 = Math.round ( window.innerWidth * 0.1 );
			var w02 = Math.round ( window.innerWidth * 0.2 );
			
			for (var j = 0; j < parent_object.tweens.length; j++) {
				
				var fh = ( parent_object.figures[j]._height + 2) * (j - _t);
				
				if ( h01 + fh > h07 ) {
					_l += parent_object.buttons_width;
					_t = j;
				}
				parent_object.data[j]._top = w01 + fh + 'px';
				parent_object.data[j]._left = w02 + _l + 'px';
				parent_object.tweens[j] = TweenLite.to ( parent_object.figures[j], 2, {
						top: parent_object.data[j]._top,
						left: parent_object.data[j]._left,
						onComplete:function () {
							
						} 
		});
			}
	};
	window.onresize = function (event) { parent_object.resize_callback(); };
}