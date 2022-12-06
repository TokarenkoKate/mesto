export default class UserInfo {
  constructor({ profileName, profileInfo, profileAvatar, spinner}) {
    this._profileName = profileName;
    this._profileInfo = profileInfo;
    this._profileAvatar = profileAvatar;
    this._spinner = spinner;
  }

  getUserInfo() {
    return { name: this._profileName.textContent, about: this._profileInfo.textContent };
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileInfo.textContent = userData.about;
    this._profileAvatar.src = userData.avatar;
  }

  setUserAvatar(userAvatar) {
    this._profileAvatar.src = userAvatar.avatar;
  }

  setPageOwnerId(id) {
    this._pageOwnerid = id;
  }

  getPageOwnerId() {
    return this._pageOwnerid;
  }

  renderImageLoading(isLoading) {
    if (isLoading) {
      this._spinner.classList.add('spinner_visible');
      this._profileAvatar.classList.remove('profile__image_visible');
    } else {
      this._spinner.classList.remove('spinner_visible');
      this._profileAvatar.classList.add('profile__image_visible');
    }
  }
}
