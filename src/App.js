import React from 'react';
import Channels from './Channels'
import Entries from './Entries'
import Heading from './Heading'
import Start from './Start'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
                  <Route path="/" component={Start} />
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