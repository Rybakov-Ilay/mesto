import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import { initialCards, config } from "../utils/constants.js";


const content = document.querySelector(".content");
const forms = document.forms;
const profileEditForm = forms.profileEditingForm;
const profileSubmit = profileEditForm.querySelector(".popup__submit");
const profileButtonEdit = content.querySelector(".profile__edit-button");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAddForm = forms.addCardForm;
const popupAddFormSubmit = popupAddForm.querySelector(".popup__submit");

const CARD_TEMPLATE_SELECTOR = ".cards_template";
const CARD_LIST_SELECTOR = ".cards__list";
const POPUP_FULL_SCREEN_SELECTOR = ".popup_view-image";

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

// Создаем объект полноэкранного просмотра изображения
const fullScreenImage = new PopupWithImage(POPUP_FULL_SCREEN_SELECTOR);
fullScreenImage.setEventListeners()

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
const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardAttribute) => {
      const card = createCard(cardAttribute);
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
  console.log(User.getUserInfo())
  document.querySelector('.popup__input_type_name').value = User.getUserInfo().userName
  document.querySelector('.popup__input_type_job').value = User.getUserInfo().userJob
  popEdit.open();
}

function popupAddOpen() {
  popupAddForm.reset();
  cardValidator.resetValidation();
  popAddCard.open()
}


// Вешаем обработчики событий на кнопки открытия форм
profileButtonEdit.addEventListener("click", popupEditOpen);
popupAddCardButton.addEventListener("click", popupAddOpen);



const User = new UserInfo(".profile__title", ".profile__subtitle");

const popEdit = new PopupWithForm(".popup_edit", {
  handleFormSubmit: (item) => {
    User.setUserInfo(item.userName, item.userJob);
  },
});

popEdit.setEventListeners();

const popAddCard = new PopupWithForm(".popup_add" , {
  handleFormSubmit: (item) => {
    const cardAttribute = {name: item.placeName, link: item.placeLink}
    cardList.addItem(createCard(cardAttribute).generateCard())
  }
})

popAddCard.setEventListeners()


