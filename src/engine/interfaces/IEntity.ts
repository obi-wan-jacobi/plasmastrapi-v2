import { Ctor } from '../../framework/types/Ctor';
import IBindable from './IBindable';
import IComponent from './IComponent';
import ILoadable from './ILoadable';
import IUnique from '../../framework/interfaces/IUnique';
import { Optional } from '../../framework/types/Optional';
import StoreMaster from '../concretes/masters/StoreMaster';

export default interface IEntity extends IUnique, ILoadable, IBindable<StoreMaster> {

    add<TComponent extends IComponent<TData>, TData>(
        ComponentCtor: Ctor<TComponent, Optional<TData>>, data?: TData,
    ): TComponent;

    remove<TComponent extends IComponent<any>>(ComponentCtor: Ctor<TComponent, any>): Optional<TComponent>;

}
