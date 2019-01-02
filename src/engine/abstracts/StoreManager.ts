import { Ctor } from '../../framework/types/Ctor';
import IIterable from '../../framework/interfaces/IIterable';
import IUnique from '../../framework/interfaces/IUnique';
import TypeManifold from '../../framework/concretes/data-structures/TypeManifold';
import TypeUnifold from '../../framework/concretes/data-structures/TypeUnifold';

export default abstract class StoreManager<T extends IUnique> implements IIterable<TypeUnifold<T>> {

    private __store: TypeManifold<T>;
    private __itemsToLoad: T[];
    private __itemsToUnload: T[];

    constructor() {
        this.__store = new TypeManifold<T>();
        this.__itemsToLoad = [];
        this.__itemsToUnload = [];
    }

    public get length(): number {
        return this.__store.length;
    }

    public create<TInstance extends T, TData>(
        InstanceCtor: Ctor<TInstance, TData>, data: TData,
    ): TInstance {
        const instance = new InstanceCtor(data);
        this.load(instance);
        return instance;
    }

    public get(TargetCtor: Ctor<T, any>): TypeUnifold<T> {
        return this.__store.get(TargetCtor);
    }

    public forEach(method: (payload: TypeUnifold<T>) => void): void {
        return this.__store.forEach(method);
    }

    public load(target: T): void {
        this.__itemsToLoad.push(target);
    }

    public unload(target: T): void {
        this.__itemsToUnload.push(target);
    }

    public loadNew(): void {
        this.__processItemsToLoad();
    }

    public cleanup(): void {
        this.__processItemsToUnload();
    }

    private __processItemsToLoad(): void {
        this.__itemsToLoad.forEach((target) => {
            this.__store.add(target);
        });
        this.__itemsToLoad = [];
    }

    private __processItemsToUnload(): void {
        this.__itemsToUnload.forEach((target) => {
            this.__store.remove(target);
        });
        this.__itemsToUnload = [];
    }

}
