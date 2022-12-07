export default class Card {
  constructor(data, cardTemplateSelector, creatorId, handleImageClick, handleAddLike, handleRemoveLike, handleDeleteCard) {
    this._name = data.name;
    this._img = data.link;
    this._currentCardId = data._id;
    this._cardCreatorId = data.owner._id;
    this._likes = data.likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._pageOwnerId = creatorId;
    this.handleImageClick = handleImageClick;
    this.handleAddLike = handleAddLike;
    this.handleRemoveLike = handleRemoveLike;
    this.handleDeleteCard = handleDeleteCard;
    this._isLiked = false;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _like = () => {
    if (this._isLiked) {
      this.handleRemoveLike(this._currentCardId, this._likesCount, () => this._isLiked = false, () => this._toggleButtonClass(false));
    } else {
      this.handleAddLike(this._currentCardId, this._likesCount, () => this._isLiked = true, () => this._toggleButtonClass(true));
    }
  }

  _checkLike() {
    if (this._likes.length) {
      this._likes.some(like => {
        if (like._id === this._pageOwnerId) {
          return this._isLiked = true;
        }
      });
    }
  }

  _toggleButtonClass(isLiked) {
    if (isLiked) {
      this._cardLikeButton.classList.add('card__like_active');
    } else {
      this._cardLikeButton.classList.remove('card__like_active');
    }
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _removeBin() {
    if (this._cardCreatorId !== this._pageOwnerId) {
      this._bin.remove();
      this._bin = null;
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', this.handleImageClick);
    if (this._bin) {
      this._bin.addEventListener('click', () => {
        this.handleDeleteCard(this._currentCardId, this.deleteCard);
        }
      );
    }
    this._cardLikeButton.addEventListener('click', this._like);
  }

  _setCardContent() {
    this._image.src = this._img;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likesCount.textContent = this._likes.length;
    this._removeBin();
    this._checkLike();
    this._toggleButtonClass(this._isLiked);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._title = this._element.querySelector('.card__title');
    this._likesCount = this._element.querySelector('.card__like-count');
    this._bin = this._element.querySelector('.card__delete');
    this._cardLikeButton = this._element.querySelector('.card__like');

    this._setCardContent();
    this._setEventListeners();

    return this._element;
  }
}
