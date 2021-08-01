import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import ISystem from './ISystem';
import { Constructor, Dict } from 'core/types';
import IEvent from './IEvent';
import IPipe from './IPipe';

export default interface IEngine<TImageSource> {

  entities: IEntityMaster;
  components: IComponentMaster;

  load(src: string): TImageSource;
  add(SystemCtor: Constructor<ISystem<Dict<IPipe<IEvent>>>, any>): void;
  remove(SystemCtor: Constructor<ISystem<Dict<IPipe<IEvent>>>, any>): void;
  once(): void;
  start(): void;
}
