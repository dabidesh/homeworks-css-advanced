p = console.log;
button.onclick = () => {
  let n = +varsId.value;
  let str = '';
  for (let i = 0; i < n; i++) {
    str += 'let ';
    for (let j = 0; j < n; j++) {
      str += `a${i}a${j}, `;
    }
    str = str.slice(0, -2);
    str += ';\n';
  }

  let elOut = document.getElementById('out');
  elOut.value = str;
  elOut.select();
  document.execCommand('copy');
};

button0.onclick = () => {
  let arr = document.getElementById('in0').value.split('\n');
  let str = arr.map(e => `'${e}': '${e}',`).join('\n');
  let elOut = document.getElementById('out0');
  elOut.value = str;
  elOut.select();
  document.execCommand('copy');
};

window.onclick = (e) => {
  //e.preventDefault();
  if (e.target.textContent == 'C') {
    e.target.parentElement.previousElementSibling.value = '';
  }
};

varsSelectId.onchange = () => {
  varsId.value = varsSelectId.value;
};