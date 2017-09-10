// ===============================================================================================================
//                                           Panel Constructor
// ===============================================================================================================
var garevna_WorkPanel = {
	panel_hidden: false,
	panelHeader: '',
	menuItems: [],          // src
	folderVars: [],         // state:0, form:0, header:'', content: [src_num1, src_num2...]
	folders: [],            // DOM elements - containers for menu items
	panel: {},              // DOM element - container for DOM elements panelTop & panelContent
	panelTop: {},           // DOM element
	panelContent: {},       // DOM element - container for DOM elements folders
	// -------------------------------------------------------------------------------------- Method getStructure()
	getStructure: function () {

		if (this.menuItems==undefined) { alert('getStructure Error: main container does not exist'); return false; }
		var folderNum;
		var _folder = { header:'', content:[] };
		for (var j=0; j < this.menuItems.length; j++) {
			folderNum = -1;
			for (var k = 0; k < this.folderVars.length; k++) {
				if (this.folderVars[k].header === this.menuItems[j].folder_name) {
					this.folderVars[k].content.push(j);
					folderNum = k;
					break;
				}
			}
			if (folderNum == -1) {
				_folder = { header:this.menuItems[j].folder_name, content:[] };
				_folder.content.push(j);
				this.folderVars.push(_folder);
			}
		}
	},
	// ----------------------------- folders structure ---------------------------------------------------------
    // workPanel.folders[j]                                DOM element
    // workPanel.folders[j].head                           DOM element (child of workPanel.folders[j])
    // workPanel.folders[j].stateButton                    DOM element (child of workPanel.folders[j].head)
    // workPanel.folders[j].formButton                     DOM element (child of workPanel.folders[j].head)
    // workPanel.folders[j].content                        DOM element (child of workPanel.folders[j])
    // workPanel.folders[j].content.elem[i]                DOM element (child of workPanel.folders[j].content)
   
    // workPanel.folders[j].form                           value (0 || 1)
    // workPanel.folders[j].state                          value (0 || 1)
    // workPanel.folderVars[j].header                      string (folder header)
	// -------------------------------------------------------------------------------- createDomElements() method
	createDomElements: function() {
		this.panel = this.createPanel();
		this.panelTop = this.createPanelTop();
		this.getStructure();
		this.panelContent = this.createPanelContent();
		this.panel.style.zIndex = "500";
		// ------------------------------------------------------------------------ addFolderHeadElement method
		this.addFolderHeadElement = function(folderNum) {
			var _folderHead = document.createElement('div');
			this.folders[folderNum].appendChild(_folderHead);
			_folderHead.className = "panel-name";
			return _folderHead;
		}
		// ----------------------------------------------------------------------- add FolderStateButton method
		this.addFolderStateButton = function(folderNum) {
			var _folderStateButton = document.createElement('button');
			this.folders[folderNum].head.appendChild(_folderStateButton);
			_folderStateButton.className = "folderStateButton";
			_folderStateButton.innerHTML = garevna_WorkPanel.folderStates()[0].lbl;
			_folderStateButton.setAttribute('title', garevna_WorkPanel.folderStates()[0].titl);
			// --------------------------------------------------------------- FolderStateButton onClick
			_folderStateButton.onclick = function(event) {
				var _folder = this.parentNode.parentNode;				    // folder element
				_folder.state = (_folder.state == 0)?(1):(0);               // change folder state property
				var _state = _folder.state;				                    // folder state property
				var _content = this.parentNode.parentNode.content;          // folder content element
				// ----------------------------- Animation ---------------------------------------------------
				if (_state == 1) { TweenLite.to(_content, 1, { height:"0", opacity:"0", display:"none" }); }
				else { TweenLite.to(_content, 1, { height:"auto", opacity:"1", display:"block" }); }
				// -------------------------------------------------------------------------------------------
				this.innerHTML = garevna_WorkPanel.folderStates()[_state].lbl;
				this.setAttribute('title', garevna_WorkPanel.folderStates()[_state].titl);
			}
			this.folders[folderNum].stateButton = _folderStateButton;
		}
		// ----------------------------------------------------------------------- add FolderFormButton method
		this.addFolderFormButton = function(folderNum) {
			var _folderFormButton = document.createElement('button');
			this.folders[folderNum].head.appendChild(_folderFormButton);
			_folderFormButton.className = "folderFormButton";
			// --------------------------------------------------------------- FolderFormButton onClick
			_folderFormButton.onclick = function(event) {
				var _folder = this.parentNode.parentNode;				    // folder element
				_folder.form = (_folder.form == 0)?(1):(0);                 // change folder form property
				var _content = this.parentNode.parentNode.content;          // folder content element
		        // --------- change button appearance ------------
		        this.style.backgroundImage = 'url(' + garevna_WorkPanel.folderForms()[_folder.form].$img + ')';
		        this.setAttribute('title', garevna_WorkPanel.folderForms()[_folder.form].titl);
		        // ---------- change folder appearance ------------
				var items = _content.childNodes;
				var z;
				for (var j=0; j<items.length; j++)
				{
					z = items[j].getElementsByTagName('span').item(0);
					z.style.display = (_folder.form == 1)?('none'):('inline');
					items[j].className = (_folder.form == 1)?('work-panel-elem-short'):('work-panel-elem');
				}
			}
		}
		// -----------------------------------------------
		for (var j=0; j<this.folderVars.length; j++) { 
		    
			this.folders[j] = this.createFolderElement(j);
			this.folders[j].state = 0;
			this.folders[j].form = 0;
			this.folders[j].head = this.addFolderHeadElement(j);
			this.folders[j].stateButton = this.addFolderStateButton(j);
			var h = document.createElement('span');
			h.innerHTML = this.folderVars[j].header;
			this.folders[j].head.appendChild(h);
			this.folders[j].formButton = this.addFolderFormButton(j);
			this.folders[j].content = this.folders[j].appendChild(document.createElement('div'));
			this.addFolderContent(j);
		}
	},
	// --------------------------------------------------------------------------------------- Panel (DOM element)
	createPanel: function() {
		var main = document.getElementsByTagName("main").item(0);
		if (!main) { alert('createPanel Error: main container undefined!'); return }
		var panel = document.createElement('div');
        main.appendChild(panel);
        panel.id = "work_panel";
		panel.className = "work-panel";
        return panel;
	},
	// ----------------------------------------------------------------------------------- Panel Top (DOM element)
	createPanelTop: function() {
		var panelTop = document.createElement('div');
		this.panel.appendChild(panelTop);
		panelTop.className = "panel-top";
		panelTop.id = "panel-top";
		// ------------------------------------------------------------------------- panel Top Show (Method)
	    panelTop.showPanelTopElement = function ()
		{
			var h = (!garevna_WorkPanel.panel_hidden)?("&raquo;"):("&laquo;");
			panelTop.setAttribute("title", (garevna_WorkPanel.panel_hidden)?("Показать"):("Свернуть"));
			panelTop.innerHTML = '&nbsp;&nbsp;' + h + '&nbsp;&nbsp;' + garevna_WorkPanel.panelHeader;
		}
		panelTop.showPanelTopElement();
		// ------------------------------------------------------------------ event 'click' of panelTop element
		panelTop.onclick = function(event) {
			// ------------------------------------------------------------ hide Panel (method)
			var panel = this.parentNode;
			garevna_WorkPanel.panel_hidden = !garevna_WorkPanel.panel_hidden;
			this.showPanelTopElement();
			var w = this.parentNode.getBoundingClientRect().width;
			// --------------- animation -----------------------------
			if (!garevna_WorkPanel.panel_hidden) { TweenLite.to(panel, 1, { right:"0px" }); }
			else { TweenLite.to(panel, 1, { right:(30-w) + 'px' }); }
		}
		return panelTop;
	},
	// ------------------------------------------------------------------------------- Panel Content (DOM element)
	createPanelContent: function() {
		var panelContent = document.createElement('div');
		this.panel.appendChild(panelContent);
		panelContent.id = "panel-content";
		return panelContent;
	},
   // ------------------------------------------------------------------------------------------- createFolderElement
   createFolderElement: function(folderNum) {
	   if (!this.panelContent) { console.log('addFolderElement: Unable to add folder!'); return false; }
	   var _folder = document.createElement('div');
	   this.panelContent.appendChild(_folder);
	   _folder.id = 'folder_' + folderNum;
	   return _folder;
   },
   // ----------------------------------------------------------------------------------------- addFolderContent
   addFolderContent: function(folderNum) {
	   var itemVars = this.folderVars[folderNum];
	   var fc = document.createElement('div');
	   this.folders[folderNum].appendChild(fc);
	   this.folders[folderNum].content = fc;
	   this.folders[folderNum].content.elem = [];
	   
	   var $form = (this.folders[folderNum].form)?(this.folders[folderNum].form):(0);
	   var elem, btn, txt, elemVar;
	   
	   for (var j=0; j < itemVars.content.length; j++) {
		   elemVar = this.menuItems[ itemVars.content[j] ];
		   elem = document.createElement('div');
		   elem.className = "work-panel-elem";
		   this.folders[folderNum].content.appendChild(elem);    // DOM element
		   this.folders[folderNum].content.elem.push(elem);      // reference to DOM element (array item)
		   btn = document.createElement('button');
		   elem.appendChild(btn);
		   btn.className = this.getButtonType(elemVar);
		   btn.params = elemVar;
		   var tooltipText = (elemVar.h_text)?(elemVar.h_text):(elemVar.item_name);
		   btn._tooltip = new garevna_lib.ElemTooltip(btn, tooltipText);
		   // ---------------------------------------------------------------- onclick
		   btn.onclick = function (event) {
			   var btn = event.target;
			   garevna_Level2.generateMethod(btn.params).call();
		   }
		   txt = document.createElement('span');
		   elem.appendChild(txt);
		   txt.innerHTML = elemVar.item_name;
		   
		   elem.item_name = txt;
		   btn.style.display = 'inlineBlock';
		   btn.style.marginRight = "5px";
		   elem.item_name.display = (itemVars.form == 1)?('none'):('inlineBlock');
	   }
   },
   // --------------------------------------------------------------------- folderForms (array)
   folderForms: (function() {
		var folder_forms = [
		    { $img:'/buttons/menu_buttons.png', titl:'Краткая форма (в виде кнопок)' },
	        { $img:'/buttons/menu-list.png', titl:'Развернутая форма (список)' } ];
		return function(j) { if (j!==0&&j!==1) { return folder_forms } else { return folder_forms[j] } }
	})(),
   // -------------------------------------------------------------------- folderStates (array)
   folderStates: (function() {
		var folder_states = [ { lbl:'&#9650;', titl:'Скрыть содержимое папки' },
	                          { lbl:'&#9660;', titl:'Показать содержимое папки' } ];
		return function () { return folder_states }
   })(),
   // ================================================================================================== getButtonType
	getButtonType: function(elem) {
		var button_type = [];
		button_type['presentation'] = 'google_slides';
		button_type['frame'] = undefined;
		button_type['video'] = 'youtube';
		button_type['google_disk'] = 'google_disk';
		button_type['div'] = undefined;
		button_type['window'] = undefined;
		button_type['function'] = undefined;
		var bt = (button_type[elem.type])?(button_type[elem.type]):((elem.button_type)?(elem.button_type):('show'));
		if (bt == 'show') { console.log('Не определен тип элемента меню:' + elem.item_name); }
		return "button_" + bt;
	}
}