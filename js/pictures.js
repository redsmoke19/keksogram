'use strict';

var USERS_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Мега фото! Просто обалдеть. Как вам так удалось?', 'Да это фоташоп!!!!!!!!'];
var USER_DESCROPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

// Показываем блок

function removeHidden(block) {
  block.classList.remove('hidden');
}

// Спрятать блок

function addHidden(block) {
  block.classList.add('visually-hidden');
}

// Находим случайное число из диапазона чисео

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

// Создаем массив с объектами

function getArray() {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: USERS_COMMENTS[getRandomNumber(0, USERS_COMMENTS.length - 1)],
      description: USER_DESCROPTION[getRandomNumber(0, USER_DESCROPTION.length - 1)]
    };
    photos.push(photo);
  }
  return photos;
}
var elementsPhoto = getArray();

// Находим родительский элемент списка фотографий и элемент шаблона на странице

var photoList = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

// Генерируем фотографии из шаблона

function getPhotoItem(photoArray) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photoArray.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photoArray.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = USERS_COMMENTS.length;
  return photoElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < getArray().length; i++) {
  fragment.appendChild(getPhotoItem(getArray()[i]));
}

photoList.appendChild(fragment);

var bigPhoto = document.querySelector('.big-picture');
removeHidden(bigPhoto);
bigPhoto.querySelector('.big-picture__img > img').src = elementsPhoto[0].url;
bigPhoto.querySelector('.likes-count').textContent = elementsPhoto[0].likes;
bigPhoto.querySelector('.comments-count').textContent = USERS_COMMENTS.length;
bigPhoto.querySelector('.social__caption').textContent = elementsPhoto[0].description;

function getCommentElement() {
  var commentsItem = document.createElement('li');
  commentsItem.classList.add('social__comment');
  commentsItem.classList.add('social__comment--text');
  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = '35';
  img.height = '35';
  commentsItem.appendChild(img);
  var paragraph = document.createElement('p');
  paragraph.classList.add('social__text');
  paragraph.textContent = elementsPhoto[getRandomNumber(0, USERS_COMMENTS.length - 1)].comments;
  commentsItem.appendChild(paragraph);
  return commentsItem;
}

var commentsList = document.querySelector('.social__comments');
for (var j = 1; j <= 5; j++) {
  fragment.appendChild(getCommentElement());
}

commentsList.appendChild(fragment);

var commentCount = document.querySelector('.social__comment-count');
addHidden(commentCount);
var commentAdds = document.querySelector('.social__comment-loadmore');
addHidden(commentAdds);
