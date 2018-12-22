import { Ctor } from '../types/Ctor';
import IComponent from './IComponent';
import IUnique from './IUnique';

export default interface IEntity extends IUnique {

    add<T>(component: IComponent<T>): void;

    remove<T>(ComponentSubclass: Ctor<IComponent<T>, void>): void;

}
