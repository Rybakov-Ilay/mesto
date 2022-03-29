const content = document.querySelector(".content");
const popupEdit = document.querySelector(".popup_edit");
const forms = document.forms;
const profileEditingForm = forms.profileEditingForm;
const popupEditUserName = profileEditingForm.elements.userName;
const popupEditUserJob = profileEditingForm.elements.userJob;
const editButton = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = forms.addCardForm;
const cardsList = content.querySelector(".cards__list");
const popupView = document.querySelector(".popup_view-image");
const popupViewImage = popupView.querySelector(".popup__image");
const popupViewImageCaption = popupView.querySelector(".popup__image-caption");
const cardName = popupAddForm.placeName;
const cardLink = popupAddForm.placeLink;
const popupsList = Array.from(document.querySelectorAll(".popup"));

function handlingPopupCloseByEscape(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    popupClose(activePopup);
  }
}

function popupOpen(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlingPopupCloseByEscape);
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlingPopupCloseByEscape);
}

function popupEditOpen() {
  popupEditUserName.value = profileUserName.textContent;
  popupEditUserJob.value = profileUserJob.textContent;
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

function addEventListenerOnCloseAndOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      popupClose(popup);
    }
  });
}

popupsList.forEach(addEventListenerOnCloseAndOverlay);
editButton.addEventListener("click", popupEditOpen);
profileEditingForm.addEventListener("submit", handlingPopupEditForm);
popupAddCardButton.addEventListener("click", () => popupOpen(popupAdd));
popupAddForm.addEventListener("submit", handlingPopupAddForm);
