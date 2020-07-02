import IDictionary from '../interfaces/IDictionary';
import Wrapper from '../abstracts/Wrapper';

export default class Dictionary<T extends object> extends Wrapper<{ [key: string]: T }> implements IDictionary<T> {

    constructor() {
        super({});
    }

    public get length(): number {
        return Object.keys(this.unwrap()).length;
    }

    public read(key: string): T {
        return this.unwrap()[key];
    }

    public write({ key, value }: { key: string, value: T }): void {
        this.unwrap()[key] = value;
    }

    public delete(key: string): void {
        delete this.unwrap()[key];
    }

    public find(fn: (value: T) => boolean): T | undefined {
        const key: string | undefined = Object.keys(this.unwrap()).find((k) => fn(this.unwrap()[k]));
        return this.unwrap()[key || -1];
    }

    public forEach(fn: (value: T) => void): void {
        Object.keys(this.unwrap()).forEach((key) => {
            if (this.unwrap()[key]) {
                fn(this.unwrap()[key]);
            }
        });
    }

    public toArray(): T[] {
        return Object.keys(this.unwrap()).map((key) => {
            return this.unwrap()[key];
        }).filter((target) => !!target);
    }

}
