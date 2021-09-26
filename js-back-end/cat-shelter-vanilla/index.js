const http = require('http');
//const url = require('url');
const fs = require('fs');
const fsp = require('fs/promises');
//const querystring = require('querystring');
const db = require('./db.json');
//const multipart = require('multipart');
//const querystring = require('qs');

const storageService = require('./services/storageService.js');

const sleepDeep = ms => {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  )
}

const parseBody = (body) => {
  let index =
    body.indexOf('Content-Disposition: form-data; name="name"') + 47;
  let name = '';
  for (let i = index; i < body.length; i++) {
    if (body[i] == '\r') break;
    name += body[i];
  }
  index =
    body.indexOf('Content-Disposition: form-data; name="description"') + 54;
  let description = '';
  for (let i = index; i < body.length; i++) {
    if (body[i] == '\r' && body[i + 1] == '\n' &&
      body[i + 2] == '-') break;
    description += body[i];
  }
  index =
    body.indexOf('Content-Disposition: form-data; name="breed"') + 48;
  let breed = '';
  for (let i = index; i < body.length; i++) {
    if (body[i] == '\r') break;
    breed += body[i];
  }
  index =
    body.indexOf('Content-Disposition: form-data; name="hotLink"') + 50;
  let hotLink = '';
  for (let i = index; i < body.length; i++) {
    if (body[i] == '\r') break;
    hotLink += body[i];
  }
  index =
    body.indexOf('Content-Disposition: form-data; name="upload"; filename="') + 57;
  let filename = '';
  for (let i = index; i < body.length; i++) {
    if (body[i] == '"') break;
    filename += body[i];
  }
  let addLength = filename.length;
  index =
    body.indexOf('Content-Disposition: form-data; name="upload"; filename="') + 87 + addLength;
  let upload = '';
  for (let i = index; i < body.length; i++) {
    if (body[i] == '\r' && body[i + 1] == '\n' &&
      body[i + 2] == '-' && body[i + 3] == '-') break;
    upload += body[i];
  }
  return { name, description, breed, filename, upload, hotLink };
};

async function processPost(request, response, callback) {
  let queryData = '';
  if (typeof callback !== 'function') return null;

  if (request.method == 'POST') {
    request.on('data', function (data) {
      queryData += data;
      if (queryData.length > 1e6) { // change to 2 to trigger 413 page
        queryData = '';
        //response.writeHead(413, { 'Content-Type': 'text/plain' }).end();
        //request.connection.destroy();
        response.writeHead(302, {
          'Location': '/page413'
        });
        response.end();
        request.connection.destroy();
        return;
      }
      console.log(typeof queryData);
      console.log(queryData);
      console.log(parseBody(queryData));
      /* request.on('end', function () {
        request.post = querystring.parse(queryData);
        callback();
      }); */
      request.post = parseBody(queryData);
      callback();
    });
  } else {
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end();
  }
}

