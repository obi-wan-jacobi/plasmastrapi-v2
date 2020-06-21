import Dictionary from './Dictionary';
import IDictionary from '../interfaces/IDictionary';
import IFactory from '../interfaces/IFactory';
import IUnique from '../interfaces/IUnique';
import Wrapper from '../abstracts/Wrapper';
import { Ctor, Optional } from '../types';

export default class Factory<T extends IUnique> extends Wrapper<IDictionary<T>> implements IFactory<T> {

    constructor() {
        super(new Dictionary<T>());
    }

    public create<TData>(InstanceCtor: Ctor<T, Optional<TData>>, data?: TData): T {
        const instance = new InstanceCtor(data);
        this.add(instance);
        return instance;
    }

    public add(instance: T): void {
        this.unwrap().write({
            key: instance.id,
            value: instance,
        });
    }

    public destroy(instance: T): void {
        return this.unwrap().delete(instance.id);
    }

    public forEach(fn: (value: T) => void): void {
        this.unwrap().forEach(fn);
    }

    public first(fn: (value: T) => boolean): T | undefined {
        const keys = Object.keys(this.unwrap().unwrap());
        for (const key of keys) {
            const target = this.unwrap().unwrap()[key];
            if (fn(target)) {
                return target;
            }
        }
    }

}
