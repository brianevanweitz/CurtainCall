import React from 'react';
import { getUsers, deleteMatch } from '../services/api-helper';
import decode from 'jwt-decode';
class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      matches: null,
      currentMatch: null
    }
  };

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
      matches: matches
    });
  };

  showMatch = (id) => {
    const currentMatch = this.state.matches.filter(m => id === m.id);
    this.setState({
      currentMatch: currentMatch
    });
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
        <div className="matchList">
          {this.state.matches && this.state.matches.map(match => (
            <div key={match.id} className="tab" onClick={() => this.showMatch(match.id)}>
              <p>{match.name}</p>
            </div>
          ))}
        </div>
        {this.state.currentMatch &&
          <div className="card">
            <img src={this.state.currentMatch[0].profile_pic} alt={this.state.currentMatch[0].name} />
            <h4>{this.state.currentMatch[0].name}</h4>
            <p>{this.state.currentMatch[0].fave_show_1}</p>
            <p>{this.state.currentMatch[0].fave_show_2}</p>
            <p>{this.state.currentMatch[0].fave_show_3}</p>
            <p>{this.state.currentMatch[0].budget}</p>
            <button onClick={() => this.deleteMatch(this.state.currentMatch[0].id)}>Delete</button>
            <button onClick={() => window.location.href = `mailto:${this.state.currentMatch[0].email}`}>Get in touch</button>
          </div>
        }
      </div>
    )
  }
}

export default Contact;