const content = document.querySelector(".content");
const popupEdit = document.querySelector(".popup_edit");
const popupEditForm = popupEdit.querySelector(".popup__form");
const popupEditButtonClose = popupEdit.querySelector(".popup__button-close");
const popupEditFirstInput = popupEditForm.querySelector(
  ".popup__input_type_name"
);
const popupEditSecondInput = popupEditForm.querySelector(
  ".popup__input_type_job"
);
const editButton = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddCardButtonClose = popupAdd.querySelector(".popup__button-close");
const cardsList = content.querySelector(".cards__list");
const popupView = document.querySelector(".popup_view-image");
const popupViewButtonClose = popupView.querySelector(".popup__button-close");
const popupViewImage = popupView.querySelector(".popup__image");
const popupViewImageCaption = popupView.querySelector(".popup__image-caption");
const cardName = popupAddForm.querySelector(".popup__input_type_place-name");
const cardLink = popupAddForm.querySelector(".popup__input_type_place-link");

function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function popupEditOpen() {
  popupEditFirstInput.value = profileUserName.textContent;
  popupEditSecondInput.value = profileUserJob.textContent;
  popupOpen(popupEdit);
}

function handlingPopupEditForm(event) {
  event.preventDefault();
  profileUserName.textContent = popupEditFirstInput.value;
  profileUserJob.textContent = popupEditSecondInput.value;
  popupClose(popupEdit);
}

function handlingPopupAddForm(event) {
  event.preventDefault();
  const cardAttribute = { name: cardName.value, link: cardLink.value };
  addCard(cardAttribute);
  popupClose(popupAdd);
  popupAddForm.reset();
}

editButton.addEventListener("click", popupEditOpen);
popupEditButtonClose.addEventListener("click", () => popupClose(popupEdit));
popupEditForm.addEventListener("submit", handlingPopupEditForm);
popupAddCardButton.addEventListener("click", () => popupOpen(popupAdd));
popupAddCardButtonClose.addEventListener("click", () => popupClose(popupAdd));
popupAddForm.addEventListener("submit", handlingPopupAddForm);
popupViewButtonClose.addEventListener("click", () => popupClose(popupView));
