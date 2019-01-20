import { Ctor } from '../types/Ctor';
import Dictionary from './Dictionary';
import IManifold from '../interfaces/IManifold';
import IUnique from '../interfaces/IUnique';
import Index from './Index';
import Wrapper from '../abstracts/Wrapper';

export default class Manifold<T extends IUnique> extends Wrapper<Dictionary<Index<T>>>
implements IManifold<T> {

    constructor() {
        super(new Dictionary<Index<T>>());
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public get(InstanceCtor: Ctor<T, any>): Index<T> {
        if (!this.unwrap().read(InstanceCtor.name)) {
            this.unwrap().write({
                key: InstanceCtor.name,
                value: new Index<T>(),
            });
        }
        return this.unwrap().read(InstanceCtor.name);
    }

    public getById(id: string): Index<T> {
        return this.unwrap().read(id);
    }

    public add(instance: T): boolean {
        if (!this.unwrap().read(instance.constructor.name)) {
            this.unwrap().write({
                key: instance.constructor.name,
                value: new Index<T>(),
            });
        }
        return this.unwrap()
            .read(instance.constructor.name)
            .add(instance);
    }

    public remove(instance: T): boolean {
        return this.unwrap().read(instance.constructor.name).remove(instance.id);
    }

    public prune(InstanceCtor: Ctor<T, any>): boolean {
        const inner = this.unwrap().read(InstanceCtor.name);
        if (!inner) {
            return false;
        }
        inner.purge();
        this.unwrap().delete(InstanceCtor.name);
        return true;
    }

    public forEach(method: (payload: Index<T>) => void): void {
        this.unwrap().forEach((collection) => {
            method(collection);
        });
    }

}
