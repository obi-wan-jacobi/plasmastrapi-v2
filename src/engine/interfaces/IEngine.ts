import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import { Stor } from 'engine/types';
import { Dict } from 'base/types';
import IPipe from './IPipe';
import IPipeEvent from './IPipeEvent';

export default interface IEngine<TImageSource, TPipes extends Dict<IPipe<IPipeEvent>>> {

  entities: IEntityMaster;
  components: IComponentMaster;

  load(src: string): TImageSource;
  add(SystemCtor: Stor<TPipes>): void;
  remove(SystemCtor: Stor<TPipes>): void;
  once(): void;
  start(): void;
}
