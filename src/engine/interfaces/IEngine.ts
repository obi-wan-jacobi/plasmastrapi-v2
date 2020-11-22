import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import ISystem from './ISystem';
import { Constructor } from 'foundation/types';
import IKeyboardEvent from './IKeyboardEvent';
import IMouseEvent from './IMouseEvent';
import IViewportAdaptor from './IViewportAdaptor';

export default interface IEngine<TImageSource> {

  entities: IEntityMaster;
  components: IComponentMaster;
  events: { mouse?: IMouseEvent; keyboard?: IKeyboardEvent };
  delta: number;

  viewport: IViewportAdaptor<TImageSource>;

  load(src: string): TImageSource;
  add(SystemCtor: Constructor<ISystem, any>): void;
  remove(SystemCtor: Constructor<ISystem, any>): void;
  once(): void;
  start(): void;
}
