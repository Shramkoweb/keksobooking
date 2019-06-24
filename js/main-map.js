'use strict';

window.mainMap = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.form.setFieldsetsState(window.form.offForm);

  var createPinMockup = function (pin) { // создаем мокап пинов по темпейту
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  return {
    renderPinMockup: function (pins) { // рендер пинов по мокапам

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(createPinMockup(pins[i]));
      }

      window.data.pinSimilarList.appendChild(fragment);
    }
  };
})();
