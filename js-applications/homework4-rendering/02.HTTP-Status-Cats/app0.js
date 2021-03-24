import { html, render } from '../node_modules/lit-html/lit-html.js';
// :TODO: until and possibly cash
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { cats } from './catSeeder.js';  //  cats as catsData

//  display: none
//  @click = ${()=>togleInfo(cat)}
const catCardTemplate = (cat) => html`
  <li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
      <button class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
      <div class="status" style="${styleMap(cat.info ? {} : { display: 'none' })}" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
      </div>
    </div>
  </li>
`;

const toggleInfo = (e) => {
  if (e.target.tagName == 'BUTTON') {
    const elementDivId = e.target.nextSibling.nextSibling.id;
    const cat = cats.find(c => c.id == elementDivId);
    cat.info = !cat.info;
    update();
    /* const style = window.getComputedStyle(elementDiv);
    const display = style.getPropertyValue('display');
    elementDiv.style.display = (display == "block") ? 'none' : 'block'; */
  }
};

const update = () => {
  allCats.onclick = toggleInfo;

  //@click = ${togleInfo}
  const catsList = html`
<ul>${cats.map(catCardTemplate)}</ul>
`;
  render(catsList, allCats);
};

cats.forEach(c => c.info = false);
update();