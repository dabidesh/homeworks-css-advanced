const express = require('express');

const { PORT } = require('./config');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

//const authMiddleware = require('./middlewares/auth');

//const userService = require('./services/user');

const start = async () => {
  //app run express like factory function
  const app = express();

  expressConfig(app);
  routesConfig(app);

  // TODO remove in production [x]
  //app.get('/', (req, res) => res.send('Working ...'));

  app.listen(PORT, () => {
    //testAuth();
    console.log(`Application started at http://localhost:${PORT}`);
  });
};

start();

/* async function testAuth() {
  const reqMock = {};
  const resMock = {
    cookie() {
      console.log('Set cookie', arguments);
    }
  };
  const nextMock = () => { };
  try {
    const auth = authMiddleware();
    auth(reqMock, resMock, nextMock);

    //await reqMock.auth.register('bradata6660', '123456');

    //reqMock.auth.logout();

    await reqMock.auth.login('bradata666', '123456');

    //const result = await userService.createUser('dabidesh', '1234567');
    //console.log(result);

    //const user = await userService.getUserByUsername('Dabidesh');
    //console.log(user);
  } catch (err) {
    console.log(err);
    console.log('Error: ', err.message);
  }
} */