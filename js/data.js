'use strict';
(function () {
  window.data = {
    USERS_COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Мега фото! Просто обалдеть. Как вам так удалось?', 'Да это фоташоп!!!!!!!!'],
    USER_DESCROPTION: ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'],
    PHOTO_ALT: ['Хороший вид на озеро'],
    ESC_CODE: 27,
    removeHidden: function removeHidden(block) {
      block.classList.remove('hidden');
    },
    addHidden: function addHidden(block) {
      block.classList.add('hidden');
    }
  };
})();
