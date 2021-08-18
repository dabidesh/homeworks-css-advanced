//factory function
// Контролера е рутера, който създаваме
const router = require('express').Router();

const user = require('../services/user');

// Екшъните са всяко едно действие
router.get('/', async (req, res) => {
  try {
    console.log('req.query: ', req.query);
    let plays;
    if (req.user) {
      plays = await req.storage.getAllPlays(req.query);
    } else {
      plays = await req.storage.getAllPublicPlays(req.query);
    }
    // Няма нужда да се подава като контекст user: req.user
    // Специалното свойство locals се вижда
    // Закачено е в ф-ята parseToken в auth-мидълеъра за респонса!
    res.render('home/user', { plays });
  } catch (err) {
    console.log(err.type);
    res.status(404).render('404/notFound');
  }

});

// Друга логика: подаваме и user, за да определим дали да показваме публичните пиеси или не
router.get('/search', async (req, res) => {
  console.log('req.user->');
  console.log(req.user);
  const plays = await req.storage.getPlaysBySearch(req.query, req.user);

  res.render('home/user', { plays, query: req.query });
});

router.get('/user/:id', async (req, res) => {
  const userData = await user.getUserDetailsByUsername(req.params.id);
  console.log(userData.likedPlays);
  userData.likedPlays = userData.likedPlays.map(x => `„${x.title}“`).join(', ');

  res.render('home/profile', { id: req.params.id, userData });
});

module.exports = router;