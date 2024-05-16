(function () {
  'use strict';

  let a6 = document.querySelectorAll('nav#menu>ul li:nth-child(6) a')[0];
  let a1 = document.querySelectorAll('nav#menu>ul>li a')[0];

  a6.textContent = 'И';
  a1.textContent = 'Н';

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
