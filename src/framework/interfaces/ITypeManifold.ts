import { Ctor } from '../types/Ctor';
import IUnique from './IUnique';
import TypeUnifold from '../concretes/data-structures/TypeUnifold';

export default interface ITypeManifold<TType extends IUnique> {

    length: number;

    get(InstanceCtor: Ctor<TType, any>): TypeUnifold<TType>;

    add(instance: TType): void;

    remove(instance: TType): void;

    prune(InstanceCtor: Ctor<TType, any>): void;

    forEach(method: (payload: {}) => void): void;

}
