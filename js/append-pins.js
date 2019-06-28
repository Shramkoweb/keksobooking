'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var MIN_MAIN_PIN_Y = 130;
  var MAX_MAIN_PIN_Y = 630;
  var DISABLED_PAGE = true;
  var ACTIVE_PAGE = false;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinSimilarList = document.querySelector('.map__pins');

  window.form.setFieldsetsState(DISABLED_PAGE);

  var renderPin = function (pin) { // создаем мокап пинов по темпейту
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left:' + (pin.location.x - PIN_WIDTH / 2) + 'px; top:' + (pin.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      window.setPageState(ACTIVE_PAGE);
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

  window.appendPins = function (pins) { // рендер пинов по мокапам
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    pinSimilarList.appendChild(fragment);
  };
})();
