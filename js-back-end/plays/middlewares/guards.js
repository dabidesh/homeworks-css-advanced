// isAuth
// guard must return func that return func otherwise do not use like func
function isUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

// convention all middlewares to used like factory func
// nothing to inicialize
// the idea to input parameters in now empty brackets
function isGuest() {
  return (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };
}

module.exports = { isUser, isGuest };