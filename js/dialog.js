'use strict';
/* TODO

1/ Диалог должен начинать двигаться за курсором мыши при нажатии (mousedown)  ---
на блок .setup-user-pic;

2/ Диалог должен переставать двигаться за курсором мыши при отпускании    ----
(mouseup) кнопки мыши и оставаться на новом месте;

3/ При повторном открытии/закрытии диалога, положение диалога должно сбрасываться
на изначальное; ----
*/
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = document.querySelector('.setup-user-pic');
  var upload = document.querySelector('.upload');

  var dialogHandlerMousedownHandler = function (evt) {
    evt.preventDefault();
    /* clickedElement = evt.target;
    clickedElement = evt.currentTarget;
    console.log(clickedElement); */

    /* var startPopupCoordinate = {
      x: setupDialogElement.offsetLeft,
      y: setupDialogElement.offsetTop
    }; */
    if (evt.currentTarget.className === 'setup-user-pic') {
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
        dialogHandler.removeEventListener('mousemove', MouseMoveHandler);
        dialogHandler.removeEventListener('mouseup', MouseUpHandler);

        if (dragged) {
          var сlickPreventDefaultHandler = function (evtPrevent) {
            evtPrevent.preventDefault();
            upload.removeEventListener('click', сlickPreventDefaultHandler);
          };
          upload.addEventListener('click', сlickPreventDefaultHandler);
        }
      };
      dialogHandler.addEventListener('mousemove', MouseMoveHandler);
      dialogHandler.addEventListener('mouseup', MouseUpHandler);
    }
  };
  upload.addEventListener('mousedown', dialogHandlerMousedownHandler, true);
  dialogHandler.addEventListener('mousedown', dialogHandlerMousedownHandler, true);
})();
