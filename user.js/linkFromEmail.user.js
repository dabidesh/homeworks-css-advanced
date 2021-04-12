// ==UserScript==
// @name         Link from email
// @namespace    https://rekontra.net/
// @version      0.1
// @description  Insert link from email
// @author       dabidesh
// @match        *
// @include      *
// @icon         https://www.google.com/s2/favicons?domain=rekontra.net
// @noframe
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let aElements = document.querySelectorAll('a');
  [...aElements].forEach(a => {
    let href = a.href.split(':');
    if (href[0] == 'mailto') {
      let [_, url] = a.href.split('@');
      let [urlClean, __] = url.split('?');
      a.insertAdjacentHTML('afterend', `<a href="https://${urlClean}"> [link ${urlClean}] </a>`);
    }
  });
})();