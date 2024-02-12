const search = document.getElementById('search'),
  submit = document.getElementById('submit'), // Search And Fetch
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meals & Fetch API
function searchMeals(ev) {
  single_mealEl.innerHTML = '';
  ev.preventDefault(); // Cuz we don't want acually to submit to a file.

  // Get search term(The thing that I search for)
  const term = search.value;

  // Check for empty term
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        resultHeading.innerHTML = `<h3>Search result for '${term}'</h3>`;
        if (json.meals === null) {
          resultHeading.innerHTML = `<p>There are no search result! Try again.</p>`;
        } else {
          mealsEl.innerHTML = json.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`
            )
            .join('');
        }
      });
    search.value = '';
  } else {
    alert('Please Enter A Search Value!');
  }
}

// take mealID and fetch it
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((respone) => respone.json())
    .then((json) => {
      // console.log(json); // Get an array.

      //Get the value of API array
      const meal = json.meals[0];

      addToDOM(meal);
    });
}

function addToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="meal.strMeal" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
    </div>

    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  `;
}

function getRandomMeal() {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((respone) => respone.json())
    .then((json) => {
      const meal = json.meals[0];
      addToDOM(meal);
    });
}

//Event Listners
submit.addEventListener('submit', searchMeals);

mealsEl.addEventListener('click', (e) => {
  // Know if the meal-info belongs to my click
  const mealInfo = e.composedPath().find((item) => {
    // console.log(item);
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  // console.log(mealInfo);
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    // console.log(mealID); //IDNum=> 52935...
    getMealByID(mealID);
  }
});

random.addEventListener('click', getRandomMeal);
