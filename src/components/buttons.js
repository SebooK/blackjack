import DefaultComponent from "./defaultComponent";

export default class Button extends DefaultComponent {
    constructor(type, id, className,title,disabled) {
        super(type, id, className)
        this.title = title;
        this.disabled = disabled;
    }

    create() {
        const component =  document.createElement(`${this.type}`);
        component.id = this.id;
        component.className = this.className;
        component.innerHTML = this.title;
        component.disabled = this.disabled
        return component;
    }

}
