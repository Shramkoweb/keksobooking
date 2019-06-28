'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.showFormError = function () {
    document.body.appendChild(errorTemplate);
  };
})();
