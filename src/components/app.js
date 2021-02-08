import DefaultComponent from "./defaultComponent";
import Button from "./buttons";
import Game from "../class/game";
import History from "../class/history";

export default class App extends DefaultComponent {
    constructor(type, id, className) {
        super(type, id, className);
        this.game = new Game(5);
        this.hitButton = new Button('button', 'hit', 'button button--hit', 'Hit', true)
        this.standButton = new Button('button', 'stand', 'button button--stand', 'Stand', true);
        this.doubleDownButton = new Button('button', 'doubleDown', 'button button--doubleDown', 'Double down', true)
        this.newGameButton = new Button('button', 'newGame', 'button button--newGame', 'New game', false);
        this.resetGameButton = new Button('button', 'resetGame', 'button button-resetGame', 'Reset game', true)
        this.history = new History();
    }

    async init() {

        const newGameButtonComponent = this.newGameButton.create();
        const hitButtonComponent = this.hitButton.create();
        const standButtonComponent = this.standButton.create();
        const doubleDownButtonComponent = this.doubleDownButton.create();
        const resetGameButtonComponent = this.resetGameButton.create();
        const buttonPlaceholder = document.querySelector('.menu__buttons')
        newGameButtonComponent.addEventListener('click', async () => {
            await this.game.newGame()
            hitButtonComponent.removeAttribute('disabled')
            standButtonComponent.removeAttribute('disabled')
            doubleDownButtonComponent.removeAttribute('disabled')
            newGameButtonComponent.disabled = true;
            resetGameButtonComponent.disabled = false;
        })



        const dealerComponent = document.querySelector('.game__dealer');
        const playerComponent = document.querySelector('.game__player');
        this.game.dealer.fillProperties(dealerComponent);
        buttonPlaceholder.appendChild(newGameButtonComponent)
        this.resetGameButton.appendTo(resetGameButtonComponent, '.menu__buttons');
        this.game.player.fillProperties(playerComponent)


        hitButtonComponent.addEventListener('click', async () => {
            await this.game.hitAction()
        });


        standButtonComponent.addEventListener('click', async () => {
            await this.game.hitStand()
        })


        doubleDownButtonComponent.addEventListener('click', async () => {
            this.game.doubleBet()
        })

        resetGameButtonComponent.addEventListener('click', async () => {
            this.game.resetGameFlag = true;
            await this.game.resetGame();
        })

        this.hitButton.appendTo(hitButtonComponent, '.menu__buttons');
        this.standButton.appendTo(standButtonComponent, '.menu__buttons');
        this.doubleDownButton.appendTo(doubleDownButtonComponent, '.menu__buttons');
        this.game.prepareCasinoChips(3, ['100', '250', '500'])
    }


}



