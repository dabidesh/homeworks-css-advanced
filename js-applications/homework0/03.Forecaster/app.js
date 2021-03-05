const locationElInput = document.getElementById('location');

const attachEvents = () => {
  'use-strict';

  const forecastDiv = document.getElementById('forecast');
  const currentDiv = document.getElementById('current');
  const upcomingDiv = document.getElementById('upcoming');
  const formElement = document.querySelector('form');

  const symbols = {
    Sunny: '☀',
    'Partly sunny': '⛅',
    Overcast: '☁',
    Rain: '☔',  //☂
  };

  const getForecast = async (e) => {
    e.preventDefault();
    const location = locationElInput.value;
    forecastDiv.style.display = 'block';
    if (currentDiv.children[1]) {
      currentDiv.children[1].remove();
      upcomingDiv.children[1].remove();
    }
    if (forecastDiv.children[2]) {
      forecastDiv.children[2].remove();
    }
    let code;
    try {
      code = await getCode(location);
    } catch (err) {
      locationElInput.value = '';
      currentDiv.classList.add('error');
      if (location == '') {
        currentDiv.querySelector('div').textContent = 'Error – input is empty!';
      } else {
        currentDiv.querySelector('div').textContent = `Error – we have nothing for ${location[0].toUpperCase() + location.slice(1)}!`;
      }
      console.log(err);
      upcomingDiv.style.display = 'none';
      return;
    }
    const urlCurrent = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const urlUpcoming = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const [responseCurrent, responseUpcoming] = await Promise.all([fetch(urlCurrent), fetch(urlUpcoming)]);

    const current = await responseCurrent.json();
    const upcoming = await responseUpcoming.json();

    locationElInput.value = '';

    currentDiv.classList.remove('error');
    currentDiv.querySelector('div').textContent = 'Current conditions';
    upcomingDiv.style.display = 'block';

    currentDiv.insertAdjacentHTML('beforeend', `<div class="forecasts"><span class="condition symbol">${symbols[current.forecast.condition]}</span><span class="condition"><span class="forecast-data">${current.name}</span><span class="forecast-data">${current.forecast.low}⁰/${current.forecast.high}⁰</span><span class="forecast-data">${current.forecast.condition}</span></span><br /><a href="${urlCurrent}" target="_blank">${code} – today</a></div>`);

    let divF = document.createElement('div');
    divF.className = 'forecast-info';
    upcomingDiv.appendChild(divF);
    Array.from(upcoming.forecast).forEach(i => {
      divF.insertAdjacentHTML('beforeend', `<span class="upcoming"><span class="symbol">${symbols[i.condition]}</span><span class="forecast-data">${i.low}⁰/${i.high}⁰</span><span class="forecast-data">${i.condition}</span></span>
        `);
    });
    divF.insertAdjacentHTML('beforeend', `<br /><a href="${urlUpcoming}" target="_blank">${code} - upcoming</a>`);
  };

  formElement.addEventListener('submit', getForecast);

  const getCode = async (name) => {

    const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
    const result = await response.json();
    return result.find(loc => loc.name.toLowerCase() === name.toLowerCase()).code;
  };
};

attachEvents();

const sleepDeep = ms => {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
};

const playAll = async () => {
  options = sel.querySelectorAll('option');
  optionsArray = [...options];
  let sleepTime = selTime.value;
  if (sleepTime == '') return;
  sleepTime = +sleepTime;
  selTime.disabled = true;
  sel.disabled = true;

  for (let e of optionsArray) {
    e.selected = true;
    locationElInput.value = sel.value;
    submit.click();
    await sleepDeep(sleepTime);
  }

  firstTime.selected = true;
  firstVillage.selected = true;
  selTime.disabled = false;
  sel.disabled = false;

};