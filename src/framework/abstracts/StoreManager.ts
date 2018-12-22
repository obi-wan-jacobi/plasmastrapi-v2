import { Ctor } from '../types/Ctor';
import IUnique from '../interfaces/IUnique';
import TypeManifold from '../concretes/data-structures/TypeManifold';
import TypeUnifold from '../concretes/data-structures/TypeUnifold';

export default abstract class StoreManager<T extends IUnique> {

    private __store: TypeManifold<T>;

    constructor() {
        this.__store = new TypeManifold<T>();
    }

    public load(target: T): void {
        this.__store.add(target);
    }

    public unload(target: T): void {
        this.__store.remove(target);
    }

    public get(TargetConstructor: Ctor<T, any>): TypeUnifold<T> {
        return this.__store.get(TargetConstructor);
    }

}