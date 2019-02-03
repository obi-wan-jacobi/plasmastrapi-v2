import { Ctor } from '../types/Ctor';
import IIterable from './IIterable';
import { Optional } from '../types/Optional';

export default interface ITypeIndex<TBaseType, TBaseDataType> extends IIterable<TBaseType> {

    get<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): TType;

    add<TType extends TBaseType, TData extends TBaseDataType>(InstanceCtore: Ctor<TType, TData>, data: TData): TType;

    remove<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): Optional<TType>;

}
