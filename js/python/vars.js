// @ts-nocheck
let p = console.log;

vars.onchange = () => {
//vars.onclick = () => {

  let str = vars.value
    .trim()
    .replace(/\./g, '')
    .replace(/\+/g, '')
    .toLowerCase()
    .replace(/\s{2,}/g, ' ')
    .replace(/\s/g, '_');
  //.slice(0, -1);

  out.value = str;

  p(str);

  copyE();
};

document.querySelector('button').addEventListener('click', () => {
  copyE(out);
});

const copyE = () => {
  out.select();
  navigator.clipboard.writeText(out.value).then(function () {
    p('Copying to clipboard was successful!');
  }, function (err) {
    console.error('Could not copy text: ', err);
  });
};

clear.onclick = () => {
  vars.value = '';
  out.value = '';
}

py.onclick = () => {
  out.value = out.value + '.py';
  copyE();
}

nulli.onclick = () => {
  out.value = out.value + ' = 0';
  copyE();
}
