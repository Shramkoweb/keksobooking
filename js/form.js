'use strict';

window.form = (function () {
  var OFF_FORM = true;
  var ON_FORM = false;
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var address = adForm.querySelector('#address');
  var mainPinYPosition = mainPin.offsetTop;
  var houseType = adForm.querySelector('#type');
  var housePrice = adForm.querySelector('#price');
  var mainPinXPosition = mainPin.offsetLeft;
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
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


  var fillAddressField = function (x, y) {
    address.value = x + ', ' + y;
  };

  fillAddressField(mainPinXPosition, mainPinYPosition);

  return {
    setFieldsetsState: function (disabled) { // Переключение активности формы
      var fieldsets = adForm.querySelectorAll('fieldset');
      var mapFilters = document.querySelectorAll('.map__filter');

      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = disabled;
      }

      for (var k = 0; k < mapFilters.length; k++) {
        mapFilters[k].disabled = disabled;
      }
    },
    onForm: ON_FORM,
    offForm: OFF_FORM,
    address: address
  };
})();
