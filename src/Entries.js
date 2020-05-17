import React from 'react';
import './App.css';
import { Auth } from 'aws-amplify';

const axios = require('axios').default;

async function getHeaderConfig() {
  const user = await Auth.currentSession();
  const token = user.getIdToken().getJwtToken();
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.createEntry = this.createEntry.bind(this)
  }
  componentDidMount() {
    this.update()
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.update()
    }
  }
  update() {
    let { channelId } = this.props.match.params
    Auth.currentSession()
    .then(user => {
      const token = user.getIdToken().getJwtToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.get(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/chats/${channelId}`, config)
        .then(response => {
          this.setState({
            entries: response.data
          })
        })
    });
  }
  async createEntry() {
    let { channelId } = this.props.match.params
    const config = await getHeaderConfig();
    console.log(config)
    const request = {
      channelId,
      message: this.refs.post.value
    }
    const response = await axios.post('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/createEntry', request, config)

    console.log(response.data)
    this.setState((state, props) => ({
        entries: new Array().concat(response.data, state.entries)
    }))
  }
  state = {
    entries: []
  }

  render() {
    return (
      <>
        <div>
          <div class="heading">
            <em>Write a post</em>
          </div>
          <div class="list">
            <textarea ref="post">Write a post</textarea>
            <button onClick={this.createEntry}>Post</button>
          </div>
        </div>
        {this.state.entries.map((entry) => (
          <div>
            <div class="heading">
              <em>{entry.userName} wrote at {entry.createdAt}:</em>
          </div>
          <div class="list">
            {entry.message}
          </div>
        </div>
        ))}
      </>
    )
  }
}

export default Entries;