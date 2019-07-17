'use strict';
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainPage = document.querySelector('main');

  var errorDisplay = errorTemplate.cloneNode(true);

  var successDisplay = successTemplate.cloneNode(true);

  var closeModal = function () {
    var modal = mainPage.querySelector('.modal');
    modal.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('mousedown', onModalClick);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };

  var onModalClick = function () {
    closeModal();
  };

  var showModal = function (errorMessage) {
    if (errorMessage) {
      errorDisplay.querySelector('p').textContent = errorMessage;
      mainPage.appendChild(errorDisplay);
    } else {
      mainPage.appendChild(successDisplay);
    }

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', onModalClick);
  };

  window.modal = {
    show: showModal
  };
})();
