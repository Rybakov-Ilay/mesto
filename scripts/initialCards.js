const initialCards = [
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
  const cardTemplate = document.querySelector(".cards_template").content;
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const newCardImage = newCard.querySelector(".card__image");

  newCard.querySelector(".card__caption-title").textContent =
    cardAttribute.name;
  newCardImage.src = cardAttribute.link;
  newCardImage.alt = cardAttribute.name;
  newCard
    .querySelector(".card__button-like")
    .addEventListener("click", likesActivationSwitch);
  newCard.querySelector(".card__trash").addEventListener("click", deleteCard);
  newCard
    .querySelector(".card__image")
    .addEventListener("click", () => viewCard(cardAttribute));
  return newCard;
}

// Функция добавления карточки в разметку (в начало)
function addCard(cardAttribute) {
  cardsList.prepend(createCard(cardAttribute));
}

// Инициализация начальных карточек из массива initialCards
initialCards.forEach(addCard);
