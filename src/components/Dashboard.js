import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import SnackBar from 'material-ui/Snackbar';
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
  box: {
    fill: orange500
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize state tree
    this.state = {
      user: {},
      token: {},
      message: '',
      errorMessage: '',
      open: false,
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
    // Call getUser utility function with id from url params
    getUser(userId, (data) => {
      // Set User and Token in state tree
      this.setState({ user: data.user, token: data.token })
      // Redirect browser to edit page, adding email & token to query params
      browserHistory.push('/users/' + userId + '/edit?email=' + data.user.email + '&token=' + data.token.nonce)
    });
  }
  handleEnter(e) {
    // If enter key pressed
    if (e.charCode === 13) {
      // Call submit function
      this.handleSubmit();
    }
  }
  handleNewEmailChange(e, newString) {
    // Set value from event as newEmail in state
    this.setState({ newEmail: newString });
    // If value is empty
    if (this.state.newEmail !== '') {
      // Enable confirm input
      this.setState({ confirmDisabled: false });
    } else {
      // Disable confirm input
      this.setState({ confirmDisabled: true });
    }
  }
  handleNewEmailConfirmChange(e, newString) {
    // Set value from event as newEmailConfirm in state
    this.setState({ newEmailConfirm: newString });
    const newEmail = this.state.newEmail;
    // If new email and confirm match
    if (newEmail === newString) {
      // remove error message
      this.setState({ message: '' });
    } else {
      // If not, throw error
      this.setState({ message: 'Emails do not match!' });
    }
  }
  handleMarketingCheck(e, checked) {
    // If checkbox is checked
    if (checked) {
      // set to true in state
      this.setState({ marketing: true });
    } else {
      // set to false in state
      this.setState({ marketing: false });
    }
  }
  handleArticlesCheck(e, checked) {
    // If checkbox is checked
    if (checked) {
      // set to true in state
      this.setState({ articles: true });
    } else {
      // set to false in state
      this.setState({ articles: false });
    }
  }
  handleDigestCheck(e, checked) {
    // If checkbox is checked
    if (checked) {
      // set to true in state
      this.setState({ digest: true });
    } else {
      // set to false in state
      this.setState({ digest: false });
    }
  }
  handleNoEmailsCheck(e, checked) {
    // If checkbox is checked
    if (checked) {
      // Disable other checkboxes and set all to false
      this.setState({
        marketingDisabled: true,
        articlesDisabled: true,
        digestDisabled: true,
        marketing: false,
        articles: false,
        digest: false
      });
    } else {
      // Enable other checkboxes
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
      this.setState({ errorMessage: 'Error! Emails do not match!', open: true });
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
          this.setState({ errorMessage: data[0], open: true });
        } else {
          // Redirect browser to Done page
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
            class='confirmInput'
            styles={styles.input}
            current={this.state.newEmailConfirm}
            text="Confirm New Email Address"
            error={this.state.message}
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
        <SnackBar
          open={this.state.open}
          autoHideDuration={3000}
          message={this.state.errorMessage} />
      </div>
    )
  }
}

export default Dashboard;
