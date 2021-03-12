const url = 'http://localhost:3030/jsonstore/collections/books/';
const request = async (endpoint, options) => {
  const response = await fetch(endpoint, options);
  if (response.ok != true) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const createBook = async (e) => {
  e.preventDefault();
  if (titleId.value == '' || authorId.value == '') {
    console.log('Fields must be non empty');
    alert('Fields must be non empty');
    return;
  }
  const book = { title: titleId.value, author: authorId.value };

  const result = await request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  loadAllBooks();

  form.reset();

  return result;
};

const editBook = async (e) => {
  e.preventDefault();

  if (editTitleId.value == '' || editAuthorId.value == '') {
    console.log('Fields must be non empty');
    alert('Fields must be non empty');
    return;
  }

  const id = editAuthorId.getAttribute('data-id');
  const book = { title: editTitleId.value, author: editAuthorId.value };

  const result = await request(url + id, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  loadAllBooks();
  form.style.display = 'block';
  editForm.style.display = 'none';

  editForm.reset();

  return result;
};

const deleteBook = async (id) => {
  const result = await request(url + id, {
    method: 'delete',
  });
  return result;
};

const createRow = ([id, book]) => {
  return `
<tr data-id="${id}">
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>
    <button class="editBtn">Edit</button>
    <button class="deleteButton">Delete</button>
  </td>
</tr>`;
};

const loadAllBooks = async () => {
  const books = await request(url);
  const rows = Object.entries(books).map(createRow).join('');
  tbody.innerHTML = rows;
};

loadBooks.onclick = loadAllBooks;
form.onsubmit = (e) => createBook(e);
editForm.onsubmit = (e) => editBook(e);
tbody.onclick = async (e) => {
  if (e.target.tagName == 'BUTTON') {

    if (e.target.textContent == 'Edit') {
      form.style.display = 'none';
      editForm.style.display = 'block';

      editTitleId.value = e.target.parentElement.parentElement.querySelectorAll('td')[0].textContent;

      editAuthorId.value = e.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;

      editAuthorId.setAttribute('data-id', e.target.parentElement.parentElement.getAttribute('data-id'));

    } else {
      console.log('Deleting ...');
      id = e.target.parentElement.parentElement.getAttribute('data-id');
      await deleteBook(id);
      loadAllBooks();
      form.style.display = 'block';
      editForm.style.display = 'none';
    }
  }
};
