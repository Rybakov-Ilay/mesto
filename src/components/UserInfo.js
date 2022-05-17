export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._avatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };
  }

  getUserAvatar() {
    return this._avatar.src
  }

  setUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
    this._id = _id
  }

  getUserID() {
    return this._id
  }
}
