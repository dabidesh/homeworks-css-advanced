button.onclick = () => {
  let arr = document.getElementById('in').value.split('\n');
  //console.log(arr);
  let str = arr.map(e => `${e}: req.body.${e}.trim(),`).join('\n');
  let elOut = document.getElementById('out');
  elOut.value = str;
  elOut.select();
  document.execCommand('copy');
};

button0.onclick = () => {
  let arr = document.getElementById('in0').value.split('\n');
  let selectName = arr.shift();
  let data = arr.shift();
  console.log(selectName);

  let str = 'let o = {}\n';
  for (let i = 0; i < arr.length; i++) {
    str += `if (req.body.${selectName} == '${arr[i]}') o.${selectName}${arr[i]} = true;\n`;
  }
  let strHBS = '';
  for (let i = 0; i < arr.length; i++) {
    strHBS += `{{#if ${data}.o.${selectName}${arr[i]}}}selected{{/if}}\n`;
  }
  let elOut = document.getElementById('outC');
  elOut.value = str;
  elOut.select();
  document.execCommand('copy');
  document.getElementById('outHBS').value = strHBS;
};
