import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this.submit = this._popup.querySelector(".popup__submit");
  }

  open(card, cardID) {
    super.open();
    this._card = card;
    this._cardID = cardID;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card, this._cardID);
    });
  }

  renderLoading(isLoading = true, buttonText = "Да") {
    isLoading
      ? (this.submit.textContent = "Удаление...")
      : (this.submit.textContent = buttonText);
  }
}
