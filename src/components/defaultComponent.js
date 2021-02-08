export default class DefaultComponent {

    constructor(type,id,className) {
        this.type = type;
        this.id = id;
        this.className = className;

    }

     create() {
        const component =  document.createElement(`${this.type}`);
        component.id = this.id;
        component.className = this.className;
        return component;
    }

    appendTo(element,placeholder) {
        const parent = document.querySelector(`${placeholder}`);
        parent.appendChild(element)
    }

    addClass(classParam) {
        console.log(classParam);
         this.className += classParam
    }
}
