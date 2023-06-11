//'use strict';
const totalSecondsToHMS = (totalSeconds) => {
  const hourTime = String(Math.floor(totalSeconds / 3600))
    .padStart(2, '0');
  totalSeconds %= 3600;
  const minTime = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secTime = String(Math.floor(totalSeconds % 60)).padStart(2, '0');

  return [hourTime, minTime, secTime];
};

// bad code!!!
// good: ('01:02:03'.match(/:/g) || []).length; //2
const HMStoSeconds = (hh, mm, ss) => {
  let hhNew, mmNew, ssNew;
  if (hh == undefined) {
    hhNew = 0;
    mmNew = +mm;
    ssNew = +ss;
  } else {
    hhNew = +mm;
    mmNew = +ss;
    ssNew = +hh;
  }

  //console.log(('01:02:03'.match(/:/g) || []).length);
  //logs 2
  //mm,ss,hh

  return hhNew * 3600 + mmNew * 60 + ssNew;
};

const updateAgeAchievement = (groupIndex) => {
  let min, sec;
  if (women.checked == true) {
    [min, sec] = wo[groupIndex].WR.split(':');
  } else {
    [min, sec] = man[groupIndex].WR.split(':');
  }

  const allSecWR = (+min) * 60 + (+sec);
  const allSecTemp = (+hourTime.value) * 3600 + (+minTime.value) * 60 +
    (+secTime.value);

  achievementId.value = ((allSecWR / allSecTemp) * 100).toFixed(2);
};

const updateAgeAchievementMax = (groupIndex, secAllOnFlat) => {
  let min, sec;
  if (women.checked == true) {
    [min, sec] = wo[groupIndex].WR.split(':');
  } else {
    [min, sec] = man[groupIndex].WR.split(':');
  }

  const allSecWR = (+min) * 60 + (+sec);
  const [hh, mm, ss] = totalSecondsToHMS(secAllOnFlat);
  const allSecTemp = (+hh) * 3600 + (+mm) * 60 + (+ss);
  achievementMaxId.value = ((allSecWR / allSecTemp) * 100).toFixed(2);
};

const setTimeByAgeAchievement = (groupIndex) => {
  let min, sec;
  if (women.checked == true) {
    [min, sec] = wo[groupIndex].WR.split(':');
  } else {
    [min, sec] = man[groupIndex].WR.split(':');
  }

  const allSecWR = (+min) * 60 + (+sec);
  const newSec = (allSecWR / (+achievementId.value)) * 100;
  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(newSec);
};

