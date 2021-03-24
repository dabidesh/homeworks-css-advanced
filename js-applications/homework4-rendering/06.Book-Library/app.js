const url = 'http://localhost:3030/jsonstore/collections/books/';
let id;
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

  id = editAuthorId.getAttribute('data-id');
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



const mainHTML = `
<button id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="tbody">
      <tr>
      </tr>
    </tbody>
  </table>

  <form id="form">
    <h3>FORM</h3>
    <label>TITLE</label>
    <input type="text" name="title" id="titleId" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" id="authorId" placeholder="Author...">
    <button>Submit</button>
  </form>
  <form id="editForm" style="display: none">
    <h3>Edit FORM</h3>
    <label>TITLE</label>
    <input type="text" name="title" id="editTitleId" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" id="editAuthorId" placeholder="Author...">
    <button>Save</button>
  </form>
`;

document.body.innerHTML = mainHTML;

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
      if (confirm('Are you sure?')) {
        console.log('Deleting ...');
        id = e.target.parentElement.parentElement.getAttribute('data-id');
        await deleteBook(id);
        loadAllBooks();
        form.style.display = 'block';
        editForm.style.display = 'none';
      }
    }
  }
};