//factory function
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
  //not need write ext hbs
  res.render('user/register');
});

router.post(
  '/register',
  isGuest(),
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long!')
    .bail()
    .isAlphanumeric()
    .withMessage('Username must contain only English letters and digits!'),
  body('password')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long!')
    .bail()
    .isAlphanumeric()
    .withMessage('Password must contain only English letters and digits!'),
  // TODO: change according requirements
  body('rePass').custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error('Passwords don\'t match!');
    }
    return true;
  }),
  body('gender').custom(value => {
    if (value != 'man' && value != 'woman') {
      throw new Error('Gender not exist!');
    }
    return true;
  }),
  async (req, res) => {
    console.log(req.body);
    const { errors } = validationResult(req);
    try {
      // if-чета, ако не щем да ползваме express-validator (js application), хвърляме грешка и я хващаме в кеча и я визуализираме
      if (errors.length > 0) {
        console.log(errors);
        // TODO: improve error messages
        const message = errors.map(e => e.msg).join('\n');
        throw new Error(message);  //'Validation error!'
      }
      console.log('req.auth');
      console.log(req.auth);

      await req.auth.register(
        req.body.username,
        req.body.email,
        req.body.gender,
        req.body.ganre,
        req.body.password);

      //console.log(errors);
      res.redirect('/');  // TODO: change redirect location
    } catch (err) {
      let genderMan, genderWoman;
      if (req.body.gender == 'man') {
        genderMan = true;
      }
      if (req.body.gender == 'woman') {
        genderWoman = true;
      }
      let o = {
        ganreNone: false,
        ganreFiction: false,
        ganreHorror: false,
        ganreFantasy: false,
      };
      console.log('req.body.ganre: ', req.body.ganre);
      if (req.body.ganre == 'None') o.ganreNone = true;
      if (req.body.ganre == 'Science fiction') {
        console.log('Влиза');
        o.ganreFiction = true;
      }
      if (req.body.ganre == 'Horror') o.ganreHorror = true;
      if (req.body.ganre == 'Fantasy') o.ganreFantasy = true;

      const ctx = {
        errors: err.message.split('\n'),
        userData: {
          genderMan,
          genderWoman,
          o,
          username: req.body.username,
          email: req.body.email,
        }
      };
      console.log(ctx.errors);
      res.render('user/register', ctx);
    }
  }
);

router.get('/login', isGuest(), (req, res) => {
  //not need write ext hbs
  res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {
  try {
    await req.auth.login(req.body.username, req.body.password);

    res.redirect('/');  // TODO: change redirect location
  } catch (err) {
    console.log(err.message);
    let errors = [err.message];
    if (err.type == 'credential') {
      errors = ['Incorect username or password!'];
    }
    const ctx = {
      errors,
      userData: {
        username: req.body.username
      }
    };
    console.log(ctx.errors);
    res.render('user/login', ctx);
  }
});

// no guard, the guard login but no meaning ... history
// tying in controller
router.get('/logout', (req, res) => {
  req.auth.logout();
  res.redirect('/');
});

module.exports = router;