const setLevel = (allSec, groupIndex) => {

  let str0, str1, strWR, strNewWR;

  allSec = Math.round(allSec);

  let hh, mm, ss, allSecWR, allSecBeginner, allSecNovice,
    allSecIntermediate, allSecAdvanced, allSecElite;
  if (women.checked == true) {
    str0 = 'По-бърза си от ';
    str1 = ' от бегачките!';
    strWR = 'Двете сте само!';
    strNewWR = 'Единствена си!';
    [mm, ss, hh] = wo[groupIndex].WR.split(':');
    allSecWR = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = wo[groupIndex].Beginner.split(':');
    allSecBeginner = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = wo[groupIndex].Novice.split(':');
    allSecNovice = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = wo[groupIndex].Intermediate.split(':');
    allSecIntermediate = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = wo[groupIndex].Advanced.split(':');
    allSecAdvanced = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = wo[groupIndex].Elite.split(':');
    allSecElite = Math.round(HMStoSeconds(hh, mm, ss));
  } else {
    str0 = 'По-бърз си от ';
    str1 = ' от бегачите!';
    strWR = 'Двамата сте само!';
    strNewWR = 'Единствен си!';
    [mm, ss, hh] = man[groupIndex].WR.split(':');
    allSecWR = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = man[groupIndex].Beginner.split(':');
    allSecBeginner = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = man[groupIndex].Novice.split(':');
    allSecNovice = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = man[groupIndex].Intermediate.split(':');
    allSecIntermediate = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = man[groupIndex].Advanced.split(':');
    allSecAdvanced = Math.round(HMStoSeconds(hh, mm, ss));
    [mm, ss, hh] = man[groupIndex].Elite.split(':');
    allSecElite = Math.round(HMStoSeconds(hh, mm, ss));
  }

  const SNAIL = 7200;

  const tempSec00 = (allSec - allSecBeginner) /
    (SNAIL - allSecBeginner);
  const tempSec0 = (allSec - allSecNovice) /
    (allSecBeginner - allSecNovice);
  const tempSec1 = (allSec - allSecIntermediate) /
    (allSecNovice - allSecIntermediate);
  const tempSec2 = (allSec - allSecAdvanced) / (allSecIntermediate - allSecAdvanced);
  const tempSec3 = (allSec - allSecElite) /
    (allSecAdvanced - allSecElite);
  const tempSec4 = (allSec - allSecWR) /
    (allSecElite - allSecWR);

  if (allSec > SNAIL) {
    levelId.value = 'Ти се тътриш,';
    levelId2.value =
      `${Math.round(allSec - allSecBeginner)} с до „начинаещ/а“!`;
    percentFastestId.value =
      `${str0}малцина!`;
  } else if (allSec > allSecBeginner) {
    levelId.value = 'Трябва да търчиш повече,';
    levelId2.value =
      `${Math.round(allSec - allSecBeginner)} с до „начинаещ/а“!`;
    percentFastestId.value =
      `${str0}${((5 - tempSec00 * 5)).toFixed(2)}%!`;
  } else if (allSec > allSecNovice) {
    levelId.value = 'Начинаещ/а,';
    levelId2.value =
      `${Math.round(allSec - allSecNovice)} с до „новак/чка“!`;
    percentFastestId.value =
      `${str0}${((15 - tempSec0 * 15) + 5).toFixed(2)}%!`;
  } else if (allSec > allSecIntermediate) {
    levelId.value = 'Новак/чка,';
    levelId2.value =
      `${Math.round(allSec - allSecIntermediate)} с до „среден/а“!`;
    percentFastestId.value =
      `${str0}${((30 - tempSec1 * 30) + 20).toFixed(2)}%!`;
  } else if (allSec > allSecAdvanced) {
    levelId.value = 'Среден/а,';
    levelId2.value =
      `${Math.round(allSec - allSecAdvanced)} с до „напр.“!`;
    percentFastestId.value =
      `${str0}${((30 - tempSec2 * 30) + 50).toFixed(2)}%!`;
  } else if (allSec > allSecElite) {
    levelId.value = 'Напреднал/а,';
    levelId2.value =
      `${Math.round(allSec - allSecElite)} с до „елитен/а“!`;
    percentFastestId.value =
      `${str0}${((15 - tempSec3 * 15) + 80).toFixed(2)}%!`;
  } else if (allSec > allSecWR) {
    levelId.value = 'Елитен/а,';
    levelId2.value = `${Math.round(allSec - allSecWR)} с до св. р.!`;
    percentFastestId.value =
      `${str0}${((5 - tempSec4 * 5) + 95).toFixed(2)}%!`;
  } else if (allSec == allSecWR) {
    levelId.value = 'Изр. св. рекорд!';
    levelId2.value = 'Изравнил/а си св. р.!';
    percentFastestId.value = strWR;
  } else if (allSec < allSecWR) {
    levelId.value = 'Нов св. рекорд!';
    levelId2.value = 'Подобр. с' + ` ${Math.round(allSecWR - allSec)} с!`;
    percentFastestId.value = strNewWR;
  }
};

