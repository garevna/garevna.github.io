// ================================================================================================================
//                                             Video Slider
// ----------------------------------------------------------------------------------------------------------------
//                  в глобальной области видимости будет объект:   garevna_YTPlayerForSlider
// ================================================================================================================
function garevnaVideoSlider () {
	
	var parent_object = this;                        // ____________________________________________ контекст вызова
	var videoSourse = parent_object.func_params;     // ____________________________________________ JSON file name
	
	if (parent_object == window) {
		parent_object = document.getElementsByTagName('body').item(0);
	}
	
	//var garevna_player;
	
	parent_object.onTweenBack_callback = function () {
		var player = window.garevna_YTPlayerForSlider;
		if (player) {
			player.pauseVideo();
		}
	}
	parent_object.onTweenFront_callback = function () {
		
	}
	var $video, $videoList;
	var $interval = 0;
	
	// -------------------------------  Init globals ---------------------------
	window.garevna_sliderDataReceived = false;
	
	window.garevnaTestReady = function () {
		if (window.garevna_sliderDataReceived) {
			videoSlider.set_slides_content ($video);
			if (window.garevna_YouTubeIframeAPIReady || window.garevna_YTPlayerReady) {
				window.clearInterval(window.garevna_interval);
			}
			else {
				$interval++;
				if ($interval > 10) {
					garevna_lib.createPromptWin ('Возможны неполадки с загрузкой YouTube Player. Если видео не будет отображаться, обновите страницу (F5)');
					window.clearInterval(window.garevna_interval);
				}
			}
		}
	}
	window.garevna_YTPlayerReady = false;
	window.garevna_interval = window.setInterval(function(){ window.garevnaTestReady() }, 1000);
	
	// -------------------------------  Init locals ---------------------------
	
	var slider, slide, player;
	
	var player_id = 'garevna_YTPlayer_for_slider';
	var slide_id = 'garevna_ContainerForPlayer';
	var slider_id = 'garevna_VideoSlider';
	
	// creating slider
		var slider = document.createElement('div');
		parent_object.appendChild(slider);
		slider.id = slider_id;
		
		// creating container for player (slide)
		var slide = document.createElement('div');
		slider.appendChild(slide);
		slide.id = slide_id;
		
		var player = document.createElement('div');
		slide.appendChild(player);
		player.id = player_id;
		
	var garevna_player = playerWrapper(player_id, slide_id, $playlist);
	
	function playerWrapper (player_id, playerContainer_id, $playlist) {
		
		var player_container = document.getElementById(playerContainer_id);
		
		window.garevna_YTPlayerForSlider = new window.YT.Player(player_id, {
			width: '100%',
			height: '100%',
			playerVars: { 'autoplay': 0, 'showinfo': 0, 'rel': 0/*, 'controls': 0*/},
			videoId: '',
			events: {
				'onReady': onPlayerReady
			}
		});
		player = window.garevna_YTPlayerForSlider;
		
		function onPlayerReady(event) {
			window.garevna_YTPlayerReady = true;
			player_container.style.border = 'none';
			player_container.style.boxSizing = 'border-box';
			if (window.garevna_sliderDataReceived) {
				var k = videoSlider.getCurrentSlide();
				player.loadVideoById($video[k].content);
				player.pauseVideo();
			}
		}
		return {
			changeVideo: function (video_id) {
				player = window.garevna_YTPlayerForSlider;
				player.loadVideoById(video_id);
			},
			getPlayerContainerId: function () {
				return player_container.id;
			},
			getPlayerContainer: function () {
				return player_container;
			},
			playerTurnOff: function () {
				player.pauseVideo();
			}
		}
	}
	var videoSlider = garevna_sliderLibrary ({
			parent_object: parent_object,
			// ------------------ callbacks --------------
			changeSlideCallback: changeCurrentVideo,
			
			video: true,
			sourseJSON: videoSourse,
			
			urlField: "content",
			commentField: "txt",
			container: slide,
			// ----------------- ids ---------------------
			slider_id:slider_id,
			slide_container_id:slide_id,
			naviPanelId:'garevna_video_navi_panel',
			infoPanelId: 'garevna_video_info_panel',
	});
	
	// load Data for slider
	
	var $playlist = videoSlider.load_data (getData);
	
	
	function getData ($data) {
		
		$video = $data.videoList;
		videoSlider.buildNavigationPanel ($video.length);
		window.garevna_sliderDataReceived = true;
	}
	
	function changeCurrentVideo () {
		var k = videoSlider.getCurrentSlide();
		var player = window.garevna_YTPlayerForSlider;
		player.loadVideoById($video[k].content);
	}
	
}
