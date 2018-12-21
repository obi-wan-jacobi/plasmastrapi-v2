import Dictionary from './data-structures/Dictionary';
import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import Unique from '../abstracts/Unique';

export default class Entity extends Unique implements IEntity {

    private __componentsDictionary: Dictionary<IComponent<any>>;

    constructor() {
        super();
        this.__componentsDictionary = new Dictionary<IComponent<any>>();
    }

    public add<T>(component: IComponent<T>): void {
        this.__componentsDictionary.write({
            key: component.constructor.name,
            value: component,
        });
        component.bind(this);
    }

    public remove<T>(ComponentSubclass: new () => IComponent<T>): void {
        this.__componentsDictionary.delete(ComponentSubclass.name);
    }

    public get<TComponent>(componentName: string): TComponent {
        return this.__componentsDictionary.read(componentName) as unknown as TComponent;
    }

    public forEach(fn: (component: IComponent<any>) => void): void {
        this.__componentsDictionary.forEach(fn);
    }

    public map(fn: (component: IComponent<any>) => any): any[] {
        return this.__componentsDictionary.map(fn);
    }

}
