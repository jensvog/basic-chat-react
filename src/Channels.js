import React from 'react';
import { Auth } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const axios = require('axios').default;

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.createChannel = this.createChannel.bind(this);
  }
  createChannel() {
    Auth.currentSession()
    .then(user => {
      const token = user.getIdToken().getJwtToken();
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
  return false;
  }
  componentDidMount() {
    Auth.currentSession()
    .then(user => {
      const token = user.getIdToken().getJwtToken();
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
  }
  getLink(channelId) {
    return `/channel/${channelId}`
  }
  state = {
    channels: []
  }
  render() {
    return (
      <>
        <div>
          <div className="heading">
            <em># Channels</em>
          </div>
          {this.state.channels.map((channel) => (
            <div class="list">
              <Link to={this.getLink(channel.channelId)}>{channel.name}</Link>
            </div>
          ))}
        </div>
        <div class="channels">
          <div class="heading">
            <em># Create new Channel</em>
          </div>
          <div class="list">
            <input type="text" ref="newChannel"></input><br />
            <a href="#" onClick={this.createChannel}>+</a>
          </div>
        </div>
      </>
    )
  }
}

export default Channels;