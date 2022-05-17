import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  config,
  CARD_ADD_FORM_SELECTOR,
  addCardButton,
  CARD_TEMPLATE_SELECTOR,
  CARD_LIST_SELECTOR,
  editProfileButton,
  editAvatarButton,
  POPUP_FULL_SCREEN_SELECTOR,
  PROFILE_EDIT_FORM_SELECTOR,
  AVATAR_EDIT_FORM_SELECTOR,
  USER_JOB_SELECTOR,
  USER_NAME_SELECTOR,
  USER_AVATAR_SELECTOR,
  userJobInput,
  userNameInput,
  userAvatarInput,
  popupAddForm,
  avatarEditForm,
  profileEditForm,
  POPUP_DELETE_SELECTOR,
} from "../utils/constants.js";

import "./index.css";

// параметры подключения к api сервера
const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  token: "62c42d75-3174-484e-a374-431b449090d5",
};
// Создаем api работы с сервером
const api = new Api(optionsApi);

// Валидаторы форм
const profileValidator = new FormValidator(config, profileEditForm);
const cardValidator = new FormValidator(config, popupAddForm);
const avatarValidator = new FormValidator(config, avatarEditForm);
// Подключаем валидацию для формы профиля и формы добавления карточки
profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation()

// Создаем объект полноэкранного просмотра изображения
// и настраиваем закрытие просмотра изображения по клику вне модального окна
// и кнопке его закрытия
const fullScreenImage = new PopupWithImage(POPUP_FULL_SCREEN_SELECTOR);
fullScreenImage.setEventListeners();

// Создаем объект предупреждения о выбранном действии
// и настраиваем закрытие предупреждения по клику вне модального окна
// и кнопке его закрытия
const caution = new PopupWithSubmit(POPUP_DELETE_SELECTOR, {
  handleFormSubmit: (card, id) => {
    api
      .deleteCard(id)
      .then(card.remove())
      .catch((err) => console.log(err));
  },
});

// Функция создания карточки
function createCard(cardAttribute) {
  return new Card(
    {
      data: cardAttribute,
      handleCardClick: (name, link) => {
        fullScreenImage.open(name, link);
      },

      handleCardDelete: (card, id) => {
        caution.open(card, id);
        caution.setEventListeners();
      },
    },
    CARD_TEMPLATE_SELECTOR,
    user.getUserID()
  ).generateCard();
}

// Создаем объект содержащий секцию с карточками
const cardList = new Section(
  { renderer: (cardAttribute) => cardList.addItem(createCard(cardAttribute)) },
  CARD_LIST_SELECTOR
);

// Получаем список карточек с сервера через api и отрисовываем их
api
  .getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Создаем пользователя
const userData = {
  userNameSelector: USER_NAME_SELECTOR,
  userJobSelector: USER_JOB_SELECTOR,
};
const user = new UserInfo(userData);
// Заполняем поля пользователя данными с сервера
api
  .getUser()
  .then((res) => user.setUserInfo(res))
  .catch((err) => console.log(err));

// Создаем форму редактирования и настраиваем слушателей
const formEditProfile = new PopupWithForm(PROFILE_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (userData) => {
    api
      .editUser(userData)
      .then((res) => user.setUserInfo(res))
      .catch((err) => console.log(err));
  },
});
formEditProfile.setEventListeners();

// Создаем форму добавления карточки и настраиваем слушателей
const formAddCard = new PopupWithForm(CARD_ADD_FORM_SELECTOR, {
  handleFormSubmit: (item) => {
    const cardAttribute = { name: item.placeName, link: item.placeLink };
    api
      .addNewCard(cardAttribute)
      .then((cardAttribute) => {
        cardList.addItem(createCard(cardAttribute));
      })
      .catch((err) => console.log(err));
  },
});
formAddCard.setEventListeners();


// Создаем форму редактирования аватара и настраиваем слушателей
const formEditAvatar = new PopupWithForm(AVATAR_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (avatar) => {
    api
      .editAvatar(avatar.avatarLink)
      .then((res) => user.setUserInfo(res))
      .catch((err) => console.log(err));
  },
});
formEditAvatar.setEventListeners();

function popupEditOpen() {
  userNameInput.value = user.getUserInfo().userName;
  userJobInput.value = user.getUserInfo().userJob;
  profileValidator.resetValidation();
  formEditProfile.open();
}

function popupAddOpen() {
  cardValidator.resetValidation();
  formAddCard.open();
}

function popupAvatarEditOpen() {
  avatarValidator.resetValidation()
  userAvatarInput.value = user.getUserAvatar()
  formEditAvatar.open()
}


// Вешаем обработчики событий на кнопки открытия форм
editProfileButton.addEventListener("click", popupEditOpen);
addCardButton.addEventListener("click", popupAddOpen);
editAvatarButton.addEventListener("click", popupAvatarEditOpen)

