let flag = false;

let css = `
video, img, canvas, svg {
    filter: invert(98%) contrast(90%);
}
body {
    background-color: #ddd;
    color: #111;
}
`;

let css0 = `
video, img, canvas, svg {
    filter: invert(0);
}
`;

const html = `
  <div id="videoId" onmouseleave="rangeDiv.style.display='none'">
    <button id="vButton"
    onmouseover="rangeDiv.style.display='block'">P</button>
  <div id="rangeDiv">
  <label for="rangeHueRotate">hue-rotate<br />
        [0<input type="range" id="rangeHueRotate"
        value="100" min="0" max="360"
          oninput="xId.value=parseInt(rangeHueRotate.value)" />360]
      </label>
      <button id="minusId" class="butForRange"
      onmousedown="if (xId.value>0)
      {rangeHueRotate.value--;xId.value--;}">
        --
      </button>
      <label for="xId">
        <output id="xId" name="x" for="rangeHueRotate">100</output> hue
      </label>
      <button id="plusId" class="butForRange"
      onmousedown="if (xId.value<360)
      {rangeHueRotate.value++;xId.value++;}">
        ++
      </button>
  </div>
  </div>
  `;

const styleBbDiv = `
  #videoId {
    position: fixed !important;
    left: 10px;
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
    document.querySelector('html.r666').style = `
      filter: hue-rotate(0deg)`;
    flag = false;
  }
};

vButton.onclick = (e) => {
  //e.preventDefault(); // e.stopPropagation();
  rangeDiv.style.display = 'block';
  switchStyle();
};

window.oncontextmenu = (e) => {
  //e.preventDefault();
  switchStyle();
};

rangeHueRotate.onchange = () => {
  document.querySelector('html.r666').style =
    `filter: hue-rotate(${rangeHueRotate.value}deg)`;
};

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
