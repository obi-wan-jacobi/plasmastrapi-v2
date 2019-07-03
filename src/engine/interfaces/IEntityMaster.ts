import IEntity from './IEntity';
import { Ctor, Optional } from '../../framework/types';

export default interface IEntityMaster {

    create<T extends IEntity, TData>(InstanceCtor: Ctor<T, Optional<TData>>, data?: TData): T;

    destroy(instance: IEntity): void;

    forEvery<T extends IEntity>(EntityCtor: Ctor<T, any>): (fn: (entity: T) => void) => void;

    first<T extends IEntity>(EntityCtor: Ctor<T, any>): (fn: (entity: T) => void) => void;

    find<T extends IEntity>(EntityCtor: Ctor<T, any>): (fn: (entity: T) => boolean) => T | undefined;

    once(): void;
}
