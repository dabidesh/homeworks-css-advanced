// TODO update database name

// PORT=3002 HOST="127.0.0.3" nodemon start (Юникс, bash)
module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  DB_CONNECTION_STRING: 'mongodb://localhost:27017/plays',
  TOKEN_SECRET: 'Very secret token 657',
  COOKIE_NAME: 'SESSION_TOKEN',
};