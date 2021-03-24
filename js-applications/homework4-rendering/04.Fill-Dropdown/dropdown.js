import { html, render } from '../node_modules/lit-html/lit-html.js';

const selectTemplate = (list) => html`
<select id="menu">
  ${list.map(e => html`<option value=${e._id}>${e.text}</option>`)}
</select>
`;

//let list = [];
const endpoint = 'http://localhost:3030/jsonstore/advanced/dropdown';
const main = document.querySelector('div');
const inputElement = document.getElementById('itemText');
initialize();

async function initialize() {
  document.querySelector('form')
    .addEventListener('submit', (e) => addItem(list, e));


  const response = await fetch(endpoint);
  const data = await response.json();
  //  local cash
  const list = Object.values(data);

  update(list);
}

function update(list) {
  const result = selectTemplate(list);
  render(result, main);
}


async function addItem(list, e) {
  e.preventDefault();

  const item = {
    text: inputElement.value
  };
  const response = await fetch(endpoint, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  const result = await response.json();
  list.push(result);
  update(list);
}