'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;
var MIN_MAIN_PIN_Y = 130;
var MAX_MAIN_PIN_Y = 630;
var OFF_FORM = true;
var ON_FORM = false;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinSimilarList = document.querySelector('.map__pins');
var pinHorizontalRange = pinSimilarList.clientWidth;
var map = document.querySelector('.map');

var housingTypes = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

var getRandomInteger = function (min, max) {
  // получаем случайное число в заданом диапазоне включительно
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generatePins = function (count) {
  // генерация масива данных для пинов
  var pins = [];
  for (var i = 1; i <= count; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: 'title'
      },
      location: {
        x: getRandomInteger(0, pinHorizontalRange) - PIN_WIDTH / 2,
        y: getRandomInteger(130, 630) - PIN_HEIGHT
      }
    });
  }
  return pins;
};

var createPinMockup = function (pin) {
  // создаем мокап пинов по темпейту
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var renderPinMockup = function (pins) {
  // рендер пинов по мокапам
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinMockup(pins[i]));
  }

  pinSimilarList.appendChild(fragment);
};

var adForm = document.querySelector('.ad-form');

var setFieldsetsState = function (disabled) {
  // Переключение активности формы
  var fieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = disabled;
  }

  for (var k = 0; k < mapFilters.length; k++) {
    mapFilters[k].disabled = disabled;
  }
};

setFieldsetsState(OFF_FORM);

var mainPin = document.querySelector('.map__pin--main');
var address = adForm.querySelector('#address');
var mainPinYPosition = mainPin.offsetTop;
var mainPinXPosition = mainPin.offsetLeft;

var fillAddressField = function (x, y) {
  address.value = x + ', ' + y;
};

fillAddressField(mainPinXPosition, mainPinYPosition);

var activatePage = function () {
  setFieldsetsState(ON_FORM);
  renderPinMockup(generatePins(PINS_COUNT));
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

    if ((currentX > 0) && (currentX < (1200 - MAIN_PIN_WIDTH))) {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

    address.placeholder = Math.floor(currentX + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(currentY + MAIN_PIN_HEIGHT);
    address.value = Math.floor(currentX + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(currentY + MAIN_PIN_HEIGHT);
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

    address.placeholder = Math.floor(mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(mainPin.offsetTop - shift.y + MAIN_PIN_HEIGHT);
    address.value = Math.floor(mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(mainPin.offsetTop - shift.y + MAIN_PIN_HEIGHT);

    mainPin.removeEventListener('mouseup', activatePage);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Форма

var houseType = adForm.querySelector('#type');
var housePrice = adForm.querySelector('#price');

var onHouseTypeChange = function () {
  housePrice.min = housingTypes[houseType.value.toUpperCase()];
  housePrice.placeholder = housingTypes[houseType.value.toUpperCase()];
};

houseType.addEventListener('change', onHouseTypeChange);

var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

var onTimeInChange = function () {
  timeOut.value = timeIn.value;
};

var onTimeOutChange = function () {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);
