// storage-мидълеъра е само плейсхолдър ...
// Само едно реле е => валидацията трябва да е всървиса
// Трябва да импортираме play-сървиса и да го закачим за рекуеста

const playService = require('../services/play');

module.exports = () => (req, res, next) => {
  // TODO import and decorate services
  req.storage = {
    ...playService  //закачаме! деструкторираме (...) за да имаме директен достъп, т.е. за да пишем само req.storage.getAllPlays и т.н.
  };

  next();
};