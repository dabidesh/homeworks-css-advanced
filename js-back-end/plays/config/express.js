const hbs = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');

const authMiddleware = require('../middlewares/auth');

const storageMiddleware = require('../middlewares/storage');

module.exports = (app) => {

  // save secret – we use express
  app.disable('x-powered-by');

  app.engine('hbs', hbs({
    extname: 'hbs',
  }));
  // for do not write hbs (res.render)
  app.set('view engine', 'hbs');

  app.use('/static/', express.static('static'));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // load after cookieParser because authMiddleware used it
  // function – the pattern
  // Тука е ключа от бараката
  app.use(authMiddleware());

  //useful for debug -> логер (loggerMiddleware може)
  app.use((req, res, next) => {
    if (!req.url.includes('favicon')) {
      console.log('>>>', req.method, req.url);

      if (req.user) {
        console.log('Known user', req.user.username);
      }
    }

    next();
  });

  // TODO add storage and auth middlewares ^ !!! в скелета да е !
  // Сега само storage-мидълеъра, защото горе не работи!

  app.use(storageMiddleware());



};