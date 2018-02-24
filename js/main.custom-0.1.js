 window.addEventListener("load", function(event) {

 // Video player
  const videoContainer  = document.querySelector('.player--container');
  const video           = document.querySelector('.player');
  video.controls        = false; // todo: if html5 video is supported, only add my controls if javascript is enabled

// Video player controls
  const videoControls   = document.querySelector('.player__controls');
  const play            = document.querySelector('.player__controls--play');
  let playPauseToggle   = document.querySelector('.fa-play');

// Volume controls
  const volume          = document.querySelector('.player__controls--volume');
  video.volume          = 1;
  let volumeSlider      = document.querySelector('.player__controls--volume-slider');
  volumeSlider.style.display = 'none';

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
  volume.addEventListener('mouseover', function () {
        volumeSlider.style.display = 'inline-block';
  });
  volume.addEventListener('mouseout', function () {
        volumeSlider.style.display = 'none';
  });

//Fullscreen
  let fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
  const fullscreen      = document.querySelector('.player__controls--fullscreen');


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
    play.title = 'pause';
  }, false);

  video.addEventListener('pause', function () {
    playPauseToggle = document.querySelector('.fa-pause');
    playPauseToggle.classList.remove('fa-pause');
    playPauseToggle.classList.add('fa-play');
    play.title = 'play';
  }, false);


  video.addEventListener('ended', function () {
    this.pause();
    playPauseToggle = document.querySelector('.fa-pause');
    playPauseToggle.classList.remove('fa-pause');
    playPauseToggle.classList.add('fa-play');
  }, false);

}); // EOF
