
export default class Dictionary<T> {

    private __data: { [key: string]: T };

    constructor() {
        this.flush();
    }

    public get length(): number {
        return Object.keys(this.__data).length;
    }

    public read(key: string): T {
        return this.__data[key];
    }

    public write({ key, value }: { key: string, value: T }): void {
        this.__data[key] = value;
    }

    public delete(key: string): void {
        delete this.__data[key];
    }

    public flush(): void {
        this.__data = {};
    }

    public forEach(fn: (value: T) => void): void {
        Object.keys(this.__data).forEach((key) => {
            fn(this.__data[key]);
        });
    }

    public map(fn: (value: T) => any): any[] {
        return Object.keys(this.__data).map((key) => {
            return fn(this.__data[key]);
        });
    }

}
