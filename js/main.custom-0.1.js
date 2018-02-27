window.addEventListener("load", (event) => {
  const video           = document.querySelector('.player');
  // video.controls        = false;
  video.preload         = 'none';
  let playPauseToggle   = document.querySelector('.fa-play');
  fullscreen();
  playPause();
  settings();
  customControls();
  html5Controls();
  mediaElement();
  closedCaption();
  volume();
  // work out how to detect iOS
  const isIOS = (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)
  const videoControls   = document.querySelector('.player__controls');
    videoControls.style.display = 'none';

    var standalone = window.navigator.standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test( userAgent ),
        ios = /iphone|ipod|ipad/.test( userAgent );

    if( ios ) {
        if ( !standalone && safari ) {
            alert('browser');
            videoControls.style.display = 'none';
        } else if ( standalone && !safari ) {
            alert('standalone');
        } else if ( !standalone && !safari ) {
            alert('uiwebview');
        };
    } else {
        alert('not iOS');
    };


}); // end window.load



////////////////////////////////////////////////////////////////////////////////
// Fullscreen
////////////////////////////////////////////////////////////////////////////////
function fullscreen() {
  // Check if you can use fullscreen
    const fullscreen      = document.querySelector('.player__controls--fullscreen');
    const videoControls   = document.querySelector('.player__controls');
    const videoContainer  = document.querySelector('.player__container');
    // check if fullscreen is supported
    fullscreenEnabled();
    // check if already fullscreen and how to handle it
    fullscreen.addEventListener('click', (e) => handleFullscreen());
    let handleFullscreen = () => {
     if (isFullScreen()) {
             if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setFullscreenDataForPlayer(false);
        setFullscreenDataForControls(false);
     } else {
             if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        setFullscreenDataForPlayer(true);
        setFullscreenDataForControls(true);
     }
  }
  // Check if fullscreen is already enabled
  let isFullScreen = () => {
     return !!(document.fullScreen
            || document.webkitIsFullScreen
            || document.mozFullScreen
            || document.msFullscreenElement
            || document.fullscreenElement);
  }

  // Set data-fulscreen's value
  let setFullscreenDataForPlayer = (state) => videoContainer.setAttribute('data-fullscreen', !!state);
  document.addEventListener('fullscreenchange',      (e) => setFullscreenDataForPlayer(!!(document.fullScreen || document.fullscreenElement)));
  document.addEventListener('webkitfullscreenchange', () => setFullscreenDataForPlayer(!!document.webkitIsFullScreen));
  document.addEventListener('mozfullscreenchange',    () => setFullscreenDataForPlayer(!!document.mozFullScreen));
  document.addEventListener('msfullscreenchange',     () => setFullscreenDataForPlayer(!!document.msFullscreenElement));
  let setFullscreenDataForControls = (state) => videoControls.setAttribute('data-fullscreen', !!state);
  document.addEventListener('fullscreenchange',      (e) => setFullscreenDataForControls(!!(document.fullScreen || document.fullscreenElement)));
  document.addEventListener('webkitfullscreenchange', () => setFullscreenDataForControls(!!document.webkitIsFullScreen));
  document.addEventListener('mozfullscreenchange',    () => setFullscreenDataForControls(!!document.mozFullScreen));
  document.addEventListener('msfullscreenchange',     () => setFullscreenDataForControls(!!document.msFullscreenElement));
  if(videoControls.getAttribute('data-fullscreen') == 'true') {
    const video  = document.querySelector('.player');
    const videoControls   = document.querySelector('.player__controls');
    const videoContainer  = document.querySelector('.player__container');
  }
}

function fullscreenEnabled(){
  let fullScreenEnabled = !!(document.fullscreenEnabled
                          || document.mozFullScreenEnabled
                          || document.msFullscreenEnabled
                          || document.webkitSupportsFullscreen
                          || document.webkitFullscreenEnabled
                          || document.createElement('video').webkitRequestFullScreen);
  if (!fullScreenEnabled) {
     fullscreen.style.display = 'none';
  }
}

////////////////////////////////////////////////////////////////////////////////
// controls
////////////////////////////////////////////////////////////////////////////////

function playPause() {
  const videoControls   = document.querySelector('.player__controls');
  const play            = document.querySelector('.player__controls--play');
  const video           = document.querySelector('.player');
  video.controls        = false; // todo: if html5 video is supported, only add my controls if javascript is enabled
  video.preload         = 'none';
  // play and pause button controls
  // If you click on video
     play.addEventListener('click', () => {
      if (video.ended) {
        video.currentTime = 0;
      }
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }, false);

  // If you click on play/pause button
    video.addEventListener('click', () => {
     if (video.ended) {
       video.currentTime = 0;
     }
     if (video.paused) {
       video.play();
     } else {
       video.pause();
     }
   }, false);

    video.addEventListener('play', () => {
      playPauseToggle = document.querySelector('.fa-play');
      playPauseToggle.classList.remove('fa-play');
      playPauseToggle.classList.add('fa-pause');
      play.title = 'Click to pause';
    }, false);

    video.addEventListener('pause', () => {
      playPauseToggle = document.querySelector('.fa-pause');
      playPauseToggle.classList.remove('fa-pause');
      playPauseToggle.classList.add('fa-play');
      play.title = 'Click to play';
    }, false);


    video.addEventListener('ended', () => {
      this.pause();
      playPauseToggle = document.querySelector('.fa-pause');
      playPauseToggle.classList.remove('fa-pause');
      playPauseToggle.classList.add('fa-play');
      play.title = 'Click to play';
    }, false);
}



