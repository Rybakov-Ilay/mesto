const content = document.querySelector(".content");
const popupEdit = document.querySelector(".popup_edit");
const forms = document.forms;
const profileEditingForm = forms.profileEditingForm;
const profileSubmit = profileEditingForm.querySelector('.popup__submit')
const popupEditUserName = profileEditingForm.elements.userName;
const popupEditUserJob = profileEditingForm.elements.userJob;
const profileButtonEdit = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");
const popupAddCardButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = forms.addCardForm;
const popupAddFormSubmit = popupAddForm.querySelector('.popup__submit')
const cardsList = content.querySelector(".cards__list");
const popupView = document.querySelector(".popup_view-image");
const popupViewImage = popupView.querySelector(".popup__image");
const popupViewImageCaption = popupView.querySelector(".popup__image-caption");
const cardName = popupAddForm.placeName;
const cardLink = popupAddForm.placeLink;
const popupsList = Array.from(document.querySelectorAll(".popup"));
const cardTemplate = document.querySelector(".cards_template").content;

function handlingPopupCloseByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
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

function handlerButtonDisabled(button) {
  button.classList.add("popup__submit_inactive");
  button.setAttribute("disabled", "");
}

function handlingPopupEditForm(event) {
  event.preventDefault();
  profileUserName.textContent = popupEditUserName.value;
  profileUserJob.textContent = popupEditUserJob.value;
  handlerButtonDisabled(profileSubmit)
  popupClose(popupEdit);

}

function handlingPopupAddForm(event) {
  event.preventDefault();
  const cardAttribute = { name: cardName.value, link: cardLink.value };
  addCard(cardAttribute);
  handlerButtonDisabled(popupAddFormSubmit)
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

function likesActivationSwitch(evt) {
  evt.target.classList.toggle("card__button-like_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function viewCard(cardAttribute) {
  popupViewImage.src = cardAttribute.link;
  popupViewImageCaption.textContent = cardAttribute.name;
  popupOpen(popupView);
}

// Функция создает и возвращает html-разметку новой карточки
// принимая на вход имя и ссылку на изображение
function createCard(cardAttribute) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const newCardImage = newCard.querySelector(".card__image");

  newCard.querySelector(".card__caption-title").textContent =
    cardAttribute.name;
  newCardImage.src = cardAttribute.link;
  newCardImage.alt = cardAttribute.name;
  newCardImage.addEventListener("click", () => viewCard(cardAttribute));
  newCard.querySelector(".card__trash").addEventListener("click", deleteCard);
  newCard
    .querySelector(".card__button-like")
    .addEventListener("click", likesActivationSwitch);

  return newCard;
}

// Функция добавления карточки в разметку (в начало)
function addCard(cardAttribute) {
  cardsList.prepend(createCard(cardAttribute));
}

// Инициализация начальных карточек из массива initialCards
initialCards.forEach(addCard);

popupsList.forEach(addEventListenerOnCloseAndOverlay);
profileButtonEdit.addEventListener("click", popupEditOpen);
profileEditingForm.addEventListener("submit", handlingPopupEditForm);
popupAddCardButton.addEventListener("click", () => popupOpen(popupAdd));
popupAddForm.addEventListener("submit", handlingPopupAddForm);
