const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Находим класс ошибки и получаем
// разметку ошибки соответствующего ей инпута через его id
const getElementError = (form, element) => {
  return form.querySelector(`.${element.id}-error`);
};

const showError = (
  form,
  element,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const elementError = getElementError(form, element);

  element.classList.add(inputErrorClass);
  elementError.textContent = errorMessage;
  elementError.classList.add(errorClass);
};

const hideError = (form, element, { inputErrorClass, errorClass }) => {
  const elementError = getElementError(form, element);

  element.classList.remove(inputErrorClass);
  elementError.textContent = "";
  elementError.classList.remove(errorClass);
};

const isValid = (form, element, config) => {
  !element.validity.valid
    ? showError(form, element, element.validationMessage, config)
    : hideError(form, element, config);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute("disabled");
  }
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...config }
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, button, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement, config);
      toggleButtonState(inputList, button, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...config }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(config);
