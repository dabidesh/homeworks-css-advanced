const mainElement = document.getElementById('main');
const startButton = document.getElementById('start');
const aElement = document.getElementById('a');
//const url = 'http://localhost:3030/jsonstore/bus/businfo/1308';
let url = 'http://localhost:3030/jsonstore/advanced/profiles';
let countProfiles = 0;

const lockedProfile = async () => {

  profilesElements = document.querySelectorAll('.profile');
  [...profilesElements].forEach(e => e.remove());

  errorP.textContent = '';

  let users = '';
  try {
    users = await getUsers();
    if (users == {} || users == '') {
      throw new Error('Empty object or string!');
    }
    Object.values(users).forEach((u, i) => {
      if (u.username == undefined || u.email == undefined || u.age == undefined) {
        throw new Error('Broken or others data (from another task)!');
      }
      mainElement.insertAdjacentHTML('beforeend',
        `<div class="profile">
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user${i + 1}Locked" value="lock" checked>
          <label>Unlock</label>
          <input type="radio" name="user${i + 1}Locked" value="unlock"><br>
            <hr>
              <label>Username</label>
              <input type="text" name="user${i + 1}Username" value="${u.username}" disabled readonly />
              <div id="user${i + 1}HiddenFields" style="display: none;">
                <hr>
                  <label>Email:</label>
                  <input type="email" name="user${i + 1}Email" value="${u.email}" disabled readonly />
                  <label>Age:</label>
                  <input type="email" name="user${i + 1}Age" value="${u.age}" disabled readonly />
				</div>
                <button>Show more</button>
              </div>`);
      mainElement.querySelectorAll('main div button')[i].onclick = (e) => hideOrRevealUserInfo(e);
    });
  } catch (err) {
    console.log(err);
    errorP.textContent = err;
  }
};

const hideOrRevealUserInfo = (event) => {
  const profile = event.target.parentNode;
  if (profile.querySelector('input[type=radio]:checked').value === 'lock') {
    alert('Profile is lock! Press the unlock radio button!');
    return;
  }

  let div = profile.querySelector('div');
  let isVisible = div.style.display === 'block';
  div.style.display = isVisible ? 'none' : 'block';
  event.target.textContent = isVisible ? 'Show more' : 'Hide it';
};

const getUsers = async () => {
  if (url == '') {
    throw new Error('Url is empty!');
  }
  const response = await fetch(url);
  aElement.href = url;
  console.log(response);
  if (response.ok != true) {
    throw new Error(`Not OK!\nstatus: ${response.status}!\nstatusText: ${response.statusText}!`);
  }
  const data = await response.json();
  countProfiles = Object.values(data).length;
  return data;
};

const start = () => {
  const hideString = 'Hide and lock all profiles';
  const showString = 'Unlock and show more all';
  for (let i = 0; i < countProfiles; i++) {
    if (startButton.textContent === showString) {
      mainElement.querySelectorAll('div input[value="unlock"]')[i].click();
    }
    setTimeout(mainElement.querySelectorAll('div>button')[i].click(), 500);

    if (startButton.textContent === hideString) {
      mainElement.querySelectorAll('div input[value="lock"]')[i].click();
    }
  }
  if (startButton.textContent === showString) {
    startButton.textContent = hideString;
  } else {
    startButton.textContent = showString;
  }
};

const setUrl = () => {
  url = sel.value;
  lockedProfile();
  firstSel.selected = true;
};
