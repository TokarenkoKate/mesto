import Popup from '../components/Popup'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this.name = data.name;
    this.link = data.link;
  }

  open() {
    super.open();
    super.setEventListeners();
    this._popup.querySelector('.popup__image').src = this.link;
    this._popup.querySelector('.popup__image').alt = this.name;
    this._popup.querySelector('.popup__image-caption').textContent = this.name;
  }
}
