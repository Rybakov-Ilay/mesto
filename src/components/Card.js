export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleLikeClick },
    templateSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;

    this._myId = userId;
    this._id = data._id;
    this._owner = data.owner._id;

    this._likesList = data.likes;
    this._likesServerCount = this._likesList.length;
    this._isLiked = this._likesList.some((item) => item._id === this._myId);

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;

    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handelLike() {
    this._handleLikeClick(this._id, this._isLiked, (data) => {
      this._likesCount.textContent = data.likes.length;
      this._like.classList.toggle("card__button-like_active");
      this._isLiked = !this._isLiked;
    });
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

    this._likesCount = this._card.querySelector(".card__like-count");
    this._like = this._card.querySelector(".card__button-like");
    if (this._isLiked) {
      this._like.classList.add("card__button-like_active");
    }

    this._trash = this._card.querySelector(".card__trash");
    if (this._owner !== this._myId) {
      this._trash.remove();
    }

    this._card.querySelector(".card__caption-title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCount.textContent = this._likesServerCount;

    this._setEventListeners();

    return this._card;
  }
}
