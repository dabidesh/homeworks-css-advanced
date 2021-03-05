solve = () => {
  let infoElSpan = document.querySelector('#info span');
  let departElButton = document.getElementById('depart');
  let arriveElButton = document.getElementById('arrive');
  let divElementLinks = document.getElementById('links');
  let inputElementId = document.getElementById('idInput');
  let flagId = false;

  let currentId = 'depot';

  const depart = async () => {
    // fetch('http://localhost:3030/jsonstore/bus/schedule/' + currentId)
    //   .then(response => response.json())
    //   .then(result => infoElSpan.textContent = `Next stop ${result.name}`)
    //   .catch(() => {
    //     infoElSpan.textContent = 'Error';
    //     departElButton.disabled = true;
    //     arriveElButton.disabled = true;
    //   });
    try {
      if (flagId) {
        currentId = inputElementId.value;
        flagId = false;
      }
      url = 'http://localhost:3030/jsonstore/bus/schedule/' + currentId;
      const response = await fetch(url);
      const result = await response.json();
      infoElSpan.classList.remove('error');
      infoElSpan.textContent = `Next stop ${result.name}` + ' id = ' + currentId;
      divElementLinks.insertAdjacentHTML('beforeend', `<a href="${url}" target="_blank">Depart: ${url}</a><br />`);
      divElementLinks.scrollTop = divElementLinks.scrollHeight;
    } catch (e) {
      infoElSpan.classList.add('error');
      infoElSpan.textContent = 'Error ' + 'id = ' + currentId;
      departElButton.disabled = true;
      arriveElButton.disabled = true;
      divElementLinks.insertAdjacentHTML('beforeend', `<a href="${url}" target="_blank">Arrive: ${url}</a><br />`);
      divElementLinks.scrollTop = divElementLinks.scrollHeight;
      //stopB.click();
    }

    departElButton.disabled = true;
    arriveElButton.disabled = false;
  };

  const arrive = async () => {
    // fetch('http://localhost:3030/jsonstore/bus/schedule/' + currentId)
    //   .then(response => response.json())
    //   .then(result => {
    //     infoElSpan.textContent = 'Arriving at ' + result.name;
    //     currentId = result.next;
    //   })
    //   .catch(() => {
    //     infoElSpan.textContent = 'Error';
    //     departElButton.disabled = true;
    //     arriveElButton.disabled = true;
    //   });
    try {
      url = 'http://localhost:3030/jsonstore/bus/schedule/' + currentId;
      const response = await fetch(url);
      const result = await response.json();
      infoElSpan.classList.remove('error');
      infoElSpan.textContent = 'Arriving at ' + result.name + ' id = ' + currentId;
      if (flagId) {
        currentId = inputElementId.value;
        flagId = false;
      } else {
        currentId = result.next;
      }
      divElementLinks.insertAdjacentHTML('beforeend', `<a href="${url}" target="_blank">Arrive: ${url}</a><br />`);
      divElementLinks.scrollTop = divElementLinks.scrollHeight;
    } catch (e) {
      infoElSpan.classList.add('error');
      infoElSpan.textContent = 'Error ' + 'id = ' + currentId;
      departElButton.disabled = true;
      arriveElButton.disabled = true;
      divElementLinks.insertAdjacentHTML('beforeend', `<a href="${url}" target="_blank">Arrive: ${url}</a><br />`);
      divElementLinks.scrollTop = divElementLinks.scrollHeight;
      stopB.click();
    }


    departElButton.disabled = false;
    arriveElButton.disabled = true;
  };

  let time;
  const auto = () => {
    time = setInterval(() => {
      departElButton.click();
      arriveElButton.click();
    }, 300);
  };

  const stop = () => {
    clearInterval(time);
  };

  const changeId = () => {
    flagId = true;
  };

  return { depart, arrive, auto, stop, changeId };
};
let result = solve();