'use strict';

(function () {
  var FORM_FIELDS_DISABLED = true;
  var FORM_FIELDS_ACTIVE = false;
  var MAX_PINS_COUNT = 5;
  var mapFillters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPinYPosition = document.querySelector('.map__pin--main').offsetTop;
  var mainPinXPosition = document.querySelector('.map__pin--main').offsetLeft;
  var pinsDataCopy = [];


  window.form.fillAddressField(mainPinXPosition, mainPinYPosition);

  var successDataLoad = function (data) {
    pinsDataCopy = data.slice();
    window.pin.add(pinsDataCopy.slice(0, MAX_PINS_COUNT));
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

  var selectType = mapFillters.querySelector('#housing-type');
  var selectRooms = mapFillters.querySelector('#housing-rooms');
  var selectGuests = mapFillters.querySelector('#housing-guests');
  var featuresControls = document.querySelectorAll('#housing-features input[type="checkbox"]');

  // Фильтрация карты
  var updateMapPins = function (data) {
    var filteredData = data;
    window.pin.clean();

    var selectFiltering = function (control, type) {
      if (control.value !== 'any') {
        filteredData = filteredData.filter(function (poster) {
          return poster.offer[type].toString() === control.value;
        });
      }
    };

    var checkboxFiltering = function (controls) {
      controls.forEach(function (checkbox) {
        if (checkbox.checked) {
          filteredData = filteredData.filter(function (poster) {
            return poster.offer.features.includes(checkbox.value);
          });
        }
      });
    };


    selectFiltering(selectType, 'type');
    selectFiltering(selectRooms, 'rooms');
    selectFiltering(selectGuests, 'guests');
    checkboxFiltering(featuresControls);

    return filteredData.slice(0, MAX_PINS_COUNT);
  };


  var renderFilteredAds = function () {
    var filteredAds = updateMapPins(pinsDataCopy);

    window.pin.add(filteredAds);
  };

  mapFillters.addEventListener('change', function () {
    window.debounce(renderFilteredAds);
  });

  window.map = {
    activate: activatePage,
    disable: disablePage
  };
})();
