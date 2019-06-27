'use strict';

(function () {
  window.util = {
    getRandomInteger: function (min, max) { // получаем случайное число в заданом диапазоне включительно
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
