import React from 'react';
import './App.css';

function Card(props) {
  return (
    <div className="card" >
      <div
        className="card-front col-2">
          <br></br>{props.cardFront}
      </div>
      <div className="card-back">back</div>
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
