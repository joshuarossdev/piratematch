import React from 'react';
import './App.css';

function Card(props) {
  return (
    <div className="card" >
      <div
        onClick={props.onClick}
        className={ props.flip ? "card-front " + props.card : "card-back " }
      >
      </div>
    </div>
  );
}

class Board extends React.Component {
  renderCards(card, i) {
      return (
        <Card
          key={i + card}
          card={card}
          flip={this.props.cardsFlipped[i]}
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
      secondCard: null,
      cardsFlipped: Array(18).fill(null),
      pairs: [],
      matches: 0,
      attempts: 0,
      games: null,
      wins: 0,
      level: 1,
    }
  }

  setFirstCard(i, flip) {
    console.log('setFirstCard: ', i, flip);
    const cardsFlipped = this.state.cardsFlipped.slice();
    cardsFlipped[i] = flip;

    this.setState({
      firstCard: i,
      cardsFlipped: cardsFlipped,
    })
  };

  setSecondCard(i, flip) {
    console.log('setSecondCard', i, true);
    const cardsFlipped = this.state.cardsFlipped.slice();

    cardsFlipped[i] = flip;
    console.log('second: ', )
    this.setState({
      secondCard: i,
      cardsFlipped: cardsFlipped,
    })
  };

  resetPair() {
    console.log('resetPair');
    const cardsFlipped = this.state.cardsFlipped.slice();
    const firstCard = this.state.firstCard;
    const secondCard = this.state.secondCard;
    cardsFlipped[firstCard] = false;
    cardsFlipped[secondCard] = false;

    this.setState({
      clicks: 0,
      firstCard: null,
      secondCard: null,
      cardsFlipped: cardsFlipped,
    });
  }

  handlePair(card ) {
    console.log('handlePair', card);
    const cards = this.state.cards.slice();
    const cardsFlipped = this.state.cardsFlipped.slice();
    const pairs = this.state.pairs.slice();
    const firstCard = this.state.firstCard;
    const secondCard = this.state.secondCard;
    let matches = this.state.matches;

    console.log('first: ', cards[firstCard]);
    console.log('second: ', cards);

    if ( cards[firstCard] === card ) {

      console.log('pair match')
      pairs.push(cards[firstCard]);
      matches++
      this.setState({
        firstCard: null,
        secondCard: null,
        pairs: pairs,
        matches: matches,
      });
      this.handleWin();

    } else {
      console.log('no match');
      this.resetPair();
    };
  }

  handleWin() {
    console.log('handleWin')
    const level = this.state.level;
    let matches = this.state.matches;
    let wins = this.state.wins;
    if (matches >= level) {
      wins++;
      this.setState({ wins: wins, });
    }
  }

  handleClick(card, i) {
    console.log('handleClick: ', card, i);
    let attempts = this.state.attempts;
    let clicks = this.state.clicks;


    if (clicks === 0) {
      this.setFirstCard(i, true);
      clicks++
      this.setState({ clicks: clicks });
    } else if (clicks === 1) {

      this.setSecondCard(i, true);
      this.handlePair(card, i);
      this.setState({ attempts: attempts++ });
    }
  }

  render() {
    return (
      <div>
        <Board
        cards={this.state.cards}
        cardsFlipped={this.state.cardsFlipped}
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
  }
  console.log('deck: ', deck);
  return deck;
}

export default App;
