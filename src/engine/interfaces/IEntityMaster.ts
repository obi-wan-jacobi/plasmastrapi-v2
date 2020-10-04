import IEntity from './IEntity';
import IComponentMaster from './IComponentMaster';
import { Etor } from '../types';

export default interface IEntityMaster {

  componentMaster: IComponentMaster;

  create<T extends IEntity, TArg>(EntityClass: Etor<T, TArg>, data?: TArg): T;

  destroy(instance: IEntity): void;

  forEvery<T extends IEntity>(EntityClass: Etor<T, any>): (fn: (entity: T) => void) => void;

  once(): void;
}
