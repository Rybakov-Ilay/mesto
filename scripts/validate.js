const showError = (form, element, errorMessage) => {
  const elementError = form.querySelector(`.${element.id}-error`);

  element.classList.add("popup__input_type_error");
  elementError.textContent = errorMessage;
  elementError.classList.add("popup__input-error_active");
};

const hideError = (form, element, errorMessage) => {
  const elementError = form.querySelector(`.${element.id}-error`);

  element.classList.remove("popup__input_type_error");
  elementError.textContent = errorMessage;
  elementError.classList.remove("popup__input-error_active");
};

const isValid = (form, element) => {
  !element.validity.valid
    ? showError(form, element, element.validationMessage)
    : hideError(form, element);
};

// profileEditingForm.addEventListener("input", () =>
//   isValid(profileEditingForm, popupEditUserName)
// );



const setEventListeners = (form) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll('.popup__input'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(form, inputElement)
    });
  });
};

setEventListeners(profileEditingForm)
