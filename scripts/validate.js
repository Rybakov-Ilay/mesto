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

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement);
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
