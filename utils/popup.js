export const popupView = document.querySelector(".popup_view-image");
export const popupViewImage = popupView.querySelector(".popup__image");
export const popupViewImageCaption = popupView.querySelector(
  ".popup__image-caption"
);

export function popupOpen(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlingPopupCloseByEscape);
}

export function popupClose(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlingPopupCloseByEscape);
}

export function handlingPopupCloseByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    popupClose(activePopup);
  }
}
