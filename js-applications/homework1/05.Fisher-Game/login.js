function attachEvents() {
  loginForm.reset();
  registerForm.reset();

  loginForm.onsubmit = login;
  registerForm.onsubmit = register;
}
//const host = 'http://' + window.location.host + '/';
attachEvents();

async function login(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const user = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  event.target.reset();

  const response = await fetch('http://localhost:3030/users/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    alert('Login or password don\'t match');
    return;
  }

  const data = await response.json();
  sessionStorage.setItem('token', data.accessToken);
  sessionStorage.setItem('id', data._id);
  window.location.pathname = '/index.html';
}

async function register(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email');
  const password = formData.get('password');
  const repeatPass = formData.get('rePass');

  if (!email || !password) {
    alert('Invalid email or password!');
    return;
  }

  if (password !== repeatPass) {
    alert('Passwords don\'t match!');
    return;
  }

  const response = await fetch('http://localhost:3030/users/register', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    alert('Registration failed!');
    return;
  }

  const data = await response.json();
  console.log(data);
  sessionStorage.setItem('token', data.accessToken);
  sessionStorage.setItem('id', data._id);
  window.location.pathname = '/index.html';
}