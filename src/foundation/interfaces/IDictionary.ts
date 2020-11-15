
export default interface IDictionary<T extends {}> {

  length: number;

  read(key: string): T | undefined;

  write({ key, value }: { key: string; value: T }): void;

  delete(key: string): void;

  find(fn: (value: T) => boolean): T | undefined;

  forEach(fn: (value: T) => void): void;

  toArray(): T[];

}
