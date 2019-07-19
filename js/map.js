'use strict';

(function () {
  var mapFillters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var filterCheckboxes = document.querySelectorAll('#housing-features input[type="checkbox"]');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;
  var ads = [];
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mainPin = document.querySelector('.map__pin--main');

  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  var onSuccess = function (data) {
    ads = data.slice();
    window.pin.add(ads);
    window.card.show(ads);
    window.form.enableFields(fieldsets);
    window.form.enableFields(mapFilters);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var onError = function (errorMessage) {
    window.modal.show(errorMessage);
  };

  var resetFeatures = function () {
    var filtersCheckFeatures = document.querySelectorAll('#housing-features input[type="checkbox"]:checked');

    filtersCheckFeatures.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

  var renderFilteredAds = function () {
    var filteredAds = window.filter(ads);

    window.pin.clean();
    window.pin.add(filteredAds);
    window.card.show(filteredAds);
  };

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      window.backend.load(onSuccess, onError);
    }
  };


  mapFillters.addEventListener('change', function () {
    window.card.remove();
    window.debounce(renderFilteredAds);
  });

  filterCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        checkbox.checked = !checkbox.checked;
        window.debounce(renderFilteredAds);
      }
    });
  });

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

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  });

  window.map = {
    activate: activatePage,
    disable: disablePage
  };
})();
