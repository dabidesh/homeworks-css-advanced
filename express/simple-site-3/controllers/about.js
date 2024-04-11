const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('about',
    {
      layout: 'aboutLayout',
      title: 'About Page',
      description: 'About Page Description',
      about: true,
    });
});

module.exports = router;