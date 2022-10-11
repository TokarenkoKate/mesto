const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, buttonInactiveClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonInactiveClass);
  } else {
    buttonElement.classList.remove(buttonInactiveClass);
  }
};

const setEventListeners = (form, inputSelector, buttonSelector, buttonInactiveClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(buttonSelector);

  toggleButtonState(inputList, buttonElement, buttonInactiveClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(form, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, buttonInactiveClass);
    });
  });
}

const enableValidation = (args) => {
  const formList = document.querySelectorAll(args.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, args.inputSelector, args.submitButtonSelector, args.inactiveButtonClass, args.inputErrorClass, args.errorClass);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__input-error_active'
});
