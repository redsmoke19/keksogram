'use strict';
(function () {
  var bodyElement = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var uploadButton = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('#upload-cancel');
  var scaleImage = form.querySelector('.img-upload__preview img');
  var scaleValue = form.scale;
  var scalePlusBotton = form.querySelector('.resize__control--plus');
  var scaleMinusBotton = form.querySelector('.resize__control--minus');
  var imageScaleSize = {
    min: 25,
    max: 100,
    default: 100,
    current: 100,
    step: 25
  };

// При нажатии на значек закрузки разблокирует форму редактирования фотографии и добавляет обработчики событий на него
  function uploadChangeHandler() {
    bodyElement.classList.add('modal-open');
    editForm.classList.remove('hidden');
    closeButton.addEventListener('click', closeUpload);
    document.addEventListener('keydown', closeEscHandler);
    activeteScaleButton();
    activateEffect();
    // checkScript();
    addFormValidity();
  }

// При нажатии на крестик или Esc закрыает форму и удаляем обработчики событий
  function closeUpload() {
    bodyElement.classList.remove('modal-open');
    editForm.classList.add('hidden');
    document.removeEventListener('keydown', closeEscHandler);
    closeButton.removeEventListener('click', closeUpload);
    uploadButton.value = '';
    deactiveteScaleButton();
    deactivateEffect();
    removeFormValidity();
  }

// Находим в форме поле с именем hashtags
  var hashTagsInput = form.hashtags;
  var textInput = form.querySelector('.text__description');

  function closeEscHandler(evt) {
    if (document.activeElement !== hashTagsInput && document.activeElement !== textInput) {
      if (evt.keyCode === window.data.ESC_CODE) {
        closeUpload();
      }
    }
  }

// uploadChangeHandler()
  uploadButton.addEventListener('change', uploadChangeHandler);

//Изменяем маштаб по кликам на кнопки + и -

// Устанавливает значение размера в окошке отображения % масштаба, и так же трансформирует картинку согласно выбраного маштаба
  function setImageScale(size) {
    scaleValue.value = `${size}%`;
    scaleImage.style.transform = `scale(${size / 100})`;
    imageScaleSize.current = size;
  }

// Функция клика на кнопку -, уменьшает маштаб изображения
  function subtrackSizaValue() {
    if (imageScaleSize.min < imageScaleSize.current) {
      var newSize = imageScaleSize.current - imageScaleSize.step;
      setImageScale(newSize);
    }
  }

// Функция клика на кнопку +, увеличивает маштаб изображения
  function addSizeValue() {
    if (imageScaleSize.max > imageScaleSize.current) {
      var newSize = imageScaleSize.current + imageScaleSize.step;
      setImageScale(newSize);
    }
  }

// Функция активации слушателей на кнопки и так же задает настройки маштаба по умолчанию, эта фенкиця вызывается только тогда, когда открывается попап с настройкой и редактирование изображений
  function activeteScaleButton() {
    setImageScale(imageScaleSize.default);
    scaleMinusBotton.addEventListener('click', subtrackSizaValue);
    scalePlusBotton.addEventListener('click', addSizeValue);
  }

//Функция которая удаляет обработчики событий и с кнопок + и - при закрытие попапа редактирования изображений.
  function deactiveteScaleButton() {
    scaleMinusBotton.removeEventListener('click', subtrackSizaValue);
    scalePlusBotton.removeEventListener('click', addSizeValue);
  }

// Применение эффекта для изображения

  var defauleEffect = form.querySelector('#effect-none');
  var scalePin = form.querySelector('.scale__pin');
  var scaleLevel = form.querySelector('.scale__level');
  var scaleLine = form.querySelector('.scale__line');
  var scaleField = form.querySelector('.img-upload__scale');
  var effectsList = form.querySelectorAll('.effects__radio');
  var effectValue = form.querySelector('.scale__value');
  var maxEffectValue = 100;
  var currentValueClass;
  effectValue.value = 100;
  var effects = {
    chrome: {
      min: 0,
      max: 1,
      setFilter: function (value) {
        return `grayscale(${value})`
      }
    },
    sepia: {
      min: 0,
      max: 1,
      setFilter: function (value) {
        return `sepia(${value})`
      }
    },
    marvin: {
      min: 0,
      max: 100,
      setFilter: function (value) {
        return `invert(${value}%)`
      }
    },
    phobos: {
      min: 0,
      max: 3,
      setFilter: function (value) {
        return `blur(${value}px)`
      }
    },
    heat: {
      min: 1,
      max: 3,
      setFilter: function (value) {
        return `brightness(${value})`
      }
    },
    none: {
      min: 0,
      max: 0,
      setFilter: function () {
        return `none`
      }
    }
  };

// Функция скрывает ползунок насыщенности фильра
  function hideScaleField() {
    scaleField.classList.add('hidden');
  }

//Функция показывает ползунок насыщенности фильтра
  function showScaleField() {
    scaleField.classList.remove('hidden');
  }

// Добалвяется класс картинке в соответствии с выбранным эффектом (радио кнопкой), и удаляет класс при выборе другого эффекта
  function addEffectClass(value) {
    if (currentValueClass) {
      scaleImage.classList.remove(currentValueClass);
    }
    scaleImage.classList.add(`effects__preview--${value}`);
    currentValueClass = `effects__preview--${value}`;
  }

// Генерирует число насыщенности эффекта (положение пина)
  function getEffectValue(value, effectName) {
    var currentEffect = effects[effectName];
    return currentEffect.min + value * (currentEffect.max - currentEffect.min) / maxEffectValue;
  }

// Применяет фильтр для изображения с необходимым значением value
  function setPinEffect(effectName) {
    var valueEffect = getEffectValue(effectValue.value, effectName);
    scaleImage.style.filter = effects[effectName].setFilter(valueEffect);
  }

// Устанавливает пин и линию уровня эффекта в соответствии с value
  function setPinsPosition(value) {
    effectValue.value = value;
    scalePin.style.left = `${value}%`;
    scaleLevel.style.width = `${value}%`;
  }

// Обработчик событий при клике на эффекты
  function clickEffectsHandler(evt) {
    if (evt.target === defauleEffect) {
      hideScaleField();
    } else {
      showScaleField();
    }
    addEffectClass(evt.target.value);
    setPinEffect(evt.target.value);
    setPinsPosition(maxEffectValue);
  }

// Функция активации по умолчанию при появлении формы редактирования
  function activateEffect() {
    addEffectClass(defauleEffect.value);
    setPinEffect(defauleEffect.value);
    defauleEffect.checked = 'true';
    hideScaleField();
    for (var i = 0; i < effectsList.length; i++) {
      effectsList[i].addEventListener('click', clickEffectsHandler);
    }
  }

// Диактивация слушателей при закрытие окна редактирования
  function deactivateEffect() {
    for (var i = 0; i < effectsList.length; i++) {
      effectsList[i].removeEventListener('click', clickEffectsHandler);
    }
  }

// Узнаем какой радио баттон выбран в данный момент и получаем его value
  function getRadioCurrent() {
    for (var i = 0; i < effectsList.length; i++) {
      if (effectsList[i].checked) {
        return effectsList[i].value;
      }
    }
  }

// Перетаскивание пина (DragAndDrop Pin)
  function getDragPin() {
    scalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = evt.clientX - scalePin.getBoundingClientRect().left;
      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        var coordsLeft = moveEvt.clientX - startCoords - scaleLine.getBoundingClientRect().left;
        if (coordsLeft < 0) {
          coordsLeft = 0;
        }
        var coordsRight = scaleLine.offsetWidth;
        if (coordsLeft > coordsRight) {
          coordsLeft = coordsRight;
        }
        // scalePin.style.left = Math.round(coordsLeft) + 'px';
        scalePin.style.zIndex = 100;
        setPinsPosition((Math.round((coordsLeft * 100) / scaleLine.offsetWidth)));
        setPinEffect(getRadioCurrent());
      }
      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    })
  }
  getDragPin();

