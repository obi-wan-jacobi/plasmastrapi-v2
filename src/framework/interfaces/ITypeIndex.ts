import { Ctor } from '../types/Ctor';
import IIterable from './IIterable';
import { Optional } from '../types/Optional';

export default interface ITypeIndex<TBaseType> extends IIterable<TBaseType> {

    get<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): TType;

    add<TType extends TBaseType, TData>(InstanceCtore: Ctor<TType, Optional<TData>>, data?: TData): TType;

    remove<TType extends TBaseType>(InstanceCtor: Ctor<TType, any>): Optional<TType>;

}
