const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { TOKEN_SECRET, COOKIE_NAME } = require('../config');
const userService = require('../services/user');

/* function init() {
  return function */
module.exports = () => (req, res, next) => {
  // TODO parse jwt [x]
  // attach functions to context [x]

  // without parseToken work but with redirect fail whitout cookie
  if (parseToken(req, res)) {
    req.auth = {
      async register(username, email, gender, ganre, password) {
        const token = await register(username, email, gender, ganre, password);
        // cookies in request
        res.cookie(COOKIE_NAME, token);
      },
      async login(username, password) {
        const token = await login(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      logout() {
        res.clearCookie(COOKIE_NAME);
      },
      loginorea() {

      },
    };

    next();
  }


};

//module.exports = init;

async function register(username, email, gender, ganre, password) {
  // TODO adapt parameters to project requirements [x]
  // TODO extra validations [x]

  const existingUsername = await userService.getUserByUsername(username);
  // Да се еба в дневалния – бях написал email с главна буква!
  // Даваше грешка Email is not defined, а аз не гледам, че е с главна ...
  const existingEmail = await userService.getUserByEmail(email);
  if (existingUsername) {
    throw new Error('Usrname is taken!');
  } else if (existingEmail) {
    throw new Error('Email is taken!');
  }
  // salt is in beginig on hashedPassword, 10 -> runds
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userService.createUser(username, email, gender, ganre, hashedPassword);

  return generateToken(user);

  // TODO log in user
}

const login = async (username, password) => {
  const user = await userService.getUserByUsername(username);

  if (!user) {
    // in log becose bad gay can scan base for users
    // controler will catch the error
    const err = new Error('No such user!');
    err.type = 'credential';
    throw err;
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!hasMatch) {
    //in log again
    const err = new Error('Incorect password!');
    err.type = 'credential';
    throw err;
  }

  return generateToken(user);
};

const loginorea = () => {
  return true;
};

function generateToken(userData) {
  return jwt.sign({
    _id: userData._id,
    username: userData.username,
    //email: userData.email,
  }, TOKEN_SECRET);
}

// Закачваме информацията за потребителя за рекуеста (req) ...
// И респонса (полето locals)
function parseToken(req, res) {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    try {
      const userData = jwt.verify(token, TOKEN_SECRET);
      req.user = userData;
      // special property locals all will look in layouts
      // render-контекста винаги има достъп до полето locals
      // Иначе трябва да се подава user: res.user и в home- и play-контролерите ...
      // Или да се закача за обекта, който подаваме obj.user = req.user ...
      // Или само Boolean, за да проверим дали има логнат потр. obj.hasUser = Boolean(req.user)
      res.locals.user = userData;

      //return true;
    } catch (err) {
      res.clearCookie(COOKIE_NAME);
      res.redirect('/auth/login');

      return false;
    }
  }
  // if no token directly return true
  return true;
}