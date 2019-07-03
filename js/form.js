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
  var formRoomNumber = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');
  var housingTypes = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var formRoomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var onCapacityChange = function () {
    var guests = formRoomCapacity[formRoomNumber.value];
    formCapacity.value = guests[0];

    Array.from(formCapacity.options).forEach(function (element) {
      if (guests.includes(element.value)) {
        element.disabled = false;
      } else {
        element.disabled = true;
      }
    });
  };

  formRoomNumber.addEventListener('change', onCapacityChange);

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

  var setFieldsetsState = function (state) { // Активация полей формы
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = state;
    }

    for (var k = 0; k < mapFilters.length; k++) {
      mapFilters[k].disabled = state;
    }
  };

  var fillAddressField = function (x, y) {
    address.value = Math.floor(x) + ', ' + Math.floor(y);
  };

  window.form = {
    setFieldsetsState: setFieldsetsState,
    fillAddressField: fillAddressField
  };
})();
