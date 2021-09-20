const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const db = require('./db.json');
//const multipart = require('multipart');
//const querystring = require('qs');

const storageService = require('./services/storageService.js');

const sleepDeep = ms => {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  )
}

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
      request.on('end', function () {
        request.post = querystring.parse(queryData);
        callback();
      });
    });
  } else {
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end();
  }
}

const app = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      let content = fs.readFileSync('./views/home/index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(content);
      res.end();
      break;
    case '/styles/site.css':
      let css = fs.readFileSync('./styles/site.css');
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(css);
      res.end();
      break;
    case '/js/script.js':
      let js = fs.readFileSync('./js/script.js');
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.write(js);
      res.end();
      break;
    case '/cats/add-cat':
      if (req.method == 'GET') {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        fs.readFile('./views/addCat.html', 'utf8', (err, result) => {
          if (err) {
            res.statusCode = 404;
            return res.end();
          }

          let breeds = [
            'Persian',
            'Angora',
            'Улична превъзходна',
          ];

          let mappedBreeds = breeds.map(x => `
                        <option value="${x}">${x}</option>
                    `);

          result = result.replace('{{breeds}}', mappedBreeds);

          res.write(result);
          res.end();
        });
      } else if (req.method == 'POST') {

        processPost(req, res, async function () {
          //console.log(req.post);
          // Use request.post here
          //console.log(req.post['name']);
          //console.log(req.post.description);
          //console.log(req.post.breed);

          /* storageService.saveCat(req.post)
            .then(() => {
              //console.log('end');
              //res.end();
              const result = storageService.getAllCats()
              //console.log(result);
              res.writeHead(302, {
                'Location': '/'
              });
              res.end();
            })
            .catch(err => {
              console.log('err');
              console.log(err);
            }); */
          try {
            await storageService.saveCat(req.post);

            //const results = await storageService.getAllCats();
            //console.log(new Buffer.alloc(result));
            console.log('index', db);
            //await sleepDeep(2000);
            res.writeHead(302, {
              'Location': '/'
            });
            res.end();
          } catch (err) {
            console.log('err');
            console.log(err);
          };
          res.writeHead(302, {
            'Location': '/'
          });

          res.end();
        });

        /* let body = '';

        req.on('data', function (data) {
          body += data;

          // Too much POST data, kill the connection!
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6)
            req.connection.destroy();
        });
 
        req.on('end', function () {
          let post = querystring.parse(body);
          // use post['blah'], etc.
          post = JSON.parse(JSON.stringify(post))
          console.log(post);
          //JSON.parse(JSON.stringify(post))
        });
 
        res.end(); */
      }
      break;
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
    default:
      res.statusCode = 404;
      res.end();
      break;
  }
});

const PORT = 5000;
const HOST = 'localhost';
const PATH = __dirname;
app.listen(PORT, HOST, () => {
  console.info(`__dirname: ${PATH}. App is listening on http://${HOST}:${PORT}`);
});

//console.log('App is listening on port 5000...');