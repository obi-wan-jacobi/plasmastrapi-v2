import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import ISystem from './ISystem';
import { Constructor, Dict } from 'foundation/types';
import IEvent from './IEvent';
import IPipe from './IPipe';

export default interface IEngine<TImageSource, TPipes extends Dict<IPipe<IEvent>>> {

  entities: IEntityMaster;
  components: IComponentMaster;

  load(src: string): TImageSource;
  add(SystemCtor: Constructor<ISystem<TPipes>, any>): void;
  remove(SystemCtor: Constructor<ISystem<TPipes>, any>): void;
  once(): void;
  start(): void;
}
