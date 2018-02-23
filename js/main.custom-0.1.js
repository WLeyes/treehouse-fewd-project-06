const videoContainer   = document.querySelector('.video__player--container');
const video            = document.querySelector('.video__player'); // why is this coming back null? I am able to dispalay in console!
video.controls = false; // todo: if html5 video is supported only add my controls if javascript is enabled
const videoControls    = document.querySelector('.video__player--controls');
const play             = document.querySelector('.video__player__controls--play');

 // const playClasses    = play.classList;
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
  play.classList.remove('fa-play');
  play.classList.add('fa-pause');
}, false);

video.addEventListener('pause', function () {
  play.classList.remove('fa-pause');
  play.classList.add('fa-play');
}, false);

video.addEventListener('ended', function () {
  this.pause();
  play.classList.remove('fa-pause');
  play.classList.add('fa-play');
}, false);
