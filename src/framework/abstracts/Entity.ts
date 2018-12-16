import Component from './Component';

export default class Entity {

    public components: { [key: string]: Component<any> };

    constructor() {
        this.components = {};
    }

    public add<T>(component: Component<T>): void {
        this.components[component.constructor.name] = component;
    }

    public remove<T>(ComponentSubclass: new () => Component<T>): void {
        delete this.components[ComponentSubclass.name];
    }

    public get<T>(ComponentSubclass: new () => Component<T>): Component<T> {
        return this.components[ComponentSubclass.name];
    }

    public load(): void {
        return;
    }

    public unload(): void {
        return;
    }

}
