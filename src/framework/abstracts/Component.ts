import DataWrapper from '../concretes/data-structures/DataWrapper';
import Entity from '../concretes/Entity';
import IComponent from '../interfaces/IComponent';
import Unique from './Unique';

export default abstract class Component<TData extends {}> extends Unique implements IComponent<TData> {

    private __data: DataWrapper<TData>;
    private __entity: Entity;

    constructor(data: TData) {
        super();
        this.__data = new DataWrapper<TData>(data);
        this.set(data);
    }

    public get data(): TData {
        return this.__data.unwrap();
    }

    public get entity(): Entity {
        return this.__entity;
    }

    public set(data: TData): void {
        Object.assign(this.__data.unwrap(), data);
    }

    public bind(entity: Entity): void {
        this.__entity = entity;
    }

}
