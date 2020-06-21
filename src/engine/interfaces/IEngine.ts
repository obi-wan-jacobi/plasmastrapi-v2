import IAdaptedKeyboardEvent from './IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from './IAdaptedMouseEvent';
import IComponentFactory from './IComponentFactory';
import IEntityFactory from './IEntityMaster';
import ISystem from './ISystem';
import IViewportAdaptor from './IViewportAdaptor';
import { Ctor } from '../../data-structures/types';

export default interface IEngine {

    viewport: IViewportAdaptor<any>;
    components: IComponentFactory;
    entities: IEntityFactory;

    mouse: IAdaptedMouseEvent;
    keyboard: IAdaptedKeyboardEvent;

    delta: number;

    once(): void;
    draw(): void;
    add(SystemCtor: Ctor<ISystem, any>): void;
    remove(SystemCtor: Ctor<ISystem, any>): void;
}
