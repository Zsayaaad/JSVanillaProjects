const selectOne = document.getElementById('currency-one');
const selectTwo = document.getElementById('currency-two');
const swapBtn = document.getElementById('swap');
const amountCurrencyOne = document.getElementById('amount-one');
const amountCurrencyTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');

/*Calculate Every thing that selected on the screen
  Fetch exchange rates and update the DOM.
*/
function calculate() {
  const fisrtCurr = selectOne.value;
  const secondCurr = selectTwo.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${fisrtCurr}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      const rate = json.rates[secondCurr];
      rateEl.innerHTML = `1 ${fisrtCurr} = ${rate} ${secondCurr}`;

      amountCurrencyTwo.value = (amountCurrencyOne.value * rate).toFixed(2);
    });
}

// Event Listeners
selectOne.addEventListener('change', calculate);

selectTwo.addEventListener('change', calculate);

amountCurrencyOne.addEventListener('input', calculate);

amountCurrencyTwo.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
  const temp = selectOne.value;
  selectOne.value = selectTwo.value;
  selectTwo.value = temp;
  calculate();
});
