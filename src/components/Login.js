import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import EmailInput from './EmailInput';

const styles = {
  appbar: {
    backgroundColor: '#777'
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
  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title="Welcome Back!"
          showMenuIconButton={false} />
        <EmailInput
          text="Enter Email Address"
          change={(event, newString) => this.handleEmailChange(event, newString)} />
      </div>
    )
  }
}

export default Login;
