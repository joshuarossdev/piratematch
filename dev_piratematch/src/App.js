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
        {this.props.cards.map( (i) => this.renderCards(i) )}
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
      SecondCard: null,
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
    const cardsFlipped = this.state.cardsFlipped.slice();
    cardsFlipped[i] = flip;

    this.setState({
      firstCard: i,
      cardsFlipped: cardsFlipped,
    })
  };

  setSecondCard(i, flip) {
    const cardsFlipped = this.state.cardsFlipped.slice();
    cardsFlipped[i] = flip;

    this.setState({
      secondCard: i,
      cardsFlipped: cardsFlipped,
    })
  };

  resetPair() {
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

  handlePair() {
    const cards = this.state.cards.slice();
    const cardsFlipped = this.state.cardsFlipped.slice();
    const pairs = this.state.pairs.slice();
    const firstCard = this.state.firstCard;
    const secondCard = this.state.secondCard;
    const matches = this.state.matches;

    if ( cards[firstCard] === cards[secondCard] ) {

      matches++
      pairs.push(cards[firstCard]);
      this.setState({
        firstCard: null,
        secondCard: null,
        pairs: pairs,
        matches: matches,
      });

    } else {
      this.resetPair();
      // console.log('no')
      // cardsFlipped[firstCard] = false;
      // cardsFlipped[i] = false;
      // attempts++;
      // this.setState({
      //   firstCard: null,
      //   secondCard: null,
      //   cardsFlipped: cardsFlipped,
      //   attempts: attempts,
      //   matches: matches,
      // });
    };
  }

  handleClick(i) {
    // const cardsFlipped = this.state.cardsFlipped.slice();
    // let firstCard = this.state.firstCard;
    // let secondCard = this.state.secondCard;
    let attempts = this.state.attempts;
    let matches = this.state.matches;
    let pairs = this.state.pairs.slice();
    let clicks = this.state.clicks + 1

    if (clicks < 2) {
      this.setFirstCard(i, true);

    } else if (clicks === 2) {
      attempts++;
      this.setSecondCard(i, true);
      this.handlePair();

      // if ( firstCard === secondCard ) {
      //   console.log('yes');
      //   cardsFlipped[i] = true;
      //   matches++
      //   attempts++
      //   this.setState({
      //     firstCard: null,
      //     secondCard: null,
      //     cardsFlipped: cardsFlipped,
      //     attempts: attempts,
      //     matches: matches,
      //   });
      // } else {
      //   console.log('no')
      //   cardsFlipped[firstCard] = false;
      //   cardsFlipped[i] = false;
      //   attempts++;
      //   this.setState({
      //     firstCard: null,
      //     secondCard: null,
      //     cardsFlipped: cardsFlipped,
      //     attempts: attempts,
      //     matches: matches,
      //   });
      // };
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
        onClick={ (i) => this.handleClick(i) }
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
