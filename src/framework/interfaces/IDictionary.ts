import IWrapper from './IWrapper';
import { Indexed } from '../types';

export default interface IDictionary<T> extends IWrapper<Indexed<{}>> {

    length: number;

    read(key: string): T;

    write({ key, value }: { key: string, value: T }): void;

    delete(key: string): void;

    forEach(fn: (value: T) => void): void;

}