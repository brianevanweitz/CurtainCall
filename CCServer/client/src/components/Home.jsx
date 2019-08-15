import React from 'react'
import { getUsers, showUser, addSwipe, addMatch } from '../services/api-helper';
import decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import Card from './Card';
import MatchWindow from './MatchWindow';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cards: [],
      index: 0,
      currentCard: null,
      matchWindow: null
    }
  };
  componentDidMount = async () => {
    const currentUser = decode(localStorage.getItem('jwt'));
    const user = await showUser(currentUser.user_id);
    const users = await getUsers();
    const swipes = user.swipes.map(s => s.swipe_id)
    const cards = users.filter(c => (c.id !== user.id) && (!swipes.includes(c.id)));
    this.setState({
      user: user,
      cards: cards,
      currentCard: cards[this.state.index]
    })
  }

  swipeLeft = async () => {
    const id = this.state.user.id;
    const data = { swipe_id: this.state.currentCard.id };
    await addSwipe(id, data);
    this.setState({
      index: (this.state.index + 1),
    });
    this.setState({
      currentCard: this.state.cards[this.state.index]
    })
  }

  swipeRight = async () => {
    const id = this.state.user.id;
    const data = { swipe_id: this.state.currentCard.id };
    await addSwipe(id, data);
    const matchData = { matched_id: this.state.currentCard.id }
    const matches = await addMatch(id, matchData);
    const matchIds = matches.map(m => m.id);
    if (matchIds.includes(id)) {
      this.setState({
        matchWindow: this.state.currentCard.id
      })
      this.props.addMutuals(this.state.currentCard.id);
    }
    else {
      this.setState({
        index: (this.state.index + 1),
      });
      this.setState({
        currentCard: this.state.cards[this.state.index]
      })
    }
  }

  goToMatch = () => {
    this.props.history.push('/contact');
  }

  returnToCards = async () => {
    await this.setState({
      index: (this.state.index + 1),
      matchWindow: null
    });
    this.setState({
      currentCard: this.state.cards[this.state.index]
    })
  }
  render() {
    return (
      <>
        <Card
          currentCard={this.state.currentCard}
          swipeLeft={this.swipeLeft}
          swipeRight={this.swipeRight} />
        {this.state.matchWindow &&
          <MatchWindow
            goToMatch={this.goToMatch}
            returnToCards={this.returnToCards} />}
      </>
    )
  }
}

export default withRouter(Home)
