p = console.log;
button.onclick = () => {
  let arr = document.getElementById('inn').value.split('\n');
  //console.log(arr);
  let str = arr.map(e => `'${e}',`).join('\n');
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

button1.onclick = () => {
  let arr = document.getElementById('in1').value.split('\n');
  let str = arr.map(e => {
    e = e.trim();
    let tmpArr = e.split(' ');
    if (tmpArr[0] === '') {
      return;
    } else {
      return `'${tmpArr[0]}': '${tmpArr[1]}',`;
    }
  }).join('\n');
  let elOut = document.getElementById('out1');
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