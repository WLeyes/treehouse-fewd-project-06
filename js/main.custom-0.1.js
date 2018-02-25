 window.addEventListener("load", function(event) {

 // Video player
  const videoContainer  = document.querySelector('.player__container');
  const video           = document.querySelector('.player');
  video.controls        = false; // todo: if html5 video is supported, only add my controls if javascript is enabled
  video.preload         = 'none';
// Video player controls
  const videoControls   = document.querySelector('.player__controls');
  const play            = document.querySelector('.player__controls--play');
  let playPauseToggle   = document.querySelector('.fa-play');

// Volume controls
  const volume          = document.querySelector('.player__controls--volume');
  video.volume          = 1;
  let volumeSlider      = document.querySelector('.player__controls--volume-slider');
  volumeSlider.style.display = 'none';
  let volumeToggle      = document.querySelector('.fa-volume-off');

// Closed caption controls
const closedCaption         = document.querySelector('.player__controls--cc');
const closedCaptionText     = document.querySelector('.player__closed-caption');
closedCaptionText.style.display = 'none';

closedCaption.addEventListener('click', function () {
      if(closedCaptionText.style.display == 'none') {
        closedCaptionText.style.display = 'initial';
        closedCaption.style.color = 'yellow';
      } else {
        closedCaptionText.style.display = 'none';
        closedCaption.style.color = '';
      }
});


  // Volume
  volume.addEventListener('mouseover', () => volumeSlider.style.display = 'inline-block');
  volume.addEventListener('mouseout', function () {
        volumeSlider.style.display = 'none';
  });

  // Mute
function mute() {
  volumeToggle = document.querySelector('.fa-volume-off');
  volumeToggle.classList.add('fa-volume-mute');
  volumeToggle.style.color = 'red';
  video.muted = !video.muted;
  volume.setAttribute('title', 'Double-click to unmute');
}

function unmute(){
  volumeToggle = document.querySelector('.fa-volume-mute');
  volumeToggle.classList.remove('fa-volume-mute');
  volumeToggle.classList.add('fa-volume-off');
  volumeToggle.style.color = '';
  volume.setAttribute('title', 'Volume');
  video.muted = false;
}

  volume.addEventListener('dblclick', function () {
    if(volume.getAttribute('title') == 'Volume') {
      mute();
    } else {
      unmute();
    }
  });

//Fullscreen || todo: add fullscreen function back in.
  const fullscreen      = document.querySelector('.player__controls--fullscreen');
  // check if fullscreen is supported
  let fullScreenEnabled = !!(document.fullscreenEnabled
                          || document.mozFullScreenEnabled
                          || document.msFullscreenEnabled
                          || document.webkitSupportsFullscreen
                          || document.webkitFullscreenEnabled
                          || document.createElement('video').webkitRequestFullScreen);
  if (!fullScreenEnabled) {
     fullscreen.style.display = 'none';
  }

  // check if already fullscreen and how to handle it
  fullscreen.addEventListener('click', (e) => handleFullscreen());
  let handleFullscreen = () => {
   if (isFullScreen()) {
           if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
   } else {
           if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
      else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
      else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
      setFullscreenData(true);
   }
}

let isFullScreen = () => {
   return !!(document.fullScreen
          || document.webkitIsFullScreen
          || document.mozFullScreen
          || document.msFullscreenElement
          || document.fullscreenElement);
}

// Set data-fulscreen's value
var setFullscreenData = function(state) {
   videoContainer.setAttribute('data-fullscreen', !!state);
}
document.addEventListener('fullscreenchange', function(e) {
   setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
});
document.addEventListener('webkitfullscreenchange', function() {
   setFullscreenData(!!document.webkitIsFullScreen);
});
document.addEventListener('mozfullscreenchange', function() {
   setFullscreenData(!!document.mozFullScreen);
});
document.addEventListener('msfullscreenchange', function() {
   setFullscreenData(!!document.msFullscreenElement);
});

// play and pause button controls
   play.addEventListener('click', function () {
    if (video.ended) {
      video.currentTime = 0;
    }
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, false);

  video.addEventListener('play', function () {
    playPauseToggle = document.querySelector('.fa-play');
    playPauseToggle.classList.remove('fa-play');
    playPauseToggle.classList.add('fa-pause');
    play.title = 'Click to pause';
  }, false);

  video.addEventListener('pause', function () {
    playPauseToggle = document.querySelector('.fa-pause');
    playPauseToggle.classList.remove('fa-pause');
    playPauseToggle.classList.add('fa-play');
    play.title = 'Click to play';
  }, false);


  video.addEventListener('ended', function () {
    this.pause();
    playPauseToggle = document.querySelector('.fa-pause');
    playPauseToggle.classList.remove('fa-pause');
    playPauseToggle.classList.add('fa-play');
    play.title = 'Click to play';
  }, false);

}); // EOF
