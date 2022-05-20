import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import "./index.css";

import { enableValidation, formValidators } from "../utils/formValidators.js";

import {
  config,
  CARD_ADD_FORM_SELECTOR,
  CARD_TEMPLATE_SELECTOR,
  CARD_LIST_SELECTOR,
  POPUP_FULL_SCREEN_SELECTOR,
  PROFILE_EDIT_FORM_SELECTOR,
  AVATAR_EDIT_FORM_SELECTOR,
  POPUP_DELETE_SELECTOR,
  addCardButton,
  editProfileButton,
  editAvatarButton,
  userData,
  optionsApi,
} from "../utils/constants.js";

// Создаем api работы с сервером
const api = new Api(optionsApi);

// Создаем пользователя
const user = new UserInfo(userData);

// Создаем объект содержащий секцию с карточками
const cardList = new Section({ renderer: createCard }, CARD_LIST_SELECTOR);

// Функция создания карточки
function createCard(cardAttribute) {
  return new Card(
    {
      data: cardAttribute,
      handleCardClick: (name, link) => fullScreenImage.open(name, link),
      handleCardDelete: (card, id) => formCaution.open(card, id),
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

// Создаем объект полноэкранного просмотра изображения
const fullScreenImage = new PopupWithImage(POPUP_FULL_SCREEN_SELECTOR);

// Создаем форму предупреждения о выбранном действии
const formCaution = new PopupWithSubmit(POPUP_DELETE_SELECTOR, {
  handleFormSubmit: (card, id) => {
    formCaution.renderLoading();
    api
      .deleteCard(id)
      .then(() => {
        formCaution.close();
        card.remove();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        formCaution.renderLoading(false);
      });
  },
});

// Создаем форму редактирования профиля
const formEditProfile = new PopupWithForm(PROFILE_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (userData) => {
    formEditProfile.renderLoading();
    api
      .editUser(userData)
      .then((res) => {
        user.setUserInfo(res);
        formEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => formEditProfile.renderLoading(false));
  },
});

// Создаем форму добавления карточки
const formAddCard = new PopupWithForm(CARD_ADD_FORM_SELECTOR, {
  handleFormSubmit: (item) => {
    const cardAttribute = { name: item.placeName, link: item.placeLink };
    formAddCard.renderLoading();
    api
      .addNewCard(cardAttribute)
      .then((cardAttribute) => {
        cardList.addItem(cardAttribute);
        formAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => formAddCard.renderLoading(false));
  },
});

// Создаем форму редактирования аватара
const formEditAvatar = new PopupWithForm(AVATAR_EDIT_FORM_SELECTOR, {
  handleFormSubmit: (avatar) => {
    formEditAvatar.renderLoading();
    api
      .editAvatar(avatar.avatarLink)
      .then((res) => {
        user.setUserInfo(res);
        formEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => formEditAvatar.renderLoading(false));
  },
});

function popupEditOpen() {
  formValidators.profileEditingForm.resetValidation();
  formEditProfile.setInputValues(user.getUserInfo());
  formEditProfile.open();
}

function popupAddOpen() {
  formValidators.addCardForm.resetValidation();
  formAddCard.open();
}

function popupAvatarEditOpen() {
  formValidators.avatarEditForm.resetValidation();
  formEditAvatar.open();
}

// Получаем данные пользователя и список карточек с сервера через api и отрисовываем их
Promise.all([api.getUser(), api.getInitialCards()])
  .then((res) => {
    user.setUserInfo(res[0]);
    cardList.renderItems(res[1].reverse());
    // Подключаем валидацию форм
    enableValidation(config);
    // Вешаем слушателей на кнопки открытия форм
    editProfileButton.addEventListener("click", popupEditOpen);
    addCardButton.addEventListener("click", popupAddOpen);
    editAvatarButton.addEventListener("click", popupAvatarEditOpen);
    // Вешаем слушателей на событие отправки формы
    fullScreenImage.setEventListeners();
    formCaution.setEventListeners();
    formEditProfile.setEventListeners();
    formAddCard.setEventListeners();
    formEditAvatar.setEventListeners();
  })
  .catch((err) => console.log("Данные не загрузились. Ошибка: ", err));
