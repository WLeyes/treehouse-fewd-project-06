'use strict';

$(document).ready(function() {
  captionHighlight();
  var closedCaptionText = $(".player__closed-caption");
  $(closedCaptionText).css("display", "block");
  $('video').mediaelementplayer({
    startVolume: 0.8,
    loop: false,
    features: ['playpause', 'current', 'progress', 'duration', 'fullscreen'],
    defaultVideoWidth: '100%',
    defaultVideoHeight: '100%'
  });
});
