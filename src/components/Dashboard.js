import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import { orange500 } from 'material-ui/styles/colors';
import EmailInput from './EmailInput';
import SaveButton from './SaveButton';
import { getUser, updateUser } from '../utils/utils';

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
      message: '',
      errorMessage: '',
      confirmDisabled: true,
      marketingDisabled: false,
      articlesDisabled: false,
      digestDisabled: false,
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
      this.setState({ user: data.user, token: data.token })
      browserHistory.push('/users/' + userId + '/edit?email=' + data.user.email + '&token=' + data.token.nonce)
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
      this.setState({ marketing: true });
    } else {
      this.setState({ marketing: false });
    }
  }
  handleArticlesCheck(e, checked) {
    if (checked) {
      this.setState({ articles: true });
    } else {
      this.setState({ articles: false });
    }
  }
  handleDigestCheck(e, checked) {
    if (checked) {
      this.setState({ digest: true });
    } else {
      this.setState({ digest: false });
    }
  }
  handleNoEmailsCheck(e, checked) {
    if (checked) {
      this.setState({
        marketingDisabled: true,
        articlesDisabled: true,
        digestDisabled: true,
        marketing: false,
        articles: false,
        digest: false
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
    const newEmail = this.state.newEmail;
    const confirm = this.state.newEmailConfirm;
    // If new email and confirm do not match
    if (newEmail !== confirm) {
      // Throw error
    } else {
      // Build a user object to send
      const user = {
        id: this.props.params.id,
        email: this.props.location.query.email,
        token: this.props.location.query.token,
        newEmail: this.state.newEmail,
        marketing: this.state.marketing,
        articles: this.state.articles,
        digest: this.state.digest
      };
      // call updateUser, passing user object
      updateUser(user, (data) => {
        console.log(data);
        if (!data.id) {
          // Display error message
          this.setState({ errorMessage: data[0] });
        } else {
          browserHistory.push('/users/' + user.id);
        }
      })
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
