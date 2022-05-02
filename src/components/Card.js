export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._card.closest(".card").remove();
    this._card = null;
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

    this._card.querySelector(".card__caption-title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._card;
  }
}
