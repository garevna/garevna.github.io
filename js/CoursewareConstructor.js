// ================================== Courseware Constructor ==================================

function CoursewareConstructor () {
	
	this.init = function (coursewareSourceURL) {
		this.ready = false;
		this.levels = [];
		this.levelNum = -1;
		this.lives = 0;
		this.maxLives = 0;
		this.choiceLevelElements = [];
		this.score = 0;
		this.maxScore = 0;
		this.nextLevelAvailiable = true;
		
		this.livesPictureURL = undefined;
		this.gameOverPictureURL = undefined;
		this.successPictureURL = undefined;
		this.failurePictureURL = undefined;
		
		this.livesPanel = document.createElement('aside');
		this.livesPanel.className = "livesPanel";
		document.body.appendChild(this.livesPanel);
		
		this.scorePanel = document.createElement('aside');
		this.scorePanel.className = "scorePanel";
		document.body.appendChild(this.scorePanel);
		this.scorePanel.progressBar = document.createElement('progress');
		this.scorePanel.appendChild(this.scorePanel.progressBar);
		
		this.mainScene = document.createElement('figure');
		this.mainScene.className = "mainScene";
		document.body.appendChild(this.mainScene);
		this.mainScene.style.display = 'none';
		this.mainScene.parentObject = this;
		this.centralPicture = document.createElement('div');
		this.centralPicture.className = "centralImage";
		this.question = document.createElement('p');
		
		this.resizeMainScene = resizeMainScene.bind(this);
		this.callback = coursewareCallback.bind(this);
		this.createPanels = initPanels.bind(this);
		this.createMainScene = createMainScene.bind(this);
		this.constructChoiceLevel = constructChoiceLevel.bind(this);
		this.resizeChoiceLevel = resizeChoiceLevel.bind(this);
		this.constructInputLevel = constructInputLevel.bind(this);
		this.constructFindErrorLevel = constructFindErrorLevel.bind(this);
		this.finish = gameOver.bind(this);
		this.looser = die.bind(this);
		this.nextLevel = coursewareNextLevel.bind(this);
		this.success = coursewareSuccess.bind(this);
		this.getLevelType = corsewareLevelType.bind(this);
		
		loadData ( coursewareSourceURL, this.callback );
	};
	// ======================================================================================== loadData
    function loadData ( sourceURL, callback ) {
		try {
			var coursewareWorker = new Worker( '/js/json_loader.js' );
			coursewareWorker.postMessage ( sourceURL );
			coursewareWorker.addEventListener('message', function(e) {
				var $data = e.data;
				coursewareWorker.terminate();
				coursewareWorker = undefined;
				if (e.data) { callback ( $data ); }
				else { alert("Ограниченная функциональность. Отсутствуют библиотеки: " + sourceURL); }
			}, false);
		}
		catch (err) { alert("К сожалению, в Вашем браузере полная функциональность невозможна"); }
	};
	// ======================================================================================== createPanels
    function initPanels () {
		for (var j = 0; j < this.lives; j++) {
			var life = document.createElement('div');
			life.backgroundImage = 'url(' + this.livesPictureURL + ')';
			this.livesPanel.appendChild(life);
		}
		this.scorePanel.progressBar.max = this.maxScore;
		this.scorePanel.progressBar.value = 0;
	};
	// =========================================================================================== createMainScene
	function createMainScene () {
		this.mainScene.style.display = 'block';
		this.mainScene.innerHTML = '';
		// this.mainScene.style.backgroundSize = "20%";
		this.resizeMainScene();
	};
	// =========================================================================================== resizeMainScene
	function resizeMainScene () {
		//this.mainScene.style.width = Math.round(window.innerWidth*0.7) + 'px';
		//this.mainScene.style.height = Math.round(window.innerHeight*0.8) + 'px';
		//this.mainScene.style.marginLeft = Math.round(window.innerWidth*0.2) + 'px';
		//this.mainScene.style.marginTop = Math.round(window.innerHeight*0.1) + 'px';
	};
	// =========================================================================================== coursewareCallback
	function coursewareCallback ( $data ) {
		// this  ===== CoursewareConstructor
		// self  ===== window
		// this.maxScore = $data.maxScore;
		this.lives = $data.lives;
		this.maxLives = $data.lives;
		//this.livesPictureURL = $data.livesPictureURL;
		var sheet = document.createElement('style');
		sheet.innerHTML = '.livesPanel > div { background-image: url(' +$data.livesPictureURL  + '); }';
		document.head.appendChild(sheet);
		this.gameOverPictureURL = $data.gameOverPictureURL;
		this.successPictureURL = $data.successPictureURL;
		this.failurePictureURL = $data.failurePictureURL;
		this.levels = $data.levels;
		this.maxScore = 0;
		for ( var j = 0; j < this.levels.length; j++) {
			this.maxScore += this.levels[j].balls;
		}
		this.ready = true;
		$data = null;
		this.createPanels();
		this.levelNum = -1;
		//this.nextLevel( 0 );
	};
	function corsewareLevelType () {
		return (this.levelNum < 0) ? undefined : this.levels[this.levelNum].type;
	};
	// ========================================================================================== nextLevel
	function coursewareNextLevel () {
		if (!this.ready) { console.error('Not ready: data is not loaded yet'); return; }
		this.levelNum++;
		if ( this.levelNum == this.levels.length-1 ) { this.finish(); }
		var levelData = this.levels[this.levelNum];
		
		this.createMainScene();
		
		this.mainScene.style.backgroundImage = 'url(' + levelData.centralPicture + ')';
		this.question = document.createElement('p');
		this.question.className = 'coursewareQuest';
		this.question.innerHTML = levelData.question;
		this.mainScene.appendChild(this.question);
		this.buttonToNextLevel = document.createElement('button');
		this.buttonToNextLevel.innerHTML = "ДАЛЬШЕ >";
		this.buttonToNextLevel.className = "buttonToNextLevel";
		this.mainScene.appendChild(this.buttonToNextLevel);
		this.buttonToNextLevel.onclick = function ( event ) {
			var parentObject = event.target.parentNode.parentObject;
			if ( parentObject.levelNum == parentObject.levels.length-1 ) { parentObject.finish(); }
			else {
				event.target.parentNode.style.display = 'none';
				parentObject.gotoNextLevel = true;
			}
		}
		
		if ( this.levelNum == this.levels.length ) { this.success(); this.nextLevelAvailiable = false; }
		else {
			this.nextLevelAvailiable = true;
			switch ( levelData.type ) {
				case 'choice':
				    this.constructChoiceLevel( levelData );
					break;
				case 'input':
				    this.constructInputLevel( levelData );
					break;
				case 'findError':
				    this.constructFindErrorLevel ( levelData );
					break;
				default:
				    break;
			}
		}
		return this.nextLevelAvailiable;
	};
	function coursewareSuccess() {
		this.mainScene.backgroundImage = 'url(' + this.successPictureURL + ')';
	}
	// ========================================================================================== constructChoiceLevel
	function constructInputLevel ( levelData ) {
		var inputContainer = document.createElement('div');
		inputContainer.className = "inputContainer";
		var label = document.createElement('span');
		label.innerHTML = levelData.inputLegend.before;
		inputContainer.appendChild(label);
		var inputElement = document.createElement('input');
		inputElement.className = "coursewareInputElement";
		inputElement.type = 'text';
		inputElement.size = "1";
		inputElement.placeholder = "?";
		inputElement.oninput = function ( event ) { event.target.size = Math.max(event.target.value.length-1, 1); }
		inputContainer.appendChild(inputElement);
		var label = document.createElement('span');
		label.innerHTML = levelData.inputLegend.after;
		inputContainer.appendChild(label);
		this.mainScene.appendChild(inputContainer);
		inputElement.addEventListener ('change', function ( event ) {
			var scene = event.target.parentNode.parentNode;
			var parentObject = scene.parentObject;
			var levelData = parentObject.levels[parentObject.levelNum];
			if ( this.value != levelData.rightInput ) {
					scene.style.backgroundImage = 'url(' + levelData.wrongInputPicture.url + ')';
					scene.style.backgroundSize = levelData.wrongInputPicture.width;
					parentObject.looser();
				}
				else {
					scene.style.backgroundImage = 'url(' + levelData.rightInputPicture.url + ')';
					scene.style.backgroundSize = levelData.rightInputPicture.width;
					parentObject.scorePanel.progressBar.value += levelData.balls;
					parentObject.finish();
				}
		});
	};
	// ======================================================================================= constructFindErrorLevel
	function constructFindErrorLevel ( levelData ) {
		var inputContainer = document.createElement('div');
		inputContainer.className = "inputContainer";
		var inputElement = document.createElement('textarea');
		inputElement.className = "coursewareTextAreaElement";
		inputElement.cols = levelData.contentCols;
		inputElement.rows = levelData.contentRows;
		inputElement.value = levelData.wrongContent;
		inputContainer.appendChild(inputElement);
		var cloneInputElement = document.createElement('textarea');
		cloneInputElement.className = "coursewareTextAreaElement";
		cloneInputElement.style.display = 'none';
		cloneInputElement.value = levelData.rightContent;
		cloneInputElement.cols = levelData.contentCols;
		cloneInputElement.rows = levelData.contentRows;
		inputContainer.appendChild(cloneInputElement);
		var btn = document.createElement('button');
		btn.innerHTML = 'Готово';
		btn.style.fontSize = "20px";
		inputContainer.appendChild(btn);
		this.mainScene.appendChild(inputContainer);
		
		btn.addEventListener ('click', function ( event ) {
			var scene = event.target.parentNode.parentNode;
			var elem = document.getElementsByClassName("coursewareTextAreaElement")[0];
			var contr = document.getElementsByClassName("coursewareTextAreaElement")[1];
			var parentObject = scene.parentObject;
			var levelData = parentObject.levels[parentObject.levelNum];
			if ( elem.value != contr.value ) {
					scene.style.backgroundImage = 'url(' + levelData.wrongInputPicture.url + ')';
					scene.style.backgroundSize = levelData.wrongInputPicture.width;
					parentObject.looser();
				}
				else {
					scene.style.backgroundImage = 'url(' + levelData.rightInputPicture.url + ')';
					scene.style.backgroundSize = levelData.rightInputPicture.width;
					parentObject.scorePanel.progressBar.value += levelData.balls;
					parentObject.finish();
				}
		});
	};
	// ========================================================================================== constructInputLevel
	function constructChoiceLevel ( levelData ) {
		for ( var j = 0; j < levelData.choiceVariants.length; j++ ) {
			var elem = document.createElement('div');
			elem.className =  'targetElement';
			elem.style.backgroundImage = 'url(' + levelData.choicePicture.url + ')';
			elem.innerHTML = '<p>' + levelData.choiceVariants[j] + '</p>';
			elem.looser = this.looser;
			elem.addEventListener ('click', function ( event ) {
				var targetElem = event.target;
				if ( targetElem.disabled ) { return; }
				targetElem.disabled = true;
				targetElem = (targetElem.tagName == "P") ? targetElem.parentNode : targetElem;
				var num = levelData.choiceVariants.indexOf(targetElem.children[0].innerHTML);
				if ( levelData.rightChoicesNums.indexOf(num) < 0 ) {
					targetElem.style.backgroundImage = 'url(' + levelData.wrongChoicePicture.url + ')';
					targetElem.style.width = levelData.wrongChoicePicture.width + 'px';
					targetElem.style.height = levelData.wrongChoicePicture.height + 'px';
					this.looser();
				}
				else {
					targetElem.style.backgroundImage = 'url(' + levelData.rightChoicePicture.url + ')';
					targetElem.style.width = levelData.rightChoicePicture.width + 'px';
					targetElem.style.height = levelData.rightChoicePicture.height + 'px';
					targetElem.parentNode.parentObject.scorePanel.progressBar.value += levelData.balls;
					targetElem.parentNode.parentObject.finish();
				}
			});
			this.choiceLevelElements.push(elem);
			this.mainScene.appendChild(elem);
		}
		this.resizeChoiceLevel ( levelData );
	};
	// ====================================================================================== resizeChoiceLevel
	function resizeChoiceLevel () {
		var center = { top: Math.round(window.innerHeight/2), left: Math.round(window.innerWidth/2) };
		var radius = Math.round(Math.min(window.innerHeight, window.innerWidth) * 0.3);
		var delta = Math.round(radius/Math.sqrt(2));
		var points = [
		    { top: center.top - radius, left: center.left },
			{ top: center.top - delta, left: center.left + delta },
			{ top: center.top, left: center.left + radius },
			{ top: center.top + delta, left: center.left + delta },
			{ top: center.top + radius, left: center.left },
			{ top: center.top + delta, left: center.left - delta },
			{ top: center.top, left: center.left - radius },
			{ top: center.top - delta, left: center.left - delta }
		];
		var targets = document.getElementsByClassName("targetElement");
		for ( var j = 0; j < targets.length; j++ ) {
			targets[j].style.top = points[j].top + 'px';
			targets[j].style.left = points[j].left + 'px';
			this.choiceLevelElements[j] = targets[j];
		}
	};
	// =============================================================================================== die
	function die () {
		this.livesPanel.removeChild(this.livesPanel.children[0]);
		this.lives--;
		if (this.lives == 0) {
			this.mainScene.innerHTML = '';
			// this.mainScene.style.backgroundImage = 'url(' + this.failurePictureURL + ')';
			// this.mainScene.style.backgroundSize = 'cover';
			// this.mainScene.style.backgroundPosition = 'top center';
			this.mainScene.className = "mainScene  garevna_gameOver";
			this.buttonToNextLevel.innerHTML = "FAILURE";
			this.buttonToNextLevel.style.fontSize = "100px";
			this.buttonToNextLevel.style.width = "100%";
			this.buttonToNextLevel.style.color = "red";
			this.buttonToNextLevel.style.textShadow = "5px 5px 5px rgba(0,0,0,0.7)";
			this.buttonToNextLevel.style.border = 'none';
			this.buttonToNextLevel.onclick = function (event) { location = '/'; }
			this.mainScene.appendChild(this.buttonToNextLevel);
		}
		else { this.finish(); }
	};
	function gameOver () {
		if ( this.levelNum == this.levels.length -1 ) {
			this.mainScene.innerHTML = '';
			if ( this.scorePanel.progressBar.value == this.maxScore ) {
				// this.mainScene.style.backgroundImage = 'url(' + this.successPictureURL + ')';
				// this.mainScene.style.backgroundPosition = 'top center';
				this.style = "";
				this.mainScene.className = "mainScene  garevna_gameVictory";
				this.buttonToNextLevel.innerHTML = "YOU WIN!";
				this.buttonToNextLevel.style.color = "white";
			}
			else {
				// this.mainScene.style.backgroundImage = 'url(' + this.gameOverPictureURL + ')';
				// this.mainScene.style.backgroundPosition = 'center center';
				this.mainScene.className = "mainScene  garevna_gameFailure";
				this.buttonToNextLevel.innerHTML = "GAME OVER";
				this.buttonToNextLevel.style.color = "#2BF513";
			}
			// this.mainScene.style.backgroundSize = 'cover';
			this.mainScene.innerHTML += '<h1>Набрано очков: ' + this.scorePanel.progressBar.value;
			this.mainScene.innerHTML += ' из ' + this.maxScore + ' возможных</h1>';
			this.mainScene.innerHTML += '<h1>Осталось жизней: ' + this.lives;
			this.mainScene.innerHTML += ' из ' + this.maxLives + '</h1>';
			
			this.buttonToNextLevel.style.width = "100%";
			this.buttonToNextLevel.style.fontSize = "100px";
			this.buttonToNextLevel.style.border = 'none';
			this.buttonToNextLevel.style.textShadow = "5px 5px 5px rgba(0,0,0,0.7)";
			
			this.mainScene.appendChild(this.buttonToNextLevel);
			this.buttonToNextLevel.onclick = function (event) { location='/'; }
		}
		else { this.nextLevelAvailiable = true; }
	};
}