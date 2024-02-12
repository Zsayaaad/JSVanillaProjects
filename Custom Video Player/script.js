const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const vidoe = document.getElementById('video');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//Play&Puse
function toggleVideo() {
  if (vidoe.paused) {
    vidoe.play();
  } else {
    vidoe.pause();
  }
}

// Update Play Icon
function updatePlayIcon() {
  if (vidoe.paused) {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}

// Stop Video
function stopVidoe() {
  // First Reset Time.
  vidoe.currentTime = 0;
  // Second Stop Vid.
  vidoe.pause();
}

// To get the value of the time and progress bar moves based on its value
function updateProgress() {
  /**
   *console.log(vidoe.duration); // Get the duration of vid
   *console.log(vidoe.currentTime); // Get the current playback time in sec.
   */
  progress.value = (vidoe.currentTime / vidoe.duration) * 100; 

  // Get the minutes
  let minutes = Math.floor(vidoe.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  /** Note:
   * The if conditions are used to add leading zeros when necessary for consistent formatting.
   */

  // Get the seconds
  let seconds = Math.floor(vidoe.currentTime % 60); // 0 1 2 3 4 ....59
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  timestamp.innerHTML = `${minutes}:${seconds}`;
}

// I need to get the time that I moved the progress and the vid moves based on this time.
function setVideoProgress() {
  vidoe.currentTime = (+progress.value * vidoe.duration) / 100;
}

/**Event Listeners */
vidoe.addEventListener('click', toggleVideo); // play&pause the vid when click on screen
vidoe.addEventListener('play', updatePlayIcon); // shows when the vid stops
vidoe.addEventListener('pause', updatePlayIcon); // shows when the vid plays

playBtn.addEventListener('click', toggleVideo); // play&pause the vid when click on startBtn

stopBtn.addEventListener('click', stopVidoe); // pause&reset the vid when click on stopBtn

vidoe.addEventListener('timeupdate', updateProgress); // when the time indicated by the currentTime

progress.addEventListener('change', setVideoProgress); // when I put the progress on any place.

