import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class LoginButton extends Component {
  render() {
    return (
      <div>
        <RaisedButton
          className="login-button"
          style={this.props.styles}
          onTouchTap={this.props.click}
          label="Login"
          type="submit"
        />
      </div>
    );
  }
}

export default LoginButton;
