const toggleBtn = document.getElementById('toggle');
const signUpBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');
const submitBtn = document.querySelector('.submit-btn');

// Toggle nav
function ShowNavbar() {
  document.body.classList.toggle('show-navbar');
}

// Show Modal
function showSignUp() {
  modal.classList.add('show-modal');
}

// Close Modal
function exitModal() {
  modal.classList.remove('show-modal');
}

// Hide Modal by clicking outside of it
function hideModal(event) {
  return event.target === modal ? modal.classList.remove('show-modal') : false;
}

//Event Listeners
toggleBtn.addEventListener('click', ShowNavbar);

signUpBtn.addEventListener('click', showSignUp);

closeBtn.addEventListener('click', exitModal);

window.addEventListener('click', hideModal);

submitBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
