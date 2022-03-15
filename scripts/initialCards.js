// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];


const initialCards = [
  {
    name: "Валлетта",
    link: "https://i.ibb.co/SXq8JGR/valletta.jpg",
  },
  {
    name: "Пляж Рамла, о.Гозо",
    link: "https://i.ibb.co/6yNFpxZ/ramla-beach-Gozo.jpg",
  },
  {
    name: "Монолитос, о.Родос",
    link: "https://i.ibb.co/nPb1mRG/monolitos-rodos.jpg",
  },
  {
    name: "Бухта Марсаскала, Мальта",
    link: "https://i.ibb.co/7ySMQFv/marsascala-malta.jpg",
  },
  {
    name: "пляж Балос",
    link: "https://i.ibb.co/k0Q0hSP/balos.jpg",
  },
  {
    name: "Берлинская стена",
    link: "https://i.ibb.co/xqwCZz1/berlin-wall.jpg",
  },
];
//Инициализация начальных карточек

function likesActivationSwitch(evt) {
  evt.target.classList.toggle("card__button-like_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function viewCard(evt) {
  const popupView = document.querySelector(".popup__view-image");
  const popupViewButtonClose = popupView.querySelector(".popup__button-close");
  popupView.querySelector(".popup__image").src = evt.target.src;
  popupView.querySelector(".popup__image-caption").textContent =
    evt.target.nextElementSibling.textContent;
  popupOpen(popupView);
  popupViewButtonClose.addEventListener("click", function () {
    popupClose(popupView);
  });
}

function insertCard(cardAttribute) {
  const cardsList = content.querySelector(".cards__list");
  const cardTemplate = document.querySelector(".cards__template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__caption-title").textContent =
    cardAttribute.name;
  cardElement.querySelector(".card__image").src = cardAttribute.link;
  cardElement.querySelector(".card__image").alt = cardAttribute.name;
  cardElement
    .querySelector(".card__button-like")
    .addEventListener("click", likesActivationSwitch);
  cardElement
    .querySelector(".card__trash")
    .addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", viewCard);


  cardsList.append(cardElement);
}

initialCards.forEach(insertCard);
