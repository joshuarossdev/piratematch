import React from 'react';
import './App.css';

function Card(props) {
  return (
    <div className="card" >
      <div
        onClick={props.onClick}
        className={
        props.flip ? "card-front " + props.card : "card-back " }>
      </div>
    </div>
  );
}

class Board extends React.Component {
  renderCards(card , i) {
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
        {this.props.cards.map(( card, i ) => this.renderCards( card, i ))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: shuffleCards(),
      cardClicks: 0,
      cardsFlipped: Array(18).fill(true),
      pairs: [],
      stats: {
        successes: null,
        attempts: null,
        games: null,
        wins: null,
      },
      level: 1,
    }
  }

  handleClick(i) {
    const cardsFlipped = this.state.cardsFlipped.slice();
    cardsFlipped[i] = !cardsFlipped[i];
    this.setState({
      cardsFlipped: cardsFlipped,
    })
  }

  render() {
    return (
      <div>
        <Board
        cards={this.state.cards}
        cardsFlipped={this.state.cardsFlipped}
        onClick={ (i) => this.handleClick(i)}
        />
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
    deck.push(card);
  }
  return deck;
}

export default App;
