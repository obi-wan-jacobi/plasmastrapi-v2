import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import Unique from '../../data-structures/abstracts/Unique';

export abstract class Component<T extends {}> extends Unique implements IComponent<T> {

    public $entity: IEntity;

    private __data: T;

    constructor(data: T) {
        super();
        this.mutate(data);
    }

    public inject(entity: IEntity): void {
        this.$entity = entity;
    }

    public copy(): T {
        return this.__clone(this.__data);
    }

    public mutate(data: T): void {
        this.__data = this.__clone(data);
    }

    private __clone(data: T): T {
        return JSON.parse(JSON.stringify(data));
    }

}
