let flag = false;

let css = `
html {
    filter: invert(98%) contrast(90%) hue-rotate(100deg);
}
body {
    background-color: #ddd;
    color: #111;
}
`;
const html = `
  <div id="videoId" onmouseleave="rangeDiv.style.display='none'">
    <button id="vButton" onmouseover="rangeDiv.style.display='block'">P</button>
  <div id="rangeDiv">
  <label for="rangeHueRotate">hue-rotate<br />
        [0<input type="range" id="rangeHueRotate" value="100" min="0" max="360"
          oninput="xId.value=parseInt(rangeHueRotate.value)" />360]
      </label>
      <button id="minusId" class="butForRange" onmousedown="if (xId.value>0) {rangeHueRotate.value--;xId.value--;}">
        --
      </button>
      <label for="xId">
        <output id="xId" name="x" for="rangeHueRotate">100</output> hue
      </label>
      <button id="plusId" class="butForRange" onmousedown="if (xId.value<360) {rangeHueRotate.value++;xId.value++;}">
        ++
      </button>
  </div>
  </div>
  `;
const styleBbDiv = `
  #videoId {
    position: fixed;
    left: 10px;
    top: 60px;
    opacity: 0.8;
    background-color: #aaa;
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
  #videoId button:hover {
    cursor: pointer;
  }
  /* #rangeHueRotate {
    rotate: 90deg;
    width: 360px;
  } */
`;

document.body.insertAdjacentHTML('beforeend', html);
let styleElementDiv = document.createElement('style');
styleElementDiv.innerHTML = styleBbDiv;
document.body.appendChild(styleElementDiv);

const element = document.querySelector('html');
element.classList.add('r666');

let style = document.createElement("style");
style.innerHTML = css;

const switchStyle = () => {
  if (flag == false) {
    style = document.createElement("style");
    document.body.appendChild(style);
    style.innerHTML = css;
    flag = true;
  } else {
    style.remove();
    flag = false;
    //document.querySelector('html.r666').style =
    //'filter: invert(0) contrast(0) hue-rotate(0)';
  }
};

vButton.onclick = (e) => {
  e.preventDefault();
  rangeDiv.style.display = 'block';
  switchStyle();
};

rangeHueRotate.onchange = () => {
  document.querySelector('html.r666').style =
    `filter: invert(98%) contrast(90%) hue-rotate(${rangeHueRotate.value}deg)`;
};

window.onclick = (event) => {
  const element = event.target;
  if (element.id != 'videoId' && element.id != 'rangeDiv' &&
    element.id != 'rangeHueRotate' && element.id != 'plusId' && element.id != 'minusId' &&
    element.id != 'plusId' && element.id != 'xId' && element.id != 'vButton') {
    rangeDiv.style.display = 'none';
  }
};
