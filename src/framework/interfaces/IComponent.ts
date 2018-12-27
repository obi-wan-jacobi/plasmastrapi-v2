import { Ctor } from '../types/Ctor';
import Entity from '../concretes/Entity';
import IUnique from './IUnique';
import { Optional } from '../types/Optional';

export default interface IComponent<T> extends IUnique {

    dependencies: Array<Ctor<IComponent<any>, Optional<any>>>;

    data: T;

    entity: Entity;

    set(data: T): void;

    bind(entity: Entity): void;

}
