import React from 'react';
import { useState } from 'react';
import { Transition } from 'react-transition-group';
import './App.module.css';

function Card( props ) {
  return (
    <div className="card" >
      <div
        onClick={props.onClick}
        className={ props.cardStyle }
      >
      </div>
    </div>
  );
}

class Board extends React.Component {

  renderCards( order, card ) {
    return (
      <Card
        key={order + card}
        card={card}
        cardStyle={this.props.cardStyles[order]}
        onClick={() => this.props.onClick(order)}
      />
    );
  }

  render() {
    return (
      <div className="cardrow col-10">
        {this.props.cards.map( (card, order) => this.renderCards(order, card) )}
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
      cardStyles: Array(18).fill('card-back'),
      pairs: [],
      matches: 0,
      attempts: 0,
      games: null,
      wins: 0,
      level: 1,
    }
  }

  setFirstCard( order, cardStyle ) {
    const cardStyles = this.state.cardStyles.slice();

    cardStyles[order] = cardStyle;
    console.log('setFirstCard: ', order, cardStyle);
    this.setState({
      firstCard: order,
      cardStyles: cardStyles,
    })
  };

  setSecondCard( order, cardStyle )  {
    const cardStyles = this.state.cardStyles.slice();
    let attempts = this.state.attempts;

    cardStyles[order] = cardStyle;
    attempts++;
    console.log('setSecondCard', order, cardStyle);
    this.setState({
      cardStyles: cardStyles,
      attempts: attempts,
    })
  };

  resetPair( card ) {
    const cardStyles = this.state.cardStyles.slice();
    const firstCard = this.state.firstCard;
    console.log('resetPair');
    cardStyles[firstCard] = 'card-back delay-flip';
    cardStyles[card] = 'card-back delay-flip';
    this.setState({
      clicks: 0,
      firstCard: null,
      cardStyles: cardStyles,
    });
  }

  handlePair( card ) {
    const cards = this.state.cards.slice();
    const firstCard = this.state.firstCard;
    const cardStyles = this.state.cardStyles.slice();
    const pairs = this.state.pairs.slice();
    let matches = this.state.matches;
    console.log('handlePair', card);

    if ( cards[firstCard] === card ) {
      console.log('pair match')
      pairs.push(cards[firstCard]);
      console.log('pairs: ', pairs);
      matches++
      this.setState({
        clicks: 0,
        firstCard: null,
        pairs: pairs,
        matches: matches,
      });
      this.checkForWin(matches);

    } else {
      console.log('no match');
      this.resetPair( card );
    };
  }

  checkForWin( matches ) {
    const level = this.state.level;
    let wins = this.state.wins;
    console.log('checkforWin', matches)

    if (matches >= level) {
      wins++;
      console.log('wins: ', wins);
      this.setState({ wins: wins, });
    }
  }

  handleClick( order, card ) {
    const pairs = this.state.pairs.slice();
    let clicks = this.state.clicks;
    console.log('handleClick: ', order, card);

    if ( pairs.includes(card) ) return;

    if (clicks === 0) {
      clicks++
      this.setState({ clicks: clicks });
      console.log('clicks: ', clicks);
      this.setFirstCard( order, `card-front ${card}` );

    } else if (clicks === 1) {
      clicks++
      this.setState({ clicks: clicks });
      console.log('clicks: ', clicks);
      this.setSecondCard( order, `card-front ${card}` );
      this.handlePair(order, card);

    } else return;
  }

  render() {
    return (
      <div>
        <Board
        cards={this.state.cards}
        cardStyles={this.state.cardStyles}
        onClick={ (order) => this.handleClick(this.state.cards[order], order) }
        />
        <div>
          <h2>{"Attempts: " + this.state.attempts}</h2>
          <h2>{"Matches: " + this.state.matches}</h2>
          <h2>
            {"Success %: " +
            Math.floor(this.state.matches / this.attempts * 100)}
          </h2>
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
  let deck = [];

  cards = cards.concat(cards);
  while (cards.length) {
    const randomNumber = Math.floor(Math.random() * cards.length);
    const card = cards.splice(randomNumber, 1);
    deck.push(card[0]);
  };
  console.log('deck: ', deck);
  return deck;
}

export default App;
