import React from 'react';
import { getUserName, signOut } from './auth_util'

class Heading extends React.Component {
    async componentDidMount() {
      const userName = await getUserName();
      this.setState({
        userName
      })
    }
    state = {
      userName: ''
    }
    render () {
      return (
      <div>
        <h1>Basic Chat Application</h1><br />
        Welcome '{this.state.userName}'. <a href="#" onClick={signOut}>Sign Out</a>.
      </div>
      )
    }
  }

  export default Heading;