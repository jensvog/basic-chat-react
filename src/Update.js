import React from 'react';
import { Auth } from 'aws-amplify';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

class Update extends React.Component {
  async componentDidMount() {
    const user = await Auth.currentSession();
    const token = user.getIdToken().getJwtToken();

    // const request = {
    //   message: this.refs.post.value
    // }

    // const response = await axios.patch(`https://qnjkiuaakb.execute-api.eu-central-1.amazonaws.com/dev/update/${channelId}/entry/${entryId}`, request, config)
  }
  render() {
    let { channelId, entryId } = this.props.match.params;
    const linkChannel = `/channel/${channelId}`;
    return (
      <div>
        Go back to <Link to={linkChannel}>Channel</Link>
      </div>
    )
  }
}

export default Update;