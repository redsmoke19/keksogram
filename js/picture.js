'use strict';
(function () {
  var bigPhoto = document.querySelector('.big-picture');

  function getBigPhoto(photoArray) {
    window.data.removeHidden(bigPhoto);
    bigPhoto.querySelector('.big-picture__img > img').src = photoArray.url;
    bigPhoto.querySelector('.big-picture__img > img').alt = photoArray.alt;
    bigPhoto.querySelector('.likes-count').textContent = photoArray.likes;
    bigPhoto.querySelector('.comments-count').textContent = window.data.USERS_COMMENTS.length;
    bigPhoto.querySelector('.social__caption').textContent = photoArray.description;
    document.body.style.overflow = 'hidden';
  }

  var closeBigPhotoButton = document.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');

  window.showBigPhoto = function (data) {
    let pictureImg = document.querySelectorAll('.picture__img');
    for (let i = 0; i < pictureImg.length; i++) {
      pictureImg[i].addEventListener('click', function () {
        getBigPhoto(data[i]);
        document.addEventListener('keydown', closeEscBigPhoto);
        closeBigPhotoButton.addEventListener('click', closeBigPhoto);
        for (let j = 0; j < data[i].comments.length; j++) {
          fragment.appendChild(getCommentElement(data[i].comments[j]));
          console.log(data[i].comments.length);
          commentsList.appendChild(fragment);
        }
      })
    }
    // for (let j = 0; j < 5; j++) {
    //   fragment.appendChild(getCommentElement());
    // }  
    // commentsList.appendChild(fragment);

    // let picContainer = document.querySelector('.pictures');

    // picContainer.addEventListener('click', function (evt) {
    //   let pic = evt.target.closest('.picture__img');
    //   if (!pic) {
    //     return;
    //   }
    //   console.log(pic.src);
    //   for (let i = 0; i < data.length; i++) {
    //     let number = data[i].url;
    //   }

      
    //   closeBigPhotoButton.addEventListener('click', closeBigPhoto);
    //   let pictureImg = document.querySelectorAll('.picture__img');

    // });

  }
  // Та же функция но только через замыкание
// function showBigPhoto() {
//   var pictureImg = document.querySelectorAll('.picture__img');
//   for (var i = 0; i < pictureImg.length; i++) {
//     (function(y) {
//       pictureImg[y].addEventListener('click', function() {
//         getBigPhoto(elementsPhoto[y]);
//       })
//     })(i)
//   }
// }
  // showBigPhoto();

  function closeBigPhoto() {
    window.data.addHidden(bigPhoto);
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', closeEscBigPhoto);
    closeBigPhotoButton.removeEventListener('click', closeBigPhoto);
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  }

  function closeEscBigPhoto(evt) {
    if (evt.keyCode === window.data.ESC_CODE) {
      closeBigPhoto();
    }
  }

  function getCommentElement(data) {
    var commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');
    commentsItem.classList.add('social__comment--text');
    var img = document.createElement('img');
    img.classList.add('social__picture');
    // img.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    img.src = data.avatar;
    img.alt = data.name;
    img.width = '35';
    img.height = '35';
    commentsItem.appendChild(img);
    var paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    // paragraph.textContent = elementsPhoto[getRandomNumber(0, window.data.USERS_COMMENTS.length - 1)].comments;
    paragraph.textContent = data.message;
    commentsItem.appendChild(paragraph);
    return commentsItem;
  }

  // var commentsList = document.querySelector('.social__comments');
  // for (var j = 0; j <= 5; j++) {
  //   fragment.appendChild(getCommentElement());
  // }

  // commentsList.appendChild(fragment);
  var commentCount = document.querySelector('.social__comment-count');
  window.data.addHidden(commentCount);
  var commentAdds = document.querySelector('.social__comment-loadmore');
  window.data.addHidden(commentAdds);
})();