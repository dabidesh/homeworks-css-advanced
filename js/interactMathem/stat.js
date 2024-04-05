'use strict';
// @ts-nocheck
let p = console.log;

window.onload = () => {
  general();
};

let arrayOrder = [];
let sum = 0;
let averageValue = 0;
let mode = [];
let len = 0;
let median = 0;


getStat.onclick = () => {
  arrayOrder = inputData.value.split(',')
    .filter(x => x != '.' && x != 'и')
    .map(Number);

  sum = arrayOrder.reduce((acc, curr) => acc + curr, 0);
  len = arrayOrder.length;
  averageValue = sum / len;

  p(arrayOrder, sum, averageValue);

  arrayOrder = arrayOrder.sort((a, b) => a - b);

  const counts = {};

  arrayOrder.forEach(element => {
    counts[element] = (counts[element] || 0) + 1;
  });

  let maxCount = Math.max(...Object.values(counts));

  mode = Object.keys(counts).filter(key => counts[key] === maxCount).map(Number);

  if (len % 2 == 0) {
    median = (arrayOrder[(len / 2) - 1] + arrayOrder[len / 2]) / 2;
  } else {
    median = arrayOrder[Math.trunc(len / 2)];
  }

  p(arrayOrder, `мода:${mode}`, `медиана:${median}`, `ср. ст.:${averageValue}`, `len:${len}`);
};
