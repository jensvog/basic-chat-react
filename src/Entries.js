import React from 'react';
import { getHeaderConfig, getUserId } from './auth_util'
import { Hub } from 'aws-amplify';

const axios = require('axios').default;

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.createEntry = this.createEntry.bind(this)
    this.updateEntry = this.updateEntry.bind(this)
    this.showEntry = this.showEntry.bind(this);
    this.showUpdateDelete = this.showUpdateDelete.bind(this)
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    Hub.listen('auth', this.updateUser)
    this.update()
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.update()
    }
  }
  async update() {
    let { channelId } = this.props.match.params
    const config = await getHeaderConfig();
    const userId = await getUserId();
    const response = await axios.get(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/chats/${channelId}`, config);
    this.setState({
      entries: response.data,
      userId
    })
  }
  async updateUser(data) {
    const { payload } = data
      if (payload.event === 'signIn' ||
          payload.event === 'signUp') {
        const userId = await getUserId();
        this.setState({userId});
      }
  }
  async createEntry() {
    let { channelId } = this.props.match.params
    const config = await getHeaderConfig();
    const request = {
      channelId,
      message: this.refs.post.value
    }
    const response = await axios.post('https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/createEntry', request, config)

    this.setState((state) => ({
      entries: [].concat(response.data, state.entries),
    }))
  }
  async deleteEntry(entryId) {
    let { channelId } = this.props.match.params
    const config = await getHeaderConfig()
    const response = await axios.delete(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/delete/${channelId}/entry/${entryId}`, config)

    if (response.status === 200) {
      this.setState(function(state) {
        const elementsIndex = state.entries.findIndex(element => element.entryId === entryId)
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

  async updateEntry(editEntryId) {
    let { channelId } = this.props.match.params
    const config = await getHeaderConfig();
    const request = {
      message: this.refs.update.value
    }
    const response = await axios.patch(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/update/${channelId}/entry/${editEntryId}`, request, config)
    
    if (response.status === 200) {
      this.setState(function(state) {
        const elementsIndex = state.entries.findIndex(element => element.entryId === editEntryId)
        let newEntries = [...state.entries]
        newEntries[elementsIndex] = {...newEntries[elementsIndex], message: request.message}

        return {
          editEntryId: '',
          entries: newEntries
        }

      })
    } else {
      alert('Not allowed to do this.')
      this.setState({
        editEntryId: ''
      })
    }
  }
  showEntry(entry) {
    if (this.state.editEntryId === entry.entryId) {
      return (
        <div className="litem" id={entry.entryId}>
          <textarea ref="update" defaultValue={entry.message}></textarea>
          <button onClick={() => this.updateEntry(this.state.editEntryId)}>Update</button>
          <button onClick={() => this.setState({editEntryId: ''})}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div className="litem" id={entry.entryId}>
          {entry.message}
        </div>
      )
    }
  }
  showUpdateDelete(entry) {
    if (this.state.userId === entry.userId &&
        this.state.editEntryId !== entry.entryId) {
      return (
        <div className="litem">
          <a href="#!" onClick={() => this.setState({editEntryId: entry.entryId})}>Update</a>&nbsp;
          <a href="#!" onClick={() => this.deleteEntry(entry.entryId)}>Delete</a>
        </div>
      )
    } else {
      return ''
    }
  }
  state = {
    entries: [],
    userId: '',
    editEntryId: ''
  }
  render() {
    return (
      <>
        <div>
          <div className="heading">
            <em>Write a post</em>
          </div>
          <div className="litem">
            <textarea ref="post" defaultValue="Write a post"></textarea>
            <button onClick={this.createEntry}>Post</button>
          </div>
        </div>
        {this.state.entries.map((entry) => (
          <div key={entry.entryId}>
            <div className="heading">
              <em>{entry.userName} wrote at {entry.createdAt}:</em>
          </div>
          {this.showEntry(entry)}
          {this.showUpdateDelete(entry)}
        </div>
        ))}
      </>
    )
  }
}

export default Entries;