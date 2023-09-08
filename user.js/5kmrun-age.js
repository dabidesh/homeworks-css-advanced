// ==UserScript==
// @name         5kmrun-age
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Show position by age achievement!
// @author       dabidesh
// @match        https://5kmrun.bg/5kmrun/result/*
// @icon         https://www.google.com/s2/favicons?domain=5kmrun.bg
// @grant        none
// ==/UserScript==

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

  let colNoElements = colAchievement.map(function (i) {
    return i == 'Няма' ? '-' : parseFloat(i);
  });

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
