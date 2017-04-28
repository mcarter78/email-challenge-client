import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { getUserNoToken } from '../utils/utils';

const styles = {
  appbar: {
    backgroundColor: '#777'
  }
}

class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    const id = this.props.params.id;
    getUserNoToken(id, (user) => {
      this.setState({ user: user });
    })
  }
  emails() {
    let emailsArr = [];
    if (this.state.user.marketing) {
      emailsArr.push('Marketing');
    }
    if (this.state.user.articles) {
      emailsArr.push('Articles');
    }
    if (this.state.user.digest) {
      emailsArr.push('Digest');
    }
    if (emailsArr.length < 1) {
      emailsArr.push('Nothing');
    }
    return emailsArr.map((item) =>
      <span>{item} </span>
    );
  }
  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title="Success!"
          showMenuIconButton={false} />
        <h3>Your changes have been saved:</h3>
        Email: {this.state.user.email}
        <h3>You will receive emails about:</h3>
        {this.emails()}
        Click on the back arrow to start again!
      </div>
    )
  }
}

export default Done;
