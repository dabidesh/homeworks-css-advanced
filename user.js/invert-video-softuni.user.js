// ==UserScript==
// @name         invert-video-softuni
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Invert video for softuni by clicking right button!
// @author       dabidesh
// @match        https://softuni.bg/*/video/64609/*
// @icon         https://www.google.com/s2/favicons?domain=softuni.bg
// @grant        none
// @noframe
// ==/UserScript==

(function() {
    'use strict';

    let flag = false;

  let css = `
video, img, canvas, svg {
    filter: invert(95%) contrast(80%);
}
`;
  let css0 = `
video, img, canvas, svg {
    filter: invert(0);
}
`;

  let style = document.createElement("style");
  style.innerHTML = css;
  let style0 = document.createElement("style");

  window.oncontextmenu = () => {
    if (flag == false) {
      style = document.createElement("style");
      document.body.appendChild(style);
      style0.remove();
      style.innerHTML = css;
      flag = true;
    } else {
      style0 = document.createElement("style");
      document.body.appendChild(style0);
      style.remove();
      style0.innerHTML = css0;
      flag = false;
    }
  };

})();