const setKgAchievement = (allSec) => {
  //let woKgMin, woKgMax, manKgMin, manKgMax;  // = [50, 55, 60, 65];
  let woKgMin = ((+heightCm.value - 110) - (+heightCm.value - 110) * 0.1).toFixed(1);
  let woKgMax = ((+heightCm.value - 110) - (+heightCm.value - 110) * 0.05).toFixed(1);
  let manKgMin = ((+heightCm.value - 100) - (+heightCm.value - 100) * 0.1).toFixed(1);
  let manKgMax = ((+heightCm.value - 100) - (+heightCm.value - 100) * 0.05).toFixed(1);

  if (women.checked == true) {
    let temp1 = (allSec / Number(massaKg.value)) * woKgMin;
    let temp2 = (allSec / Number(massaKg.value)) * woKgMax;
    let [hh, mm, ss] = totalSecondsToHMS(temp1);
    let time1 = `${hh}:${mm}:${ss}`;
    [hh, mm, ss] = totalSecondsToHMS(temp2);
    let time2 = `${hh}:${mm}:${ss}`;
    achievementKgInfo.value = `Ако тежеше ${woKgMin}÷${woKgMax} кг:`;
    achievementKg.value = time1 + '÷' + time2 + ' писта';
  } else {
    let temp1 = (allSec / Number(massaKg.value)) * manKgMin;
    let temp2 = (allSec / Number(massaKg.value)) * manKgMax;
    let [hh, mm, ss] = totalSecondsToHMS(temp1);
    let time1 = `${hh}:${mm}:${ss}`;
    [hh, mm, ss] = totalSecondsToHMS(temp2);
    let time2 = `${hh}:${mm}:${ss}`;
    achievementKgInfo.value = `Ако тежеше ${manKgMin}÷${manKgMax} кг:`;
    achievementKg.value = time1 + '÷' + time2 + ' писта';
  }
};

const updateAllByTimeAndDistance = async (flag) => {
  if (flag == undefined) {
    flag = {};
  }
  if (flag.realFlatDistId == undefined) {
    flag.realFlatDistId = true;
  }

  if (flag.realFlatDistId) {
    realFlatDistId.value = Math.round((+kmLengthId.value) * 1000 + 7.92 * (+elevId.value));
  }

  if (flag.achievement == undefined) {
    flag.achievement = true;
  }

  if (flag.achievementMax == undefined) {
    flag.achievementMax = true;
  }

  if (flag.tempo == undefined) {
    flag.tempo = true;
  }

  if (flag.km == undefined) {
    flag.km = true;
  }

  if (flag.km) {
    const timeHours = +secTime.value / 3600 + (+minTime.value) / 60 +
      (+hourTime.value);
    km.value = (+kmLengthId.value / timeHours).toFixed(2);
  }

  if (flag.tempo) {
    const temp = +km.value;
    m.value = (temp * (1000 / 3600)).toFixed(2);
    const secAll = ((1 / temp) * 3600);
    [_, min.value, sec.value] = totalSecondsToHMS(secAll);
  }

  //console.log(+secTime.value);


  const secAllOnFlat =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      ((+realFlatDistId.value)));

  //delete secAllOnFlat;  //?
  //console.log(secAllOnFlat);

  const secAllOnZapaden2 =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      (5000 - (+realZapaden2Id.value - (+realFlatDistId.value))));

  const secAllOnBurgas =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      (5000 - (+realBurgasId.value - (+realFlatDistId.value))));

  const secAllOnVarna =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      (5000 - (+realVarnaId.value - (+realFlatDistId.value))));

  const secAllOnBorisova =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      (5000 - (+realBorisovaId.value - (+realFlatDistId.value))));

  const secAllOnYuzhen =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      (5000 - (+realYuzhenId.value - (+realFlatDistId.value))));

  const secAllOnPlovdiv =
    ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
    (((+kmLengthId.value) * 1000) /
      (5000 - (+realPlovdivId.value - (+realFlatDistId.value))));

  let [hh, mm, ss] = totalSecondsToHMS(secAllOnFlat);
  flatTimeId.value = `${hh}:${mm}:${ss}`;

  [hh, mm, ss] = totalSecondsToHMS(secAllOnZapaden2);
  zapaden2TimeId.value = `${hh}:${mm}:${ss}`;

  [hh, mm, ss] = totalSecondsToHMS(secAllOnBurgas);
  burgasTimeId.value = `${hh}:${mm}:${ss}`;

  [hh, mm, ss] = totalSecondsToHMS(secAllOnVarna);
  varnaTimeId.value = `${hh}:${mm}:${ss}`;

  [hh, mm, ss] = totalSecondsToHMS(secAllOnBorisova);
  borisovaTimeId.value = `${hh}:${mm}:${ss}`;

  [hh, mm, ss] = totalSecondsToHMS(secAllOnYuzhen);
  yuzhenTimeId.value = `${hh}:${mm}:${ss}`;

  [hh, mm, ss] = totalSecondsToHMS(secAllOnPlovdiv);
  plovdivTimeId.value = `${hh}:${mm}:${ss}`;

  if (flag.achievement) {
    updateAgeAchievement(+(ageId.value));
  }
  if (flag.achievementMax) {
    updateAgeAchievementMax(+(ageId.value), secAllOnFlat);
  }
  //kmLengthId.value = (+kmLengthId.value).toFixed(2);

  setLevel(secAllOnFlat, +(ageId.value));
  setKgAchievement(secAllOnFlat);
};

