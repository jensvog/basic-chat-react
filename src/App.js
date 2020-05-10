import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

const axios = require('axios').default;

// const App = () => (
//   <div>
//     <AmplifySignOut />
//     My App
//   </div>
// );

const Channels = ({channels}) => {
  return (
    <div>
      <center><h1>Channel List</h1></center>
      {channels.map((channel) => (
        <div>
          <div>
            <a href={channel.channelId}>{channel.name}</a>
          </div>
        </div>
      ))}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.createChannel = this.createChannel.bind(this);
  }
  createChannel() {
    Auth.currentSession()
    .then(user => {
      const token = user.getIdToken();
      console.log(token)
      const request = {
        name: this.refs.newChannel.value
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.post('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/createChannel', request, config)
      .then(response => {
        alert(response);
        console.log(response.data)
        this.setState({
          channels: this.state.channels.concat(response.data)
        })
      });
    })
  }
  componentDidMount() {
    Auth.currentSession()
    .then(user => {
      const token = user.getIdToken();
      console.log(token)
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.get('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/channels', config)
      .then(response => {
        console.log(response.data)
        this.setState({
          channels: response.data
        })
      });
    })

    // fetch('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/channels')
    // .then(res => res.json())
    // .then((data) => {
    //   this.setState({ channels: data})
    // })
    // .catch(console.log)
  }
  state = {
    channels: []
  }
  render() {
    return (
      <>
      <div>
        <Channels channels={this.state.channels} />
        <input type="text" ref="newChannel"></input>
        <button value="Create Channel" onClick={this.createChannel}></button>
      </div>
      </>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default withAuthenticator(App);