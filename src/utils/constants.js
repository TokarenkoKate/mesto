export const cardsContainerSelector = '.cards';
export const cardTemplateSelector = '#card';

export const profileName = document.querySelector('.profile__author');
export const profileInfo = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__image');
export const profileAvatarWrapper = document.querySelector('.profile__image-wrapper');
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const profileAddButton = document.querySelector('.profile__add-btn');

export const formAddCard = document.querySelector('.form_type_add-card');
export const formEditProfile = document.querySelector('.form_type_edit-profile');
export const formEditAvatar = document.querySelector('.form_type_edit-avatar');
export const submitButtonSelector  = '.form__submit-button';

export const nameInput = formEditProfile.querySelector('.form__input_type_name');
export const jobInput = formEditProfile.querySelector('.form__input_type_job');

export const popupImageSelector = '.popup_type_open-image';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupEditSelector = '.popup_type_edit-profile';
export const popupEditAvatarSelector  = '.popup_type_edit-avatar';
export const popupDeleteCardSelector = '.popup_type_delete-card';
export const spinner = document.querySelector('.spinner');

export const validationDetails = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__input-error_active'
};
