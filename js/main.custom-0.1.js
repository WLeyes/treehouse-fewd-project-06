"use strict";

////////////////////////////////////////////////////////////////////////////////
// window.load event
////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", function(event) {
  var supportsHTML5 = !!document.createElement('video').canPlayType;
  fullscreen();
  if(supportsHTML5) {
    playPause();
    settingsMenu();
    closedCaption();
    volume();
  }

////////////////////////////////////////////////////////////////////////////////
// .remove() Polyfill
////////////////////////////////////////////////////////////////////////////////

  // Pollyfill for .remove()
  // From:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
  (function(arr) {
    arr.forEach(function(item) {
      if (item.hasOwnProperty("remove")) {
        return;
      }
      Object.defineProperty(item, "remove", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          if (this.parentNode !== null) this.parentNode.removeChild(this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

////////////////////////////////////////////////////////////////////////////////
// IE 11 or less workarounds
////////////////////////////////////////////////////////////////////////////////

  // if IE set player height to 100%
  function GetIEVersion() {
    var userAgent = window.navigator.userAgent;
    var agentIndex = userAgent.indexOf("MSIE");

    if (agentIndex > 0)
      return parseInt(
        userAgent.substring(agentIndex + 5, userAgent.indexOf(".", agentIndex))
      );
    else if (!!navigator.userAgent.match(/Trident\/7\./)) return 11;
    else return 0; //It is not IE
  }

  // If IE use web fonts otherwise use SVG's
  var video = document.querySelector(".player");
  var svgIcons = document.querySelector(".svgIcons");
  var headTag = document.getElementsByTagName("head")[0];

// if modern browser (Chrome, Firefox, Opera, MD Edge) then insert script tag to use for Icons
  var script = document.createElement("script");
  script.setAttribute("defer", "defer");
  script.src = "js/vendor/fontawesome/fontawesome-all.min.js";

  var link = document.createElement("link");
  link.href = "css/vendor/fontawesome/css/fontawesome-all.min.css";
  link.rel = "stylesheet";

  if (GetIEVersion() > 0) {
    video.style.height = "100%";
    headTag.appendChild(link);
  } else {
    headTag.appendChild(script);
  }
  // alert(window.navigator.userAgent); // keep for debugging
  // todo: add iOS support
}); // end window.load

////////////////////////////////////////////////////////////////////////////////
// Fullscreen
////////////////////////////////////////////////////////////////////////////////
function fullscreen() {
  // Check if you can use fullscreen
  var fullscreen = document.querySelector(".player__controls--fullscreen");
  var videoControls = document.querySelector(".player__controls");
  var videoContainer = document.querySelector(".player__container");
  // check if fullscreen is supported
  fullscreenEnabled();
  // check if already fullscreen and how to handle it
  fullscreen.addEventListener("click", function(e) {
    handleFullscreen();
  });
  var handleFullscreen = function handleFullscreen() {
    if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen)
        document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenDataForPlayer(false);
      setFullscreenDataForControls(false);
    } else {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.mozRequestFullScreen)
        videoContainer.mozRequestFullScreen();
      else if (videoContainer.webkitRequestFullScreen)
        videoContainer.webkitRequestFullScreen();
      else if (videoContainer.msRequestFullscreen)
        videoContainer.msRequestFullscreen();
      setFullscreenDataForPlayer(true);
      setFullscreenDataForControls(true);
    }
  };
  // Check if fullscreen is already enabled
  var isFullScreen = function isFullScreen() {
    return !!(
      document.fullScreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
  };

  // Set data-fulscreen's value
  var setFullscreenDataForPlayer = function setFullscreenDataForPlayer(state) {
    videoContainer.setAttribute("data-fullscreen", !!state);
  };
  document.addEventListener("fullscreenchange", function(e) {
    setFullscreenDataForPlayer(
      !!(document.fullScreen || document.fullscreenElement)
    );
  });
  document.addEventListener("webkitfullscreenchange", function() {
    setFullscreenDataForPlayer(!!document.webkitIsFullScreen);
  });
  document.addEventListener("mozfullscreenchange", function() {
    setFullscreenDataForPlayer(!!document.mozFullScreen);
  });
  document.addEventListener("msfullscreenchange", function() {
    setFullscreenDataForPlayer(!!document.msFullscreenElement);
  });
  var setFullscreenDataForControls = function setFullscreenDataForControls(
    state
  ) {
    videoControls.setAttribute("data-fullscreen", !!state);
  };
  document.addEventListener("fullscreenchange", function(e) {
    setFullscreenDataForControls(
      !!(document.fullScreen || document.fullscreenElement)
    );
  });
  document.addEventListener("webkitfullscreenchange", function() {
    setFullscreenDataForControls(!!document.webkitIsFullScreen);
  });
  document.addEventListener("mozfullscreenchange", function() {
    setFullscreenDataForControls(!!document.mozFullScreen);
  });
  document.addEventListener("msfullscreenchange", function() {
    setFullscreenDataForControls(!!document.msFullscreenElement);
  });
  if (videoControls.getAttribute("data-fullscreen") == "true") {
    var video = document.querySelector(".player");
    var _videoControls = document.querySelector(".player__controls");
    var _videoContainer = document.querySelector(".player__container");
  }
}

function fullscreenEnabled() {
  var fullScreenEnabled = !!(
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled ||
    document.webkitSupportsFullscreen ||
    document.webkitFullscreenEnabled ||
    document.createElement("video").webkitRequestFullScreen
  );
  if (!fullScreenEnabled) {
    fullscreen.style.display = "none";
  }
}

////////////////////////////////////////////////////////////////////////////////
// Control Buttons || todo: hide custom controls on iOS
////////////////////////////////////////////////////////////////////////////////

//todo: New feature - add icon for video.waiting

// Play/Pause button
function playPause() {
  var videoControls = document.querySelector(".player__controls");
  var play = document.querySelector(".player__controls--play");
  var video = document.querySelector(".player");
  video.controls = false;

  var togglePlayPause = function togglePlayPause(type) {
    if (type == "play") {
      if (video.paused || video.ended) {
        play.setAttribute("data-state", "play");
      } else {
        play.setAttribute("data-state", "pause");
      }
    }
  };

  video.addEventListener(
    "play",
    function() {
      togglePlayPause("play");
      var playPauseToggle = document.querySelector(".fa-play");
      playPauseToggle.classList.remove("fa-play");
      playPauseToggle.classList.add("fa-pause");
      play.title = "Click to pause";
    },
    false
  );
  video.addEventListener(
    "pause",
    function() {
      togglePlayPause("play");
      var playPauseToggle = document.querySelector(".fa-pause");
      playPauseToggle.classList.remove("fa-pause");
      playPauseToggle.classList.add("fa-play");
      play.title = "Click to play";
    },
    false
  );

  play.addEventListener("click", function(e) {
    if (video.paused || video.ended) video.play();
    else video.pause();
  });
  video.addEventListener("click", function(e) {
    if (video.paused || video.ended) video.play();
    else video.pause();
  });
}

// Closed caption button
function closedCaption() {
  var closedCaption = document.querySelector(".player__controls--cc");
  var closedCaptionText = document.querySelector(".player__closed-caption");
  closedCaptionText.style.display = "none";

  closedCaption.addEventListener("click", function() {
    if (closedCaptionText.style.display == "none") {
      closedCaptionText.style.display = "block";
      closedCaption.style.color = "yellow";
      captionHighlight();
    } else {
      closedCaptionText.style.display = "none";
      closedCaption.style.color = "";
    }
  });
}

// Highlights Closed Caption text
function captionHighlight() {
  var video = document.querySelector(".player");
  var span = document.querySelectorAll("span");
  video.addEventListener("timeupdate", function() {
    for (var _i = 0; _i < span.length; _i += 1) {
      if (
        video.currentTime > span[_i].getAttribute("data-start") &&
        video.currentTime < span[_i].getAttribute("data-end")
      ) {
        span[_i].style.backgroundColor = "yellow";
      } else {
        span[_i].style.backgroundColor = "";
      }
    }
  });
  for (var i = 0; i < span.length; i += 1) {
    span[i].addEventListener("click", function(event) {
      video.currentTime = event.target.getAttribute("data-start");
    });
  }
} // end captionHighlight

// Volume slider
function volume() {
  var video = document.querySelector(".player");
  var volume = document.querySelector(".player__controls--volume");
  video.volume = 1;
  var volumeSlider = document.querySelector(".player__controls--volume-slider");
  volumeSlider.style.display = "none";
  var volumeToggle = document.querySelector(".fa-volume-off");

  // Volume
  volume.addEventListener("mouseover", function() {
    volumeSlider.style.display = "block";
  });
  volume.addEventListener("mouseout", function() {
    volumeSlider.style.display = "none";
  });

  // Mute / un-mute
  function mute() {
    volumeToggle = document.querySelector(".fa-volume-off");
    volumeToggle.classList.add("fa-volume-mute");
    volumeToggle.style.color = "red";
    video.muted = !video.muted;
    volume.setAttribute("title", "Double-click to unmute");
  }
  function unmute() {
    volumeToggle = document.querySelector(".fa-volume-mute");
    volumeToggle.classList.remove("fa-volume-mute");
    volumeToggle.classList.add("fa-volume-off");
    volumeToggle.style.color = "";
    volume.setAttribute("title", "Volume");
    video.muted = false;
  }

  volume.addEventListener("dblclick", function() {
    if (volume.getAttribute("title") == "Volume") {
      mute();
    } else {
      unmute();
    }
  });
}

// Progress bar
var progressBar = document.querySelector('.player__controls--playback-possition');
var progressBarFallback = document.querySelector('.player__controls--playback-possition-fallback');
var video = document.querySelector(".player");

video.addEventListener('timeupdate', function() {
   if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
   progressBar.value = video.currentTime;
});

// settings button
function settingsMenu() {
  var settings = document.querySelector(".player__controls--settings");
  var playerChoiceMenu = document.querySelector(
    ".player__controls--settings--player-choice"
  );
  playerChoiceMenu.style.display = "none";

  settings.addEventListener("click", function() {
    if (playerChoiceMenu.style.display == "none") {
      playerChoiceMenu.style.display = "block";
      playerChoiceMenu.style.color = "yellow";
      settings.style.color = "yellow";
    } else {
      playerChoiceMenu.style.display = "none";
      playerChoiceMenu.style.color = "";
      settings.style.color = "";
    }
  });
  customControls();
  html5Controls();
  mediaElement();
}

////////////////////////////////////////////////////////////////////////////////
// Settings Menu pop-up  (Cog Icon)
////////////////////////////////////////////////////////////////////////////////

// settings--defaultHTML5-controls
function html5Controls() {
  var html5Selected = document.querySelector(".player-choice--defaultHTML5");
  var videoControls = document.querySelector(".player__controls");
  html5Selected.addEventListener("click", function() {
    var video = document.querySelector(".player");
    // Hide custom controls
    videoControls.style.display = "none";
    document.querySelector(".fa-cog").style.display = "block";
    // Enable html5 defaul controls
    video.controls = true;
    video.style.borderRadius = "0";
    // Reset Controls
    controlReset();
  });
}

// controlReset
function controlReset() {
  // create new settings cog and appendChild to DOM
  var articleElement = document.getElementsByTagName("article")[0];
  var sectionElementTag = document.createElement("section");
  // sectionElementTag.className = 'player__controls--settings--player-choice';

  var buttonElementTag = document.createElement("button");
  buttonElementTag.className = "player__controls--settings";
  buttonElementTag.title = "Settings";
  buttonElementTag.type = "button";
  buttonElementTag.name = "settings";
  var cogIconTag = document.createElement("i");
  cogIconTag.className = "fal fa-cog";
  cogIconTag.style.fontSize = "32px";
  articleElement.appendChild(sectionElementTag);
  sectionElementTag.appendChild(buttonElementTag);
  buttonElementTag.appendChild(cogIconTag);
  // cheap way to reset controls
  buttonElementTag.addEventListener("click", function() {
    window.location.reload();
  });
}
// settings--custom-controls
function customControls() {
  var customSelected = document.querySelector(".player-choice--custom");
  customSelected.addEventListener("click", function() {
    var videoControls = document.querySelector(".player__controls");
    if (videoControls.style.display == "none") {
      videoControls.style.display = "initial";
    }
  });
}

// settings--mediaElement-controls
function mediaElement() {
  var play = document.querySelector(".player__controls--play");
  var mediaElementSelected = document.querySelector(
    ".player-choice--mediaElement"
  );
  var videoControls = document.querySelector(".player__controls");

  mediaElementSelected.addEventListener("click", function() {
    var headTag = document.getElementsByTagName("head")[0];
    var mediaElementJavascriptTag = document.createElement("script");
    videoControls.style.display = "none";

    // create and appendChild to <head> the required mediaElement js script
    mediaElementJavascriptTag.type = "text/javascript";
    mediaElementJavascriptTag.src =
      "js/vendor/mediaElement/mediaelement-and-player.min.js";
    headTag.appendChild(mediaElementJavascriptTag);

    // create and appendChild to <head> the required mediaElement css script
    var mediaElementCSSTag = document.createElement("link");
    mediaElementCSSTag.rel = "stylesheet";
    mediaElementCSSTag.href = "css/vendor/mediaElement/mediaelementplayer.css";
    headTag.appendChild(mediaElementCSSTag);

    // create and appendChild to <head>  mediaElement css override script
    mediaElementCSSTag = document.createElement("link");
    mediaElementCSSTag.rel = "stylesheet";
    mediaElementCSSTag.href =
      "css/vendor/mediaElement/mediaElementOverride.css";
    headTag.appendChild(mediaElementCSSTag);

    // Add required class to the video element
    var player = document.querySelector(".player");
    // player.classList.add('mejs__player');
    player.classList.remove("player");
    player.classList.add("mejs__player");
    var mejsPlayer = document.querySelector(".mejs__player");
    mejsPlayer.style.width = "100%";
    mejsPlayer.style.height = "100%";

    // Display body closedCaptionText
    var closedCaptionText = document.querySelector(".player__closed-caption");
    closedCaptionText.style.display = "initial";

    // Reset Controls
    controlReset();
  });
}
