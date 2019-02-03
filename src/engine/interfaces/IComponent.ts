import Entity from '../abstracts/Entity';
import IBindable from './IBindable';
import IDataPrimitive from './IDataPrimitive';
import IUnique from '../../framework/interfaces/IUnique';

export default interface IComponent<T extends IDataPrimitive>
extends IUnique, IBindable<Entity> {

    data: T;

    entity: Entity;

    mutate(data: T): void;

}
