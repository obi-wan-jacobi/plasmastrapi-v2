import IComponent, { CCtor } from './IComponent';
import { Optional } from '../../data-structures/types';
import IEntity from './IEntity';

export default interface IComponentFactory {

  create<TData>(entity: IEntity, ComponentCtor: CCtor<IComponent<any>, Optional<TData>>, data?: TData): IComponent<any>;

  destroy(instance: IComponent<any>): void;

  forEvery<TArg>(ComponentCtor: CCtor<IComponent<TArg>, TArg>): (fn: (component: IComponent<TArg>) => void) => void;
}
