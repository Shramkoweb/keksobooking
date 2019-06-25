'use strict';

(function () {
  var PINS_COUNT = 8;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;

  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  window.activatePage = function () {
    window.form.activateFieldsets();
    window.pins(window.data(PINS_COUNT));
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };
})();
