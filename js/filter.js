'use strict';

(function () {
  var checkValue = function (elementValue, filterStateValue) {
    return filterStateValue === 'any' || filterStateValue === elementValue.toString();
  };

  var checkGuest = function (elementValue, filterStateValue) {
    return filterStateValue === 'any' || filterStateValue <= elementValue;
  };

  window.filter = function (ads) {
    var filters = document.querySelector('.map__filters');
    var filtersSelects = filters.querySelectorAll('select');
    var filterState = {
      features: []
    };

    filtersSelects.forEach(function (element) {
      filterState[element.name.split('-')[1]] = element.value;
    });

    var filteredAds = ads.slice();
    return filteredAds.filter(function (element) {
      return checkValue(element.offer.type, filterState.type) &&
      checkGuest(element.offer.guests, filterState.guests) &&
      checkValue(element.offer.rooms, filterState.rooms);
    });
  };
})();
