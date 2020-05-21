import React from 'react';
import Channels from './Channels'
import Entries from './Entries'
import Heading from './Heading'
import { withAuthenticator } from '@aws-amplify/ui-react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
const axios = require('axios').default;

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