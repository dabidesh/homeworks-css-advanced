let flag = false;
let oldHueRotate = 0;

let css = `
body * {
    filter: invert(98%) contrast(90%);
}
`;

let css0 = `
body * {
    filter: invert(0) contrast(100%);
}
`;

const html = `
  <div id="videoId">
    <button id="vButton">P</button>
  <div id="rangeDiv">
  <label for="rangeHueRotate">hue-rotate<br />
        [0<input type="range" id="rangeHueRotate"
        value="0" min="0" max="360" />360]
      </label>
      <button id="minusId" class="butForRange">
        --
      </button>
      <label for="xId">
        <output id="xId" name="x" for="rangeHueRotate">0</output> hue
      </label>
      <button id="plusId" class="butForRange">
        ++
      </button>
  </div>
  </div>
  `;

const styleBbDiv = `
  #videoId {
    position: fixed !important;
    left: 0px;
    top: 60px;
    opacity: 0.8;
    background-color: #aaa;
    color: #fff;
    z-index: 2147483647 !important;
  }
  #videoId button {
    padding: 0;
    background-color: green !important;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
  #videoId button:hover {
    cursor: pointer;
  }
`;

document.body.insertAdjacentHTML('beforeend', html);
let styleElementDiv = document.createElement('style');
styleElementDiv.innerHTML = styleBbDiv;
document.body.appendChild(styleElementDiv);

const element = document.querySelector('html');
element.classList.add('r666');

/* const vButton = document.getElementById('vButton');
const rangeDiv = document.getElementById('rangeDiv');
const rangeHueRotate = document.getElementById('rangeHueRotate');
const videoId = document.getElementById('videoId');
const xId = document.getElementById('xId');
const plusId = document.getElementById('plusId');
const minusId = document.getElementById('minusId'); */

let style = document.createElement("style");
style.innerHTML = css;
let style0 = document.createElement("style");

const switchStyle = () => {
  rangeDiv.style.display = 'block';
  if (flag == false) {
    style = document.createElement("style");
    document.body.appendChild(style);
    style0.remove();
    style.innerHTML = css;
    document.querySelector('html.r666').style = `
      filter: hue-rotate(${oldHueRotate}deg)`;
    rangeHueRotate.value = oldHueRotate;
    xId.value= oldHueRotate;
    flag = true;
  } else {
    style0 = document.createElement("style");
    document.body.appendChild(style0);
    style.remove();
    style0.innerHTML = css0;
    oldHueRotate = parseInt(rangeHueRotate.value);
    document.querySelector('html.r666').style = `
      filter: hue-rotate(0deg)`;
    rangeHueRotate.value = 0;
    xId.value= 0;
    flag = false;
  }
};

vButton.onclick = (e) => {
  //e.preventDefault(); // e.stopPropagation();
  switchStyle();
};

vButton.onmouseover = (e) => {
  //e.preventDefault();
  rangeDiv.style.display='block';
};

videoId.onmouseleave = (e) => {
  //e.preventDefault();
  rangeDiv.style.display='none';
};

window.oncontextmenu = (e) => {
  //e.preventDefault();
  switchStyle();
};

rangeHueRotate.onchange = () => {
  document.querySelector('html.r666').style =
    `filter: hue-rotate(${rangeHueRotate.value}deg)`;
  oldHueRotate = rangeHueRotate.value;
  xId.value = oldHueRotate;
  //xId.value = oldHueRotate = rangeHueRotate.value;  // от дясно на ляво
};

plusId.onmousedown = () => {
  if (xId.value < 360) {
    rangeHueRotate.value++;
    xId.value++;
    document.querySelector('html.r666').style =
      `filter: hue-rotate(${rangeHueRotate.value}deg)`;
    oldHueRotate = rangeHueRotate.value;
  }
}

minusId.onmousedown = () => {
  if (xId.value > 0) {
    rangeHueRotate.value--;
    xId.value--;
    document.querySelector('html.r666').style =
      `filter: hue-rotate(${rangeHueRotate.value}deg)`;
    oldHueRotate = rangeHueRotate.value;
  }
}

window.onclick = (event) => {
  const element = event.target;
  if (element.id != 'videoId' && element.id != 'rangeDiv' &&
    element.id != 'rangeHueRotate' && element.id != 'plusId' &&
    element.id != 'minusId' &&
    element.id != 'plusId' && element.id != 'xId' &&
    element.id != 'vButton') {
    rangeDiv.style.display = 'none';
  }
};
