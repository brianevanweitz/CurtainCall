import React from 'react';
import { getUsers, deleteMatch, getMessages, createMessage } from '../services/api-helper';
import Messenger from './Messenger';
import decode from 'jwt-decode';
class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      matches: null,
      currentMatch: null,
      conversation: null
    }
  };

  getConversation = async () => {
    const messages = await getMessages(this.state.currentUser.user_id, this.state.currentMatch.id)
    const join = messages.user_messages.concat(messages.target_messages)
    const conversation = join.sort((a, b) => { return a.created_at - b.created_at });
    this.setState({
      conversation: conversation
    });
  }

  componentDidMount = async () => {
    const token = localStorage.getItem('jwt');
    let currentUser;
    if (token) {
      currentUser = decode(token)
      this.setState({
        currentUser: currentUser
      });
    }
    let matchIds = this.props.matchIds;
    if (!matchIds[0]) {
      matchIds = await this.props.getMutuals(currentUser.user_id)
    }
    const users = await getUsers();
    const matches = users.filter(u => matchIds.includes(u.id))
    this.setState({
      matches: matches,
      currentMatch: matches[0]
    });
    this.getConversation();
  };

  toggleMessage = (id) => {
    const currentMatch = this.state.matches.filter(m => id === m.id);
    this.setState({
      currentMatch: currentMatch[0]
    });
    this.getConversation();
  }

  sendMessage = async (content) => {
    const id = this.state.currentUser.user_id
    const data = {
      targetId: this.state.currentMatch.id,
      content: content
    }
    const message = await createMessage(id, data);
    this.setState(prevState => ({
      conversation: [...prevState.conversation, message]
    }));
  }

  deleteMatch = async (id) => {
    const userId = this.state.currentUser.user_id;
    await deleteMatch(userId, id);
    this.setState(prevState => ({
      matches: prevState.matches.filter(m => m.id !== id),
      currentMatch: null
    }));
  }
  render() {
    return (
      <div id="contact">
        <div className="match-list">
          {this.state.matches && this.state.matches.map(match => (
            <div key={match.id} className="tab" onClick={() => this.toggleMessage(match.id)}>
              <p>{match.name}</p>
              {/* {this.state.currentMatch && this.state.currentMatch[0].id === match.id &&
                <div className="contact-card">
                  <img src={this.state.currentMatch[0].profile_pic} alt={this.state.currentMatch[0].name} />
                  <h4>{this.state.currentMatch[0].name}</h4>
                  <p>{this.state.currentMatch[0].fave_show_1}</p>
                  <p>{this.state.currentMatch[0].fave_show_2}</p>
                  <p>{this.state.currentMatch[0].fave_show_3}</p>
                  <p>{this.state.currentMatch[0].budget}</p>
                  <div className="contact-buttons">
                    <button onClick={() => this.deleteMatch(this.state.currentMatch[0].id)}>Remove match</button>
                    <button onClick={() => window.location.href = `mailto:${this.state.currentMatch[0].email}`}>Get in touch</button>
                  </div>
                </div>
              } */}
            </div>
          ))}
        </div>
        <div className="messenger">
          {this.state.currentMatch && <Messenger
            currentUser={this.state.currentUser}
            currentMatch={this.state.currentMatch}
            conversation={this.state.conversation} />}
        </div>
      </div>
    )
  }
}

export default Contact;