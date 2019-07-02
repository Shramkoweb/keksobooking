'use strict';

(function () {
  var FORM_FIELDS_DISABLED = true;
  var FORM_FIELDS_ACTIVE = false;
  var MAX_PINS_COUNT = 5;
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;
  var pinsDataCopy = [];


  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  var appendPins = function (pins) { // рендер пинов по мокапам
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.render(pins[i]));
    }

    mapPins.appendChild(fragment);
  };

  var successDataLoad = function (data) {
    pinsDataCopy = data.slice();
    appendPins(pinsDataCopy.slice(0, MAX_PINS_COUNT));
  };

  var activatePage = function () {
    window.form.setFieldsetsState(FORM_FIELDS_ACTIVE);
    window.backend.load(successDataLoad, window.showErrorMessage);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var disablePage = function () {
    window.form.setFieldsetsState(FORM_FIELDS_DISABLED);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  window.map = {
    activate: activatePage,
    disable: disablePage
  };
})();
