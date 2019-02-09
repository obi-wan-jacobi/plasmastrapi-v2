import Dictionary from './Dictionary';
import IContainer from '../interfaces/IContainer';
import IUnique from '../interfaces/IUnique';
import { Optional } from '../types/Optional';
import Wrapper from '../abstracts/Wrapper';

export default class Container<T extends IUnique> extends Wrapper<Dictionary<T>>
implements IContainer<T> {

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

    public remove(instance: T): boolean {
        if (!this.unwrap().read(instance.id)) {
            return false;
        }
        this.unwrap().delete(instance.id);
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

    public first(method?: (value: T) => void): Optional<T> {
        const first = this.unwrap().first();
        if (method && first) {
            method(first);
        }
        return first;
    }

}
