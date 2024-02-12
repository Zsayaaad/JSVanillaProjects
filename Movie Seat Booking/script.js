const selectMovie = document.getElementById('movie');

/**used in select the event of click on each element in contaner */
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');

saveDataInUI();

let ticketPrice = +selectMovie.value; // get a number(Price)

//Update count & total
function updateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //get the index and save it in local storage.
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  //Get the index of selected seat when the event happen.
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get the index and price of movie when the event happen.
function getMovieData(indexOfMovie, priceOfMove) {
  localStorage.setItem('selectedMovieIndex', indexOfMovie);
  localStorage.setItem('selectedMoviePrice', priceOfMove);
}

//Get data from local storage and save it in UI
function saveDataInUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, idx) => {
      //To select only the seats with idx > -1 Cuz unselected takes idx = -1
      if (selectedSeats.indexOf(idx) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); // 0|1|2|3
  console.log(selectedMovieIndex);
  if (selectedSeats !== null) {
    //put in the index of selected movie
    selectMovie.selectedIndex = selectedMovieIndex;
  }
}

//Change the price by choosing the movie
selectMovie.addEventListener('change', (event) => {
  ticketPrice = event.target.value;

  getMovieData(event.target.selectedIndex, event.target.value);

  updateSelectedSeats();
});

//Seat event
/**I can loop on seats itself with forEach but with container is more convenient*/
container.addEventListener('click', (event) => {
  // console.log(event.target); // seat || seat occupied || screen || container

  // Targeting the free seats only.
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    /**We want toggle because wanna be able to unselect it also. */
    event.target.classList.toggle('selected');

    updateSelectedSeats();
  }
});

//To prevent 0 on count&total when the page Reloaded.
updateSelectedSeats();
