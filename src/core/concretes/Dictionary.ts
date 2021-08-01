import { isNullOrUndefined } from 'core/helpers/isNullOrUndefined';
import IDictionary from '../interfaces/IDictionary';
import { Dict, Void, Volatile } from '../types';

export default class Dictionary<T extends {}> implements IDictionary<T> {

  private __data: Dict<T> = {};

  public get length(): number {
    return Object.keys(this.__data).length;
  }

  public read(key: string): Volatile<T> {
    return this.__data[key];
  }

  public write({ key, value }: { key: string; value: T }): void {
    if (isNullOrUndefined(key)) {
      throw new Error('Key must be defined.');
    }
    if (isNullOrUndefined(value)) {
      throw new Error('Value must be defined.');
    }
    this.__data[key] = value;
  }

  public delete(key: string): void {
    delete this.__data[key];
  }

  public find(fn: (value: T) => boolean): Volatile<T> {
    const key: Volatile<string> = Object.keys(this.__data).find((k) => fn(this.__data[k]));
    return this.__data[key || -1];
  }

  public forEach(fn: Void<T>): void {
    Object.keys(this.__data).forEach((key) => {
      if (!isNullOrUndefined(this.__data[key])) {
        fn(this.__data[key]);
      }
    });
  }

  public toArray(): T[] {
    const result: T[] = [];
    this.forEach((value) => result.push(value));
    return result;
  }

}
