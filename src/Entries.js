import React from 'react';
import './App.css';
import { Auth } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

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
    this.entry = this.entry.bind(this)
    this.updateDelete = this.updateDelete.bind(this)
    this.setEntry = this.setEntry.bind(this)
    this.updateEntry = this.updateEntry.bind(this)
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
            entries: response.data,
            userId: user.getIdToken().payload['sub']
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
        entries: new Array().concat(response.data, state.entries),
        userId: state.userId
    }))
  }
  state = {
    entries: [],
    userId: '',
    editEntry: ''
  }

  setEntry(editEntry) {
    this.setState({
      editEntry
    })
  }

  async deleteEntry(entryId) {
    let { channelId } = this.props.match.params
    const user = await Auth.currentSession();
    const token = user.getIdToken().getJwtToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log(channelId, entryId)
    const response = await axios.delete(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/delete/${channelId}/entry/${entryId}`, config)
    
    console.log(response)

    if (response.status === 200) {
      this.setState(function(state) {
        const elementsIndex = state.entries.findIndex(element => element.entryId == entryId)
        let newEntries = [...state.entries]
        newEntries.splice(elementsIndex, 1)

        return {
          entries: newEntries
        }

      })
    } else {
      alert('Not allowed to do this.')
    }
  }

  updateDelete(entry) {
    if (this.state.userId == entry.userId) {
      return (
        <div class="list">
          <a href="#" onClick={() => this.setState({editEntry: entry.entryId})}>Update</a>&nbsp;
          <a href="#" onClick={() => this.deleteEntry(entry.entryId)}>Delete</a>
        </div>
      )
    } else {
      return ''
    }
  }

  async updateEntry(editEntry) {
    console.log(this.refs.update.value)

    let { channelId } = this.props.match.params
    const user = await Auth.currentSession();
    const token = user.getIdToken().getJwtToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const request = {
      message: this.refs.update.value
    }
    const response = await axios.patch(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/update/${channelId}/entry/${editEntry}`, request, config)
    
    console.log(response)

    if (response.status === 200) {
      this.setState(function(state) {
        const elementsIndex = state.entries.findIndex(element => element.entryId == editEntry)
        let newEntries = [...state.entries]
        newEntries[elementsIndex] = {...newEntries[elementsIndex], message: request.message}

        return {
          editEntry: '',
          entries: newEntries
        }

      })
    } else {
      alert('Not allowed to do this.')
      this.setState({
        editEntry: ''
      })
    }
  }

  entry(entry) {
    if (this.state.editEntry == entry.entryId) {
      return (
      <div class="list" id={entry.entryId}>
        <textarea ref="update">{entry.message}</textarea>
        <button onClick={() => this.updateEntry(this.state.editEntry)}>Update</button>
        <button onClick={() => this.setState({editEntry: ''})}>Cancel</button>
      </div>
      )
    } else {
      return (
        <div class="list" id={entry.entryId}>
          {entry.message}
        </div>
      )
    }
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
          {this.entry(entry)}
          {this.updateDelete(entry)}
        </div>
        ))}
      </>
    )
  }
}

export default Entries;