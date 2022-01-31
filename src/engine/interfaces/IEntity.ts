import IComponent from './IComponent';
import IUnique from 'base/interfaces/IUnique';
import { Ctor } from '../types';
import { Void, Volatile } from 'base/types';

export default interface IEntity extends IUnique {

  $destroy(): void;

  $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Void<TArg>;

  $remove<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void;

  $copy<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Volatile<TArg>;

  $mutate<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Void<TArg | {}>;

  $patch<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Void<TArg | {}>;

  $forEach(fn: Void<IComponent<any>>): void;

}
