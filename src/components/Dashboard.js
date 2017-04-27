import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import EmailInput from './EmailInput';
import SaveButton from './SaveButton';
import { getUser } from '../utils/utils';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      newEmailConfirm: '',
      marketing: false,
      articles: false,
      digest: false
    }
  }
  componentWillMount() {
    const userId = this.props.params.id;
    getUser(userId, (data) => {
      browserHistory.push('/users/' + userId + '?email=' + data.user.email + '&token=' + data.token.nonce)
    });
  }
  handleEnter(e) {
    // If enter key pressed
    if (e.charCode === 13) {
      this.handleSubmit();
    }
  }
  handleNewEmailChange(e, newString) {
    this.setState({ newEmail: newString });
  }
  handleNewEmailConfirmChange(e, newString) {
    this.setState({ newEmailConfirm: newString });
  }
  handleSubmit() {

  }
  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title="Email Preferences"
          showMenuIconButton={false} />
        <EmailInput
          styles={styles.input}
          current={this.state.newEmail}
          text="Update Email Address"
          change={(event, newString) => this.handleEmailChange(event, newString)}
          keyPress={(event) => this.handleEnter(event)} />
        <EmailInput
          styles={styles.input}
          current={this.state.newEmailConfirm}
          text="Confirm New Email Address"
          change={(event, newString) => this.handleEmailChange(event, newString)}
          keyPress={(event) => this.handleEnter(event)} />
        <SaveButton
          styles={styles.button}
          click={(event) => this.handleSubmit(event)}/>
      </div>
    )
  }
}

export default Dashboard;
