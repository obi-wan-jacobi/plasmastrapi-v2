import { Ctor } from '../../framework/types/Ctor';
import Engine from '../abstracts/Engine';
import ILoopable from './ILoopable';

export default interface ISystem<TComponent> extends ILoopable<TComponent> {

    ComponentCtor: Ctor<TComponent, any>;

    bind(engine: Engine): void;

}
