// add click listener on config cog icon
// cog opens config tray - slide in from left to right
// config options: use custom player (default) or mediaElement player

// if mediaElement is selected append the required classes and script to the DOM
//   -- using the appended classes control media playback and customize the skin
//   -- then run code from the additional features section below which will have a case for if mediaElement
// else run functions below for my custom media player:

//////////////////////////////////////////////////////////////
// *** PLAYER MUST FUNCTION IN AT LEAST 3 MODERN BROWSERS ***
/////////////////////////////////////////////////////////////
// Target browsers:
// Chrome
// Firefox
// Opera

// if I have time:
// Safari
// MS Edge/IE


// Elements needed:

// onload: check if browser can play type
//  thinking of setting the controls in the html(as a fallback) then disable via js | video.controls=false
// -- if can play type mp4 then ...
// -- if can play type ogg then ...
// -- else error

// Controls:
// on mobile stick to bottom (maybe scroll and highlite bottom offscreen up to the player? todo: figureout how to make the most out of mobile screen size)

//  - closed caption (default)
//  - play
//  - pause
//  - track start time
//  - back n seconds
//  - current time/progress bar
//  - track end time
//  - sound
//  - fullscreen

function video() {
  controls = {
    play:,
    pause,
    startTime:,
    skipBack:,
    currentTime:,
    endTime:,
    volume:,
    fullscreen:
  };
  player = {
    // not sure if needed
  }
}

// additional features:

// current time in video appends highlights on the relevant text on page
// clicking on the text skips to the appropriate time
