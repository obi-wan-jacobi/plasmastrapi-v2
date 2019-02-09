import Container from './Container';
import { Ctor } from '../types/Ctor';
import Dictionary from './Dictionary';
import IManifold from '../interfaces/IManifold';
import IUnique from '../interfaces/IUnique';
import Wrapper from '../abstracts/Wrapper';

export default class Manifold<T extends IUnique> extends Wrapper<Dictionary<Container<T>>>
implements IManifold<T> {

    constructor() {
        super(new Dictionary<Container<T>>());
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public find(id: string): T | undefined {
        let result;
        this.unwrap().find((index) => {
            result = index.find((t) => t.id === id);
            return result !== undefined;
        });
        return result;
    }

    public get(InstanceCtor: Ctor<T, any>): Container<T> {
        if (!this.unwrap().read(InstanceCtor.name)) {
            return new Container<T>();
        }
        return this.unwrap().read(InstanceCtor.name);
    }

    public add(instance: T): boolean {
        if (!this.unwrap().read(instance.constructor.name)) {
            this.unwrap().write({
                key: instance.constructor.name,
                value: new Container<T>(),
            });
        }
        return this.unwrap()
            .read(instance.constructor.name)
            .add(instance);
    }

    public remove(instance: T): boolean {
        const result = this.unwrap().read(instance.constructor.name).remove(instance);
        if (this.unwrap().read(instance.constructor.name).length === 0) {
            this.unwrap().delete(instance.constructor.name);
        }
        return result;

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

    public forEach(method: (payload: Container<T>) => void): void {
        this.unwrap().forEach((collection) => {
            method(collection);
        });
    }

}
