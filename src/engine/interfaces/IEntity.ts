import IComponent, { CCtor } from './IComponent';
import IUnique from '../../data-structures/interfaces/IUnique';

export default interface IEntity extends IUnique {

  $destroy(): void;

  $add<T>(ComponentCtor: CCtor<IComponent<T>, T>): (data: T) => void;

  $remove<T>(ComponentCtor: CCtor<IComponent<T>, T>): void;

  $copy<T>(ComponentCtor: CCtor<IComponent<T>, T>): T | undefined;

  $mutate<T>(ComponentCtor: CCtor<IComponent<T>, T>): ((data: T) => void) | undefined;

  $patch<T>(ComponentCtor: CCtor<IComponent<T>, T>): ((data: {}) => void) | undefined;

  $forEach(fn: (component: IComponent<any>) => void): void;

}
