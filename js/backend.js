'use strict';

(function () {
  var TIME_OUT = 10000;
  var CODE_SUCSESS = 200;
  var URL = 'https://javascript.pages.academy/keksobookin';

  var request = function (onSuccess, onError) {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.responseType = 'json';
    xhrRequest.addEventListener('load', function () {
      if (xhrRequest.status === CODE_SUCSESS) {
        onSuccess(xhrRequest.response);
      } else {
        onError('Cтатус ответа: ' + xhrRequest.status + ' ' + xhrRequest.statusText);
      }
    });

    xhrRequest.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhrRequest.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrRequest.timeout + 'мс');
    });

    xhrRequest.timeout = TIME_OUT;

    return xhrRequest;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = request(onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = request(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
