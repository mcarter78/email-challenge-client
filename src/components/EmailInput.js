import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class EmailInput extends Component {
  render() {
    return (
      <div className="email-input">
        <TextField
          onChange={this.props.change}
          type="email"
          hintText={this.props.text}
          fullWidth
        />
      </div>
    );
  }
}

export default EmailInput;
