import React from 'react';
import Channels from './Channels'
import Entries from './Entries'
import Update from './Update'
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
const axios = require('axios').default;

class Heading extends React.Component {
  componentDidMount() {
    Auth.currentSession()
    .then(user => {
      const username = user.getIdToken().decodePayload()['cognito:username'];
      this.setState({
        username
      })
    });
  }
  logOut() {
    Auth.signOut();
    return false;
  }
  state = {
    username: ''
  }
  render () {
    return (
    <div>
      <h1>Basic Chat Application</h1><br />
      Welcome '{this.state.username}'. <a href="#" onClick={this.logOut}>Sign Out</a>.
    </div>
    )
  }
}

const Start = () => {
  return (
    <div>
      <div class="heading">Please choose a channel</div>
    </div>
  )
}



class App extends React.Component {
  render() {
    return (
      <Router>
      <table>
        <tbody>
          <tr>
            <td colSpan="2">
              <Heading />
            </td>
          </tr>
          <tr>
            <td class="channels" id="channels">
              <Channels />
            </td>
            <td>
              <Switch>
                <Route path="/channel/:channelId" component={Entries} />
                <Route path="/">
                  <Start />
                </Route>
              </Switch>
            </td>
          </tr>
        </tbody>
      </table>
      </Router>
    )
  }
}

export default withAuthenticator(App);