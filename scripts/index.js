import { Card } from "./Card.js";
import { initialCards } from "../utils/constants.js";

const content = document.querySelector(".content");
const popupEdit = document.querySelector(".popup_edit");
const forms = document.forms;
const profileEditingForm = forms.profileEditingForm;
const profileSubmit = profileEditingForm.querySelector(".popup__submit");
const popupEditUserName = profileEditingForm.elements.userName;
const popupEditUserJob = profileEditingForm.elements.userJob;
const profileButtonEdit = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = forms.addCardForm;
const popupAddFormSubmit = popupAddForm.querySelector(".popup__submit");
const cardsList = content.querySelector(".cards__list");
const popupView = document.querySelector(".popup_view-image");
const popupViewImage = popupView.querySelector(".popup__image");
const popupViewImageCaption = popupView.querySelector(".popup__image-caption");
const cardName = popupAddForm.placeName;
const cardLink = popupAddForm.placeLink;
const popupsList = Array.from(document.querySelectorAll(".popup"));
const cardTemplate = document.querySelector(".cards_template").content;
const CARD_SELECTOR_TEMPLATE = ".cards_template";

function handlingPopupCloseByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    popupClose(activePopup);
  }
}

function popupOpen(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlingPopupCloseByEscape);
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlingPopupCloseByEscape);
}

function popupEditOpen() {
  popupEditUserName.value = profileUserName.textContent;
  popupEditUserJob.value = profileUserJob.textContent;
  popupOpen(popupEdit);
}

function handlerButtonDisabled(button) {
  button.classList.add("popup__submit_inactive");
  button.setAttribute("disabled", "");
}

function handlingPopupEditForm(event) {
  event.preventDefault();
  profileUserName.textContent = popupEditUserName.value;
  profileUserJob.textContent = popupEditUserJob.value;
  handlerButtonDisabled(profileSubmit);
  popupClose(popupEdit);
}

function handlingPopupAddForm(event) {
  event.preventDefault();
  const cardAttribute = { name: cardName.value, link: cardLink.value };
  addCard(cardAttribute);
  handlerButtonDisabled(popupAddFormSubmit);
  popupClose(popupAdd);
  popupAddForm.reset();
}

function setEventListenerOnCloseAndOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      popupClose(popup);
    }
  });
}

// Функция создает и возвращает html-разметку новой карточки
// принимая на вход объект с именем и ссылкой на изображение
function createCard(data) {
  return new Card(data, CARD_SELECTOR_TEMPLATE).generateCard();
}

// Функция добавления карточки в разметку (в начало)
function addCard(data) {
  cardsList.prepend(createCard(data));
}
// Инициализация начальных карточек из массива initialCards
initialCards.forEach(addCard);

popupsList.forEach(setEventListenerOnCloseAndOverlay);
profileButtonEdit.addEventListener("click", popupEditOpen);
profileEditingForm.addEventListener("submit", handlingPopupEditForm);
popupAddCardButton.addEventListener("click", () => popupOpen(popupAdd));
popupAddForm.addEventListener("submit", handlingPopupAddForm);

export { popupView, popupViewImage, popupViewImageCaption, popupOpen };
