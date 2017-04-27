import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { orange500 } from 'material-ui/styles/colors';

const styles = {
  underline: {
    borderColor: orange500
  }
}

class EmailInput extends Component {
  render() {
    return (
      <div className="email-input">
        <TextField
          style={this.props.styles}
          onChange={this.props.change}
          onKeyPress={this.props.keyPress}
          type="email"
          hintText={this.props.text}
          value={this.props.current}
          underlineFocusStyle={styles.underline}
        />
      </div>
    );
  }
}

export default EmailInput;