// Closed caption controls
function closedCaption() {
  const closedCaption     = document.querySelector('.player__controls--cc');
  const closedCaptionText = document.querySelector('.player__closed-caption');
  closedCaptionText.style.display = 'none';
  closedCaption.addEventListener('click', () => {
        if(closedCaptionText.style.display == 'none') {
          closedCaptionText.style.display = 'initial';
          closedCaption.style.color = 'yellow';
        } else {
          closedCaptionText.style.display = 'none';
          closedCaption.style.color = '';
        }
  });
}

// Volume controls
function volume() {
  const video      = document.querySelector('.player');
  const volume     = document.querySelector('.player__controls--volume');
  video.volume     = 1;
  let volumeSlider = document.querySelector('.player__controls--volume-slider');
  volumeSlider.style.display = 'none';
  let volumeToggle = document.querySelector('.fa-volume-off');

    // Volume
    volume.addEventListener('mouseover', () => volumeSlider.style.display = 'block');
    volume.addEventListener('mouseout', () => volumeSlider.style.display = 'none');

  // Mute / un-mute
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

  volume.addEventListener('dblclick', () => {
    if(volume.getAttribute('title') == 'Volume') {
      mute();
    } else {
      unmute();
    }
  });
}



function html5Controls() {
  const html5Selected = document.querySelector('.player-choice--defaultHTML5');
  const videoControls         = document.querySelector('.player__controls');
    html5Selected.addEventListener('click', () => {
      const video           = document.querySelector('.player');
      // Hide custom controls
      videoControls.style.display = 'none';
      // Enable html5 defaul controls
      video.controls       = true;
      video.style.borderRadius = '0';
  });
}



// settings--custom-controls
function customControls(){
  const customSelected = document.querySelector('.player-choice--custom');
  customSelected.addEventListener('click', () => {
    const videoControls = document.querySelector('.player__controls');
    if(videoControls.style.display == 'none') {
      videoControls.style.display = 'initial';
    }

  });
}

// settings cog icon on custom controls
function settings() {
  const settings = document.querySelector('.player__controls--settings');
  const playerChoiceMenu = document.querySelector('.player__controls--settings--player-choice');
  playerChoiceMenu.style.display = 'none';
  settings.addEventListener('click', () => {
        if(playerChoiceMenu.style.display == 'none') {
          playerChoiceMenu.style.display = 'initial';
          playerChoiceMenu.style.color = 'yellow';
          settings.style.color = 'yellow';
        } else {
          playerChoiceMenu.style.display = 'none';
          playerChoiceMenu.style.color = '';
          settings.style.color = '';
        }
  });
}





////////////////////////////////////////////////////////////////////////////////
// settings--MediaElement.js
////////////////////////////////////////////////////////////////////////////////

function mediaElement(){
  const play = document.querySelector('.player__controls--play');
  const mediaElementSelected  = document.querySelector('.player-choice--mediaElement');
  const videoControls         = document.querySelector('.player__controls');

  mediaElementSelected.addEventListener('click', () => {
    const headTag                   = document.getElementsByTagName('head')[0];
    const mediaElementJavascriptTag = document.createElement('script');
    videoControls.style.display = 'none';

    // create and append to <head> the required mediaElement js script
    mediaElementJavascriptTag.type = 'text/javascript';
    mediaElementJavascriptTag.src  = 'js/vendor/mediaElement/mediaelement-and-player.min.js';
    headTag.append(mediaElementJavascriptTag);

    // create and append to <head> the required mediaElement css script
    mediaElementCSSTag = document.createElement('link');
    mediaElementCSSTag.rel  = 'stylesheet';
    mediaElementCSSTag.href = 'css/vendor/mediaElement/mediaelementplayer.css';
    headTag.append(mediaElementCSSTag);

    // create and append to <head>  mediaElement css override script
    mediaElementCSSTag = document.createElement('link');
    mediaElementCSSTag.rel  = 'stylesheet';
    mediaElementCSSTag.href = 'css/vendor/mediaElement/mediaElementOverride.css';
    headTag.append(mediaElementCSSTag);

    // Add required class to the video element
    const player = document.querySelector('.player');
    player.classList.add('mejs__player');
    player.classList.remove('player');
    const mejsPlayer = document.querySelector('.mejs__player');
    mejsPlayer.style.width  = '100%';
    mejsPlayer.style.height = '100%';

    // Display body closedCaptionText
    const closedCaptionText = document.querySelector('.player__closed-caption');
    closedCaptionText.style.display = 'initial';

    // create new settings cog and append to DOM
    const articleElement       = document.getElementsByTagName('article')[0];
    const sectionElementTag    = document.createElement('section');
    const buttonElementTag     = document.createElement('button');
    buttonElementTag.className = 'player__controls--settings';
    const cogIconTag = document.createElement('i');
    cogIconTag.className = 'fal fa-cog';

    articleElement.append(sectionElementTag);
    sectionElementTag.append(buttonElementTag);
    buttonElementTag.append(cogIconTag);
    settings();
  });
}
