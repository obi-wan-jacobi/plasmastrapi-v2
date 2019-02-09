import IIterable from './IIterable';
import IUnique from './IUnique';
import { Optional } from '../types/Optional';

export default interface IContainer<T extends IUnique> extends IIterable<T> {

    length: number;

    get(key: string): T;

    add(instance: T): void;

    remove(instance: T): void;

    purge(): void;

    find(method: (value: T) => boolean): T;

    first(method?: (value: T) => void): Optional<T>;

    map(method: (value: T) => any): any[];

}
