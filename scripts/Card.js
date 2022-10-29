const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__image-caption');
const popupImageCloseButton = popupOpenImage.querySelector('.popup__close-button');

export class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._img = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardElement;
  }

  _closeWithEsc = (evt) => {
    if (evt.key === 'Escape') {
      this._handleClosePopup();
    }
  }

  _handleOpenPopup() {
    popupImage.src = this._img;
    popupImage.alt = this._title;
    popupImageCaption.textContent = this._title;
    popupOpenImage.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeWithEsc);
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupImage.alt = '';
    popupImageCaption.textContent = '';
    popupOpenImage.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeWithEsc);
  }

  _like(evt) {
    evt.currentTarget.classList.toggle('card__like_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    popupImageCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
    this._element.querySelector('.card__like').addEventListener('click', this._like);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._img;
    this._element.querySelector('.card__image').alt = this._img;
    this._element.querySelector('.card__title').textContent = this._title;
    return this._element;
  }
}
