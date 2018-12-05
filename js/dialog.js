'use strict';
/*TODO 

1/ Диалог должен начинать двигаться за курсором мыши при нажатии (mousedown)  ---
на блок .setup-user-pic;

2/ Диалог должен переставать двигаться за курсором мыши при отпускании    ----
(mouseup) кнопки мыши и оставаться на новом месте;

3/ При повторном открытии/закрытии диалога, положение диалога должно сбрасываться 
на изначальное; ----
*/
(function () {
var setupDialogElement = document.querySelector('.setup');
var dialogHandler = setupDialogElement.querySelector('.setup-user-pic');

dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
    x: evt.clientX,
    y: evt.clientY
    };

    var dragged = false;

    var MouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
    };

    setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
    setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    };

    var MouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', MouseMoveHandler);
    document.removeEventListener('mouseup', MouseUpHandler);

    if (dragged) {
        var сlickPreventDefaultHandler = function (evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', сlickPreventDefaultHandler);
        };
        dialogHandler.addEventListener('click', сlickPreventDefaultHandler);
    }
  };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
});
})();