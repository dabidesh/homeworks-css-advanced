const totalSecondsToHMS = (totalSeconds) => {
  const hourTime = String(Math.floor(totalSeconds / 3600))
    .padStart(2, '0');
  totalSeconds %= 3600;
  const minTime = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secTime = String(Math.floor(totalSeconds % 60)).padStart(2, '0');

  return [hourTime, minTime, secTime];
};

const updateAgeАchievement = (groupIndex) => {
  let min, sec;
  if (women.checked == true) {
    [min, sec] = wo[groupIndex].WR.split(':');
  } else {
    [min, sec] = man[groupIndex].WR.split(':');
  }

  const allSecWR = (+min) * 60 + (+sec);
  const allSecTemp = (+minTime.value) * 60 + (+secTime.value);

  achievementId.value = ((allSecWR / allSecTemp) * 100).toFixed(2);
};

const setTimeByAgeAchievement = (groupIndex) => {
  let min, sec;
  if (genderId.value == '1') {
    [min, sec] = wo[groupIndex].WR.split(':');
  } else {
    [min, sec] = man[groupIndex].WR.split(':');
  }

  const allSecWR = (+min) * 60 + (+sec);
  const newSec = (allSecWR / (+achievementId.value)) * 100;
  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(newSec);
};

const updateAllByTimeAndDistance = () => {
  realFlatDistId.value = Math.round((+kmLengthId.value) * 1000 + 7.92 * (+elevId.value));

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

  updateAgeАchievement(+(ageId.value));
  //kmLengthId.value = (+kmLengthId.value).toFixed(2);
};

loadId.onclick = (e) => {
  e.preventDefault();

  const allDataObj = JSON.parse(localStorage.getItem('allDataObj'));

  if (!allDataObj) {
    alert('Трябва първо да запишеш данни!');
    return;
  }

  min.value = allDataObj.min;
  sec.value = allDataObj.sec;
  km.value = allDataObj.km;
  m.value = allDataObj.m;
  hourTime.value = allDataObj.hourTime;
  minTime.value = allDataObj.minTime;
  secTime.value = allDataObj.secTime;
  kmLengthId.value = allDataObj.kmLengthId;
  elevId.value = allDataObj.elevId;
  women.checked = allDataObj.women;
  ageId.value = allDataObj.ageId;
};

convId.onclick = (e) => {
  e.preventDefault();

  if (confirm('Сигурен ли си, че искаш да презапишеш всичко?')) {

    const allDataObj = {
      'min': min.value,
      'sec': sec.value,
      'km': km.value,
      'm': m.value,
      'hourTime': hourTime.value,
      'minTime': minTime.value,
      'secTime': secTime.value,
      'kmLengthId': kmLengthId.value,
      'elevId': elevId.value,
      'women': women.checked ? true : false,
      'ageId': ageId.value,
    };

    localStorage.setItem('allDataObj', JSON.stringify(allDataObj));
  }
};

clearId.onclick = (e) => {
  e.preventDefault();
  run.reset();
  women.checked = false;
  ageId.value = '7';
  updateAllByTimeAndDistance();
};

helpProfileTrackId.onclick = (e) => {
  e.preventDefault();
  alert('Опитай се да оцениш профила и трудността на трасето! Можеш да видиш с колко се удължава ако беше равна писта!');
};

min.onchange = sec.onchange =
  min.onkeyup = sec.onkeyup = () => {
    const temp = (1 / ((+sec.value) / 60 + (+min.value))) * 60;
    km.value = temp.toFixed(2);
    m.value = (temp * (1000 / 3600)).toFixed(2);

    [hourTime.value, minTime.value, secTime.value] =
      totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

    updateAgeАchievement(Number(ageId.value));
  };

km.onchange = km.onkeyup = () => {
  const temp = +km.value;
  m.value = (temp * (1000 / 3600)).toFixed(2);
  const secAll = ((1 / temp) * 3600);
  [_, min.value, sec.value] = totalSecondsToHMS(secAll);

  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

  updateAgeАchievement(Number(ageId.value));
};

m.onchange = m.onkeyup = () => {
  const temp = +m.value * 3.6;
  km.value = temp.toFixed(2);
  const secAll = ((1 / temp) * 3600);
  [_, min.value, sec.value] = totalSecondsToHMS(secAll);

  [hourTime.value, minTime.value, secTime.value] =
    totalSecondsToHMS(Math.round((+kmLengthId.value / temp) * 3600));

  updateAgeАchievement(Number(ageId.value));
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

women.onchange = ageId.onchange = () => {
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
  };

window.onload = () => {
  women.checked = false;
  ageId.value = '7';
  updateAllByTimeAndDistance();
};


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


