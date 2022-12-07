import Popup from '../components/Popup'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-caption');
  }

  open(cardDetails) {
    this._image.src = cardDetails.link;
    this._image.alt = cardDetails.name;
    this._caption.textContent = cardDetails.name;
    super.open();
  }
}
