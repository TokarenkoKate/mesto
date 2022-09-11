'use strict'

// Open and close popup functions

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let profileEditButton = profile.querySelector('.profile__edit-btn');
profileEditButton.addEventListener('click', openPopup);

let popupCloseButton = popup.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', closePopup);

// Form submit function

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    let profileName = profile.querySelector('.profile__author');
    let profileJob = profile.querySelector('.profile__job');

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);









