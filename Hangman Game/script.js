const wordEl = document.getElementById('word'); // الكلمة بالحروف
const wrongLettersEl = document.getElementById('wrong-letters'); // الحروف الغلط
const playAgainBtn = document.getElementById('play-button'); // play again
const popup = document.getElementById('popup-container'); // كلووو
const notification = document.getElementById('notification-container'); //YouHaveAlreadyEnteredIt
const finalMessage = document.getElementById('final-message'); //خسرت أو فزت
const hangmanPieces = document.querySelectorAll('.figure-part');
// const finalMessageRevealWord = document.getElementById(
//   'final-message-reveal-word'
// );

const words = ['application', 'interface', 'programming', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function showLetters() {
  // let wordHTML = '';
  // for (const letter of selectedWord) {
  //   if (correctLetters.includes(letter)) {
  //     wordHTML += `<span class="letter">${letter}</span>`;
  //   } else {
  //     wordHTML += '<span class="letter"></span>';
  //   }
  // }
  // wordEl.innerHTML = wordHTML;
  /**  Another Method Using split&join Methods */
  wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>`
        )
        .join('')}
    `;

  // Remove any new line character
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  // console.log(innerWord);

  //Check if innerWord = selectedWord
  if (innerWord === selectedWord) {
    finalMessage.innerHTML = `Congratulations! You Won 🤯`;
    popup.style.display = 'flex';
  }
}

//Update Wrong Letters And Hangman
function showWrongLetterAndFigure() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display Figure Pieces
  hangmanPieces.forEach((piece, idx) => {
    // Looping throw each piece of hangmanPieces
    const errors = wrongLetters.length; // how many wrong letters are there.

    if (idx < errors) {
      piece.style.display = 'block';
    } else {
      piece.style.display = 'none';
    }
  });

  // Check Lost
  if (wrongLetters.length === hangmanPieces.length) {
    finalMessage.innerHTML = `Unfortunately You Lost! 🫠`;
    popup.style.display = 'flex';
  }
}

// Show Notification
function showNotificationMesssage() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// ADD LETTER BY PRESSING THE KEYBOARD (The keydown event is fired when a key is pressed.)
window.addEventListener('keydown', (ev) => {
  if (ev.keyCode >= 65 && ev.keyCode <= 90) {
    let letter = ev.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        showLetters();
      } else {
        showNotificationMesssage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        showWrongLetterAndFigure();
      } else {
        showNotificationMesssage();
      }
    }
  }
});

playAgainBtn.addEventListener('click', (ev) => {
  // Clear Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  popup.style.display = 'none';

  showLetters();
  showWrongLetterAndFigure();
});

// To show the letter underline int first time
showLetters();
