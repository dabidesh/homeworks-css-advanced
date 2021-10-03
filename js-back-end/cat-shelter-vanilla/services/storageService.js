const PATH = __dirname + '/';
const db = require('../db.json');
const fs = require('fs/promises');  //'fs/promises'
const fst = require('fs');

const nextId = () => {
  let id;
  do {
    id = ('0000000000' + (Math.random() * 9999999999 | 0).toString(16)).slice(-10);
  }
  while (db.cats[id] != undefined);

  return id;
}

const saveCat = async (cat) => {
  const id = nextId();
  cat.id = id;
  /* let obj = {};
  obj[id] = cat; */
  delete cat.breedN;
  cat.delete = false;
  db.cats.push(cat);

  //console.log(db);

  let result = JSON.stringify(db, '', 2);

  // fs.writeFileSync('./db.json', result, {
  //     encoding: "utf8",
  // });

  return fs.writeFile('./db.json', result);
};

const addBreed = async (breed) => {

  db.breeds.push(breed.breedN);

  let result = JSON.stringify(db, '', 2);

  return fs.writeFile('./db.json', result);
};

const getAllCats = async () => {
  fst.readFile(PATH + '../db.json', 'utf8', (err, data) => {
    if (err) throw err;
    //console.log(JSON.parse(data).cats);
    return data;
  });
};

const generatePage = async (obj, content, title, headerPlus) => {
  /* res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fst.readFile('../views/main.html', 'utf8', (err, result) => {
    if (err) {
      res.statusCode = 404;
      return res.end();
    } */
  if (headerPlus == undefined) headerPlus = '';
  let result = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
  <link rel="stylesheet" href="/styles/site.css">
  <link rel="icon" type="image/x-icon" href="/images/pawprint.ico" />
  <title>${title}</title>
</head>

<body>
  <header>
    <nav>
      <ul class="navigation">
        <li><a ${(obj.home) ? 'class="active"' : ''} href="/">Home Page</a></li>
        <li><a ${(obj.newHome) ? 'class="active"' : ''} href="/new-home">Adopted</a></li>
        <li><a ${(obj.addBreed) ? 'class="active"' : ''} href="/cats/add-breed">Add Breed</a></li>
        <li><a ${(obj.add) ? 'class="active"' : ''} href="/cats/add-cat">Add Cat</a></li>
      </ul>
      <a href="/db-show" >Show database</a> || <a href="/br" >In textarea</a> || <a href="/db" >(download)</a>
    </nav>
    ${headerPlus}
  </header>

  <main>
    ${content}
  </main>

  <script src="/js/script.js"></script>
</body>

</html>
  `;

  /* result = result.replace('{{{content}}}', content);
  result = result.replace('{{{title}}', title); */

  return result;
  // });
};

const storageService = {
  saveCat,
  getAllCats,
  generatePage,
  addBreed
};

module.exports = storageService;