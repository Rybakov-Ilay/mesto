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
  CARD_TEMPLATE_SELECTOR,
  CARD_LIST_SELECTOR,
  USER_JOB_SELECTOR,
  USER_NAME_SELECTOR,
  POPUP_FULL_SCREEN_SELECTOR,
  PROFILE_EDIT_FORM_SELECTOR,
  AVATAR_EDIT_FORM_SELECTOR,
  POPUP_DELETE_SELECTOR,
  addCardButton,
  editProfileButton,
  editAvatarButton,
  userJobInput,
  userNameInput,
  userAvatarInput,
  popupAddForm,
  avatarEditForm,
  profileEditForm,
} from "../utils/constants.js";

import "./index.css";

// параметры подключения к api сервера
const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "62c42d75-3174-484e-a374-431b449090d5",
    "Content-Type": "application/json",
  },
};
// Создаем api работы с сервером
const api = new Api(optionsApi);

// Создаем пользователя
const userData = {
  userNameSelector: USER_NAME_SELECTOR,
  userJobSelector: USER_JOB_SELECTOR,
};
const user = new UserInfo(userData);
api
  .getUser()
  .then((res) => user.setUserInfo(res)) // Заполняем поля пользователя данными с сервера
  .catch((err) => console.log(err));

// Создаем валидацию форм
const profileValidator = new FormValidator(config, profileEditForm);
const cardValidator = new FormValidator(config, popupAddForm);
const avatarValidator = new FormValidator(config, avatarEditForm);
// Подключаем валидацию для формы профиля и формы добавления карточки
profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

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
caution.setEventListeners();

// Функция создания карточки
function createCard(cardAttribute) {
  return new Card(
    {
      data: cardAttribute,
      handleCardClick: (name, link) => fullScreenImage.open(name, link),
      handleCardDelete: (card, id) => caution.open(card, id),
      handleLikeClick: (cardId, isLiked, handleLikeCount) => {
        isLiked
          ? api
              .deleteLike(cardId)
              .then((res) => handleLikeCount(res))
              .catch((err) => console.log(err))
          : api
              .putLike(cardId)
              .then((res) => handleLikeCount(res))
              .catch((err) => console.log(err));
      },
    },
    CARD_TEMPLATE_SELECTOR,
    user.getUserID()
  ).generateCard(); // вызываем метод, который возвращает разметку карточки
}

// Создаем объект содержащий секцию с карточками
const cardList = new Section(
  { renderer: (cardAttribute) => cardList.addItem(createCard(cardAttribute)) },
  CARD_LIST_SELECTOR
);
// Получаем список карточек с сервера через api и отрисовываем их
api
  .getInitialCards()
  .then((res) => cardList.renderItems(res.reverse()))
  .catch((err) => console.log(err));

// функция уведомления пользователя о процессе загрузки
function loader(form, isLoading, text) {
  isLoading
    ? (form.submit.textContent = "Сохранение...")
    : (form.submit.textContent = text);
}

// Создаем форму редактирования и настраиваем слушателей
const formEditProfile = new PopupWithForm(PROFILE_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (userData) => {
    const text = formEditProfile.submit.textContent;
    loader(formEditProfile, true, text);
    api
      .editUser(userData)
      .then((res) => user.setUserInfo(res))
      .catch((err) => console.log(err))
      .finally(() => loader(formEditProfile, false, text));
  },
});
formEditProfile.setEventListeners();

// Создаем форму добавления карточки и настраиваем слушателей
const formAddCard = new PopupWithForm(CARD_ADD_FORM_SELECTOR, {
  handleFormSubmit: (item) => {
    const cardAttribute = { name: item.placeName, link: item.placeLink };
    const text = formAddCard.submit.textContent;
    loader(formAddCard, true, text);
    api
      .addNewCard(cardAttribute)
      .then((cardAttribute) => cardList.addItem(createCard(cardAttribute)))
      .catch((err) => console.log(err))
      .finally(() => loader(formAddCard, false, text));
  },
});
formAddCard.setEventListeners();

// Создаем форму редактирования аватара и настраиваем слушателей
const formEditAvatar = new PopupWithForm(AVATAR_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (avatar) => {
    const text = formEditAvatar.submit.textContent;
    loader(formEditAvatar, true, text);
    api
      .editAvatar(avatar.avatarLink)
      .then((res) => user.setUserInfo(res))
      .catch((err) => console.log(err))
      .finally(() => loader(formEditAvatar, false, text));
  },
});
formEditAvatar.setEventListeners();

function popupEditOpen() {
  profileValidator.resetValidation();
  userNameInput.value = user.getUserInfo().userName;
  userJobInput.value = user.getUserInfo().userJob;
  formEditProfile.open();
}

function popupAddOpen() {
  cardValidator.resetValidation();
  formAddCard.open();
}

function popupAvatarEditOpen() {
  avatarValidator.resetValidation();
  userAvatarInput.value = user.getUserAvatar();
  formEditAvatar.open();
}

// Вешаем обработчики событий на кнопки открытия форм
editProfileButton.addEventListener("click", popupEditOpen);
addCardButton.addEventListener("click", popupAddOpen);
editAvatarButton.addEventListener("click", popupAvatarEditOpen);
