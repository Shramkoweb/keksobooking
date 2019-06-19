'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;
var OFF_FORM = true;
var ON_FORM = false;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinSimilarList = document.querySelector('.map__pins');
var pinHorizontalRange = pinSimilarList.clientWidth;

var housingTypes = [
  {
    type: 'palace',
    price: 10000
  },
  {
    type: 'flat',
    price: 1000
  },
  {
    type: 'house',
    price: 5000
  },
  {
    type: 'bungalo',
    price: 0
  }
];

var getRandomItemFrom = function (array) { // получаем случайный элемент в переданом масиве
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInteger = function (min, max) { // получайем случайное число в заданом диапазоне включительно
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generatePins = function (count) { // генерация масива данных для пинов
  var pins = [];

  for (var i = 1; i <= count; i++) {
    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'type': getRandomItemFrom(housingTypes).type
      },
      'location': {
        'x': getRandomInteger(0, pinHorizontalRange) - PIN_WIDTH / 2,
        'y': getRandomInteger(130, 630) - PIN_HEIGHT
      }
    });
  }

  return pins;
};

var createPinMockup = function (pin) { // создаем мокап пинов по темпейту
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};


var renderPinMockup = function (pins) { // рендер пинов по мокапам
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinMockup(pins[i]));
  }

  pinSimilarList.appendChild(fragment);
};

var adForm = document.querySelector('.ad-form');

var setFieldsetsState = function (disabled) { // Переключение активности формы
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
  fillAddressField(mainPinXPosition + MAIN_PIN_WIDTH / 2, mainPinYPosition + MAIN_PIN_HEIGHT);
  mainPin.removeEventListener('mouseup', activatePage);
  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};

mainPin.addEventListener('mouseup', activatePage);
