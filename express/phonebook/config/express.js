const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
  app.engine('hbs', handlebars({
    layoutsDir: 'views',
    defaultLayout: 'main-layout',
    partialsDir: 'views/partials',
    extname: 'hbs'
  }));

  app.set('view engine', 'hbs');

  //настройка за достъп до картинки, статични html-и и пр.
  app.use(express.static('static'));
}