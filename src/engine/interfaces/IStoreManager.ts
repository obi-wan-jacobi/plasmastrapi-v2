import { Ctor } from '../../framework/types/Ctor';
import IContainer from '../../framework/interfaces/IContainer';
import IIterable from '../../framework/interfaces/IIterable';
import IManifold from '../../framework/interfaces/IManifold';
import IUnique from '../../framework/interfaces/IUnique';
import IWrapper from '../../framework/interfaces/IWrapper';

export default interface IStoreManager<T extends IUnique>
extends IWrapper<IManifold<T>>, IIterable<IContainer<T>> {

    length: number;

    create<TInstance extends T, TData>(
        InstanceCtor: Ctor<TInstance, TData>, data?: TData,
    ): TInstance;

    get(TargetCtor: Ctor<T, any>): IContainer<T>;

    find(id: string): T | undefined;

    load(target: T): void;

    unload(target: T): void;

    loadNew(): void;

    cleanup(): void;

}
