import { cats } from './catSeeder.js';  //  cats as catsData

const catCardTemplate = (cat) => `
  <li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
      <button class="showBtn">Show status code</button>
      <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
      </div>
    </div>
  </li>
`;

const toggleInfo = (e) => {
  if (e.target.tagName == 'BUTTON') {
    const elementDiv = e.target.nextSibling.nextSibling;
    const style = window.getComputedStyle(elementDiv);
    const display = style.getPropertyValue('display');
    elementDiv.style.display = (display == "block") ? 'none' : 'block';
    e.target.textContent =
      ((display == "block") ? 'Show' : 'Hide') + ' status code';
  }
};

allCats.onclick = toggleInfo;

//@click = ${togleInfo}
const catsList = `
<ul>${cats.map(catCardTemplate)}</ul>
`;
//render(catsList, allCats);
allCats.insertAdjacentHTML('beforeend', catsList);