'use strict';

(function () {
  var FORM_FIELDS_DISABLED = true;
  var FORM_FIELDS_ACTIVE = false;
  var mapFillters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;
  var ads = [];


  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  var successDataLoad = function (data) {
    ads = data.slice();
    window.pin.add(ads);

    window.showCard(ads);
  };

  var activatePage = function () {
    window.form.setFieldsetsState(FORM_FIELDS_ACTIVE);
    window.backend.load(successDataLoad, window.showErrorMessage);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var disablePage = function () {
    window.form.setFieldsetsState(FORM_FIELDS_DISABLED);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var renderFilteredAds = function () {
    var filteredAds = window.filter(ads);

    window.pin.clean();
    window.pin.add(filteredAds);
    window.showCard(filteredAds);
  };

  mapFillters.addEventListener('change', function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    window.debounce(renderFilteredAds);
  });

  window.map = {
    activate: activatePage,
    disable: disablePage
  };
})();
