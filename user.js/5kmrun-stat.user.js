// ==UserScript==
// @name         5kmrun-stat
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Create graphics for each year in user stat page for 5kmrun!
// @author       dabidesh
// @match        https://5kmrun.bg/5kmrun/user/*
// @icon         https://www.google.com/s2/favicons?domain=5kmrun.bg
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const html = `
  <div class="stat-div">
    <button>P</button>
  </div>
  `;
  const styleStatDiv = `
  .stat-div {
    border: 1px solid red;
  }
  `;

  let tables = document.getElementsByTagName('table');

  let firstTable = tables[0];
  console.log(firstTable);

  const parentDiv = firstTable.parentNode.parentNode;
  console.log(parentDiv);
  parentDiv.insertBefore(html, firstTable);

})();
