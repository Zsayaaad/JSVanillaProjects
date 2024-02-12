const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(userInput, message) {
  const formCtrl = userInput.parentElement;
  formCtrl.className = 'form-control error input';
  const small = formCtrl.querySelector('small');
  small.innerText = message;
}

//Show success ouline
function showSuccess(userInput) {
  const formCtrl = userInput.parentElement;
  formCtrl.className = 'form-control success input';
}

//Check Email
function checkEmail(emailInput) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(emailInput.value)) {
    showSuccess(emailInput);
  } else if (emailInput.value.trim() === '') {
    showError(emailInput, `${inputHandler(emailInput)} is required!`);
  } else {
    showError(emailInput, `Email is not valid!`);
  }
}

//Check Fields
function checkRequired(checkInput) {
  checkInput.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${inputHandler(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}

//Handel the name of each input
function inputHandler(input) {
  return input.id.toUpperCase()[0] + input.id.slice(1);
}

//Check on length of inputs
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${inputHandler(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${inputHandler(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match!');
  }
}

//Adding an eventListner when we submit the form
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // if (username.value === '') {
  //   showError(username, 'Username is required!');
  // } else {
  //   showSuccess(username);
  // }

  // if (email.value === '') {
  //   showError(email, 'Email is required!');
  // } else if (!validateEmail(email.value)) {
  //   showError(email, 'Email is not valid!');
  // } else {
  //   showSuccess(email);
  // }

  // if (password.value === '') {
  //   showError(password, 'Password is required!');
  // } else {
  //   showSuccess(password);
  // }

  // if (password2.value === '') {
  //   showError(password2, 'Password 2 is required!');
  // } else {
  //   showSuccess(password2);
  // }

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
