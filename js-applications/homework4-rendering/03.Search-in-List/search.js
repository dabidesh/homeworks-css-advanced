import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';
// map list of towns to HTML list
// add event listeners (via template)
// on search:
// highlight results
// display number of mathces in output div
// on search:
// pass input value to template
// template decides which elemtn to highlight

const countMatches = (towns, match) => {
  //  && the leftmost false or the latter thruthy value (|| the opposite)
  const matches = towns.filter(t => match && t.toLowerCase()
    .includes(match.toLowerCase())).length;
  return (matches ? matches + ' matches found' : '');
};

const searchTemplate = (towns, match) => html`
<article>
  <div id="towns">
    <ul>
      ${towns.map(t => itemTemplate(t, match))}
    </ul>
  </div>
  <input type="text" id="searchText" .value=${match} />
  <button @click=${search}>Search</button>
  <div id="result">${countMatches(towns, match)}</div>
</article>
`;
//  && the leftmost false or the latter thruthy value
const itemTemplate = (name, match) => html`
<li class=${(match && name.toLowerCase()
    .includes(match.toLowerCase()) ? 'active' : '')}>${name}</li>
`;

const main = document.body;

const update = (match) => {
  if (match == undefined) match = '';
  const result = searchTemplate(towns, match);
  render(result, main);
};

const search = (e) => {
  //querySelector('input')
  //const match = e.target.parentNode.children[1].value;
  const match = searchText.value;
  update(match);
};

update();