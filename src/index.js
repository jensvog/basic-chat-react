import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
const axios = require('axios').default;

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
    const request = {
      name: this.refs.newChannel.value
    }
    axios.post('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/createChannel', JSON.stringify(request))
    .then(response => {
      alert(response);
      console.log(response.data)
      this.setState({
        channels: this.state.channels.concat(response.data)
      })
    });
  }
  componentDidMount() {
    fetch('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/channels')
    .then(res => res.json())
    .then((data) => {
      this.setState({ channels: data})
    })
    .catch(console.log)
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
