import FormValidator from "../components/FormValidator.js";

export const formValidators = {};

// Функция находит все формы по указанному селектору, создает для каждой
// формы объект валидации и сразу включает валидацию для форм
// Обратиться к методам валидатора конкретной формы можно через объект formValidators
// по имени нужной формы

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
