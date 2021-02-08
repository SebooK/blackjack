import axios from 'axios'

export default class DecksOfCardsApi {
    constructor(deck, cards) {
        this.cards = cards;
        this.deck = deck
        this.hasAce = false;
    }

    async startDeck() {
        try {
            const {data} = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${this.deck}`);
            const {deck_id} = data;
            return deck_id;

        } catch (e) {
            throw new Error(e)
        }
    }

    async drawCards(deck, numOfCards) {
        if (!numOfCards || !deck) throw Error('Deck id or number of cards missing');
        try {
            const {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${numOfCards}`);
            const {cards} = data;
            return this.replaceNamesOfCardsToValue(cards);
        } catch (e) {
            throw new Error(e)
        }
    }

    async shuffleDeck(deck) {
        try {
            const {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`);
            return data
        } catch (e) {
            throw new Error(e)
        }
    }

    replaceNamesOfCardsToValue(cardsParam) {
        this.hasAce = false;
        return cardsParam.map((card) => {
            if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK") {
                card.value = 10;
                card.hasAce = this.hasAce
                return card
            } else if (card.value === "ACE") {
                card.value = 1;
                card.hasAce = true;
                return card
            } else {
                card.value = parseInt(card.value, 10)
                card.hasAce = this.hasAce
                return card
            }
        })
    }
}




