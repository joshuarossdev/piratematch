import React from 'react';
import './App.css';

function Card(props) {
  return (
    <div className="card" >
      <div className="card-front"><br></br>{props.card}</div>
  <div className="card-back">back</div>
    </div>
  );
}

class Board extends React.Component {

  render() {
   const deck = shuffleCards().map((card) => {
      return (
        <div key="card">

        </div>
      );
    })

    return (
        <div>
          <Card card="front"/>
        </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Board/>
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
