'use strict';
(function () {
  // Находим случайное число из диапазона чисел
  window.getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  // Создаем массив с объектами
  function getArray() {
    var photos = [];
    for (var i = 0; i < 25; i++) {
      var photo = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.getRandomNumber(15, 200),
        comments: window.data.USERS_COMMENTS[window.getRandomNumber(0, window.data.USERS_COMMENTS.length - 1)],
        description: window.data.USER_DESCROPTION[window.getRandomNumber(0, window.data.USER_DESCROPTION.length - 1)],
        alt: window.data.PHOTO_ALT[0]
      };
      photos.push(photo);
    }
    return photos;
  }
  window.elementsPhoto = getArray();

  // Находим родительский элемент списка фотографий и элемент шаблона на странице
  var photoList = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  // Генерируем фотографии из шаблона

  function getPhotoItem(photoArray) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photoArray.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photoArray.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photoArray.comments.length;
    return photoElement;
  }
  window.fragment = document.createDocumentFragment();

  function onLoad(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      window.fragment.appendChild(getPhotoItem(data[i]));
    }
    photoList.appendChild(window.fragment);
    window.showBigPhoto(data);
  }

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
