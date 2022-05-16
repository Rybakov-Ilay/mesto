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

  setUserInfo(userNewName, userNewJob, userAvatar) {
    this._userName.textContent = userNewName;
    this._userJob.textContent = userNewJob;
    this._avatar.src = userAvatar;
    this._avatar.alt = userNewName;
  }
}
