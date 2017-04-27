import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from 'material-ui/Card';
import { getUser } from './utils/utils';
import Login from './components/Login';
import './App.css';

const styles = {
  card: {
    height: 'inherit',
    marginTop: '80px'
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
            <Login />
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
