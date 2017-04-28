import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import StartButton from './components/StartButton';
import './App.css';

const styles = {
  card: {
    height: 'inherit',
    marginTop: '80px'
  },
  appbar: {
    backgroundColor: '#777',
    marginBottom: '40px'
  },
  escape: {
    position: 'absolute',
    top: '20px',
    left: '20px'
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
  escape() {
    this.setState({ loggedIn: false });
    browserHistory.push('/');
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Card
            style={styles.card} >
            {this.state.loggedIn ? (
             <FloatingActionButton
               style={styles.escape}
               backgroundColor={'#777'}
               onTouchTap={() => this.escape()}>
                 <ArrowBack />
              </FloatingActionButton>
            ) : (
              <div>
                <AppBar
                  title="The Email Challenge"
                  style={styles.appbar}
                  showMenuIconButton={false} />
                <h3>Here we go!</h3>
                <StartButton
                  click={() => this.handleLogin()} />
              </div>
            )}
            {this.props.children}
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
