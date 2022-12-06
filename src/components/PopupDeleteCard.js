import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitButtonSelector, handleFormSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector(submitButtonSelector);
    this.handleFormSubmit = handleFormSubmit;
  }

  open(cardId, deleteFunction) {
    super.open();
    this._cardId = cardId;
    this.deleteFunction = deleteFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._cardId, this.deleteFunction);
      this.close();
    });
  }
}
