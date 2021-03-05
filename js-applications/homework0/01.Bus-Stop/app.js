const getInfo = async (e) => {
  'use-strict';

  e.preventDefault();

  const stopIdElement = document.getElementById('stopId');
  const stopNameElementDiv = document.getElementById('stopName');
  const busesElementUl = document.getElementById('buses');
  const aElement = document.getElementById('a');

  const removeAllLi = () => {
    while (busesElementUl.firstChild) {
      busesElementUl.removeChild(busesElementUl.firstChild);
    }
  };

  try {
    stopNameElementDiv.textContent = '';
    //busesElementUl.innerHTML = '';
    removeAllLi();

    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + stopIdElement.value;
    aElement.href = url;
    aElement.textContent = url;

    if (stopIdElement.value == '') {
      throw new Error('Input is empty');
    }

    const response = await fetch(url);
    const result = await response.json();
    stopNameElementDiv.textContent = result.name;
    for (const i in result.buses) {
      let li = document.createElement('li');
      li.textContent = `Bus ${i} arrives in ${result.buses[i]} minutes`;
      busesElementUl.appendChild(li);
    }
  } catch (err) {
    removeAllLi();
    stopNameElementDiv.textContent = 'Error';
  }
};

document.getElementsByTagName('form')[0].onsubmit = (e) => getInfo(e);