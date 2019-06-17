'use strict';

var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;
var pinHorizontalRange = document.querySelector('.map__pins').clientWidth;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinSimilarList = document.querySelector('.map__pins');


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
        'type': getRandomItemFrom(HOTEL_TYPES)
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
  pinElement.querySelector('img').alt = pin.type;

  return pinElement;
};


var renderPinMockup = function (pins) { // рендер пинов по мокапам
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinMockup(pins[i]));
  }

  pinSimilarList.appendChild(fragment);
  document.querySelector('.map').classList.remove('map--faded');
};

renderPinMockup(generatePins(PINS_COUNT));
