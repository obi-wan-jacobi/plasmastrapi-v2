import Dictionary from './objects/Dictionary';
import IComponent from './interfaces/IComponent';
import IEntity from './interfaces/IEntity';
import Unique from './abstracts/Unique';

export default class Entity extends Unique implements IEntity {

    private __componentsDictionary: Dictionary<IComponent<{}>>;

    constructor() {
        super();
        this.__componentsDictionary = new Dictionary<IComponent<{}>>();
    }

    public add<T>(component: IComponent<T>): void {
        this.__componentsDictionary.write({
            key: component.constructor.name,
            value: component,
        });
    }

    public remove<T>(ComponentSubclass: new () => IComponent<T>): void {
        this.__componentsDictionary.delete(ComponentSubclass.name);
    }

    public get<T>(ComponentSubclass: new () => IComponent<T>): IComponent<T> {
        return this.__componentsDictionary.read(ComponentSubclass.name);
    }

    public forEach(fn: (component: IComponent<any>) => void): void {
        this.__componentsDictionary.forEach(fn);
    }

    public map(fn: (component: IComponent<any>) => any): any[] {
        return this.__componentsDictionary.map(fn);
    }

}
