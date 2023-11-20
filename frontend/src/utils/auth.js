export const BASE_URL = 'https://api.alexsng.mesto.nomoredomainsmonster.ru';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  }).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
};

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};
