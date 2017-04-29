import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class SaveButton extends Component {
  render() {
    return (
      <div className="save-button">
        <RaisedButton
          style={this.props.styles}
          onTouchTap={this.props.click}
          label="Save"
          type="submit"
        />
      </div>
    );
  }
}

export default SaveButton;
