import Entity from '../abstracts/Entity';
import IBindable from './IBindable';
import IUnique from '../../framework/interfaces/IUnique';

export default interface IComponent<T> extends IUnique, IBindable<Entity> {

    data: T;

    entity: Entity;

    set(data: T): void;

}
