const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('subpage/index',
    {
      title: 'Subpage Page',
      description: 'Subpage Page Description',
      subpage: true,
    });
});

router.get('/subpage1', (req, res) => {
  res.render('subpage/subpage1',
    {
      title: 'Subpage1 Page',
      description: 'Subpage1 Page 1 Description',
      subpage1: true,
    });
});

router.get('/subpage2', (req, res) => {
  res.render('subpage/subpage2',
    {
      title: 'Subpage2 Page 2',
      description: 'Subpage2 Page 2 Description',
      subpage2: true,
    });
});

module.exports = router;