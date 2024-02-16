// @ts-nocheck
let p = console.log;
const MAX_BIN = 0xf;
let randomBinString;
let randomBinArray = [];
let expressionBinToDec = '';
let collectableArrayBinToDec = [];

generateElementsAndPositions.onclick = () => {
  let positions = Number(positionsId.value);
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
};

getDigitsButton.onclick = () => {
  for (let i = 0; i < randomBinString.length; i++) {
    inputElement = document.createElement('input');
    digitsIdp.appendChild(inputElement);
    inputElement.id = 'elementDigit' + i.toString();
    inputElement.type = 'number';
    inputElement.value = randomBinArray[i];
  }
};

window.onload = start = () => {
  randomBinString = randomBinId.value = parseInt(Math.random() * MAX_BIN).toString(2);
  restoreCopy.click();
  let len = randomBinString.length;
  for (let i = 0; i < len; i++) {
    randomBinArray[i] = randomBinString[i];
  }

  console.log(randomBinArray);

  for (let i = 0, j = len - 1; i < len; i++, j--) {
    expressionBinToDec += `${randomBinString[i]}*2^${j}+`;
  }
  expressionBinToDec = expressionBinToDec.substring(0, expressionBinToDec.length - 1);
  collectableArrayBinToDec = expressionBinToDec.split('+');
  p(expressionBinToDec, collectableArrayBinToDec);
  return expressionBinToDec;
};

getRandomBin.onclick = () => {
  randomBinId.value = parseInt(Math.random() * 0xffff).toString(2);
  restoreCopy.click();
  let exp = start();
  p('exp:', exp);
};

restoreCopy.onclick = () => {
  randomBinEditableCopyId.value = randomBinId.value;
};

//expressionBinToDecId.onchange =
verifyBinToDecButton.onclick = () => {
  let str = expressionBinToDecId.value;
  str = str.split('').filter(e => e != ' ').join('');
  if (str == expressionBinToDec) {
    p('Да!');
  } else {
    p('Не!');
  }
  p(str);
};
