import {
  popupView,
  popupViewImage,
  popupViewImageCaption,
  popupOpen,
} from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
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
  }

  _viewCard() {
    popupViewImage.src = this._link;
    popupViewImageCaption.textContent = this._name;
    popupOpen(popupView);
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

//
// let cardNew = new Card(initialCards[0], ".cards_template");
// let cardNew0 = new Card(initialCards[0], ".cards_template");
// const cardNew1 = new Card(initialCards[1], ".cards_template");
// console.log(cardNew);
// console.log(cardNew.generateCard());
//
// let a = cardNew
// let b = cardNew0
//
// console.log(a.generateCard());
// console.log(b.generateCard());
// console.log( a===b)
// cardsList.prepend(a.generateCard());
// cardsList.prepend(b.generateCard());
// cardsList.prepend(cardNew1.generateCard());
