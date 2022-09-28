'use strict'

const cardsContainer = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Алтай',
    link: './images/Altai.jpg'
  },
  {
    name: 'Байкал',
    link: './images/Baikal.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/Kamchatka.jpg'
  },
  {
    name: 'Красноярский край',
    link: './images/Krasnoyarski_krai.jpg'
  },
  {
    name: 'Ольхон',
    link: './images/Olkhon.jpg'
  },
  {
    name: 'Судак',
    link: './images/Sudak.jpg'
  },
];
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
  cardLikeButton.addEventListener('click', function () {
    this.classList.toggle('card__like_active');
  });

  const cardDeleteButton = card.querySelector('.card__delete');
  cardDeleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });

  card.querySelector('.card__image').addEventListener('click', function () {
    popupImageCaption.textContent = this.getAttribute('alt');
    popupImage.setAttribute('src', this.getAttribute('src'));
    popupImage.setAttribute('alt', this.getAttribute('alt'));
    popupOpenImage.classList.add('popup_opened');
  });
  return card;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (evt.target === formEditProfile) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }
  if (evt.target === formAddCard) {
    addNewCard(placeNameInput, linkInput);
    placeNameInput.value = '';
    linkInput.value = ''; 
  }
  closePopup(evt);
}

function addNewCard(name, link) {
  const addedCard = {
    name: name.value,
    link: link.value
  };
  cardsContainer.prepend(createCard(addedCard));
}

function openPopup(evt) {
  if (evt.target === profileEditButton) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupEdit.classList.add('popup_opened');
  }
  if (evt.target === profileAddButton) {
    popupAddCard.classList.add('popup_opened');
  }
}

function closePopup(evt) {
  if (evt.target.closest('.popup_type_open-image')) {
    popupImage.setAttribute('src','');
    popupImage.setAttribute('alt','');
    popupImageCaption.textContent = '';
  }
  evt.target.closest('.popup').classList.remove('popup_opened');
}

showInitialCards(initialCards);
profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click', openPopup);
popUpCloseButtons.forEach((button) => button.addEventListener('click', closePopup));
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', formSubmitHandler);
