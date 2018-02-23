 window.addEventListener("load", function(event) {
  const videoContainer = document.querySelector('.video__player--container');
  const video          = document.querySelector('.video__player'); 
  video.controls       = false; // todo: if html5 video is supported, only add my controls if javascript is enabled

  const videoControls  = document.querySelector('.video__player--controls');
  const play        = document.querySelector('.video__player__controls--play');
  const playClasses    = play.classList;

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
    play.title = 'pause';
    play.classList.replace('fa-play', 'fa-pause');
  }, false);


  video.addEventListener('pause', function () {
    play.title = 'play';
    play.classList.replace('fa-pause', 'fa-play');
  }, false);


  video.addEventListener('ended', function () {
    this.pause();
    play.classList.replace('fa-pause', 'fa-play');
  }, false);


}); // EOF
