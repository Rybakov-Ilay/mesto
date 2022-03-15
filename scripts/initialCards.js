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

const cardsList = content.querySelector(".cards__list");

function likesActivationSwitch(evt) {
  evt.target.classList.toggle("card__button-like_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function viewCard(evt) {
  const popupView = document.querySelector(".popup_view-image");
  const popupViewButtonClose = popupView.querySelector(".popup__button-close");
  popupView.querySelector(".popup__image").src = evt.target.src;
  popupView.querySelector(".popup__image-caption").textContent =
    evt.target.nextElementSibling.textContent;
  popupOpen(popupView);
  popupViewButtonClose.addEventListener("click", function () {
    popupClose(popupView);
  });
}

// Функция создает и возвращает html-разметку новой карточки
// принимая на вход имя и ссылку на изображение
function createCard(cardAttribute) {
  const cardTemplate = document.querySelector(".cards_template").content;
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  newCard.querySelector(".card__caption-title").textContent =
    cardAttribute.name;
  newCard.querySelector(".card__image").src = cardAttribute.link;
  newCard.querySelector(".card__image").alt = cardAttribute.name;
  newCard
    .querySelector(".card__button-like")
    .addEventListener("click", likesActivationSwitch);
  newCard.querySelector(".card__trash").addEventListener("click", deleteCard);
  newCard.querySelector(".card__image").addEventListener("click", viewCard);
  return newCard;
}

// Функция добавления карточки в разметку (в начало)
function addCard(cardAttribute) {
  cardsList.prepend(createCard(cardAttribute));
}

// Инициализация начальных карточек из массива initialCards
initialCards.forEach(addCard);
