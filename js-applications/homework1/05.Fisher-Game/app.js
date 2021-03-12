function attachEvents() {
  'use strict';

  if (!sessionStorage.getItem('token')) {
    guest.style.display = 'inline-block';
    logged.style.display = 'none';
  } else {
    guest.style.display = 'none';
    logged.style.display = 'inline-block';

    addCatchBtn.disabled = false;
    formAdd.onsubmit = async (e) => {
      e.preventDefault();

      const angler = anglerId.value;
      let weight = weightId.value;
      const species = speciesId.value;
      const location = locationId.value;
      const bait = baitId.value;
      let captureTime = captureTimeId.value;

      [weight, captureTime] = [+weight, +captureTime];

      if (angler == '' || isNaN(weight) || weight <= 0 || species == '' ||
        location == '' || bait == '' || !Number.isInteger(captureTime) || captureTime <= 0) {
        alert('Invalid fields!');
        return;
      }

      formAdd.reset();

      registerNewCatch({ angler, weight, species, location, bait, captureTime });
    };

    document.getElementById('logged').addEventListener('click', () => {
      sessionStorage.clear();
    });
  }

  document.querySelector('.load').addEventListener('click', loadAllCatches);
}

attachEvents();

async function loadAllCatches() {
  catches.innerHTML = '';
  const response = await fetch('http://localhost:3030/data/catches');
  const data = await response.json();

  Object.values(data).forEach(d => {
    const div = document.createElement('div');
    div.classList.add('catch');
    div.innerHTML = `
      <label>Angler</label>
      <input type="text" class="angler" value="${d.angler}" />
      <hr>
      <label>Weight</label>
      <input type="number" class="weight" value="${d.weight}" />
      <hr>
      <label>Species</label>
      <input type="text" class="species" value="${d.species}" />
      <hr>
      <label>Location</label>
      <input type="text" class="location" value="${d.location}" />
      <hr>
      <label>Bait</label>
      <input type="text" class="bait" value="${d.bait}" />
      <hr>
      <label>Capture Time</label>
      <input type="number" class="captureTime" value="${d.captureTime}" />
      <hr>
      <button disabled class="update">Update</button>
      <button disabled class="delete">Delete</button>`;

    if (d._ownerId == sessionStorage.getItem('id')) {
      div.querySelector('.update').disabled = false;
      div.querySelector('.delete').disabled = false;

      div.querySelector('.update').addEventListener('click', async (event) => {
        const children = event.target.parentNode.children;

        const angler = children[1].value;
        const weight = +children[4].value;
        const species = children[7].value;
        const location = children[10].value;
        const bait = children[13].value;
        const captureTime = +children[16].value;

        if (angler == '' || isNaN(weight) || weight <= 0 || species == '' ||
          location == '' || bait == '' || !Number.isInteger(captureTime) || captureTime <= 0) {
          alert('Invalid fields!');
          return;
        }

        updateCatch(d._id, { angler, weight, species, location, bait, captureTime });
      });

      div.querySelector('.delete').addEventListener('click', async () => {
        if (confirm('Do you want to delete your catch?')) {
          deleteCatch(d._id);
        }
      });
    }

    catches.appendChild(div);
  });
}

async function registerNewCatch(newCatch) {
  await fetch('http://localhost:3030/data/catches', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'X-Authorization': `${sessionStorage.getItem('token')}` },
    body: JSON.stringify(newCatch)
  });

  loadAllCatches();
}

async function updateCatch(id, updatedCatch) {
  await fetch('http://localhost:3030/data/catches/' + id, {
    method: 'put',
    headers: { 'Content-Type': 'application/json', 'X-Authorization': `${sessionStorage.getItem('token')}` },
    body: JSON.stringify(updatedCatch)
  });

  loadAllCatches();
}

async function deleteCatch(id) {
  await fetch('http://localhost:3030/data/catches/' + id, {
    method: 'delete',
    headers: { 'X-Authorization': `${sessionStorage.getItem('token')}` }
  });

  loadAllCatches();
}