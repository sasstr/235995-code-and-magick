'use strict';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var BACKGROUND_COLOR = 'rgba(256, 256, 256, 1)';
var CLOUD_COORDINATE_X = 100;
var CLOUD_COORDINATE_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FIRST_LINE_TEXT = 'Ура вы победили!';
var SECOND_LINE_TEXT = 'Список результатов:';
var FONT = '16px PT Mono';
var BAR_GRAPH_HEIGHT = 150;
var BAR_GRAPH_WIDTH = 40;
var BAR_MY_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_GAP = 50;
var GAP = 10;
var TEXT_LINE_X = 140;
var TEXT_LINE_Y = 40;
var TEXT_SPACE = 100;

window.renderStatistics = function (ctx, names, times) {
  // Функция которая возращает лучший результат игры
  var getBestResult = function () {
    return Math.max.apply(null, times);
  };
  var maxResult = getBestResult(times);

  // Функция возращает координату Y гистограммы игрока
  var getBarStartCoordinateY = function (heightDifference) {
    return (TEXT_SPACE + heightDifference);
  };

  // Поучаем цвет гистограмы других игроков или своей.
  var getPlayerBarColor = function (name) {
    return (name === 'Вы') ? BAR_MY_COLOR : 'hsla(235, 100%, ' + Math.random() * 100 + '% , 1)';
  };
  // Функция рисует гистограмы игроков их имена и результаты
  var drawPlayerBars = function () {

    var nextCoordinateX = 155;
    var heightDifference = BAR_GRAPH_HEIGHT;

    for (var i = 0; i < times.length; i++) {
      var playerHeightBar = Math.round((times[i] / maxResult) * BAR_GRAPH_HEIGHT);
      heightDifference -= playerHeightBar;
      var nextCoordinateY = getBarStartCoordinateY(heightDifference);

      ctx.fillStyle = getPlayerBarColor(names[i]);
      ctx.fillRect(nextCoordinateX, nextCoordinateY, BAR_GRAPH_WIDTH, playerHeightBar);

      ctx.font = FONT;
      ctx.textBaseline = 'hanging';
      ctx.strokeText(Math.round(times[i]), nextCoordinateX, (nextCoordinateY - GAP * 2));
      ctx.strokeText(names[i], nextCoordinateX, (CLOUD_HEIGHT - GAP));

      nextCoordinateX += BAR_GAP + BAR_GRAPH_WIDTH;
      heightDifference = BAR_GRAPH_HEIGHT;
    }
  };

  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_COORDINATE_X + GAP, CLOUD_COORDINATE_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.strokeText(FIRST_LINE_TEXT, TEXT_LINE_X, TEXT_LINE_Y);
  ctx.strokeText(SECOND_LINE_TEXT, TEXT_LINE_X, (TEXT_LINE_Y + GAP * 2));

  drawPlayerBars(times);
};
