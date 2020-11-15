import IDictionary from '../interfaces/IDictionary';
import { Index } from '../types';

export default class Dictionary<T extends {}> implements IDictionary<T> {

  private __data: Index<T> = {};

  public get length(): number {
    return Object.keys(this.__data).length;
  }

  public read(key: string): T | undefined {
    return this.__data[key];
  }

  public write({ key, value }: { key: string; value: T }): void {
    this.__data[key] = value;
  }

  public delete(key: string): void {
    delete this.__data[key];
  }

  public find(fn: (value: T) => boolean): T | undefined {
    const key: string | undefined = Object.keys(this.__data).find((k) => fn(this.__data[k]));
    return this.__data[key || -1];
  }

  public forEach(fn: (value: T) => void): void {
    Object.keys(this.__data).forEach((key) => {
      if (this.__data[key]) {
        fn(this.__data[key]);
      }
    });
  }

  public toArray(): T[] {
    return Object.keys(this.__data).map((key) => {
      return this.__data[key];
    }).filter((target) => !!target);
  }

}
