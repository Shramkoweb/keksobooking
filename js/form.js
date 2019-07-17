'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');
  var houseType = form.querySelector('#type');
  var housePrice = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var resetButton = form.querySelector('.ad-form__reset');
  var HousingTypes = {
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
    housePrice.min = HousingTypes[houseType.value.toUpperCase()];
    housePrice.placeholder = HousingTypes[houseType.value.toUpperCase()];
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

  var onSuccess = function () {
    window.modal.show();
    window.map.disable();
  };

  var onError = function (errorMessage) {
    window.modal.show(errorMessage);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, onError);
  });

  var fillAddressField = function (x, y) {
    address.value = Math.floor(x) + ', ' + Math.floor(y);
  };


  var disableFields = function (fields) {
    fields.forEach(function (field) {
      field.disabled = true;
    });
  };

  var enableFields = function (fields) {
    fields.forEach(function (field) {
      field.disabled = false;
    });
  };

  var disableForm = function () {
    form.classList.add('ad-form--disabled');
    form.reset();
    disableFields(fieldsets);
    disableFields(mapFilters);
  };

  resetButton.addEventListener('click', function () {
    window.map.disable();
  });


  window.form = {
    enableFields: enableFields,
    disableFields: disableFields,
    fillAddressField: fillAddressField,
    disable: disableForm
  };
})();
