'use strict';

(function () {
  var mapFillters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;
  var ads = [];
  var fieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');

  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  var onSuccess = function (data) {
    ads = data.slice();
    window.pin.add(ads);

    window.card.show(ads);
  };

  var onError = function (errorMessage) {
    window.modal.show(errorMessage);
  };

  var resetFeatures = function () {
    var filtersCheckFeatures = document.querySelectorAll('#housing-features input[type="checkbox"]:checked');

    filtersCheckFeatures.forEach(function (checkbox) {
      checkbox.checked = false;
    })
  };

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      window.form.enableFields(fieldsets);
      window.form.enableFields(mapFilters);
      window.backend.load(onSuccess, onError);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      mapFillters.addEventListener('change', function () {
        window.card.remove();
        window.debounce(renderFilteredAds);
      });
    }
  };

  var disablePage = function () {
    window.form.disable();
    window.pin.initial();
    window.form.disableFields(fieldsets);
    window.form.disableFields(mapFilters);
    window.card.remove();
    window.pin.clean();
    resetFeatures();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  disablePage();

  var renderFilteredAds = function () {
    var filteredAds = window.filter(ads);

    window.pin.clean();
    window.pin.add(filteredAds);
    window.card.show(filteredAds);
  };

  window.map = {
    activate: activatePage,
    disable: disablePage
  };
})();
