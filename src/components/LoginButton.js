import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class LoginButton extends Component {
  render() {
    return (
      <div className="login-button">
        <RaisedButton
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
