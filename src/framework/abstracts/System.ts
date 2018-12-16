import IComponent from '../interfaces/IComponent';
import Unique from './Unique';

export default abstract class System<T extends IComponent<any>> extends Unique {

    private __componentSubclass: new (data: {}) => T;

    constructor(ComponentSubclass: new (data: {}) => T) {
        super();
        this.__componentSubclass = ComponentSubclass;
    }

    public abstract once(component: T): void;

    public get id(): string {
        return this.__componentSubclass.name;
    }

}
