import IAdaptedKeyboardEvent from './IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from './IAdaptedMouseEvent';
import IComponentMaster from './IComponentMaster';
import IEntityFactory from './IEntityMaster';
import ISystem from './ISystem';
import IViewportAdaptor from './IViewportAdaptor';
import { Constructor } from '../../foundation/types';

export default interface IEngine {

  viewport: IViewportAdaptor<any>;
  components: IComponentMaster;
  entities: IEntityFactory;

  mouse: IAdaptedMouseEvent;
  keyboard: IAdaptedKeyboardEvent;

  delta: number;

  once(): void;
  draw(): void;
  add(SystemCtor: Constructor<ISystem, any>): void;
  remove(SystemCtor: Constructor<ISystem, any>): void;
}
