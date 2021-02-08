# blackjack

My first game ever made. It's simple JavaScript blackjack game using [Deck of Cards](https://deckofcardsapi.com/).

#Game highlights
* Ace as a special card is evaluated as "1" or "11" depending on player cards at Hand.
* When a player draws an Ace and the score exceeds 21, Ace value changes to 1.
* The Card Deck is downloaded from api shuffled and then shuffled again before the start of the game.
* Player can't get any more cards after he reaches "21" or gets past it.
* In first phase of the game two cards are drawn per player. Then player decides what to do, hit or stand.
* Only one card of Dealer is visible in first phase . Then in the end, for example Player stand Dealer's hand is revealed.

## Installation

```bash
    git clone https://github.com/SebooK/blackjack.git
    
    npm install
```
## Next step run 
```bash
    npm run build or npm run dev
```

