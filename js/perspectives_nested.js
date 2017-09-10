//                                 C O N S T R U C T O R
// -----------------------------------------------------------------------------------------------------
function garevna_Perspective ( params ) {
	this.params = params;
	this.defaultCentralImage = '/Javascript/anim_gif/perspective-1.gif';
	this.defaultSideImage = '/Javascript/anim_gif/qube_white.gif';
	this.parentNode = params.parentObject || document.body[0];
	//this.innerWidth = this.parentNode.getBoundingClientRect().width;
	//this.innerHeight = this.parentNode.getBoundingClientRect().height;
	
	this.container = document.createElement('div');
	// this.container.id = params.containerId || 'garevna_perspectiveContainer';
	this.container.parentObject = this;
	this.container.style.width = params.width || 0;
	this.container.style.height = params.height || 0;
	this.container.style.top = params.top || 0;
	this.container.style.left = params.left || 0;
	this.container.className = 'garevna_perspectiveContainer';
	this.container.onmouseover = function ( event ) { this.parentObject.mc_perspective ( event ); }
	this.parentNode.appendChild(this.container);
	this.leftSide = document.createElement('div');
	this.rightSide = document.createElement('div');
	this.topSide = document.createElement('div');
	this.bottomSide = document.createElement('div');
	this.centralSide = document.createElement('div');
	
	// this.leftSide.id = params.leftSideId || 'garevna_perspectiveLeftSide';
	this.leftSide.parentObject = this;
	this.leftSide.className = 'garevna_perspectiveLeftSide';
	this.leftSide.style.backgroundImage = 'url(' + (params.leftBackground||params.xBackground||this.defaultSideImage) + ')';
	this.leftSide.style.opacity = "0.4";
	this.leftSide.onmouseover = function ( event ) { this.style.opacity = "1"; this.parentObject.mc_perspective ( event ); }
	
	// this.rightSide.id = params.rightSideId || 'garevna_perspectiveRightSide';
	this.rightSide.parentObject = this;
	this.rightSide.className = 'garevna_perspectiveRightSide';
	this.rightSide.style.backgroundImage = 'url('+(params.rightBackground||params.xBackground||this.defaultSideImage)+')';
	this.rightSide.style.opacity = "0.4";
	this.rightSide.onmouseover = function (event) { this.style.opacity = "1"; this.parentObject.mc_perspective ( event ); }
	this.rightSide.onmouseout = function ( event ) { this.style.opacity = "0.4"; }
	// this.topSide.id = params.topSideId || 'garevna_perspectiveTopSide';
	this.topSide.parentObject = this;
	this.topSide.className = 'garevna_perspectiveTopSide';
	this.topSide.style.backgroundImage = 'url(' + (params.topBackground|| params.yBackground||this.defaultSideImage) + ')';
	this.topSide.style.opacity = "0.4";
	this.topSide.onmouseover = function ( event ) { this.style.opacity = "1"; this.parentObject.mc_perspective ( event ); }
	this.topSide.onmouseout = function ( event ) { this.style.opacity = "0.4"; }
	// this.bottomSide.id = params.bottomSideId || 'garevna_perspectiveBottomSide';
	this.bottomSide.parentObject = this;
	this.bottomSide.className = 'garevna_perspectiveBottomSide';
	this.bottomSide.style.backgroundImage = 'url('+(params.bottomBackground||params.yBackground||this.defaultSideImage)+')';
	this.bottomSide.style.opacity = "0.4";
	this.bottomSide.onmouseover = function ( event ) {
		this.style.opacity = "1";
		this.parentObject.mc_perspective ( event );
	}
	this.bottomSide.onmouseout = function ( event ) { this.style.opacity = "0.4"; }
	
	this.centralSide.parentObject = this;
	this.centralSide.className = 'garevna_perspectiveCenterSide';
	this.centralSide.style.backgroundImage = 'url('+(params.centralBackground||params.background||this.defaultCentralImage)+')';
	this.centralSide.onmouseover = function ( event ) { this.parentObject.mc_perspective ( event ); }
	
	this.container.appendChild( this.leftSide );
	this.container.appendChild( this.rightSide );
	this.container.appendChild( this.topSide );
	this.container.appendChild( this.bottomSide );
	this.container.appendChild( this.centralSide );
	
	this.clearContainer = function () {
		var removings = [
		    document.getElementsByClassName('garevna_perspectiveLeftSide')[0],
			document.getElementsByClassName('garevna_perspectiveRightSide')[0],
			document.getElementsByClassName('garevna_perspectiveTopSide')[0],
			document.getElementsByClassName('garevna_perspectiveBottomSide')[0],
		];
		for ( var j=0; j < removings.length; j++ ) {
			removings[j].parentNode.removeChild(removings[j]);
		}
		var _central = document.getElementsByClassName('garevna_perspectiveCenterSide')[0];
		TweenLite.to( _central, 3, { marginTop:'0', marginLeft:'0', width:'100%', height:'100%'	});
	};
	this.animatedObjectSize = function () {
		
		this.innerWidth = this.parentNode.getBoundingClientRect().width;
		this.innerHeight = this.parentNode.getBoundingClientRect().height;
		this.container.normalSize = Math.round(Math.min(this.innerWidth, this.innerHeight) * 0.2);
		this.container.largeSize = this.container.normalSize * 3;
		this.container.largeSizeTop = Math.round((this.innerHeight - this.container.largeSize)/2);
		this.container.largeSizeLeft = Math.round((this.innerWidth - this.container.largeSize)/2);
		this.container.top = Math.round((this.innerHeight - this.container.normalSize)/2);
		var dy = Math.round(this.container.top*0.5);
		this.container.left = Math.round((this.innerWidth - this.container.normalSize)/2);
		var dx = Math.round(this.container.left*0.5);
		this.container.coords = {
			garevna_perspectiveCenterSide: [
			    this.container.largeSizeTop + 'px',
				this.container.largeSizeLeft + 'px',
				this.container.largeSize + 'px'
			],
			garevna_perspectiveTopSide:    [
			    this.container.top - dy + 'px',
				this.container.left + 'px',
				this.container.normalSize + 'px'
			],
			garevna_perspectiveRightSide:  [
			    this.container.top + 'px',
				this.container.left + dx + 'px',
				this.container.normalSize + 'px'
			],
			garevna_perspectiveBottomSide: [
			    this.container.top + dy + 'px',
				this.container.right + 'px',
				this.container.normalSize + 'px'
			],
			garevna_perspectiveLeftSide:   [
			    this.container.top + 'px',
				this.container.left - dx + 'px',
				this.container.normalSize + 'px'
			]
		};
		TweenLite.to(this.container, 2, {
			marginTop:this.container.top,
			marginLeft:this.container.left,
			width:this.container.normalSize + 'px',
			height:this.container.normalSize + 'px'
		} );
	};
	// =================================================================================================== event callback
	this.mc_perspective = function ( event ) {
		TweenLite.to( event.target.parentObject.container, 2, {
			marginTop:  event.target.parentObject.container.coords[event.target.className][0],
			marginLeft: event.target.parentObject.container.coords[event.target.className][1],
			width:      event.target.parentObject.container.coords[event.target.className][2],
			height:     event.target.parentObject.container.coords[event.target.className][2]
		});
	};
	this.animatedObjectSize ();
}
