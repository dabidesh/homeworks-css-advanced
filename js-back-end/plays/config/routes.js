const authController = require('../controllers/authController');
const playController = require('../controllers/playController');
const homeController = require('../controllers/homeController');



// in authController.js is simply /logout, /login .../auth come from here
module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/play', playController);

  app.get('*', function (req, res) {
    res.status(404).render('404/notFound');
  });
};
