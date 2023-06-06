// Basic Play/Pause Button Example


// Part 1 - Create a audio context and references to various DOM elements
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.tape-controls-play');

playButton.addEventListener(
    "click",
    () => {
      // Check if context is in suspended state (autoplay policy)
      if (audioCtx.state === "suspended") {
        // this happens because the browser attempted then rejected auto start
        audioCtx.resume();
      }
  
      // Play or pause track depending on state
      if (playButton.dataset.playing === "false") {
        // the dataset.playing value was set to false in the HTML
        audioElement.play();
        playButton.dataset.playing = "true"; // set the attribute to true so if the user clicks the button again we know to pause
      } else if (playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
      }
      // tell the browser to use the default destination (usually the speakers or headphones)
      track.connect(audioCtx.destination);
    },
    false
  );