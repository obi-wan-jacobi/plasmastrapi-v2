import Entity from '../concretes/Entity';
import IUnique from './IUnique';

export default interface IComponent<T> extends IUnique {

    set(data: T): void;

    bind(entity: Entity): void;

}
