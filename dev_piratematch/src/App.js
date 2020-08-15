import React from 'react';
import './App.css';

function Card(props) {
  const frontClassNames = props.cardFront + " card-front"
  return (
    <div className="card" >
      <div className="card-back"></div>
      <div className={frontClassNames}></div>
    </div>
  );
}

class Board extends React.Component {

  render() {
   const deck = shuffleCards().map((card, order) => {
      return (
          <Card
            key={order + card}
            cardFront={card}
          />
      );
    })

    return (
        <div className="cardrow col-10">
         {deck}
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="container">
        <Board/>
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
    let randomNumber = Math.floor(Math.random() * cards.length);
    const card = cards.splice(randomNumber, 1);
    deck.push(card);
  }
  return deck;
}

export default App;
