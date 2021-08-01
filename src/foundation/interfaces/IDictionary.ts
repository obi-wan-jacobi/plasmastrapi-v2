import { Volatile } from 'foundation/types';

export default interface IDictionary<T extends {}> {

  length: number;

  read(key: string): Volatile<T>;

  write({ key, value }: { key: string; value: T }): void;

  delete(key: string): void;

  find(fn: (value: T) => boolean): Volatile<T>;

  forEach(fn: (value: T) => void): void;

  toArray(): T[];

}
