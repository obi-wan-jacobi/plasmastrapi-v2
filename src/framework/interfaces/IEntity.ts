import IComponent from './IComponent';
import IUnique from './IUnique';

export default interface IEntity extends IUnique {

    add<T>(component: IComponent<T>): void;

    remove<T>(ComponentSubclass: new () => IComponent<T>): void;

    get<T>(ComponentSubclass: new () => IComponent<T>): IComponent<T>;

}
