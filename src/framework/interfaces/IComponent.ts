import IUnique from './IUnique';

export default interface IComponent<T> extends IUnique {

    set(data: T): void;

}
