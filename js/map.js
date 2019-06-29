'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;
  var FORM_FIELDS_DISABLED = true;
  var FORM_FIELDS_ACTIVE = false;

  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  window.map = {
    activate: function () {
      window.form.setFieldsetsState(FORM_FIELDS_ACTIVE);
      window.backend.load(window.pin.append, window.showErrorMessage);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    },
    disable: function () {
      window.form.setFieldsetsState(FORM_FIELDS_DISABLED);
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
    }
  };
})();