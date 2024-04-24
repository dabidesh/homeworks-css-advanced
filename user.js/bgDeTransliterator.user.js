// ==UserScript==
// @name         bgDeTransliterator
// @namespace    https://rekontra.net/
// @version      0.01
// @description  DeTransliterator for Bulgaria!
// @author       dabidabidesh
// @include      *
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const monkeyObj = {
    'Sht': 'Щ',
    'SHt': 'Щ',
    'sht': 'щ',
    'SHT': 'Щ',
    'ch': 'ч',
    'Ch': 'Ч',
    'Sh': 'Ш',
    'Yu': 'Ю',
    'Zh': 'Ж',
    'CH': 'Ч',
    'sh': 'ш',
    'sH': 'ш',
    'SH': 'Ш',
    'yu': 'ю',
    'ya': 'я',
    'ja': 'я',
    'IU': 'Ю',
    'zh': 'ж',
    'ZH': 'Ж',
    'ts': 'ц',
    'Ts': 'Ц',
    'a': 'а',
    'b': 'б',
    'v': 'в',
    'w': 'в',
    'g': 'г',
    'd': 'д',
    'e': 'е',
    'z': 'з',
    'i': 'и',
    'j': 'й',
    'k': 'к',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'п',
    'r': 'р',
    's': 'с',
    't': 'т',
    'u': 'у',
    'f': 'ф',
    'h': 'х',
    'c': 'ц',
    '4': 'ч',
    '6': 'ш',
    '1': 'ь',
    'y': 'ъ',
    'x': 'ь',
    'q': 'я',
    'A': 'А',
    'B': 'Б',
    'V': 'В',
    'W': 'В',
    'G': 'Г',
    'D': 'Д',
    'E': 'Е',
    'Z': 'З',
    'I': 'И',
    'J': 'Й',
    'K': 'К',
    'L': 'Л',
    'M': 'М',
    'N': 'Н',
    'O': 'О',
    'P': 'П',
    'R': 'Р',
    'S': 'С',
    'T': 'Т',
    'U': 'У',
    'F': 'Ф',
    'H': 'Х',
    'C': 'Ц',
    'Y': 'Ъ',
    'X': 'Ь',
    'Q': 'Я',
    'шод': 'сход',
    'Шод': 'Сход',
    'шем': 'схем',
    'Шем': 'Схем'
  };

  let flagReplace = false;

  const html = `
  <div id="deTranslitText">
  </div>
  <button id="deTranslitTextButton">дТ<button>
  `;

  const styleTranslit = `
  #deTranslitText {
    position: fixed;
    display: none;
    left: 10px;
    top: 50%;
    opacity: 0.8;
    width: 300px;
    height: 200px;
    overflow: auto;
    background-color: #000;
    color: #fff;
    z-index: 999999;
  }
  #deTranslitTextButton {
    position: fixed;
    display: none;
  }
`;

  //const htmlElement = document.querySelector('html');
  document.body.insertAdjacentHTML('beforeend', html);
  let styleElementDiv = document.createElement('style');
  styleElementDiv.innerHTML = styleTranslit;
  const headElement = document.querySelector('head');
  headElement.appendChild(styleElementDiv);

  const monkeyFunction = (monkeyString) => {
    monkeyString = monkeyString.replace(new RegExp('6t', 'g'), 'щ');
    for (let [key, value] of Object.entries(monkeyObj)) {
      monkeyString = monkeyString.replace(new RegExp(key, 'g'), value);
    }
    return monkeyString;
  };

  const replaceSelectedText = (e) => {

    console.log(e.clientX, e.clientY);

    deTranslitTextButton.style.left = e.clientX + 'px';
    deTranslitTextButton.style.top = e.clientY + 'px';
    deTranslitTextButton.style.display = 'block';

    var sel, range;
    if (window.getSelection) {

      //console.log(window.getSelection());
      //return;
      let text = window.getSelection().toString();
      if (text == '') return;
      text = monkeyFunction(text);
      sel = window.getSelection();
      if (sel.rangeCount) {
        if (flagReplace) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(text));
          unselect();
        } else {
          if (!deTranslitText) {
            document.body.insertAdjacentHTML('beforeend', html);
          }
          deTranslitText.textContent = text;
          deTranslitText.style.display = 'block';
        }
        //divId.focus();
      }
    } else if (document.selection && document.selection.createRange) {
      let text;
      if (flagReplace) {
        text = document.selection.createRange().text;
        text = monkeyFunction(text);
        range = document.selection.createRange();
        range.text = text;
        unselect();
      } else {
        if (!deTranslitText) {
          document.body.insertAdjacentHTML('beforeend', html);
        }
        deTranslitText.textContent = text;
        deTranslitText.style.display = 'block';
      }
    }
  };

  function unselect() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Хромиум
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        //Файърфокс
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      // Експлодър
      document.selection.empty();
    }
  }
  const textAlert = () => {
    alert('Тр');
  };
  const init = () => {
    document.addEventListener('mouseup', replaceSelectedText);
    //GM_registerMenuCommand(nameAlert, textAlert);
    /* document.body.insertAdjacentHTML('beforeend', html);
    let styleElementDiv = document.createElement('style');
    styleElementDiv.innerHTML = styleTranslit;
    const headElement = document.querySelector('head');
    headElement.appendChild(styleElementDiv); */
  };

  const deTranslitTextNone = () => {
    deTranslitText.style.display = 'none';
  };

  window.addEventListener('load', init, true);

  deTranslitText.onclick = deTranslitTextNone;
})();