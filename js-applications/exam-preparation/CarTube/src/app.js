/* create universal request module(api.js)
create application - specific requests(data.js)
setup routing(page)
create context decorator middleware(utility functions)
implement views */

import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

//import * as api from './api/data.js';
import { getUserData } from './utility.js';

//import * as api from './api/data.js';

import { logout } from './api/data.js';
import { homePage } from './views/home.js';
import { loginPage, registerPage } from './views/auth.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { myListingsPage } from './views/myListings.js';
import { searchPage } from './views/search.js';



//api.settings.host = 'http://localhost:3030';

//for testing
//window.api = api;

const main = document.getElementById('site-content');

// not need to be async, but i like
logoutId.onclick = async () => {
  await logout();
  setUserNav();
  page.redirect('/');

};

setUserNav();

// routing table
page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/all-listings', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/myListings', decorateContext, myListingsPage);
page('/search', decorateContext, searchPage);




page.start();


function decorateContext(context, next) {
  context.render = (content) => render(content, main);

  context.setUserNav = setUserNav;
  context.user = getUserData();

  next();
}

function setUserNav() {
  const user = getUserData();
  if (user) {
    document.querySelector('#profile > a').textContent = 'Welcome ' + user.username;
    document.getElementById('profile').style.display = 'block';
    document.getElementById('guest').style.display = 'none';
  } else {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('guest').style.display = 'block';
  }

}