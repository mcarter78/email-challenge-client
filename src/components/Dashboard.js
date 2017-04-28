import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import { orange500 } from 'material-ui/styles/colors';
import EmailInput from './EmailInput';
import SaveButton from './SaveButton';
import { getUser } from '../utils/utils';

const styles = {
  appbar: {
    backgroundColor: '#777'
  },
  input: {
    width: '70%',
    marginTop: '30px'
  },
  button: {
    width: '40%',
    marginTop: '20px'
  },
  left: {
    width: '48%',
    float: 'left',
    paddingLeft: '10px'
  },
  right: {
    textAlign: 'left',
    width: '48%',
    float: 'left'
  },
  box: {
    fill: orange500
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: {},
      confirmDisabled: true,
      marketingDisabled: false,
      articlesDisabled: false,
      digestDisabled: false,
      newEmail: '',
      newEmailConfirm: '',
      prefs: {
        marketing: false,
        articles: false,
        digest: false
      }
    }
  }
  componentWillMount() {
    const userId = this.props.params.id;
    getUser(userId, (data) => {
      this.setState({ user: data.user, token: data.token })
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
    if (this.state.newEmail !== '') {
      this.setState({ confirmDisabled: false });
    } else {
      this.setState({ confirmDisabled: true });
    }
  }
  handleNewEmailConfirmChange(e, newString) {
    this.setState({ newEmailConfirm: newString });
  }
  handleMarketingCheck(e, checked) {
    if (checked) {
      this.setState({ prefs: { marketing: true } });
    } else {
      this.setState({ prefs: { marketing: false } });
    }
  }
  handleArticlesCheck(e, checked) {
    if (checked) {
      this.setState({ prefs: { articles: true } });
    } else {
      this.setState({ prefs: { articles: false } });
    }
  }
  handleDigestCheck(e, checked) {
    if (checked) {
      this.setState({ prefs: { digest: true } });
    } else {
      this.setState({ prefs: { digest: false } });
    }
  }
  handleNoEmailsCheck(e, checked) {
    if (checked) {
      this.setState({
        marketingDisabled: true,
        articlesDisabled: true,
        digestDisabled: true,
        prefs: {
          marketing: false,
          articles: false,
          digest: false
        }
      });
    } else {
      this.setState({
        marketingDisabled: false,
        articlesDisabled: false,
        digestDisabled: false
      });
    }
  }
  handleSubmit() {
    console.log('submit');
    const newEmail = this.state.newEmail;
    const confirm = this.state.newEmailConfirm;
    // If new email and confirm do not match
    if (newEmail !== confirm) {
      // Throw error
    } else {
      // call updateUser, pass email & token from query params + newEmail & prefs
    }
  }
  render() {
    // Build the greeting for the appbar
    let greeting = 'Welcome, ' + this.state.user.name + '!';
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title={greeting}
          showMenuIconButton={false} />
        <h3>Email Preferences</h3>
        <div
          className="dashboard-left"
          style={styles.left}>
          <EmailInput
            styles={styles.input}
            current={this.state.newEmail}
            text="Update Email Address"
            change={(event, newString) => this.handleNewEmailChange(event, newString)}
            keyPress={(event) => this.handleEnter(event)} />
          <EmailInput
            styles={styles.input}
            current={this.state.newEmailConfirm}
            text="Confirm New Email Address"
            change={(event, newString) => this.handleNewEmailConfirmChange(event, newString)}
            keyPress={(event) => this.handleEnter(event)}
            disable={this.state.confirmDisabled} />
        </div>
        <div
          className="dashboard-right"
          style={styles.right}>
          <h4>Send me emails about:</h4>
          <Checkbox
            iconStyle={styles.box}
            label="Marketing"
            disabled={this.state.marketingDisabled}
            onCheck={(event, isInputChecked) => this.handleMarketingCheck(event, isInputChecked)} />
          <Checkbox
            iconStyle={styles.box}
            label="Articles"
            disabled={this.state.articlesDisabled}
            onCheck={(event, isInputChecked) => this.handleArticlesCheck(event, isInputChecked)} />
          <Checkbox
            iconStyle={styles.box}
            label="Digest"
            disabled={this.state.digestDisabled}
            onCheck={(event, isInputChecked) => this.handleDigestCheck(event, isInputChecked)} />
          <Checkbox
            iconStyle={styles.box}
            label="No Emails"
            onCheck={(event, isInputChecked) => this.handleNoEmailsCheck(event, isInputChecked)} />
        </div>
        <SaveButton
          styles={styles.button}
          click={(event) => this.handleSubmit(event)}/>
      </div>
    )
  }
}

export default Dashboard;
