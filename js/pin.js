'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var MIN_MAIN_PIN_Y = 130;
  var MAX_MAIN_PIN_Y = 630;
  var FORM_FIELDS_DISABLED = true;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PINS_NUMBER = 5;
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  window.form.setFieldsetsState(FORM_FIELDS_DISABLED);

  var renderPin = function (pin) { // создаем мокап пинов по темпейту
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left:' + (pin.location.x - PIN_WIDTH / 2) + 'px; top:' + (pin.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      window.map.activate();
    }
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - mouseMoveEvt.clientX,
        y: startCoordinates.y - mouseMoveEvt.clientY
      };

      startCoordinates = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var currentY = mainPin.offsetTop - shift.y;
      var currentX = mainPin.offsetLeft - shift.x;

      if ((currentY > MIN_MAIN_PIN_Y) && (currentY < MAX_MAIN_PIN_Y)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if ((currentX > 0) && (currentX < (map.offsetWidth - MAIN_PIN_WIDTH))) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.fillAddressField(currentX + MAIN_PIN_WIDTH / 2, currentY + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - mouseUpEvt.clientX,
        y: startCoordinates.y - mouseUpEvt.clientY
      };

      startCoordinates = {
        x: mouseUpEvt.clientX,
        y: mouseUpEvt.clientY
      };

      var currentY = mainPin.offsetTop - shift.y;
      var currentX = mainPin.offsetLeft - shift.x;

      window.form.fillAddressField(currentX + MAIN_PIN_WIDTH / 2, currentY + MAIN_PIN_HEIGHT);

      mainPin.removeEventListener('mouseup', window.activatePage);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var appendPins = function (pins) {
    var fragment = document.createDocumentFragment();
    var pinsCount = (pins.length > PINS_NUMBER) ? PINS_NUMBER : pins.length;

    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    mapPins.appendChild(fragment);
  };

  var deactivatePin = function (pins) {
    pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  window.pin = {
    add: appendPins,
    render: renderPin,
    deactivate: deactivatePin,
    clean: removePins
  };
})();
