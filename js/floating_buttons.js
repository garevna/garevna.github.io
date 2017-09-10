// ============================================================================================
//             Формирует контент объекта container в виде плавающих кнопок
//                     На входе должен быть массив container.data
//            container.data_type: [ 'checkbox', 'radio', 'button' ],
//                     Структура элементов массива container.data:
//                     {
//                      	name: [ надпись ],
//                       	callback: [ исполняемый скрипт ],
//                       	help: [ всплывающая подсказка (строка) ]
//                     }
// ============================================================================================
function FloatingButtons ( params ) {
	//
	if ( !params || !params.data ) { alert ("No params"); return null; }
	this.data = params.data;
	this.data_type = params.data_type || 'button';
	this.container = document.createElement ( 'nav' );
	this.container.parentObject = this;
	this.container.style.border = 'inset 1px';
	this.container.style.overflow = 'auto';
	this.container.style.padding = '10px';
	
	this.elem_height = params.elem_height || 30;
	this.width_ratio = params.widthRatio || 0.7;
	this.height_ratio = params.heightRatio || 0.7;
	this.margin_top_ratio = ( 1 - this.height_ratio ) / 2;
	this.margin_left_ratio = ( 1 - this.width_ratio ) / 2;
	
	// 
	// this.tweens = [];
	this.elements = [];
	
	// TweenLite.defaultOverwrite = "all";
	
	// Создаем стиль плавающих элементов
    var newStyle = document.createElement ('style');
    newStyle.innerHTML = '.floating_elements { position:relative; float: left; padding: 2px 5px; z-index=10; box-sizing:border-box; font-family: Arial; font-size: 12px; }';
    document.body.appendChild ( newStyle );
	
	var maxChars = 0;
	for (var j = 0; j < this.data.length; j++) {
		maxChars = Math.max ( this.data [j].name.length, maxChars );
	}
	
	this.elem_width = maxChars * 8;
	this.elem_width += ( this.data.type == 'radio' || this.data.type == 'checkbox' ) ? 30 : 0;
	
	for (var j = 0; j < this.data.length; j++) {
		
		this.elements [j] = document.createElement( 'div' );
		this.container.appendChild ( this.elements [j] );
		this.elements [j].className = 'floating_elements';
		
		this.elements [j].style.height = this.elem_height + "px";
		this.elements [j].style.width = this.elem_width + "px";
		
		if ( this.data_type == 'button' ) {
			this.elements [j].button = document.createElement( 'button');
		} else {
			this.elements [j].button = document.createElement( 'input');
			this.elements [j].button.type = this.data_type;
		}
		
		this.elements [j].appendChild ( this.elements[j].button );
		this.answer = ( this.data_type == 'radio' || this.data_type == 'button' ) ? null : [];
		
		this.elements [j].button.onclick = function ( event ) {
			// event.target 									- this.elements [j].button
			// event.target.parentNode							- this.elements [j]
			// event.target.parentNode.parentNode				- this.container
			// event.target.parentNode.parentNode.parentObject	- this
			
			var _this = event.target.parentNode.parentNode.parentObject;
			
			if ( _this.data_type == 'radio' || _this.data_type == 'button' ) {
				_this.answer = event.target.value;
			} else {    //  checkbox
				if ( event.target.checked ) { _this.answer.push ( event.target.value ); }
				else {
					var ind = _this.answer.indexOf ( event.target.value );
					if ( ind >= 0 ) { _this.answer.splice ( ind, 1 ); }
				}
			}
			console.info ( _this.answer );
		}
		
		this.elements[j].innerHTML += this.data[j].name;
		if ( this.data_type == 'button' ) { this.elements[j].style.borderRadius = '5px'; }
	}
	
	this.resize_callback = function () {
		
		//  Положение и размер контейнера
		
		// this - window
		
		var rect = this.container.getBoundingClientRect ();
		this.container.currentWidth = rect.width;
		this.container.currentHeight = rect.height;
		
		var max_height = Math.round ( window.innerHeight * this.heightRatio );
		var max_width = Math.round ( window.innerWidth * this.widthRatio );
		//var _marginLeft = Math.round ( window.innerWidth * this.marginLeftRatio );
		//var _marginTop = Math.round ( window.innerHeight * this.margintopRatio );
		
		// Определяем, как влезают элементы в контейнер
		
		var elems_per_row = Math.round ( max_width / this.elem_width );
		var elems_per_col = Math.round ( max_height / this.elem_height );
		
		var rows, cols;
		//  
		if ( elems_per_col >= this.data.length ) {
			cols = 1;
			rows = this.data.length;
		} else {
			cols = elems_per_row;
			rows = Math.round ( ( this.data.length / cols ) + 0.5 );
		}
		this.container.style.width = this.elem_width * cols + "px";
		this.container.style.height = Math.min ( max_height, ( this.elem_height + 2 ) * rows ) + "px";
		// this.container.nextWidth = this.elem_width * cols;
		// this.container.nextHeight = Math.min ( max_height, ( this.elem_height + 2 ) * rows );
		// ----------------------------------------------------------------------------------
		/*this.intervalFunc = function () {
			var dx = this.container.nextWidth - this.container.currentWidth;
			var dy = this.container.nextHeight - this.container.currentHeight;
			if ( dx == 0 && dy == 0 ) {
				clearInterval ( this._interval );
				return;
			}
			this.container.currentWidth += ( dx / Math.abs (dx) );
			this.container.currentHeight += ( dy / Math.abs (dy) );
			
			this.container.style.width = this.container.currentWidth + "px";
			this.container.style.height = this.container.currentHeight + "px";
		};
		
		this.containerMovie = this.intervalFunc.bind ( this );
		
		this._interval = setInterval ( this.containerMovie, 100 );*/
	};
	this._resize = this.resize_callback.bind ( this );
	this.create_tweens = function () {
		
		for ( var j = 0; j < this.elements.length; j++ ) {
			
			var _height = Math.round ( window.innerHeight * container.heightRatio );
			var _width = Math.round ( window.innerWidth * container.widthRatio );
					
			this.resize_callback ();
		}
	};
	window.addEventListener ( 'resize', this._resize );
}

