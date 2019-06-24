'use strict';

window.mainPin = (function () {
  var PINS_COUNT = 8;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var MIN_MAIN_PIN_Y = 130;
  var MAX_MAIN_PIN_Y = 630;
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var activatePage = function () {
    window.form.setFieldsetsState(window.form.onForm);
    window.mainMap.renderPinMockup(window.data.generatePins(PINS_COUNT));
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      activatePage();
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

      window.form.address.placeholder = Math.floor(currentX + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(currentY + MAIN_PIN_HEIGHT);
      window.form.address.value = Math.floor(currentX + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(currentY + MAIN_PIN_HEIGHT);
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

      window.form.address.placeholder = Math.floor(mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(mainPin.offsetTop - shift.y + MAIN_PIN_HEIGHT);
      window.form.address.value = Math.floor(mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(mainPin.offsetTop - shift.y + MAIN_PIN_HEIGHT);

      mainPin.removeEventListener('mouseup', activatePage);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
