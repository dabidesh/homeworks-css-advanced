// Стъпка 0: импортираме рутера и го експортираме.
// Стъпка 1: В routes.js го маунтваме, за да не го забравим

const { isUser } = require('../middlewares/guards');
const parseError = require('../util/parsers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
  res.render('play/create');
});

// 0. try-catch, async
// 1. context и го подаваме във формата
// 2. Бизнес-логиката ...
// 3. storage-мидълеъра връща това, което е в сървиса. от което следва, че валидациите трябва да са в контролера или сървиса (но сървисите ги правим глупави)! На ниво модел също има валидации! Сървиса ще го метне на модела и той ще каже кое става и кое не.

router.post('/create', isUser(), async (req, res) => {
  console.log(req.body);
  try {
    // TODO extract model data and forward to service
    const playData = {
      title: req.body.title.trim(),
      description: req.body.description.title.trim(),
      imageUrl: req.body.imageUrl.title.trim(),
      public: Boolean(req.body.public),
      // Няма нужда, защото имат стойности по подразбиране в модела Play
      //createdAt: () => new Date(), може да се пише и Date.now!
      //usersLiked: [],
      author: req.user._id,
    };

    // Няма нужда от const play = (няма защо да го пазим)
    // Пишем само req.storage.createPlay, защото сме деструктурирали в storage-мидълеъра
    await req.storage.createPlay(playData);

    res.redirect('/');
  } catch (err) {
    // TODO parse mongoose error object
    // Работата става дебела
    console.log(err.message);
    //console.log('---');
    //console.log(err.name);
    //console.log(Object.values(err.errors).map(e => e.properties.message));

    const context = {
      errors: parseError(err),
      playData: {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        public: Boolean(req.body.public),
      }
    };
    // Запазваме полетата на формуляра в контекста и го подаваме на вюто
    res.render('play/create', context);
  }
});

router.get('/details/:id', async (req, res) => {
  // 0. Най-важно: ще извади подробност от базата с данни!!!
  // Не връщаме грешка, защото няма къде
  // Няма 404-страница по условие
  try {
    console.log(req.params);
    const play = await req.storage.getPlayById(req.params.id);
    //console.log(play);
    // Виктор сложи with в шаблона и затова user не работеше ...
    // user работи навсякъде, след като се закачи за locals в auth-мидълеъра (ф-ята parseToken)
    // Затуй закачи hasUser за play
    //play.hasUser = Boolean(req.user);
    // Ако е автора => няма бутон
    play.isAuthor = req.user && req.user._id == play.author;
    // Ако я е харесал => пак няма ... опс - друга логика, виж сл. ред!
    //play.liked = req.user && play.usersLiked.includes(req.user._id);
    play.liked = req.user && play.usersLiked.find(u => u._id == req.user._id);

    // След като сме почнали да пишем логиката за харесванията ...
    // Ако беше в детайлите
    //play.likes = play.usersLiked.length;

    res.render('play/details', { play });
  } catch (err) {
    console.log(err.message);
    res.redirect('/404');
  }
});

router.get('/edit/:id', isUser(), async (req, res) => {
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (play.author != req.user._id) {
      throw new Error('You can not edit play that haven\'t created!');
    }

    res.render('play/edit', { play });
  } catch (err) {

  }
});

router.post('/edit/:id', isUser(), async (req, res) => {
  console.log(req.body);
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (play.author != req.user._id) {
      throw new Error('You can not edit play that haven\'t created!');
    }

    await req.storage.editPlay(req.params.id, req.body);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    const context = {
      errors: parseError(err),
      play: {
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        public: Boolean(req.body.public),
      }
    };
    // id-то си влиза в контекста, но естествено трябва да го подадем
    res.render('play/edit', context);
  }
});

router.get('/delete/:id', isUser(), async (req, res) => {
  try {
    const play = await req.storage.deletePlay(req.params.id);

    if (play.author != req.user._id) {
      throw new Error('You can not delete play that haven\'t created!');
    }
    // Няма къде да я изобразим ... ще я хвърлим, логнем и върнем в details

    res.redirect('/');
  } catch (err) {
    console.log(err.message);
    // Може към 401 за да подскажем, че няма права
    res.redirect('/play/details/' + req.params.id);
  }
});

router.get('/like/:id', isUser(), async (req, res) => {
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (play.author == req.user._id) {
      throw new Error('You can not like play that you created!');
    }
    // Няма къде да я изобразим ... ще я хвърлим, логнем и върнем в details

    await req.storage.likePlay(req.params.id, req.user._id);

    res.redirect('/play/details/' + req.params.id);
  } catch (err) {
    console.log(err);
    res.redirect('/play/details/' + req.params.id);
  }
});

module.exports = router;