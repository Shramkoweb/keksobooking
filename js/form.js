'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');
  var houseType = adForm.querySelector('#type');
  var housePrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var fieldsets = adForm.querySelectorAll('fieldset');
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
