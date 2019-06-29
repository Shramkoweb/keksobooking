'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainPage = document.querySelector('main');


  var closeErrorPopup = function () {
    mainPage.removeChild(errorTemplate);
    document.removeEventListener('keydown', onErrorPopupEscPress);
  };

  var onErrorPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeErrorPopup);
  };

  window.showErrorPopup = function () {
    mainPage.appendChild(errorTemplate);
    var errorButton = document.querySelector('.error__button');
    var errorPopup = document.querySelector('.error');
    document.addEventListener('keydown', onErrorPopupEscPress);
    errorButton.addEventListener('click', function () {
      closeErrorPopup();
    });
    errorPopup.addEventListener('click', function () {
      closeErrorPopup();
    });
  };
})();
