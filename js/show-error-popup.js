'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.showErrorPopup = function () {
    document.querySelector('main').appendChild(errorTemplate);
  };
})();
