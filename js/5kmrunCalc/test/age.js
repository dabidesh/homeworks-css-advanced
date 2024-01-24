const WOMENR = '15:41';
const MANR = '14:03';
let women = true;

const totalSecondsToHMS = (totalSeconds) => {
  const hourTime = String(Math.floor(totalSeconds / 3600))
    .padStart(2, '0');
  totalSeconds %= 3600;
  const minTime = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secTime = String(Math.floor(totalSeconds % 60)).padStart(2, '0');

  return [hourTime, minTime, secTime];
};

const updateAgeAchievement = () => {
  let hourTime = '0';
  let minTime = '22';
  let secTime = '38';
  console.log(`${hourTime}:${minTime}:${secTime}`);

  let min, sec;
  if (women == true) {
    [min, sec] = WOMENR.split(':');
  } else {
    [min, sec] = MANR.split(':');
  }

  const allSecWR = (+min) * 60 + (+sec);
  const allSecTemp = (+hourTime) * 3600 + (+minTime) * 60 + (+secTime);

  let achievementId = (allSecWR / allSecTemp);
  console.log(achievementId);

  return (achievementId);
};

const setTimesByFantasyAge = () => {
  let min, sec;

  let ageAchievement = updateAgeAchievement();

  if (women == true) {
    [min, sec] = WOMENR.split(':');
  } else {
    [min, sec] = MANR.split(':');
  }

  allSec = Number(min) * 60 + Number(sec);

  ageSec = (allSec / ageAchievement);

  [hh, mm, ss] = totalSecondsToHMS(ageSec);
  console.log(`${hh}:${mm}:${ss}`);
};

setTimesByFantasyAge();
