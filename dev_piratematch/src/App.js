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
  renderCards(card , i) {
      return (
        <Card
          key={i + card}
          card={card}
          flip={this.props.cardsFlipped[i]}
          onClick={() => this.props.onClick(card, i)}
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
      firstCard: {
        location: null,
        card: null,
      },
      firstChoice: false,
      cardsFlipped: Array(18).fill(null),
      pairs: [],
      matches: 0,
      attempts: 0,
      games: null,
      wins: 0,
      level: 1,
    }
  }

  handleClick(card, i) {
    const cardsFlipped = this.state.cardsFlipped.slice();
    let firstChoice = this.state.firstChoice;
    let attempts = this.state.attempts;
    let matches = this.state.matches;
    let pairs = this.state.pairs.slice();

    if (!firstChoice) {
      cardsFlipped[i] = true;
      this.setState({
        firstChoice: true,
        firstCard: {
          location: i,
          card: card[0],
        },
        cardsFlipped: cardsFlipped,
      })

    } else if (firstChoice) {
      const firstCard = this.state.firstCard.card;
      const firstLocation = this.state.firstCard.location;
      console.log(firstCard);
      console.log(card[0]);

      if (firstCard === card[0] ) {
        console.log('yes');
        cardsFlipped[i] = true;
        matches++
        attempts++
        this.setState({
          firstChoice: false,
          firstCard: {
            location: null,
            card: null,
          },
          cardsFlipped: cardsFlipped,
          attempts: attempts,
          matches: matches,
        });
      } else {
        console.log('no')
        cardsFlipped[firstLocation] = false;
        cardsFlipped[i] = false;
        attempts++;
        this.setState({
          firstChoice: false,
          firstCard: {
            location: null,
            card: null,
          },
          cardsFlipped: cardsFlipped,
          attempts: attempts,
          matches: matches,
        });
      };
    }
    const level = this.state.level;
    let wins = this.state.wins;

    if (matches >= level) {
      wins++;
      this.setState({ wins: wins, });
    }
  }

  render() {
    return (
      <div>
        <Board
        cards={this.state.cards}
        cardsFlipped={this.state.cardsFlipped}
        onClick={ (card, i) => this.handleClick( card, i)}
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
    deck.push(card);
  }
  return deck;
}

export default App;
