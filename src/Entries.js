import React from 'react';
import './App.css';
import { Auth } from 'aws-amplify';

const axios = require('axios').default;

class Entries extends React.Component {
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
  state = {
    entries: []
  }

  render() {
    return (
      <>
        {this.state.entries.map((entry) => (
          <div>
            <div class="heading">
              <em>{entry.userId} wrote at {entry.createdAt}:</em>
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