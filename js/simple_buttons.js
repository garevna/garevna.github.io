// ============================================================================================
//                            Формирует объект container и его контент
//               На входе должен быть объект params, содержащий массив params.data
//            			params.data_type: [ 'checkbox', 'radio', 'button' ],
//                     		Структура элементов массива params.data:
//                     {
//                      	label: [ надпись ],
//                      	val: [ значение ],
//                       	callback: [ исполняемый скрипт ],
//                       	help: [ всплывающая подсказка (строка) ]
//                     }
// ============================================================================================
function SimpleButtons ( params ) {
	//
	if ( !params || !params.data ) { alert ( "Error: No params" ); return null; }
	this.data = params.data;
	this.data_type = params.data_type || 'button';
	
	this.container = document.createElement ( 'nav' );
	this.container.parentObject = this;
	this.container.style.border = 'inset 1px';
	this.container.style.overflow = 'auto';
	this.container.style.padding = '10px';
	this.container.style.boxSizing = 'border-box';
	this.container.style.margin = '20px';
	
	this.container._parentObject = this;
	
	this.elem_height = params.elem_height || 30;
	this.width_ratio = params.widthRatio || 0.7;
	this.height_ratio = params.heightRatio || 0.7;
	console.log ( 'Ratio: ' + this.width_ratio + " | " + this.height_ratio );
	this.margin_top_ratio = ( 1 - this.height_ratio ) / 2;
	this.margin_left_ratio = ( 1 - this.width_ratio ) / 2;
	
	// 
	// this.tweens = [];
	this.elements = [];
	this._answer = ( this.data_type == 'radio' || this.data_type == 'button' ) ? null : [];
	this.createElements();
	
	this._resize = this.resize_callback.bind ( this );
	window.addEventListener ( 'resize', this._resize );
	this._resize ();
}
// ========================================================================================================
SimpleButtons.prototype.createElements = function () {
	
	// Создаем стиль плавающих элементов
    var newStyle = document.createElement ('style');
    newStyle.innerHTML = '.simple_elements { position:relative; float: left; padding: 2px 5px; z-index=10; box-sizing:border-box; font-family: Arial; font-size: 12px; }';
    document.body.appendChild ( newStyle );
	
	var maxChars = 0;
	for (var j = 0; j < this.data.length; j++) {
		maxChars = Math.max ( this.data [j].label.length, maxChars );
	}
	
	this.elem_width = maxChars * 8;
	this.elem_width += ( this.data.type == 'radio' || this.data.type == 'checkbox' ) ? 30 : 0;
	
	for (var j = 0; j < this.data.length; j++) {
		
		this.elements [j] = document.createElement( 'div' );
		this.container.appendChild ( this.elements [j] );
		this.elements [j].className = 'simple_elements';
		
		this.elements [j].style.height = this.elem_height + "px";
		this.elements [j].style.width = this.elem_width + "px";
		
		this.elements [j]._answer = this.data [j].val || j;
		this.elements [j]._callback = this.data [j].callback || null;
		
		this.elements [j].appendChild ( this.createButton ( this.data [j].label ) );
		
		this.elements[j].innerHTML += ( this.data_type == "button" ) ? "" : this.data[j].label;
		this.elements[j].onclick = this.__click__.bind ( this.elements[j].firstChild );
	}
};

SimpleButtons.prototype.createButton = function ( label ) {
	
	var _button = document.createElement( ( this.data_type == 'button' ) ? 'button' : 'input' );
	if ( this.data_type == 'button' ) { _button.innerHTML = label; }
	else { _button.type = this.data_type; _button.name = this.data_type + '_elements'; }
	
	return _button;
};

SimpleButtons.prototype.__click__ = function () {
	
	var _parent = this.parentNode.parentNode._parentObject;
	
	if ( this.tagName == 'INPUT' ) {
		if ( this.type == 'checkbox' ) {
			if ( this.checked ) { _parent._answer.push ( this.parentNode._answer ); }
			else {
				var ind = _parent._answer.indexOf ( this.parentNode._answer );
				if ( ind >= 0 ) { _parent._answer.splice ( ind, 1 ); }
			}
		} else { _parent._answer = this.checked ? this.parentNode._answer : _parent._answer; }
	}
	
	if ( this.parentNode._callback ) { this.parentNode._callback (); }
	
	console.info ( _parent._answer );
};

SimpleButtons.prototype.resize_callback = function () {
		
		//  Положение и размер контейнера
		
		var parent_element = this.container.parentNode;
		if ( parent_element ) {
			var rect = parent_element.getBoundingClientRect ();
			var max_width = Math.round ( rect.width ) - 40;
			var max_height = Math.round ( rect.height ) - 40;
		} else {
			var max_height = Math.round ( window.innerHeight * this.height_ratio );
			var max_width = Math.round ( window.innerWidth * this.width_ratio );
		}
		console.info ( 'Max size: ' + max_width + " | " + max_height );
		
		// Определяем, как влезают элементы в контейнер
		
		var elems_per_row = Math.round ( max_width / ( this.elem_width + 20 ) );
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
};

