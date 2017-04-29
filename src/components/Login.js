import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import { login } from '../utils/utils';

const styles = {
  appbar: {
    backgroundColor: '#777'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize state tree
    this.state = {
      email: '',
      message: ''
    }
  }
  handleEmailChange(e, newString) {
    // Set the new email in state, and clear error message
    this.setState({ email: newString, message: '' });
  }
  handleEnter(e) {
    // If enter key pressed
    if (e.charCode === 13) {
      // Call the submit function
      this.handleSubmit();
    }
  }
  handleSubmit() {
    const email = this.state.email
    // call login utility function, pass the email from input
    login(email, (data) => {
      // if there is no user returned
      if (!data.id) {
        // Display error message
        this.setState({ message: 'Invalid Email!' });
      } else {
        // Redirect to user's dashboard
        browserHistory.push('/users/' + data.id + '/edit')
      }
      // Clear input field
      this.setState({ email: '' });
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
          classy="login-input"
          current={this.state.email}
          text="Enter Email Address"
          error={this.state.message}
          change={(event, newString) => this.handleEmailChange(event, newString)}
          keyPress={(event) => this.handleEnter(event)} />
        <LoginButton
          click={() => this.handleSubmit()} />
      </div>
    )
  }
}

export default Login;
