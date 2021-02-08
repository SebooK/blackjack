export default class Player {
    constructor(id,name,credits,cards,score) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.cards = cards;
        this.score = score;
    }

    fillProperties(componentToFill) {
        const component = componentToFill;
        component.id = this.id;
        component.firstElementChild.innerText = this.score;
        return component
    }

}
