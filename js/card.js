'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var localizedOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Лачуга',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var getOfferFeatures = function (array, element) {
    array.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('feature', 'feature--' + item);
      element.appendChild(featureElement);
    });
  };

  window.card = {
    create: function (post) {
      var mapCardElement = mapCardTemplate.cloneNode(true);

      var featuresContainer = mapCardElement.querySelector('.popup__features');
      featuresContainer.innerHTML = '';

      mapCardElement.querySelector('.popup__title').textContent = post.offer.title;
      mapCardElement.querySelector('.popup__text--address').textContent = post.offer.address;
      mapCardElement.querySelector('.popup__text--price').textContent = post.offer.price + '₽/ночь';
      mapCardElement.querySelector('.popup__type').textContent = localizedOfferType[post.offer.type];
      mapCardElement.querySelector('.popup__text--capacity').textContent = post.offer.rooms + 'комнаты для ' + post.offer.guests + ' гостей';
      mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
      mapCardElement.querySelector('.popup__description').textContent = post.offer.description;
      mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

      if (post.offer.features.length > 0) {
        getOfferFeatures(post.offer.features, featuresContainer);
      }

      return mapCardElement;
    }
  };
})();
