import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from 'material-ui/Card';
import LoginButton from './components/LoginButton';
import './App.css';

const styles = {
  card: {
    height: 'inherit',
    marginTop: '80px'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  handleLogin() {
    this.setState({ loggedIn: true });
    browserHistory.push('/login');
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Card
            style={styles.card} >
            {this.state.loggedIn ? ( null )
            : (
              <LoginButton
                click={() => this.handleLogin()} />
            )}
            {this.props.children}
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
