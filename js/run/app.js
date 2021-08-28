const totalSecondsToHMS = (totalSeconds) => {
  const hourTime = String(Math.floor(totalSeconds / 3600));
  totalSeconds %= 3600;
  const minTime = String(Math.floor(totalSeconds / 60));
  const secTime = String(Math.floor(totalSeconds % 60));

  return [hourTime, minTime, secTime];
};

loadId.onclick = (e) => {
  e.preventDefault();

  const allDataObj = JSON.parse(localStorage.getItem('allDataObj'));

  min.value = allDataObj.min;
  sec.value = allDataObj.sec;
  km.value = allDataObj.km;
  m.value = allDataObj.m;
  hourTime.value = allDataObj.hourTime;
  minTime.value = allDataObj.minTime;
  secTime.value = allDataObj.secTime;
  kmLength.value = allDataObj.kmLength;
};

convId.onclick = (e) => {
  e.preventDefault();

  if (confirm('Сигурен ли си, че искаш да запишеш всичко?')) {

    const allDataObj = {
      'min': min.value,
      'sec': sec.value,
      'km': km.value,
      'm': m.value,
      'hourTime': hourTime.value,
      'minTime': minTime.value,
      'secTime': secTime.value,
      'kmLength': kmLength.value,
    };

    localStorage.setItem('allDataObj', JSON.stringify(allDataObj));
  }
};

clearId.onclick = (e) => {
  e.preventDefault();
  /* min.value = '';
  sec.value = '';
  km.value = '';
  m.value = ''; */
  run.reset();
};

// window.onload = () => {
//   //loadId.click();
// };

// loadId.click();

min.onchange = sec.onchange =
  min.onkeyup = sec.onkeyup = () => {
    const temp = (1 / (+sec.value / 60 + (+min.value))) * 60;
    km.value = temp.toFixed(2);
    m.value = (temp * (1000 / 3600)).toFixed(2);

    [hourTime.value, minTime.value, secTime.value] =
      totalSecondsToHMS(Math.round((+kmLength.value / temp) * 3600));
  };

km.onchange = km.onkeyup = () => {
  const temp = +km.value;
  m.value = (temp * (1000 / 3600)).toFixed(2);
  const secAll = ((1 / temp) * 3600);
  [_, min.value, sec.value] = totalSecondsToHMS(secAll);

  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(Math.round((+kmLength.value / temp) * 3600));
};

m.onchange = m.onkeyup = () => {
  const temp = +m.value * 3.6;
  km.value = temp.toFixed(2);
  const secAll = ((1 / temp) * 3600);
  [_, min.value, sec.value] = totalSecondsToHMS(secAll);

  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(Math.round((+kmLength.value / temp) * 3600));
};

hourTime.onchange = minTime.onchange =
  secTime.onchange = kmLength.onchange =
  hourTime.onkeyup = minTime.onkeyup =
  secTime.onkeyup = kmLength.onkeyup = () => {
    const timeHours = +secTime.value / 3600 + (+minTime.value) / 60 +
      (+hourTime.value);
    km.value = (+kmLength.value / timeHours).toFixed(2);

    const temp = +km.value;
    m.value = (temp * (1000 / 3600)).toFixed(2);
    const secAll = ((1 / temp) * 3600);
    [_, min.value, sec.value] = totalSecondsToHMS(secAll);
  };