class Board extends React.Component {

  renderCards(order, card) {
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
        {this.props.cards.map((card, order) => this.renderCards(order, card))}
      </div>
    );
  }
}
