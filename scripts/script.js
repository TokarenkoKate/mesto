'use strict'

const cardsContainer = document.querySelector('.cards');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__author');
const profileJob = profile.querySelector('.profile__job');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEdit.querySelector('.form_type_edit-profile');
const nameInput = popupEdit.querySelector('.form__input_type_name');
const jobInput = popupEdit.querySelector('.form__input_type_job');
const popUpCloseButtons = document.querySelectorAll('.popup__close-button');
const profileAddButton = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form_type_add-card');
const placeNameInput = popupAddCard.querySelector('.form__input_type_place-name');
const linkInput = popupAddCard.querySelector('.form__input_type_link');
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImageCaption = popupOpenImage.querySelector('.popup__image-caption');
const popupImage = popupOpenImage.querySelector('.popup__image');

function showInitialCards(cardElements) {
  cardElements.forEach((cardElement) => {
    const newCard = createCard(cardElement);
    cardsContainer.append(newCard);
  });
}

function createCard(cardDetails) {
  const cardTemplate = document.querySelector('#card').content;
  const createdCard = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = createdCard.querySelector('.card__image');
  cardImage.setAttribute('src', cardDetails.link);
  cardImage.setAttribute('alt', cardDetails.name);
  createdCard.querySelector('.card__title').textContent = cardDetails.name;
  setListeners(createdCard);
  return createdCard;
}

function setListeners(card) {
  const cardLikeButton = card.querySelector('.card__like');
  cardLikeButton.addEventListener('click', toggleActiveClass);

  const cardDeleteButton = card.querySelector('.card__delete');
  cardDeleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', function () {
    fillImagePopup(cardImage);
    openPopup(popupOpenImage);
    setKeyHandler();
  });
  return card;
}

function toggleActiveClass() {
  this.classList.toggle('card__like_active');
}

function fillImagePopup(image) {
  popupImageCaption.textContent = image.getAttribute('alt');
  popupImage.setAttribute('src', image.getAttribute('src'));
  popupImage.setAttribute('alt', image.getAttribute('alt'));
}

function submitEditForm(evt) {
  fillProfileFromInput();
  removeKeyHandeler();
  closePopup(evt.target.closest('.popup'));
}

function fillProfileFromInput() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitAddForm(evt) {
  addNewCard(placeNameInput, linkInput);
  formAddCard.reset();
  removeKeyHandeler();
  setDisabledButtonState(evt.currentTarget, validationDetails.submitButtonSelector, validationDetails.inactiveButtonClass);
  closePopup(evt.target.closest('.popup'));
}

function setDisabledButtonState(formElement, submitButtonSelector, inactiveButtonClass) {
  const button = formElement.querySelector(submitButtonSelector);
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function addNewCard(name, link) {
  const addedCard = {
    name: name.value,
    link: link.value
  };
  cardsContainer.prepend(createCard(addedCard));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function fillPopupData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeWithOverlay() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget && evt.button === 0) {
        removeKeyHandeler();
        closePopup(evt.currentTarget);
      }
    });
  });
}

function setKeyHandler() {
  document.addEventListener('keydown', closeWithEsc);
}

function removeKeyHandeler() {
  document.removeEventListener('keydown', closeWithEsc);
}

function closeWithEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    document.removeEventListener('keydown', closeWithEsc);
  }
}

showInitialCards(initialCards);
profileEditButton.addEventListener('click', () => {
  fillPopupData();
  openPopup(popupEdit);
  setKeyHandler();
});
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  setKeyHandler();
});
popUpCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeKeyHandeler();
    closePopup(button.closest('.popup'));
  });
});
formEditProfile.addEventListener('submit', submitEditForm);
formAddCard.addEventListener('submit', submitAddForm);
closeWithOverlay();
