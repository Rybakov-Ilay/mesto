import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";

import { initialCards, config } from "../utils/constants.js";
import {
  popupViewImage,
  popupViewImageCaption,
  popupView,
  popupOpen,
  popupClose,
} from "../utils/popup.js";

import PopupWithImage from "./PopupWithImage.js";

const content = document.querySelector(".content");
const popupEdit = document.querySelector(".popup_edit");
const forms = document.forms;
const profileEditForm = forms.profileEditingForm;
const profileSubmit = profileEditForm.querySelector(".popup__submit");
const popupEditUserName = profileEditForm.elements.userName;
const popupEditUserJob = profileEditForm.elements.userJob;
const profileButtonEdit = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = forms.addCardForm;
const popupAddFormSubmit = popupAddForm.querySelector(".popup__submit");
const cardName = popupAddForm.placeName;
const cardLink = popupAddForm.placeLink;
const popupsList = Array.from(document.querySelectorAll(".popup"));

const CARD_TEMPLATE_SELECTOR = ".cards_template";
const CARD_LIST_SELECTOR = ".cards__list";

const profileValidator = new FormValidator(
  config,
  forms.profileEditingForm,
  profileSubmit
);
const cardValidator = new FormValidator(
  config,
  forms.addCardForm,
  popupAddFormSubmit
);

// Подключаем валидацию для формы профиля и формы добавления карточки
profileValidator.enableValidation();
cardValidator.enableValidation();

// Создаем объект содержащий секцию с карточками
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, CARD_TEMPLATE_SELECTOR);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  CARD_LIST_SELECTOR
);
// Отрисовываем список карточек
cardList.renderItems();

function popupEditOpen() {
  profileValidator.resetValidation();
  popupEditUserName.value = profileUserName.textContent;
  popupEditUserJob.value = profileUserJob.textContent;
  popupOpen(popupEdit);
}

function popupAddOpen() {
  popupAddForm.reset();
  cardValidator.resetValidation();
  popupOpen(popupAdd);
}

function handlingPopupEditForm(event) {
  event.preventDefault();
  profileUserName.textContent = popupEditUserName.value;
  profileUserJob.textContent = popupEditUserJob.value;
  profileValidator.disableSubmit();
  popupClose(popupEdit);
}

function handlingPopupAddForm(event) {
  event.preventDefault();
  const cardAttribute = { name: cardName.value, link: cardLink.value };
  const card = new Card(cardAttribute, CARD_TEMPLATE_SELECTOR);
  cardList.addItem(card.generateCard());
  cardValidator.disableSubmit();
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

// На все popup вешаем условие при котором их можно закрыть
// и нажатием на крестик и вне модального окна
popupsList.forEach(setEventListenerOnCloseAndOverlay);

// Вешаем обработчики событий на кнопки открытия форм и их сабмиты
profileButtonEdit.addEventListener("click", popupEditOpen);
popupAddCardButton.addEventListener("click", popupAddOpen);
profileEditForm.addEventListener("submit", handlingPopupEditForm);
popupAddForm.addEventListener("submit", handlingPopupAddForm);

export { popupView, popupViewImage, popupViewImageCaption, popupOpen };


