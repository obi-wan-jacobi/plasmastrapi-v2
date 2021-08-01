import IEntity from './IEntity';
import { EntityClass } from '../types';
import { Fn, Void, Volatile } from 'core/types';

export default interface IEntityMaster {

  upkeep(): void;

  find<T extends IEntity>(EntityClass: EntityClass<T>): Fn<Fn<T, Boolean>, Volatile<T>>;

  forEvery<T extends IEntity>(EntityClass: EntityClass<T>): Void<Void<T>>;

}
