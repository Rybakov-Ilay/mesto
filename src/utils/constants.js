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
export const editAvatarButton = content.querySelector(".profile__avatar-edit");

// Селекторы
export const CARD_TEMPLATE_SELECTOR = ".cards_template";
export const CARD_LIST_SELECTOR = ".cards__list";
export const POPUP_FULL_SCREEN_SELECTOR = ".popup_view-image";
export const POPUP_DELETE_SELECTOR = ".popup_delete";
export const USER_NAME_SELECTOR = ".profile__title";
export const USER_JOB_SELECTOR = ".profile__subtitle";
export const USER_AVATAR_SELECTOR = ".profile__avatar";
export const PROFILE_EDIT_FORM_SELECTOR = ".popup_edit";
export const AVATAR_EDIT_FORM_SELECTOR = ".popup_avatar";
export const CARD_ADD_FORM_SELECTOR = ".popup_add";

export const userData = {
  userNameSelector: USER_NAME_SELECTOR,
  userJobSelector: USER_JOB_SELECTOR,
  userAvatarSelector: USER_AVATAR_SELECTOR,
};

// параметры подключения к api сервера
export const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "62c42d75-3174-484e-a374-431b449090d5",
    "Content-Type": "application/json",
  },
};
