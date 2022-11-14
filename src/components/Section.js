export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems(renderedItems) {
    renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
