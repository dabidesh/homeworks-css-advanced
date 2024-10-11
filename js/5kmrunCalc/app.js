import { man, wo, man21, wo21 } from './data.js';
//'use strict';
//@ts-nocheck

let p = console.log;

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

const HMStoSeconds2 = (hh, mm, ss) => {
  let hhNew, mmNew, ssNew;
  if (ss == undefined) {
    hhNew = 0;
    mmNew = +hh;
    ssNew = +mm;
  } else {
    hhNew = +hh;
    mmNew = +mm;
    ssNew = +ss;
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

  return (allSecWR / allSecTemp);
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

const setTimeByAgeAchievement = async (groupIndex) => {
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
      `${Math.round(allSec - allSecIntermediate)} с до „среден/на“!`;
    percentFastestId.value =
      `${str0}${((30 - tempSec1 * 30) + 20).toFixed(2)}%!`;
  } else if (allSec > allSecAdvanced) {
    levelId.value = 'Среден/на,';
    levelId2.value =
      `${Math.round(allSec - allSecAdvanced)} с до „напр.“!`;
    percentFastestId.value =
      `${str0}${((30 - tempSec2 * 30) + 50).toFixed(2)}%!`;
  } else if (allSec > allSecElite) {
    levelId.value = 'Напреднал/а,';
    levelId2.value =
      `${Math.round(allSec - allSecElite)} с до „елитен/на“!`;
    percentFastestId.value =
      `${str0}${((15 - tempSec3 * 15) + 80).toFixed(2)}%!`;
  } else if (allSec > allSecWR) {
    levelId.value = 'Елитен/на,';
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

const setTimesByFantasyAge = () => {
  let min, sec, allSec, ageSec, hh, mm, ss;

  let ageAchievement = updateAgeAchievement(+(ageId.value));

  let ageArray = [0, 'age1014', 'age1519', 'age2024', 'age2529', 'age3034', 'age3539',
    'age4044', 'age4549', 'age5054', 'age5559', 'age6064', 'age6569', 'age7074', 'age7579',
    'age8084', 'age8589', 'age90'];

  for (let i = 1; i <= 17; i++) {

    if (women.checked == true) {
      [min, sec] = wo[i].WR.split(':');
    } else {
      [min, sec] = man[i].WR.split(':');
    }

    allSec = Number(min) * 60 + Number(sec);

    ageSec = (allSec / ageAchievement);

    [hh, mm, ss] = totalSecondsToHMS(ageSec);

    eval(`${ageArray[i]}.value = '${hh}:${mm}:${ss}';`);
  }
};

const setAnotherDistances = () => {

  let record21;

  let ageAchievement = Number(achievementId.value);

  p('ageAchievement:', ageAchievement);

  if (women.checked == true) {
    record21 = wo21[+ageId.value].WR;
  } else {
    record21 = man21[+ageId.value].WR;
  }

  p(record21);

  let [hh, mm, ss] = record21.split(':')

  let allSec = HMStoSeconds2(hh, mm, ss);

  let time21Sec = allSec / (ageAchievement/100);

  p(time21Sec);

  [hh, mm, ss] = totalSecondsToHMS(time21Sec);

  time21.value = `${hh}:${mm}:${ss}`;
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
    [hour.value, min.value, sec.value] = totalSecondsToHMS(secAll);
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
  setTimesByFantasyAge();
  setAnotherDistances();
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

  const params = new URLSearchParams(window.location.search);

  if (params.has('time') || params.has('време')) {
    const timeString = params.get('time') || params.get('време');
    const timeArray = timeString.split(':');
    const lenTime = timeArray.length;
    if (lenTime == 3) {
      hourTime.value = timeArray[0];
      minTime.value = timeArray[1];
      secTime.value = timeArray[2];
    } else if (lenTime == 2) {
      hourTime.value = '00';
      minTime.value = timeArray[0];
      secTime.value = timeArray[1];
    } else if (lenTime == 1) {
      hourTime.value = '00';
      minTime.value = timeArray[0];
      secTime.value = '00';
    }
  } else if (allDataObj && allDataObj.hourTime) {
    hourTime.value = allDataObj.hourTime;
    minTime.value = allDataObj.minTime;
    secTime.value = allDataObj.secTime;
  } else {
    hourTime.value = '00';
    minTime.value = 23;
    secTime.value = '00';
  }

  //kmLengthId.value = allDataObj.kmLengthId;
  if (allDataObj && allDataObj.elevId) {
    elevId.value = allDataObj.elevId;
  }
  if (params.has('women') || params.has('жена')) {
    women.checked = true;
  } else if (allDataObj && allDataObj.women) {
    women.checked = allDataObj.women;
  }
  if (params.has('age')) {
    ageId.value = achievementArray.indexOf(Number(params.get('age')));
  } else if (params.has('възраст')) {
    ageId.value = achievementArray.indexOf(Number(params.get('възраст')));
  } else if (allDataObj && allDataObj.ageId) {
    ageId.value = allDataObj.ageId;
  }

  // tmp
  if (params.has('track') || params.has('трасе')) {
    //debugger;
    const trackString = params.get('track') || params.get('трасе');
    tracksId.value = arrayTracks[trackString];
  } else if (allDataObj && allDataObj.tracksId) {
    tracksId.value = allDataObj.tracksId;
  }
  if (params.has('restHR') || params.has('пулсВпокой')) {
    restHR.value = params.get('restHR') || params.get('пулсВпокой');
  } else if (allDataObj && allDataObj.restHR) {
    restHR.value = allDataObj.restHR;
  }
  if (params.has('zone') || params.has('зона')) {
    zoneId.value = params.get('zone') || params.get('зона');
  } else if (allDataObj && allDataObj.restHR) {
    zoneId.value = allDataObj.zoneId;
  }
  if (params.has('massa') || params.has('маса')) {
    massaKg.value = params.get('massa') || params.get('маса');
  } else if (allDataObj && allDataObj.massaKg) {
    massaKg.value = allDataObj.massaKg;
  }
  if (params.has('height') || params.has('височина') || params.has('ръст')) {
    heightCm.value = params.get('height') || params.get('височина')
      || params.get('ръст');
  } else if (allDataObj && allDataObj.heightCm) {
    heightCm.value = allDataObj.heightCm;
  }

  updateAllByTimeAndDistance();
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

// темпо
hour.onchange = hour.onkeyup =
  min.onchange = sec.onchange =
  min.onkeyup = sec.onkeyup = () => {
    const temp = (1 / ((+sec.value) / 60 + (+min.value) + (+hour.value) * 60)) * 60;
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
  async () => {

    achievementId.setAttribute('readonly', '');
    await setTimeByAgeAchievement(+ageId.value);

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

    await updateAllByTimeAndDistance({ achievement: false });
    achievementId.removeAttribute('readonly');
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
closeButtonHelpLevelsText.onclick = () => modalHelpLevels.close();

openButtonHelpProfileTrack.onclick = () => modalHelpProfileTrack.showModal();
closeButtonHelpProfileTrack.onclick = () => modalHelpProfileTrack.close();

openButtonHelpPuls.onclick = () => modalHelpPuls.showModal();
closeButtonHelpPuls.onclick = () => modalHelpPuls.close();
closeButtonHelpPulsText.onclick = () => modalHelpPuls.close();

openButtonAge.onclick = () => modalAge.showModal();
closeButtonAge.onclick = () => modalAge.close();
closeButtonAgeText.onclick = () => modalAge.close();

openButtonShare.onclick = () => {
  modalShare.showModal();
  const mainUrl = 'https://dabidesh.github.io/homeworks/js/5kmrunCalc/';
  let womenEng = '';
  let womenBul = '';
  if (women.checked == true) {
    womenEng = 'women';
    womenBul = 'жена';
  }
  linkEng.value = mainUrl + `?time=${hourTime.value}:${minTime.value}:${secTime.value}&age=${achievementArray[+ageId.value]}&track=${Object.keys(arrayTracks).find(key => arrayTracks[key] === +tracksId.value)}&restHR=${restHR.value}&zone=${zoneId.value}&massa=${massaKg.value}&height=${heightCm.value}&${womenEng}`;
  linkBul.value = mainUrl + `?време=${hourTime.value}:${minTime.value}:${secTime.value}&възраст=${achievementArray[+ageId.value]}&трасе=${Object.keys(arrayTracks).find(key => arrayTracks[key] === +tracksId.value)}&пулсВпокой=${restHR.value}&зона=${zoneId.value}&маса=${massaKg.value}&височина=${heightCm.value}&${womenBul}`;
};
closeButtonShare.onclick = () => modalShare.close();

copyEngParam.onclick = copyBulParam.onclick = async (e) => {
  const element = e.target.previousElementSibling;
  element.select();
  await navigator.clipboard.writeText(element.value);
};

openAnotherDistances.onclick = () => modalAnotherDistances.showModal();
closeAnotherDistances.onclick = () => modalAnotherDistances.close();

let arrayTracks = [];
arrayTracks['равна'] = 5000;
arrayTracks['западен2'] = 5444;
arrayTracks['борисова'] = 5364;
arrayTracks['южен'] = 5238;
arrayTracks['варна'] = 5182;
arrayTracks['бургас'] = 5158;
arrayTracks['пловдив'] = 5008;
arrayTracks['flat'] = 5000;
arrayTracks['zapaden2'] = 5444;
arrayTracks['borisova'] = 5364;
arrayTracks['yuzhen'] = 5238;
arrayTracks['varna'] = 5182;
arrayTracks['burgas'] = 5158;
arrayTracks['plovdiv'] = 5008;

const achievementArray =
  [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
