/** @type {HTMLDivElement} */
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

/** @type {HTMLSelectElement} */
const movieSelect = document.getElementById('movie-select');
let ticketPrice = +movieSelect.value;


container.addEventListener('click', event => {
  if (event.target.classList.contains('seat') &&
      !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');
    updateInfo();
    setLocalStorageData();
  }
});

movieSelect.addEventListener('change', () => {
  ticketPrice = +movieSelect.value;
  updateInfo();
  setLocalStorageData();
});

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selected-seats-indexes'));
  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIdx = +localStorage.getItem('selected-movie-index');
  selectedMovieIdx && (movieSelect.selectedIndex = selectedMovieIdx);
  ticketPrice = +localStorage.getItem('selected-movie-price') || +movieSelect.value;
  updateInfo();
}

function updateInfo() {
  count.textContent = getSelectedSeatsCount().toString();
  total.textContent = getSelectedSeatsPrice().toString();
}

function setLocalStorageData() {
  localStorage.setItem('selected-seats-indexes', JSON.stringify(getSelectedSeatsIndexes()));
  localStorage.setItem('selected-movie-index', movieSelect.selectedIndex.toString());
  localStorage.setItem('selected-movie-price', movieSelect.value);
}

const getSelectedSeatsCount = () => document.querySelectorAll('.row .seat.selected').length;
const getSelectedSeatsPrice = () => getSelectedSeatsCount() * ticketPrice;

const getSelectedSeatsIndexes = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  return [...selectedSeats].map(seat => [...seats].indexOf(seat));
};

populateUI();
