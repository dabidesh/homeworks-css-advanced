//factory function
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home/home',
    {
      title: 'Home Page',
      description: 'Home Page Description',
      home: true,
    });
});

module.exports = router;
