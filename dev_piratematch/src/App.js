import React from 'react';
import './App.css';

function Card(props) {
  const classNames = props.cardFront + " card-front"

  return (
    <div className="card" >
      <div className={classNames}></div>
      <div className="card-back"></div>
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
  const cards = ['barrel', 'cannon', 'compass', 'flag',
    'mermaid', 'telescope', 'palm', 'parrot', 'pearl'];
  let deck = cards.concat(cards);
  return deck;
}

export default App;
