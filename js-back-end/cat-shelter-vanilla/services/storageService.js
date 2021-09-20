const PATH = __dirname + '/';
const db = require('../db.json');
const fs = require('fs/promises');  //'fs/promises'
const fst = require('fs');

const saveCat = (cat) => {
  db.cats.push(cat);

  //console.log(db);

  let result = JSON.stringify(db, '', 2);

  // fs.writeFileSync('./db.json', result, {
  //     encoding: "utf8",
  // });

  return fs.writeFile('./db.json', result);

};

const getAllCats = async () => {
  fst.readFile(PATH + '../db.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
  });
}

const storageService = {
  saveCat,
  getAllCats
};

module.exports = storageService;