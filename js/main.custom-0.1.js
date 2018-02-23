const supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {
 // alert('yes'); // test if video can play else ... no it can not

 let videoContainer = document.querySelector('.video__player--container');
 let video          = document.querySelector('.video__player');
 video.controls     = false;
 
 let videoControls  = document.querySelector('.video__player--controls');
 let play           = document.querySelector('.video__player__controls--play');
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

} else {
  // alert('no'); // html5 is not supported
}
