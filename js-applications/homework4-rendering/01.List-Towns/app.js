import { html, render } from '../node_modules/lit-html/lit-html.js';

const updateTowns = (townsArray) => {
  const result = listTemplate(townsArray);
  render(result, root);
};

const listTemplate = (data) => html`
<ul>
  ${data.map(t => html`<li>${t}</li>`)}
</ul>
`;

btnLoadTowns.onclick = (e) => {
  e.preventDefault();
  const townsArray = towns.value
    .split(/\s*,\s*/)
    .filter(e => e !== '');
  updateTowns(townsArray);
};
