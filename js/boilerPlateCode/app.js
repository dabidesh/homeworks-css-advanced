button.onclick = () => {
  let arr = document.getElementById('in').value.split('\n');
  //console.log(arr);
  let str = arr.map(e => `${e}: req.body.${e}.trim(),`).join('\n');
  let elOut = document.getElementById('out');
  elOut.value = str;
  elOut.select();
  document.execCommand('copy');
};
