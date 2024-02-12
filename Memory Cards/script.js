const clearBtn = document.getElementById('clear');
const showBtn = document.getElementById('show');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentPage = document.getElementById('current');
const addContainer = document.getElementById('add-container');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');

const cardsEl = []; // To iterate on each card
let currentActiveCard = 0;

// Store data in card
const cardsData = getCards();
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// Get cards from LocalStroage
function getCards() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add Card To Local Storage
function setCards(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload(); // To show the the initial page when add card.
}

//Iterate on cardssss
function createCards() {
  cardsData.forEach((data, idx) => createCard(data, idx));
}

// Create one card
function createCard(data, idx) {
  const card = document.createElement('div');
  card.className = 'card';

  if (idx === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.ques}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.ans}</p>
      </div>
    </div>`;

  cardsContainer.append(card);

  cardsEl.push(card); // To iterate on each card

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // With each creat card, gonna run number of page function
  UpdateNumberOfPage();
}

function UpdateNumberOfPage() {
  currentPage.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();

nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard++;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  UpdateNumberOfPage();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card';
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  UpdateNumberOfPage();
});

//Show Container That Add A New Card
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
//Hide Container That Add A New Card
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// For Add A New Card
addCardBtn.addEventListener('click', () => {
  const ques = questionEl.value;
  const ans = answerEl.value;

  // console.log(ques, ans);

  if (ques.trim() && ans.trim()) {
    const cardData = { ques, ans };

    createCard(cardData);
    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');

    // Add To Local Storage
    cardsData.push(cardData);
    setCards(cardsData);
  }
});

clearBtn.addEventListener('click', () => {
  setCards(null);

  /** Another Sol, to clear local storage  */
  // localStorage.clear();
  // window.location.reload();
});
