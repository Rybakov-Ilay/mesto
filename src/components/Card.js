export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete },
    templateSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    // console.log("id= ", this._id);
    this._owner = data.owner._id;
    this._likes = data.likes.length
    console.log("owner= ", this._owner);
    console.log("MyID= ", userId);
    this._myId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handelLike() {
    this._like.classList.toggle("card__button-like_active");
  }

  _deleteCard() {
    this._handleCardDelete(this._card, this._id);
  }

  _viewCard() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => {
      this._handelLike();
    });
    this._trash.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._viewCard();
    });
  }

  generateCard() {
    this._card = this._getCardTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._like = this._card.querySelector(".card__button-like");
    this._trash = this._card.querySelector(".card__trash");
    this._likesCount = this._card.querySelector(".card__like-count");


    if (this._owner !== this._myId) {
      this._trash.remove();
    }

    this._card.querySelector(".card__caption-title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCount.textContent = this._likes

    this._setEventListeners();

    return this._card;
  }
}
