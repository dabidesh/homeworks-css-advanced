// <![CDATA[
// ==UserScript==
// @name           replaceTextWithButton
// @namespace      bradata@kaputer
// @description    Тестове
// @include        *
// @version        0.1
// @license        none
// @grant          none
// ==/UserScript==

// function slides is writen by JoeSimmons
// @downloadURL    https://userscripts-mirror.org/scripts/source/41369.user.js
// @updateURL      https://userscripts-mirror.org/scripts/source/41369.meta.js

//:TODO: оптимизиране за скорост

(function () {

  //ф-и от менюто
  function editorOn() {
    document.body.contentEditable = "true";
    document.designMode = "on";
  }
  function editorOff() {
    document.body.contentEditable = "false";
    document.designMode = "off";
  }
  function windowStatus() {
    //alert(window.status)
  }
  function enbgdictS() {
    var elem = document.getElementById('engbgdict-window')
    elem.style.display = 'none'
    dump(elem.style.display)
  }
  function retCss() {
    frag.style.color = '#ffffff';
    frag.style.background = '#000000';
  }
  //
  // събития
  //
  function mishDolu(event) {
    mishX = event.clientX
    mishY = event.clientY

    flagDolu = true
    //не се обработва после
    event.stopPropagation()
    event.preventDefault()
  }
  function mishMesti(event) {
    if (flagDolu) {
      dmishX = event.clientX - mishX
      dmishY = event.clientY - mishY
      mishX = event.clientX
      mishY = event.clientY
      frag.style.top = (frag.offsetTop + dmishY) + 'px'
      frag.style.left = (frag.offsetLeft + dmishX) + 'px'
    }
    //frag.style.top= (event.clientY-frag.offsetTop) + 'px'
    //frag.style.left= (event.clientX-frag.offsetLeft) + 'px'
  }
  function mishGore(event) {
    if (flagDolu) flagDolu = false
  }

  function mishOver(event) {
    //взима обекта
    var o = ((event.target) ? event.target : event.srcElement)
    var pos = {}
    var wh = {}
    var leftX = 0
    var leftY = 0

    wh.y = window.getComputedStyle(o, null).getPropertyValue("width")
    wh.x = window.getComputedStyle(o, null).getPropertyValue("height")

    while (o.offsetParent) { //'undefined'->false
      leftX += o.offsetLeft
      leftY += o.offsetTop
      o = o.offsetParent
    }
    pos.x = leftX
    pos.y = leftY

    //GM_log(pos.x+'-'+pos.y)
    input.value = pos.x + '-' + pos.y + 'w=' + wh.x + 'x' + wh.y
  }
  function ppBoxMinMax() {
    if (flagMax) {
      kont.style.display = 'none'
      flagMax = false
    }
    else {
      kont.style.display = 'block'
      flagMax = true
    }
  }


  //
  //глобални променливи
  //
  var mishX, mishY, dmishY, dmishX
  //елементи към които има прикрепени действия
  var frag, input, input1, input2, minButon, kont
  var flagDolu = false
  var flagMax = true
  var body = document.getElementsByTagName('body')[0];  //колко бодита ?
  //
  //

  //стартова точка
  function init() {

    //създава елементи
    frag = document.createElement('div');  //createDocumentFragment()
    var divStyle = "\
border: 2px solid green ! important;\
-moz-border-radius: 5px;\
-webkit-border-radius: 5px;\
margin: 0;\
color: #ffffff ! important;\
background: #000000 ! important;\
"
    frag.setAttribute("style", divStyle)

    frag.style.display = 'block';
    frag.style.float = 'none';
    frag.style.clear = 'both';
    frag.style.overflow = 'hidden'; // scroll;
    frag.style.position = 'fixed';
    frag.style.zIndex = '99999'
    frag.style.left = '2px';
    frag.style.top = '2px';
    frag.style.opacity = '0.6';
    frag.style.width = '200px'

    var kapa = document.createElement('div');
    divStyle = "\
border: 1px solid green;\
-moz-border-radius: 5px;\
-webkit-border-radius: 5px;\
cursor: move;\
margin: 0;\
"
    kapa.setAttribute("style", divStyle)
    kapa.style.display = 'block';
    kapa.style.float = 'none';
    kapa.style.clear = 'both';
    kapa.style.overflow = 'hidden';
    kapa.style.width = '100%';

    //създава елемент и го прикрепя
    minButon = document.createElement('span');
    divStyle = "\
background: #00ff00;\
color: #ff0000;\
border: 1px solid green;\
-moz-border-radius: 5px;\
-webkit-border-radius: 5px;\
cursor: pointer;\
margin: 0;\
"
    minButon.setAttribute("style", divStyle)
    minButon.appendChild(document.createTextNode('|||'))
    kapa.appendChild(minButon);
    //


    kapa.appendChild(document.createTextNode('влачи'))
    frag.appendChild(kapa);

    kont = document.createElement('div')
    kont.style.display = 'block';
    kont.style.float = 'none';
    kont.style.clear = 'both';
    kont.style.overflow = 'hidden';
    kont.style.width = '100%';
    kont.appendChild(document.createTextNode('пар'))

    input = document.createElement('input')
    input.type = 'text'
    input.value = 'тест'

    input.style.width = '100%'
    kont.appendChild(input)

    input1 = document.createElement('input')
    input1.type = 'text'
    input1.value = ''
    input1.placeholder = 'начална'

    input1.style.width = '100%'
    kont.appendChild(input1)

    input2 = document.createElement('input')
    input2.type = 'text'
    input2.value = ''
    input2.placeholder = 'крайна'

    input2.style.width = '100%'
    kont.appendChild(input2)


    var buton = document.createElement('button')
    buton.type = 'button'
    buton.value = 'тест'

    buton.style.width = '50%'
    //buton.style.bacground= 'transparent'

    buton.appendChild(document.createTextNode('Тури'))

    buton.addEventListener('click', addWords, false)

    kont.appendChild(buton)

    var buton1 = document.createElement('button')
    buton1.type = 'button'
    //buton1.value= 'тест'

    buton1.style.width = '50%'
    //buton.style.bacground= 'transparent'
    buton1.appendChild(document.createTextNode('Смени'))

    buton1.addEventListener('click', slides, false)

    kont.appendChild(buton1)

    //buton1.addEventListener('click', slides, false)

    frag.appendChild(kont);

    //body.insertBefore(frag, body.firstChild)
    body.appendChild(frag)
    //input.parentNode.insertBefore(frag, input); //next input.

    kapa.addEventListener('mousedown', mishDolu, false)
    minButon.addEventListener('click', ppBoxMinMax, false)
    body.addEventListener('mousemove', mishMesti, false)
    body.addEventListener('mouseup', mishGore, false)
    body.addEventListener('mousedown', windowStatus, false)
    body.addEventListener('mouseover', mishOver, false)
    //keypress
    //body.addEventListener('keypress', klavPress, false)

    GM_registerMenuCommand("Редактор включ r ", editorOn, "r", "shift alt", "ю")
    GM_registerMenuCommand("Редактор изкл t ", editorOff, "t", "shift alt", "з")
    GM_registerMenuCommand("Ключ за enbgdict e ч", enbgdictS, "e", "shift alt", "ч")
    GM_registerMenuCommand("Връща си стилът", retCss)

    GM_registerMenuCommand("", retCss)

    //dump('Писане в конзолата')
    GM_log('Зареди се', 0)        //0 - info, 1 - warning, 2 - error.
    GM_getValue("Стартира", false);
  }//init

  function addWords() {
    words[input1.value] = input2.value
  }

  /*
          NOTE:
              You can use \\* to match actual asterisks instead of using it as a wildcard!
              The examples below show a wildcard in use and a regular asterisk replacement.
      */
  //var t;
  //var interv=10000;
  var words = {
    ///////////////////////////////////////////////////////


    // Syntax: 'Search word' : 'Replace word',
    //'your a' : 'you\'re a',
    //'imo' : 'in my opinion',
    //'im\\*o' : 'matching an asterisk, not a wildcard',
    //'/\\bD\\b/g' : '[D]',
    'Пламен': 'Чарли',    //'':'',
    '100': 'сто',


    ///////////////////////////////////////////////////////
    '': ''
  };

  //alert(words['Пламен'])

  words['Пацаев'] = 'Ч'

  //alert(words)

  //t= window.setInterval(slides, interv);

  //////////////////////////////////////////////////////////////////////////////
  // This is where the real code is
  // Don't edit below this
  //////////////////////////////////////////////////////////////////////////////

  var regexs = [], replacements = [],
    tagsWhitelist = ['PRE', 'BLOCKQUOTE', 'CODE', 'INPUT', 'BUTTON', 'TEXTAREA'],
    rIsRegexp = /^\/(.+)\/([gim]+)?$/,
    word, text, texts, i, userRegexp;


  function slides() {

    delete words['']; // so the user can add each entry ending with a comma,
    // I put an extra empty key/value pair in the object.
    // so we need to remove it before continuing

    // convert the 'words' JSON object to an Array
    for (word in words) {
      if (typeof word === 'string' && words.hasOwnProperty(word)) {
        userRegexp = word.match(rIsRegexp);

        // add the search/needle/query
        if (userRegexp) {
          regexs.push(
            new RegExp(userRegexp[1], 'g')
          );
        } else {
          regexs.push(
            new RegExp(prepareRegex(word).replace(/\\?\*/g, function (fullMatch) {
              return fullMatch === '\\*' ? '*' : '[^ ]*';
            }), 'g')
          );
        }

        // add the replacement
        replacements.push(words[word]);
      }
    }

    // do the replacement
    texts = document.evaluate('//body//text()[ normalize-space(.) != "" ]', document, null, 6, null);
    for (i = 0; text = texts.snapshotItem(i); i += 1) {
      if (isTagOk(text.parentNode.tagName)) {
        regexs.forEach(function (value, index) {
          text.data = text.data.replace(value, replacements[index]);
        });
      }
    }
  }

  // prepareRegex by JoeSimmons
  // used to take a string and ready it for use in new RegExp()
  function prepareRegex(string) {
    return string.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, '\\$1');
  }

  // function to decide whether a parent tag will have its text replaced or not
  function isTagOk(tag) {
    return tagsWhitelist.indexOf(tag) === -1;
  }

  //старт
  window.addEventListener('load', init, true)
})();

// ]]>




