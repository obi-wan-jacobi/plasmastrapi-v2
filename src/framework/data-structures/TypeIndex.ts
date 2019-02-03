import { Ctor } from '../types/Ctor';
import Dictionary from './Dictionary';
import ITypeIndex from '../interfaces/ITypeIndex';
import { Optional } from '../types/Optional';
import Wrapper from '../abstracts/Wrapper';

export default class TypeIndex<TBaseType, TBaseDataType> extends Wrapper<Dictionary<TBaseType>>
implements ITypeIndex<TBaseType, TBaseDataType> {

    constructor() {
        super(new Dictionary<TBaseType>());
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public get<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): TType {
        return this.unwrap().read(InstanceCtor.name) as TType;
    }

    public add<TType extends TBaseType, TData extends TBaseDataType>(
        InstanceCtor: Ctor<TType, Optional<TData>>, data?: TData,
    ): TType {
        const inner = this.unwrap();
        if (inner.read(InstanceCtor.name)) {
            return inner.read(InstanceCtor.name) as TType;
        }
        const instance = new InstanceCtor(data);
        inner.write({
            key: instance.constructor.name,
            value: instance,
        });
        return instance;
    }

    public remove<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): Optional<TType> {
        const inner = this.unwrap();
        const instance = inner.read(InstanceCtor.name);
        if (!instance) {
            return undefined;
        }
        inner.delete(InstanceCtor.name);
        return instance as TType;
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
