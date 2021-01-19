import IEntity from './IEntity';
import { EntityClass } from '../types';

export default interface IEntityMaster {

  upkeep(): void;

  find<T extends IEntity>(EntityClass: EntityClass<T>): (fn: (entity: T) => boolean) => T | undefined;

  forEvery<T extends IEntity>(EntityClass: EntityClass<T>): (fn: (entity: T) => void) => void;

}