loadId.onclick = (e) => {
  e.preventDefault();

  const allDataObj = JSON.parse(localStorage.getItem('allDataObj'));

  if (!allDataObj) {
    alert('Трябва първо да запишеш данни!');
    return;
  }

  hourTime.value = allDataObj.hourTime;
  minTime.value = allDataObj.minTime;
  secTime.value = allDataObj.secTime;
  kmLengthId.value = allDataObj.kmLengthId;
  elevId.value = allDataObj.elevId;
  women.checked = allDataObj.women;
  ageId.value = allDataObj.ageId;
  // tmp
  if (allDataObj.tracksId) {
    tracksId.value = allDataObj.tracksId;
  }
  if (allDataObj.restHR) {
    restHR.value = allDataObj.restHR;
    zoneId.value = allDataObj.zoneId;
  }
  if (allDataObj.massaKg) {
    massaKg.value = allDataObj.massaKg;
  }
  if (allDataObj.heightCm) {
    heightCm.value = allDataObj.heightCm;
  }
  calculateHeartRates();
  updateAllByTimeAndDistance();
};

const loadNoAlert = async () => {

  const allDataObj = await JSON.parse(localStorage.getItem('allDataObj'));

  if (allDataObj) {
    hourTime.value = allDataObj.hourTime;
    minTime.value = allDataObj.minTime;
    secTime.value = allDataObj.secTime;
    kmLengthId.value = allDataObj.kmLengthId;
    elevId.value = allDataObj.elevId;
    women.checked = allDataObj.women;
    ageId.value = allDataObj.ageId;
    // tmp
    if (allDataObj.tracksId) {
      tracksId.value = allDataObj.tracksId;
    }
    if (allDataObj.restHR) {
      restHR.value = allDataObj.restHR;
      zoneId.value = allDataObj.zoneId;
    }
    if (allDataObj.massaKg) {
      massaKg.value = allDataObj.massaKg;
    }
    if (allDataObj.heightCm) {
      heightCm.value = allDataObj.heightCm;
    }

    updateAllByTimeAndDistance();
  }
};

convId.onclick = (e) => {
  e.preventDefault();

  if (confirm('Сигурен ли си, че искаш да презапишеш всичко?')) {

    const allDataObj = {
      'hourTime': hourTime.value,
      'minTime': minTime.value,
      'secTime': secTime.value,
      'kmLengthId': kmLengthId.value,
      'elevId': elevId.value,
      'women': women.checked ? true : false,
      'ageId': ageId.value,
      'tracksId': tracksId.value,
      'restHR': restHR.value,
      'zoneId': zoneId.value,
      'massaKg': massaKg.value,
      'heightCm': heightCm.value,
    };

    localStorage.setItem('allDataObj', JSON.stringify(allDataObj));
  }
};

clearId.onclick = (e) => {
  e.preventDefault();
  run.reset();
  women.checked = false;
  ageId.value = '7';
  tracksId.value = '5444';
  zoneId.value = '0.85';
  restHR.value = '56';
  massaKg.value = '74';
  heightCm.value = '174';
  calculateHeartRates();
  updateAllByTimeAndDistance();
};

/*helpProfileTrackId.onclick = (e) => {
  e.preventDefault();
  alert(`Опитай се да оцениш профила и трудността на трасето! Можеш да видиш с колко се удължава ако беше равна писта или директно избери реалната дължина!

Времената на различните трасета също ще се променят!`);
};

helpLevelsId.onclick = (e) => {
  e.preventDefault();
  alert(`Начинаещ/а: по-бърз/а от 5% от бегач(к)ите. Започнал/а е да търчи преди 1 месец.
Новак/чка: по-бърз/а от 20 % от бегач(к)ите. Започнал/а е  да търчи преди 6 месеца.
Среден/а:  по-бърз/а от 50 % от бегач(к)ите. Започнал/а е да търчи преди 2 години.
Напреднал: по-бърз/а от 80 % от бегач(к)ите. Започнал/а е да търчи преди 5 години.
Елитен/на: по-бърз/а от 95 % от бегач(к)ите. Започнал/а е да търчи преди повече от 5 години редовно и упорито!

Внимание – недовършена функционалност, нивото се определя по времето, изчислено за равна писта!`);
}; */

