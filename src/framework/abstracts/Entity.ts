import Component from './Component';

export default class Entity {

    public components: Component[];

    constructor() {
        this.components = new Array();
    }

}
