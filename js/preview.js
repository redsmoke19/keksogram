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
    photoElement.querySelector('.picture__stat--comments').textContent = window.data.USERS_COMMENTS.length;
    return photoElement;
  }
  window.fragment = document.createDocumentFragment();
  for (var i = 0; i < window.elementsPhoto.length; i++) {
    window.fragment.appendChild(getPhotoItem(window.elementsPhoto[i]));
  }
  photoList.appendChild(window.fragment);
})();