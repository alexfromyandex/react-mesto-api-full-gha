class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._url = this._baseUrl;
    this._credentials = options.credentials;
    this._headers = options.headers;
    this.setLike = this.setLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.postNewCard = this.postNewCard.bind(this);
    this._request = this._request.bind(this);
    this._checkResponse = this._checkResponse.bind(this);
  }

  getInitialCards() {
    return this._request('/cards', {});
  }

  getUserData() {
    return this._request('/users/me', {});
  }

  patchUserData(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  postNewCard(data) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: 'DELETE' });
  }

  changeAvatar(newAvatarLink) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId);
    }
    return this.removeLike(cardId);
  }

  setLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: 'PUT' });
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: 'DELETE' });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, settings) {
    settings.headers = this._headers;
    settings.credentials = this._credentials;
    return fetch(this._baseUrl + url, settings).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.alexsng.mesto.nomoredomainsmonster.ru',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
