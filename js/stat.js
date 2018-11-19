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
var GRADIENT_COLOR = '#CAEBFE';
var BASELINE = 'hanging';

window.renderStatistics = function (ctx, names, times) {
  // Функция которая возращает лучший результат игры
  var getBestResult = function () {
    return Math.max.apply(null, times);
  };
  var maxResult = getBestResult(times);

  // Поучаем цвет гистограмы других игроков или своей.
  var getPlayerBarColor = function (name) {
    return (name === 'Вы') ? BAR_MY_COLOR : 'hsla(235, 100%, ' + Math.random() * 100 + '% , 1)';
  };

  // Функция рисует гистограмы игроков их имена и результаты
  var drawPlayerBars = function () {
    var nextCoordinateX = 155;

    for (var i = 0; i < times.length; i++) {
      var playerHeightBar = Math.round((times[i] / maxResult) * BAR_GRAPH_HEIGHT);
      var nextCoordinateY = TEXT_SPACE + BAR_GRAPH_HEIGHT - playerHeightBar;

      drawBlock(nextCoordinateX, nextCoordinateY, BAR_GRAPH_WIDTH, playerHeightBar, getPlayerBarColor(names[i]));
      drawText(FONT, BASELINE, Math.round(times[i]), nextCoordinateX, (nextCoordinateY - GAP * 2));
      drawText(FONT, BASELINE, names[i], nextCoordinateX, (CLOUD_HEIGHT - GAP));

      nextCoordinateX += BAR_GAP + BAR_GRAPH_WIDTH;
    }
  };

  // Функция рисует облако
  var drawBlock = function (x, y, width, height, fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
  };

  // Функция рисует текст
  var drawText = function (font, baseline, text, x, y) {
    ctx.font = font;
    ctx.textBaseline = baseline;
    ctx.strokeText(text, x, y);
  };

  var gradient = ctx.createRadialGradient(238, 50, 10, 238, 50, 300);
  gradient.addColorStop(0, BACKGROUND_COLOR);
  gradient.addColorStop(1, GRADIENT_COLOR);
  var textSecondLineY = TEXT_LINE_Y + GAP * 2;

  drawBlock(CLOUD_COORDINATE_X + GAP, CLOUD_COORDINATE_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  drawBlock(CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, CLOUD_WIDTH, CLOUD_HEIGHT, gradient);
  drawText(FONT, BASELINE, FIRST_LINE_TEXT, TEXT_LINE_X, TEXT_LINE_Y);
  drawText(FONT, BASELINE, SECOND_LINE_TEXT, TEXT_LINE_X, textSecondLineY);
  drawPlayerBars(times);
};
