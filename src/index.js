import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {
  initialCards,
  config,
  CARD_ADD_FORM_SELECTOR,
  addCardButton,
  CARD_TEMPLATE_SELECTOR,
  CARD_LIST_SELECTOR,
  editProfileButton,
  POPUP_FULL_SCREEN_SELECTOR,
  PROFILE_EDIT_FORM_SELECTOR,
  profileSubmit,
  USER_JOB_SELECTOR,
  USER_NAME_SELECTOR,
  userJobInput,
  userNameInput,
  popupAddFormSubmit,
  popupAddForm,
  profileEditForm,
} from "./utils/constants.js";

import "./pages/index.css"

// Валидаторы форм
const profileValidator = new FormValidator(
  config,
  profileEditForm,
  profileSubmit
);
const cardValidator = new FormValidator(
  config,
  popupAddForm,
  popupAddFormSubmit
);

// Подключаем валидацию для формы профиля и формы добавления карточки
profileValidator.enableValidation();
cardValidator.enableValidation();

// Создаем объект полноэкранного просмотра изображения
// и настраиваем закрытие просмотра изображения по клику вне модального окна
// и кнопке его закрытия
const fullScreenImage = new PopupWithImage(POPUP_FULL_SCREEN_SELECTOR);
fullScreenImage.setEventListeners();

// Функция создания карточки
function createCard(cardAttribute) {
  return new Card(
    {
      data: cardAttribute,
      handleCardClick: (name, link) => {
        fullScreenImage.open(name, link);
      },
    },
    CARD_TEMPLATE_SELECTOR
  );
}

// Создаем объект содержащий секцию с карточками
// и отрисовываем список карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardAttribute) => {
      const card = createCard(cardAttribute);
      cardList.addItem(card.generateCard());
    },
  },
  CARD_LIST_SELECTOR
);
cardList.renderItems();

// Создаем пользователя
const user = new UserInfo(USER_NAME_SELECTOR, USER_JOB_SELECTOR);

// Создаем форму редактирования и настраиваем слушателей
const formEditProfile = new PopupWithForm(PROFILE_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (userData) => {
    user.setUserInfo(userData.userName, userData.userJob);
  },
});
formEditProfile.setEventListeners();

// Создаем форму добавления карточки и настраиваем слушателей
const formAddCard = new PopupWithForm(CARD_ADD_FORM_SELECTOR, {
  handleFormSubmit: (item) => {
    const cardAttribute = { name: item.placeName, link: item.placeLink };
    cardList.addItem(createCard(cardAttribute).generateCard());
  },
});
formAddCard.setEventListeners();

function popupEditOpen() {
  profileValidator.resetValidation();
  userNameInput.value = user.getUserInfo().userName;
  userJobInput.value = user.getUserInfo().userJob;
  formEditProfile.open();
}

function popupAddOpen() {
  popupAddForm.reset();
  cardValidator.resetValidation();
  formAddCard.open();
}

// Вешаем обработчики событий на кнопки открытия форм
editProfileButton.addEventListener("click", popupEditOpen);
addCardButton.addEventListener("click", popupAddOpen);