import { Ctor } from '../types/Ctor';

export default interface ISystem<TComponent> {

    ComponentCtor: Ctor<TComponent, any>;

    once(payload: TComponent): void;

}
