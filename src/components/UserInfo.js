export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return { name: this._nameElement.textContent, info: this._infoElement.textContent };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._infoElement.textContent = userData.info;
  }
}
