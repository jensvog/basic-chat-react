import React from 'react';
import { getUserName, signOut, isLoggedIn } from './auth_util'
import { Hub } from 'aws-amplify';

class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }
    async componentDidMount() {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        const userName = await getUserName();
        this.setState({
          userName
        })
      }
      Hub.listen('auth', this.updateUser)
    }
    async updateUser(data) {
      const { payload } = data
      if (payload.event === 'signIn' ||
          payload.event === 'signUp') {
        const userName = await getUserName();
        this.setState({userName});
      }
    }
    state = {
      userName: ''
    }
    render () {
      return (
      <div>
        <h1>Basic Chat Application</h1><br />
        Welcome '{this.state.userName}'. <a href="#!" onClick={signOut}>Sign Out</a>.
      </div>
      )
    }
  }

  export default Heading;