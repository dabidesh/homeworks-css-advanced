//@ts-nocheck;
const hbs = require('express-handlebars');
const express = require('express');

module.exports = (app) => {

  // save secret – we use express
  app.disable('x-powered-by');

  app.engine('hbs', hbs.engine({
    extname: 'hbs',
  }));
  /* app.engine('hbs', hbs({
    extname: 'hbs',
  })); */
  // for do not write hbs (res.render)
  app.set('view engine', 'hbs');

  //public, може и без '/static/',
  app.use('/static/', express.static('static'));
  //app.use(express.urlencoded({ extended: true }));
  // load after cookieParser because authMiddleware used it
  // function – the pattern

  //useful for debug
  app.use((req, res, next) => {
    if (!req.url.includes('favicon')) {
      console.log('>>>', req.method, req.url);

      if (req.user) {
        console.log('Known user', req.user.username);
      }
    }

    next();
  });

  // TODO add storage and auth middlewares
};