/* helpAchievementsId.onclick = (e) => {
  e.preventDefault();
  alert(`Възрастовото постижение е процента от световния рекорд в съответната възрастова група.

Внимание – недовършена функционалност, втората стойност е на база удължено трасе към равна писта, т.е. взима се времето от пистата!`);
};

helpPulsId.onclick = (e) => {
  e.preventDefault();
  alert(`Консултирайте се с лекар!

Работния пулс за търчане на 5 км трябва да бъде в аеробната зона, ако искаш постижението ти да бъде силно, но и безопасно (60÷85 % от максималния, според други източници 60÷80 %)(виж формулата).

Максимален, резерв, работен, пулс в покой [удари за минута]
Възраст [години]
Зона [%]

Максимален = 208 - (0.7 * Възраст)
Резерв = Максимален - Пулс в покой
Работен = Резерв * (Зона)/100 + (Пулс в покой)

При професионални спортисти и/или хора, които са в отлична форма, и/или биологичната им възраст не отговаря на действителната формулите не важат!

Съществуват функционални тесове за определяне на работния/максималния пулс.`);
};
*/
// темпо
min.onchange = sec.onchange =
  min.onkeyup = sec.onkeyup = () => {
    const temp = (1 / ((+sec.value) / 60 + (+min.value))) * 60;
    km.value = temp.toFixed(2);
    m.value = (temp * (1000 / 3600)).toFixed(2);

    [hourTime.value, minTime.value, secTime.value] =
      totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

    //updateAgeAchievement(Number(ageId.value));
    updateAllByTimeAndDistance({ tempo: false });
  };

km.onchange = km.onkeyup = () => {
  const temp = +km.value;
  m.value = (temp * (1000 / 3600)).toFixed(2);
  const secAll = ((1 / temp) * 3600);
  [_, min.value, sec.value] = totalSecondsToHMS(secAll);

  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

  //updateAgeAchievement(Number(ageId.value));
  updateAllByTimeAndDistance({ km: false });
};

m.onchange = m.onkeyup = () => {
  const temp = +m.value * 3.6;
  km.value = temp.toFixed(2);
  const secAll = ((1 / temp) * 3600);
  [_, min.value, sec.value] = totalSecondsToHMS(secAll);

  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

  updateAgeAchievement(Number(ageId.value));
  updateAllByTimeAndDistance();
};

hourTime.onchange = minTime.onchange =
  secTime.onchange = kmLengthId.onchange =
  hourTime.onkeyup = minTime.onkeyup =
  secTime.onkeyup = kmLengthId.onkeyup =
  kmLengthId.onchange =
  elevId.onchange = elevId.onkeyup =
  massaKg.onchange = massaKg.onkeyup =
  heightCm.onchange = heightCm.onkeyup = () => {
    //hourTime.value = hourTime.value.padStart(2, '0');
    updateAllByTimeAndDistance();
  };

realFlatDistId.onchange = realFlatDistId.onkeyup = () => {

  const tmp = ((+realFlatDistId.value) - (+kmLengthId.value) * 1000) /
    7.92;
  elevId.value = Math.round(tmp);
  updateAllByTimeAndDistance({ realFlatDistId: false });
};

women.onchange = () => {
  updateAllByTimeAndDistance();
};

