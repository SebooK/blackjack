import DefaultComponent from "./defaultComponent";

export default class CardsComponent extends DefaultComponent {
    constructor(type, id, className) {
        super(type, id, className)
        this.deck = '';
        this.cards = '';
    }

    renderCard(cardsInHand, playerComponent) {
        cardsInHand.forEach(cardDetails => {
            if (cardDetails) {
                const card = document.createElement('div');
                card.className = 'cards__img'
                const {images: {png}, value} = cardDetails;
                const hand = this.create();
                hand.src = png;
                hand.id = value;
                card.appendChild(hand)
                document.querySelector(`${playerComponent}`).appendChild(card)
            }
        })

    }
}
