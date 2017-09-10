;
	// ======================================================================================================
	//                                T W E E N I N G    M E T H O D S
	// ------------------------------------------------------------------------------------------------------
	//                       calc_sizes, createPin, removePin,
	//                    tweenPassive, tweenNormAll, tweenFront, tweenBackAndFront
	//                             R E T U R N E D     F U N C T I O N S
	//                                    mouse_move, win_resized
	// ------------------------------------------------------------------------------------------------------
	var garevna_libTweenMethods = function(nums) {
		
		var boxes = document.getElementsByClassName("garevna_floatingBox");
		var wide_page = window.innerWidth > window.innerHeight;
		var box_params = {
			defaultWidth:100,
			defaultHeight:100,
			defaultMarginLeft: 50,
			defaultMarginTop: 50,
			defaultDisplay: "inline-block",
			wideWidth:window.innerWidth*0.8,
			wideHeight:window.innerHeight*0.8,
			wideMarginLeft:window.innerWidth*0.05,
			wideMarginTop:window.innerHeight*0.05,
			font_size: window.innerWidth<450?"80%":(window.innerWidth<700?"90%":"100%")
		};
		calc_sizes ();
		var $obj = null;                        // previous object
		var mouse_1 = false;                    // previous event  (mouseover|mouseout)
		var mouse_2 = false;                    // current event   (mouseover|mouseout)
		
		// =========================================================================================== changeWinSize
		function createPin () {
			if (document.getElementById('__pin__')) { return; }
			var $pin = document.createElement('div');
			$pin.id = '__pin__';
			$pin.style.position = 'absolute';
			$pin.style.top = '0px';
			$pin.style.right = '0px';
			$pin.style.width = '50px';
			$pin.style.height = '50px';
			$pin.style.zIndex = 305;
			$pin.style.backgroundImage = 'url("/images/pin-2.png")';
			$pin.style.backgroundSize = 'contain';
			$pin.style.backgroundRepeat = 'no-repeat';
			$pin.onmouseover = function (event) {
				$pin.style.backgroundImage = 'url("/images/pin.png")';
			};
			$pin.onmouseout = function (event) {
				$pin.style.backgroundImage = 'url("/images/pin-2.png")';
			};
			return $pin;
		}
		function removePin () {
			document.getElementById('__pin__').parentNode.removeChild(document.getElementById('__pin__'));
			tweenNormAll();
		}
		// ========================================================================================== calc_sizes
		function calc_sizes () {
			var x = window.innerWidth*0.8/(nums*1.5);
			var y = window.innerHeight*0.8/(nums*1.5);
			var z = Math.min(x, y);
			var box_inactive_params = get_margin_and_display (z);
			box_params.defaultWidth = z;
			box_params.defaultHeight = z;
			get_margin_and_display ();
			box_params.wideWidth = window.innerWidth*0.8;
			box_params.wideHeight = window.innerHeight*0.8;
			box_params.wideMarginLeft = window.innerWidth*0.05;
			box_params.wideMarginTop = window.innerHeight*0.05;
			box_params.font_size = window.innerWidth<450?"80%":(window.innerWidth<700?"90%":"100%")
		}
		function get_win_model () {
			var model = (window.innerWidth > window.innerHeight)?(1):(3);
			var $add = (garevnaScene.activeBox)?(1):(0);
			model += $add;
			return model;
		}
		// only for inactive boxes
		function get_margin_and_display ($model) {
			var model = $model || get_win_model ();
			box_params.defaultMarginLeft = (model == 2)?(window.innerWidth*0.9):(Math.round(box_params.defaultWidth/2));
			box_params.defaultMarginTop  = (model == 4)?(window.innerHeight*0.9):(Math.round(box_params.defaultWidth/2));
			box_params.defaultDisplay    = (model < 3)?("block"):("inline-block");
		}
		// =========================================================================================== tweenPassive
		function tweenPassive (obj, _norm) {
			
			var model = get_win_model ();
			model = ((model == 2 || model == 4) && _norm)?(model--):model;
			garevnaScene.tween.block();
			get_margin_and_display (model);
			TweenLite.to(obj, 1, {
				position:"static",
				width:      box_params.defaultWidth + 'px',
				height:     box_params.defaultHeight + 'px',
				marginLeft: box_params.defaultMarginLeft + 'px',
				marginTop:  box_params.defaultMarginTop + 'px',
				display:    box_params.defaultDisplay,
				//opacity:1,
				backgroundColor:'transparent',
				border:'0px',
				overflow:'hidden',
				boxShadow:'none',
				backgroundSize:'contain',
				onComplete:function () {
					$obj = null;
					mouse_1 = false;
					mouse_2 = undefined;
					garevnaScene.tween.free();
				}
			});
		}
		// ======================================================================================== tweenNormAll
		function tweenNormAll (ws) {
			garevnaScene.activeBox = undefined;
			var articles = document.getElementsByTagName('article');
			var j;
			for (j=0; j < nums; j++) {
				articles[j].style.display = 'none';
				if (articles[j].onTweenBack_callback) {
					articles[j].onTweenBack_callback();
				}
			}
			tweenPassive(boxes, true);
			if ( garevna_dynamic_head ) {
				garevna_dynamic_head.style.opacity = "1";
			}
		}
		// =========================================================================================== tweenFront
		function tweenFront (obj) {
			if ( garevna_dynamic_head ) {
				garevna_dynamic_head.style.opacity = "0";
			}
			garevnaScene.activeBox = obj;
			garevnaScene.tween.block();
			garevnaScene.pin.block();
			$obj = obj;
			TweenLite.to($obj, 1, {
				width:box_params.wideWidth + 'px',
				height:box_params.wideHeight + 'px',
				marginLeft:box_params.wideMarginLeft + 'px',
				marginTop:box_params.wideMarginTop + 'px',
				position:'absolute',
				fontSize:box_params.font_size,
				//opacity:1,
				border:'inset 1px',
				borderRadius:'5px',
				boxShadow:'inset 5px 5px 8px rgba(0,0,0,0.7)',
				backgroundColor:'#BBB',
				backgroundSize:'50px',
				backgroundPosition:'bottom right',
				overflow:'hidden',
				onComplete:function () {
					garevna_libTweenMethods.setBoxSize ($obj, true);
					var article = $obj.firstChild;
					TweenLite.to(article, 0.5, {
						display:"block",
						padding:"10px",
						width:(box_params.wideWidth-40) + 'px',
						height:(box_params.wideHeight -20) + 'px',
						overflow:'hidden',
						onComplete:function () {
							if (article.resize_callback) {
								article.resize_callback();
							}
						}
					});
					
					var $pin = createPin();
					$obj.firstChild.appendChild($pin);
					$pin.onclick = function (event) {
						garevnaScene.pin.free();
						garevnaScene.tween.free();
						removePin();
					}
				}
			});
			mouse_1 = true;
		}
		// =========================================================================================== tweenBackAndFront
		function tweenBackAndFront (obj) {
			tweenFront(obj);
			if (obj.firstChild.onTweenFront_callback) {
				obj.firstChild.onTweenFront_callback();
			}
			garevnaScene.activeBox = obj;
			var j, box_obj;
			for (j=0; j < nums; j++) {
				if (boxes[j] !== obj) {
					box_obj = boxes[j].firstChild;
					if (box_obj.onTweenBack_callback) {
						box_obj.onTweenBack_callback();
					}
					box_obj.style.display = 'none';
					tweenPassive(boxes[j], false);
				}
			}
		}
		// =============================================================================================== RETURNED
		return {
			
			getBoxSizes: function () {
				return box_params;
			},
			
			resize: function () {
				calc_sizes ();
			},
			
			setBoxSize: function (box, _active) {
				if (!box) {
					alert('ERROR: no object reseived');
				}
				if (_active) {
					box.style.width = box_params.wideWidth + 'px';
					box.style.height = box_params.wideHeight + 'px';
					box.style.marginLeft = box_params.wideMarginLeft + 'px';
					box.style.marginTop = box_params.wideMarginTop + 'px';
					// box.style.fontSize = box_params.font_size;
					
					var article = box.firstChild;
					
					article.style.width = (box_params.wideWidth - 10) + 'px';
					article.style.height = (box_params.wideHeight - 10) + 'px';
					article.style.fontSize = box_params.font_size;
					if (article.resize_callback) {
						article.resize_callback();
					}
				}
				else {
					box.style.width = box_params.defaultWidth + 'px';
					box.style.height = box_params.defaultHeight + 'px';
					box.style.display = box_params.defaultDisplay;
					box.style.marginLeft = box_params.defaultMarginLeft + 'px';
					box.style.marginTop = box_params.defaultMarginTop + 'px';
				}
			},
			
			mouse_move: function(event) {
				e = event.type;
				var obj = event.target;
				if (obj.className !== 'garevna_floatingBox') {
					// It is not a target object
					return; 
				}
				if (!garevnaScene.tween.value() || garevnaScene.pin.value()) {
					// All tweens are stoped
					return false;
				}
				mouse_2 = (e == "mouseover");
				if (!mouse_2) {
					tweenNormAll();
					// All objects return to normal state
					return;
				}
				if (!$obj) {
					tweenBackAndFront(obj);
					// start tweening
					return;
				}
				if ($obj !== obj) {
					$obj.firstChild.style.display = "none";
					tweenNormAll();
					tweenFront (obj);
					// old object: $obj   new object: obj expands
					return;
				}
			},
			get_elements_dim: function () {
				return box_params;
			}
		}
	};