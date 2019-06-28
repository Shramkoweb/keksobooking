'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;

  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  window.setPageState = function (state) {
    window.form.setFieldsetsState(state);
    window.backend.load(window.appendPins, window.error);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };
})();
