import Entity from '../concretes/Entity';
import IUnique from './IUnique';

export default interface IComponent<T> extends IUnique {

    data: T;

    entity: Entity;

    set(data: T): void;

    bind(entity: Entity): void;

}
