/* window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module; */
//const ks = require('node-key-sender');
//const robot = require("robotjs");

// Type "Hello World".
//robot.typeString("Hello World");

main.onclick = (e) => {
  if (e.target.tagName == 'BUTTON' && e.target.id != "showInputsButtonId") {
    const inputEl = e.target.nextSibling.nextSibling;
    copyId(inputEl);
    //const text = e.target.nextSibling.nextSibling.value;
    //await ks.sendText(text);
    //ks.sendText('34');
    //ks.sendKeys(['a', 'b', 'c']);
    //robot.typeString(text);
  }
};
function copyId(el) {
  el.select();
  document.execCommand('copy');
}

const showInputs = () => {
  const style = window.getComputedStyle(input);
  const width = style.getPropertyValue('width');
  if (width == '1px') {
    [...document.querySelectorAll('input, textarea')].forEach(e => {
      e.style.width = 'auto';
    });
  }
  else {
    [...document.querySelectorAll('input, textarea')].forEach(e => {
      e.style.width = '1px';
    });
  }
};

