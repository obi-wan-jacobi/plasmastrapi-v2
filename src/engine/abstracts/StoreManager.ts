import { Ctor } from '../../framework/types/Ctor';
import IIterable from '../../framework/interfaces/IIterable';
import IUnique from '../../framework/interfaces/IUnique';
import Index from '../../framework/data-structures/Index';
import Manifold from '../../framework/data-structures/Manifold';
import Wrapper from '../../framework/abstracts/Wrapper';

export default abstract class StoreManager<T extends IUnique> extends Wrapper<Manifold<T>>
implements IIterable<Index<T>> {

    private __itemsToLoad: T[];
    private __itemsToUnload: T[];

    constructor() {
        super(new Manifold<T>());
        this.__itemsToLoad = [];
        this.__itemsToUnload = [];
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public create<TInstance extends T, TData>(
        InstanceCtor: Ctor<TInstance, TData>, data: TData,
    ): TInstance {
        const instance = new InstanceCtor(data);
        this.load(instance);
        return instance;
    }

    public get(TargetCtor: Ctor<T, any>): Index<T> {
        return this.unwrap().get(TargetCtor);
    }

    public forEach(method: (payload: Index<T>) => void): void {
        return this.unwrap().forEach(method);
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
            this.unwrap().add(target);
        });
        this.__itemsToLoad = [];
    }

    private __processItemsToUnload(): void {
        this.__itemsToUnload.forEach((target) => {
            this.unwrap().remove(target);
        });
        this.__itemsToUnload = [];
    }

}
