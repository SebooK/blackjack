import DecksOfCardsApi from "../api/decks";
import Player from "./Player";
import CardsComponent from "../components/cards";
import Button from "../components/buttons";
import History from './history'

export default class Game {
    constructor(rounds) {
        this.rounds = rounds;
        this.round = 0;
        this.gameStart = false;
        this.resetGameFlag = false;
        this.bet = 0;
        this.multipy = false;
        this.gameOver = false;
        this.playerWon = false;
        this.draw = false;
        this.deckId = '';
        this.decks = new DecksOfCardsApi(6, 2);
        this.dealer = new Player('0', 'Dealer', 0, [], 0);
        this.player = new Player('1', 'Player', 1000, [], 0);
        this.cards = new CardsComponent('img', '', 'img__element');
        this.casinoChipsButtons = new Button('div', 'casinoChip', 'casino__chips');
        this.history = new History();
    }


    async newGame() {
        this.gameStart = true;
        this.round = 0;
        this.deckId = await this.decks.startDeck();
        await this.decks.shuffleDeck(this.deckId);
        this.gameOver = false;
        this.playerWon = false;
        this.draw = false;
        this.dealer = new Player('0', 'Dealer', 0, [], 0);
        this.player = new Player('1', 'Player', 1000, [], 0);
        await this.history.clearHistory()
        await this.clearContent();
        await this.history.getTopCredits()

        return {player: this.player, dealer: this.dealer}
    }

    async prepare() {
        if (this.resetGameFlag === false) {
            if (this.round === this.rounds) {
                this.history.addCreditsTopRanking(this.player.credits)
                this.history.sendTopScoreToStorage();
                alert('Koniec gry');
                document.querySelector('#newGame').disabled = false;
                return
            }
        }

        if (this.player.credits === 0) {
            alert('Not enough credits')
            document.querySelector('#newGame').disabled = false;
            return
        }
        this.player.cards = await this.decks.drawCards(this.deckId, 2);
        this.dealer.cards = await this.decks.drawCards(this.deckId, 2);
        this.player.score = this.playerCardSum(this.player.cards);
        this.dealer.score = this.playerCardSum(this.dealer.cards);

        this.cards.renderCard(this.dealer.cards, '.dealer__cards');
        this.cards.renderCard(this.player.cards, '.player__cards');
        document.querySelector('.credits__value').innerText = this.player.credits;
        document.querySelector('.player__score').innerHTML = this.player.score;
        document.querySelector('.dealer__score').innerHTML = '?';
        document.querySelector('.rounds__value').innerHTML = this.getRound()
    }

    playerCardSum(cards) {
        let valueOfCards = 0;
        cards.forEach((card) => {
            if (card) {
                const {value, hasAce} = card;
                if (hasAce === true && valueOfCards + 11 < 22) {
                    valueOfCards += value + 10;
                } else {
                    valueOfCards += value
                }
            }
        })
        return valueOfCards
    }

    async hitAction() {
        if (this.bet === 0) {
            alert('You must make a bet');

        } else {
            const card = await this.decks.drawCards(this.deckId, 1)
            this.player.cards.push(card[0]);
            await this.cards.renderCard(card, '.player__cards');
            this.player.score = this.playerCardSum(this.player.cards);
            document.querySelector('.player__score').innerHTML = this.player.score;
            return this.checkForEndOfGame(this.player.score, this.dealer.score)
        }
    }

    async hitStand() {
        this.gameOver = true;
        return this.checkForEndOfGame(this.player.score, this.dealer.score);
    }


    async checkForEndOfGame() {
        if (this.gameOver === true) {
            this.dealer.score = await this.dealerDrawCards();
        }
        if (this.player.score > 21) {
            this.playerWon = false;
            this.gameOver = true;
            document.querySelector('.dealer__cards .cards__img').classList.add('show')
        } else if (this.dealer.score > 21) {
            this.playerWon = true
            this.gameOver = true
            document.querySelector('.dealer__cards .cards__img').classList.add('show');
        } else if (this.gameOver === true) {
            if (this.player.score > this.dealer.score) {
                this.playerWon = true;
            } else if (this.player.score < this.dealer.score) {
                this.playerWon = false;
            } else if (this.player.score === this.dealer.score) {
                this.draw = true;
            } else {
                this.draw = false;
            }
        }
        await this.showResults()
    }


