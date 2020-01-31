const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input result.
function showResult(input, result, message = null) {
  if (input && input instanceof HTMLInputElement) {
    const formControl = input.parentElement;
    if (formControl) {
      formControl.className = `form-control ${result}`;
      if (result !== 'success') {
        const errorMessageElement = formControl.querySelector('small');
        if (errorMessageElement) {
          errorMessageElement.textContent = message;
        }
      }
    }
  }
}

// Check email.
function checkEmail(emailInput) {
  let result = 'success';
  let message = null;
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(emailInput.value.trim().toLowerCase())) {
    result = 'error';
    message = 'Email is invalid';
  }
  showResult(emailInput, result, message);
}

// Check required.
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    let result = 'success';
    let message = null;
    if (input.value.trim() === '') {
      result = 'error';
      message = '* Required';
    }
    showResult(input, result, message);
  });
}

// Check length.
function checkLength(input, min, max) {
  const inputLength = input.value.length;
  let result = 'success';
  let message = null;
  if (inputLength < min || inputLength > max) {
    result = 'error';
    message = `Must be between ${min} to ${max} characters.`;
  }
  showResult(input, result, message);
}

// Check passwords match.
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showResult(input2, 'error', 'Passwords do not match.');
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 16);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
