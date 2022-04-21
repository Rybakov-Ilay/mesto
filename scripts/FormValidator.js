export default class FormValidator {
  constructor(config, formElement, formSubmit) {
    this._config = config;
    this._formElement = formElement;
    this._formSubmit = formSubmit;
  }

  // Находим класс ошибки и получаем
  // разметку ошибки соответствующего ей поля через его id
  _getElementError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }
  // метод выделяет поле и показывает сообщение об ошибке
  _showError(inputElement, errorMessage) {
    const elementError = this._getElementError(inputElement);
    inputElement.classList.add(this._config.inputErrorClass);
    elementError.textContent = errorMessage;
    elementError.classList.add(this._config.errorClass);
  }
  // метод скрывает выделение поля и сообщение об ошибке
  _hideError(inputElement) {
    const elementError = this._getElementError(inputElement);
    inputElement.classList.remove(this._config.inputErrorClass);
    elementError.textContent = "";
    elementError.classList.remove(this._config.errorClass);
  }

  // метод в зависимости от валидации скрывает или показывает ошибку
  _isValid(inputElement) {
    !inputElement.validity.valid
      ? this._showError(inputElement, inputElement.validationMessage)
      : this._hideError(inputElement);
  }

  // метод проверяет валидность всех полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // метод меняет состояние кнопки в зависимости от валидности всех полей
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._config.inactiveButtonClass);
      button.setAttribute("disabled", "");
    } else {
      button.classList.remove(this._config.inactiveButtonClass);
      button.removeAttribute("disabled");
    }
  }
  // метод на каждый ввод в поле формы проверяет ее на валидность
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const button = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._toggleButtonState(inputList, button);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  // публичный метод, который включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }

  // метод отключающий кнопку
  disableSubmit() {
    this._formSubmit.classList.add(this._config.inactiveButtonClass);
    this._formSubmit.setAttribute("disabled", "");
  }
}
