import IComponent from './interfaces/IComponent';
import IEntity from './interfaces/IEntity';
import Unique from '../framework/abstracts/Unique';

export abstract class Component<T extends {}> extends Unique implements IComponent<T> {

    public $entity: IEntity;

    private __data: T;

    constructor(data: T) {
        super();
        this.mutate(data);
    }

    public inject(entity: IEntity): void {
        if (this.$entity) {
            throw new Error(
                `${this.constructor.name} has already been injected with ${this.$entity.constructor.name}!`,
            );
        }
        this.$entity = entity;
    }

    public copy(): T {
        return this._clone(this.__data);
    }

    public mutate(data: T): void {
        this.__data = this._clone(data);
    }

    protected _clone(data: T): T {
        return JSON.parse(JSON.stringify(data));
    }

}
