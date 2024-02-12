const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const title = document.getElementById('title'); // To make the title dynamic with audio
const cover = document.getElementById('cover'); // same as title.

const tilawaContainer = document.getElementById('tilawa-container');

const tilawat = [
  'تلاوة من سورة يونس - الشيخ أحمد السيد',
  'سورة الرحمن الشيخ ياسر الدورسي',
  'سورة الإنسان الشيخ ياسر الدوسري',
];

let tilawatIdx = 2;

loadTilawa(tilawat[tilawatIdx]);

// Update audio & title & cover
function loadTilawa(tilawa) {
  audio.src = `tilawat quran/${tilawa}.mp3`;
  title.innerText = tilawa;
  cover.src = `images/${tilawa}.jpg`;
}

// function playAudio() {
//   tilawaContainer.classList.add('play');

//   const isPlaying = tilawaContainer.classList.contains('play');

//   if (isPlaying) {
//     pauseTilawa();
//   } else {
//     playTilawa();
//   }
// }

function pauseTilawa() {
  tilawaContainer.classList.remove('play');
  playBtn.querySelector('i.fa-solid').classList.add('fa-play');
  playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');

  audio.pause();
}

function playTilawa() {
  tilawaContainer.classList.add('play');
  playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
  playBtn.querySelector('i.fa-solid').classList.add('fa-pause');

  audio.play();
}

function updateProgress(e) {
  // console.log(e.target);
  // Get the duration and current time of the audio element.
  const { duration, currentTime } = e.target;

  const progPrecentage = (currentTime / duration) * 100 + `%`;
  // console.log(progPrecentage);
  progress.style.width = progPrecentage;
}

function setAudioProgress(e) {
  // // Calculate the new audio current time based on the progress bar value.
  // const newAudioCurrentTime = (+progress.value * audio.duration) / 100;
  // // Set the audio current time.
  // audio.currentTime = newAudioCurrentTime;

  // Calculate the new audio current time based on the click X-coordinate.
  const clickX = e.offsetX;
  const newAudioCurrentTime = (clickX / this.clientWidth) * audio.duration;

  // Set the audio current time.
  audio.currentTime = newAudioCurrentTime;
}

//Event Listners
// playBtn.addEventListener('click', playAudio);
playBtn.addEventListener('click', () => {
  const isPlaying = tilawaContainer.classList.contains('play');

  if (isPlaying) {
    pauseTilawa();
  } else {
    playTilawa();
  }
});

prevBtn.addEventListener('click', () => {
  tilawatIdx--;
  if (tilawatIdx < 0) {
    tilawatIdx = tilawat.length - 1;
  }
  loadTilawa(tilawat[tilawatIdx]);

  playTilawa();
});

nextBtn.addEventListener('click', () => {
  tilawatIdx++;
  if (tilawatIdx > tilawat.length - 1) {
    tilawatIdx = 0;
  }
  loadTilawa(tilawat[tilawatIdx]);

  playTilawa();
});

/** we have an event called timeupdate which will just keep updating as the song plays.
 * The timeupdate event is fired every time the current time of the audio element changes.
 */
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setAudioProgress);

// Tilawa end
audio.addEventListener('ended', () => {
  tilawatIdx++;
  if (tilawatIdx > tilawat.length - 1) {
    tilawatIdx = 0;
  }
  loadTilawa(tilawat[tilawatIdx]);

  playTilawa();
});