// Валидация формы

  var forms = document.querySelectorAll('.novalidate');
  for (var v = 0; v < forms.length; v++) {
    forms[v].setAttribute('novalidate', true);
  }

  function hasError(field) {
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button' || field.type === 'radio') {
      return;
    }

    // Переводим все элементы, которые ввел пользователь в нижний регистр
    var arrayLowerCase = [];
    var array = hashTagsInput.value.split(' ');
    for (var i = 0; i < array.length; i++) {
      arrayLowerCase[i] = array[i].toLowerCase();
    }

    // Функция проверяет есть ли повторяющиеся записи (нужно улучшить)
    var checkUniqueValues = function (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr.indexOf(arr[i], i + 1) > -1) {
          return false;
        }
      }
      return true;
    };

    if (array.length > 5) {
      return 'Хэштегов должно быть не больше пяти'
    }
    if (!checkUniqueValues(arrayLowerCase)) {
      return 'Хэши не должны повторяться';
    }

    for (var j = 0; j < array.length; ++j) {
      if (array[j] === '#') {
        return 'Хэш-тег не может состоять из одной только решётки. Удалите лишний символ или дополните его.';
      } else if (array[j].charAt(0) !== '#') {
        return 'Хэш-тег ' + array[j] + ' должен начинаться с символа "#".';
      } else if (array[j].slice(1).indexOf('#') !== -1) {
        return 'Хэш-теги ' + array[j] + ' должны быть разделены пробелом.';
      } else if (array[j].length > 20) {
        return 'Максимальная длина одного хэш-тега составляет 20 символов, включая символ "#". Сократите хэш-тег ' + array[j] + '.';
      }
    }

    var validity = field.validity;
    if (validity.valid) {
      return;
    }
    if (validity.valueMissing) return 'Пожалуйста, заполните это поле. Оно обязательное';
    if (validity.typeMismatch) {
      if (field.type === 'email') return 'Пожалуйста, введите верное значение почты';
      if (field.type === 'url') return 'Пожалуйста, введите правильный адрес ссылки';
    }
    if (validity.tooShort) return 'Длинна имени должна быть не менее ' + field.getAttribute('minLength') + ' символов. Вы ввели ' + field.value.length + ' символа.';
    if (validity.tooLong) return 'Длинна имени должна быть не более ' + field.getAttribute('maxLength') + ' символов. Вы ввели ' + field.value.length + ' символа.';
    if (validity.badInput) return 'Пожалуйста, введите число';
    if (validity.stepMismatch) return 'Указано не верное значение';
    if (validity.rangeOverflow) return 'Введенное значение слишком велико';
    if (validity.rangeUnderflow) return 'Введенное значение слишком мало';
    if (validity.patternMismatch) return 'неверный формат';
    return 'Введенное значение не верно';
  }

  function showError(field, error) {
    field.classList.add('error');
    var id = field.id;
    if (!id) return;
    var message = field.form.querySelector('.error-message#error-for-' + id);
    if (!message) {
      message = document.createElement('div');
      message.className = 'error-message';
      message.id = 'error-for-' + id;
      field.parentNode.insertBefore(message, field.previousSibling);
    }
    field.setAttribute('aria-describedby', 'error-for-' + id);
    message.innerHTML = error;
    message.style.display = 'block';
    message.style.visibility = 'visible';
  }

  function removeError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-describedby');
    var id = field.id;
    if (!id) return;
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
  }

  function fieldBlurHandler(evt) {
    if (!evt.target.form.classList.contains('novalidate')) {
      return;
    }
    var error = hasError(evt.target);
    if (error) {
      showError(evt.target, error);
      return;
    }
    removeError(evt.target);
  }

  function submitButtonHandler(evt) {
    if (!evt.target.classList.contains('novalidate')) {
      return;
    }
    var fields = evt.target.elements;
    var error;
    var hasErrors;
    for (var j = 0; j < fields.length; j++) {
      error = hasError(fields[j]);
      if (error) {
        showError(fields[j], error);
        if (!hasErrors) {
          hasErrors = fields[j];
        }
      }
    }
    if (hasErrors) {
      evt.preventDefault();
      hasErrors.focus();
    }
  }


  function addFormValidity() {
    form.addEventListener('submit', submitButtonHandler, false);
    form.addEventListener('blur', fieldBlurHandler, true);
  }

  function removeFormValidity() {
    form.removeEventListener('submit', submitButtonHandler, false);
    form.removeEventListener('blur', fieldBlurHandler, true);
  }
})();