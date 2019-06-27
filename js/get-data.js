'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PINS_COUNT = 8;
  var pinSimilarList = document.querySelector('.map__pins');
  var pinHorizontalRange = pinSimilarList.clientWidth;

  window.getData = function () { // генерация масива данных для пинов
    var pins = [];
    for (var i = 1; i <= PINS_COUNT; i++) {
      pins.push({
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          type: 'title'
        },
        location: {
          x: window.util.getRandomInteger(0, pinHorizontalRange) - PIN_WIDTH / 2,
          y: window.util.getRandomInteger(130, 630) - PIN_HEIGHT
        }
      });
    }
    return pins;
  };
})();