const app = http.createServer(async (req, res) => {
  //const pathname = url.parse(req.url).pathname;
  if ((/^\/delete\/.+$/g).test(req.url)) {
    //res.write('delete');
    const path = req.url;
    const id = path.split('/').pop();
    console.log(id);
    console.log(db.cats.filter(c => c.id == id));
    db.cats.filter(c => c.id == id)[0].delete = true;
    console.log(db);

    let result = JSON.stringify(db, '', 2);
    fsp.writeFile('./db.json', result);
    res.writeHead(302, {
      'Location': '/'
    });
    res.end();
    return;
  } else if ((/^\/editCat\/.+$/g).test(req.url)) {
    const path = req.url;
    const id = path.split('/').pop();
    const cat = db.cats.filter(c => c.id == id)[0];
    if (cat == undefined) {
      res.statusCode = 404;
      res.end();
    }
    const editCat = async (post) => {
      cat.name = post.name;
      cat.description = post.description;
      cat.breed = post.breed;
      cat.filename = post.filename;
      cat.upload = post.upload;
      cat.hotLink = post.hotLink;
      let result = JSON.stringify(db, '', 2);
      return fsp.writeFile('./db.json', result);
    };
    if (req.method == 'GET') {
      let breeds = db.breeds.map(x => `
                        <option ${(cat.breed === x) ? 'selected' : ''} value="${x}">${x}</option>
                    `).join('');
      const content = `
        <form action="/editCat/${id}" method="POST" class="cat-form" enctype="multipart/form-data">
          <!-- enctype="multipart/form-data" -->
          <h2>Edit Cat</h2>
          <label for="name">Name</label>
          <input name="name" type="text" id="name" value="${cat.name}" />
          <label for="description">Description</label>
          <textarea name="description" id="description">${cat.description}</textarea>
          <label for="image">Image</label>
          <input name="upload" type="file" id="image" />
          <label for="hotLink">Image hot link</label>
          <input name="hotLink" type="text" id="hotLink" value="${cat.hotLink}"/>
          <label for="group">Breed</label>
          <select name="breed" id="group">
            ${breeds}
          </select>
          <button type="submit">Add Cat</button>
        </form>
        `;
      const title = 'Edit Cat';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const result = await storageService.generatePage(content, title);

      res.write(result);
      res.end();
    } else if (req.method == 'POST') {
      processPost(req, res, async () => {
        try {
          await editCat(req.post);
        } catch (err) {
          console.log('err');
          console.log(err);
        };
        /* res.writeHead(302, {
          'Location': '/',
          'Content-Type': 'text/html'
        });
        res.end(); */
        return;
      });
      res.writeHead(302, {
        'Location': '/',
        'Content-Type': 'text/html'
      });
      res.end();
      return;
    }
  }
  switch (req.url) {
    case '/styles/site.css':
      let css = fs.readFileSync('./styles/site.css');
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(css);
      res.end();
      break;
    case '/home':
      let content = fs.readFileSync('./views/home/index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(content);
      try {
        const result = await storageService.getAllCats();
        console.log(db.cats);
        //console.log('index', db);
        //await sleepDeep(2000);
        /* res.writeHead(302, {
          'Location': '/'
        });
        res.end(); */
      } catch (err) {
        console.log('err');
        console.log(err);
      };
      res.end();
      break;
    case '/': {
      /* let con = fs.readFileSync('./views/home/index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(con); */
      try {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        //const result = await storageService.getAllCats();
        const title = 'Cat Shelter';
        const headerPlus = `
        <h1>Cat Shelter</h1>
        <form action="/search">
          <input type="text">
          <button type="button">Search</button>
        </form>
        `;

        //console.log(db.cats);

        const liCats = (db.cats)
          .filter(c => c.delete != true && c)
          .map(c => `
        <li>
          <img src="${c.hotLink}" alt="${c.name}">
          <h3>${c.name}</h3>
          <p><span>Breed: </span>${c.breed}</p>
          <p><span>Description: </span>${c.description}</p>
          <ul class="buttons">
            <li class="btn edit"><a href="/editCat/${c.id}">Change Info</a></li>
            <li class="btn delete"><a href="/delete/${c.id}">New Home</a></li>
          </ul>
        `).join('');
        const content = `
        <section class="cats">
          <ul>
          ${liCats}
          </ul>
        </section>
        `;
        const result = await storageService.generatePage(content, title, headerPlus);

        res.write(result);
        res.end();
      } catch (err) {
        console.log('err');
        console.log(err);
      };
      res.end();
      break;
    }
    case '/js/script.js':
      let js = fs.readFileSync('./js/script.js');
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.write(js);
      res.end();
      break;
    case '/images/pawprint.ico':
      let ico = fs.readFileSync('./images/pawprint.ico');
      res.writeHead(200, {
        'Content-Type': 'image/x-icon'
      });
      res.write(ico);
      res.end();
      break;
    case '/cats/add-cat':
      if (req.method == 'GET') {
        let breeds = db.breeds.map(x => `
                        <option value="${x}">${x}</option>
                    `).join('');
        const content = `
        <form action="/cats/add-cat" method="POST" class="cat-form" enctype="multipart/form-data">
          <!-- enctype="multipart/form-data" -->
          <h2>Add Cat</h2>
          <label for="name">Name</label>
          <input name="name" type="text" id="name" />
          <label for="description">Description</label>
          <textarea name="description" id="description"></textarea>
          <label for="image">Image</label>
          <input name="upload" type="file" id="image" />
          <label for="hotLink">Image hot link</label>
          <input name="hotLink" type="text" id="hotLink" />
          <label for="group">Breed</label>
          <select name="breed" id="group">
            ${breeds}
          </select>
          <button type="submit">Add Cat</button>
        </form>
        `;
        const title = 'Add Cat';
        const result = await storageService.generatePage(content, title);

        res.write(result);
        res.end();
      } else if (req.method == 'POST') {

        processPost(req, res, async () => {
          try {
            //console.log(typeof req.post);
            //console.log(req.post);
            //console.log(JSON.parse(JSON.stringify(req.post)));
            /* console.log(req.post.upload);
  
            const target = fs.createWriteStream(`./uploads/${req.post.filename}`);
            req.on('connection', (req.post.upload) => console.log('con') );
            req.pipe(target); */

            await storageService.saveCat(req.post);

            //await sleepDeep(2000);

            /* fs.writeFile(`./uploads/${req.post.filename}`, req.post.upload, 'binary', function (err) {
              if (err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            }); */
          } catch (err) {
            console.log('err');
            console.log(err);
          };
          res.writeHead(302, {
            'Location': '/'
          });
          res.end();
        });
      }
      break;
    case '/delete': {  ///.+$
      res.write('delete');
      res.end();
      break;
    }
    case '/page413':
      res.writeHead(413, {
        'Content-Type': 'text/html'
      });
      fs.readFile('./views/page413.html', 'utf8', (err, result) => {
        if (err) {
          res.statusCode = 404;
          return res.end();
        }
        res.write(result);
        res.end();
      });
      /* content = fs.readFileSync('./views/page413.html');
      res.writeHead(413, {
        'Content-Type': 'text/html'
      });
      res.write(content);
      res.end(); */
      break;
    default: {
      res.statusCode = 404;
      res.end();
      /* const content = `
      <h2>404 Not Found</h2>
      `;
      const title = '404 Error!!!';
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      const result = await storageService.generatePage(content, title);
   
      res.write(result);
      res.end(); */
      break;
    }
  }
});

const PORT = 5001;
const HOST = 'localhost';
const PATH = __dirname;
app.listen(PORT, HOST, () => {
  console.info(`__dirname: ${PATH}. App is listening on http://${HOST}:${PORT}`);
});

//console.log('App is listening on port 5000...');