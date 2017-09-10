var garevna_button_set = function (params) {
		
		var parent = params.parent_node || document.getElementsByTagName('body').item(0);
		
		var mainImage = params.mainImage || '/buttons/comp.ico';
		var butImage = params.img || '/buttons/calendar.png';
		
		var buttons = [];
		var button_container = document.createElement('div');
		button_container.tabIndex = "-1";
		parent.appendChild(button_container);
		button_container.className = 'button_container';
		
		button_container.style.width = parent.normal_button_size;
		button_container.style.height = parent.normal_button_size;
		button_container.style.margin = '5px';
		button_container.style.float = 'left';
		button_container.subject = params.subject || 'Дисциплина без названия';
		button_container.style.backgroundImage = 'url(' + params.mainImage + ')';
		button_container.mouseIsOver = false;
		// ================================================================================== onmouseover
		button_container.onmouseover = function (event) {
			
			if (event.target !== button_container) { return; }
			var obj = event.target;
			if (obj.mouseIsOver) { return; }
			obj.mouseIsOver = true;
			var $tween = new TimelineLite();
			$tween.to(obj, 0.1, {
				width:parent.small_buttons_container_size,
				height:parent.small_buttons_container_size,
				backgroundImage:'none',
				onComplete: function () {
					obj.style.width = parent.small_buttons_container_size;
					obj.style.height = parent.small_buttons_container_size;
					
					parent.info_panel.innerHTML = obj.subject;
					obj.focus();
				}
			});
			//var button_nums = [0,1,2,3,7,11,15,14,13,12,8,4,5,6,10,9];
			var i, k;
			var bckgr = params.img || '/buttons/calendar.png';
			for (i=0; i< params.hash_vals.length; i++) {
				var elem = document.createElement('div');
				obj.appendChild(elem);
				elem.className = "small_button";
				elem.style.position = 'relative';
				elem.style.opacity = '0';
				elem.style.width = '5px';
				elem.style.height = '5px';
				elem.style.backgroundImage = 'url(' + bckgr + ')';
				
				$tween.to(elem, 0.2, {
					opacity:'1',
					width:parent.small_button_size,
					height:parent.small_button_size
				});
				
				elem.innerHTML = i+1;
				elem.hash = params.hash_prefix + params.hash_vals[i];
				elem.onclick = function (event) {
					var url = '/level_2.html#' + this.hash;
					window.open(url,'_blank');
				}
			}
			
		};
		button_container.onblur = function (event) {
			
			if (event.target !== button_container) { return; }
			var obj = event.target;
			obj.mouseIsOver = false;
			var buts = obj.childNodes;
			
			while (buts.length) {
				obj.removeChild(buts[0]);
			}
			TweenLite.to(obj, 0.5, {
				width: parent.normal_button_size,
				height:parent.normal_button_size,
				backgroundImage:'url(' + mainImage + ')'
			});
		};
		button_container.resize = function () {
			
			if (this.mouseIsOver || this.childNodes.length > 0) {
				var containerElements = this.childNodes;
				var i;
				for (i=0; i<containerElements.length; i++) {
					containerElements.item(i).style.width = parent.small_button_size;
					containerElements.item(i).style.height = parent.small_button_size;
				}
				this.style.width = parent.small_buttons_container_size;
				this.style.height = parent.small_buttons_container_size;
			}
			else {
				this.style.width = parent.normal_button_size;
				this.style.height = parent.normal_button_size;
			}
		}
};