achievementId.onchange = achievementId.onkeyup =
  () => {
    setTimeByAgeAchievement(+ageId.value);

    const timeHours = +secTime.value / 3600 + (+minTime.value) / 60 +
      (+hourTime.value);
    km.value = (+kmLengthId.value / timeHours).toFixed(2);

    const temp = +km.value;
    m.value = (temp * (1000 / 3600)).toFixed(2);
    const secAll = ((1 / temp) * 3600);
    [_, min.value, sec.value] = totalSecondsToHMS(secAll);

    const secAllOnFlat =
      ((+hourTime.value) * 3600 + (+minTime.value) * 60 + (+secTime.value)) *
      (((+kmLengthId.value) * 1000) / (+realFlatDistId.value));

    const [hh, mm, ss] = totalSecondsToHMS(secAllOnFlat);
    flatTimeId.value = `${hh}:${mm}:${ss}`;

    updateAllByTimeAndDistance({ achievement: false });
  };

const sleepDeep = ms => {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
};

window.onload = async () => {

  women.checked = false;
  ageId.value = '7';
  tracksId.value = '5444';
  await sleepDeep(300);
  zoneId.value = '0.85';
  loadNoAlert();
  await calculateHeartRates();
  await updateAllByTimeAndDistance();

  summaryId.click();
  //await sleepDeep(1000);
  //summaryPulsId.click();
  summaryFormulaId.click();
};

tracksId.onchange = () => {
  realFlatDistId.value = tracksId.value;

  const tmp = ((+realFlatDistId.value) - (+kmLengthId.value) * 1000) /
    7.92;
  elevId.value = Math.round(tmp);
  updateAllByTimeAndDistance({ realFlatDistId: false });
};

restHR.onchange = restHR.onkeyup =
  zoneId.onchange = zoneId.onkeyup =
  ageId.onchange = () => {
    calculateHeartRates();
    updateAllByTimeAndDistance();
  };

distanceSId.onchange = () => {
  distanceId.value = distanceSId.value;
  setAllByTimeAndDistance();
};

daysId.onchange = daysId.onkeyup =
  hoursId.onchange = hoursId.onkeyup =
  minutesId.onchange = minutesId.onkeyup =
  secondsId.onchange = secondsId.onkeyup =
  hundredthsId.onchange = hundredthsId.onkeyup =
  distanceId.onchange = distanceId.onkeyup = () => {
    setAllByTimeAndDistance();
  };

const setAllByTimeAndDistance = () => {
  const hundredthsAll =
    ((+daysId.value) * 360000 * 24 + (+hoursId.value) * 360000 + (+minutesId.value) * 6000 + (+secondsId.value) * 100 +
      (+hundredthsId.value));
  const hoursAll = hundredthsAll / 360000;
  const temp = (+distanceId.value) / hoursAll;
  speedKmhId.value = temp.toFixed(3);

  const secAll = ((1 / temp) * 3600);
  [hourTempoForKm.value, minTempoForKm.value, secTempoForKm.value] =
    totalSecondsToHMS(secAll);

  secTempoFor100m.value = ((1 / temp) * (3600 / 10)).toFixed(3);
};

const calculateHeartRates = async () => {
  const MHR1 = 208 - (0.7 * achievementArray[+ageId.value]);
  const MHR2 = 208 - (0.7 * (achievementArray[+ageId.value] + 4));

  const reserve1 = MHR1 - (+restHR.value);
  const reserve2 = MHR2 - (+restHR.value);

  const workRate1 = Math.round(reserve1 * (+zoneId.value) + (+restHR.value));
  const workRate2 = Math.round(reserve2 * (+zoneId.value) + (+restHR.value));

  workRateId.value = `${workRate1}÷${workRate2}`;
};

const openButtonHelpAchievement = document.querySelector('[data-open-modal-helpAchievement]');
const closeButtonHelpAchievement =
  document.querySelector('[data-close-modal-helpAchievement]');
const modalHelpAchievement = document.querySelector('[data-modal-helpAchievement]');

openButtonHelpAchievement.onclick = (e) => {
  e.preventDefault();
  modalHelpAchievement.showModal();
};
closeButtonHelpAchievement.onclick = (e) => {
  e.preventDefault();
  modalHelpAchievement.close();
};

openButtonHelpLevels.onclick = () => modalHelpLevels.showModal();
closeButtonHelpLevels.onclick = () => modalHelpLevels.close();

openButtonHelpProfileTrack.onclick = () => modalHelpProfileTrack.showModal();
closeButtonHelpProfileTrack.onclick = () => modalHelpProfileTrack.close();

