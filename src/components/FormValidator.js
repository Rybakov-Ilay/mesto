export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formSubmit = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
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

  // метод проверяет валидность всех полей формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // метод меняет состояние кнопки в зависимости от валидности всех полей
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formSubmit.classList.add(this._config.inactiveButtonClass);
      this._formSubmit.setAttribute("disabled", "");
    } else {
      this._formSubmit.classList.remove(this._config.inactiveButtonClass);
      this._formSubmit.removeAttribute("disabled");
    }
  }
  // метод на каждый ввод в поле формы проверяет ее на валидность
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // публичный метод, который включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }

  // метод скрывает ошибки полей и отключает кнопку
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => this._hideError(inputElement));
  }
}
