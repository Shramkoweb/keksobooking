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
  var formCheckboxes = form.querySelectorAll('input[type="checkbox"]');
  var HousingTypes = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var FormRoomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var capacitySync = function () {
    var guests = FormRoomCapacity[formRoomNumber.value];

    Array.from(formCapacity.options).forEach(function (element) {
      if (guests.includes(element.value)) {
        element.disabled = false;
      } else {
        element.disabled = true;
      }
    });
  };

  formRoomNumber.addEventListener('change', function () {
    capacitySync();
  });

  var checkCapacity = function () {
    var validityMessage;
    if (formRoomNumber.value !== '100') {
      validityMessage = (formCapacity.value !== '0' && formCapacity.value <= formRoomNumber.value) ? '' : 'Для выбранного количества комнат укажите количество гостей отличное от "Не для гостей", но не более ' + formRoomNumber.value;
    } else {
      validityMessage = (formCapacity.value !== '0') ? 'Для выбранного количества комнат возможное количество гостей  - "Не для гостей"' : '';
    }

    formCapacity.setCustomValidity(validityMessage);
  };

  formCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        checkbox.checked = !checkbox.checked;
      }
    });
  });

  formRoomNumber.addEventListener('change', function () {
    checkCapacity();
  });

  formCapacity.addEventListener('change', function () {
    checkCapacity();
  });

  var houseTypeSync = function () {
    housePrice.min = HousingTypes[houseType.value.toUpperCase()];
    housePrice.placeholder = HousingTypes[houseType.value.toUpperCase()];
  };

  houseType.addEventListener('change', function () {
    houseTypeSync();
  });

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
    capacitySync();
    houseTypeSync();
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
