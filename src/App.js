import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { getUser } from './utils/utils';
import './App.css';

const styles = {
  card: {
    height: 'inherit',
    marginTop: '80px'
  },
  appbar: {
    backgroundColor: '#777'
  }
};

class App extends Component {
  componentWillMount() {
    getUser((user) => {
      console.log(user);
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Card
            style={styles.card} >
            <AppBar
              style={styles.appbar}
              title="Welcome Back!"
              showMenuIconButton={false} />
            <TextField
              hintText="Enter Email Address" />
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
