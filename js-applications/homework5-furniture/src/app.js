import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';

import { logout } from './api/data.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/myFurniture.js';


import * as api from './api/data.js';  //was api ... was
//api.settings.host = 'http://localhost:3030';  //was
//window.api = api;  //for testing in console browser

const main = document.querySelector('.container');

/* View Controller
  - fetch data
    - interpolate template
      - handle user input
        - return content or render*/

//without renderMiddleware not render
page('/', decorateContext, dashboardPage);
//page('/dashboard', dashboardPage);
page('/my-furniture', decorateContext, myPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);

logoutBtn.onclick = async () => {
  await logout();
  setUserNav();
  page.redirect('/');
};

setUserNav();

//  Start application
page.start();


//was renderMiddleware
function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  next();
}

function setUserNav() {
  const userId = sessionStorage.getItem('userId');
  //have user
  if (userId != null) {
    user.style.display = 'inline-block'; //why not template?
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = 'inline-block';
  }
}