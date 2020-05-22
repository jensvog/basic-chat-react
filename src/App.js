import React from 'react';
import Channels from './Channels'
import Entries from './Entries'
import Heading from './Heading'
import Start from './Start'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            {
              type: "username",
              label: "Username",
              placeholder: "Username",
              required: true,
            },
            {
              type: "email",
              label: "Email Adress",
              placeholder: "Email",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "Password",
              required: true,
            }
          ]}

        ></AmplifySignUp>
        <Router>
          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  <Heading />
                </td>
              </tr>
              <tr>
                <td className="channels" id="channels">
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
      </AmplifyAuthenticator>
    )
  }
}

export default App;