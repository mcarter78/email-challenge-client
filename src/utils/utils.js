import 'es6-promise';
import 'isomorphic-fetch';
import request from 'superagent';

export function getUserNoToken(id, cb) {
  // Send get request with user id
  fetch('/api/users/' + id)
    .then((response) => {
      // if status code is 400 or higher
      if (response.status >= 400) {
        // Throw an error in the browser
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((data) => {
      // Return the requested user object
      return cb(data);
    });
}

export function getUser(id, cb) {
  // Send get request with user id
  fetch('/api/users/' + id + '/edit')
    .then(function(response) {
      // if status code is 400 or higher
      if (response.status >= 400) {
        // Throw an error in the browser
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
      // Return the requested user/token objects
      return cb(data);
    });
}

export function updateUser(user, cb) {
  console.log(user);
  // send a put request with user id and object with all data needed
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
        // Throw an error in the browser
        throw new Error("Bad response from server");
      }
      // return the user object
      return cb(JSON.parse(res.text));
    });
}

export function login(email, cb) {
  // send a post request with email fron input
  request
    .post('/api/login')
    .send({ email: email })
    .end(function(err, res) {
      if (err) {
        // Throw error in browser
        throw new Error("Bad response from server");
      }
      // Return the user object
      return cb(JSON.parse(res.text));
    });
}
