const loadPhonebook = async (e) => {
  e.preventDefault();

  const response = await fetch('http://localhost:3030/jsonstore/phonebook');
  const data = await response.json();

  while (phonebook.firstChild) {
    phonebook.removeChild(phonebook.firstChild);
  }

  Object.values(data).forEach(d => {
    phonebook.insertAdjacentHTML('beforeend', `<li>${d.person}: ${d.phone}
    <button id="${d._id}">DELETE</button></li>`);
  });
};

const deletePhone = async (e) => {
  if (e.target.tagName != 'BUTTON') return;

  const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + e.target.id, {
    method: 'delete'
  });
  e.target.parentElement.remove();
};

const createPhone = async (e) => {
  e.preventDefault();

  contact = { person: person.value, phone: phone.value };
  createForm.reset();

  const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  });
  const data = await response.json();
};
const attachEvents = () => {
  btnLoad.onclick = (e) => loadPhonebook(e);
  phonebook.onclick = (e) => {
    if (confirm('Are you sure?')) {
      deletePhone(e);
    }
  };
  createForm.onsubmit = (e) => createPhone(e);
};

attachEvents();