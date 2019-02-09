import { Ctor } from '../types/Ctor';
import IContainer from './IContainer';
import IIterable from './IIterable';
import IUnique from './IUnique';

export default interface IManifold<T extends IUnique> extends IIterable<IIterable<T>> {

    length: number;

    find(id: string): T | undefined;

    get(InstanceCtor: Ctor<T, any>): IContainer<T>;

    add(instance: T): void;

    remove(instance: T): void;

    prune(InstanceCtor: Ctor<T, any>): void;

}
