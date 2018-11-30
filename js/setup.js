'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NUMBER_OF_PERSON = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var blockSetup = document.querySelector('.setup');

// Случайный номер элемента массива
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min - 1)) + min;
};

// функция возращает случайное качество из массива
var getRandomItemOfArray = function (array) {
  return array[getRandomInteger(0, array.length)];
};
// Функция возращает случайную комбинацию имя и фамилия или на оборот
var getPersonName = function (names, surnames) {
  var randomName = getRandomItemOfArray(names);
  var randomSurname = getRandomItemOfArray(surnames);
  return (Math.random() > 0.5) ? randomName + ' ' + randomSurname : randomSurname + ' ' + randomName;
};
// Функция создает объектт с магами
var createWizards = function (numberOfPerson) {
  var wizards = [];

  for (var i = 0; i < numberOfPerson; i++) {
    var someNameAndSurname = getPersonName(WIZARD_NAMES, WIZARD_SURNAMES);
    var someCoat = getRandomItemOfArray(COAT_COLORS);
    var someEyesColor = getRandomItemOfArray(EYES_COLOR);

    wizards.push({
      name: someNameAndSurname,
      coatColor: someCoat,
      eyesColor: someEyesColor
    });
  }
  return wizards;
};

var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTamplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTamplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarList = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};
var wizards = createWizards(NUMBER_OF_PERSON);
createSimilarList(wizards);
setupSimilarList.appendChild(createSimilarList(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = blockSetup.querySelector('.setup-close');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = document.querySelector('.setup-fireball-wrap');

var wizardCoatClickHandler = function () {
  wizardCoat.style.fill = getRandomItemOfArray(COAT_COLORS);
};

var wizardEyesClickHandler = function () {
  wizardEyes.style.fill = getRandomItemOfArray(EYES_COLOR);
};

var fireballClickHandler = function () {
  fireballColor.style.backgroundColor = getRandomItemOfArray(FIREBALL_COLORS);
};

var setupOpenClickHandler = function () {
  openPopup();
};

var setupCloseClickHandler = function () {
  closePopup();
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

setupOpen.addEventListener('click', setupOpenClickHandler);

var ClosePopupEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var openPopupEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

setupOpen.addEventListener('keydown', openPopupEnterPressHandler);

var closePopup = function () {
  blockSetup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
  wizardCoat.removeEventListener('click', wizardCoatClickHandler);
  wizardEyes.removeEventListener('click', wizardEyesClickHandler);
  fireballColor.removeEventListener('click', fireballClickHandler);
  setupClose.removeEventListener('click', setupCloseClickHandler);
  setupClose.removeEventListener('keydown', ClosePopupEnterPressHandler);
};

var openPopup = function () {
  blockSetup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  fireballColor.addEventListener('click', fireballClickHandler);
  setupClose.addEventListener('click', setupCloseClickHandler);
  setupClose.addEventListener('keydown', ClosePopupEnterPressHandler);
};

var userNameInput = blockSetup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
