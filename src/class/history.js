export default class History {
    constructor() {
        this.wins = 0;
        this.roundResult = [];
        this.historyResult = [];
        this.topAmountOfCredits = [];
        this.topScore = [];
    }

    getResults(round, player, dealer, gameResults, bet) {
        this.roundResult.unshift(round, player, dealer, gameResults, bet);
        return this.roundResult
    }

    loadHistory() {
        document.querySelector('.history__rounds').innerHTML = '';
        return this.historyResult.forEach((value, index) => {
            const element = document.createElement('div');
            element.id = `history__element--${index}`
            element.className = 'history__element'
            element.innerHTML = value.innerHTML
            document.querySelector('.history__rounds').appendChild(element)
        })
    }

    sendTopScoreToStorage() {
        const previousTopScores = this.getFromStorage();
        const listFoTopScores = previousTopScores.concat(this.topAmountOfCredits)
        localStorage.setItem('topScore', JSON.stringify(listFoTopScores));
    }

    sendToStorage() {
        localStorage.setItem('gameResults', JSON.stringify(this.roundResult));
    }

    addCreditsTopRanking(creditsValue) {
        this.topAmountOfCredits.push(creditsValue)
    }

    getFromStorage() {
        const localStorageTopScore = localStorage.getItem('topScore');
        if (localStorageTopScore !== null) {
            return localStorageTopScore
        }
    }

    async getTopCredits() {
        this.topScore.push(this.getFromStorage());
        if (this.topScore.length > 0){
            this.topScore.sort().map((element, index) => {
            const item = document.createElement("span");
            item.id = `${index + 1}`;
            item.className = 'top__value'
            item.innerHTML = `${index + 1}.${element}`;
            return document.querySelector('.credits__top').appendChild(item);
        });
        }
    }

    saveToRoundHistory() {
        const [rounds, player, dealer] = this.roundResult
        const historyRoundResult = document.createElement('div');
        historyRoundResult.innerHTML += `<span class="history__round">${rounds + 1}</span>`;

        let playerCards = '';
        player.cards.forEach(card => {
            if (card) {
                const {suit, value, code} = card
                playerCards += `${code}:${value} ${suit} <br>`
            }
            return playerCards
        })
        historyRoundResult.innerHTML += `<span class="history__playerHand">${playerCards}</span>`
        let dealerCards = '';
        dealer.cards.forEach(card => {
            if (card) {
                const {suit, value, code} = card
                dealerCards += `${code}:${value} ${suit}<br>`
            }
            return dealerCards
        })
        historyRoundResult.innerHTML += `<span class="history__dealerHand">${dealerCards}</span>`

        historyRoundResult.innerHTML += `<span class="history__credits">${player.credits}</span>`
        this.historyResult.push(historyRoundResult)
    }

    clearHistory() {
        this.historyResult = [];
        document.querySelector('.history__rounds').innerHTML = '';
    }
}
