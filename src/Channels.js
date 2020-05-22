import React from 'react';
import { getHeaderConfig } from './auth_util'
import { Link } from "react-router-dom";

const axios = require('axios').default;

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.createChannel = this.createChannel.bind(this);
  }
  async componentDidMount() {
    const config = await getHeaderConfig();
    const response = await axios.get('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/channels', config);
    this.setState({
      channels: response.data
    })
  }
  async createChannel() {
    const config = await getHeaderConfig();
    const request = {
      name: this.refs.newChannel.value
    }
    const response = await axios.post('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/createChannel', request, config);
    alert('New Channel created');
    this.setState({
      channels: this.state.channels.concat(response.data)
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
            <div key={channel.channelId} className="litem">
              <Link to={this.getLink(channel.channelId)}>{channel.name}</Link>
            </div>
          ))}
        </div>
        <div className="channels">
          <div className="heading">
            <em># Create new Channel</em>
          </div>
          <div className="litem">
            <input type="text" ref="newChannel"></input><br />
            <a href="#!" onClick={this.createChannel}>+</a>
          </div>
        </div>
      </>
    )
  }
}

export default Channels;