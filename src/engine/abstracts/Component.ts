import Entity from './Entity';
import IComponent from '../interfaces/IComponent';
import UniqueWrapper from '../../framework/abstracts/UniqueWrapper';

export default abstract class Component<TData> extends UniqueWrapper<TData> implements IComponent<TData> {

    private __entity: Entity;

    constructor(data: TData) {
        super(data);
        this.set(data);
    }

    public get data(): TData {
        return super.unwrap();
    }

    public get entity(): Entity {
        return this.__entity;
    }

    public set(data: TData): void {
        Object.assign(super.unwrap(), data);
    }

    public bind(entity: Entity): void {
        this.__entity = entity;
    }

}
