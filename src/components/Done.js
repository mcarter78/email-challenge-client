import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { getUserNoToken } from '../utils/utils';

const styles = {
  appbar: {
    backgroundColor: '#777'
  },
  list: {
    listStyle: 'none',
    padding: '0'
  },
  heading: {
    padding: '0 10px'
  }
};

class Done extends Component {
  constructor(props) {
    super(props);
    // Initialize state tree with an empty user placeholder
    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    // Get the user id from url params
    const id = this.props.params.id;
    // Call the utility function to get user
    getUserNoToken(id, (user) => {
      // Set the user in state
      this.setState({ user: user });
    })
  }
  emails() {
    // Declare an array to populate with email types chosen
    let emailsArr = [];
    // If the user chose Marketing
    if (this.state.user.marketing) {
      // Add it to the array
      emailsArr.push('Marketing');
    }
    // If the user chose Articles
    if (this.state.user.articles) {
      // Add it to the array
      emailsArr.push('Articles');
    }
    // If the user chose Digest
    if (this.state.user.digest) {
      // Add it to the array
      emailsArr.push('Digest');
    }
    // If the array is still empty
    if (emailsArr.length < 1) {
      // Add 'Nothing' to the array
      emailsArr.push('Nothing');
    }
    // use Array.map to build a list of email types chosen
    return emailsArr.map((item) =>
      <li>{item}</li>
    );
  }
  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title="Success!"
          showMenuIconButton={false} />
        <h3
          style={styles.heading}>
          Your changes have been saved:
        </h3>
        Email: {this.state.user.email}
        <h3
          style={styles.heading}>
          You will receive emails about:
        </h3>
        <ul
          style={styles.list}>
          {this.emails()}
        </ul>
        <h3
          style={styles.heading}>
          Click on the back arrow to start again!
        </h3>
      </div>
    )
  }
}

export default Done;
