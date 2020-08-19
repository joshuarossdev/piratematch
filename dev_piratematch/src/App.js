import React from 'react';
import './App.css';

function Card( props ) {
  return (
    <div className="card" >
      <div
        onClick={props.onClick}
        className={
          props.cardStyle ? `card-front ${props.card} ${props.cardStyle}`
            : `card-back`
        }
      >
      </div>
    </div>
  );
}

class Board extends React.Component {

  renderCards( card, i ) {
    return (
      <Card
        key={i + card}
        card={card}
        cardStyle={this.props.cardStyles[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="cardrow col-10">
        {this.props.cards.map( (card, i) => this.renderCards(card, i) )}
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: shuffleCards(),
      clicks: 0,
      firstCard: null,
      cardStyles: Array(18).fill(null),
      pairs: [],
      matches: 0,
      attempts: 0,
      games: null,
      wins: 0,
      level: 1,
    }
  }

  setFirstCard( i, flip ) {

    console.log('setFirstCard: ', i, flip);
    const cardStyles = this.state.cardStyles.slice();
    cardStyles[i] = flip;

    this.setState({
      firstCard: i,
      cardStyles: cardStyles,
    })
  };

  setSecondCard( i, flip )  {

    console.log('setSecondCard', i, flip);
    const cardStyles = this.state.cardStyles.slice();
    cardStyles[i] = flip;
    let attempts = this.state.attempts;
    attempts++;

    this.setState({
      cardStyles: cardStyles,
      attempts: attempts,
    })
  };

  resetPair() {

    console.log('resetPair');
    const cardStyles = this.state.cardStyles.slice();
    const firstCard = this.state.firstCard;
    cardStyles[firstCard] = false;

    this.setState({
      clicks: 0,
      firstCard: null,
      secondCard: null,
    });
  }

  handlePair( card ) {

    console.log('handlePair', card);
    const cards = this.state.cards.slice();
    const firstCard = this.state.firstCard;
    const cardStyles = this.state.cardStyles.slice();
    const pairs = this.state.pairs.slice();
    let matches = this.state.matches;

    if ( cards[firstCard] === card ) {
      console.log('pair match')
      pairs.push(cards[firstCard]);
      console.log('pairs: ', pairs);
      matches++
      this.setState({
        clicks: 0,
        firstCard: null,
        pairs: pairs,
        matches: matches,
      });
      this.checkForWin(matches);

    } else {
      console.log('no match');
      this.resetPair( card );
    };
  }

  checkForWin( matches ) {

    console.log('checkforWin', matches)
    const level = this.state.level;
    let wins = this.state.wins;

    if (matches >= level) {
      wins++;
      console.log('wins: ', wins);
      this.setState({ wins: wins, });
    }
  }

  handleClick( card, i ) {

    console.log('handleClick: ', card, i);
    const pairs = this.state.pairs.slice();
    let clicks = this.state.clicks;

    if ( pairs.includes(card) ) return;

    if (clicks === 0) {
      clicks++
      this.setState({ clicks: clicks });
      console.log('clicks: ', clicks);
      this.setFirstCard(i, true);

    } else if (clicks === 1) {
      clicks++
      this.setState({ clicks: clicks });
      console.log('clicks: ', clicks);
      this.setSecondCard(i, true);
      this.handlePair(card, i);

    } else return;
  }

  render() {
    return (
      <div>
        <Board
        cards={this.state.cards}
        cardStyles={this.state.cardStyles}
        onClick={ (i) => this.handleClick(this.state.cards[i], i) }
        />
        <div>
          <h2>{"Attempts: " + this.state.attempts}</h2>
          <h2>{"Matches: " + this.state.matches}</h2>
          <h2>{"Wins: " + this.state.wins}</h2>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="container">
        <Game/>
      </main>
    </div>
  );
}

function shuffleCards() {

  let cards = ['barrel', 'cannon', 'compass', 'flag',
    'mermaid', 'telescope', 'palm', 'parrot', 'pearl'];
  cards = cards.concat(cards);
  let deck = [];

  while (cards.length) {
    const randomNumber = Math.floor(Math.random() * cards.length);
    const card = cards.splice(randomNumber, 1);
    deck.push(card[0]);
  };

  console.log('deck: ', deck);
  return deck;
}

export default App;
