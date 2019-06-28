'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');
  var houseType = form.querySelector('#type');
  var housePrice = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var fieldsets = form.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var housingTypes = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var onHouseTypeChange = function () {
    housePrice.min = housingTypes[houseType.value.toUpperCase()];
    housePrice.placeholder = housingTypes[houseType.value.toUpperCase()];
  };

  houseType.addEventListener('change', onHouseTypeChange);

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), alert, window.showErrorPopup);
  });

  window.form = {
    setFieldsetsState: function (state) { // Активация полей формы
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = state;
      }

      for (var k = 0; k < mapFilters.length; k++) {
        mapFilters[k].disabled = state;
      }
    },
    fillAddressField: function (x, y) {
      address.value = Math.floor(x) + ', ' + Math.floor(y);
    }
  };
})();
