import IComponent from './IComponent';
import IUnique from '../../data-structures/interfaces/IUnique';
import { Ctor } from '../../data-structures/types';

export default interface IEntity extends IUnique {

    $destroy(): void;

    $add<T>(ComponentCtor: Ctor<IComponent<T>, T>): (data: T) => void;

    $remove<T>(ComponentCtor: Ctor<IComponent<T>, T>): void;

    $copy<T>(ComponentCtor: Ctor<IComponent<T>, T>): T;

    $mutate<T>(ComponentCtor: Ctor<IComponent<T>, T>): (data: T) => void;

    $forEach(fn: (component: IComponent<any>) => void): void;

}
