'use strict';
(function() {
  window.data = {
    ESC_CODE: 27,
    removeHidden: function removeHidden(block) {
      block.classList.remove('hidden');
    },
    addHidden: function addHidden(block) {
      block.classList.add('hidden');
    }
  };

  // Находим случайное число из диапазона чисел
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  var photos = [];

  var photoRemove = function() {
    var photoItems = Array.from(document.querySelectorAll('.picture__link'));
    photoItems.forEach((item) => {
      item.remove();
    });
  };

  var sortByParameters = (left, right) => {
    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    } else {
      return 0;
    }
  }

  var updatePhotos = function(item) {
    photoRemove();
    var filter = [];
    if (item === 'new') {
      filter = photos;
    };
    if (item === 'popular') {
      filter = photos.slice().sort((left, right) => {
        return sortByParameters(left.likes, right.likes);
      });
    };
    if (item === 'discussed') {
      filter = photos.slice().sort((left, right) => {
        return sortByParameters(left.comments.length, right.comments.length);
      });
    };
    if(item === 'random') {
      for (var i = 0; i < 10; i++) {
        filter.push(photos[getRandomNumber(0, photos.length)]);
      }
    }
    window.render(filter);
  };

  window.photo.onPopularFilter = function(item) {
    updatePhotos(item);
  };

  window.photo.onNewFilter = function(item) {
    updatePhotos(item);
  };

  window.photo.onDiscussedFilter = function(item) {
    updatePhotos(item);
  }

  window.photo.onRandomFilter = function(item) {
    updatePhotos(item);
  }

  function onLoad(data) {
    photos = data;
    window.render(data);
  };

  function onError(message) {
    alert('Произошла ошибка: ' + message.name + '. Описание ошибки: ' + message.message);
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load(onLoad, onError);
})();