import React from 'react';
import Channels from './Channels'
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

const Heading = () => {
  return (
    <div>
      <h1>Basic Chat Application</h1><br />
      Welcome 'User'. <a href="#">Sign Out.</a>
    </div>
  )
}

const Entries = () => {
  return (
    <>
      <div>
        <div class="heading">
          <em>User wrote today:</em>
        </div>
        <div class="list">
          Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app.Hello and welcome to chat app.Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app.Hello and welcome to chat app. Hello and welcome to chat app.Hello and welcome to chat app.
        </div>
      </div>
      <div>
        <div class="heading">
          <em>User wrote today:</em>
        </div>
        <div class="list">
          Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app.Hello and welcome to chat app.Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app. Hello and welcome to chat app.Hello and welcome to chat app. Hello and welcome to chat app.Hello and welcome to chat app.
        </div>
      </div>
    </>
  )
}

class App extends React.Component {
  render() {
    return (
      <table>
      <tr>
        <td colspan="2">
          <Heading />
        </td>
      </tr>
      <tr>
        <td class="channels" id="channels">
          <Channels />
        </td>
        <td>
          <Entries />
        </td>
      </tr>
    </table>
    )
  }
}

export default withAuthenticator(App);