// ==UserScript==
// @name         invert-video
// @namespace    https://rekontra.net/
// @version      0.0.1
// @description  Just invert video and back again!
// @author       dabidabidesh
// @match        *
// @include      *
// @noframe
// @grant        none
// ==/UserScript==

(function () {
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
  const html = `
  <div id="videoId">
    <button>P</button>
  </div>
  `;
  const styleBbDiv = `
  #videoId {
    position: fixed;
    bottom: 10px;
    right: 10px;
    opacity: 0.8;
    background-color: #000;
    color: #fff;
    z-index: 2147483647 !important;
  }
  #videoId button {
    padding: 0;
    background-color: green;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
  video {
    z-index: 5 !important;
  }
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  let styleElementDiv = document.createElement('style');
  styleElementDiv.innerHTML = styleBbDiv;
  document.body.appendChild(styleElementDiv);

  let style = document.createElement("style");
  style.innerHTML = css;
  let style0 = document.createElement("style");

  const switchStyle = () => {
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
      fullscreen.click();
  };

  const vButton = document.querySelector('#videoId button');
  vButton.onclick = () => switchStyle();
  vButton.click();

  document.body.appendChild(style);
})();