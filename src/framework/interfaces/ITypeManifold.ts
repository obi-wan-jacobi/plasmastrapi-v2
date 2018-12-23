import { Ctor } from '../types/Ctor';
import IIterable from './IIterable';
import IUnique from './IUnique';
import TypeUnifold from '../concretes/data-structures/TypeUnifold';

export default interface ITypeManifold<TType extends IUnique> extends IIterable<TType> {

    get(InstanceCtor: Ctor<TType, any>): TypeUnifold<TType>;

    add(instance: TType): void;

    remove(instance: TType): void;

    prune(InstanceCtor: Ctor<TType, any>): void;

}
