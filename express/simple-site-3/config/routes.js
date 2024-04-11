const homeController = require('../controllers/homeController');

const about = require('../controllers/about');

const subpageController = require('../controllers/subpageController');

const { notFound } = require('../controllers/notFound');

// in authController.js is simply /logout, /login .../auth come from here
module.exports = (app) => {
  app.use('/', homeController);  //аналог. на static
  app.use('/about', about);

  app.use('/subpage', subpageController);

  app.all('*', notFound);
};
