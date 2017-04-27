import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import { login } from '../utils/utils';

const styles = {
  appbar: {
    backgroundColor: '#777'
  },
  input: {
    width: '40%',
    marginTop: '40px'
  },
  button: {
    width: '40%',
    marginTop: '10px'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }
  handleEmailChange(e, newString) {
    this.setState({ email: newString });
  }
  handleEnter(e) {
    // If enter key pressed
    if (e.charCode === 13) {
      this.handleSubmit();
    }
  }
  handleSubmit() {
    const email = this.state.email
    login(email, (data) => {
      console.log(data);
      this.setState({ email: '' });
      browserHistory.push('/users/' + data.id)
    });
  }
  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title="Welcome Back!"
          showMenuIconButton={false} />
        <EmailInput
          styles={styles.input}
          current={this.state.email}
          text="Enter Email Address"
          change={(event, newString) => this.handleEmailChange(event, newString)}
          keyPress={(event) => this.handleEnter(event)} />
        <LoginButton
          styles={styles.button}
          click={() => this.handleSubmit()} />
      </div>
    )
  }
}

export default Login;
