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
      firstCard: null,
      secondClick: false,
      cardsFlipped: Array(18).fill(null),
      pairs: [],
      stats: {
        matches: null,
        attempts: null,
        games: null,
        wins: null,
      },
      level: 1,
    }
  }

  handleClick(i) {
    const cardsFlipped = this.state.cardsFlipped.slice();
    let secondClick = this.state.secondClick;
    let attempts = this.state.stats.attempts;

    if (!secondClick) {
      const firstCard = i;
      secondClick = true;
      cardsFlipped[i] = true;
      this.setState({
        secondClick: secondClick,
        firstCard: firstCard,
        cardsFlipped: cardsFlipped,
      })

    } else if (secondClick) {
      attempts++
      secondClick = false;
      cardsFlipped[i] = true;

      this.setState({
        secondClick: secondClick,
        firstCard: null,
        cardsFlipped: cardsFlipped,
      })

    }
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
