'use strict';

var NUMBER_OF_PERSON = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var blockSetup = document.querySelector('.setup');

blockSetup.classList.remove('hidden');
/* // Случайный номер элемента массива
var getRandomNumberOfArray = function (array) {
  return parseInt(Math.random() * array.length, 10);
}; */

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

var wizards = createWizards(NUMBER_OF_PERSON);
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


createSimilarList(wizards);
setupSimilarList.appendChild(createSimilarList(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');
