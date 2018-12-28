import { Ctor } from '../types/Ctor';
import StoreMaster from '../concretes/masters/StoreMaster';

export default interface ISystem<TComponent> {

    ComponentCtor: Ctor<TComponent, any>;

    bind(store: StoreMaster): void;

    once(payload: TComponent): void;

}
