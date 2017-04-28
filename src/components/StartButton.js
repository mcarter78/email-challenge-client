import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class StartButton extends Component {
  render() {
    return (
      <div className="start-button">
        <RaisedButton
          style={this.props.styles}
          onTouchTap={this.props.click}
          label="Start"
          type="submit"
        />
      </div>
    );
  }
}

export default StartButton;
