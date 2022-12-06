import Popup from '../components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitButtonSelector, handleFormSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector(submitButtonSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues(), () => this.renderLoading(true), () => this.close());
    });
  }

  close() {
    super.close();
    this.renderLoading(false);
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...'
    } else {
      this._button.textContent = 'Сохранить';
    }
  }
}


