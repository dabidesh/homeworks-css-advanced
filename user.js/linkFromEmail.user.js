// ==UserScript==
// @name         Link from email
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Insert link from email
// @author       You
// @match        *
// @include      *
// @icon         https://www.google.com/s2/favicons?domain=podove.biz
// @noframe
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let aElements = document.querySelectorAll('a');
  [...aElements].forEach(a => {
    let href = a.href.split(':');
    if (href[0] == 'mailto') {
      //console.log('Имаме имейл');
      let [_, url] = a.href.split('@');
      url = url.split('?');
      a.insertAdjacentHTML('afterend', `<a href="https://${url[0]}"> [link] </a>`);
    }
  });
})();