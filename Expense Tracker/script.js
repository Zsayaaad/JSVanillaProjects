const balance = document.getElementById('balance');
const incomeMoney = document.getElementById('money-plus');
const expenseMoney = document.getElementById('money-minus');
// const deleteBtn = document.getElementById('.delete-btn');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addTransactionBtn = document.querySelector('.btn');

//Just for the initial design
// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

const loacalStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

// To avoid crashes when the storage is empty: using ternary op
let transactions =
  localStorage.getItem('transactions') !== null
    ? loacalStorageTransactions
    : [];

// To update DOM when add transactions or removing it
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(event) {
  event.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a text and amount!');
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 1000000),
      text: text.value,
      amount: +amount.value,
    };
    // console.log(transaction);
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Add trans to DOM
function addTransactionToDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on sign
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
  `;

  list.append(item);
  console.log(transaction.id);

  /**That deosn't wrok cuz deleteBtn initialized in the above and JS will get into addTransactionToDOM() first before see the variable above */
  // deleteBtn.addEventListener('click', () => {
  //   transactions = transactions.filter((trans) => trans.id !== transaction.id);
  //   init();
  // });

  // Add event listener to delete button
  /**I created deleteBtn here cuz it isn't yet initialized when the addTransactionToDOM() function is called
   * And I didn't take it from above.
   */
  const deleteBtn = item.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    transactions = transactions.filter((trans) => trans.id !== transaction.id);

    updateLocalStorage();

    init();
  });
}

// Update Balance & income-expense
function updateValues() {
  const amount = transactions.map((transaction) => {
    return transaction.amount;
  });
  // console.log(amount); amount is a string so must convert it when using it.

  //Get Balance
  const total = amount
    .reduce((preValue, currValue) => preValue + currValue, 0)
    .toFixed(2);
  balance.innerHTML = `$${total}`;

  //Get Income
  const income = amount
    .filter((item) => item > 0)
    .reduce((preValue, currValue) => preValue + currValue, 0)
    .toFixed(2);
  incomeMoney.innerHTML = `$${income}`;

  //Get Expense
  const expense = (
    amount
      .filter((item) => item < 0)
      .reduce((preValue, currValue) => preValue + currValue, 0) * -1
  ).toFixed(2);
  expenseMoney.innerHTML = `$${expense}`;
}

// Init App
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

addTransactionBtn.addEventListener('click', addTransaction);
