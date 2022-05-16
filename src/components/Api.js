export default class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._token = this._options.token;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((err) => console.log(err));
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((err) => console.log(err));
  }

  editUser(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.userName,
        about: userData.userJob,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((err) => console.log(err));
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((err) => console.log(err, `\nCardID: ${cardID}`));
  }
}
