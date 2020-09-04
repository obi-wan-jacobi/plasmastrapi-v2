import IEntity from './IEntity';
import { Ctor, Optional } from '../../data-structures/types';

export type EClass<T extends IEntity> = Ctor<T, any> | (Function & { prototype: T });

export default interface IEntityMaster {

  create<T extends IEntity, TData>(EntityCtor: Ctor<T, Optional<TData>>, data?: TData): T;

  destroy(instance: IEntity): void;

  forEvery<T extends IEntity>(EntityClass: EClass<T>): (fn: (entity: T) => void) => void;

  first<T extends IEntity>(EntityClass: EClass<T>): (fn: (entity: T) => boolean) => T | undefined;

  once(): void;
}
