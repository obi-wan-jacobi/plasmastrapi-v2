import IComponentMaster from './IComponentMaster';
import IEntity from './IEntity';
import { EntityClass, Etor } from '../types';

export default interface IEntityMaster {

  componentMaster: IComponentMaster;

  create<T extends IEntity, TArg>(EntityConstructor: Etor<T, TArg>, data?: TArg): T;

  destroy(instance: IEntity): void;

  forEvery<T extends IEntity>(EntityClass: EntityClass<T>): (fn: (entity: T) => void) => void;

  find<T extends IEntity>(EntityClass: EntityClass<T>): (fn: (entity: T) => boolean) => T | undefined;

  once(): void;
}
