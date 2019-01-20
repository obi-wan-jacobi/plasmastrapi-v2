import { Ctor } from '../types/Ctor';
import IIterable from './IIterable';
import IUnique from './IUnique';
import Index from '../data-structures/Index';

export default interface IManifold<T extends IUnique> extends IIterable<Index<T>> {

    length: number;

    get(InstanceCtor: Ctor<T, any>): Index<T>;

    add(instance: T): void;

    remove(instance: T): void;

    prune(InstanceCtor: Ctor<T, any>): void;

}
