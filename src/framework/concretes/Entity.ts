import IComponent from '../interfaces/IComponent';
import TypeCollection from './data-structures/TypeCollection';
import Unique from '../abstracts/Unique';

export default class Entity extends Unique {

    private __components: ComponentCollectionEntityInjector;

    constructor() {
        super();
        this.__components = new ComponentCollectionEntityInjector(this);
    }

    public get components(): TypeCollection<IComponent<any>> {
        return this.__components;
    }

}

class ComponentCollectionEntityInjector extends TypeCollection<IComponent<any>> {

    private __entity: Entity;

    constructor(entity: Entity) {
        super();
        this.__entity = entity;
    }

    public add(component: IComponent<any>): boolean {
        const isAdded = super.add(component);
        component.bind(this.__entity);
        return isAdded;
    }

}
