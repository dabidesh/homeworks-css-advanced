import { getUserData, setUserData, clearUserData } from '../utility.js';

import page from '../../node_modules/page/page.mjs';

export const settings = {
  host: ''
};

async function request(uri, options) {
  try {
    // send request with appropriate method, headers and body(if any)
    const response = await fetch(uri, options);
    // handle errors
    if (response.ok == false) {
      const error = await response.json();
      /* if (error.message == 'Invalid access token') {
        sessionStorage.clear();
        page.redirect('/all-listings');
      } */
      throw new Error(error.message);
    }
    // parse response (if needed)
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return response;
    }
    // return result
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

// function that creates headers, based on application state and body
function createOptions(method, body) {
  if (method == undefined) {
    method = 'get';
  }
  const options = {
    method,
    headers: {}
  };
  const user = getUserData();
  if (user) {
    options.headers['X-Authorization'] = user.accessToken;
  }
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return options;
}

// decorator function for all REST methods
export async function get(url) {
  return await request(url, createOptions());
}

export async function post(url, data) {
  return await request(url, createOptions('post', data));
}

export async function put(url, data) {
  return await request(url, createOptions('put', data));
}

export async function del(url) {
  return await request(url, createOptions('delete'));
}

// authentication function (login/register/logout)
export async function login(username, password) {
  const result = await post(settings.host + '/users/login', { username, password });
  setUserData(result);
  return result;
}

export async function register(username, password) {
  const result = await post(settings.host + '/users/register', { username, password });
  setUserData(result);
  return result;
}
// invalid session if no try catch, simple not async await
// between 2 asynchronous functions we put 1 synchronous – the error flies
export function logout() {
  const result = get(settings.host + '/users/logout');
  clearUserData();
  return result;
}
