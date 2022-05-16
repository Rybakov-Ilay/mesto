export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};


const content = document.querySelector(".content");

// кнопки открытия форм
export const editProfileButton = content.querySelector(".profile__edit-button");
export const addCardButton = content.querySelector(".profile__add-button");

// формы
const forms = document.forms;
export const profileEditForm = forms.profileEditingForm;
export const popupAddForm = forms.addCardForm;

// Инпуты формы редактирования профиля
export const userNameInput = profileEditForm.elements.userName;
export const userJobInput = profileEditForm.elements.userJob;

// Селекторы
export const CARD_TEMPLATE_SELECTOR = ".cards_template";
export const CARD_LIST_SELECTOR = ".cards__list";
export const POPUP_FULL_SCREEN_SELECTOR = ".popup_view-image";
export const POPUP_DELETE_SELECTOR = ".popup_delete";
export const USER_NAME_SELECTOR = ".profile__title";
export const USER_JOB_SELECTOR = ".profile__subtitle";
export const USER_AVATAR_SELECTOR = ".profile__avatar";
export const PROFILE_EDIT_FORM_SELECTOR = ".popup_edit";
export const CARD_ADD_FORM_SELECTOR = ".popup_add";
