const content = document.querySelector(".content");
const popupEdit = document.querySelector(".popup_edit");
const forms = document.forms;
const profileEditingForm = forms.profileEditingForm;
const popupEditButtonClose = popupEdit.querySelector(".popup__button-close");
const popupEditUserName = profileEditingForm.elements.userName;
const popupEditUserJob = profileEditingForm.elements.userJob;
const editButton = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = forms.addCardForm;
const popupAddCardButtonClose = popupAdd.querySelector(".popup__button-close");
const cardsList = content.querySelector(".cards__list");
const popupView = document.querySelector(".popup_view-image");
const popupViewButtonClose = popupView.querySelector(".popup__button-close");
const popupViewImage = popupView.querySelector(".popup__image");
const popupViewImageCaption = popupView.querySelector(".popup__image-caption");
const cardName = popupAddForm.placeName;
const cardLink = popupAddForm.placeLink;

function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function popupEditOpen() {
  popupEditUserName.value = profileUserName.textContent;
  popupEditUserJob.value = profileUserJob.textContent;
  console.log(profileEditingForm.userName.validity)
  popupOpen(popupEdit);
}

function handlingPopupEditForm(event) {
  event.preventDefault();
  profileUserName.textContent = popupEditUserName.value;
  profileUserJob.textContent = popupEditUserJob.value;
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
profileEditingForm.addEventListener("submit", handlingPopupEditForm);
popupAddCardButton.addEventListener("click", () => popupOpen(popupAdd));
popupAddCardButtonClose.addEventListener("click", () => popupClose(popupAdd));
popupAddForm.addEventListener("submit", handlingPopupAddForm);
popupViewButtonClose.addEventListener("click", () => popupClose(popupView));
