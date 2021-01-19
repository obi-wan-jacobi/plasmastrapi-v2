import IComponent from './IComponent';
import { ComponentClass } from '../types';

export default interface IComponentMaster {

  upkeep(): void;

  find<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): (fn: (component: T) => boolean) => T | undefined;

  forEvery<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): (fn: (component: T) => void) => void;

}
