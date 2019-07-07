'use strict';

(function () {
  var map = document.querySelector('.map');

  window.showCard = function (ads) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        // Деактивация пинов
        window.pin.deactivate(pins);

        // Активация текущего
        pin.classList.add('map__pin--active');

        // Удаление пина, если он есть
        var card = map.querySelector('.map__card');
        if (card) {
          card.remove();
        }

        map.appendChild(window.card.create(ads[index]));

        // Генерация карточки
        window.card.create(ads[index]);
      });
    });
  };
})();
