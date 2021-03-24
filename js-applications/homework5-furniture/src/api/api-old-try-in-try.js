const settings = {
  host: '',
};

async function request(uri, options) {
  try {
    const response = await fetch(uri, options);

    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }
    //try-catch in try-catch, Hm
    //catch syntax error, if return empty body
    //in response not json -> return response
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return response;
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

function getOptions(method, body) {
  if (method == undefined) method = 'get';

  const options = {
    method,
    headers: {}
  };

  const token = sessionStorage.getItem('authToken');
  if (token != null) {
    options.headers['X-Authorization'] = token;
  }

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return options;
}

async function get(url) {
  return await request(url, getOptions());
}

async function post(url, data) {
  return await request(url, getOptions('post', data));
}

async function put(url, data) {
  return await request(url, getOptions('put', data));
}

//delete is keyword
async function del(url) {
  return await request(url, getOptions('delete'));
}

async function login(email, password) {
  const result = await post(settings.host + '/users/login', { email, password });

  sessionStorage.setItem('email', result.email);
  sessionStorage.setItem('authToken', result.accessToken);
  sessionStorage.setItem('userId', result._id);

  return result;
}

async function register(email, password) {
  const result = await post(settings.host + '/users/register', { email, password });

  sessionStorage.setItem('email', result.email);
  sessionStorage.setItem('authToken', result.accessToken);
  sessionStorage.setItem('userId', result._id);

  return result;
}

async function logout(email, password) {
  const result = await post(settings.host + '/users/logout');

  sessionStorage.removeItem('email');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userId');

  return result;
}

export { settings, get, post, put, del, login, register, logout };