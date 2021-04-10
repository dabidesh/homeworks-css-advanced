// ==UserScript==
// @name         ppBoxWork
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  за обучение
// @author       dabidabidesh
// @include      *
// @grant        none
// ==/UserScript==

// function slides is writen by JoeSimmons
// @downloadURL    https://userscripts-mirror.org/scripts/source/41369.user.js
// @updateURL      https://userscripts-mirror.org/scripts/source/41369.meta.js

(function () {
  'use strict';

  function test2(event) {
    pole1.value = window.event.target //window.getSelection()
  }

  function mishOver(event) {

    //pole1.value= 'over'
    pole1.value = window.event.target.nodeName
  }
  function mishOut(event) {

    //pole1.value= 'out'
    pole1.value = window.event.target.nodeName
  }


  function alerto(event) {
    //alert('alerto: '+event.button);  //target

    pole1.value = 'ееее'

    var doyou = confirm("Че редактираш ли? Опасно е!");
    if (doyou == true) {
      alert("Уредувачот е активиран !");
      document.body.contentEditable = "true";
      document.designMode = "on";

      //добавя текст към бутона
      //buton.appendChild(document.createTextNode('акт.'))
      buton.innerHTML = 'акт.'
      return true;
    } else {
      document.body.contentEditable = "false";
      document.body.designMode = "off";

      buton.innerHTML = 'дезакт.'
    }
  }

  function mishDolu(event) {
    mishDoluFlag = true
    mishX = event.clientX
    mishY = event.clientY
    //за да не го обработва
    event.stopPropagation()
    event.preventDefault()
  }
  function mishMesti(event) {

    pole1.value = window.event.target.nodeName //

    if (!mishDoluFlag) return

    dmishX = event.clientX - mishX
    dmishY = event.clientY - mishY
    mishX = event.clientX
    mishY = event.clientY
    frag.style.top = (frag.offsetTop + dmishY) + 'px'
    frag.style.left = (frag.offsetLeft + dmishX) + 'px'
  }

  function mishGore(event) {
    mishDoluFlag = false
  }

  var mishX, mishY, dmishY, dmishX
  var mishDoluFlag = false

  var body = document.getElementsByTagName('body')[0]

  //createDocumentFragment()
  var frag = document.createElement('div')
  frag.style.position = 'fixed'
  frag.style.zIndex = '99999'
  frag.style.right = '10px'
  frag.style.top = '10px'
  frag.style.color = '#ffffff'
  frag.style.background = '#000000'
  frag.style.opacity = '0.6'
  frag.style.border = '1px solid red'
  frag.style.width = '150px'
  frag.style.height = '150px'
  //frag.style.= '';
  //frag.appendChild(document.createTextNode(' ['));

  //frag.addEventListener('keypress', bind(translit.alarma, translit), true);

  var kapa = document.createElement('div')
  kapa.appendChild(document.createTextNode('шапка'))
  frag.appendChild(kapa)

  var kont = document.createElement('div')
  kont.appendChild(document.createTextNode(' Дълъг текст без p'))

  var pole1 = document.createElement('input')
  pole1.type = 'text'
  pole1.value = 'поле1'
  //pole1.style.display= 'inline-block'
  pole1.style.width = '95%'
  pole1.style.maxWidth = '100%'
  pole1.style.color = '#000'
  pole1.style.backgroundColor = '#fff'
  kont.appendChild(pole1)

  var buton = document.createElement('button')
  buton.type = 'button'
  buton.value = 'тест'
  //buton.style.bacground= 'transparent'
  buton.appendChild(document.createTextNode('тест 1'))

  buton.style.width = '99%'
  buton.style.color = '#000'
  buton.style.backgroundColor = '#fff'
  /*buton.addEventListener('click', function(){
  
  alert(this.onclick)
  }
  , false)   //bubbling
  */
  //test2
  buton.addEventListener('click', alerto, false)


  kont.appendChild(buton)

  var buton2 = document.createElement('button')
  buton2.type = 'button'
  buton2.value = 'смени'
  //buton.style.bacground= 'transparent'
  buton2.appendChild(document.createTextNode('смени 1'))

  buton2.style.width = '99%'
  buton2.style.color = '#000'
  buton2.style.backgroundColor = '#fff'
  /*buton.addEventListener('click', function(){
  
  alert(this.onclick)
  }
  , false)   //bubbling
  */
  //test2
  buton2.addEventListener('click', slides, false)


  kont.appendChild(buton2)


  frag.appendChild(kont);

  body.insertBefore(frag, body.firstChild);
  //input.parentNode.insertBefore(frag, input); //next input.

  frag.addEventListener('mousedown', mishDolu, false)
  body.addEventListener('mousemove', mishMesti, false)
  body.addEventListener('mouseup', mishGore, false)

  //body.addEventListener('mouseover', mishOver, false)
  //body.addEventListener('mouseout', mishOut, false)



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
    '': '',


    ///////////////////////////////////////////////////////
    '': ''
  };




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
})();