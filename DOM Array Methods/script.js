const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

async function getUsers() {
  const response = await fetch('https://randomuser.me/api');
  const json = await response.json();
  // console.log(json);
  const user = json.results[0];

  //get the name of user
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  getData(newUser);
}

// Add users to the array
function getData(object) {
  data.push(object);
  updateDOM();
}

// Update DOM
function updateDOM() {
  //Clear div first
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  //then show the users
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  data.forEach((user) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatter(
      user.money
    )}`;
    main.append(element);
  });
}

//Format Money
const formatter = (number) => {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
};

// Double Money
function doubleMoney() {
  data = data.map((user /*user => name&money*/) => {
    //Copy all in that user obj using spreadOperator and put the doubled value in the money obj
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort Array According To Money
function sortMoneyByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter And Show Only The Millionaires
function filteredMoney() {
  data = data.filter((num) => num.money > 1000000);
  updateDOM();
}

// Calculate Wealth
function calcWealth() {
  const sumWealth = data.reduce(
    (prevVlaue, CurrValue) => prevVlaue + CurrValue.money,
    0
  );
  console.log(formatter(sumWealth));

  const element = document.createElement('div');
  element.classList.add('h3');
  element.innerHTML = `<h3>Total Wealth Is: <strong>${formatter(
    sumWealth
  )}</strong></h3>`;

  main.append(element);
}

// //Event Listeners
addUserBtn.addEventListener('click', getUsers);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoneyByRichest);
showMillionairesBtn.addEventListener('click', filteredMoney);
calculateWealthBtn.addEventListener('click', calcWealth);
