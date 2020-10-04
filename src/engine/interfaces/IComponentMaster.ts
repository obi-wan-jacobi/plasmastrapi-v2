import IComponent from './IComponent';
import IEntity from './IEntity';
import { Ctor } from '../types';

export default interface IComponentMaster {

  create<T extends IComponent<TArg>, TArg>(entity: IEntity, ComponentClass: Ctor<T, { entity: IEntity, data: TArg }>, data: TArg): T;

  destroy(instance: IComponent<any>): void;

  forEvery<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): (fn: (component: T) => void) => void;
}
