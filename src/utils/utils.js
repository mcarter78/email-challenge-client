import 'es6-promise';
import 'isomorphic-fetch';

export function getUser(cb) {
  fetch('http://localhost:5000/users/1')
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
      return cb(data);
    });
}
