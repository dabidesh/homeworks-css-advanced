'use strict';
// @ts-nocheck
let p = console.log;

getExpressions.onclick = () => {

  let str = inputComplexNumbers.value;
  let arrayComplexNumbers = [];
  for (let i = 0, j = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i])) && str[i - 1] != 'z' || str[i] == '-') {
      arrayComplexNumbers[j] = str[i];
      while (!isNaN(parseInt(str[i + 1]))) {
        arrayComplexNumbers[j] += str[i + 1];
        i++;
      }
      j++;
    }
  }

  p(arrayComplexNumbers);

  let z1 = '(' + arrayComplexNumbers[0].toString() + '+' + '(' +
    arrayComplexNumbers[1].toString() + ')' + 'i)';
  let z2 = '(' + arrayComplexNumbers[2].toString() + '+' + '(' +
    arrayComplexNumbers[3].toString() + ')' + 'i)';
  let z3 = '(' + arrayComplexNumbers[4].toString() + '+' + '(' +
    arrayComplexNumbers[5].toString() + ')' + 'i)';

  p(z1, z2);

  outZ1Z2MinusZ1PlusZ2.value = z1 + '*' + z2 + '-' + '(' + z1 + '+' + z2 + ')';
  outZ1Z2MinusZ1PlusZ2.style.width = outZ1Z2MinusZ1PlusZ2.value.length + 'ch';
  outZ1DivideZ2.value = z1 + '/' + z2;
  outZ1DivideZ2.style.width = outZ1DivideZ2.value.length + 'ch';
  outZ1MultipleZ2MultipleZ3.value = z1 + '*' + z2 + '*' + z3;
  outZ1MultipleZ2MultipleZ3.style.width = outZ1MultipleZ2MultipleZ3.value.length + 'ch';
};

main.onclick = (e) => {
  //preventDefault(e);
  if (e.target.tagName == 'BUTTON' && e.target.classList.contains('copy')) {
    const inputEl = e.target.previousElementSibling;
    copyId(inputEl);
  }
};

function copyId(el) {
  el.select();
  document.execCommand('copy');
}

window.onload = () => {
  general();
};