    async showResults() {
        if (this.gameOver === true) {
            if (this.playerWon === true) {
                this.player.credits += this.bet * 1.5;
                window.alert('Player won');
            } else if (this.draw === true) {
                document.querySelector('.dealer__score').innerText = this.dealer.score;
                window.alert('Draw');
            } else {
                document.querySelector('.dealer__score').innerText = this.dealer.score;
                window.alert('Dealer won');
                this.bet = 0;
            }
            document.querySelector('.credits__value').innerHTML = this.player.credits

            this.history.getResults(this.round, this.player, this.dealer, this.playerWon, this.bet);
            this.round += 1;
            this.history.saveToRoundHistory();
            this.history.loadHistory()
            await this.clearContent();
        }
    }

    async dealerDrawCards() {
        while (this.dealer.score < this.player.score && this.dealer.score < 17) {
            const card = await this.decks.drawCards(this.deckId, 1);
            if (card) {
                this.dealer.cards.push(card[0]);
                this.dealer.score = this.playerCardSum(this.dealer.cards);
                await this.cards.renderCard(card, '.dealer__cards');
            }
        }
        document.querySelector('.dealer__score').innerText = this.dealer.score;
        document.querySelector('.dealer__cards .cards__img').className += ' show'
        return this.dealer.score
    }

    getRound() {
        return this.round
    }

    doubleBet() {
        if (this.player.cards.length < 3) {
            this.multipy = true
            this.canBet(this.bet)
        } else {
            alert('Możesz podwoić tylko gdy posiadasz 2 karty')
        }

    }

    prepareCasinoChips(numberOfChips, values) {
        const colors = ['red', 'green', 'blue']
        values.forEach((value, index) => {

            const casinoChip = this.casinoChipsButtons.create();
            casinoChip.id += `--${index}`
            casinoChip.innerHTML = value;
            casinoChip.className += ` ${colors[index]}`;
            casinoChip.setAttribute('data-value', value);
            casinoChip.addEventListener('click', () => {
                if (this.player.cards.length < 3) {
                    this.canBet(value)
                } else {
                    document.querySelectorAll('.casino__chips').forEach((el) => el.disabled = true)
                }

            })
            document.querySelector('.menu__casinoButton').appendChild(casinoChip)
        })

    }

    canBet(value) {
        if (this.multipy === true && this.bet !== 0) {
            if (value <= this.player.credits) {
                this.bet *= 2;
                this.player.credits -= value
                this.multipy = false;
            } else {
                alert('Nie posiadasz tyle kredytów')
            }
        } else if (this.multipy === false && value <= this.player.credits) {
            this.bet += parseInt(value, 10);
            this.player.credits -= value
        } else {
            alert('Nie posiadasz tyle kredytów')
        }
        document.querySelector('.credits__value').innerText = this.player.credits;
    }

    async clearContent() {
        document.querySelector('.dealer__cards').innerHTML = '';
        document.querySelector('.player__cards').innerHTML = '';
        document.querySelector('.dealer__score').innerHTML = '0'
        document.querySelector('.player__score').innerHTML = '0'
        await this.updateRounds()
    }

    async updateRounds() {
        this.gameOver = false;
        const rounds = this.getRound()
        document.querySelector('.credits__value').innerHTML = this.player.credits;
        document.querySelector('.rounds__value').innerHTML = rounds;
        await this.prepare();
    }


    async resetGame() {
        try {
            await Promise.all([
                this.history.clearHistory(),
                this.clearContent(),
                this.newGame()])
        } catch (e) {
            throw new Error(e)
        }
    }
}
