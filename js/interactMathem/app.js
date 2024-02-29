// @ts-nocheck
let p = console.log;
const MAX_BIN = 0xf;
let randomBinString;
let len;
let randomBinArray = [];
let digitsBinArray = [];
let positionsBinArray = [];
let expressionBinToDec = '';
let collectableArrayBinToDec = [];

positionsId.onchange = positionsId.onkeyup =
  generateElementsAndPositions.onclick = () => {
    let positions = Number(positionsId.value);
    if (randomBinString.length !== positions) {
      elementsAndPositionsId.innerHTML = '';
      messageInCorrectPositionsId.innerText = '';
      messageCorrectPositionsId.style.display = 'none';
      messageInCorrectPositionsId.style.display = 'block';
      const node = document.createTextNode('Грешка!');
      messageInCorrectPositionsId.appendChild(node);
      return;
    }

    messageCorrectPositionsId.innerText = '';
    messageCorrectPositionsId.style.display = 'block';
    messageInCorrectPositionsId.style.display = 'none';
    const node = document.createTextNode('Правилно!');
    messageCorrectPositionsId.appendChild(node);

    elementsAndPositionsId.innerHTML = '';
    for (let i = 0; i < positions; i++) {
      inputElement = document.createElement('input');
      elementsAndPositionsId.appendChild(inputElement);
      inputElement.type = 'number';
      inputElement.id = 'elementNumber' + i.toString();
      supElement = document.createElement('sup');
      elementsAndPositionsId.appendChild(supElement);
      inputElement = document.createElement('input');
      supElement.appendChild(inputElement);
      inputElement.type = 'number';
      inputElement.id = 'position' + i.toString();
    }
    elementsAndPositionsId.style.display = 'block';
  };

getDigitsButton.onclick = () => {
  digitsIdp.innerHTML = '';
  for (let i = 0; i < randomBinString.length; i++) {
    inputElement = document.createElement('input');
    digitsIdp.appendChild(inputElement);
    inputElement.id = 'elementDigit' + i.toString();
    inputElement.type = 'number';
    inputElement.value = randomBinArray[i];
  }
  digitsIdp.style.display = 'block';
};

window.onload = start = () => {
  randomBinString = randomBinId.value = parseInt(Math.random() * MAX_BIN).toString(2);
  restoreCopy.click();
  len = randomBinString.length;
  for (let i = 0; i < len; i++) {
    randomBinArray[i] = randomBinString[i];
    digitsBinArray[i] = Number(randomBinString[i]);
    positionsBinArray[i] = len - 1 - i;
  }

  for (let i = 0, j = len - 1; i < len; i++, j--) {
    expressionBinToDec += `${randomBinString[i]}*2^${j}+`;
  }
  expressionBinToDec = expressionBinToDec.substring(0, expressionBinToDec.length - 1);
  collectableArrayBinToDec = expressionBinToDec.split('+');
  p(expressionBinToDec, collectableArrayBinToDec);
  p(digitsBinArray, positionsBinArray);
  return expressionBinToDec;
};

getRandomBin.onclick = () => {
  randomBinId.value = parseInt(Math.random() * MAX_BIN).toString(2);
  restoreCopy.click();
  start();
  let elP = document.querySelectorAll('.display-none');
  elP.forEach(e => e.style.display = 'none');
  positionsId.value = '';
  expressionBinToDecId.value = '';
};

restoreCopy.onclick = () => {
  randomBinEditableCopyId.value = randomBinId.value;
};

elementsAndPositionsId.onkeyup =
  elementsAndPositionsId.onchange = () => {
    let countMatching = 0;
    let countErrors = 0;
    let matchingArray = [];
    for (let i = 0; i < len; i++) {
      matchingArray[i] = 0;
    }
    for (let i = 0; i < len; i++) {
      let digit = eval(`elementNumber${i}.value`);
      let position = eval(`position${i}.value`);
      if (digit == undefined || digit == '') {
        digit = 2;
      } else {
        digit = Number(digit);
      }
      if (position == undefined || position == '') {
        position = 666;
      } else {
        position = Number(position);
      }
      let indexPosition = positionsBinArray.indexOf(position);
      if (indexPosition != -1) {
        if (digit == digitsBinArray[indexPosition]) {
          // have matching?
          matchingArray[indexPosition]++;
          if (matchingArray[indexPosition] == 1) {
            countMatching++;
          } else {
            countErrors++;
          }
        } else {
          countErrors++;
        }
      } else {
        countErrors++;
      }
    }
    if (countMatching == len) {
      messageCorrectMatchingId.innerText = '';
      messageCorrectMatchingId.style.display = 'block';
      messageInCorrectMatchingId.style.display = 'none';
      const node = document.createTextNode('Правилно!');
      messageCorrectMatchingId.appendChild(node);
    } else {
      messageInCorrectMatchingId.innerText = '';
      messageCorrectMatchingId.style.display = 'none';
      messageInCorrectMatchingId.style.display = 'block';
      const node = document.createTextNode(`${countErrors} грешки!`);
      messageInCorrectMatchingId.appendChild(node);
    }
  };

verifyBinToDecButton.onclick =
  expressionBinToDecId.onchange =
  expressionBinToDecId.onkeyup = () => {
    let str = expressionBinToDecId.value;
    let arr = str.split('').filter(e => e != ' ').join('').split('+');
    let countMatching = 0;
    let countErrors = 0;
    let matchingArray = [];
    for (let i = 0; i < len; i++) {
      matchingArray[i] = 0;
    }
    for (let i = 0; i < len; i++) {
      let collectable = arr[i];
      let index = collectableArrayBinToDec.indexOf(collectable);
      if (index != -1) {
        matchingArray[index]++;
        if (matchingArray[index] == 1) {
          countMatching++;
        } else {
          countErrors++;
        }
      } else {
        countErrors++;
      }
    }
    if (countMatching == len) {
      messageCorrectExpressionId.innerText = '';
      messageCorrectExpressionId.style.display = 'block';
      messageInCorrectExpressionId.style.display = 'none';
      const node = document.createTextNode('Правилно!');
      messageCorrectExpressionId.appendChild(node);
    } else {
      messageInCorrectExpressionId.innerText = '';
      messageCorrectExpressionId.style.display = 'none';
      messageInCorrectExpressionId.style.display = 'block';
      const node = document.createTextNode(`${countErrors} грешки!`);
      messageInCorrectExpressionId.appendChild(node);
    }

    /* str = str.split('').filter(e => e != ' ').join('');
    if (str == expressionBinToDec) {
      p('Да!');
    } else {
      p('Не!');
    }
    p(str); */
  };
