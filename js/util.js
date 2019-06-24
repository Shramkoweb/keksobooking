'use strict';

window.util = (function () {
  return {
    getRandomInteger: function (min, max) { // получаем случайное число в заданом диапазоне включительно
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
