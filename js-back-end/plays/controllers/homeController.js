//factory function
// Контролера е рутера, който създаваме
const router = require('express').Router();

// Екшъните са всяко едно действие
router.get('/', async (req, res) => {
  console.log(req.query);
  let plays;
  if (req.user) {
    plays = await req.storage.getAllPlays(req.query.orderBy);
  } else {
    plays = await req.storage.getAllPublicPlays(req.query.orderBy);
  }
  // Няма нужда да се подава като контекст user: req.user
  // Специалното свойство locals се вижда
  // Закачено е в ф-ята parseToken в auth-мидълеъра за респонса!
  res.render('home/user', { plays });
});

// Друга логика: подаваме и user, за да определим дали да показваме публичните пиеси или не
router.get('/search', async (req, res) => {
  console.log('req.user->');
  console.log(req.user);
  const plays = await req.storage.getPlaysBySearch(req.query, req.user);

  res.render('home/user', { plays, query: req.query });
});

module.exports = router;