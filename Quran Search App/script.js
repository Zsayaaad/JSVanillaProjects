const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// GET Search - Search the text of the Quran
async function fetchData(searchInput) {
  const response = await fetch(
    `http://api.alquran.cloud/v1/search/${searchInput}/all/en`
  );
  const jsonData = await response.json();
  console.log(jsonData);
  showData(jsonData);
}

// Show Surah Or Verse In DOM
function showData(data) {
  result.innerHTML = `
  <ul class="surahs">
    ${data.data.matches
      .map(
        (surah) =>
          // {number: 3706, text: 'YaSeen.', edition: {…}, surah: {…}, numberInSurah: 1}
          // console.log(surah);
          `<li>
          <span><strong>${surah.surah.name}</strong> - ${surah.surah.englishName}</span>
        
          <!-- To Know Which Btn We Pressed-->
          <button class="btn" surah-name="${surah.surah.name}" english-name="${surah.surah.englishName}"
          >Show Verse</button>
        </li>`
      )
      .join('')}
  </ul>`;
}

async function getVerse(surahName, englishName) {
  // I can fetch here with surah number
  const response = await fetch(
    `http://api.alquran.cloud/v1/search/${surahName}`
  );
  const jsonData = await response.json();

  console.log(jsonData);

  // <h2><strong>${surahName}</strong> - ${englishName}</h2>
  // <span>${}</span>
  //   result.innerHTML = ``
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchInput = search.value.trim();
  // console.log(searchInput);
  if (!searchInput) {
    alert('Please type in a search term !!');
  } else {
    fetchData(searchInput);
  }
});

result.addEventListener('click', (e) => {
  const clickedEl = e.target;
  console.log(clickedEl);
  if (clickedEl.tagName === 'BUTTON') {
    const surahName = clickedEl.getAttribute('surah-name');
    const englishName = clickedEl.getAttribute('english-name');
    // console.log(surahObj);
    getVerse(surahName, englishName);
  }
});
