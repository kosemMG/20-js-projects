'use strict';

const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const password2Input = document.getElementById('password2');

const inputsValidators = {
  username: [required, length(3, 12)],
  email: [required, email],
  password: [required, length(6, 20)],
  password2: [required, password2]
};

// Validate.
function validate(inputsArr, validators) {
  if (inputsArr && inputsArr.length > 0) {
    inputsArr.forEach(input => {
      let isInvalid;
      for (const validator of validators[input.id]) {
        isInvalid = validator(input);
        if (isInvalid) {
          break;
        }
      }
      const result = isInvalid ? 'error' : 'success';
      showResult(input, result, isInvalid);
    });
  }
}

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
function email(emailInput) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(emailInput.value.trim().toLowerCase())) {
    return 'Invalid email';
  }
  return null;
}

// Check required.
function required(input) {
  if (input.value.trim() === '') {
    return '* Required';
  }
  return null;
}

// Check length.
function length(min, max) {
  return function(input) {
    const inputLength = input.value.length;
    if (inputLength < min || inputLength > max) {
      return `Must be between ${min} to ${max} characters.`;
    }
    return null;
  };
}

// Check passwords match.
function password2(input) {
  if (input.value === '' || input.value !== passwordInput.value) {
    return 'Passwords do not match';
  }
  return null;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  validate([usernameInput, emailInput, passwordInput, password2Input], inputsValidators);
});
