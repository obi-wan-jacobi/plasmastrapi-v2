import IComponent from './IComponent';
import IUnique from 'foundation/interfaces/IUnique';
import { Ctor } from '../types';

export default interface IEntity extends IUnique {

  $destroy(): void;

  $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): (data: TArg) => void;

  $remove<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void;

  $copy<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): TArg;

  $mutate<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg) => void);

  $patch<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg | {}) => void);

  $forEach(fn: (component: IComponent<any>) => void): void;

}
