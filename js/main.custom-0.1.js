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

// half functional in Chrome Opera and Firefox as it changes from pause state to play and switches icon
// in MS Edge play and pause functions correctly but icon keeps same state (fa-play) likley due to the replace() i am using for now

  video.addEventListener('play', function () {
    play.classList.replace('fa-play', 'fa-pause');
    alert('from pause state to play!'); // test
  }, false);

  video.addEventListener('pause', function () {
    this.pause();
    play.classList.replace('fa-pause', 'fa-play');
    alert('from play state to pause!'); // test not triggering on click but is triggered on video.ended
  }, false);


  video.addEventListener('ended', function () {
    this.pause();
    play.classList.replace('fa-pause', 'fa-play');
  }, false);


}); // EOF
