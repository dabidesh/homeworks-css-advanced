const updateTowns = (townsArray) => {
  const result = listTemplate(townsArray);
  root.insertAdjacentHTML('beforeend', result);
};

const listTemplate = (data) => `
<ul>
  ${data.map(t => `<li>${t}</li>`)}
</ul>
`;

btnLoadTowns.onclick = (e) => {
  e.preventDefault();
  const townsArray = towns.value
    .split(',')
    .map(a => a.trim())
    .filter(e => e !== '');
  updateTowns(townsArray);
};
