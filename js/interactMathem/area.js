// @ts-nocheck
let p = console.log;

getCoordinates.onclick = () => {
  let arrayCoordinates = inputCoordinates.value
    .split('')
    .filter(x => x != ';' && x != ' ' && x != ',' && x != 'A' && x != 'B' && x != 'C' &&
      x != 'D' && x != 'и' && x != '(' && x != ')' && x != 'А' && x != '.');

  for (let i = 0; i < arrayCoordinates.length; i++) {
    if (arrayCoordinates[i] == '-') {
      arrayCoordinates[i + 1] = '-' + arrayCoordinates[i + 1];
    }
  }
  arrayCoordinates = arrayCoordinates
    .filter(x => x != '-');

  p(arrayCoordinates);

  let x1 = +arrayCoordinates[0];
  let y1 = +arrayCoordinates[1];
  let x2 = +arrayCoordinates[2];
  let y2 = +arrayCoordinates[3];
  let x3 = +arrayCoordinates[4];
  let y3 = +arrayCoordinates[5];
  let x4 = +arrayCoordinates[6];
  let y4 = +arrayCoordinates[7];

  let area;

  if (arrayCoordinates.length == 8) {
    area = 0.5 * Math.abs(
      x1 * y2 + x2 * y3 + x3 * y4 + x4 * y1 -
      x2 * y1 - x3 * y2 - x4 * y3 - x1 * y4
    );
  } else if (arrayCoordinates.length == 6) {
    area = 0.5 * Math.abs(
      x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)
    );
  }
  p(area);

};
