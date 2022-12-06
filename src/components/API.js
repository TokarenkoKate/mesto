export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/v1/cohort-55/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/v1/cohort-55/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserAvatar(data) {
    return fetch(`${this._url}/v1/cohort-55/users/me/avatar`, {
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
      method: 'PATCH'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._url}/v1/cohort-55/cards`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(data) {
    return fetch(`${this._url}/v1/cohort-55/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this._url}/v1/cohort-55/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._url}/v1/cohort-55/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/cohort-55/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
