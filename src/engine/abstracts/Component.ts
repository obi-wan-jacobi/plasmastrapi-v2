import Entity from './Entity';
import IComponent from '../interfaces/IComponent';
import IDataPrimitive from '../interfaces/IDataPrimitive';
import UniqueWrapper from '../../framework/abstracts/UniqueWrapper';

export default abstract class Component<TData extends IDataPrimitive>
 extends UniqueWrapper<TData> implements IComponent<TData> {

    private __entity: Entity;

    constructor(data?: TData) {
        super(data);
        this.mutate(data || {} as TData);
    }

    public get data(): TData {
        const data = super.unwrap();
        const result: TData = {} as unknown as TData;
        for (const key in data) {
            if ((data as unknown as object).hasOwnProperty(key)) {
                result[key] = data[key];
            }
        }
        return result as unknown as TData;
    }

    public get entity(): Entity {
        return this.__entity;
    }

    public mutate(data: TData): void {
        Object.assign(super.unwrap(), data);
    }

    public bind(entity: Entity): void {
        this.__entity = entity;
    }

}
