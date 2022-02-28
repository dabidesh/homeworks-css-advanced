//factory function
// Контролера е рутера, който създаваме
const router = require('express').Router();

const user = require('../services/user');

const Play = require('../models/Play');

// Екшъните са всяко едно действие
router.get('/', async (req, res) => {
  try {
    console.log('req.user: ', req.user);
    let plays;
    if (req.user) {
      plays = await req.storage.getAllPlays(req.query);
    } else {
      plays = await req.storage.getAllPublicPlays(req.query);
    }
    // Няма нужда да се подава като контекст user: req.user
    // Специалното свойство locals се вижда
    // Закачено е в ф-ята parseToken в auth-мидълеъра за респонса!
    res.render('home/user', { plays, home: true });
  } catch (err) {
    console.log(err.type);
    res.status(404).render('404/notFound');
  }

});

// Друга логика: подаваме и user, за да определим дали да показваме публичните пиеси или не
router.get('/search', async (req, res) => {
  console.log('req.user->');
  console.log(req.user);
  console.log('req.query-> ');
  console.log(req.query);

  const plays = await req.storage.getPlaysBySearch(req.query, req.user);

  res.render('home/user', { plays, query: req.query });
});

router.get('/user/:id', async (req, res) => {
  console.log('req.user(/user/:id)->', req.user);
  const userData = await user.getUserDetailsByUsername(req.params.id);
  //console.log('homeController, userData.likedPlays: ', userData.likedPlays);
  userData.likedPlays = userData.likedPlays.map(x => `„${x.title}“`).join(', ');
  res.render('home/profile', { id: req.params.id, userData, username: true });
});

router.get('/page/:id', async (req, res) => {
  //const plays = await req.storage.getPlaysByPage(req.params.id);
  let page = +req.params.id;
  let prev, next;
  if (page == 1) {
    prev = false;
  } else {
    prev = page - 1;
  }

  let allPages = 0;
  await Play.countDocuments({}, function (err, count) {
    console.log('count', count / 3);
    allPages = Math.round(count / 3) + 1;
  });
  if (page < allPages) {
    next = page + 1;
  } else {
    next = undefined;
  }
  const skipDocuments = page * 3 - 3;

  const plays = await req.storage.getPlaysByPageVanilla(skipDocuments);

  console.log('next', typeof next, next);
  console.log('allPages', typeof allPages, allPages);
  console.log('page', typeof page, page);

  res.render('home/page', { plays, page: req.params.id, allPages, prev, next });
});

module.exports = router;