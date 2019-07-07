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

        // Вставка сгенерированой карточки
        map.appendChild(window.card.create(ads[index]));

        // Отработка Esc
        document.addEventListener('keydown', window.card.escPress);
        // Отработка клика по крестику
        var popupClose = map.querySelector('.popup__close');

        popupClose.addEventListener('click', window.card.clickPress);
      });
    });
  };
})();
