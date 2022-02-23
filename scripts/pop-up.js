const content = document.querySelector(".content");
const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupButtonClose = popup.querySelector(".popup__button-close");
const popupUserName = popupForm.querySelector(".popup__input_type_name");
const popupUserJob = popupForm.querySelector(".popup__input_type_job");
const editButton = content.querySelector(".profile__edit-button");
const profileUserName = content.querySelector(".profile__title");
const profileUserJob = content.querySelector(".profile__subtitle");

function popupFormOpenedOrClosed() {
  popupUserName.value = profileUserName.textContent;
  popupUserJob.value = profileUserJob.textContent;
  popup.classList.toggle("popup_opened");
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = popupUserName.value;
  profileUserJob.textContent = popupUserJob.value;
  popupFormOpenedOrClosed();
}

editButton.addEventListener("click", popupFormOpenedOrClosed);
popupButtonClose.addEventListener("click", popupFormOpenedOrClosed);
popupForm.addEventListener("submit", formSubmitHandler);
