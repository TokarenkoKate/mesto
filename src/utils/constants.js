import altaiPhoto from '../images/Altai.jpg';
import baikalPhoto from '../images/Baikal.jpg';
import kamchatkaPhoto from '../images/Kamchatka.jpg';
import krasnoyarskiKraiPhoto from '../images/Krasnoyarski_krai.jpg';
import olkhonPhoto from '../images/Olkhon.jpg';
import sudakPhoto from '../images/Sudak.jpg';

export const initialCards = [
  {
    name: 'Алтай',
    link: altaiPhoto
  },
  {
    name: 'Байкал',
    link: baikalPhoto
  },
  {
    name: 'Камчатка',
    link: kamchatkaPhoto
  },
  {
    name: 'Красноярский край',
    link: krasnoyarskiKraiPhoto
  },
  {
    name: 'Ольхон',
    link: olkhonPhoto
  },
  {
    name: 'Судак',
    link: sudakPhoto
  },
];

export const validationDetails = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__input-error_active'
};

export const cardsContainerSelector = '.cards';
export const cardSelector = '#card';
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const profileAddButton = document.querySelector('.profile__add-btn');
export const formAddCard = document.querySelector('.form_type_add-card');
export const formEditProfile = document.querySelector('.form_type_edit-profile');
export const nameInput = formEditProfile.querySelector('.form__input_type_name');
export const jobInput = formEditProfile.querySelector('.form__input_type_job');
export const popupImageSelector = '.popup_type_open-image';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupEditSelector = '.popup_type_edit-profile';
export const profileNameSelector = '.profile__author';
export const profileInfoSelector = '.profile__job';
