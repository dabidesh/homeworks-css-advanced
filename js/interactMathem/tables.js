'use strict';
// @ts-nocheck
let p = console.log;

window.onload = () => {
  general();
};

let arrayTable = [];
let rows = [];

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';

  let maxWidth = 0;
  const lines = this.value.split('\n');
  lines.forEach(line => {
    if (line.length > maxWidth) {
      maxWidth = line.length;
    }
  });
  this.style.width = maxWidth + 'ch'; // ch is a CSS unit that represents the width of the "0" character
}

window.addEventListener('DOMContentLoaded', (event) => {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', autoResize, false);
  });
});

getTable.onclick = () => {
  arrayTable = inputData.value.trim().split('\n');
  let p = +len.value;
  let n = arrayTable.length / p;


  let matrix = new Array(n); // create an array with n elements
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(p); // create a sub-array with p elements for each element in the outer array
  }

  let index = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < p; j++) {
      if (index < arrayTable.length) {
        matrix[i][j] = arrayTable[index]; // fill the matrix with values from arrayTable
        index++;
      } else {
        matrix[i][j] = ''; // fill the rest of the matrix with empty strings if arrayTable is exhausted
      }
    }
  }

  let matrixString = matrix.map(row => row.join('  ')).join('\n');  //\t
  outTable.value = matrixString;
  autoResize.call(outTable);
};
