'use strict';

(function () {
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  var getPriceValue = function (price) {
    if (price > PRICE_MAX) {
      return 'high';
    } else if (price < PRICE_MIN) {
      return 'low';
    } else {
      return 'middle';
    }
  };

  var checkValue = function (elementValue, filterStateValue) {
    return filterStateValue === 'any' || filterStateValue === elementValue.toString();
  };

  var checkPrice = function (elementValue, filterStateValue) {
    return filterStateValue === 'any' || filterStateValue === getPriceValue(elementValue);
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
        checkValue(element.offer.rooms, filterState.rooms) &&
        checkPrice(element.offer.price, filterState.price);
    });
  };
})();
