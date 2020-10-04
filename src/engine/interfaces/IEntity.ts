import IComponent from './IComponent';
import IUnique from '../../foundation/interfaces/IUnique';
import { Ctor } from '../types';

export default interface IEntity extends IUnique {

  $destroy(): void;

  $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, { entity: IEntity, data: TArg }>): (data: TArg) => void;

  $remove<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void;

  $copy<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): T | undefined;

  $mutate<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg) => void) | undefined;

  $patch<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: {}) => void) | undefined;

  $forEach(fn: (component: IComponent<any>) => void): void;

}
