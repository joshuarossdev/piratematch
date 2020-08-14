import React from 'react';
import './App.css';

function Card() {
  return (
    <div className="card" >
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Array(18).fill(null)
    }
  };

  render() {
    const cards = this.state.cards;
    return (
        <div>
          <Card/>
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

export default App;
