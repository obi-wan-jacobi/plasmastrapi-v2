import IUnique from './IUnique';
import { Ctor, Optional } from '../types';

export default interface IFactory<T extends IUnique> {

    create<TData>(InstanceCtor: Ctor<T, Optional<TData>>, data?: TData): T;

    add(instance: T): void;

    destroy(instance: T): void;

    forEach(fn: (value: T) => void): void;

    first(fn: (value: T) => void): void;

    find(fn: (value: T) => boolean): T | undefined;

}
