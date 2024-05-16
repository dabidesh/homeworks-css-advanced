(function () {
  'use strict';

  let table = document.getElementsByTagName('table')[0];

  let colAchievement = [];
  let colPositions = [];

  if (table) {
    let rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
      let cell = rows[i].cells[6];
      if (cell) {
        colAchievement.push(cell.querySelector('div').textContent);
      }
      let cellP = rows[i].cells[0];
      if (cellP) {
        colPositions.push(cellP.querySelector('div').textContent);
      }
    }
  }

  let colNumbers = colAchievement.map(function (i) {
    return i == 'Няма' ? 0 : parseFloat(i);
  });

  let colNumbersCopy = colNumbers.slice();

  colNumbersCopy = colNumbersCopy.map(function (i) {
    return i == 0 ? '-' : i;
  });

  let sorted = colNumbers.sort((a, b) => b - a);

  for (let i = 0; i < colPositions.length; i++) {
    let index = sorted.indexOf(colNumbersCopy[i]);
    if (index == -1) {
      colPositions[i] = colPositions[i] + '(-)';
    } else {
      colPositions[i] = colPositions[i] + '(' + Number(index + 1) + ')';
    }
  }

  if (table) {
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
      let cellP = rows[i].cells[0];
      if (cellP) {
        cellP.querySelector('div').textContent = colPositions[i - 1];
      }
    }
  }

})();
