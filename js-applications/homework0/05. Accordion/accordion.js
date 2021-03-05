const sectionMain = document.getElementById('main');
const startButton = document.getElementById('start');
let countArticles = 0;

const solution = async () => {
  'use strict';

  sectionMain.onclick = (e) => moreOrLess(e);

  const moreOrLess = (e) => {
    if (e.target.textContent == 'More') {
      e.target.textContent = 'Less';
      e.target.parentElement.parentElement.children[1].style.display = 'block';
    } else if (e.target.textContent == 'Less') {
      e.target.textContent = 'More';
      e.target.parentElement.parentElement.children[1].style.display = 'none';
    }
  };

  const getArticles = async () => {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    return await response.json();
  };

  const getContent = async (id) => {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const response = await fetch(url);
    const data = await response.json();
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `<br><a href="${url}" target="_blank">${data.title}</a>`);
    return data;
  };

  const articles = await getArticles();

  countArticles = articles.length;

  articles.forEach(async e => {
    //console.log(e.title, e._id);
    const content = await getContent(e._id);
    //console.log(content.content);
    sectionMain.insertAdjacentHTML('beforeend',
      `<div class="accordion">
            <div class="head">
                <span>${e.title}</span>
                <button class="button" id="${e._id}">More</button>
            </div>
            <div class="extra" style="display: none;">
                <p>${content.content}</p>
            </div>
        </div>`);
  });
};

solution();

const start = () => {
  for (let i = 0; i < countArticles; i++) {
    document.querySelectorAll('#main button')[i].click();
  }

  if (startButton.textContent == 'more all') {
    startButton.textContent = 'less all';
  } else {
    startButton.textContent = 'more all';
  }
};