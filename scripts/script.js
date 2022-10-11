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
  cardElements.forEach(function (cardElement) {
    let newCard = createCard(cardElement);
    cardsContainer.append(newCard);
  });
}

function createCard(cardDetails) {
  const cardTemplate = document.querySelector('#card').content;
  const createdCard = cardTemplate.cloneNode(true);

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
    closeWithOverlay(popupOpenImage);
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

function submitFormHandler(evt) {
  evt.preventDefault();
  if (!evt.target.querySelector('.form__submit-button_disabled')) {
    if (evt.target === formEditProfile) {
      fillProfileFromInput();
    }
    if (evt.target === formAddCard) {
      addNewCard(placeNameInput, linkInput);
      formAddCard.reset();
    }
    closePopup(evt.target.closest('.popup'));
  }
}

function fillProfileFromInput() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
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

function closeWithOverlay(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget && evt.button === 0) {
      closePopup(evt.currentTarget);
    }
  });
}

function keyHandler(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

showInitialCards(initialCards);
profileEditButton.addEventListener('click', () => {
  fillPopupData();
  openPopup(popupEdit);
  closeWithOverlay(popupEdit);
});
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  closeWithOverlay(popupAddCard);
});
popUpCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const closingPopup = button.closest('.popup');
    closePopup(closingPopup);
    closingPopup.removeEventListener('click', closeWithOverlay(closingPopup));
  });
});
formEditProfile.addEventListener('submit', submitFormHandler);
formAddCard.addEventListener('submit', submitFormHandler);
document.addEventListener('keydown', keyHandler);
