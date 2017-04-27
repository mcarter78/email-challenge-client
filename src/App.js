import React, { Component } from 'react';
require ('es6-promise').polyfill();
import 'isomorphic-fetch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import './App.css';

class App extends Component {
  getUser() {
    fetch('http://localhost:5000/users/1')
      .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
        return data;
      });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h2>Welcome Back!</h2>
            {this.getUser()}
          </div>
          <TextField
            hintText="Enter Email Address" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
