export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._img = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _like() {
    this.classList.toggle('card__like_active');
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image.addEventListener('click', this.handleCardClick);
    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
    this._cardLikeButton.addEventListener('click', this._like);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardLikeButton = this._element.querySelector('.card__like');
    this._image = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._image.src = this._img;
    this._image.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    return this._element;
  }
}
