'use strict';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var BACKGROUND_COLOR = 'rgba(256, 256, 256, 1)';
var CLOUD_COORDINATE_X = 100;
var CLOUD_COORDINATE_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FIRST_LINE_TEXT = 'Ура вы победили!';
var SECOND_LINE_TEXT = 'Список результатов';
var FONT = '16px PT Mono';
var BAR_GRAPH_HEIGHT =  150;
var BAR_GRAPH_WIDTH = 40;
var BAR_MY_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_GAP = 50;
var GAP = 10;

var renderStatistics = function (ctx, names, times) {
// Функция которая возращает лучший результат игры
var getBestResult = function (times) {
  return Math.max.apply(null, times);
};
var maxResult = getBestResult(times);

//  Функция возращает массив с высотами гистограмм игроков пропорционально их времени игры
var playerHeightBar = times.map( function (item, i, times) {
  return Math.round((item / maxResult) * BAR_GRAPH_HEIGHT);
});

// Функция возращает координату Y гистограммы игрока
var getBarStartCoordinateY = function (heightDifference) {
  return (100 + heightDifference);
};

// Поучаем цвет гистограмы других игроков или своей.
var getPlayerBarColor = function (name) {
  return (name ==='Вы') ? BAR_MY_COLOR : 'hsla(235, 100%, '+ Math.random() * 100 +'% , 1)';
};


    // Функция рисует гистограмы игроков их имена и результаты
  var drawPlayerBar = function(playerHeightBar) {

    var nextCoordinateX = 155;
    var heightDifference = BAR_GRAPH_HEIGHT;

    for (var i = 0; i < playerHeightBar.length; i++) {
      heightDifference -= playerHeightBar[i];
      var nextCoordinateY = getBarStartCoordinateY(heightDifference);

      ctx.fillStyle = getPlayerBarColor(names[i]);
      ctx.fillRect(nextCoordinateX, nextCoordinateY, BAR_GRAPH_WIDTH, playerHeightBar[i]);

      ctx.font = FONT;
      ctx.textBaseline = "hanging";
      ctx.strokeText(Math.round(times[i]), nextCoordinateX, (nextCoordinateY-GAP * 2));
      ctx.strokeText(names[i], nextCoordinateX, 260);

      nextCoordinateX += GAP * 9;
      heightDifference = BAR_GRAPH_HEIGHT;
    }
  };

    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(CLOUD_COORDINATE_X+GAP, CLOUD_COORDINATE_Y+GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.font = FONT;
    ctx.textBaseline = "hanging";
    ctx.strokeText(FIRST_LINE_TEXT, 140, 40 );
    ctx.strokeText(SECOND_LINE_TEXT, 140, 60);

    drawPlayerBar(playerHeightBar);
};
