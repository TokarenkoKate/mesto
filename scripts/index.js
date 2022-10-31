import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { validationDetails } from './validationDetails.js';

const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__image-caption');
const cardsContainer = document.querySelector('.cards');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__author');
const profileJob = profile.querySelector('.profile__job');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEdit.querySelector('.form_type_edit-profile');
const nameInput = popupEdit.querySelector('.form__input_type_name');
const jobInput = popupEdit.querySelector('.form__input_type_job');
const profileAddButton = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form_type_add-card');
const placeNameInput = popupAddCard.querySelector('.form__input_type_place-name');
const linkInput = popupAddCard.querySelector('.form__input_type_link');
const popUpCloseButtons = document.querySelectorAll('.popup__close-button');
const formAddValidation = new FormValidator(validationDetails, formAddCard);
const formEditValidation = new FormValidator(validationDetails, formEditProfile);

const createNewCard = (params, templateSelector) => {
  const card = new Card(params, templateSelector);
  return card.generateCard();
}

const showInitialCards = () => {
  initialCards.forEach(initialCard => {
    const cardElement = createNewCard(initialCard, '#card')
    cardsContainer.append(cardElement);
  });
}

function submitEditForm(evt) {
  fillProfileFromInput();
  closePopup(evt.target.closest('.popup'));
}

function fillProfileFromInput() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitAddForm(evt) {
  const cardElement = createNewCard(({name: placeNameInput.value, link: linkInput.value}), '#card');
  cardsContainer.prepend(cardElement);
  closePopup(evt.target.closest('.popup'));
  formAddCard.reset();
  formAddValidation.disableSubmitButton();
}

function fillPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

function closeWithOverlay() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget && evt.button === 0) {
        closePopup(evt.currentTarget);
      }
    });
  });
}

function closeWithEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

showInitialCards();
profileEditButton.addEventListener('click', () => {
  fillPopupData();
  openPopup(popupEdit);
});
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});
popUpCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});
closeWithOverlay();
formEditProfile.addEventListener('submit', submitEditForm);
formAddCard.addEventListener('submit', submitAddForm);
formAddValidation.enableValidation();
formEditValidation.enableValidation();
export { popupOpenImage, popupImage, popupImageCaption, openPopup, closePopup};
