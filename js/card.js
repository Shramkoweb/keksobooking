'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var localizedOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Лачуга',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var getOfferFeatures = function (features, element) {
    features.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + item);
      element.appendChild(featureElement);
    });
  };

  var removeChilds = function (parentElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  };

  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var closePopUp = function () {
    var popup = document.querySelector('.popup');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (popup) {
      popup.remove();
    }

    window.pin.deactivate(pins);
  };

  var showCard = function (ads) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        // Деактивация пинов
        window.pin.deactivate(pins);
        removeCard();

        // Активация текущего
        pin.classList.add('map__pin--active');

        // Вставка сгенерированой карточки
        map.appendChild(window.card.create(ads[index]));

        // Отработка Esc
        document.addEventListener('keydown', window.card.onEscPress);
        // Отработка клика по крестику
        var popupClose = map.querySelector('.popup__close');

        popupClose.addEventListener('click', window.card.onClosePress);
      });
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
      mapCardElement.querySelector('.popup__text--capacity').textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
      mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
      mapCardElement.querySelector('.popup__description').textContent = post.offer.description;
      mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

      if (post.offer.features.length > 0) {
        getOfferFeatures(post.offer.features, featuresContainer);
      }

      var photosList = mapCardElement.querySelector('.popup__photos');
      removeChilds(photosList);

      var fragmentPhotos = document.createDocumentFragment();

      post.offer.photos.forEach(function (source, index) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.src = source;
        photo.alt = 'Фото ' + index;
        photo.style = 'width: 45px; height: 40px;';
        fragmentPhotos.appendChild(photo);
      });

      photosList.appendChild(fragmentPhotos);

      return mapCardElement;
    },
    onEscPress: function (evt) {
      window.util.isEscEvent(evt, closePopUp);
    },
    onClosePress: function () {
      closePopUp();
    },
    remove: removeCard,
    show: showCard
  };
})();
