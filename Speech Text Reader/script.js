const toggleTextBox = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const voicesEl = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.querySelector('main');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

let voices = [];

function populateVoiceList() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name; // To find out which sounds selected

    option.innerHTML = `${voice.name} ${voice.lang}`;

    voicesEl.appendChild(option);
  });
}

data.forEach((item) => {
  const box = document.createElement('div');
  box.className = 'box';

  // destructuring assignment
  const { image, text } = item;
  box.innerHTML = `
  <img src="${image}" alt="${text}" />
  <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    //Add active effect to the box
    box.classList.add('active');
    setInterval(() => box.classList.remove('active'), 1000);
  });

  main.append(box);
});

// Speech Synth
const message = new SpeechSynthesisUtterance();

//Set the text of the utterance.
function setTextMessage(text) {
  message.text = text;
}

//Speak the utterance.
function speakText() {
  speechSynthesis.speak(message);
}

//Toggle text box
toggleTextBox.addEventListener('click', () => textBox.classList.toggle('show'));

//Close button
closeBtn.addEventListener('click', () => textBox.classList.remove('show'));

// Implement the voices selection feature
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);

// Voices changed
voicesEl.addEventListener('change', (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
});

// Custom Text Box
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});
