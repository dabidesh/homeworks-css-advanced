import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [women, setWomen] = useState(false);
  const [hourTime, setHourTime] = useState('00');
  const [minTime, setMinTime] = useState(22);
  const [secTime, setSecTime] = useState(56);
  const [tracksId, setTracksId] = useState(5444);
  const [ageId, setAgeId] = useState(7);
  const [zoneId, setZoneId] = useState(0.85);
  const [restHR, setRestHR] = useState(54);
  const [workRateId, setWorkRateId] = useState('161÷159');
  const [min, setMin] = useState('04');
  const [sec, setSec] = useState(35);
  const [km, setKm] = useState(5.00);
  const [achievementId, setAchievementId] = useState(59.01);
  const [achievementMaxId, setAchievementMaxId] = useState(64.29);
  const [percentFastestId, setPercentFastestId] = useState();
  const [levelId, setLevelId] = useState();
  const [levelId2, setLevelId2] = useState();
  const [elevId, setElevId] = useState();
  const [realFlatDistId, setRealFlatDistId] = useState(5444);
  const [flatTimeId, setFlatTimeId] = useState();
  const [zapaden2TimeId, setZapaden2TimeId] = useState();
  const [borisovaTimeId, setBorisovaTimeId] = useState();
  const [yuzhenTimeId, setYuzhenTimeId] = useState();
  const [varnaTimeId, setVarnaTimeId] = useState();
  const [burgasTimeId, setBurgasTimeId] = useState();
  const [plovdivTimeId, setPlovdivTimeId] = useState();
  const [m, setM] = useState();
  const [kmLengthId, setKmLengthId] = useState();

  const onWomenChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setWomen(true);
    } else {
      setWomen(false);
    }
    updateAllByTimeAndDistance();
  };

  const onHourTimeChange = (e) => {
    setHourTime(e.target.value);
    updateAllByTimeAndDistance();
  };

  const onMinTimeChange = (e) => {
    setMinTime(e.target.value);
    updateAllByTimeAndDistance();
  };

  const onSecTimeChange = (e) => {
    setSecTime(e.target.value);
    updateAllByTimeAndDistance();
  };

  const onTracksIdChange = (e) => {
    setTracksId(e.target.value);
  };

  const onAgeIdChange = (e) => {
    setAgeId(e.target.value);
  };

  const onZoneIdChange = (e) => {
    setZoneId(e.target.value);
  };

  const onRestHRChange = (e) => {
    setRestHR(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onKmChange = (e) => {
    setKm(e.target.value);
  };

  const onAchievementIdChange = (e) => {
    setAchievementId(e.target.value);
  };

  const onElevIdChange = (e) => {
    setElevId(e.target.value);
  };

  const onRealFlatDistIdChange = (e) => {
    setRealFlatDistId(e.target.value);
  };

  const onMChange = (e) => {
    setM(e.target.value);
  };

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

  const updateAgeАchievement = (groupIndex) => {
    let min, sec;
    if (women == true) {
      [min, sec] = wo[groupIndex].WR.split(':');
    } else {
      [min, sec] = man[groupIndex].WR.split(':');
    }

    const allSecWR = (+min) * 60 + (+sec);
    const allSecTemp = hourTime * 3600 + minTime * 60 +
      secTime;

    setAchievementId(((allSecWR / allSecTemp) * 100).toFixed(2));
  };

  const updateAgeАchievementMax = (groupIndex, secAllOnFlat) => {
    let min, sec;
    if (women == true) {
      [min, sec] = wo[groupIndex].WR.split(':');
    } else {
      [min, sec] = man[groupIndex].WR.split(':');
    }

    const allSecWR = (+min) * 60 + (+sec);
    const [hh, mm, ss] = totalSecondsToHMS(secAllOnFlat);
    const allSecTemp = (+hh) * 3600 + (+mm) * 60 + (+ss);
    setAchievementMaxId(((allSecWR / allSecTemp) * 100).toFixed(2));
  };

  const setTimeByAgeAchievement = (groupIndex) => {
    let min, sec;
    if (women == true) {
      [min, sec] = wo[groupIndex].WR.split(':');
    } else {
      [min, sec] = man[groupIndex].WR.split(':');
    }

    const allSecWR = (+min) * 60 + (+sec);
    const newSec = (allSecWR / (+achievementId)) * 100;
    const [hourTime, minTime, secTime] =
      totalSecondsToHMS(newSec);
    setHourTime(hourTime);
    setMinTime(minTime);
    setSecTime(secTime);
  };

  const setLevel = (allSec, groupIndex) => {

    let str0, str1, strWR, strNewWR;

    allSec = Math.round(allSec);

    let hh, mm, ss, allSecWR, allSecBeginner, allSecNovice,
      allSecIntermediate, allSecAdvanced, allSecElite;
    if (women == true) {
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
      setLevelId('Ти се тътриш,');
      setLevelId2(`${Math.round(allSec - allSecBeginner)} с до „начинаещ/а“!`);
      setPercentFastestId(`${str0}малцина!`);
    } else if (allSec > allSecBeginner) {
      setLevelId('Трябва да търчиш повече,');
      setLevelId2(`${Math.round(allSec - allSecBeginner)} с до „начинаещ/а“!`);
      setPercentFastestId(`${str0}${((5 - tempSec00 * 5)).toFixed(2)}%!`);
    } else if (allSec > allSecNovice) {
      setLevelId('Начинаещ/а,');
      setLevelId2(`${Math.round(allSec - allSecNovice)} с до „новак/чка“!`);
      setPercentFastestId(`${str0}${((15 - tempSec0 * 15) + 5).toFixed(2)}%!`);
    } else if (allSec > allSecIntermediate) {
      setLevelId('Новак/чка,');
      setLevelId2(`${Math.round(allSec - allSecIntermediate)} с до „среден/а“!`);
      setPercentFastestId(`${str0}${((30 - tempSec1 * 30) + 20).toFixed(2)}%!`);
    } else if (allSec > allSecAdvanced) {
      setLevelId('Среден/а,');
      setLevelId2(`${Math.round(allSec - allSecAdvanced)} с до „напр.“!`);
      setPercentFastestId(`${str0}${((30 - tempSec2 * 30) + 50).toFixed(2)}%!`);
    } else if (allSec > allSecElite) {
      setLevelId('Напреднал/а,');
      setLevelId2(`${Math.round(allSec - allSecElite)} с до „елитен/а“!`);
      setPercentFastestId(`${str0}${((15 - tempSec3 * 15) + 80).toFixed(2)}%!`);
    } else if (allSec > allSecWR) {
      setLevelId('Елитен/а,');
      setLevelId2(`${Math.round(allSec - allSecWR)} с до св. р.!`);
      setPercentFastestId(`${str0}${((5 - tempSec4 * 5) + 95).toFixed(2)}%!`);
    } else if (allSec == allSecWR) {
      setLevelId('Изр. св. рекорд!');
      setLevelId2('Изравнил/а си св. р.!');
      setPercentFastestId(strWR);
    } else if (allSec < allSecWR) {
      setLevelId('Нов св. рекорд!');
      setLevelId2('Подобр. с' + ` ${Math.round(allSecWR - allSec)} с!`);
      setPercentFastestId(strNewWR);
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
      setRealFlatDistId(Math.round(kmLengthId * 1000 + 7.92 * (elevId)));
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
      const timeHours = +secTime / 3600 + (+minTime) / 60 +
        (+hourTime);
      setKm((+kmLengthId / timeHours).toFixed(2));
    }

    if (flag.tempo) {
      const temp = +km;
      setM((temp * (1000 / 3600)).toFixed(2));
      const secAll = ((1 / temp) * 3600);
      let [_, min, sec] = totalSecondsToHMS(secAll);
      setMin(min);
      setSec(sec);
    }

    const secAllOnFlat =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        ((+realFlatDistId)));

    const secAllOnZapaden2 =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        (5000 - (+realZapaden2Id - (+realFlatDistId))));

    const secAllOnBurgas =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        (5000 - (+realBurgasId - (+realFlatDistId))));

    const secAllOnVarna =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        (5000 - (+realVarnaId - (+realFlatDistId))));

    const secAllOnBorisova =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        (5000 - (+realBorisovaId - (+realFlatDistId))));

    const secAllOnYuzhen =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        (5000 - (+realYuzhenId - (+realFlatDistId))));

    const secAllOnPlovdiv =
      ((+hourTime) * 3600 + (+minTime) * 60 + (+secTime)) *
      (((+kmLengthId) * 1000) /
        (5000 - (+realPlovdivId - (+realFlatDistId))));

    let [hh, mm, ss] = totalSecondsToHMS(secAllOnFlat);
    setFlatTimeId(`${hh}:${mm}:${ss}`);

    [hh, mm, ss] = totalSecondsToHMS(secAllOnZapaden2);
    setZapaden2TimeId(`${hh}:${mm}:${ss}`);

    [hh, mm, ss] = totalSecondsToHMS(secAllOnBurgas);
    setBurgasTimeId(`${hh}:${mm}:${ss}`);

    [hh, mm, ss] = totalSecondsToHMS(secAllOnVarna);
    setVarnaTimeId(`${hh}:${mm}:${ss}`);

    [hh, mm, ss] = totalSecondsToHMS(secAllOnBorisova);
    setBorisovaTimeId(`${hh}:${mm}:${ss}`);

    [hh, mm, ss] = totalSecondsToHMS(secAllOnYuzhen);
    setYuzhenTimeId(`${hh}:${mm}:${ss}`);

    [hh, mm, ss] = totalSecondsToHMS(secAllOnPlovdiv);
    setPlovdivTimeId(`${hh}:${mm}:${ss}`);

    if (flag.achievement) {
      updateAgeАchievement(+(ageId));
    }
    if (flag.achievementMax) {
      updateAgeАchievementMax(+(ageId), secAllOnFlat);
    }
    //kmLengthId.value = (+kmLengthId.value).toFixed(2);

    setLevel(secAllOnFlat, +(ageId));
  };

  const helpProfileTrackId = (e) => {
    e.preventDefault();
    alert(`Опитай се да оцениш профила и трудността на трасето! Можеш да видиш с колко се удължава ако беше равна писта или директно избери реалната дължина!

    Времената на различните трасета също ще се променят!`);
  };

  const helpLevelsId = (e) => {
    e.preventDefault();
    alert(`Начинаещ/а: по-бърз/а от 5% от бегач(к)ите. Започнал/а е да търчи преди 1 месец.
Новак/чка: по-бърз/а от 20 % от бегач(к)ите. Започнал/а е  да търчи преди 6 месеца.
Среден/а:  по-бърз/а от 50 % от бегач(к)ите. Започнал/а е да търчи преди 2 години.
Напреднал: по-бърз/а от 80 % от бегач(к)ите. Започнал/а е да търчи преди 5 години.
Елитен/на: по-бърз/а от 95 % от бегач(к)ите. Започнал/а е да търчи преди повече от 5 години редовно и упорито!

Внимание – недовършена функционалност, нивото се определя по времето, изчислено за равна писта!`);
  };

  const helpAchievementsId = (e) => {
    e.preventDefault();
    alert(`Възрастовото постижение е процента от световния рекорд в съответната възрастова група.

Внимание – недовършена функционалност, втората стойност е на база удължено трасе към равна писта, т.е. взима се времето от пистата!`);
  };

  const helpPulsId = (e) => {
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

  // темпо
  /* min.onchange = sec.onchange =
    min.onkeyup = sec.onkeyup = () => {
      const temp = (1 / ((+sec.value) / 60 + (+min.value))) * 60;
      km.value = temp.toFixed(2);
      m.value = (temp * (1000 / 3600)).toFixed(2);

      [hourTime.value, minTime.value, secTime.value] =
        totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

      //updateAgeАchievement(Number(ageId.value));
      updateAllByTimeAndDistance({ tempo: false });
    };

  km.onchange = km.onkeyup = () => {
    const temp = +km.value;
    m.value = (temp * (1000 / 3600)).toFixed(2);
    const secAll = ((1 / temp) * 3600);
    let _;
    [_, min.value, sec.value] = totalSecondsToHMS(secAll);

    [hourTime.value, minTime.value, secTime.value] =
      totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

    //updateAgeАchievement(Number(ageId.value));
    updateAllByTimeAndDistance({ km: false });
  };

  m.onchange = m.onkeyup = () => {
    const temp = +m.value * 3.6;
    km.value = temp.toFixed(2);
    const secAll = ((1 / temp) * 3600);
    let _;
    [_, min.value, sec.value] = totalSecondsToHMS(secAll);

    [hourTime.value, minTime.value, secTime.value] =
      totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

    updateAgeАchievement(Number(ageId.value));
    updateAllByTimeAndDistance();
  };

  hourTime.onchange = minTime.onchange =
    secTime.onchange = kmLengthId.onchange =
    hourTime.onkeyup = minTime.onkeyup =
    secTime.onkeyup = kmLengthId.onkeyup =
    kmLengthId.onchange =
    elevId.onchange = elevId.onkeyup = () => {
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
      let _;
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
    }; */

  const calculateHeartRates = async () => {
    const MHR1 = 208 - (0.7 * achievementArray[ageId]);
    const MHR2 = 208 - (0.7 * (achievementArray[ageId] + 4));

    const reserve1 = MHR1 - restHR;
    const reserve2 = MHR2 - restHR;

    const workRate1 = Math.round(reserve1 * zoneId + restHR);
    const workRate2 = Math.round(reserve2 * zoneId + restHR);

    setWorkRateId(`${workRate1}÷${workRate2}`);
  };

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

  const realZapaden2Id = 5444;
  const realBorisovaId = 5364;
  const realYuzhenId = 5238;
  const realVarnaId = 5182;
  const realBurgasId = 5128;
  const realPlovdivId = 5008;

  return (
    <>
      <h1 id="up">Търчане с <a href="https://5kmrun.bg/" title="Свободно, но организирано бягане ...">5kmrun</a></h1>
      <form id="run">
        <input id="hourTime" placeholder="час" type="number" min="0" max="99" value={hourTime} onChange={onHourTimeChange}
          onKeyUp={onHourTimeChange} />ч
        <input id="minTime" placeholder="мин" type="number" min="0" max="59" value={minTime} onChange={onMinTimeChange}
          onKeyUp={onMinTimeChange} />м
        <input id="secTime" placeholder="сек" type="number" min="0" max="59" value={secTime} onChange={onSecTimeChange}
          onKeyUp={onSecTimeChange} />с време
        <br />
        <select id="tracksId" class="toLong" value={tracksId}
          onChange={onTracksIdChange} >
          <option value="5000">Избери трасе ...</option>
          <option id="flatId" value="5000">Равна писта</option>
          <option id="realZapaden2Id" value="5444">„Западен парк 2“, гр. София</option>
          <option id="realBorisovaId" value="5364">„Борисовата градина“, гр. София</option>
          <option id="realYuzhenId" value="5238">„Южен парк“, гр. София</option>
          <option id="realVarnaId" value="5182">„Морска градина“, гр. Варна</option>
          <option id="realBurgasId" value="5158">„Морска градина“, гр. Бургас</option>
          <option id="realPlovdivId" value="5008">„Гребен канал 2“, гр. Пловдив</option>
        </select><br />
        <select id="ageId" value={ageId} onChange={onAgeIdChange} >
          <option value="0">Възр.</option>
          <option value="1">10÷14</option>
          <option value="2">15÷19</option>
          <option value="3">20÷24</option>
          <option value="4">25÷29</option>
          <option value="5">30÷34</option>
          <option value="6">35÷39</option>
          <option value="7">40÷44</option>
          <option value="8">45÷49</option>
          <option value="9">50÷54</option>
          <option value="10">55÷59</option>
          <option value="11">60÷64</option>
          <option value="12">65÷69</option>
          <option value="13">70÷74</option>
          <option value="14">75÷79</option>
          <option value="15">80÷84</option>
          <option value="16">85÷89</option>
          <option value="17">90÷∞</option>
        </select> <label for="women"> Жена</label><input type="checkbox" id="women" onChange={onWomenChange} /><br />
        <select id="zoneId" value={zoneId} onChange={onZoneIdChange} >
          <option value="0">Зона ...</option>
          <option value="0.1">10%</option>
          <option value="0.2">20%</option>
          <option value="0.3">30%</option>
          <option value="0.4">40%</option>
          <option value="0.5">50%</option>
          <option value="0.6">60%</option>
          <option value="0.7">70%</option>
          <option value="0.8">80%</option>
          <option value="0.85">85%</option>
          <option value="0.9">90%</option>
          <option value="1">100%</option>
        </select>
        <label for="restHR">Пулс </label>
        <input id="restHR" placeholder="пулс" type="number" min="0" max="200" value={restHR} onChange={onRestHRChange} />
        <br />
        <input id="workRateId" class="long" type="text"
          value={workRateId} readOnly />
        удара/мин <button id="helpPulsId" class="help" onClick={helpPulsId} >?</button><br />
        <input id="min" placeholder="мин" type="number" min="0" max="59" value={min} onChange={onMinChange} onKeyUp={onMinChange} />м
        <input id="sec" placeholder="сек" type="number" min="0" max="59" value={sec} onChange={onSecChange} onKeyUp={onSecChange} />с/км темпо
        <br />
        <input id="km" class="long" type="number" step="0.01" min="0" max="18000" value={km}
          onChange={onKmChange} onKeyUp={onKmChange} /> км/ч<br />
        Възрастово постижение <button id="helpAchievementsId" class="help" onClick={helpAchievementsId}>?</button><br />
        <input id="achievementId" class="long" type="number" value={achievementId} step="0.01"
          onChange={onAchievementIdChange} onKeyUp={onAchievementIdChange} />% ÷ <input id="achievementMaxId"
            class="long" type="number" value={achievementMaxId} readOnly />%<br />
        <span>Ниво: </span><button id="helpLevelsId" class="help" onClick={helpLevelsId} >?</button><br />
        <input id="percentFastestId" class="toLong" type="text" value={percentFastestId} readOnly /><br />
        <input id="levelId" class="toLong" type="text" value={levelId} readOnly /><br />
        <input id="levelId2" class="toLong" type="text" value={levelId2} readOnly /><br />
        <input id="elevId" class="long" type="number" value={elevId} step="1"
          onChange={onElevIdChange} onKeyUp={onElevIdChange} /> денив./изк.<button id="helpProfileTrackId"
            class="help" onClick={helpProfileTrackId} >?</button><br />
        <input id="realFlatDistId" class="long" type="number" value={realFlatDistId} step="1"
          onChange={onRealFlatDistIdChange} onKeyUp={onRealFlatDistIdChange} /> м равна писта<br />
        <input id="flatTimeId" class="long" type="text" value={flatTimeId} readOnly /> на писта<br />
        <input id="zapaden2TimeId" class="long" type="text" value={zapaden2TimeId} readOnly /> в Западен 2<br />
        <input id="borisovaTimeId" class="long" type="text" value={borisovaTimeId} readOnly /> в Борисовата<br />
        <input id="yuzhenTimeId" class="long" type="text" value={yuzhenTimeId} readOnly /> в Южен<br />
        <input id="varnaTimeId" class="long" type="text" value={varnaTimeId} readOnly /> във Варна<br />
        <input id="burgasTimeId" class="long" type="text" value={burgasTimeId} readOnly /> в Бургас<br />
        <input id="plovdivTimeId" class="long" type="text" value={plovdivTimeId} readOnly /> в Пловдив<br />

        <input id="m" class="long" type="number" step="0.01" min="0" max="5000" value={m} onChange={onMChange} onKeyUp={onMChange} /> м/с<br />

        <input id="kmLengthId" class="long" type="number" value={kmLengthId} step="0.01" readOnly /> км<br />

        <button id="convId">Запиши</button>
        <button id="clearId">Начални</button>
        <button id="loadId">Зареди</button>
      </form>
      <footer>5kmrunCalc в. 0.0.1 <br /><a href="#up">↑ Най-горе</a></footer>
    </>
  );
}

export default App;
