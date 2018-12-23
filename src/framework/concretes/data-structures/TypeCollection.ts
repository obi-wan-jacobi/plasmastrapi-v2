import { Ctor } from '../../types/Ctor';
import DataWrapper from './DataWrapper';
import Dictionary from './Dictionary';
import IIterable from '../../interfaces/IIterable';

export default class TypeCollection<TBaseType> extends DataWrapper<Dictionary<TBaseType>>
implements IIterable<TBaseType> {

    constructor() {
        super(new Dictionary<TBaseType>());
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public get<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): TType {
        return this.unwrap().read(InstanceCtor.name) as TType;
    }

    public add<TType extends TBaseType>(instance: TType): boolean {
        const inner = this.unwrap();
        if (inner.read(instance.constructor.name)) {
            return false;
        }
        inner.write({
            key: instance.constructor.name,
            value: instance
        });
        return true;
    }

    public remove<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): boolean {
        const inner = this.unwrap();
        if (!inner.read(InstanceCtor.name)) {
            return false;
        }
        inner.delete(InstanceCtor.name);
        return true;
    }

    public purge(): boolean {
        if (this.length === 0) {
            return false;
        }
        this.unwrap().flush();
        return true;
    }

    public forEach(method: (instance: TBaseType) => void): void {
        this.unwrap().forEach(method);
    }

}
