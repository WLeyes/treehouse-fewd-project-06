const supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {
 // alert('yes');
 const video          = document.querySelector('.video__player');
 const videoContainer = document.querySelector('.video__player--container');
 const videoControls  = document.querySelector('.video__player--controls');
 const play           =  document.querySelector('.video__controls--play');
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
  play.classList.remove('fa-play');
  play.classList.add('fa-pause');
}, false);

video.addEventListener('pause', function () {
  play.title = 'play';
  play.classList.remove('fa-pause');
  play.classList.add('fa-play');
}, false);

video.addEventListener('ended', function () {
  this.pause();
  play.classList.remove('fa-pause');
  play.classList.add('fa-play');
}, false);

} else {
  alert('no');
}
