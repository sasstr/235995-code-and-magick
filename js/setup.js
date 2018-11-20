'use strict';

var NUMBER_OF_PERSON = 4;
var WizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var blockSetup = document.querySelector('.setup');

blockSetup.classList.remove('hidden');
// функция возращает случайное качество из массива
var randomQuality = function (array) {
  return array[parseInt(Math.random() * array.length, 10)];
};
// Функция возращает случайную комбинацию имя и фамилия или на оборот
var getPersonName = function (names, surnames) {
  var randomName = randomQuality(names);
  var randomSurname = randomQuality(surnames);
  return (Math.random() > 0.5) ? randomName + ' ' + randomSurname : randomSurname + ' ' + randomName;
};
// Функция создает объектт с магами
var createWizards = function () {
  var wizards = [];

  for (var i = NUMBER_OF_PERSON; i > 0; i--) {
    var someNameAndSurname = getPersonName(WizardNames, WizardSurnames);
    var someCoat = randomQuality(coatColors);
    var someEyesColor = randomQuality(eyesColor);

    wizards.push({
      name: someNameAndSurname,
      coatColor: someCoat,
      eyesColor: someEyesColor
    });
  }
  return wizards;
};

var randomWizards = createWizards();
var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTamplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (randomMagicians) {
  var wizardElement = similarWizardTamplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = randomMagicians.name;
  wizardElement.querySelector('.wizard-coat').style.fill = randomMagicians.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = randomMagicians.eyesColor;

  return wizardElement;
};

var createSimilarList = function (randomMagicians) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < randomMagicians.length; j++) {
    fragment.appendChild(renderWizard(randomMagicians[j]));
  }
  setupSimilarList.appendChild(fragment);
};

createSimilarList(randomWizards);
document.querySelector('.setup-similar').classList.remove('hidden');
