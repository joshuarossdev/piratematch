import React from 'react';
import './App.css';

function Card(props) {
  const frontCardClasses = props.cardFront + " card-front";
  return (
    <div className="card" >
      <div className="card-back"></div>
      <div className={frontCardClasses}></div>
    </div>
  );
}

class Board extends React.Component {
  render() {
   const cards = this.props.cards.map((card, order) => {
      return (
          <Card
            key={order + card}
            cardFront={card}
          />
      );
    })

    return (
        <div className="cardrow col-10">
         {cards}
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: shuffleCards(),
      clicks: {
        firstCard: null,
        secondCard: null,
      },
      cardStatus: {
        matches: null,
      },
      stats: {
        matched: null,
        attempts: null,
        games: null,
      }
    }
  }

  render() {
    return (
      <div>
        <Board cards={this.state.cards} />
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
