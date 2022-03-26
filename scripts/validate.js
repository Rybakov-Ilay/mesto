



const getElementError = (form, element) => {
  return form.querySelector(`.${element.id}-error`);
};

const showError = (form, element, errorMessage) => {
  const elementError = getElementError(form, element);

  element.classList.add("popup__input_type_error");
  elementError.textContent = errorMessage;
  elementError.classList.add("popup__input-error_active");
};

const hideError = (form, element, errorMessage) => {
  const elementError = getElementError(form, element);

  element.classList.remove("popup__input_type_error");
  elementError.textContent = errorMessage;
  elementError.classList.remove("popup__input-error_active");
};

const isValid = (form, element) => {
  !element.validity.valid
    ? showError(form, element, element.validationMessage)
    : hideError(form, element);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add("popup__submit_inactive");
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove("popup__submit_inactive");
    button.removeAttribute("disabled");
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__submit");
  toggleButtonState(inputList, button);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement);
      toggleButtonState(inputList, button);
    });
  });
};

const enableValidation = () => {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
