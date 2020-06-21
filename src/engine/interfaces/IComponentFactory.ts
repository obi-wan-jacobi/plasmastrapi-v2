import IComponent from './IComponent';
import { Ctor, Optional } from '../../data-structures/types';

export default interface IComponentFactory {

    create<TData>(InstanceCtor: Ctor<IComponent<any>, Optional<TData>>, data?: TData): IComponent<any>;

    destroy(instance: IComponent<any>): void;

    forEvery<TArg>(ComponentCtor: Ctor<IComponent<TArg>, TArg>): (fn: (component: IComponent<TArg>) => void) => void;
}
