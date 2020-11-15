import IComponent from './IComponent';
import IEntity from './IEntity';
import { ComponentClass, Ctor } from '../types';

export default interface IComponentMaster {

  create<T extends IComponent<TArg>, TArg>(entity: IEntity, ComponentConstructor: Ctor<T, TArg>, data: TArg): T;

  destroy(instance: IComponent<any>): void;

  forEvery<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>):
  (fn: (component: T) => void) => void;
}