openButtonHelpPuls.onclick = () => modalHelpPuls.showModal();
closeButtonHelpPuls.onclick = () => modalHelpPuls.close();
closeButtonHelpPulsText.onclick = () => modalHelpPuls.close();

const achievementArray =
  [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];

const wo = [
  {
    "Age": 0,
    "Beginner": "41:43",
    "Novice": "35:54",
    "Intermediate": "30:50",
    "Advanced": "27:04",
    "Elite": "24:36",
    "WR": "17:15"
  },
  {
    "Age": 10,
    "Beginner": "41:43",
    "Novice": "35:54",
    "Intermediate": "30:50",
    "Advanced": "27:04",
    "Elite": "24:36",
    "WR": "17:15"
  },
  {
    "Age": 15,
    "Beginner": "37:27",
    "Novice": "32:14",
    "Intermediate": "27:40",
    "Advanced": "24:18",
    "Elite": "22:05",
    "WR": "15:29"
  },
  {
    "Age": 20,
    "Beginner": "35:39",
    "Novice": "30:41",
    "Intermediate": "26:21",
    "Advanced": "23:08",
    "Elite": "21:01",
    "WR": "14:44"
  },
  {
    "Age": 25,
    "Beginner": "35:39",
    "Novice": "30:41",
    "Intermediate": "26:21",
    "Advanced": "23:08",
    "Elite": "21:01",
    "WR": "14:44"
  },
  {
    "Age": 30,
    "Beginner": "35:39",
    "Novice": "30:41",
    "Intermediate": "26:21",
    "Advanced": "23:08",
    "Elite": "21:01",
    "WR": "14:44"
  },
  {
    "Age": 35,
    "Beginner": "35:53",
    "Novice": "30:53",
    "Intermediate": "26:31",
    "Advanced": "23:17",
    "Elite": "21:09",
    "WR": "14:50"
  },
  {
    "Age": 40,
    "Beginner": "36:37",
    "Novice": "31:31",
    "Intermediate": "27:04",
    "Advanced": "23:46",
    "Elite": "21:35",
    "WR": "15:08"
  },
  {
    "Age": 45,
    "Beginner": "37:56",
    "Novice": "32:39",
    "Intermediate": "28:02",
    "Advanced": "24:37",
    "Elite": "22:22",
    "WR": "15:41"
  },
  {
    "Age": 50,
    "Beginner": "39:53",
    "Novice": "34:20",
    "Intermediate": "29:29",
    "Advanced": "25:53",
    "Elite": "23:31",
    "WR": "16:29"
  },
  {
    "Age": 55,
    "Beginner": "42:11",
    "Novice": "36:18",
    "Intermediate": "31:10",
    "Advanced": "27:22",
    "Elite": "24:52",
    "WR": "17:26"
  },
  {
    "Age": 60,
    "Beginner": "44:45",
    "Novice": "38:31",
    "Intermediate": "33:04",
    "Advanced": "29:02",
    "Elite": "26:23",
    "WR": "18:30"
  },
  {
    "Age": 65,
    "Beginner": "47:39",
    "Novice": "41:01",
    "Intermediate": "35:13",
    "Advanced": "30:55",
    "Elite": "28:06",
    "WR": "19:42"
  },
  {
    "Age": 70,
    "Beginner": "50:58",
    "Novice": "43:52",
    "Intermediate": "37:40",
    "Advanced": "33:04",
    "Elite": "30:03",
    "WR": "21:04"
  },
  {
    "Age": 75,
    "Beginner": "54:46",
    "Novice": "47:08",
    "Intermediate": "40:28",
    "Advanced": "35:32",
    "Elite": "32:17",
    "WR": "22:38"
  },
  {
    "Age": 80,
    "Beginner": "59:17",
    "Novice": "51:01",
    "Intermediate": "43:49",
    "Advanced": "38:28",
    "Elite": "34:57",
    "WR": "24:30"
  },
  {
    "Age": 85,
    "Beginner": "01:06:45",
    "Novice": "57:27",
    "Intermediate": "49:20",
    "Advanced": "43:19",
    "Elite": "39:21",
    "WR": "27:35"
  },
  {
    "Age": 90,
    "Beginner": "01:20:27",
    "Novice": "01:09:15",
    "Intermediate": "59:27",
    "Advanced": "52:12",
    "Elite": "47:26",
    "WR": "33:15"
  }
];

