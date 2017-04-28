import 'es6-promise';
import 'isomorphic-fetch';
import request from 'superagent';

export function getUserNoToken(id, cb) {
  fetch('/api/users/' + id)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((data) => {
      return cb(data);
    });
}

export function getUser(id, cb) {
  fetch('/api/users/' + id + '/edit')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
      return cb(data);
    });
}

export function updateUser(user, cb) {
  console.log(user);
  request
    .put('/api/users/' + user.id)
    .send({
      id: user.id,
      email: user.email,
      token: user.token,
      new_email: user.newEmail,
      marketing: user.marketing,
      articles: user.articles,
      digest: user.digest
    })
    .end((err, res) => {
      if (err) {
        throw new Error("Bad response from server");
      }
      return cb(JSON.parse(res.text));
    });
}

export function login(email, cb) {
  request
    .post('/api/login')
    .send({ email: email })
    .end(function(err, res) {
      if (err) {
        throw new Error("Bad response from server");
      }
      return cb(JSON.parse(res.text));
    });
}
