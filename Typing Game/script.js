const settingBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const form = document.getElementById('settings-form');
const difficultySelection = document.getElementById('difficulty');
const inputText = document.getElementById('text');
const timeLeft = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endGame = document.getElementById('end-game-container');
const word = document.getElementById('word');

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Select a vlaue in our difficultySelection
difficultySelection.value = difficulty;

// console.log(difficultySelection.value);

const arrOfWords = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

function getRandomWord() {
  return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
}

function addToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function hardLuck() {
  endGame.innerHTML = `
  <h1>Time ran out⌛</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endGame.style.display = 'flex';
}

addToDOM();

const timeInterval = setInterval(() => {
  time--;

  timeLeft.innerText = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);

    //Should End The Game Now
    hardLuck();
  }
}, 1000);

//Event Listners

inputText.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addToDOM();

    // Wanna inc the score when type the right word..
    updateScore();

    e.target.value = '';

    // Wanna inc the time here when type the right word based on difficulty..
    if (difficulty === 'easy') {
      time += 5;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 2;
    }
  }
});

form.addEventListener('change', (e) => {
  difficulty = e.target.value;

  localStorage.setItem('difficulty', difficulty);
  location.reload();
});

settingBtn.addEventListener('click', () => settings.classList.toggle('hide'));