const man = [
  {
    "Age": 0,
    "Beginner": "37:44",
    "Novice": "31:30",
    "Intermediate": "27:07",
    "Advanced": "23:50",
    "Elite": "21:18",
    "WR": "15:22"
  },
  {
    "Age": 10,
    "Beginner": "37:44",
    "Novice": "31:30",
    "Intermediate": "27:07",
    "Advanced": "23:50",
    "Elite": "21:18",
    "WR": "15:22"
  },
  {
    "Age": 15,
    "Beginner": "32:40",
    "Novice": "27:16",
    "Intermediate": "23:28",
    "Advanced": "20:38",
    "Elite": "18:26",
    "WR": "13:18"
  },
  {
    "Age": 20,
    "Beginner": "31:33",
    "Novice": "26:21",
    "Intermediate": "22:40",
    "Advanced": "19:56",
    "Elite": "17:49",
    "WR": "12:51"
  },
  {
    "Age": 25,
    "Beginner": "31:33",
    "Novice": "26:21",
    "Intermediate": "22:40",
    "Advanced": "19:56",
    "Elite": "17:49",
    "WR": "12:51"
  },
  {
    "Age": 30,
    "Beginner": "31:34",
    "Novice": "26:21",
    "Intermediate": "22:40",
    "Advanced": "19:56",
    "Elite": "17:49",
    "WR": "12:51"
  },
  {
    "Age": 35,
    "Beginner": "32:04",
    "Novice": "26:46",
    "Intermediate": "23:02",
    "Advanced": "20:15",
    "Elite": "18:06",
    "WR": "13:03"
  },
  {
    "Age": 40,
    "Beginner": "33:14",
    "Novice": "27:45",
    "Intermediate": "23:52",
    "Advanced": "20:59",
    "Elite": "18:46",
    "WR": "13:32"
  },
  {
    "Age": 45,
    "Beginner": "34:30",
    "Novice": "28:48",
    "Intermediate": "24:47",
    "Advanced": "21:48",
    "Elite": "19:29",
    "WR": "14:03"
  },
  {
    "Age": 50,
    "Beginner": "35:52",
    "Novice": "29:57",
    "Intermediate": "25:46",
    "Advanced": "22:40",
    "Elite": "20:15",
    "WR": "14:37"
  },
  {
    "Age": 55,
    "Beginner": "37:22",
    "Novice": "31:12",
    "Intermediate": "26:50",
    "Advanced": "23:36",
    "Elite": "21:06",
    "WR": "15:13"
  },
  {
    "Age": 60,
    "Beginner": "38:59",
    "Novice": "32:32",
    "Intermediate": "28:00",
    "Advanced": "24:37",
    "Elite": "22:00",
    "WR": "15:52"
  },
  {
    "Age": 65,
    "Beginner": "40:44",
    "Novice": "34:01",
    "Intermediate": "29:16",
    "Advanced": "25:44",
    "Elite": "23:00",
    "WR": "16:35"
  },
  {
    "Age": 70,
    "Beginner": "42:49",
    "Novice": "35:45",
    "Intermediate": "30:46",
    "Advanced": "27:03",
    "Elite": "24:11",
    "WR": "17:26"
  },
  {
    "Age": 75,
    "Beginner": "46:02",
    "Novice": "38:26",
    "Intermediate": "33:04",
    "Advanced": "29:04",
    "Elite": "25:59",
    "WR": "18:45"
  },
  {
    "Age": 80,
    "Beginner": "50:57",
    "Novice": "42:32",
    "Intermediate": "36:36",
    "Advanced": "32:11",
    "Elite": "28:46",
    "WR": "20:45"
  },
  {
    "Age": 85,
    "Beginner": "58:37",
    "Novice": "48:56",
    "Intermediate": "42:06",
    "Advanced": "37:01",
    "Elite": "33:05",
    "WR": "23:52"
  },
  {
    "Age": 90,
    "Beginner": "01:11:19",
    "Novice": "59:32",
    "Intermediate": "51:14",
    "Advanced": "45:03",
    "Elite": "40:16",
    "WR": "29:02"
  }];
