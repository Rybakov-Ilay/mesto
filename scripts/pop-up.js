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

function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = popupEditFirstInput.value;
  profileUserJob.textContent = popupEditSecondInput.value;
  popupClose(popupEdit);
}

editButton.addEventListener("click", popupEditOpen);
popupEditButtonClose.addEventListener("click", function () {
  popupClose(popupEdit);
});
popupEditForm.addEventListener("submit", formSubmitHandler);

popupAddCardButton = content.querySelector(".profile__add-button");
popupAdd = document.querySelector(".popup_add");
popupAddForm = popupAdd.querySelector(".popup__form");
popupAddCardButtonClose = popupAdd.querySelector('.popup__button-close');

popupAddCardButton.addEventListener("click", function () {
  popupOpen(popupAdd);
});
popupAddCardButtonClose.addEventListener('click', function () {
  popupClose(popupAdd)
})

popupAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cardName = popupAddForm.querySelector(
    ".popup__input_type_place-name"
  ).value;
  let cardLink = popupAddForm.querySelector(
    ".popup__input_type_place-link"
  ).value;
  let cardAttribute = { name: cardName, link: cardLink };
  insertCard(cardAttribute);
  popupAddForm.reset();
  popupClose(popupAdd);
});


