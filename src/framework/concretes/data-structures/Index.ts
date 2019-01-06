import Dictionary from './Dictionary';
import IIterable from '../../interfaces/IIterable';
import IUnique from '../../interfaces/IUnique';
import Wrapper from '../../abstracts/Wrapper';

export default class Index<T extends IUnique> extends Wrapper<Dictionary<T>>
implements IIterable<T> {

    constructor() {
        super(new Dictionary<T>());
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public get(key: string): T {
        return this.unwrap().read(key);
    }

    public add(instance: T): boolean {
        if (this.unwrap().read(instance.id)) {
            return false;
        }
        this.unwrap().write({
            key: instance.id,
            value: instance,
        });
        return true;
    }

    public remove(key: string): boolean {
        if (!this.unwrap().read(key)) {
            return false;
        }
        this.unwrap().delete(key);
        return true;
    }

    public purge(): void {
        this.unwrap().flush();
    }

    public forEach(method: (value: T) => void): void {
        this.unwrap().forEach(method);
    }

    public map(method: (value: T) => any): any[] {
        return this.unwrap().map(method);
    }

    public find(method: (value: T) => boolean): T {
        return this.unwrap().find(method);
    }

}
